const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token, authorization denied'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Token is not valid'
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.admin.role !== 'admin' && req.admin.role !== 'superadmin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin rights required.'
    });
  }
  next();
};

const superAdminMiddleware = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Super admin rights required.'
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, superAdminMiddleware };