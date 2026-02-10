const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect, requirePermission } = require('../middleware/authMiddleware');
const { validateAppointment, validateQueryParams,validateAppointmentUpdate } = require('../middleware/validationMiddleware');

// Apply authentication and permission middleware to all routes
router.use(protect);
router.use(requirePermission('appointments.view'));

// Admin routes
router.get('/', validateQueryParams, appointmentController.getAllAppointments);
router.get('/today', appointmentController.getTodayAppointments);
router.get('/upcoming', appointmentController.getUpcomingAppointments);
router.get('/export', appointmentController.exportAppointments);
router.get('/:id', appointmentController.getAppointment);

router.post('/', 
  requirePermission('appointments.create'),
  validateAppointment,
  appointmentController.createAppointment
);

router.put('/:id',
  requirePermission('appointments.update'),
  validateAppointmentUpdate,
  appointmentController.updateAppointment
);

router.delete('/:id',
  requirePermission('appointments.delete'),
  appointmentController.deleteAppointment
);

router.put('/:id/status', appointmentController.updateAppointmentStatus);
router.post('/:id/reschedule', appointmentController.rescheduleAppointment);
router.post('/bulk-actions', appointmentController.bulkActions);

module.exports = router;