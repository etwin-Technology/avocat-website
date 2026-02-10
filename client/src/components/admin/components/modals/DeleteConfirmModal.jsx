import React, { useState, useEffect } from 'react';
import { 
  X, AlertTriangle, Trash2, Calendar, 
  MessageSquare, Shield, Lock, AlertCircle, 
  Eye, EyeOff, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  item,
  activeTab,
  formatDate,
  formatTime,
  onConfirm,
  getServiceTypeLabel,
  getUrgencyInfo,
  isDeleting = false
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const isAppointment = !!item?.clientName;
  const itemName = item?.clientName || item?.name || 'هذا العنصر';
  const referenceNumber = item?.referenceNumber || `REF-${item?._id?.slice(-8) || 'N/A'}`;

  const deleteReasons = [
    { id: 'duplicate', label: 'تكرار' },
    { id: 'error', label: 'خطأ في البيانات' },
    { id: 'cancelled', label: 'ملغى من قبل العميل' },
    { id: 'spam', label: 'بريد مزعج / غير مرغوب' },
    { id: 'other', label: 'سبب آخر' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setConfirmText('');
      setDeleteReason('');
      setShowDetails(false);
      setOtherReason('');
    }
  }, [isOpen]);

  const requiresConfirmation = isAppointment && item?.status === 'confirmed';
  const confirmationText = `احذف ${referenceNumber}`;
  const isConfirmed = confirmText === confirmationText;

  const handleDelete = () => {
    if (requiresConfirmation && !isConfirmed) return;
    const reason = deleteReason || deleteReasons[0].id;
    onConfirm(reason);
  };

  if (!isOpen || !item) return null;

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
              className="bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-3xl md:shadow-2xl flex flex-col w-full md:w-full md:max-w-lg overflow-hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 md:rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">تأكيد الحذف</h3>
                      <p className="text-sm md:text-base text-white/90 mt-1">
                        إجراء دائم لا يمكن التراجع عنه
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors"
                    disabled={isDeleting}
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {/* Warning Banner */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 mb-1">تحذير: هذا الإجراء نهائي!</p>
                      <p className="text-sm text-red-700">
                        سيتم حذف جميع البيانات المرتبطة بهذا {isAppointment ? 'الموعد' : 'الاتصال'} ولا يمكن استعادتها.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item Preview */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        {isAppointment ? (
                          <Calendar className="w-5 h-5 text-red-600" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{itemName}</p>
                        <p className="text-sm text-gray-500">{referenceNumber}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      {showDetails ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {showDetails && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">النوع</p>
                          <p className="font-medium">
                            {isAppointment ? 'موعد' : 'اتصال'}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">الحالة</p>
                          <p className="font-medium">
                            {isAppointment ? item.status : item.status}
                          </p>
                        </div>
                      </div>
                      
                      {isAppointment ? (
                        <>
                          {item.preferredDate && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">التاريخ:</span>
                              <span className="font-medium">{formatDate(item.preferredDate)}</span>
                            </div>
                          )}
                          {item.serviceType && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">الخدمة:</span>
                              <span className="font-medium">{getServiceTypeLabel?.(item.serviceType) || item.serviceType}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {item.subject && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">الموضوع:</span>
                              <span className="font-medium truncate max-w-[150px]">{item.subject}</span>
                            </div>
                          )}
                          {item.urgency && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">الأولوية:</span>
                              <span className="font-medium">
                                {getUrgencyInfo?.(item.urgency)?.text || item.urgency}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Extra Confirmation for Important Items */}
                {requiresConfirmation && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-amber-600" />
                      <p className="font-medium text-amber-800">تحقق إضافي مطلوب</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-4">
                      <p className="text-sm text-amber-800 mb-3">
                        هذا الموعد <span className="font-bold">مؤكد</span> ويحتاج إلى تأكيد إضافي للحذف.
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-amber-700 mb-2">
                            اكتب <span className="font-mono font-bold">"{confirmationText}"</span> للتأكيد:
                          </label>
                          <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className={`w-full border-2 ${isConfirmed ? 'border-green-500 bg-green-50' : 'border-amber-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all`}
                            placeholder={confirmationText}
                          />
                        </div>
                        
                        {isConfirmed && (
                          <div className="flex items-center gap-2 text-green-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">تم التحقق، يمكنك المتابعة</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete Reason (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    سبب الحذف (اختياري)
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {deleteReasons.map((reason) => (
                      <button
                        key={reason.id}
                        type="button"
                        onClick={() => setDeleteReason(reason.id)}
                        className={`p-3 rounded-xl border-2 transition-all ${deleteReason === reason.id ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <span className="text-sm">{reason.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  {deleteReason === 'other' && (
                    <div className="mt-3">
                      <textarea
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        rows="2"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all resize-none"
                        placeholder="حدد السبب..."
                      />
                    </div>
                  )}
                </div>

                {/* Impact Warning */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <Trash2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">الآثار الجانبية:</p>
                      <ul className="text-sm text-gray-600 space-y-1 pr-5">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                          <span>سيتم حذف جميع البيانات المرتبطة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                          <span>لا يمكن استعادة المعلومات المحذوفة</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2"></div>
                          <span>سيتم إزالة أي سجلات مرتبطة</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>إجراء نهائي</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium transition-colors flex-1 md:flex-none"
                      disabled={isDeleting}
                    >
                      إلغاء
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting || (requiresConfirmation && !isConfirmed)}
                      className={`px-8 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed ${isDeleting ? 'animate-pulse' : ''}`}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>جاري الحذف...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-5 h-5" />
                          <span>تأكيد الحذف</span>
                        </>
                      )}
                    </button>
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

export default DeleteConfirmModal;