const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('📅 Creating new appointment:', req.body);
    
    // Validate required fields
    const requiredFields = ['clientName', 'clientEmail', 'clientPhone', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.clientEmail)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }
    
    // Parse and validate date
    let appointmentDate;
    try {
      appointmentDate = new Date(req.body.preferredDate);
      if (isNaN(appointmentDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }
    
    // Check if date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        status: 'error',
        message: 'Appointment date must be in the future'
      });
    }
    
    // Check for duplicate appointment at same time
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingAppointment = await Appointment.findOne({
      preferredDate: { $gte: startOfDay, $lte: endOfDay },
      preferredTime: req.body.preferredTime,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return res.status(409).json({
        status: 'error',
        message: 'This time slot is already booked. Please choose another time.'
      });
    }
    
    // Create appointment
    const appointmentData = {
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientPhone: req.body.clientPhone,
      serviceType: req.body.serviceType || 'legal_consultation',
      preferredDate: appointmentDate,
      preferredTime: req.body.preferredTime,
      message: req.body.message || '',
      language: req.body.language || 'fr',
      meetingType: req.body.meetingType || 'in_person',
      location: req.body.location || 'casablanca',
      urgencyLevel: req.body.urgencyLevel || 'normal'
    };
    
    console.log('📝 Creating appointment with data:', appointmentData);
    
    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();
    
    console.log(`✅ Appointment created: ${savedAppointment.referenceNumber}`);
    
    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Appointment requested successfully! We will contact you soon.',
      data: {
        referenceNumber: savedAppointment.referenceNumber,
        appointmentId: savedAppointment._id,
        appointment: {
          ...savedAppointment.toObject(),
          formattedDate: savedAppointment.formattedDate
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Appointment creation error:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'Duplicate reference number detected. Please try again.'
      });
    }
    
    // Handle specific pre-save hook errors
    if (error.message.includes('next is not a function')) {
      console.error('⚠️ This indicates a middleware issue in the model');
      return res.status(500).json({
        status: 'error',
        message: 'Server configuration error. Please contact support.'
      });
    }
    
    // Generic error
    res.status(500).json({
      status: 'error',
      message: 'Failed to create appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/appointments/availability/slots
// @desc    Get available time slots for a specific date
// @access  Public
router.get('/availability/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        status: 'error',
        message: 'Date parameter is required'
      });
    }
    
    // Parse date
    const queryDate = new Date(date);
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }
    
    // Set to start and end of day
    const startOfDay = new Date(queryDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(queryDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    // All possible time slots
    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    
    // Get booked appointments for this date
    const bookedAppointments = await Appointment.find({
      preferredDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] }
    }).select('preferredTime');
    
    const bookedSlots = bookedAppointments.map(appt => appt.preferredTime);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    
    console.log(`✅ Availability for ${date}: ${availableSlots.length} slots available`);
    
    res.json({
      status: 'success',
      data: {
        date: date,
        allSlots,
        availableSlots,
        bookedSlots,
        totalSlots: allSlots.length,
        availableCount: availableSlots.length,
        bookedCount: bookedSlots.length
      }
    });
    
  } catch (error) {
    console.error('❌ Availability check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check availability'
    });
  }
});

// @route   GET /api/appointments/:reference
// @desc    Get appointment by reference number
// @access  Public
router.get('/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    const appointment = await Appointment.findOne({ referenceNumber: reference });
    
    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }
    
    res.json({
      status: 'success',
      data: {
        appointment: {
          ...appointment.toObject(),
          formattedDate: appointment.formattedDate
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Get appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointment'
    });
  }
});

module.exports = router;