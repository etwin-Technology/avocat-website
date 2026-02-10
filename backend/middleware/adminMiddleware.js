const Admin = require('../models/Admin');

const requireAdminRole = async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        status: 'error',
        message: 'يرجى تسجيل الدخول كمشرف'
      });
    }
    
    // Check if user is admin or super admin
    if (!['admin', 'super_admin'].includes(req.admin.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'مطلوب صلاحية مشرف للوصول إلى هذا المورد'
      });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'خطأ في التحقق من صلاحيات المشرف'
    });
  }
};

const requireSuperAdmin = async (req, res, next) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        status: 'error',
        message: 'يرجى تسجيل الدخول'
      });
    }
    
    // Check if user is super admin
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({
        status: 'error',
        message: 'مطلوب صلاحية مشرف رئيسي للوصول إلى هذا المورد'
      });
    }
    
    next();
  } catch (error) {
    console.error('Super admin middleware error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'خطأ في التحقق من صلاحيات المشرف الرئيسي'
    });
  }
};

module.exports = { requireAdminRole, requireSuperAdmin };