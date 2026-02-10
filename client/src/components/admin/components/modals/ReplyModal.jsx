import React, { useState, useEffect } from 'react';
import { X, Send, Mail, User, Clock, Copy, Eye, Smartphone, Mail as MailIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReplyModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  selectedItem,
  onSubmit,
  formatDate
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('compose'); // 'compose' or 'preview'

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && selectedItem) {
      setForm({
        emailSubject: `رد على: ${selectedItem.subject}`,
        message: `مرحباً ${selectedItem.name},\n\n\n\nمع التحية،\nفريق المكتب القانوني`,
        sendCopy: true,
        urgent: false
      });
      if (isMobile) {
        setActiveTab('compose');
      }
    }
  }, [isOpen, selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.message.trim()) {
      onSubmit();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  if (!isOpen || !selectedItem) return null;

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
              className="bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-3xl md:shadow-2xl flex flex-col w-full md:w-full md:max-w-4xl overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      <Send className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">الرد على الرسالة</h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm md:text-base text-purple-100">
                          <User className="w-4 h-4" />
                          <span>{selectedItem.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm md:text-base text-purple-100">
                          <Mail className="w-4 h-4" />
                          <span className="truncate max-w-[150px] md:max-w-xs">{selectedItem.email}</span>
                        </div>
                        {selectedItem.phone && (
                          <div className="flex items-center gap-1 text-sm md:text-base text-purple-100">
                            <Smartphone className="w-4 h-4" />
                            <span>{selectedItem.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Mobile tabs */}
                    {isMobile && (
                      <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1">
                        <button
                          onClick={() => setActiveTab('compose')}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'compose' ? 'bg-white text-purple-600' : 'text-white'}`}
                        >
                          كتابة
                        </button>
                        <button
                          onClick={() => setActiveTab('preview')}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white text-purple-600' : 'text-white'}`}
                        >
                          معاينة
                        </button>
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
                
                {/* Original message preview */}
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate ? formatDate(selectedItem.createdAt) : 'أرسلت مؤخراً'}
                      </span>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-lg">
                      {selectedItem.subject}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2 md:line-clamp-1">{selectedItem.message}</p>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {/* Desktop Layout */}
                {!isMobile ? (
                  <div className="grid grid-cols-2 gap-8 p-8">
                    {/* Compose Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          كتابة الرد
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              موضوع البريد الإلكتروني
                            </label>
                            <input
                              type="text"
                              value={form.emailSubject}
                              onChange={(e) => setForm({...form, emailSubject: e.target.value})}
                              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                              placeholder="موضوع البريد الإلكتروني"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              الرسالة *
                            </label>
                            <textarea
                              value={form.message}
                              onChange={(e) => setForm({...form, message: e.target.value})}
                              rows="8"
                              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                              placeholder="اكتب رسالة الرد هنا..."
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Column */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        معاينة الرسالة
                      </h4>
                      
                      <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-6 shadow-inner">
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                                  <MailIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">معاينة البريد الإلكتروني</p>
                                  <p className="text-sm text-gray-500">سيتم إرساله إلى {selectedItem.email}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => copyToClipboard(form.message)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                              >
                                <Copy className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">الموضوع:</p>
                                <p className="text-gray-900">{form.emailSubject || `رد على: ${selectedItem.subject}`}</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">الرسالة:</p>
                                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                  {form.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mobile Layout */
                  <div className="p-4">
                    {activeTab === 'compose' ? (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">كتابة الرد</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                موضوع البريد الإلكتروني
                              </label>
                              <input
                                type="text"
                                value={form.emailSubject}
                                onChange={(e) => setForm({...form, emailSubject: e.target.value})}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all"
                                placeholder="موضوع البريد الإلكتروني"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                الرسالة *
                              </label>
                              <textarea
                                value={form.message}
                                onChange={(e) => setForm({...form, message: e.target.value})}
                                rows="8"
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all resize-none"
                                placeholder="اكتب رسالة الرد هنا..."
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setForm({...form, message: form.message + '\n\nشكراً لك على تواصلك معنا.'})}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                          >
                            إضافة شكر
                          </button>
                          <button
                            onClick={() => setForm({...form, message: form.message + '\n\nسنقوم بالرد عليك قريباً.'})}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                          >
                            رد سريع
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">معاينة الرسالة</h4>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-4 shadow-inner">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                                  <MailIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">البريد الإلكتروني</p>
                                  <p className="text-sm text-gray-500">سيتم إرساله إلى {selectedItem.email}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => copyToClipboard(form.message)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                              >
                                <Copy className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-white border border-gray-200 rounded-xl p-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">الموضوع:</p>
                                <p className="text-gray-900">{form.emailSubject || `رد على: ${selectedItem.subject}`}</p>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-xl p-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">الرسالة:</p>
                                <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
                                  {form.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="sendCopy"
                        checked={form.sendCopy}
                        onChange={(e) => setForm({...form, sendCopy: e.target.checked})}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 checked:bg-purple-600 checked:border-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="sendCopy" className="text-sm font-medium text-gray-700">
                        إرسال نسخة بالبريد الإلكتروني
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="urgent"
                        checked={form.urgent}
                        onChange={(e) => setForm({...form, urgent: e.target.checked})}
                        className="w-5 h-5 rounded-lg border-2 border-gray-300 checked:bg-red-600 checked:border-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                        تمييز كعاجل
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors flex-1 md:flex-none"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 flex-1 md:flex-none"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال الرد</span>
                    </button>
                  </div>
                </div>
                
                {/* Character count on mobile */}
                {isMobile && activeTab === 'compose' && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      {form.message.length} حرف
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReplyModal;