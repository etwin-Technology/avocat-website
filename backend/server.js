const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/database');

// Import error handlers
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicAppointmentRoutes = require('./routes/publicAppointmentRoutes');


// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'تم تجاوز عدد الطلبات المسموح بها، يرجى المحاولة مرة أخرى لاحقاً'
  }
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/appointments', appointmentRoutes);
app.use('/api/admin/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', publicAppointmentRoutes);  // ⬅️ هذا للمستخدمين العاديين
app.use('/api/contacts', contactRoutes);


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Law Firm Management API',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        profile: 'GET /api/auth/profile'
      },
      appointments: {
        getAll: 'GET /api/admin/appointments',
        create: 'POST /api/admin/appointments',
        update: 'PUT /api/admin/appointments/:id',
        delete: 'DELETE /api/admin/appointments/:id'
      },
      contacts: {
        getAll: 'GET /api/admin/contacts',
        submit: 'POST /api/contacts',
        create: 'POST /api/admin/contacts',
        update: 'PUT /api/admin/contacts/:id'
      },
      dashboard: {
        stats: 'GET /api/admin/stats',
        charts: 'GET /api/admin/stats/*-chart'
      }
    }
  });
});

// Test contact endpoint (for debugging)
app.get('/api/contact/debug', (req, res) => {
  res.json({
    status: 'success',
    message: 'Contact endpoint is working',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('/api/', notFoundHandler);

// Global error handler
app.use(errorHandler);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🔐 Default Admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;