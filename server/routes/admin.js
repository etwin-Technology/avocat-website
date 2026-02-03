const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const Admin = require('../models/Admin');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const stats = await Promise.all([
      // Appointments
      Appointment.aggregate([
        {
          $facet: {
            total: [{ $count: 'count' }],
            today: [
              { 
                $match: { 
                  createdAt: { $gte: today } 
                } 
              },
              { $count: 'count' }
            ],
            byStatus: [
              { $group: { _id: '$status', count: { $sum: 1 } } }
            ],
            byService: [
              { $group: { _id: '$serviceType', count: { $sum: 1 } } }
            ]
          }
        }
      ]),

      // Contacts
      Contact.aggregate([
        {
          $facet: {
            total: [{ $count: 'count' }],
            today: [
              { 
                $match: { 
                  createdAt: { $gte: today } 
                } 
              },
              { $count: 'count' }
            ],
            byStatus: [
              { $group: { _id: '$status', count: { $sum: 1 } } }
            ],
            byUrgency: [
              { $group: { _id: '$urgency', count: { $sum: 1 } } }
            ]
          }
        }
      ]),

      // Upcoming appointments
      Appointment.countDocuments({
        preferredDate: { $gte: today, $lt: tomorrow },
        status: { $in: ['pending', 'confirmed'] }
      }),

      // Unread messages
      Contact.countDocuments({ status: 'new' })
    ]);

    const appointmentStats = stats[0][0];
    const contactStats = stats[1][0];

    res.json({
      status: 'success',
      data: {
        appointments: {
          total: appointmentStats.total[0]?.count || 0,
          today: appointmentStats.today[0]?.count || 0,
          byStatus: appointmentStats.byStatus.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
          }, {}),
          byService: appointmentStats.byService
        },
        contacts: {
          total: contactStats.total[0]?.count || 0,
          today: contactStats.today[0]?.count || 0,
          byStatus: contactStats.byStatus.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
          }, {}),
          byUrgency: contactStats.byUrgency
        },
        upcomingAppointments: stats[2],
        unreadMessages: stats[3]
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
});

// @route   GET /api/admin/appointments
// @desc    Get all appointments with filters
// @access  Private/Admin
router.get('/appointments', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      serviceType, 
      dateFrom, 
      dateTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    // Status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    // Service type filter
    if (serviceType && serviceType !== 'all') {
      query.serviceType = serviceType;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    // Search filter
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { clientEmail: { $regex: search, $options: 'i' } },
        { clientPhone: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Appointment.countDocuments(query)
    ]);

    res.json({
      status: 'success',
      data: {
        appointments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointments'
    });
  }
});

// @route   PUT /api/admin/appointments/:id/status
// @desc    Update appointment status
// @access  Private/Admin
router.put('/appointments/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    // Update appointment
    appointment.status = status;
    if (notes) {
      appointment.adminNotes = appointment.adminNotes || [];
      appointment.adminNotes.push({
        note: notes,
        adminId: req.admin.id,
        timestamp: new Date()
      });
    }

    await appointment.save();

    res.json({
      status: 'success',
      message: 'Appointment status updated',
      data: appointment
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update appointment'
    });
  }
});

// @route   DELETE /api/admin/appointments/:id
// @desc    Delete appointment
// @access  Private/Admin
router.delete('/appointments/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Appointment deleted successfully'
    });

  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete appointment'
    });
  }
});

// @route   GET /api/admin/contacts
// @desc    Get all contacts with filters
// @access  Private/Admin
router.get('/contacts', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      urgency, 
      dateFrom, 
      dateTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    // Status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    // Urgency filter
    if (urgency && urgency !== 'all') {
      query.urgency = urgency;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Contact.countDocuments(query)
    ]);

    res.json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   PUT /api/admin/contacts/:id/status
// @desc    Update contact status
// @access  Private/Admin
router.put('/contacts/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    // Update contact
    contact.status = status;
    if (response) {
      contact.adminResponse = {
        response,
        adminId: req.admin.id,
        respondedAt: new Date()
      };
    }

    await contact.save();

    res.json({
      status: 'success',
      message: 'Contact status updated',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update contact'
    });
  }
});

// @route   DELETE /api/admin/contacts/:id
// @desc    Delete contact
// @access  Private/Admin
router.delete('/contacts/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete contact'
    });
  }
});

// @route   GET /api/admin/export
// @desc    Export data (appointments or contacts)
// @access  Private/Admin
router.get('/export', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { type, format = 'json' } = req.query;
    
    if (!['appointments', 'contacts'].includes(type)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid export type'
      });
    }

    let data;
    let filename;
    
    if (type === 'appointments') {
      data = await Appointment.find().lean();
      filename = `appointments-${Date.now()}`;
    } else {
      data = await Contact.find().lean();
      filename = `contacts-${Date.now()}`;
    }

    if (format === 'csv') {
      // Convert to CSV
      const fields = Object.keys(data[0] || {});
      const csv = [
        fields.join(','),
        ...data.map(row => fields.map(field => JSON.stringify(row[field] || '')).join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
      return res.send(csv);
    } else {
      // JSON format
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.json"`);
      return res.json(data);
    }

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to export data'
    });
  }
});

module.exports = router;