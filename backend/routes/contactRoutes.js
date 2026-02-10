const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, requirePermission } = require('../middleware/authMiddleware');
const { validateContact, validateQueryParams } = require('../middleware/validationMiddleware');

// Public route
router.post('/', validateContact, contactController.submitContactForm);

// Protected routes
router.use(protect);
router.use(requirePermission('contacts.view'));

// Admin routes
router.get('/', validateQueryParams, contactController.getAllContacts);
router.get('/new', contactController.getNewContacts);
router.get('/emergency', contactController.getEmergencyContacts);
router.get('/export', contactController.exportContacts);
router.get('/:id', contactController.getContact);

router.post('/bulk-actions', contactController.bulkActions);

router.post('/',
  requirePermission('contacts.create'),
  validateContact,
  contactController.createContact
);

router.put('/:id',
  requirePermission('contacts.update'),
  validateContact,
  contactController.updateContact
);

router.delete('/:id',
  requirePermission('contacts.delete'),
  contactController.deleteContact
);

router.put('/:id/status', contactController.updateContactStatus);
router.put('/:id/urgency', contactController.updateContactUrgency);
router.post('/:id/reply', contactController.replyToContact);
router.post('/:id/follow-up', contactController.setContactFollowUp);

module.exports = router;