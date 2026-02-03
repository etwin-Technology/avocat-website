const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Message Details
  subject: {
    type: String,
    trim: true,
    default: 'General Inquiry',
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },
  
  // Optional fields
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  
  serviceType: {
    type: String,
    trim: true,
    default: ''
  },
  
  language: {
    type: String,
    enum: ['ar', 'fr', 'en'],
    default: 'fr'
  },
  
  source: {
    type: String,
    default: 'contact_page'
  },
  
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  }

}, {
  timestamps: true
});

// Generate reference before saving
contactSchema.pre('save', async function() {
  if (!this.referenceNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `CONTACT-${year}${month}${day}-${randomNum}`;
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;