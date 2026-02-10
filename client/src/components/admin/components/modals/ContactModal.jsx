import React, { useState, useEffect } from 'react';
import { 
  X, MessageSquare, AlertOctagon, AlertTriangle, Activity, 
  Clock, Calendar, User, Mail, Phone, Tag, Filter, 
  Globe, FileText, Briefcase, Building, Shield, 
  Save, Loader2, ChevronLeft, ChevronRight,
  Hash, Star, Bookmark, Paperclip, Send,
  Bell, Eye, EyeOff, Lock, Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  errors,
  editMode,
  isSubmitting,
  onSubmit,
  validateForm
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const serviceOptions = [
    { value: 'general', label: 'عام', icon: Globe, color: 'text-gray-500' },
    { value: 'legal_consultation', label: 'استشارة قانونية', icon: Shield, color: 'text-blue-500' },
    { value: 'notary_service', label: 'خدمة كاتب عدل', icon: FileText, color: 'text-green-500' },
    { value: 'contract_review', label: 'مراجعة العقود', icon: Briefcase, color: 'text-purple-500' },
    { value: 'court_representation', label: 'تمثيل في المحكمة', icon: Building, color: 'text-red-500' },
    { value: 'business_setup', label: 'تأسيس الشركات', icon: Building, color: 'text-indigo-500' },
    { value: 'family_law', label: 'قانون الأسرة', icon: User, color: 'text-pink-500' },
    { value: 'real_estate', label: 'العقارات', icon: Building, color: 'text-yellow-500' }
  ];

  const urgencyLevels = [
    { 
      value: 'emergency', 
      label: 'حالة طوارئ', 
      color: 'from-red-600 to-red-800', 
      icon: AlertOctagon, 
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      borderColor: 'border-red-200'
    },
    { 
      value: 'urgent', 
      label: 'عاجل', 
      color: 'from-orange-500 to-orange-700', 
      icon: AlertTriangle, 
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200'
    },
    { 
      value: 'high', 
      label: 'مرتفع', 
      color: 'from-amber-500 to-amber-600', 
      icon: Activity, 
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200'
    },
    { 
      value: 'normal', 
      label: 'عادي', 
      color: 'from-blue-500 to-blue-600', 
      icon: Clock, 
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    { 
      value: 'low', 
      label: 'منخفض', 
      color: 'from-gray-500 to-gray-600', 
      icon: Calendar, 
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200'
    }
  ];

  const categories = [
    { value: 'inquiry', label: 'استفسار', color: 'bg-blue-100 text-blue-800' },
    { value: 'complaint', label: 'شكوى', color: 'bg-red-100 text-red-800' },
    { value: 'suggestion', label: 'اقتراح', color: 'bg-green-100 text-green-800' },
    { value: 'feedback', label: 'ملاحظات', color: 'bg-purple-100 text-purple-800' },
    { value: 'request', label: 'طلب', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'other', label: 'أخرى', color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { value: 'new', label: 'جديد', color: 'bg-blue-100 text-blue-800' },
    { value: 'read', label: 'مقروء', color: 'bg-green-100 text-green-800' },
    { value: 'in_progress', label: 'قيد المعالجة', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'replied', label: 'تم الرد', color: 'bg-purple-100 text-purple-800' },
    { value: 'archived', label: 'مؤرشف', color: 'bg-gray-100 text-gray-800' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(1);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center md:p-4"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-3xl md:shadow-2xl flex flex-col w-full md:w-full md:max-w-5xl overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {editMode ? 'تعديل الاتصال' : 'إضافة اتصال جديد'}
                      </h3>
                      <p className="text-sm md:text-base text-white/90 mt-1">
                        {editMode ? 'قم بتحديث معلومات الاتصال' : 'املأ النموذج لإضافة اتصال جديد'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Mobile Stepper */}
                    {isMobile && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-all ${activeStep === step ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    )}
                    
                    <button
                      onClick={onClose}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>

                {/* Desktop Stepper */}
                {!isMobile && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      {[
                        { number: 1, label: 'معلومات التواصل', icon: User },
                        { number: 2, label: 'تفاصيل الرسالة', icon: MessageSquare },
                        { number: 3, label: 'تصنيف وتصنيف', icon: Tag }
                      ].map((step, index) => (
                        <React.Fragment key={step.number}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeStep >= step.number ? 'bg-white text-purple-600' : 'bg-white/20 text-white'}`}>
                              <step.icon className="w-5 h-5" />
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-white/80">الخطوة {step.number}</p>
                              <p className="font-medium">{step.label}</p>
                            </div>
                          </div>
                          {index < 2 && (
                            <div className={`h-1 flex-1 mx-8 rounded-full ${activeStep > step.number ? 'bg-white' : 'bg-white/20'}`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  {isMobile ? (
                    /* Mobile Layout - Step by Step */
                    <div className="p-4">
                      {activeStep === 1 && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-500" />
                            معلومات التواصل
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الاسم *
                              </label>
                              <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({...form, name: e.target.value})}
                                className={`w-full border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all`}
                                required
                                placeholder="أدخل الاسم الكامل"
                              />
                              {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                              )}
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                البريد الإلكتروني *
                              </label>
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                                className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all`}
                                required
                                placeholder="example@email.com"
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                              )}
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                رقم الهاتف
                              </label>
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({...form, phone: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
                                placeholder="+966 5X XXX XXXX"
                              />
                            </div>

                            {/* Service Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                نوع الخدمة
                              </label>
                              <select
                                value={form.serviceType}
                                onChange={(e) => setForm({...form, serviceType: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                              >
                                {serviceOptions.map(service => (
                                  <option key={service.value} value={service.value}>
                                    {service.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-purple-500" />
                            تفاصيل الرسالة
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Subject */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الموضوع *
                              </label>
                              <input
                                type="text"
                                value={form.subject}
                                onChange={(e) => setForm({...form, subject: e.target.value})}
                                className={`w-full border-2 ${errors.subject ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all`}
                                required
                                placeholder="موضوع الرسالة"
                              />
                              {errors.subject && (
                                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                              )}
                            </div>

                            {/* Message */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الرسالة *
                              </label>
                              <textarea
                                value={form.message}
                                onChange={(e) => setForm({...form, message: e.target.value})}
                                rows="5"
                                className={`w-full border-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all resize-none`}
                                required
                                placeholder="اكتب الرسالة هنا..."
                              />
                              {errors.message && (
                                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                              )}
                            </div>

                            {/* Character Counter */}
                            <div className="text-right">
                              <span className={`text-sm ${form.message.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                                {form.message.length} / 500 حرف
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-purple-500" />
                            تصنيف وتصنيف
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Urgency Level */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                مستوى الاستعجال
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {urgencyLevels.map(level => (
                                  <button
                                    key={level.value}
                                    type="button"
                                    onClick={() => setForm({...form, urgency: level.value})}
                                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${form.urgency === level.value ? `${level.borderColor} ${level.bgColor}` : 'border-gray-200 hover:border-gray-300'}`}
                                  >
                                    <level.icon className={`w-5 h-5 ${form.urgency === level.value ? `text-${level.color.split('-')[1]}-600` : 'text-gray-400'}`} />
                                    <span className="text-xs font-medium">{level.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Category */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                التصنيف
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                  <button
                                    key={category.value}
                                    type="button"
                                    onClick={() => setForm({...form, category: category.value})}
                                    className={`px-3 py-2 rounded-lg transition-all ${form.category === category.value ? category.color + ' ring-2 ring-offset-1' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                  >
                                    <span className="text-sm">{category.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Status */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الحالة
                              </label>
                              <select
                                value={form.status}
                                onChange={(e) => setForm({...form, status: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                              >
                                {statusOptions.map(status => (
                                  <option key={status.value} value={status.value}>
                                    {status.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Source */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                المصدر
                              </label>
                              <select
                                value={form.source || 'admin_dashboard'}
                                onChange={(e) => setForm({...form, source: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                              >
                                <option value="admin_dashboard">لوحة التحكم</option>
                                <option value="website">الموقع الإلكتروني</option>
                                <option value="whatsapp">واتساب</option>
                                <option value="phone_call">مكالمة هاتفية</option>
                                <option value="email">بريد إلكتروني</option>
                                <option value="walk_in">زيارة مكتب</option>
                                <option value="referral">إحالة</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Desktop Layout - All in one */
                    <div className="p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Contact Information Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              معلومات التواصل
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الاسم الكامل *
                                </label>
                                <input
                                  type="text"
                                  value={form.name}
                                  onChange={(e) => setForm({...form, name: e.target.value})}
                                  className={`w-full border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all`}
                                  required
                                />
                                {errors.name && (
                                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    البريد الإلكتروني *
                                  </label>
                                  <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all`}
                                    required
                                  />
                                  {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    رقم الهاتف
                                  </label>
                                  <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({...form, phone: e.target.value})}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  نوع الخدمة
                                </label>
                                <select
                                  value={form.serviceType}
                                  onChange={(e) => setForm({...form, serviceType: e.target.value})}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                                >
                                  {serviceOptions.map(service => (
                                    <option key={service.value} value={service.value}>
                                      {service.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Priority Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              الأولوية والتصنيف
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  مستوى الاستعجال
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {urgencyLevels.map(level => (
                                    <button
                                      key={level.value}
                                      type="button"
                                      onClick={() => setForm({...form, urgency: level.value})}
                                      className={`p-3 rounded-xl border-2 transition-all text-right ${form.urgency === level.value ? `${level.borderColor} ${level.bgColor}` : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className={`w-8 h-8 bg-gradient-to-r ${level.color} rounded-lg flex items-center justify-center`}>
                                          <level.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                          <p className="font-medium">{level.label}</p>
                                          <p className="text-xs text-gray-500">
                                            {level.value === 'emergency' && 'يحتاج رد فوري'}
                                            {level.value === 'urgent' && 'خلال 24 ساعة'}
                                            {level.value === 'high' && 'خلال 48 ساعة'}
                                            {level.value === 'normal' && 'خلال أسبوع'}
                                            {level.value === 'low' && 'وقت مناسب'}
                                          </p>
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle Column */}
                        <div className="space-y-6">
                          {/* Message Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              محتوى الرسالة
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الموضوع *
                                </label>
                                <input
                                  type="text"
                                  value={form.subject}
                                  onChange={(e) => setForm({...form, subject: e.target.value})}
                                  className={`w-full border-2 ${errors.subject ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all`}
                                  required
                                />
                                {errors.subject && (
                                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الرسالة *
                                </label>
                                <textarea
                                  value={form.message}
                                  onChange={(e) => setForm({...form, message: e.target.value})}
                                  rows="8"
                                  className={`w-full border-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all resize-none`}
                                  required
                                />
                                {errors.message && (
                                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                              </div>

                              {/* Message Tools */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const textarea = document.querySelector('textarea');
                                      const start = textarea.selectionStart;
                                      const end = textarea.selectionEnd;
                                      const newText = form.message.substring(0, start) + '**' + form.message.substring(start, end) + '**' + form.message.substring(end);
                                      setForm({...form, message: newText});
                                    }}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                                    title="نص عريض"
                                  >
                                    <span className="font-bold">B</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const textarea = document.querySelector('textarea');
                                      const start = textarea.selectionStart;
                                      const end = textarea.selectionEnd;
                                      const newText = form.message.substring(0, start) + '\n' + form.message.substring(start, end) + '\n' + form.message.substring(end);
                                      setForm({...form, message: newText});
                                    }}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                                    title="سطر جديد"
                                  >
                                    ↵
                                  </button>
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                  <span className={form.message.length > 500 ? 'text-red-500' : ''}>
                                    {form.message.length}
                                  </span>
                                  /500 حرف
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Preview Card */}
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-blue-900 mb-4">معاينة سريعة</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">الاسم:</span>
                                <span className="font-medium truncate max-w-[150px]">{form.name || 'غير محدد'}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">الموضوع:</span>
                                <span className="font-medium truncate max-w-[150px]">{form.subject || 'غير محدد'}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">الأولوية:</span>
                                <span className="font-medium">
                                  {urgencyLevels.find(u => u.value === form.urgency)?.label || 'عادي'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Classification Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              التصنيف والإعدادات
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  التصنيف
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {categories.map(category => (
                                    <button
                                      key={category.value}
                                      type="button"
                                      onClick={() => setForm({...form, category: category.value})}
                                      className={`p-3 rounded-lg transition-all ${form.category === category.value ? category.color + ' ring-2 ring-offset-1' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                      <span className="text-sm font-medium">{category.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الحالة
                                </label>
                                <select
                                  value={form.status}
                                  onChange={(e) => setForm({...form, status: e.target.value})}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                                >
                                  {statusOptions.map(status => (
                                    <option key={status.value} value={status.value}>
                                      {status.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  المصدر
                                </label>
                                <select
                                  value={form.source || 'admin_dashboard'}
                                  onChange={(e) => setForm({...form, source: e.target.value})}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all bg-white"
                                >
                                  <option value="admin_dashboard">لوحة التحكم</option>
                                  <option value="website">الموقع الإلكتروني</option>
                                  <option value="whatsapp">واتساب</option>
                                  <option value="phone_call">مكالمة هاتفية</option>
                                  <option value="email">بريد إلكتروني</option>
                                  <option value="walk_in">زيارة مكتب</option>
                                  <option value="referral">إحالة</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  معرف الإحالة
                                </label>
                                <input
                                  type="text"
                                  value={form.referralId || ''}
                                  onChange={(e) => setForm({...form, referralId: e.target.value})}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
                                  placeholder="اختياري"
                                />
                              </div>

                              {/* Additional Options */}
                              <div className="space-y-3 pt-4 border-t border-gray-200">
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={form.markImportant || false}
                                    onChange={(e) => setForm({...form, markImportant: e.target.checked})}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                  />
                                  <span className="text-sm text-gray-700">تحديد كمهم</span>
                                </label>
                                
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={form.needsFollowUp || false}
                                    onChange={(e) => setForm({...form, needsFollowUp: e.target.checked})}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                  />
                                  <span className="text-sm text-gray-700">يحتاج متابعة</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Mobile Navigation */}
                  {isMobile ? (
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={handlePrevStep}
                        disabled={activeStep === 1}
                        className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>السابق</span>
                      </button>
                      
                      {activeStep < 3 ? (
                        <button
                          onClick={handleNextStep}
                          className="px-6 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center gap-2"
                        >
                          <span>التالي</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>جاري {editMode ? 'التحديث' : 'الإضافة'}...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>{editMode ? 'تحديث الاتصال' : 'إضافة الاتصال'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Desktop Actions */
                    <>
                      <div className="text-sm text-gray-500">
                        جميع الحقول المميزة بـ * إلزامية
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={onClose}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors"
                          disabled={isSubmitting}
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>جاري {editMode ? 'التحديث' : 'الإضافة'}...</span>
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-5 h-5" />
                              <span>{editMode ? 'تحديث الاتصال' : 'إضافة الاتصال'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;