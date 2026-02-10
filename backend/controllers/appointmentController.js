const Appointment = require('../models/Appointment');
const { AppError } = require('../middleware/errorHandler');
const moment = require('moment');

// @desc    Get all appointments with filtering, sorting, and pagination
// @route   GET /api/admin/appointments
// @access  Private/Admin
exports.getAllAppointments = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      status,
      serviceType,
      meetingType,
      location,
      urgency,
      dateFrom,
      dateTo
    } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Status filter
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Service type filter
    if (serviceType && serviceType !== 'all') {
      filter.serviceType = serviceType;
    }
    
    // Meeting type filter
    if (meetingType && meetingType !== 'all') {
      filter.meetingType = meetingType;
    }
    
    // Location filter
    if (location && location !== 'all') {
      filter.location = location;
    }
    
    // Urgency filter
    if (urgency && urgency !== 'all') {
      filter.urgencyLevel = urgency;
    }
    
    // Date range filter
    if (dateFrom || dateTo) {
      filter.preferredDate = {};
      if (dateFrom) {
        filter.preferredDate.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.preferredDate.$lte = new Date(dateTo);
      }
    }
    
    // Search filter
    if (search) {
      filter.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { clientEmail: { $regex: search, $options: 'i' } },
        { clientPhone: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const appointments = await Appointment.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email');
    
    // Get total count for pagination
    const total = await Appointment.countDocuments(filter);
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment
// @route   GET /api/admin/appointments/:id
// @access  Private/Admin
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('assignedTo', 'name email');
    
    if (!appointment) {
      return next(new AppError('لم يتم العثور على الموعد', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Create new appointment
// @route   POST /api/admin/appointments
// @access  Private/Admin
exports.createAppointment = async (req, res, next) => {
  try {
    // Add assigned admin if not specified
    if (!req.body.assignedTo) {
      req.body.assignedTo = req.admin.id;
    }
    
    const appointment = await Appointment.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        appointment
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment
// @route   PUT /api/admin/appointments/:id
// @access  Private/Admin
exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('assignedTo', 'name email');
    
    if (!appointment) {
      return next(new AppError('لم يتم العثور على الموعد', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/admin/appointments/:id
// @access  Private/Admin
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return next(new AppError('لم يتم العثور على الموعد', 404));
    }
    
    res.status(200).json({
      status: 'success',
      message: 'تم حذف الموعد بنجاح',
      data: null
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/admin/appointments/:id/status
// @access  Private/Admin
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = { status };
    if (notes) updateData.notes = notes;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!appointment) {
      return next(new AppError('لم يتم العثور على الموعد', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Reschedule appointment
// @route   POST /api/admin/appointments/:id/reschedule
// @access  Private/Admin
exports.rescheduleAppointment = async (req, res, next) => {
  try {
    const { newDate, newTime, reason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return next(new AppError('لم يتم العثور على الموعد', 404));
    }
    
    // Save old date as rescheduledFrom
    appointment.rescheduledFrom = appointment.preferredDate;
    appointment.preferredDate = newDate;
    appointment.preferredTime = newTime;
    appointment.status = 'rescheduled';
    if (reason) appointment.cancellationReason = reason;
    
    await appointment.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk actions on appointments
// @route   POST /api/admin/appointments/bulk-actions
// @access  Private/Admin
exports.bulkActions = async (req, res, next) => {
  try {
    const { action, appointmentIds, data } = req.body;
    
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      return next(new AppError('يرجى تحديد المواعيد', 400));
    }
    
    let update;
    let message;
    
    switch (action) {
      case 'confirm':
        update = { status: 'confirmed' };
        message = 'تم تأكيد المواعيد المحددة';
        break;
        
      case 'cancel':
        update = { 
          status: 'cancelled',
          cancellationReason: data?.reason || 'تم الإلغاء جماعياً'
        };
        message = 'تم إلغاء المواعيد المحددة';
        break;
        
      case 'complete':
        update = { status: 'completed' };
        message = 'تم إكمال المواعيد المحددة';
        break;
        
      case 'delete':
        await Appointment.deleteMany({ _id: { $in: appointmentIds } });
        return res.status(200).json({
          status: 'success',
          message: 'تم حذف المواعيد المحددة',
          data: null
        });
        
      default:
        return next(new AppError('إجراء غير صالح', 400));
    }
    
    const result = await Appointment.updateMany(
      { _id: { $in: appointmentIds } },
      update
    );
    
    res.status(200).json({
      status: 'success',
      message,
      data: {
        modifiedCount: result.modifiedCount
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's appointments
// @route   GET /api/admin/appointments/today
// @access  Private/Admin
exports.getTodayAppointments = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const appointments = await Appointment.find({
      preferredDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ preferredTime: 1 });
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming appointments
// @route   GET /api/admin/appointments/upcoming
// @access  Private/Admin
exports.getUpcomingAppointments = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointments = await Appointment.find({
      preferredDate: { $gte: today },
      status: { $in: ['pending', 'confirmed'] }
    })
    .sort({ preferredDate: 1, preferredTime: 1 })
    .limit(10);
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Export appointments to CSV/JSON
// @route   GET /api/admin/appointments/export
// @access  Private/Admin
exports.exportAppointments = async (req, res, next) => {
  try {
    const { format = 'json', ...filters } = req.query;
    
    // Apply same filters as getAllAppointments
    const filter = {};
    if (filters.status && filters.status !== 'all') filter.status = filters.status;
    if (filters.serviceType && filters.serviceType !== 'all') filter.serviceType = filters.serviceType;
    
    const appointments = await Appointment.find(filter).lean();
    
    if (format === 'csv') {
      const { createObjectCsvWriter } = require('csv-writer');
      const csvWriter = createObjectCsvWriter({
        path: 'temp/appointments.csv',
        header: [
          { id: 'referenceNumber', title: 'رقم المرجع' },
          { id: 'clientName', title: 'اسم العميل' },
          { id: 'clientEmail', title: 'البريد الإلكتروني' },
          { id: 'clientPhone', title: 'رقم الهاتف' },
          { id: 'serviceType', title: 'نوع الخدمة' },
          { id: 'preferredDate', title: 'التاريخ' },
          { id: 'preferredTime', title: 'الوقت' },
          { id: 'status', title: 'الحالة' },
          { id: 'meetingType', title: 'نوع الاجتماع' },
          { id: 'createdAt', title: 'تاريخ الإنشاء' }
        ]
      });
      
      await csvWriter.writeRecords(appointments);
      
      res.download('temp/appointments.csv', `appointments-${Date.now()}.csv`);
      
    } else {
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    }
    
  } catch (error) {
    next(error);
  }
};