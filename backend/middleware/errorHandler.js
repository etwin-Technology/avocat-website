class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    console.error('🔥 Error:', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query
    });
    
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }
  
  // Production error response
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'معرف غير صالح'
    });
  }
  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      status: 'error',
      message: 'أخطاء في التحقق من صحة البيانات',
      errors: messages
    });
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      status: 'error',
      message: `${field} موجود مسبقاً`
    });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'رمز الدخول غير صالح'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'انتهت صلاحية رمز الدخول'
    });
  }
  
  // Default error
  return res.status(err.statusCode).json({
    status: 'error',
    message: err.isOperational ? err.message : 'حدث خطأ غير متوقع'
  });
};

const notFoundHandler = (req, res, next) => {
  const error = new AppError(`المسار ${req.originalUrl} غير موجود`, 404);
  next(error);
};

module.exports = {
  AppError,
  errorHandler,
  notFoundHandler
};