const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('📧 Contact form submission:', req.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }
    
    // Create contact with all possible fields
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      subject: req.body.subject || req.body.serviceType || 'General Inquiry',
      message: req.body.message,
      urgency: req.body.urgency || 'normal',
      serviceType: req.body.serviceType || '',
      language: req.body.language || 'fr',
      source: req.body.source || 'contact_page'
    };
    
    console.log('📝 Creating contact with data:', contactData);
    
    const contact = new Contact(contactData);
    const savedContact = await contact.save();
    
    console.log(`✅ Contact saved successfully: ${savedContact.referenceNumber}`);
    
    // Return success response with 201 status
    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully! We will contact you soon.',
      data: {
        contactId: savedContact._id,
        referenceNumber: savedContact.referenceNumber,
        submittedAt: savedContact.createdAt,
        name: savedContact.name,
        email: savedContact.email,
        subject: savedContact.subject,
        message: savedContact.message
      }
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
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
        message: 'Duplicate entry detected'
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
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contact/test
// @desc    Test contact endpoint
// @access  Public
router.get('/test', async (req, res) => {
  try {
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+212600000000',
      subject: 'Test Inquiry',
      message: 'This is a test message',
      urgency: 'normal',
      serviceType: 'legal_consultation',
      language: 'fr',
      source: 'test'
    });
    
    const saved = await testContact.save();
    
    res.json({
      status: 'success',
      message: 'Test contact created',
      data: {
        referenceNumber: saved.referenceNumber,
        name: saved.name,
        email: saved.email,
        createdAt: saved.createdAt
      }
    });
    
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      error: error.stack
    });
  }
});

// @route   GET /api/contact/debug
// @desc    Debug endpoint to check if contact route is working
// @access  Public
router.get('/debug', (req, res) => {
  res.json({
    status: 'success',
    message: 'Contact route is working',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: '/api/contact - Submit contact form',
      GET: '/api/contact/test - Test endpoint'
    }
  });
});

module.exports = router;