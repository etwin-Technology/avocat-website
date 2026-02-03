const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get available time slots for a specific date
router.get('/slots', async (req, res) => {
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
        message: 'Invalid date format. Please use YYYY-MM-DD format.'
      });
    }

    // Set to start of day
    queryDate.setHours(0, 0, 0, 0);
    const endDate = new Date(queryDate);
    endDate.setHours(23, 59, 59, 999);

    // Get all time slots
    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

    // Get booked appointments for this date
    const bookedAppointments = await Appointment.find({
      preferredDate: { $gte: queryDate, $lte: endDate },
      status: { $in: ['pending', 'confirmed'] }
    }).select('preferredTime');

    const bookedSlots = bookedAppointments.map(appt => appt.preferredTime);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    console.log(`✅ Availability checked for ${date}: ${availableSlots.length} slots available`);

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
    console.error('Availability check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check availability'
    });
  }
});

// Check multiple dates availability
router.get('/bulk', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'startDate and endDate parameters are required'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format'
      });
    }

    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    const availability = [];

    // For each date in range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const bookedAppointments = await Appointment.find({
        preferredDate: { $gte: dayStart, $lte: dayEnd },
        status: { $in: ['pending', 'confirmed'] }
      }).select('preferredTime');

      const bookedSlots = bookedAppointments.map(appt => appt.preferredTime);
      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

      availability.push({
        date: dateStr,
        availableSlots,
        availableCount: availableSlots.length,
        isAvailable: availableSlots.length > 0
      });
    }

    res.json({
      status: 'success',
      data: availability
    });

  } catch (error) {
    console.error('Bulk availability error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check availability'
    });
  }
});

module.exports = router;