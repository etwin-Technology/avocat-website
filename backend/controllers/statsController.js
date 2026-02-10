const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const Admin = require('../models/Admin');
const moment = require('moment');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    
    // Get appointments statistics
    const [
      totalAppointments,
      todayAppointments,
      upcomingAppointments,
      appointmentsByStatus,
      appointmentsByServiceType,
      monthlyAppointments,
      conversionRate
    ] = await Promise.all([
      // Total appointments
      Appointment.countDocuments(),
      
      // Today's appointments
      Appointment.countDocuments({
        preferredDate: { $gte: today, $lt: tomorrow }
      }),
      
      // Upcoming appointments (next 7 days)
      Appointment.countDocuments({
        preferredDate: { $gte: today },
        status: { $in: ['pending', 'confirmed'] }
      }),
      
      // Appointments by status
      Appointment.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Appointments by service type
      Appointment.aggregate([
        {
          $group: {
            _id: '$serviceType',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Monthly appointments for chart
      Appointment.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth }
          }
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: '$createdAt' },
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
        }
      ]),
      
      // Conversion rate (confirmed / total)
      Appointment.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            confirmed: {
              $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
            }
          }
        }
      ])
    ]);
    
    // Get contacts statistics
    const [
      totalContacts,
      newContacts,
      emergencyContacts,
      urgentContacts,
      contactsByStatus,
      contactsByUrgency,
      avgResponseTime
    ] = await Promise.all([
      // Total contacts
      Contact.countDocuments(),
      
      // New contacts (last 24 hours)
      Contact.countDocuments({
        status: 'new',
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
      
      // Emergency contacts
      Contact.countDocuments({
        urgency: 'emergency',
        status: { $ne: 'archived' }
      }),
      
      // Urgent contacts
      Contact.countDocuments({
        urgency: 'urgent',
        status: { $ne: 'archived' }
      }),
      
      // Contacts by status
      Contact.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Contacts by urgency
      Contact.aggregate([
        {
          $group: {
            _id: '$urgency',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Average response time (for replied contacts)
      Contact.aggregate([
        {
          $match: {
            respondedAt: { $exists: true },
            createdAt: { $exists: true }
          }
        },
        {
          $group: {
            _id: null,
            avgResponseTime: {
              $avg: {
                $subtract: ['$respondedAt', '$createdAt']
              }
            }
          }
        }
      ])
    ]);
    
    // Format conversion rate
    const conversionRateValue = conversionRate[0] ? 
      Math.round((conversionRate[0].confirmed / conversionRate[0].total) * 100) : 0;
    
    // Format average response time (in hours)
    const avgResponseTimeHours = avgResponseTime[0] && avgResponseTime[0].avgResponseTime ?
      Math.round(avgResponseTime[0].avgResponseTime / (1000 * 60 * 60) * 100) / 100 : 0;
    
    // System statistics
    const activeUsers = await Admin.countDocuments({ isActive: true });
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments: {
          total: totalAppointments,
          today: todayAppointments,
          upcoming: upcomingAppointments,
          byStatus: Object.fromEntries(
            appointmentsByStatus.map(item => [item._id, item.count])
          ),
          byServiceType: Object.fromEntries(
            appointmentsByServiceType.map(item => [item._id, item.count])
          ),
          monthlyTrend: monthlyAppointments.map(item => ({
            date: `${item._id.year}-${item._id.month}-${item._id.day}`,
            count: item.count
          })),
          conversionRate: conversionRateValue
        },
        contacts: {
          total: totalContacts,
          new: newContacts,
          emergency: emergencyContacts,
          urgent: urgentContacts,
          byStatus: Object.fromEntries(
            contactsByStatus.map(item => [item._id, item.count])
          ),
          byUrgency: Object.fromEntries(
            contactsByUrgency.map(item => [item._id, item.count])
          ),
          avgResponseTime: avgResponseTimeHours
        },
        system: {
          uptime: process.uptime(),
          activeUsers,
          serverTime: new Date().toISOString(),
          memoryUsage: process.memoryUsage()
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointments statistics for chart
// @route   GET /api/admin/stats/appointments-chart
// @access  Private/Admin
exports.getAppointmentsChartData = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    const today = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    const appointments = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: period === 'year' ? '%Y-%m' : '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);
    
    // Format data for chart
    const chartData = {
      labels: [],
      datasets: {
        pending: [],
        confirmed: [],
        completed: [],
        cancelled: []
      }
    };
    
    const uniqueDates = [...new Set(appointments.map(a => a._id.date))].sort();
    chartData.labels = uniqueDates;
    
    // Initialize datasets
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    statuses.forEach(status => {
      chartData.datasets[status] = Array(uniqueDates.length).fill(0);
    });
    
    // Fill datasets
    appointments.forEach(item => {
      const dateIndex = uniqueDates.indexOf(item._id.date);
      if (dateIndex !== -1 && chartData.datasets[item._id.status]) {
        chartData.datasets[item._id.status][dateIndex] = item.count;
      }
    });
    
    res.status(200).json({
      status: 'success',
      data: chartData
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get contacts statistics for chart
// @route   GET /api/admin/stats/contacts-chart
// @access  Private/Admin
exports.getContactsChartData = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    const today = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    const contacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: period === 'year' ? '%Y-%m' : '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            urgency: '$urgency'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);
    
    // Format data for chart
    const chartData = {
      labels: [],
      datasets: {
        emergency: [],
        urgent: [],
        high: [],
        normal: [],
        low: []
      }
    };
    
    const uniqueDates = [...new Set(contacts.map(c => c._id.date))].sort();
    chartData.labels = uniqueDates;
    
    // Initialize datasets
    const urgencies = ['emergency', 'urgent', 'high', 'normal', 'low'];
    urgencies.forEach(urgency => {
      chartData.datasets[urgency] = Array(uniqueDates.length).fill(0);
    });
    
    // Fill datasets
    contacts.forEach(item => {
      const dateIndex = uniqueDates.indexOf(item._id.date);
      if (dateIndex !== -1 && chartData.datasets[item._id.urgency]) {
        chartData.datasets[item._id.urgency][dateIndex] = item.count;
      }
    });
    
    res.status(200).json({
      status: 'success',
      data: chartData
    });
    
  } catch (error) {
    next(error);
  }
};