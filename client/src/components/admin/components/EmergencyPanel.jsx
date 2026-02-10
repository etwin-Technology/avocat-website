import React, { useState, useEffect } from 'react';
import { 
  X, AlertOctagon, AlertTriangle, MessageCircle, Mail, Phone, 
  CheckCircle, Clock, User, Shield, Activity, Bell, 
  ChevronDown, ChevronUp, Filter, Search, Eye, 
  ExternalLink, Flag, Star, Zap, Loader2,
  MessageSquare, MapPin, Video, Calendar, FileText,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyPanel = ({
  isOpen,
  onClose,
  emergencyContacts,
  formatDate,
  formatTime,
  getUrgencyInfo,
  setSelectedItem,
  openModal,
  updateContactUrgency,
  updateContactStatus
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [expandedContact, setExpandedContact] = useState(null);
  const [isResolving, setIsResolving] = useState(null);

  const urgencyLevels = [
    { value: 'all', label: 'جميع الحالات', color: 'bg-gray-500' },
    { value: 'emergency', label: 'حالات طوارئ', color: 'bg-red-600' },
    { value: 'urgent', label: 'عاجلة', color: 'bg-orange-500' },
    { value: 'high', label: 'مرتفعة', color: 'bg-amber-500' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUrgency = selectedUrgency === 'all' || contact.urgency === selectedUrgency;
    
    return matchesSearch && matchesUrgency;
  });

  const handleResolve = async (contactId) => {
    setIsResolving(contactId);
    try {
      await updateContactUrgency(contactId, 'normal', 'تم حل الحالة الطارئة');
      await updateContactStatus(contactId, 'resolved');
    } catch (error) {
      console.error('Error resolving contact:', error);
    } finally {
      setIsResolving(null);
    }
  };

  const handleMarkImportant = (contactId) => {
    // Implement mark as important functionality
    console.log('Mark as important:', contactId);
  };

  // Helper function to render urgency icon properly
  const renderUrgencyIcon = (urgencyInfo, className = "") => {
    // If icon is a React component, render it properly
    if (urgencyInfo.icon && typeof urgencyInfo.icon === 'function') {
      const IconComponent = urgencyInfo.icon;
      return <IconComponent className={className} />;
    }
    // If it's already a JSX element, return it as is
    return urgencyInfo.icon;
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
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      <AlertOctagon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">مركز الطوارئ والعاجلة</h3>
                      <p className="text-sm md:text-base text-white/90 mt-1">
                        {emergencyContacts.length} حالة تحتاج إلى اهتمام فوري
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Mobile Summary */}
                    {isMobile && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">{emergencyContacts.length}</span>
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

                {/* Desktop Stats */}
                {!isMobile && (
                  <div className="mt-6 grid grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertOctagon className="w-4 h-4" />
                        <span className="text-sm">حالات طوارئ</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {emergencyContacts.filter(c => c.urgency === 'emergency').length}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">عاجلة</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {emergencyContacts.filter(c => c.urgency === 'urgent').length}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm">مرتفعة</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {emergencyContacts.filter(c => c.urgency === 'high').length}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">متبقي اليوم</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {emergencyContacts.filter(c => {
                          const contactDate = new Date(c.createdAt);
                          const today = new Date();
                          return contactDate.toDateString() === today.toDateString();
                        }).length}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="border-b border-gray-200 bg-gray-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-all"
                      placeholder="ابحث عن حالة..."
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    {urgencyLevels.map(level => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedUrgency(level.value)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedUrgency === level.value ? `${level.color} text-white` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {level.label}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => {
                        // Refresh data
                        window.location.reload();
                      }}
                      className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 font-medium flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden md:inline">تحديث</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.length > 0 ? (
                  <div className="p-4 md:p-6">
                    <div className="space-y-4 md:space-y-6">
                      {filteredContacts.map((contact) => {
                        const urgencyInfo = getUrgencyInfo(contact.urgency);
                        const isExpanded = expandedContact === contact._id;
                        const isToday = new Date(contact.createdAt).toDateString() === new Date().toDateString();

                        return (
                          <motion.div
                            key={contact._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-2xl border-2 overflow-hidden ${urgencyInfo?.borderColor || 'border-red-200'} ${urgencyInfo?.bgColor || 'bg-red-50'}`}
                          >
                            {/* Contact Header */}
                            <div 
                              className="p-4 md:p-6 cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => setExpandedContact(isExpanded ? null : contact._id)}
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-3 md:gap-4 flex-1">
                                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${urgencyInfo?.bgColor?.replace('bg-', 'bg-')?.replace('to-', 'to-') || 'bg-red-100'}`}>
                                    {renderUrgencyIcon(urgencyInfo, `w-6 h-6 md:w-7 md:h-7 ${urgencyInfo?.textColor || 'text-red-600'}`)}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2">
                                      <div className={`px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 ${urgencyInfo?.color || 'text-red-600 bg-red-100'}`}>
                                        {renderUrgencyIcon(urgencyInfo, "w-4 h-4")}
                                        <span>{urgencyInfo?.text || 'طارئ'}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{formatDate(contact.createdAt)}</span>
                                        {isToday && (
                                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                            جديد
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <h4 className="text-lg md:text-xl font-bold text-gray-900">{contact.name}</h4>
                                        {contact.isImportant && (
                                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        )}
                                      </div>
                                      
                                      <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-1 text-gray-600">
                                          <Mail className="w-4 h-4" />
                                          <span className="text-sm md:text-base">{contact.email}</span>
                                        </div>
                                        
                                        {contact.phone && (
                                          <div className="flex items-center gap-1 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm md:text-base">{contact.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <p className="font-medium text-gray-900">{contact.subject}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                  <button className="p-2 text-gray-500 hover:text-gray-700">
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-gray-200"
                                >
                                  <div className="p-4 md:p-6 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      {/* Message Column */}
                                      <div className="md:col-span-2 space-y-4">
                                        <div>
                                          <h5 className="text-sm font-medium text-gray-700 mb-2">الرسالة</h5>
                                          <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap leading-relaxed">
                                            {contact.message}
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                          <div className="bg-blue-50 p-3 rounded-xl">
                                            <p className="text-xs text-blue-600 mb-1">التصنيف</p>
                                            <p className="font-medium">{contact.category || 'غير محدد'}</p>
                                          </div>
                                          
                                          <div className="bg-green-50 p-3 rounded-xl">
                                            <p className="text-xs text-green-600 mb-1">الخدمة</p>
                                            <p className="font-medium">{contact.serviceType || 'عام'}</p>
                                          </div>
                                          
                                          <div className="bg-purple-50 p-3 rounded-xl">
                                            <p className="text-xs text-purple-600 mb-1">المصدر</p>
                                            <p className="font-medium">
                                              {contact.source === 'admin_dashboard' ? 'لوحة التحكم' : contact.source || 'غير محدد'}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Actions Column */}
                                      <div className="space-y-4">
                                        <h5 className="text-sm font-medium text-gray-700">الإجراءات السريعة</h5>
                                        
                                        <div className="space-y-2">
                                          <button
                                            onClick={() => {
                                              setSelectedItem(contact);
                                              openModal('whatsapp');
                                            }}
                                            disabled={!contact.phone}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${contact.phone ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                          >
                                            <MessageCircle className="w-5 h-5" />
                                            <span>إرسال واتساب</span>
                                          </button>
                                          
                                          <button
                                            onClick={() => {
                                              setSelectedItem(contact);
                                              openModal('email');
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                                          >
                                            <Mail className="w-5 h-5" />
                                            <span>إرسال بريد</span>
                                          </button>
                                          
                                          <button
                                            onClick={() => {
                                              setSelectedItem(contact);
                                              openModal('call');
                                            }}
                                            disabled={!contact.phone}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${contact.phone ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                          >
                                            <Phone className="w-5 h-5" />
                                            <span>اتصال هاتفي</span>
                                          </button>
                                          
                                          <button
                                            onClick={() => {
                                              setSelectedItem(contact);
                                              openModal('details');
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl"
                                          >
                                            <Eye className="w-5 h-5" />
                                            <span>عرض التفاصيل</span>
                                          </button>
                                        </div>
                                        
                                        <div className="space-y-2 pt-4 border-t border-gray-200">
                                          <button
                                            onClick={() => handleResolve(contact._id)}
                                            disabled={isResolving === contact._id}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl disabled:opacity-50"
                                          >
                                            {isResolving === contact._id ? (
                                              <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>جاري الحل...</span>
                                              </>
                                            ) : (
                                              <>
                                                <CheckCircle className="w-5 h-5" />
                                                <span>تم الحل</span>
                                              </>
                                            )}
                                          </button>
                                          
                                          <button
                                            onClick={() => handleMarkImportant(contact._id)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl"
                                          >
                                            <Star className="w-5 h-5" />
                                            <span>تحديد كمهم</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-3">
                      لا توجد حالات طارئة حالياً
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      جميع الحالات تحت السيطرة. فريقك يقوم بعمل ممتاز في التعامل مع الطلبات العاجلة.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 font-medium"
                      >
                        العودة إلى القائمة
                      </button>
                      <button
                        onClick={() => {
                          // Refresh or check for new emergencies
                          window.location.reload();
                        }}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        تحديث
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span>يتم تحديث القائمة تلقائياً كل 5 دقائق</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors"
                    >
                      إغلاق المركز
                    </button>
                    
                    {filteredContacts.length > 0 && (
                      <button
                        onClick={() => {
                          // Export emergency report
                          const data = JSON.stringify(filteredContacts, null, 2);
                          const blob = new Blob([data], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `emergency-contacts-${new Date().toISOString().split('T')[0]}.json`;
                          a.click();
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        <span>تصدير التقرير</span>
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

export default EmergencyPanel;