import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, XCircle, Archive, AlertTriangle, AlertOctagon, 
  Trash2, Users, Send, Filter, Copy, Eye, EyeOff, 
  Download, Upload, MessageSquare, Mail, Phone, 
  ChevronDown, ChevronUp, MoreVertical, Settings, 
  Shield, Clock, Calendar, Star, Bell, Zap,
  RefreshCw, FileText, Tag, Hash, Lock, Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BulkActionsBar = ({
  activeTab,
  selectedItems,
  setSelectedItems,
  bulkAppointmentActions,
  bulkContactActions,
  totalItems,
  onSelectAll
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBulkAction = async (action, data = {}) => {
    if (selectedItems.length === 0) return;
    
    setIsProcessing(true);
    setSelectedAction(action);
    
    try {
      if (activeTab === 'appointments') {
        await bulkAppointmentActions(action, data);
      } else {
        await bulkContactActions(action, data);
      }
      
      // Reset selection after successful action
      if (action === 'delete' || action === 'archive') {
        setSelectedItems([]);
      }
    } catch (error) {
      console.error('Bulk action error:', error);
    } finally {
      setIsProcessing(false);
      setSelectedAction(null);
      setShowMoreActions(false);
      setShowDeleteConfirm(false);
    }
  };

  const appointmentActions = [
    {
      id: 'confirm',
      label: 'تأكيد',
      icon: CheckCircle,
      color: 'bg-green-600 hover:bg-green-700',
      mobileLabel: 'تأكيد'
    },
    {
      id: 'cancel',
      label: 'إلغاء',
      icon: XCircle,
      color: 'bg-red-600 hover:bg-red-700',
      mobileLabel: 'إلغاء'
    },
    {
      id: 'complete',
      label: 'إكمال',
      icon: CheckCircle,
      color: 'bg-blue-600 hover:bg-blue-700',
      mobileLabel: 'إكمال'
    },
    {
      id: 'reschedule',
      label: 'إعادة جدولة',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      mobileLabel: 'جدولة'
    },
    {
      id: 'send_reminder',
      label: 'إرسال تذكير',
      icon: Bell,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      mobileLabel: 'تذكير'
    },
    {
      id: 'export',
      label: 'تصدير',
      icon: Download,
      color: 'bg-gray-600 hover:bg-gray-700',
      mobileLabel: 'تصدير'
    }
  ];

  const contactActions = [
    {
      id: 'set_emergency',
      label: 'حالة طوارئ',
      icon: AlertOctagon,
      color: 'bg-red-600 hover:bg-red-700',
      mobileLabel: 'طارئ'
    },
    {
      id: 'set_urgent',
      label: 'عاجل',
      icon: AlertTriangle,
      color: 'bg-orange-600 hover:bg-orange-700',
      mobileLabel: 'عاجل'
    },
    {
      id: 'mark_as_read',
      label: 'تعيين كمقروء',
      icon: Eye,
      color: 'bg-blue-600 hover:bg-blue-700',
      mobileLabel: 'مقروء'
    },
    {
      id: 'mark_important',
      label: 'تحديد كمهم',
      icon: Star,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      mobileLabel: 'مهم'
    },
    {
      id: 'archive',
      label: 'أرشفة',
      icon: Archive,
      color: 'bg-purple-600 hover:bg-purple-700',
      mobileLabel: 'أرشفة'
    },
    {
      id: 'send_reply',
      label: 'إرسال رد',
      icon: Send,
      color: 'bg-green-600 hover:bg-green-700',
      mobileLabel: 'رد'
    }
  ];

  const commonActions = [
    {
      id: 'copy',
      label: 'نسخ',
      icon: Copy,
      color: 'bg-gray-600 hover:bg-gray-700',
      mobileLabel: 'نسخ'
    },
    {
      id: 'export_csv',
      label: 'تصدير CSV',
      icon: FileText,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      mobileLabel: 'CSV'
    },
    {
      id: 'assign_tags',
      label: 'إضافة تسميات',
      icon: Tag,
      color: 'bg-pink-600 hover:bg-pink-700',
      mobileLabel: 'تسميات'
    }
  ];

  const actions = activeTab === 'appointments' ? appointmentActions : contactActions;
  const allActions = [...actions, ...commonActions];
  const primaryActions = isMobile ? allActions.slice(0, 3) : allActions.slice(0, 5);
  const secondaryActions = isMobile ? allActions.slice(3) : allActions.slice(5);

  if (selectedItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className={`${isMobile ? 'fixed bottom-0 left-0 right-0 z-40' : 'sticky top-0 z-30'} bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl`}
      >
        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">تأكيد الحذف</h3>
                    <p className="text-sm text-gray-600">سيتم حذف {selectedItems.length} عنصر</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  هذا الإجراء نهائي ولا يمكن التراجع عنه. هل أنت متأكد؟
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessing && selectedAction === 'delete' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري الحذف...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        نعم، احذف
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6">
            {/* Selection Info */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium">
                    {selectedItems.length} عنصر محدد
                  </p>
                  <p className="text-xs text-white/80">
                    من أصل {totalItems} {activeTab === 'appointments' ? 'موعد' : 'اتصال'}
                  </p>
                </div>
              </div>

              {/* Select All Toggle */}
              <div className="hidden md:flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-white/30 checked:bg-white checked:border-white"
                    checked={selectedItems.length === totalItems && totalItems > 0}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                  <span className="text-sm">تحديد الكل</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {/* Primary Actions */}
              <div className="flex flex-wrap gap-2">
                {primaryActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      if (action.id === 'delete') {
                        setShowDeleteConfirm(true);
                      } else {
                        handleBulkAction(action.id);
                      }
                    }}
                    disabled={isProcessing}
                    className={`px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${action.color} disabled:opacity-50 disabled:cursor-not-allowed ${isProcessing && selectedAction === action.id ? 'animate-pulse' : ''}`}
                  >
                    {isProcessing && selectedAction === action.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <action.icon className="w-4 h-4" />
                    )}
                    <span className="hidden md:inline">{action.label}</span>
                    <span className="md:hidden">{action.mobileLabel}</span>
                  </button>
                ))}

                {/* More Actions Button */}
                {secondaryActions.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowMoreActions(!showMoreActions)}
                      className="px-3 md:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <MoreVertical className="w-4 h-4" />
                      <span className="hidden md:inline">المزيد</span>
                      {showMoreActions ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    {/* More Actions Dropdown */}
                    <AnimatePresence>
                      {showMoreActions && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 md:left-auto md:right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
                        >
                          <div className="p-2">
                            {secondaryActions.map((action) => (
                              <button
                                key={action.id}
                                onClick={() => {
                                  if (action.id === 'delete') {
                                    setShowDeleteConfirm(true);
                                  } else {
                                    handleBulkAction(action.id);
                                  }
                                  setShowMoreActions(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg text-right transition-colors"
                              >
                                <action.icon className="w-4 h-4" />
                                <span>{action.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Delete Button (always visible) */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isProcessing}
                  className={`px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 ${isProcessing && selectedAction === 'delete' ? 'animate-pulse' : ''}`}
                >
                  {isProcessing && selectedAction === 'delete' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline">حذف</span>
                  <span className="md:hidden">حذف</span>
                </button>
              </div>

              {/* Clear Selection */}
              <button
                onClick={() => setSelectedItems([])}
                disabled={isProcessing}
                className="p-2 text-white hover:text-white/80 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="px-4 md:px-6 pb-4">
              <div className="w-full bg-white/20 rounded-full h-1">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1 bg-white rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile spacer */}
      {isMobile && selectedItems.length > 0 && (
        <div className="h-20"></div>
      )}
    </AnimatePresence>
  );
};

export default BulkActionsBar;