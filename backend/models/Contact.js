const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'بريد إلكتروني غير صالح']
  },
  phone: {
    type: String
  },

  // Message Details
  subject: {
    type: String,
    required: [true, 'الموضوع مطلوب'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة'],
    maxlength: [5000, 'الرسالة يجب أن لا تتجاوز 5000 حرف']
  },

  // Classification
  serviceType: {
    type: String,
    enum: [
      'general',
      'legal_consultation',
      'notary_service',
      'contract_review',
      'court_representation',
      
      'other'
    ],
    default: 'general'
  },
  urgency: {
    type: String,
    enum: ['emergency', 'urgent', 'high', 'normal', 'low'],
    default: 'normal'
  },
  language: {
    type: String,
    enum: ['ar', 'fr', 'en'],
    default: 'en' // just for info, NOT used in text index
  },

  // Source & Category
  source: {
    type: String,
    enum: ['contact_page', 'website', 'phone', 'email', 'admin_dashboard', 'whatsapp', 'social_media'],
    default: 'contact_page'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in_progress', 'replied', 'closed', 'archived'],
    default: 'new'
  },
  category: {
    type: String,
    enum: ['inquiry', 'complaint', 'suggestion', 'feedback', 'request', 'other'],
    default: 'inquiry'
  },
  tags: [{ type: String, trim: true }],

  // Response Tracking
  respondedAt: { type: Date },
  responseMessage: { type: String, maxlength: [5000, 'رسالة الرد يجب أن لا تتجاوز 5000 حرف'] },
  respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },

  // Follow-up
  followUpDate: { type: Date },
  followUpNotes: { type: String },
  followUpCompleted: { type: Boolean, default: false },

  // Analytics
  ipAddress: { type: String },
  userAgent: { type: String },

  // Reference
  referenceNumber: {
    type: String,
    unique: true,
    default: () => `CONT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ===== Indexes =====
contactSchema.index({ status: 1 });
contactSchema.index({ urgency: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ respondedAt: 1 });
contactSchema.index({ followUpDate: 1 });
contactSchema.index({ referenceNumber: 1 }, { unique: true });

// ✅ Text index WITHOUT language_override (avoids errors)
contactSchema.index(
  { name: 'text', email: 'text', subject: 'text', message: 'text' },
  { weights: { name: 1, email: 1, subject: 1, message: 1 }, default_language: 'arbic', background: true }
);


// ===== Virtuals =====
contactSchema.virtual('responseTimeHours').get(function() {
  if (!this.respondedAt || !this.createdAt) return null;
  const diff = this.respondedAt - this.createdAt;
  return Math.round(diff / (1000 * 60 * 60) * 100) / 100;
});

contactSchema.virtual('ageInDays').get(function() {
  const diff = Date.now() - this.createdAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

contactSchema.virtual('requiresImmediateAttention').get(function() {
  return this.urgency === 'emergency' || 
         (this.urgency === 'urgent' && this.status === 'new') ||
         (this.ageInDays >= 2 && this.status === 'new');
});

// ===== Middleware =====
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.isModified('status') && this.status === 'replied' && !this.respondedAt) {
    this.respondedAt = new Date();
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
