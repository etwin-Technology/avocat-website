const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const { auth, isAdmin } = require('../middleware/auth');
const { sendEmail } = require('../config/email');
const router = express.Router();

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();

    // Send confirmation email
    await sendEmail(
      message.email,
      'Message reçu - Legal Pro Morocco',
      `Bonjour ${message.name},\n\nNous avons bien reçu votre message concernant "${message.subject}".\n\nNous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe Legal Pro Morocco`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Message reçu</h2>
        <p>Bonjour ${message.name},</p>
        <p>Nous avons bien reçu votre message concernant <strong>"${message.subject}"</strong>.</p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
        <hr>
        <p style="color: #6b7280; font-size: 0.9em;">Cordialement,<br>L'équipe Legal Pro Morocco</p>
      </div>`
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all messages (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1, isRead: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark as read (admin only)
router.patch('/:id/read', auth, isAdmin, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;