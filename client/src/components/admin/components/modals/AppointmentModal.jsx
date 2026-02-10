import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, User, Phone, 
  Video, FileText, MessageSquare, 
  Globe, 
  Building, Briefcase, Home, Shield, 
  DollarSign, Users, Globe as GlobeIcon,
  Save, Loader2, ChevronRight, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppointmentModal = ({
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
  const [expandedSection, setExpandedSection] = useState(null);

  const serviceOptions = [
    { value: 'legal_consultation', label: 'استشارة قانونية', icon: Shield, color: 'text-blue-500' },
    { value: 'notary_service', label: 'خدمة كاتب عدل', icon: FileText, color: 'text-green-500' },
    { value: 'contract_review', label: 'مراجعة العقود', icon: Briefcase, color: 'text-purple-500' },
    { value: 'court_representation', label: 'تمثيل في المحكمة', icon: Building, color: 'text-red-500' },
    { value: 'business_setup', label: 'تأسيس الشركات', icon: Building, color: 'text-indigo-500' },
    { value: 'family_law', label: 'قانون الأسرة', icon: Users, color: 'text-pink-500' },
    { value: 'real_estate', label: 'العقارات', icon: Home, color: 'text-yellow-500' },
    { value: 'criminal_defense', label: 'الدفاع الجنائي', icon: Shield, color: 'text-gray-500' },
    { value: 'tax_law', label: 'القانون الضريبي', icon: DollarSign, color: 'text-green-600' },
    { value: 'labor_law', label: 'قانون العمل', icon: Users, color: 'text-orange-500' },
    { value: 'immigration', label: 'الهجرة', icon: GlobeIcon, color: 'text-blue-600' },
    { value: 'intellectual_property', label: 'الملكية الفكرية', icon: Globe, color: 'text-teal-500' },
    { value: 'other', label: 'أخرى', icon: FileText, color: 'text-gray-400' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
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
      setExpandedSection(null);
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
              className="bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-3xl md:shadow-2xl flex flex-col w-full md:w-full md:max-w-6xl overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {editMode ? 'تعديل الموعد' : 'إنشاء موعد جديد'}
                      </h3>
                      <p className="text-sm md:text-base text-white/90 mt-1">
                        {editMode ? 'قم بتحديث معلومات الموعد' : 'املأ النموذج لإنشاء موعد جديد'}
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
                        { number: 1, label: 'معلومات العميل', icon: User },
                        { number: 2, label: 'تفاصيل الموعد', icon: Calendar },
                        { number: 3, label: 'معلومات إضافية', icon: MessageSquare }
                      ].map((step, index) => (
                        <React.Fragment key={step.number}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeStep >= step.number ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}>
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
                            <User className="w-5 h-5 text-blue-500" />
                            معلومات العميل
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Client Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الاسم الكامل *
                              </label>
                              <input
                                type="text"
                                value={form.clientName}
                                onChange={(e) => setForm({...form, clientName: e.target.value})}
                                className={`w-full border-2 ${errors.clientName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
                                required
                                placeholder="أدخل الاسم الكامل"
                              />
                              {errors.clientName && (
                                <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                              )}
                            </div>

                            {/* Client Email */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                البريد الإلكتروني *
                              </label>
                              <input
                                type="email"
                                value={form.clientEmail}
                                onChange={(e) => setForm({...form, clientEmail: e.target.value})}
                                className={`w-full border-2 ${errors.clientEmail ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
                                required
                                placeholder="example@email.com"
                              />
                              {errors.clientEmail && (
                                <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>
                              )}
                            </div>

                            {/* Client Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                رقم الهاتف *
                              </label>
                              <input
                                type="tel"
                                value={form.clientPhone}
                                onChange={(e) => setForm({...form, clientPhone: e.target.value})}
                                className={`w-full border-2 ${errors.clientPhone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
                                required
                                placeholder="+966 5X XXX XXXX"
                              />
                              {errors.clientPhone && (
                                <p className="text-red-500 text-xs mt-1">{errors.clientPhone}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            تفاصيل الموعد
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Service Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الخدمة *
                              </label>
                              <select
                                value={form.serviceType}
                                onChange={(e) => setForm({...form, serviceType: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all bg-white"
                              >
                                {serviceOptions.map(service => (
                                  <option key={service.value} value={service.value}>
                                    {service.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Preferred Date */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                التاريخ *
                              </label>
                              <input
                                type="date"
                                value={form.preferredDate}
                                onChange={(e) => setForm({...form, preferredDate: e.target.value})}
                                className={`w-full border-2 ${errors.preferredDate ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
                                required
                                min={new Date().toISOString().split('T')[0]}
                              />
                              {errors.preferredDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
                              )}
                            </div>

                            {/* Preferred Time */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الوقت *
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map(time => (
                                  <button
                                    key={time}
                                    type="button"
                                    onClick={() => setForm({...form, preferredTime: time})}
                                    className={`p-3 rounded-xl border-2 transition-all ${form.preferredTime === time ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                              {errors.preferredTime && (
                                <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
                              )}
                            </div>

                            {/* Meeting Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                نوع الموعد
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { value: 'in_person', label: 'حضوري', icon: User, color: 'text-blue-500' },
                                  { value: 'video_call', label: 'فيديو', icon: Video, color: 'text-purple-500' },
                                  { value: 'phone_call', label: 'هاتف', icon: Phone, color: 'text-green-500' }
                                ].map(type => (
                                  <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setForm({...form, meetingType: type.value})}
                                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${form.meetingType === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                  >
                                    <type.icon className={`w-5 h-5 ${type.color}`} />
                                    <span className="text-xs">{type.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            معلومات إضافية
                          </h4>
                          
                          <div className="space-y-4">
                            {/* Status */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الحالة
                              </label>
                              <select
                                value={form.status}
                                onChange={(e) => setForm({...form, status: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all bg-white"
                              >
                                <option value="pending">قيد الانتظار</option>
                                <option value="confirmed">مؤكد</option>
                                <option value="completed">مكتمل</option>
                                <option value="cancelled">ملغي</option>
                                <option value="rescheduled">مجدول</option>
                              </select>
                            </div>

                            {/* Additional Message */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                رسالة إضافية
                              </label>
                              <textarea
                                value={form.message}
                                onChange={(e) => setForm({...form, message: e.target.value})}
                                rows="4"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all resize-none"
                                placeholder="اكتب رسالة إضافية..."
                              />
                            </div>

                            {/* Notes */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                ملاحظات
                              </label>
                              <textarea
                                value={form.notes}
                                onChange={(e) => setForm({...form, notes: e.target.value})}
                                rows="3"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all resize-none"
                                placeholder="ملاحظات إضافية..."
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Desktop Layout - All in one */
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Client Information Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              معلومات العميل
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الاسم الكامل *
                                </label>
                                <input
                                  type="text"
                                  value={form.clientName}
                                  onChange={(e) => setForm({...form, clientName: e.target.value})}
                                  className={`w-full border-2 ${errors.clientName ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
                                  required
                                />
                                {errors.clientName && (
                                  <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    البريد الإلكتروني *
                                  </label>
                                  <input
                                    type="email"
                                    value={form.clientEmail}
                                    onChange={(e) => setForm({...form, clientEmail: e.target.value})}
                                    className={`w-full border-2 ${errors.clientEmail ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
                                    required
                                  />
                                  {errors.clientEmail && (
                                    <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    رقم الهاتف *
                                  </label>
                                  <input
                                    type="tel"
                                    value={form.clientPhone}
                                    onChange={(e) => setForm({...form, clientPhone: e.target.value})}
                                    className={`w-full border-2 ${errors.clientPhone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all`}
                                    required
                                  />
                                  {errors.clientPhone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.clientPhone}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Appointment Details Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              تفاصيل الموعد
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  الخدمة *
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                  {serviceOptions.slice(0, 8).map(service => (
                                    <button
                                      key={service.value}
                                      type="button"
                                      onClick={() => setForm({...form, serviceType: service.value})}
                                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${form.serviceType === service.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                      <service.icon className={`w-5 h-5 ${service.color}`} />
                                      <span className="text-xs text-center">{service.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    التاريخ *
                                  </label>
                                  <input
                                    type="date"
                                    value={form.preferredDate}
                                    onChange={(e) => setForm({...form, preferredDate: e.target.value})}
                                    className={`w-full border-2 ${errors.preferredDate ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all`}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                  />
                                  {errors.preferredDate && (
                                    <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الوقت *
                                  </label>
                                  <select
                                    value={form.preferredTime}
                                    onChange={(e) => setForm({...form, preferredTime: e.target.value})}
                                    className={`w-full border-2 ${errors.preferredTime ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all bg-white`}
                                    required
                                  >
                                    <option value="">اختر الوقت</option>
                                    {timeSlots.map(time => (
                                      <option key={time} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.preferredTime && (
                                    <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Meeting Type & Status Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              إعدادات الموعد
                            </h4>
                            
                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  نوع الموعد
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                  {[
                                    { value: 'in_person', label: 'حضوري', icon: User, color: 'bg-blue-500', desc: 'مقابلة في المكتب' },
                                    { value: 'video_call', label: 'مكالمة فيديو', icon: Video, color: 'bg-purple-500', desc: 'عن بُعد' },
                                    { value: 'phone_call', label: 'مكالمة هاتفية', icon: Phone, color: 'bg-green-500', desc: 'هاتفياً' }
                                  ].map(type => (
                                    <button
                                      key={type.value}
                                      type="button"
                                      onClick={() => setForm({...form, meetingType: type.value})}
                                      className={`p-4 rounded-xl border-2 transition-all text-right ${form.meetingType === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center`}>
                                          <type.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                          <p className="font-medium">{type.label}</p>
                                          <p className="text-xs text-gray-500">{type.desc}</p>
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  حالة الموعد
                                </label>
                                <select
                                  value={form.status}
                                  onChange={(e) => setForm({...form, status: e.target.value})}
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all bg-white"
                                >
                                  <option value="pending">قيد الانتظار</option>
                                  <option value="confirmed">مؤكد</option>
                                  <option value="completed">مكتمل</option>
                                  <option value="cancelled">ملغي</option>
                                  <option value="rescheduled">مجدول</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Notes & Messages Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                              ملاحظات ورسائل
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  رسالة إضافية
                                </label>
                                <textarea
                                  value={form.message}
                                  onChange={(e) => setForm({...form, message: e.target.value})}
                                  rows="3"
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all resize-none"
                                  placeholder="اكتب رسالة إضافية للعميل..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  ملاحظات داخلية
                                </label>
                                <textarea
                                  value={form.notes}
                                  onChange={(e) => setForm({...form, notes: e.target.value})}
                                  rows="3"
                                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all resize-none"
                                  placeholder="ملاحظات خاصة بالفريق..."
                                />
                              </div>
                            </div>
                          </div>

                          {/* Preview Card */}
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 shadow-sm">
                            <h4 className="text-lg font-semibold text-blue-900 mb-4">معاينة</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">الخدمة:</span>
                                <span className="font-medium">{serviceOptions.find(s => s.value === form.serviceType)?.label}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">التاريخ:</span>
                                <span className="font-medium">{form.preferredDate || 'لم يتم تحديد'}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">الوقت:</span>
                                <span className="font-medium">{form.preferredTime || 'لم يتم تحديد'}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600">النوع:</span>
                                <span className="font-medium">
                                  {form.meetingType === 'in_person' ? 'حضوري' : 
                                   form.meetingType === 'video_call' ? 'مكالمة فيديو' : 
                                   form.meetingType === 'phone_call' ? 'مكالمة هاتفية' : 'غير محدد'}
                                </span>
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
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2"
                        >
                          <span>التالي</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>جاري {editMode ? 'التحديث' : 'الإنشاء'}...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>{editMode ? 'تحديث الموعد' : 'إنشاء الموعد'}</span>
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
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>جاري {editMode ? 'التحديث' : 'الإنشاء'}...</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5" />
                              <span>{editMode ? 'تحديث الموعد' : 'إنشاء الموعد'}</span>
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

export default AppointmentModal;