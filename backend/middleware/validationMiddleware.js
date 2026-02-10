const { body, query, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'أخطاء في التحقق من صحة البيانات',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

// Auth validation rules
const validateLogin = [
  body('email')
    .isEmail().withMessage('بريد إلكتروني غير صالح')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  
  validateRequest
];

const validateRegister = [
  body('name')
    .notEmpty().withMessage('الاسم مطلوب')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('الاسم يجب أن يكون بين 2 و 50 حرف'),
  
  body('email')
    .isEmail().withMessage('بريد إلكتروني غير صالح')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم'),
  
  validateRequest
];

// Appointment validation rules
const validateAppointment = [
  body('clientName')
    .notEmpty().withMessage('اسم العميل مطلوب')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  
  body('clientEmail')
    .isEmail().withMessage('بريد إلكتروني غير صالح')
    .normalizeEmail(),
  
  body('clientPhone')
    .notEmpty().withMessage('رقم الهاتف مطلوب')
    .matches(/^[+\d\s\-()]{8,20}$/).withMessage('رقم هاتف غير صالح'),
  
  body('serviceType')
    .notEmpty().withMessage('نوع الخدمة مطلوب')
    .isIn([
      'legal_consultation', 'notary_service', 'contract_review', 
      'court_representation', 'business_setup', 'family_law',
      'real_estate', 'criminal_defense', 'tax_law', 'labor_law',
      'immigration', 'intellectual_property', 'other'
    ]).withMessage('نوع خدمة غير صالح'),
  
  body('preferredDate')
    .notEmpty().withMessage('التاريخ المفضل مطلوب')
    .isISO8601().withMessage('تاريخ غير صالح'),
  
  body('preferredTime')
    .notEmpty().withMessage('الوقت المفضل مطلوب')
    .isIn(['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'])
    .withMessage('وقت غير صالح'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('الرسالة يجب أن لا تتجاوز 1000 حرف'),
  
  validateRequest
];

// Contact validation rules
const validateContact = [
  body('name')
    .notEmpty().withMessage('الاسم مطلوب')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  
  body('email')
    .isEmail().withMessage('بريد إلكتروني غير صالح')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .matches(/^[+\d\s\-()]{8,20}$/).withMessage('رقم هاتف غير صالح'),
  
  body('subject')
    .notEmpty().withMessage('الموضوع مطلوب')
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('الموضوع يجب أن يكون بين 2 و 200 حرف'),
  
  body('message')
    .notEmpty().withMessage('الرسالة مطلوبة')
    .trim()
    .isLength({ min: 10, max: 5000 }).withMessage('الرسالة يجب أن تكون بين 10 و 5000 حرف'),
  
  validateRequest
];

// Query validation rules
const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('الصفحة يجب أن تكون رقم موجب')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('الحد يجب أن يكون بين 1 و 100')
    .toInt(),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'preferredDate', 'name', 'clientName', 'status', 'urgency'])
    .withMessage('ترتيب غير صالح'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('اتجاه الترتيب غير صالح'),
  
  validateRequest
];
// Update appointment validation
const validateAppointmentUpdate = [
  body('clientName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  
  body('clientEmail')
    .optional()
    .isEmail().withMessage('بريد إلكتروني غير صالح')
    .normalizeEmail(),
  
  body('clientPhone')
    .optional()
    .matches(/^[+\d\s\-()]{8,20}$/).withMessage('رقم هاتف غير صالح'),
  
  body('serviceType')
    .optional()
    .isIn([
      'legal_consultation', 'notary_service', 'contract_review', 
      'court_representation', 'business_setup', 'family_law',
      'real_estate', 'criminal_defense', 'tax_law', 'labor_law',
      'immigration', 'intellectual_property', 'other'
    ]).withMessage('نوع خدمة غير صالح'),
  
  body('preferredDate')
    .optional()
    .isISO8601().withMessage('تاريخ غير صالح'),
  
  body('preferredTime')
    .optional()
    .isIn(['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'])
    .withMessage('وقت غير صالح'),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('الرسالة يجب أن لا تتجاوز 1000 حرف'),

  validateRequest
];

module.exports = {
  validateAppointmentUpdate
};


module.exports = {
  validateRequest,
  validateLogin,
  validateRegister,
  validateAppointment,
  validateContact,
  validateQueryParams,
  validateAppointmentUpdate

};