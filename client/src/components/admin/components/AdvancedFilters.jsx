import React, { useState } from 'react';
import { Filter, ChevronUp, ChevronDown, CalendarDays, SortAsc, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedFilters = ({ activeTab, filters, updateFilter, applyFilters, resetFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    date: false,
    sort: false
  });

  const appointmentFilters = [
    { 
      id: 'status', 
      label: 'الحالة', 
      icon: '🎯',
      options: [
        { value: 'all', label: 'جميع الحالات', badge: null },
        { value: 'pending', label: 'قيد الانتظار', badge: 'bg-yellow-100 text-yellow-800' },
        { value: 'confirmed', label: 'مؤكد', badge: 'bg-green-100 text-green-800' },
        { value: 'cancelled', label: 'ملغي', badge: 'bg-red-100 text-red-800' },
        { value: 'completed', label: 'مكتمل', badge: 'bg-blue-100 text-blue-800' }
      ]
    },
    { 
      id: 'serviceType', 
      label: 'نوع الخدمة', 
      icon: '⚖️',
      options: [
        { value: 'all', label: 'جميع الخدمات' },
        { value: 'legal_consultation', label: 'استشارة قانونية' },
        { value: 'notary_service', label: 'خدمة كاتب عدل' },
        { value: 'contract_review', label: 'مراجعة العقود' },
        { value: 'court_representation', label: 'تمثيل في المحكمة' }
      ]
    },
    { 
      id: 'meetingType', 
      label: 'نوع الاجتماع', 
      icon: '💬',
      options: [
        { value: 'all', label: 'جميع الأنواع' },
        { value: 'in_person', label: 'حضوري', icon: '👥' },
        { value: 'video_call', label: 'مكالمة فيديو', icon: '📹' },
        { value: 'phone_call', label: 'مكالمة هاتفية', icon: '📞' }
      ]
    },
    { 
      id: 'location', 
      label: 'الموقع', 
      icon: '📍',
      options: [
        { value: 'all', label: 'جميع المواقع' },
        { value: 'casablanca', label: 'الدار البيضاء' },
        { value: 'rabat', label: 'الرباط' },
        { value: 'marrakech', label: 'مراكش' },
        { value: 'online', label: 'أونلاين', icon: '🌐' }
      ]
    }
  ];

  const contactFilters = [
    { 
      id: 'contactStatus', 
      label: 'الحالة', 
      icon: '📨',
      options: [
        { value: 'all', label: 'جميع الحالات' },
        { value: 'new', label: 'جديد', badge: 'bg-blue-100 text-blue-800' },
        { value: 'read', label: 'مقروء', badge: 'bg-gray-100 text-gray-800' },
        { value: 'in_progress', label: 'قيد المعالجة', badge: 'bg-yellow-100 text-yellow-800' },
        { value: 'replied', label: 'تم الرد', badge: 'bg-green-100 text-green-800' }
      ]
    },
    { 
      id: 'urgency', 
      label: 'الاستعجال', 
      icon: '🚨',
      options: [
        { value: 'all', label: 'جميع المستويات' },
        { value: 'emergency', label: 'طارئ', badge: 'bg-red-100 text-red-800' },
        { value: 'urgent', label: 'عاجل', badge: 'bg-orange-100 text-orange-800' },
        { value: 'high', label: 'مرتفع', badge: 'bg-yellow-100 text-yellow-800' },
        { value: 'normal', label: 'عادي', badge: 'bg-green-100 text-green-800' },
        { value: 'low', label: 'منخفض', badge: 'bg-gray-100 text-gray-800' }
      ]
    },
    { 
      id: 'category', 
      label: 'التصنيف', 
      icon: '🏷️',
      options: [
        { value: 'all', label: 'جميع التصنيفات' },
        { value: 'inquiry', label: 'استفسار', icon: '❓' },
        { value: 'complaint', label: 'شكوى', icon: '⚠️' },
        { value: 'suggestion', label: 'اقتراح', icon: '💡' },
        { value: 'feedback', label: 'ملاحظات', icon: '📝' }
      ]
    },
    { 
      id: 'source', 
      label: 'المصدر', 
      icon: '📱',
      options: [
        { value: 'all', label: 'جميع المصادر' },
        { value: 'contact_page', label: 'صفحة الاتصال', icon: '📄' },
        { value: 'website', label: 'الموقع', icon: '🌐' },
        { value: 'phone', label: 'هاتف', icon: '📞' },
        { value: 'email', label: 'بريد', icon: '✉️' }
      ]
    }
  ];

  const currentFilters = activeTab === 'appointments' ? appointmentFilters : contactFilters;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = () => {
    const defaultFilters = {
      status: 'all',
      serviceType: 'all',
      meetingType: 'all',
      location: 'all',
      contactStatus: 'all',
      urgency: 'all',
      category: 'all',
      source: 'all',
      dateFrom: '',
      dateTo: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };

    return Object.keys(filters).some(key => 
      filters[key] !== defaultFilters[key]
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(filters).forEach(value => {
      if (value && value !== 'all' && value !== 'createdAt' && value !== 'desc') {
        count++;
      }
    });
    return count;
  };

  return (
    <div className="mt-6 rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">الفلاتر المتقدمة</h3>
              <p className="text-sm text-gray-600">قم بتخصيص البحث حسب احتياجاتك</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                إلغاء الفلاتر ({getActiveFilterCount()})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Content */}
      <div className="p-5">
        {/* Status & Type Filters */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('status')}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <div>
                <h4 className="font-medium text-gray-900">تصفية حسب النوع</h4>
                <p className="text-sm text-gray-500">اختر نوع الخدمة، الحالة، والمزيد</p>
              </div>
            </div>
            {expandedSections.status ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <AnimatePresence>
            {expandedSections.status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 bg-gray-50/50 rounded-xl">
                  {currentFilters.map((filter) => (
                    <div key={filter.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{filter.icon}</span>
                        <label className="text-sm font-medium text-gray-700">
                          {filter.label}
                        </label>
                      </div>
                      <select
                        value={filters[filter.id] || 'all'}
                        onChange={(e) => updateFilter(filter.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        {filter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.icon ? `${option.icon} ` : ''}{option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('date')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">نطاق التاريخ</h4>
                <p className="text-sm text-gray-500">حدد فترة زمنية محددة</p>
              </div>
            </div>
            {expandedSections.date ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <AnimatePresence>
            {expandedSections.date && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">من تاريخ</label>
                      <div className="relative">
                        <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={filters.dateFrom || ''}
                          onChange={(e) => updateFilter('dateFrom', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">إلى تاريخ</label>
                      <div className="relative">
                        <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={filters.dateTo || ''}
                          onChange={(e) => updateFilter('dateTo', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                  </div>
                  {(filters.dateFrom || filters.dateTo) && (
                    <div className="mt-3 pt-3 border-t border-emerald-200/50">
                      <p className="text-xs text-emerald-700">
                        {filters.dateFrom && filters.dateTo 
                          ? `الفترة: من ${filters.dateFrom} إلى ${filters.dateTo}`
                          : filters.dateFrom 
                            ? `من تاريخ: ${filters.dateFrom}`
                            : `إلى تاريخ: ${filters.dateTo}`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Options */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('sort')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                <SortAsc className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">الترتيب والتصنيف</h4>
                <p className="text-sm text-gray-500">رتب النتائج كما تفضل</p>
              </div>
            </div>
            {expandedSections.sort ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <AnimatePresence>
            {expandedSections.sort && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">ترتيب حسب</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      >
                        <option value="createdAt">تاريخ الإنشاء</option>
                        <option value="preferredDate">تاريخ الموعد</option>
                        <option value="clientName">اسم العميل</option>
                        <option value="status">الحالة</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">اتجاه الترتيب</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateFilter('sortOrder', 'desc')}
                          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            filters.sortOrder === 'desc'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          تنازلي
                        </button>
                        <button
                          onClick={() => updateFilter('sortOrder', 'asc')}
                          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                            filters.sortOrder === 'asc'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          تصاعدي
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {hasActiveFilters() ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>تم تفعيل {getActiveFilterCount()} فلتر</span>
              </span>
            ) : (
              'لم يتم تطبيق أي فلاتر بعد'
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-all hover:scale-[1.02]"
            >
              إعادة تعيين
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;