const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // Client Information
  clientName: {
    type: String,
    required: [true, 'اسم العميل مطلوب'],
    trim: true
  },
  clientEmail: {
    type: String,
    required: [true, 'البريد الإلكتروني للعميل مطلوب'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'بريد إلكتروني غير صالح']
  },
  clientPhone: {
    type: String,
    required: [true, 'رقم هاتف العميل مطلوب']
  },
  
  // Appointment Details
  serviceType: {
    type: String,
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
    default: 'legal_consultation',
    required: true
  },
  
  preferredDate: {
    type: Date,
    required: [true, 'تاريخ الموعد مطلوب']
  },
  
  preferredTime: {
    type: String,
    required: [true, 'وقت الموعد مطلوب'],
    enum: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  },
  
  meetingType: {
    type: String,
    enum: ['in_person', 'video_call', 'phone_call'],
    default: 'in_person'
  },
  
  location: {
    type: String,
    enum: ['casablanca', 'rabat', 'marrakech', 'tanger', 'fes', 'agadir', 'online'],
    default: 'casablanca'
  },
  
  // Status & Tracking
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show'],
    default: 'pending'
  },
  
  urgencyLevel: {
    type: String,
    enum: ['emergency', 'urgent', 'high', 'normal', 'low'],
    default: 'normal'
  },
  
  language: {
    type: String,
    enum: ['ar', 'fr', 'en'],
    default: 'ar'
  },
  
  // Additional Information
  message: {
    type: String,
    maxlength: [1000, 'الرسالة يجب أن لا تتجاوز 1000 حرف']
  },
  
  notes: {
    type: String,
    maxlength: [2000, 'الملاحظات يجب أن لا تتجاوز 2000 حرف']
  },
  
  referenceNumber: {
    type: String,
    unique: true,
    default: () => `APPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  },
  
  // Admin Actions
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  
  cancellationReason: {
    type: String
  },
  
  rescheduledFrom: {
    type: Date
  },
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'cancelled'],
    default: 'pending'
  },
  
  amount: {
    type: Number,
    min: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ preferredDate: 1 });
appointmentSchema.index({ serviceType: 1 });
appointmentSchema.index({ clientEmail: 1 });
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index(
  { clientName: 'text', clientEmail: 'text', message: 'text' },
  { default_language: 'english', language_override: 'none' }
);

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  return this.preferredDate.toLocaleDateString('ar-MA');
});

// Middleware to update updatedAt
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;