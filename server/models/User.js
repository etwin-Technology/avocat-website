const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
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
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['client', 'lawyer', 'admin', 'receptionist'],
    default: 'client'
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
  },
  avatar: {
    type: String,
    default: ''
  },
  specialization: {
    type: String,
    enum: ['family_law', 'criminal_law', 'business_law', 'real_estate', 'tax_law', 'labor_law', 'immigration', 'intellectual_property', 'general'],
    default: 'general'
  },
  languages: [{
    type: String,
    enum: ['ar', 'fr', 'en', 'es']
  }],
  location: {
    type: String,
    enum: ['casablanca', 'rabat', 'marrakech', 'tanger', 'agadir', 'online'],
    default: 'casablanca'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false }
    },
    language: {
      type: String,
      enum: ['ar', 'fr', 'en'],
      default: 'fr'
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate auth token (simplified - use JWT library in production)
userSchema.methods.generateAuthToken = function() {
  // In production, use: jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET)
  return `jwt_${this._id}_${Date.now()}`;
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ location: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;