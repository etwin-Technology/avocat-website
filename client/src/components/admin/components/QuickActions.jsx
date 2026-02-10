import React from 'react';
import { X, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ExportModal = ({ isOpen, onClose, activeTab, onExport }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">تصدير البيانات</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">اختر تنسيق التصدير:</p>
          
          <div className="space-y-6">
            {/* Data Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نوع البيانات</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-900 text-right">
                  {activeTab === 'appointments' ? 'المواعيد' : 'جهات الاتصال'}
                </p>
              </div>
            </div>
            
            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">التنسيق</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onExport(activeTab, 'csv');
                  }}
                  className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
                >
                  <FileText className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">CSV</span>
                  <span className="text-xs text-gray-500">إكسل</span>
                </button>
                <button
                  onClick={() => {
                    onExport(activeTab, 'json');
                  }}
                  className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
                >
                  <FileText className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">JSON</span>
                  <span className="text-xs text-gray-500">بيانات</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
          >
            إلغاء
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExportModal;