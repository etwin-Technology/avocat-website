const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // Personal Information
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  clientEmail: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  
  clientPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  
  // Appointment Details
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'legal_consultation',
      'notary_service',
      'contract_review',
      'court_representation',
      'business_setup',
      'family_law',
      'real_estate',
      'criminal_defense',
      'tax_law',
      'labor_law',
      'immigration',
      'intellectual_property',
      'other'
    ],
    default: 'legal_consultation'
  },
  
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    enum: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  },
  
  // Additional Information
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    default: ''
  },
  
  language: {
    type: String,
    enum: ['ar', 'fr', 'en'],
    default: 'fr'
  },
  
  meetingType: {
    type: String,
    enum: ['in_person', 'video_call', 'phone_call'],
    default: 'in_person'
  },
  
  location: {
    type: String,
    enum: ['casablanca', 'rabat', 'marrakech', 'online'],
    default: 'casablanca'
  },
  
  urgencyLevel: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  
  // System Fields
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'pending'
  },
  
  referenceNumber: {
    type: String,
    unique: true
  }
  
}, {
  timestamps: true
});

// FIXED: Generate reference number before saving - ASYNC VERSION
appointmentSchema.pre('save', async function() {
  console.log('🔧 Pre-save hook triggered');
  
  // Generate reference number only if it doesn't exist
  if (!this.referenceNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `LP-${year}${month}${day}-${randomNum}`;
    console.log(`✅ Generated reference number: ${this.referenceNumber}`);
  }
  
  // Ensure status is set
  if (!this.status) {
    this.status = 'pending';
  }
  
  // NO next() call needed in async version
});

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  if (!this.preferredDate) return '';
  
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return this.preferredDate.toLocaleDateString(this.language === 'ar' ? 'ar-MA' : 
                                               this.language === 'fr' ? 'fr-FR' : 'en-US', 
                                               options);
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;