const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'يرجى تسجيل الدخول للوصول إلى هذا المورد'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if admin still exists
    const admin = await Admin.findById(decoded.id).select('+lastLogin');
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'المستخدم غير موجود أو تم إلغاء تفعيل الحساب'
      });
    }
    
    // Update last login if more than 1 hour ago
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (!admin.lastLogin || admin.lastLogin < oneHourAgo) {
      admin.lastLogin = new Date();
      await admin.save({ validateBeforeSave: false });
    }
    
    // Attach admin to request
    req.admin = admin;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'رمز الدخول غير صالح'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'انتهت صلاحية رمز الدخول'
      });
    }
    
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'خطأ في التحقق من الهوية'
    });
  }
};

const requirePermission = (permissionPath) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        status: 'error',
        message: 'غير مصرح بالوصول'
      });
    }
    
    // Super admin has all permissions
    if (req.admin.role === 'super_admin') {
      return next();
    }
    
    // Check specific permission
    const permissions = req.admin.permissions;
    const pathParts = permissionPath.split('.');
    
    let currentLevel = permissions;
    for (const part of pathParts) {
      currentLevel = currentLevel?.[part];
      if (currentLevel === undefined) break;
    }
    
    if (currentLevel !== true) {
      return res.status(403).json({
        status: 'error',
        message: 'ليس لديك صلاحية للوصول إلى هذا المورد'
      });
    }
    
    next();
  };
};

module.exports = { protect, requirePermission };