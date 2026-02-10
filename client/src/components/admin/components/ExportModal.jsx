import React, { useState, useEffect } from 'react';
import { X, FileText, Download, ChevronDown, ChevronUp, Check, Filter, Calendar, Users, Database, Info, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExportModal = ({ isOpen, onClose, activeTab, onExport, dataCount = 100 }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedDataType, setSelectedDataType] = useState(activeTab);
  const [showOptions, setShowOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [allData, setAllData] = useState(true);
  const [formatDates, setFormatDates] = useState(true);
  const [compression, setCompression] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const exportOptions = [
    {
      id: 'csv',
      label: 'CSV',
      description: 'Excel / Spreadsheets',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:border-emerald-300',
      fileSize: '~1.2 MB',
      popular: true
    },
    {
      id: 'excel',
      label: 'Excel',
      description: 'Microsoft Excel',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300',
      fileSize: '~1.8 MB'
    },
    {
      id: 'json',
      label: 'JSON',
      description: 'Developer Friendly',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300',
      fileSize: '~2.5 MB'
    },
    {
      id: 'pdf',
      label: 'PDF',
      description: 'Printable Report',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      hoverColor: 'hover:border-rose-300',
      fileSize: '~3.2 MB',
      premium: true
    }
  ];

  const dataTypes = [
    {
      id: 'appointments',
      label: 'المواعيد',
      icon: <Calendar className="w-4 h-4" />,
      description: 'جميع بيانات المواعيد',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 'contacts',
      label: 'جهات الاتصال',
      icon: <Users className="w-4 h-4" />,
      description: 'جميع جهات الاتصال',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      id: 'all',
      label: 'الكل',
      icon: <Database className="w-4 h-4" />,
      description: 'جميع البيانات',
      color: 'text-gray-700',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200'
    }
  ];

  const selectedExportOption = exportOptions.find(opt => opt.id === selectedFormat);
  const selectedDataOption = dataTypes.find(type => type.id === selectedDataType);

  const handleExport = () => {
    onExport(selectedDataType, selectedFormat, {
      includeHeaders,
      allData,
      formatDates,
      compression
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4" dir="rtl">
          {/* Modern Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-md"
          />

          {/* Modern Modal Container with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className={`relative bg-gradient-to-b from-white to-gray-50 w-full ${
              isMobile 
                ? 'rounded-t-3xl max-h-[85vh] overflow-hidden shadow-2xl'
                : 'rounded-3xl max-w-2xl max-h-[90vh] shadow-2xl border border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern Header with Gradient */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-white via-white to-gray-50 border-b border-gray-200/50 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      تصدير البيانات
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">اختر نوع البيانات وتنسيق التصدير</p>
                  </div>
                </div>
                {!isMobile && (
                  <button
                    onClick={handleClose}
                    className="group p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className={`overflow-y-auto ${isMobile ? 'max-h-[calc(85vh-120px)]' : 'max-h-[calc(90vh-180px)]'}`}>
              <div className="p-4 md:p-6 space-y-6">
                {/* Modern Selection Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200/50 p-5 shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${selectedDataOption.bgColor} border ${selectedDataOption.borderColor}`}>
                        {selectedDataOption.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-blue-900">البيانات المحددة</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            جاهزة
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-1">{selectedDataOption.label}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {dataCount}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">سجل</p>
                    </div>
                  </div>
                </div>

                {/* Data Type Selection - Modern Cards */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-900">نوع البيانات</h4>
                    </div>
                    <span className="text-xs text-gray-500">اختر البيانات المراد تصديرها</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {dataTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedDataType(type.id)}
                        className={`group relative p-4 rounded-2xl border-2 text-right transition-all duration-300 ${
                          selectedDataType === type.id
                            ? `border-2 ${type.borderColor} ${type.bgColor} shadow-lg scale-[1.02]`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        {selectedDataType === type.id && (
                          <>
                            <div className="absolute top-3 left-3 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-2xl"></div>
                          </>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${selectedDataType === type.id ? 'bg-white/80' : type.bgColor} border ${type.borderColor}`}>
                            {type.icon}
                          </div>
                          {type.id === 'all' && (
                            <span className="px-2 py-1 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                              موصى به
                            </span>
                          )}
                        </div>
                        <p className={`text-lg font-bold ${type.color} mb-1`}>{type.label}</p>
                        <p className="text-xs text-gray-600">{type.description}</p>
                        {selectedDataType === type.id && (
                          <div className="mt-3 pt-3 border-t border-gray-200/50">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">عدد السجلات</span>
                              <span className="font-semibold text-gray-900">
                                {type.id === 'all' ? dataCount * 2 : dataCount}
                              </span>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Export Format Selection - Modern Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-900">تنسيق التصدير</h4>
                    </div>
                    <span className="text-xs text-gray-500">اختر نوع الملف المناسب</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {exportOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedFormat(option.id)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedFormat === option.id
                            ? `${option.borderColor} bg-white shadow-xl scale-[1.02] border-2`
                            : `border-gray-200 bg-white ${option.hoverColor} hover:shadow-lg`
                        }`}
                      >
                        {option.popular && (
                          <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full z-10">
                            الأكثر استخداماً
                          </div>
                        )}
                        {option.premium && (
                          <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold rounded-full z-10">
                            مميز
                          </div>
                        )}
                        {selectedFormat === option.id && (
                          <div className="absolute top-3 left-3 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className={`p-4 rounded-2xl ${option.bgColor} border ${option.borderColor} transition-transform group-hover:scale-105`}>
                            {option.icon}
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${option.color} mb-1`}>{option.label}</p>
                            <p className="text-xs text-gray-600">{option.description}</p>
                            <div className="mt-2 flex items-center justify-center gap-1">
                              <FileText className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{option.fileSize}</span>
                            </div>
                          </div>
                        </div>
                        {selectedFormat === option.id && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-b-2xl"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modern Advanced Options */}
                <div className="rounded-2xl border border-gray-200/50 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center border border-blue-200/50">
                        <Filter className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">خيارات متقدمة</p>
                        <p className="text-xs text-gray-600 mt-1">تخصيص إعدادات التصدير</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {showOptions ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {showOptions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 space-y-4 border-t border-gray-200/50 bg-white">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-blue-200">
                                <Check className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-900">إعدادات التنسيق</p>
                                <p className="text-xs text-blue-700">تحسين تجربة التصدير</p>
                              </div>
                            </div>
                            <Shield className="w-5 h-5 text-blue-500/50" />
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id="includeHeaders"
                                    checked={includeHeaders}
                                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-2 border-gray-300 bg-white checked:bg-gradient-to-br checked:from-emerald-500 checked:to-emerald-600 checked:border-emerald-500 appearance-none transition-all duration-200"
                                  />
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 checked:opacity-100" />
                                </div>
                                <label htmlFor="includeHeaders" className="text-sm font-medium text-gray-900">
                                  تضمين العناوين والأسماء
                                </label>
                              </div>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                CSV, Excel
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id="allData"
                                    checked={allData}
                                    onChange={(e) => setAllData(e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-2 border-gray-300 bg-white checked:bg-gradient-to-br checked:from-emerald-500 checked:to-emerald-600 checked:border-emerald-500 appearance-none transition-all duration-200"
                                  />
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 checked:opacity-100" />
                                </div>
                                <label htmlFor="allData" className="text-sm font-medium text-gray-900">
                                  تضمين البيانات المؤرشفة
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                                  +{Math.round(dataCount * 0.2)}
                                </span>
                                <span className="text-xs text-gray-500">سجلات إضافية</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id="formatDates"
                                    checked={formatDates}
                                    onChange={(e) => setFormatDates(e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-2 border-gray-300 bg-white checked:bg-gradient-to-br checked:from-emerald-500 checked:to-emerald-600 checked:border-emerald-500 appearance-none transition-all duration-200"
                                  />
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 checked:opacity-100" />
                                </div>
                                <label htmlFor="formatDates" className="text-sm font-medium text-gray-900">
                                  تنسيق التواريخ العربية
                                </label>
                              </div>
                              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                                PDF, Excel
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id="compression"
                                    checked={compression}
                                    onChange={(e) => setCompression(e.target.checked)}
                                    className="w-5 h-5 rounded-lg border-2 border-gray-300 bg-white checked:bg-gradient-to-br checked:from-emerald-500 checked:to-emerald-600 checked:border-emerald-500 appearance-none transition-all duration-200"
                                  />
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 checked:opacity-100" />
                                </div>
                                <label htmlFor="compression" className="text-sm font-medium text-gray-900">
                                  ضغط الملف لسرعة التحميل
                                </label>
                              </div>
                              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                توفير 40%
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modern Preview Section */}
                <div className="rounded-2xl border border-gray-200/50 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200/50">
                        <Info className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">معاينة التصدير</p>
                        <p className="text-xs text-gray-600 mt-1">تفاصيل عملية التصدير</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {showPreview ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {showPreview && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 space-y-4 border-t border-gray-200/50 bg-gradient-to-br from-gray-50 to-white">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                              <p className="text-xs text-gray-600 mb-2">نوع البيانات</p>
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${selectedDataOption.bgColor}`}>
                                  {selectedDataOption.icon}
                                </div>
                                <p className="font-semibold text-gray-900">{selectedDataOption.label}</p>
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                              <p className="text-xs text-gray-600 mb-2">تنسيق الملف</p>
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${selectedExportOption.bgColor}`}>
                                  {selectedExportOption.icon}
                                </div>
                                <p className="font-semibold text-gray-900">{selectedExportOption.label}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-sm font-semibold text-emerald-900">تفاصيل الملف</p>
                              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                {compression ? 'مضغوط' : 'غير مضغوط'}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">عدد السجلات:</span>
                                <span className="font-semibold text-gray-900">{allData ? Math.round(dataCount * 1.2) : dataCount}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">حجم الملف:</span>
                                <span className="font-semibold text-gray-900">{selectedExportOption.fileSize}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">وقت التصدير:</span>
                                <span className="font-semibold text-gray-900">~3 ثواني</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-xl">
                            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-blue-900">سيبدأ التحميل تلقائياً</p>
                              <p className="text-xs text-blue-700 mt-1">
                                سيتم تنزيل الملف مباشرةً إلى جهازك بعد النقر على تصدير
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Modern Footer */}
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/95 border-t border-gray-200/50 p-5">
              <div className="flex items-center justify-between">
                {isMobile ? (
                  <button
                    onClick={handleClose}
                    className="px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 text-sm font-medium transition-all duration-200"
                  >
                    إغلاق
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse"></div>
                    <p className="text-sm text-gray-600">جاهز للتصدير الفوري</p>
                  </div>
                )}
                
                <button
                  onClick={handleExport}
                  className="group px-7 py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative">
                    <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span>بدء التصدير</span>
                </button>
              </div>
            </div>

            {/* Modern Mobile Close Button */}
            {isMobile && (
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200/50 hover:scale-105 transition-transform"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;