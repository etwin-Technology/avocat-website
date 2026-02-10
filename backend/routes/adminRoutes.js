const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(protect);

// Dashboard statistics
router.get('/stats', statsController.getDashboardStats);
router.get('/stats/appointments-chart', statsController.getAppointmentsChartData);
router.get('/stats/contacts-chart', statsController.getContactsChartData);

module.exports = router;