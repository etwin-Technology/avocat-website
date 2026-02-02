const express = require('express');
const Appointment = require('../models/Appointment');
const { auth, isAdmin } = require('../middleware/auth');
const { sendEmail } = require('../config/email');
const router = express.Router();

// Create appointment (public)
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send confirmation email to client
    await sendEmail(
      appointment.clientEmail,
      'Demande de rendez-vous reçue - Legal Pro Morocco',
      `Bonjour ${appointment.clientName},\n\nNous avons bien reçu votre demande de rendez-vous pour le ${appointment.date} à ${appointment.time}.\n\nNous vous contacterons dans les plus brefs délais pour confirmer.\n\nCordialement,\nL'équipe Legal Pro Morocco`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Demande de rendez-vous reçue</h2>
        <p>Bonjour ${appointment.clientName},</p>
        <p>Nous avons bien reçu votre demande de rendez-vous pour le <strong>${appointment.date}</strong> à <strong>${appointment.time}</strong>.</p>
        <p>Service demandé : ${appointment.serviceType}</p>
        <p>Nous vous contacterons dans les plus brefs délais pour confirmer.</p>
        <hr>
        <p style="color: #6b7280; font-size: 0.9em;">Cordialement,<br>L'équipe Legal Pro Morocco</p>
      </div>`
    );

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const appointments = await Appointment.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .populate('assignedTo', 'name profession');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update appointment status (admin only)
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    // Send status update email
    const statusMessages = {
      confirmed: 'confirmé',
      cancelled: 'annulé',
    };

    if (statusMessages[status]) {
      await sendEmail(
        appointment.clientEmail,
        `Rendez-vous ${statusMessages[status]} - Legal Pro Morocco`,
        `Bonjour ${appointment.clientName},\n\nVotre rendez-vous du ${appointment.date} à ${appointment.time} a été ${statusMessages[status]}.\n\nCordialement,\nL'équipe Legal Pro Morocco`,
        `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">Rendez-vous ${statusMessages[status]}</h2>
          <p>Bonjour ${appointment.clientName},</p>
          <p>Votre rendez-vous du <strong>${appointment.date}</strong> à <strong>${appointment.time}</strong> a été <strong>${statusMessages[status]}</strong>.</p>
          <hr>
          <p style="color: #6b7280; font-size: 0.9em;">Cordialement,<br>L'équipe Legal Pro Morocco</p>
        </div>`
      );
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;