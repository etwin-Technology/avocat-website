const Admin = require('../models/Admin');
const { AppError } = require('../middleware/errorHandler');

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError('يرجى إدخال البريد الإلكتروني وكلمة المرور', 400));
    }
    
    // Find admin
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin || !(await admin.comparePassword(password))) {
      return next(new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة', 401));
    }
    
    // Check if admin is active
    if (!admin.isActive) {
      return next(new AppError('تم إلغاء تفعيل حسابك', 403));
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });
    
    // Generate token
    const token = admin.generateAuthToken();
    
    // Remove password from output
    admin.password = undefined;
    
    res.status(200).json({
      status: 'success',
      data: {
        admin,
        token
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Register new admin (only for super admin)
// @route   POST /api/auth/register
// @access  Private/Super Admin
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, permissions } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new AppError('البريد الإلكتروني موجود مسبقاً', 400));
    }
    
    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin',
      permissions: permissions || {
        appointments: { view: true, create: true, update: true, delete: true },
        contacts: { view: true, create: true, update: true, delete: true },
        dashboard: { view: true },
        settings: { view: true, update: true }
      }
    });
    
    // Generate token
    const token = admin.generateAuthToken();
    
    // Remove password from output
    admin.password = undefined;
    
    res.status(201).json({
      status: 'success',
      data: {
        admin,
        token
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    
    res.status(200).json({
      status: 'success',
      data: {
        admin
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, profileImage } = req.body;
    
    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (profileImage) updateData.profileImage = profileImage;
    
    // Update admin
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        admin
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin password
// @route   PUT /api/auth/update-password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get admin with password
    const admin = await Admin.findById(req.admin.id).select('+password');
    
    // Check current password
    if (!(await admin.comparePassword(currentPassword))) {
      return next(new AppError('كلمة المرور الحالية غير صحيحة', 401));
    }
    
    // Update password
    admin.password = newPassword;
    await admin.save();
    
    // Generate new token
    const token = admin.generateAuthToken();
    
    res.status(200).json({
      status: 'success',
      message: 'تم تحديث كلمة المرور بنجاح',
      data: {
        token
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Logout admin (client-side should remove token)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'تم تسجيل الخروج بنجاح'
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get all admins (for super admin)
// @route   GET /api/auth/admins
// @access  Private/Super Admin
exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-password');
    
    res.status(200).json({
      status: 'success',
      results: admins.length,
      data: {
        admins
      }
    });
    
  } catch (error) {
    next(error);
  }
};