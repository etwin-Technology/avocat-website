const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, requirePermission } = require('../middleware/authMiddleware');
const { requireSuperAdmin } = require('../middleware/adminMiddleware');
const { validateLogin, validateRegister } = require('../middleware/validationMiddleware');

// Public routes
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.use(protect);

router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);
router.put('/update-password', authController.updatePassword);

// Super admin only routes
router.get('/admins', requireSuperAdmin, authController.getAllAdmins);
router.post('/register', requireSuperAdmin, validateRegister, authController.register);

module.exports = router;