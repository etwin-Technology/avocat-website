const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// CORS middleware for this router
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Handle preflight requests
router.options('*', (req, res) => {
  res.sendStatus(200);
});

// @route   GET /api/appointments/availability/slots
// @desc    Get available time slots for a date
// @access  Public
router.get('/availability/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    console.log('📅 Public availability check for date:', date);

    if (!date) {
      return res.status(400).json({
        status: 'error',
        message: 'Date is required'
      });
    }

    // Parse and validate date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }

    // Set time to start of day
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Set time to end of day
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get booked appointments for this date (only pending and confirmed)
    const appointments = await Appointment.find({
      preferredDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $in: ['pending', 'confirmed'] }
    }).select('preferredTime');

    // All possible time slots
    const allTimeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    
    // Get booked times
    const bookedTimes = appointments.map(app => app.preferredTime);
    
    // Find available slots (not booked)
    const availableSlots = allTimeSlots.filter(time => !bookedTimes.includes(time));

    console.log(`✅ Found ${availableSlots.length} available slots for ${date}`);

    return res.status(200).json({
      status: 'success',
      data: {
        date: date,
        availableSlots: availableSlots,
        totalSlots: allTimeSlots.length,
        bookedSlots: bookedTimes.length
      },
      message: availableSlots.length > 0 
        ? 'Available slots retrieved successfully'
        : 'No available slots for this date'
    });

  } catch (error) {
    console.error('❌ Availability check error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to check availability'
    });
  }
});

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const appointmentData = req.body;
    
    console.log('📝 Creating new appointment for:', appointmentData.clientName);
    console.log('📅 Raw date from frontend:', appointmentData.preferredDate);
    console.log('🕒 Raw time from frontend:', appointmentData.preferredTime);

    // Validate required fields
    const requiredFields = ['clientName', 'clientEmail', 'clientPhone', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !appointmentData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // **FIXED: Parse date properly - handle YYYY-MM-DD format**
    let appointmentDate;
    try {
      // The date comes as YYYY-MM-DD from the frontend
      const [year, month, day] = appointmentData.preferredDate.split('-');
      appointmentDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      
      // Validate date
      if (isNaN(appointmentDate.getTime())) {
        throw new Error('Invalid date');
      }
      
      console.log('📅 Parsed appointment date:', appointmentDate);
      console.log('📅 ISO String:', appointmentDate.toISOString());
      
    } catch (error) {
      console.error('❌ Date parsing error:', error);
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format. Please use YYYY-MM-DD format'
      });
    }

    // Check if date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot book appointment in the past'
      });
    }

    // **FIXED: Validate time slot format**
    // Convert time from "2:00 PM" format to "14:00" format if needed
    let time24h = appointmentData.preferredTime;
    
    // Check if time is in AM/PM format and convert to 24h
    if (time24h.includes('AM') || time24h.includes('PM')) {
      const [time, period] = time24h.split(' ');
      let [hours, minutes] = time.split(':');
      
      hours = parseInt(hours);
      
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      time24h = `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
    }
    
    console.log('🕒 Processed time (24h format):', time24h);

    // Validate time slot matches the allowed slots
    const validTimeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    if (!validTimeSlots.includes(time24h)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid time slot. Must be one of: ${validTimeSlots.join(', ')}`
      });
    }

    // Check if time slot is available
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointment = await Appointment.findOne({
      preferredDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      preferredTime: time24h,
      status: { $in: ['pending', 'confirmed'] }

      
    });

    if (existingAppointment) {
      return res.status(400).json({
        status: 'error',
        message: 'This time slot is already booked'
      });
    }

    // **FIXED: Create appointment with proper date format**
    const appointment = await Appointment.create({
      clientName: appointmentData.clientName,
      clientEmail: appointmentData.clientEmail,
      clientPhone: appointmentData.clientPhone,
      serviceType: appointmentData.serviceType || 'legal_consultation',
      preferredDate: appointmentDate, // Already parsed as Date object
      preferredTime: time24h, // Use 24h format
      meetingType: appointmentData.meetingType || 'in_person',
      location: appointmentData.location || 'casablanca',
      urgencyLevel: appointmentData.urgencyLevel || 'normal',
      message: appointmentData.message || '',
      language: appointmentData.language || 'fr',
      status: 'pending'
    });

    console.log('✅ Appointment created with reference:', appointment.referenceNumber);

    return res.status(201).json({
      status: 'success',
      message: 'Appointment booked successfully',
      data: {
        appointment: {
          id: appointment._id,
          referenceNumber: appointment.referenceNumber,
          clientName: appointment.clientName,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
          status: appointment.status
        }
      }
    });

  } catch (error) {
    console.error('❌ Create appointment error:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Handle duplicate reference number (very rare case)
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Duplicate appointment reference, please try again'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Failed to create appointment: ' + error.message
    });
  }
});

// @route   GET /api/appointments/:referenceNumber
// @desc    Get appointment by reference number
// @access  Public
router.get('/:referenceNumber', async (req, res) => {
  try {
    const { referenceNumber } = req.params;
    
    console.log('🔍 Looking up appointment:', referenceNumber);

    const appointment = await Appointment.findOne({ referenceNumber })
      .select('-__v -updatedAt -notes -cancellationReason -assignedTo');

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        appointment: {
          referenceNumber: appointment.referenceNumber,
          clientName: appointment.clientName,
          serviceType: appointment.serviceType,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
          meetingType: appointment.meetingType,
          location: appointment.location,
          status: appointment.status,
          createdAt: appointment.createdAt
        }
      }
    });

  } catch (error) {
    console.error('❌ Lookup error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to lookup appointment'
    });
  }
});

module.exports = router;