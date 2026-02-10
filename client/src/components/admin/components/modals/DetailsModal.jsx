import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, MessageSquare, MessageCircle, Mail, Phone, Copy, 
  User, MapPin, Video, Send, Clock, Smartphone, Globe, 
  ExternalLink, Share2, Download, Printer, Edit, Archive,
  ChevronLeft, ChevronRight, Hash, Star, AlertCircle, CheckCircle,
  FileText, Tag, Filter, Bell, Bookmark, Link, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DetailsModal = ({
  isOpen,
  onClose,
  item,
  formatDate,
  formatTime,
  getAppointmentStatusInfo,
  getContactStatusInfo,
  getUrgencyInfo,
  getServiceTypeLabel,
  getMeetingTypeLabel,
  openWhatsApp,
  openEmail,
  openPhoneCall,
  copyToClipboard,
  openModal,
  setForms
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'timeline', 'attachments'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen || !item) return null;

  const isAppointment = !!item.clientName;
  const referenceNumber = item.referenceNumber || `REF-${item._id?.slice(-8) || 'N/A'}`;

  const handleCopyReference = () => {
    copyToClipboard(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickActions = [
    { 
      icon: Edit, 
      label: 'تعديل', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: () => {
        // Handle edit action
        onClose();
        setTimeout(() => {
          // Trigger edit in parent component
          // You'll need to pass a handleEdit prop
        }, 300);
      }
    },
    { 
      icon: Share2, 
      label: 'مشاركة', 
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        if (navigator.share) {
          navigator.share({
            title: `${isAppointment ? 'موعد' : 'اتصال'}: ${item.clientName || item.name}`,
            text: `${isAppointment ? 'موعد' : 'اتصال'} - ${item.subject || getServiceTypeLabel(item.serviceType)}`,
            url: window.location.href
          });
        }
      }
    },
    { 
      icon: Printer, 
      label: 'طباعة', 
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => window.print()
    },
    { 
      icon: Download, 
      label: 'تصدير', 
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => {
        // Export functionality
        const data = JSON.stringify(item, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${referenceNumber}.json`;
        a.click();
      }
    }
  ];

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
              <div className={`${isAppointment ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-purple-600 to-purple-800'} text-white p-6 md:rounded-t-3xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      {isAppointment ? (
                        <Calendar className="w-6 h-6 md:w-7 md:h-7" />
                      ) : (
                        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {isAppointment ? 'تفاصيل الموعد' : 'تفاصيل الاتصال'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm md:text-base text-white/90">
                          <Hash className="w-4 h-4" />
                          <span className="font-mono">{referenceNumber}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm md:text-base text-white/90">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatDate(isAppointment ? item.createdAt : item.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Mobile tabs */}
                    {isMobile && (
                      <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1">
                        <button
                          onClick={() => setActiveTab('details')}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'details' ? 'bg-white text-purple-600' : 'text-white'}`}
                        >
                          التفاصيل
                        </button>
                        <button
                          onClick={() => setActiveTab('timeline')}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'timeline' ? 'bg-white text-purple-600' : 'text-white'}`}
                        >
                          الجدول
                        </button>
                        {!isAppointment && (
                          <button
                            onClick={() => setActiveTab('attachments')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'attachments' ? 'bg-white text-purple-600' : 'text-white'}`}
                          >
                            المرفقات
                          </button>
                        )}
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

                {/* Quick Stats Bar */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">العميل</span>
                    </div>
                    <p className="text-lg font-bold mt-1 truncate">
                      {item.clientName || item.name}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      {isAppointment ? <Calendar className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
                      <span className="text-sm">{isAppointment ? 'الخدمة' : 'التصنيف'}</span>
                    </div>
                    <p className="text-lg font-bold mt-1">
                      {isAppointment ? getServiceTypeLabel(item.serviceType) : (item.category || 'غير محدد')}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      {isAppointment ? <Video className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span className="text-sm">{isAppointment ? 'النوع' : 'الاستعجال'}</span>
                    </div>
                    <p className="text-lg font-bold mt-1">
                      {isAppointment ? getMeetingTypeLabel(item.meetingType) : getUrgencyInfo(item.urgency).text}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">الحالة</span>
                    </div>
                    <div className="mt-1">
                      {isAppointment ? (
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getAppointmentStatusInfo(item.status).color.replace('text-', 'bg-').replace('border-', 'bg-')}`}>
                          {getAppointmentStatusInfo(item.status).icon}
                          <span>{getAppointmentStatusInfo(item.status).text}</span>
                        </div>
                      ) : (
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getContactStatusInfo(item.status).color.replace('text-', 'bg-').replace('border-', 'bg-')}`}>
                          {getContactStatusInfo(item.status).icon}
                          <span>{getContactStatusInfo(item.status).text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {/* Desktop Layout */}
                {!isMobile ? (
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Left Column - Main Details */}
                      <div className="col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            معلومات {isAppointment ? 'العميل' : 'الاتصال'}
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">الاسم الكامل</p>
                              <p className="text-lg font-medium text-gray-900">
                                {item.clientName || item.name}
                              </p>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                              <p className="text-lg font-medium text-gray-900">
                                {item.clientEmail || item.email}
                              </p>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">رقم الهاتف</p>
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-gray-400" />
                                <p className="text-lg font-medium text-gray-900">
                                  {item.clientPhone || item.phone || 'غير متوفر'}
                                </p>
                              </div>
                            </div>
                            
                            {isAppointment ? (
                              <>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">التاريخ</p>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-lg font-medium text-gray-900">
                                      {formatDate(item.preferredDate)}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">الوقت</p>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <p className="text-lg font-medium text-gray-900">
                                      {formatTime(item.preferredTime)}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">نوع الاجتماع</p>
                                  <div className="flex items-center gap-2">
                                    {item.meetingType === 'video_call' && <Video className="w-4 h-4 text-blue-500" />}
                                    {item.meetingType === 'phone_call' && <Phone className="w-4 h-4 text-green-500" />}
                                    {item.meetingType === 'in_person' && <User className="w-4 h-4 text-purple-500" />}
                                    <p className="text-lg font-medium text-gray-900">
                                      {getMeetingTypeLabel(item.meetingType)}
                                    </p>
                                  </div>
                                </div>
                                
                                {item.location && (
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-500">الموقع</p>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-red-500" />
                                      <p className="text-lg font-medium text-gray-900">
                                        {item.location}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">المصدر</p>
                                  <p className="text-lg font-medium text-gray-900">
                                    {item.source === 'admin_dashboard' ? 'لوحة التحكم' : item.source || 'غير محدد'}
                                  </p>
                                </div>
                                
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">التصنيف</p>
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    <p className="text-lg font-medium text-gray-900">
                                      {item.category || 'غير محدد'}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Message Section */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            {isAppointment ? 'الرسالة والملاحظات' : 'الرسالة'}
                          </h4>
                          
                          <div className="space-y-6">
                            <div>
                              <p className="text-sm text-gray-500 mb-2">الموضوع / الهدف</p>
                              <p className="text-lg font-medium text-gray-900">
                                {isAppointment ? getServiceTypeLabel(item.serviceType) : item.subject}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-500 mb-2">الرسالة</p>
                              <div className="bg-white border border-gray-200 rounded-xl p-4 whitespace-pre-wrap leading-relaxed">
                                {item.message}
                              </div>
                            </div>
                            
                            {isAppointment && item.notes && (
                              <div>
                                <p className="text-sm text-gray-500 mb-2">ملاحظات إضافية</p>
                                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 whitespace-pre-wrap">
                                  {item.notes}
                                </div>
                              </div>
                            )}
                            
                            {!isAppointment && item.adminResponse && (
                              <div>
                                <p className="text-sm text-gray-500 mb-2">الرد الإداري</p>
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4 whitespace-pre-wrap">
                                  {item.adminResponse}
                                </div>
                                {item.respondedAt && (
                                  <p className="text-sm text-gray-500 mt-2">
                                    تم الرد في: {formatDate(item.respondedAt)}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Sidebar */}
                      <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h4>
                          <div className="space-y-3">
                            {quickActions.map((action, index) => (
                              <button
                                key={index}
                                onClick={action.onClick}
                                className={`w-full flex items-center gap-3 px-4 py-3 ${action.color} text-white rounded-xl hover:shadow-md transition-all`}
                              >
                                <action.icon className="w-5 h-5" />
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Communication Actions */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">الاتصال</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {(item.clientPhone || item.phone) && (
                              <button
                                onClick={() => {
                                  setForms && setForms(prev => ({
                                    ...prev,
                                    whatsapp: { message: '', includeDetails: true }
                                  }));
                                  openModal('whatsapp');
                                }}
                                className="flex flex-col items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                              >
                                <MessageCircle className="w-6 h-6 mb-1" />
                                <span className="text-xs">واتساب</span>
                              </button>
                            )}
                            
                            <button
                              onClick={() => {
                                const emailData = {
                                  subject: item.subject || 'متابعة',
                                  message: `مرحباً ${item.clientName || item.name},\n\n`,
                                  urgent: false
                                };
                                setForms && setForms(prev => ({
                                  ...prev,
                                  email: emailData
                                }));
                                openModal('email');
                              }}
                              className="flex flex-col items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                            >
                              <Mail className="w-6 h-6 mb-1" />
                              <span className="text-xs">بريد</span>
                            </button>
                            
                            {(item.clientPhone || item.phone) && (
                              <button
                                onClick={() => openModal('call')}
                                className="flex flex-col items-center justify-center p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
                              >
                                <Phone className="w-6 h-6 mb-1" />
                                <span className="text-xs">اتصال</span>
                              </button>
                            )}
                            
                            <button
                              onClick={handleCopyReference}
                              className={`flex flex-col items-center justify-center p-3 ${
                                copied ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                              } text-white rounded-xl transition-colors`}
                            >
                              {copied ? (
                                <CheckCircle className="w-6 h-6 mb-1" />
                              ) : (
                                <Copy className="w-6 h-6 mb-1" />
                              )}
                              <span className="text-xs">{copied ? 'تم النسخ' : 'نسخ'}</span>
                            </button>

                            {!isAppointment && (
                              <button
                                onClick={() => {
                                  setForms && setForms(prev => ({
                                    ...prev,
                                    reply: {
                                      message: '',
                                      sendCopy: true,
                                      urgent: false,
                                      emailSubject: `رد: ${item.subject}`,
                                      emailBody: `مرحباً ${item.name},\n\n`
                                    }
                                  }));
                                  openModal('reply');
                                }}
                                className="col-span-2 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all"
                              >
                                <Send className="w-5 h-5" />
                                <span>رد سريع</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Reference Info */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">المعلومات المرجعية</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">الرقم المرجعي</span>
                              <span className="font-mono font-bold">{referenceNumber}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">معرف النظام</span>
                              <span className="font-mono text-sm">{item._id?.slice(-8) || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">تاريخ الإنشاء</span>
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                            {item.updatedAt && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">آخر تحديث</span>
                                <span>{formatDate(item.updatedAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mobile Layout */
                  <div className="p-4">
                    {activeTab === 'details' && (
                      <div className="space-y-6">
                        {/* Contact Info Card */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{item.clientName || item.name}</p>
                                <p className="text-sm text-gray-500">{item.clientEmail || item.email}</p>
                                <p className="text-xs text-gray-400">{item.clientPhone || item.phone || 'غير متوفر'}</p>
                              </div>
                            </div>
                            
                            {isAppointment && (
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-lg border">
                                  <p className="text-xs text-gray-500">التاريخ</p>
                                  <p className="font-medium">{formatDate(item.preferredDate)}</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border">
                                  <p className="text-xs text-gray-500">الوقت</p>
                                  <p className="font-medium">{formatTime(item.preferredTime)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Message Card */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                          <h4 className="font-semibold text-gray-900 mb-3">الرسالة</h4>
                          <div className="bg-white border border-gray-200 rounded-xl p-3 whitespace-pre-wrap text-sm">
                            {item.message}
                          </div>
                        </div>

                        {/* Communication Actions */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                          <h4 className="font-semibold text-gray-900 mb-3">الاتصال السريع</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {(item.clientPhone || item.phone) && (
                              <button
                                onClick={() => {
                                  setForms && setForms(prev => ({
                                    ...prev,
                                    whatsapp: { message: '', includeDetails: true }
                                  }));
                                  openModal('whatsapp');
                                }}
                                className="flex flex-col items-center p-2 bg-green-500 text-white rounded-lg"
                              >
                                <MessageCircle className="w-5 h-5 mb-1" />
                                <span className="text-xs">واتساب</span>
                              </button>
                            )}
                            
                            <button
                              onClick={() => {
                                const emailData = {
                                  subject: item.subject || 'متابعة',
                                  message: `مرحباً ${item.clientName || item.name},\n\n`,
                                  urgent: false
                                };
                                setForms && setForms(prev => ({
                                  ...prev,
                                  email: emailData
                                }));
                                openModal('email');
                              }}
                              className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-lg"
                            >
                              <Mail className="w-5 h-5 mb-1" />
                              <span className="text-xs">بريد</span>
                            </button>
                            
                            <button
                              onClick={handleCopyReference}
                              className={`flex flex-col items-center p-2 ${
                                copied ? 'bg-green-500' : 'bg-gray-500'
                              } text-white rounded-lg`}
                            >
                              {copied ? (
                                <CheckCircle className="w-5 h-5 mb-1" />
                              ) : (
                                <Copy className="w-5 h-5 mb-1" />
                              )}
                              <span className="text-xs">{copied ? 'تم' : 'نسخ'}</span>
                            </button>
                            
                            <button
                              onClick={onClose}
                              className="flex flex-col items-center p-2 bg-gray-300 text-gray-700 rounded-lg"
                            >
                              <X className="w-5 h-5 mb-1" />
                              <span className="text-xs">إغلاق</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'timeline' && (
                      <div className="space-y-4">
                        {/* Timeline items would go here */}
                        <div className="text-center py-8 text-gray-500">
                          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>لم يتم تسجيل أي أحداث في الجدول الزمني</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'attachments' && !isAppointment && (
                      <div className="space-y-4">
                        {/* Attachments would go here */}
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>لا توجد مرفقات</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReference}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="font-mono text-sm">{referenceNumber}</span>
                    </button>
                    {copied && (
                      <span className="text-sm text-green-600 animate-pulse">تم النسخ!</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors"
                    >
                      إغلاق
                    </button>
                    {!isAppointment && (
                      <button
                        onClick={() => {
                          setForms && setForms(prev => ({
                            ...prev,
                            reply: {
                              message: '',
                              sendCopy: true,
                              urgent: false,
                              emailSubject: `رد: ${item.subject}`,
                              emailBody: `مرحباً ${item.name},\n\n`
                            }
                          }));
                          openModal('reply');
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>رد سريع</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailsModal;