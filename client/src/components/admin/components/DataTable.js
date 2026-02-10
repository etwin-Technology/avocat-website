import React, { useState } from 'react';
import { 
  Eye, Edit, Trash2, CheckCircle, XCircle, MoreVertical, 
  Copy, MessageCircle, Mail, Phone, User, Calendar, 
  MessageSquare, Send, Archive, ChevronRight, ChevronLeft,
  Ban, X, AlertCircle, Clock, CheckSquare, Square
} from 'lucide-react';
import { motion } from 'framer-motion';

const DataTable = ({
  activeTab,
  data,
  loading,
  selectedItems,
  toggleSelectAll,
  toggleSelectItem,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  formatDate,
  formatTime,
  getAppointmentStatusInfo,
  getContactStatusInfo,
  getUrgencyInfo,
  getServiceTypeLabel,
  getMeetingTypeLabel,
  getMeetingTypeIcon,
  handleEditItem,
  setSelectedItem,
  openModal,
  updateAppointmentStatus,
  updateContactStatus,
  updateContactUrgency,
  copyToClipboard,
  openWhatsApp,
  openEmail,
  openPhoneCall
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [doubleClickRow, setDoubleClickRow] = useState(null);

  // Function to determine if cancel button should be hidden
  const shouldHideCancelButton = (item) => {
    if (activeTab === 'appointments') {
      // Hide cancel button for appointments that are already cancelled or completed
      if (item.status === 'cancelled' || item.status === 'completed') {
        return true;
      }
      
      // Hide cancel button for appointments in the past
      const appointmentDate = new Date(item.preferredDate);
      const today = new Date();
      if (appointmentDate < today) {
        return true;
      }
      
      // Application-specific logic: Hide cancel button if appointment is within 2 hours
      const appointmentDateTime = new Date(`${item.preferredDate}T${item.preferredTime}`);
      const twoHoursBefore = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);
      if (new Date() > twoHoursBefore) {
        return true;
      }
      
      return false;
    }
    
    // For contacts, hide cancel button if status is archived or closed
    if (activeTab === 'contacts') {
      return item.status === 'archived' || item.status === 'closed';
    }
    
    return false;
  };

  // Function to determine if confirm button should be shown
  const shouldShowConfirmButton = (item) => {
    if (activeTab === 'appointments') {
      return item.status === 'pending';
    }
    
    if (activeTab === 'contacts') {
      return item.status === 'new';
    }
    
    return false;
  };

  // Handle double click
  const handleRowDoubleClick = (item, index) => {
    const now = Date.now();
    const clickGap = now - lastClickTime;
    
    if (clickGap < 300) { // 300ms threshold for double click
      setDoubleClickRow(index);
      
      // Open details modal on double click
      setSelectedItem(item);
      openModal('details');
      
      // Reset double click state after animation
      setTimeout(() => {
        setDoubleClickRow(null);
      }, 1000);
    }
    
    setLastClickTime(now);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {activeTab === 'appointments' ? (
            <Calendar className="w-8 h-8 text-gray-400" />
          ) : (
            <MessageSquare className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {activeTab === 'appointments' ? 'لا توجد مواعيد' : 'لا توجد اتصالات'}
        </h3>
        <p className="text-gray-500 mb-6">لم يتم العثور على بيانات.</p>
      </div>
    );
  }

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Custom checkbox for selection
  const CustomCheckbox = ({ checked, onChange, itemId }) => (
    <div 
      className={`relative w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${
        checked 
          ? 'bg-blue-600 border-blue-600' 
          : 'bg-white border-gray-300 hover:border-blue-400'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
    >
      {checked && (
        <CheckSquare className="absolute inset-0 w-full h-full p-0.5 text-white" />
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div 
                  className="inline-flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const allSelected = selectedItems.length === currentData.length;
                    toggleSelectAll(!allSelected);
                  }}
                >
                  <CustomCheckbox 
                    checked={selectedItems.length === currentData.length && currentData.length > 0}
                    onChange={() => {
                      const allSelected = selectedItems.length === currentData.length;
                      toggleSelectAll(!allSelected);
                    }}
                  />
                </div>
              </th>
              {activeTab === 'appointments' ? (
                <>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">العميل</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الخدمة</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">التاريخ & الوقت</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الحالة</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الإجراءات</th>
                </>
              ) : (
                <>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الاستعجال</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الاسم</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">البريد الإلكتروني</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الموضوع</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">التاريخ</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">الإجراءات</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((item, index) => {
              const hideCancel = shouldHideCancelButton(item);
              const showConfirm = shouldShowConfirmButton(item);
              const isDoubleClicked = doubleClickRow === index;
              
              return (
                <motion.tr 
                  key={item._id} 
                  className={`hover:bg-gray-50/50 transition-colors ${isDoubleClicked ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => handleRowDoubleClick(item, index)}
                  animate={isDoubleClicked ? {
                    scale: [1, 1.02, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  <td className="p-4">
                    <CustomCheckbox 
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleSelectItem(item._id)}
                      itemId={item._id}
                    />
                  </td>
                  
                  {activeTab === 'appointments' ? (
                    <>
                      <td className="p-4">
                        <span className="text-sm text-gray-500">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 flex-row-reverse">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{item.clientName}</p>
                            <p className="text-sm text-gray-500">{item.clientEmail}</p>
                            <p className="text-xs text-gray-400">{item.clientPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900 text-right">{getServiceTypeLabel(item.serviceType)}</p>
                        <div className="flex items-center gap-1 mt-1 flex-row-reverse">
                          {getMeetingTypeIcon(item.meetingType)}
                          <span className="text-xs text-gray-500">
                            {getMeetingTypeLabel(item.meetingType)}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-gray-900 text-right">{formatDate(item.preferredDate)}</p>
                        <p className="text-sm text-gray-500 text-right">{formatTime(item.preferredTime)}</p>
                        {new Date(item.preferredDate) < new Date() && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                            <Clock className="w-3 h-3" />
                            <span>منتهي</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${getAppointmentStatusInfo(item.status).color}`}>
                          {getAppointmentStatusInfo(item.status).icon}
                          <span>{getAppointmentStatusInfo(item.status).text}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 justify-end">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              openModal('details');
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item);
                            }}
                            className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-xl"
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          {showConfirm && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateAppointmentStatus(item._id, 'confirmed');
                              }}
                              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl"
                              title="تأكيد"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </motion.button>
                          )}
                          {!hideCancel && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateAppointmentStatus(item._id, 'cancelled', 'تم الإلغاء من لوحة التحكم');
                              }}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                              title="إلغاء"
                            >
                              <XCircle className="w-4 h-4" />
                            </motion.button>
                          )}
                          {hideCancel && item.status === 'cancelled' && (
                            <div className="p-2 text-gray-400 cursor-not-allowed" title="لا يمكن إلغاء موعد ملغي">
                              <Ban className="w-4 h-4" />
                            </div>
                          )}
                          <div className="relative group">
                            <button 
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute left-0 bottom-full mb-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                              {item.clientPhone && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                    openModal('whatsapp');
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span>إرسال واتساب</span>
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedItem(item);
                                  openModal('email');
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                              >
                                <Mail className="w-4 h-4" />
                                <span>إرسال بريد</span>
                              </button>
                              {item.clientPhone && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                    openModal('call');
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>اتصال هاتفي</span>
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(item.referenceNumber || item._id);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                              >
                                <Copy className="w-4 h-4" />
                                <span>نسخ المرجع</span>
                              </button>
                              {item.status === 'confirmed' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateAppointmentStatus(item._id, 'completed');
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>تعليم كمكتمل</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              openModal('deleteConfirm');
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">
                        <span className="text-sm text-gray-500">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${getUrgencyInfo(item.urgency).color}`}>
                          {getUrgencyInfo(item.urgency).icon}
                          <span>{getUrgencyInfo(item.urgency).text}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 flex-row-reverse">
                          <div className={`w-10 h-10 ${getUrgencyInfo(item.urgency).bgColor} rounded-lg flex items-center justify-center`}>
                            <User className={`w-5 h-5 ${getUrgencyInfo(item.urgency).textColor}`} />
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.phone || 'غير متوفر'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900 text-right">{item.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-gray-900 text-right">{item.subject}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs text-right">{item.message}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900 text-right">{formatDate(item.createdAt)}</p>
                      </td>
                                      <td className="p-4">
                                        <div className="flex items-center gap-2 justify-end">
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedItem(item);
                                              openModal('details');
                                            }}
                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                                            title="عرض التفاصيل"
                                          >
                                            <Eye className="w-4 h-4" />
                                          </motion.button>
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditItem(item);
                                            }}
                                            className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-xl"
                                            title="تعديل"
                                          >
                                            <Edit className="w-4 h-4" />
                                          </motion.button>
                                          {showConfirm && (
                                            <motion.button
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateContactStatus(item._id, 'read');
                                              }}
                                              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl"
                                              title="تعليم كمقروء"
                                            >
                                              <CheckCircle className="w-4 h-4" />
                                            </motion.button>
                                          )}
                                          {!hideCancel && item.urgency !== 'emergency' && (
                                            <motion.button
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateContactStatus(item._id, 'archived');
                                              }}
                                              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl"
                                              title="أرشفة"
                                            >
                                              <Archive className="w-4 h-4" />
                                            </motion.button>
                                          )}
                                          {hideCancel && item.status === 'archived' && (
                                            <div className="p-2 text-gray-400 cursor-not-allowed" title="مؤرشف - لا يمكن أرشفته">
                                              <Ban className="w-4 h-4" />
                                            </div>
                                          )}
                                          <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedItem(item);
                                              openModal('reply');
                                            }}
                                            className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl"
                                            title="رد"
                                          >
                                            <Send className="w-4 h-4" />
                                          </motion.button>
                                          {!hideCancel && (
                                            <motion.button
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedItem(item);
                                                openModal('deleteConfirm');
                                              }}
                                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                              title="حذف"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </motion.button>
                                          )}
                                          {hideCancel && item.status === 'closed' && (
                                            <div className="p-2 text-gray-400 cursor-not-allowed" title="مغلق - لا يمكن حذفه">
                                              <Ban className="w-4 h-4" />
                                            </div>
                                          )}
                                          <div className="relative group">
                                            <button 
                                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <MoreVertical className="w-4 h-4" />
                                            </button>
                                            <div className="absolute left-0 bottom-full mb-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                              {item.phone && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    openWhatsApp(item.phone);
                                                  }}
                                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                                >
                                                  <MessageCircle className="w-4 h-4" />
                                                  <span>واتساب</span>
                                                </button>
                                              )}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  openEmail(item.email, `رد: ${item.subject}`, `عزيزي ${item.name},\n\n`);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                              >
                                                <Mail className="w-4 h-4" />
                                                <span>بريد إلكتروني</span>
                                              </button>
                                              {item.phone && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    openPhoneCall(item.phone);
                                                  }}
                                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                                >
                                                  <Phone className="w-4 h-4" />
                                                  <span>اتصال هاتفي</span>
                                                </button>
                                              )}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  copyToClipboard(item._id);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                              >
                                                <Copy className="w-4 h-4" />
                                                <span>نسخ المرجع</span>
                                              </button>
                                              {item.urgency === 'normal' && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateContactUrgency(item._id, 'urgent');
                                                  }}
                                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                                >
                                                  <AlertCircle className="w-4 h-4" />
                                                  <span>تعليم كعاجل</span>
                                                </button>
                                              )}
                                              {item.urgency === 'urgent' && (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateContactUrgency(item._id, 'normal');
                                                  }}
                                                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                                                >
                                                  <Clock className="w-4 h-4" />
                                                  <span>تعليم كعادي</span>
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </>
                                  )}
                                </motion.tr>
                              );
                            })}
                ```
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                عرض {Math.min(itemsPerPage, data.length - (currentPage - 1) * itemsPerPage)} من أصل {data.length} {activeTab === 'appointments' ? 'موعد' : 'اتصال'}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Double click instruction */}
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-100 text-sm text-blue-700 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>انقر نقرتين على أي صف لعرض التفاصيل الكاملة</span>
          </div>
        </div>
      );
    };

    export default DataTable;