import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  Calendar,
  MessageSquare,
  LogOut,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Plus,
  X,
  Menu,
  MailCheck,
  CalendarCheck,
  CalendarX,
  PhoneCall,
  Video,
  AlertCircle,
  Copy,
  Archive,
  Send,
  MoreVertical,
  EyeOff,
  Eye as EyeOpen,
  Grid,
  List,
  FilterX,
  Check as CheckIcon,
  Printer,
  FileText,
  Shield,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Database,
  Activity,
  AlertTriangle,
  AlertOctagon,
  Target,
  PieChart,
  FileSpreadsheet,
  Clipboard,
  Save,
  ExternalLink,
  Settings,
  Shield as ShieldIcon,
  Wrench,
  Users,
  Star,
  Award,
  Globe,
  Home,
  Building,
  CreditCard,
  Heart,
  Zap,
  Cloud,
  Server,
  Battery,
  Thermometer,
  Wind,
  MessageCircle,
  Bell,
  Tag,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  ArrowUpDown,
  Hash,
  Percent,
  DollarSign,
  TrendingDown,
  Package,
  Truck,
  Store,
  ShoppingCart,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Key,
  Lock,
  Unlock,
  Upload,
  Download as DownloadIcon,
  Share2,
  Link,
  Link2,
  Globe as GlobeIcon,
  MapPin,
  Navigation,
  Compass,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind as WindIcon,
  Droplets,
  ThermometerSun,
  ThermometerSnowflake,
  Sunrise,
  Sunset,
  MoonStar,
  Cloudy,
  CloudSun,
  CloudMoon,
  Snowflake,
  Umbrella,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Fire,
  Flood,
  Drought,
  Meteor,
  Alien,
  Ghost,
  Skull,
  Crosshair,
  Target as TargetIcon,
  Bullseye,
  Circle,
  Square as SquareIcon,
  Triangle,
  Pentagon,
  Hexagon,
  Octagon,
  Cross,
  Infinity as InfinityIcon,
  Anchor,
  Ship,
  Plane,
  Car,
  Bike,
  Train,
  Bus,
  Rocket,
  Satellite,
  UFO,
  Robot,
  Android,
  Apple,
  Windows,
  Linux,
  Chrome,
  Firefox,
  Safari,
  Edge,
  Opera,
  InternetExplorer,
  Ban,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';

// مكونات فرعية
import AdvancedFilters from './components/AdvancedFilters';
import DataTable from './components/DataTable';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import ExportModal from './components/ExportModal';
import AppointmentModal from './components/modals/AppointmentModal';
import ContactModal from './components/modals/ContactModal';
import DetailsModal from './components/modals/DetailsModal';
import ReplyModal from './components/modals/ReplyModal';
import DeleteConfirmModal from './components/modals/DeleteConfirmModal';
import EmergencyPanel from './components/EmergencyPanel';
import BulkActionsBar from './components/BulkActionsBar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State Management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    appointments: {
      total: 0,
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
      today: 0,
      upcoming: 0,
      conversionRate: 0
    },
    contacts: {
      total: 0,
      new: 0,
      urgent: 0,
      emergency: 0,
      avgResponseTime: 0
    },
    system: {
      uptime: 0,
      activeUsers: 0
    }
  });

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    serviceType: 'all',
    meetingType: 'all',
    location: 'all',
    urgency: 'all',
    contactStatus: 'all',
    category: 'all',
    source: 'all',
    dateFrom: '',
    dateTo: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // UI State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showCancelled, setShowCancelled] = useState(true);

  // Modals State
  const [modals, setModals] = useState({
    appointment: false,
    contact: false,
    details: false,
    reply: false,
    deleteConfirm: false,
    export: false,
    settings: false,
    emergency: false,
    whatsapp: false,
    email: false,
    call: false,
    bulkActions: false
  });

  // Selected Item State
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(null);

  // Forms State
  const [forms, setForms] = useState({
    appointment: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceType: 'legal_consultation',
      preferredDate: '',
      preferredTime: '',
      message: '',
      language: 'ar',
      meetingType: 'in_person',
      location: 'casablanca',
      urgencyLevel: 'normal',
      status: 'pending',
      notes: ''
    },
    contact: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      serviceType: 'general',
      urgency: 'normal',
      language: 'ar',
      source: 'admin_dashboard',
      status: 'new',
      category: 'inquiry',
      tags: []
    },
    reply: {
      message: '',
      sendCopy: true,
      urgent: false,
      emailSubject: '',
      emailBody: ''
    },
    whatsapp: {
      message: '',
      includeDetails: true
    },
    email: {
      subject: '',
      message: '',
      urgent: false
    }
  });

  // Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile Device Detection
  const [isMobile, setIsMobile] = useState(false);
  
  // API Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

  // Emergency Contacts
  const emergencyContacts = contacts.filter(contact => 
    contact.urgency === 'emergency' || contact.urgency === 'urgent'
  ).sort((a, b) => {
    const urgencyPriority = { emergency: 1, urgent: 2, high: 3, normal: 4, low: 5 };
    return urgencyPriority[a.urgency] - urgencyPriority[b.urgency];
  });

  // ========================================
  // Effects & Lifecycle
  // ========================================

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setViewMode('grid'); // Force grid view on mobile
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Authentication Check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const storedUser = localStorage.getItem('adminUser');
      
      if (!token || !storedUser) {
        navigate('/admin/login');
        return false;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        return true;
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
        return false;
      }
    };

    const initializeDashboard = async () => {
      if (checkAuth()) {
        await Promise.all([
          fetchDashboardStats(),
          fetchAppointments(),
          fetchContacts()
        ]);
        setInitialLoading(false);
      }
    };

    initializeDashboard();

    // Auto-refresh
    let refreshInterval;
    if (autoRefresh) {
      refreshInterval = setInterval(() => {
        fetchDashboardStats();
        if (activeTab === 'appointments') fetchAppointments();
        if (activeTab === 'contacts') fetchContacts();
        toast.success('تم تحديث البيانات تلقائياً', { duration: 2000 });
      }, 30000);
    }

    // Cleanup
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [navigate, autoRefresh, activeTab]);

  // ========================================
  // API Functions
  // ========================================

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleApiError = (error, defaultMessage) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
      toast.error('انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى');
      return;
    }

    const message = error.response?.data?.message || defaultMessage;
    toast.error(message);
    throw error;
  };

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('فشل في جلب الإحصائيات');

      const data = await response.json();
      
      if (data.status === 'success') {
        setStats({
          appointments: {
            total: data.data.appointments.total || 0,
            pending: data.data.appointments.byStatus?.pending || 0,
            confirmed: data.data.appointments.byStatus?.confirmed || 0,
            cancelled: data.data.appointments.byStatus?.cancelled || 0,
            completed: data.data.appointments.byStatus?.completed || 0,
            today: data.data.appointments.today || 0,
            upcoming: data.data.appointments.upcoming || 0,
            conversionRate: data.data.appointments.conversionRate || 0
          },
          contacts: {
            total: data.data.contacts.total || 0,
            new: data.data.contacts.new || 0,
            urgent: data.data.contacts.urgent || 0,
            emergency: data.data.contacts.emergency || 0,
            avgResponseTime: data.data.contacts.avgResponseTime || 0
          },
          system: {
            uptime: data.data.system?.uptime || 0,
            activeUsers: data.data.system?.activeUsers || 0
          }
        });
      }
    } catch (error) {
      handleApiError(error, 'فشل في جلب إحصائيات لوحة التحكم');
    }
  };

  // Fetch Appointments
  const fetchAppointments = async (customFilters = {}) => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...filters,
        ...customFilters
      });

      const response = await fetch(`${API_BASE_URL}/admin/appointments?${queryParams}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('فشل في جلب المواعيد');

      const data = await response.json();
      
      if (data.status === 'success') {
        setAppointments(data.data.appointments || []);
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في جلب المواعيد');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Contacts
  const fetchContacts = async (customFilters = {}) => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...filters,
        ...customFilters
      });

      const response = await fetch(`${API_BASE_URL}/admin/contacts?${queryParams}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('فشل في جلب جهات الاتصال');

      const data = await response.json();
      
      if (data.status === 'success') {
        setContacts(data.data.contacts || []);
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في جلب جهات الاتصال');
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // CRUD Operations
  // ========================================

  // Create Appointment
  const createAppointment = async (appointmentData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${API_BASE_URL}/admin/appointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) throw new Error('فشل في إنشاء الموعد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم إنشاء الموعد بنجاح');
        fetchAppointments();
        fetchDashboardStats();
        closeModal('appointment');
        resetForm('appointment');
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في إنشاء الموعد');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Appointment
  const updateAppointment = async (id, updateData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });

      if (!response.ok) throw new Error('فشل في تحديث الموعد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم تحديث الموعد بنجاح');
        fetchAppointments();
        fetchDashboardStats();
        closeModal('appointment');
        resetForm('appointment');
        setEditMode(false);
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تحديث الموعد');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Appointment
  const deleteAppointment = async (id, reason = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason })
      });

      if (!response.ok) throw new Error('فشل في حذف الموعد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم حذف الموعد بنجاح');
        fetchAppointments();
        fetchDashboardStats();
        closeModal('deleteConfirm');
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في حذف الموعد');
    }
  };

  // Update Appointment Status
  const updateAppointmentStatus = async (id, status, notes = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes })
      });

      if (!response.ok) throw new Error('فشل في تحديث حالة الموعد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success(`تم تحديث الحالة: ${getAppointmentStatusText(status)}`);
        fetchAppointments();
        fetchDashboardStats();
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تحديث حالة الموعد');
    }
  };

  // Reschedule Appointment
  const rescheduleAppointment = async (id, newDate, newTime, reason = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/reschedule`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newDate, newTime, reason })
      });

      if (!response.ok) throw new Error('فشل في إعادة جدولة الموعد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم إعادة جدولة الموعد بنجاح');
        fetchAppointments();
        fetchDashboardStats();
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في إعادة جدولة الموعد');
    }
  };

  // Create Contact
  const createContact = async (contactData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${API_BASE_URL}/admin/contacts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(contactData)
      });

      if (!response.ok) throw new Error('فشل في إنشاء جهة الاتصال');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم إنشاء جهة الاتصال بنجاح');
        fetchContacts();
        fetchDashboardStats();
        closeModal('contact');
        resetForm('contact');
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في إنشاء جهة الاتصال');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Contact
  const updateContact = async (id, updateData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });

      if (!response.ok) throw new Error('فشل في تحديث جهة الاتصال');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم تحديث جهة الاتصال بنجاح');
        fetchContacts();
        fetchDashboardStats();
        closeModal('contact');
        resetForm('contact');
        setEditMode(false);
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تحديث جهة الاتصال');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('فشل في حذف جهة الاتصال');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم حذف جهة الاتصال بنجاح');
        fetchContacts();
        fetchDashboardStats();
        closeModal('deleteConfirm');
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في حذف جهة الاتصال');
    }
  };

  // Update Contact Status
  const updateContactStatus = async (id, status, notes = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes })
      });

      if (!response.ok) throw new Error('فشل في تحديث حالة جهة الاتصال');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success(`تم تحديث الحالة: ${getContactStatusText(status)}`);
        fetchContacts();
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تحديث حالة جهة الاتصال');
    }
  };

  // Update Contact Urgency
  const updateContactUrgency = async (id, urgency, notes = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/urgency`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ urgency, notes })
      });

      if (!response.ok) throw new Error('فشل في تحديث مستوى الاستعجال');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success(`تم تحديث مستوى الاستعجال: ${getUrgencyText(urgency)}`);
        fetchContacts();
        fetchDashboardStats();
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تحديث مستوى الاستعجال');
    }
  };

  // Reply to Contact
  const replyToContact = async (id, replyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/reply`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(replyData)
      });

      if (!response.ok) throw new Error('فشل في إرسال الرد');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم إرسال الرد بنجاح');
        fetchContacts();
        closeModal('reply');
        resetForm('reply');
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في إرسال الرد');
    }
  };

  // Set Contact Follow-up
  const setContactFollowUp = async (id, followUpDate, notes = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/follow-up`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ followUpDate, notes })
      });

      if (!response.ok) throw new Error('فشل في تعيين المتابعة');

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('تم تعيين المتابعة بنجاح');
        fetchContacts();
        return data.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تعيين المتابعة');
    }
  };

  // ========================================
  // Bulk Operations
  // ========================================

  // Bulk Actions for Appointments
  const bulkAppointmentActions = async (action, data = {}) => {
    if (selectedItems.length === 0) {
      toast.error('يرجى تحديد عناصر أولاً');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/bulk-actions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          action,
          appointmentIds: selectedItems,
          data
        })
      });

      if (!response.ok) throw new Error('فشل في تنفيذ الإجراء الجماعي');

      const result = await response.json();
      
      if (result.status === 'success') {
        toast.success(result.message);
        fetchAppointments();
        fetchDashboardStats();
        setSelectedItems([]);
        return result.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تنفيذ الإجراء الجماعي');
    }
  };

  // Bulk Actions for Contacts
  const bulkContactActions = async (action, data = {}) => {
    if (selectedItems.length === 0) {
      toast.error('يرجى تحديد عناصر أولاً');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/bulk-actions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          action,
          contactIds: selectedItems,
          data
        })
      });

      if (!response.ok) throw new Error('فشل في تنفيذ الإجراء الجماعي');

      const result = await response.json();
      
      if (result.status === 'success') {
        toast.success(result.message);
        fetchContacts();
        fetchDashboardStats();
        setSelectedItems([]);
        return result.data;
      }
    } catch (error) {
      handleApiError(error, 'فشل في تنفيذ الإجراء الجماعي');
    }
  };

  // ========================================
  // Export Functions
  // ========================================

  const exportData = async (type, format = 'csv') => {
    try {
      const endpoint = activeTab === 'appointments' 
        ? `${API_BASE_URL}/admin/appointments/export`
        : `${API_BASE_URL}/admin/contacts/export`;

      const response = await fetch(`${endpoint}?format=${format}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('فشل في تصدير البيانات');

      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      toast.success(`تم التصدير بنجاح (${format.toUpperCase()})`);
      closeModal('export');
    } catch (error) {
      handleApiError(error, 'فشل في تصدير البيانات');
    }
  };

  // ========================================
  // Utility Functions
  // ========================================

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return new Intl.DateTimeFormat('ar-MA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(date);
    } catch (error) {
      console.error('خطأ في تنسيق التاريخ:', error);
      return '-';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'مساءً' : 'صباحاً';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:${minutes} ${period}`;
  };

  const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('0')) {
      return `212${cleaned.substring(1)}`;
    }
    return cleaned;
  };

  // Modal Management
  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    setQuickMenuOpen(null);
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setQuickMenuOpen(null);
  };

  const resetForm = (formName) => {
    setForms(prev => ({
      ...prev,
      [formName]: getDefaultForm(formName)
    }));
    setErrors({});
    setEditMode(false);
    setSelectedItem(null);
  };

  const getDefaultForm = (formName) => {
    const defaults = {
      appointment: {
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceType: 'legal_consultation',
        preferredDate: '',
        preferredTime: '',
        message: '',
        language: 'ar',
        meetingType: 'in_person',
        location: 'casablanca',
        urgencyLevel: 'normal',
        status: 'pending',
        notes: ''
      },
      contact: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general',
        urgency: 'normal',
        language: 'ar',
        source: 'admin_dashboard',
        status: 'new',
        category: 'inquiry',
        tags: []
      },
      reply: {
        message: '',
        sendCopy: true,
        urgent: false,
        emailSubject: '',
        emailBody: ''
      },
      whatsapp: {
        message: '',
        includeDetails: true
      },
      email: {
        subject: '',
        message: '',
        urgent: false
      }
    };
    return defaults[formName] || {};
  };

  // Filter Management
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      serviceType: 'all',
      meetingType: 'all',
      location: 'all',
      urgency: 'all',
      contactStatus: 'all',
      category: 'all',
      source: 'all',
      dateFrom: '',
      dateTo: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
    setSelectedItems([]);
  };

  const applyFilters = () => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchContacts();
    }
  };

  // Selection Management
  const toggleSelectAll = (checked) => {
    if (checked) {
      const items = activeTab === 'appointments' ? appointments : contacts;
      setSelectedItems(items.map(item => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Edit Functions
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setEditMode(true);
    
    if (activeTab === 'appointments') {
      setForms(prev => ({
        ...prev,
        appointment: {
          clientName: item.clientName || '',
          clientEmail: item.clientEmail || '',
          clientPhone: item.clientPhone || '',
          serviceType: item.serviceType || 'legal_consultation',
          preferredDate: item.preferredDate ? new Date(item.preferredDate).toISOString().split('T')[0] : '',
          preferredTime: item.preferredTime || '',
          message: item.message || '',
          language: item.language || 'ar',
          meetingType: item.meetingType || 'in_person',
          location: item.location || 'casablanca',
          urgencyLevel: item.urgencyLevel || 'normal',
          status: item.status || 'pending',
          notes: item.notes || ''
        }
      }));
      openModal('appointment');
    } else {
      setForms(prev => ({
        ...prev,
        contact: {
          name: item.name || '',
          email: item.email || '',
          phone: item.phone || '',
          subject: item.subject || '',
          message: item.message || '',
          serviceType: item.serviceType || 'general',
          urgency: item.urgency || 'normal',
          language: item.language || 'ar',
          source: item.source || 'admin_dashboard',
          status: item.status || 'new',
          category: item.category || 'inquiry',
          tags: item.tags || []
        }
      }));
      openModal('contact');
    }
  };

  // Quick Communication
  const openWhatsApp = (phone, message = '') => {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    if (!formattedPhone) {
      toast.error('رقم هاتف غير صالح');
      return;
    }
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, '_blank');
  };

  const openEmail = (email, subject = '', body = '') => {
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const openPhoneCall = (phone) => {
    const tel = `tel:${phone}`;
    window.location.href = tel;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('تم النسخ إلى الحافظة'))
      .catch(() => toast.error('فشل في النسخ'));
  };

  // Validation
  const validateAppointmentForm = () => {
    const newErrors = {};
    const form = forms.appointment;

    if (!form.clientName.trim()) newErrors.clientName = 'الاسم مطلوب';
    if (!form.clientEmail.trim()) newErrors.clientEmail = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) {
      newErrors.clientEmail = 'بريد إلكتروني غير صالح';
    }
    if (!form.clientPhone.trim()) newErrors.clientPhone = 'رقم الهاتف مطلوب';
    if (!form.preferredDate) newErrors.preferredDate = 'التاريخ مطلوب';
    if (!form.preferredTime) newErrors.preferredTime = 'الوقت مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors = {};
    const form = forms.contact;

    if (!form.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!form.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }
    if (!form.subject.trim()) newErrors.subject = 'الموضوع مطلوب';
    if (!form.message.trim()) newErrors.message = 'الرسالة مطلوبة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission Handlers
  const handleAppointmentSubmit = async () => {
    if (!validateAppointmentForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    const appointmentData = {
      ...forms.appointment,
      preferredDate: new Date(forms.appointment.preferredDate).toISOString()
    };

    if (editMode && selectedItem) {
      await updateAppointment(selectedItem._id, appointmentData);
    } else {
      await createAppointment(appointmentData);
    }
  };

  const handleContactSubmit = async () => {
    if (!validateContactForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    if (editMode && selectedItem) {
      await updateContact(selectedItem._id, forms.contact);
    } else {
      await createContact(forms.contact);
    }
  };

  const handleReplySubmit = async () => {
    if (!forms.reply.message.trim()) {
      toast.error('يرجى كتابة الرسالة');
      return;
    }

    if (selectedItem) {
      await replyToContact(selectedItem._id, forms.reply);
    }
  };

  // ========================================
  // Helper Functions for Display
  // ========================================

  const getAppointmentStatusInfo = (status) => {
    const statusMap = {
      pending: { 
        color: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        icon: <Clock className="w-4 h-4" />,
        text: 'قيد الانتظار'
      },
      confirmed: { 
        color: 'bg-green-50 text-green-700 border border-green-200',
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'مؤكد'
      },
      completed: { 
        color: 'bg-blue-50 text-blue-700 border border-blue-200',
        icon: <CalendarCheck className="w-4 h-4" />,
        text: 'مكتمل'
      },
      cancelled: { 
        color: 'bg-red-50 text-red-700 border border-red-200',
        icon: <CalendarX className="w-4 h-4" />,
        text: 'ملغي'
      },
      rescheduled: { 
        color: 'bg-purple-50 text-purple-700 border border-purple-200',
        icon: <Calendar className="w-4 h-4" />,
        text: 'مجدول'
      },
      no_show: { 
        color: 'bg-gray-50 text-gray-700 border border-gray-200',
        icon: <UserX className="w-4 h-4" />,
        text: 'لم يحضر'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getAppointmentStatusText = (status) => {
    const textMap = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      rescheduled: 'مجدول',
      no_show: 'لم يحضر'
    };
    return textMap[status] || status;
  };

  const getContactStatusInfo = (status) => {
    const statusMap = {
      new: { 
        color: 'bg-purple-50 text-purple-700 border border-purple-200',
        icon: <Star className="w-4 h-4" />,
        text: 'جديد'
      },
      read: { 
        color: 'bg-blue-50 text-blue-700 border border-blue-200',
        icon: <Eye className="w-4 h-4" />,
        text: 'مقروء'
      },
      in_progress: { 
        color: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        icon: <Activity className="w-4 h-4" />,
        text: 'قيد المعالجة'
      },
      replied: { 
        color: 'bg-green-50 text-green-700 border border-green-200',
        icon: <MailCheck className="w-4 h-4" />,
        text: 'تم الرد'
      },
      closed: { 
        color: 'bg-gray-50 text-gray-700 border border-gray-200',
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'مغلق'
      },
      archived: { 
        color: 'bg-gray-100 text-gray-600 border border-gray-300',
        icon: <Archive className="w-4 h-4" />,
        text: 'مؤرشف'
      }
    };
    return statusMap[status] || statusMap.new;
  };

  const getContactStatusText = (status) => {
    const textMap = {
      new: 'جديد',
      read: 'مقروء',
      in_progress: 'قيد المعالجة',
      replied: 'تم الرد',
      closed: 'مغلق',
      archived: 'مؤرشف'
    };
    return textMap[status] || status;
  };

  const getUrgencyInfo = (urgency) => {
    const urgencyMap = {
      emergency: { 
        color: 'bg-gradient-to-r from-red-600 to-red-800 text-white',
        icon: <AlertOctagon className="w-5 h-5" />,
        text: 'حالة طوارئ',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        pulse: true,
        priority: 1
      },
      urgent: { 
        color: 'bg-gradient-to-r from-orange-500 to-orange-700 text-white',
        icon: <AlertTriangle className="w-5 h-5" />,
        text: 'عاجل',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        pulse: false,
        priority: 2
      },
      high: { 
        color: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
        icon: <Activity className="w-5 h-5" />,
        text: 'مرتفع',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-800',
        pulse: false,
        priority: 3
      },
      normal: { 
        color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
        icon: <Clock className="w-5 h-5" />,
        text: 'عادي',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        pulse: false,
        priority: 4
      },
      low: { 
        color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
        icon: <Calendar className="w-5 h-5" />,
        text: 'منخفض',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-800',
        pulse: false,
        priority: 5
      }
    };
    return urgencyMap[urgency] || urgencyMap.normal;
  };

  const getUrgencyText = (urgency) => {
    const textMap = {
      emergency: 'حالة طوارئ',
      urgent: 'عاجل',
      high: 'مرتفع',
      normal: 'عادي',
      low: 'منخفض'
    };
    return textMap[urgency] || urgency;
  };

  const getServiceTypeLabel = (type) => {
    const labels = {
      'legal_consultation': 'استشارة قانونية',
      'notary_service': 'خدمة كاتب عدل',
      'contract_review': 'مراجعة العقود',
      'court_representation': 'تمثيل في المحكمة',
      'business_setup': 'تأسيس الشركات',
      'family_law': 'قانون الأسرة',
      'real_estate': 'العقارات',
      'criminal_defense': 'الدفاع الجنائي',
      'tax_law': 'القانون الضريبي',
      'labor_law': 'قانون العمل',
      'immigration': 'الهجرة',
      'intellectual_property': 'الملكية الفكرية',
      'other': 'أخرى',
      'general': 'عام'
    };
    return labels[type] || type;
  };

  const getMeetingTypeLabel = (type) => {
    const labels = {
      'in_person': 'حضوري',
      'video_call': 'مكالمة فيديو',
      'phone_call': 'مكالمة هاتفية'
    };
    return labels[type] || type;
  };

  const getMeetingTypeIcon = (type) => {
    const icons = {
      'in_person': <Users className="w-4 h-4" />,
      'video_call': <Video className="w-4 h-4" />,
      'phone_call': <PhoneCall className="w-4 h-4" />
    };
    return icons[type] || <Users className="w-4 h-4" />;
  };

  // ========================================
  // Logout
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/admin/login');
  };

  // ========================================
  // Card Grid Display Component
  // ========================================

  const renderCardGrid = () => {
    const data = activeTab === 'appointments' ? appointments : contacts;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item) => {
          // Determine if cancel button should be hidden for appointments
          const shouldHideCancel = activeTab === 'appointments' && (
            item.status === 'cancelled' || 
            item.status === 'completed' ||
            new Date(item.preferredDate) < new Date() ||
            (new Date(`${item.preferredDate}T${item.preferredTime}`) - new Date() < 2 * 60 * 60 * 1000)
          );

          // Determine if archive button should be hidden for contacts
          const shouldHideArchive = activeTab === 'contacts' && (
            item.status === 'archived' || 
            item.status === 'closed'
          );

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              onClick={() => {
                if (isMobile) {
                  setSelectedItem(item);
                  openModal('details');
                }
              }}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeTab === 'appointments' 
                        ? getAppointmentStatusInfo(item.status).color
                        : getUrgencyInfo(item.urgency).bgColor
                    }`}>
                      {activeTab === 'appointments' 
                        ? getAppointmentStatusInfo(item.status).icon
                        : getUrgencyInfo(item.urgency).icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 truncate">
                        {item.clientName || item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {activeTab === 'appointments' 
                          ? getServiceTypeLabel(item.serviceType)
                          : item.subject}
                      </p>
                    </div>
                  </div>
                  
                  {/* Three-dot menu button */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setQuickMenuOpen(quickMenuOpen === item._id ? null : item._id);
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {/* Quick Contact Menu (like DataTable) */}
                    {quickMenuOpen === item._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          {/* Quick Contact Options */}
                          {((item.clientPhone || item.phone) && !isMobile) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                openModal('whatsapp');
                                setQuickMenuOpen(null);
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
                              setSelectedItem(item);
                              openModal('email');
                              setQuickMenuOpen(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                          >
                            <Mail className="w-4 h-4" />
                            <span>بريد إلكتروني</span>
                          </button>
                          
                          {(item.clientPhone || item.phone) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                openModal('call');
                                setQuickMenuOpen(null);
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
                              toast.success('تم نسخ المرجع');
                              setQuickMenuOpen(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                          >
                            <Copy className="w-4 h-4" />
                            <span>نسخ المرجع</span>
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          
                          {/* Quick Actions */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              openModal('details');
                              setQuickMenuOpen(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                          >
                            <Eye className="w-4 h-4" />
                            <span>عرض التفاصيل</span>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item);
                              setQuickMenuOpen(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                          >
                            <Edit className="w-4 h-4" />
                            <span>تعديل</span>
                          </button>
                          
                          {/* Status-specific actions */}
                          {activeTab === 'appointments' && item.status === 'pending' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateAppointmentStatus(item._id, 'confirmed');
                                setQuickMenuOpen(null);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-green-700 hover:bg-green-50 text-right"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>تأكيد</span>
                            </button>
                          )}
                          
                          {activeTab === 'appointments' && !shouldHideCancel && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateAppointmentStatus(item._id, 'cancelled');
                                setQuickMenuOpen(null);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 text-right"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>إلغاء</span>
                            </button>
                          )}
                          
                          {activeTab === 'contacts' && !shouldHideArchive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateContactStatus(item._id, 'archived');
                                setQuickMenuOpen(null);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-right"
                            >
                              <Archive className="w-4 h-4" />
                              <span>أرشفة</span>
                            </button>
                          )}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              openModal('deleteConfirm');
                              setQuickMenuOpen(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 text-right"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="space-y-3">
                  {/* Date/Time */}
                  {activeTab === 'appointments' && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {formatDate(item.preferredDate)}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-700">
                        {formatTime(item.preferredTime)}
                      </span>
                    </div>
                  )}

                  {/* Contact Info */}
                  {(item.clientEmail || item.email) && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 truncate">
                        {item.clientEmail || item.email}
                      </span>
                    </div>
                  )}

                  {(item.clientPhone || item.phone) && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {item.clientPhone || item.phone}
                      </span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    activeTab === 'appointments'
                      ? getAppointmentStatusInfo(item.status).color
                      : getUrgencyInfo(item.urgency).color
                  }`}>
                    {activeTab === 'appointments'
                      ? getAppointmentStatusInfo(item.status).icon
                      : getUrgencyInfo(item.urgency).icon}
                    <span className={activeTab === 'appointments' ? '' : 'text-white'}>
                      {activeTab === 'appointments'
                        ? getAppointmentStatusInfo(item.status).text
                        : getUrgencyInfo(item.urgency).text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Desktop Only */}
              {!isMobile && (
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        if (activeTab === 'appointments') {
                          openModal('appointment');
                          handleEditItem(item);
                        } else {
                          openModal('contact');
                          handleEditItem(item);
                        }
                      }}
                      className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        openModal('details');
                      }}
                      className="flex-1 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      عرض
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        openModal('deleteConfirm');
                      }}
                      className="flex-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  // ========================================
  // Loading State
  // ========================================

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium text-lg">جاري تحميل لوحة التحكم...</p>
          <p className="text-gray-500 text-sm mt-2">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  // ========================================
  // Render
  // ========================================

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Toaster 
        position="top-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />

      {/* Close quick menu when clicking outside */}
      {quickMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setQuickMenuOpen(null)}
        />
      )}

      {/* Emergency Panel Button */}
      {emergencyContacts.length > 0 && (
        <div className="fixed bottom-4 left-4 z-50">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal('emergency')}
            className="relative bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <AlertOctagon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-red-600 rounded-full text-xs font-bold flex items-center justify-center animate-pulse">
              {emergencyContacts.length}
            </span>
          </motion.button>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <aside className={`fixed right-0 top-0 h-screen bg-white shadow-lg border-l border-gray-200 z-40 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="overflow-hidden"
                >
                  <h1 className="font-bold text-gray-900 text-lg">لوحة التحكم</h1>
                  <p className="text-sm text-gray-500">المكتب القانوني</p>
                </motion.div>
              )}
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'الرئيسية', icon: <LayoutDashboard className="w-5 h-5" /> },
              { id: 'appointments', label: 'المواعيد', icon: <Calendar className="w-5 h-5" />, badge: stats.appointments.pending },
              { id: 'contacts', label: 'جهات الاتصال', icon: <MessageSquare className="w-5 h-5" />, badge: stats.contacts.new },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-l from-blue-50 to-white text-blue-700 border-r-4 border-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {tab.icon}
                </div>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-right font-medium">
                      {tab.label}
                    </span>
                    {tab.badge > 0 && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Emergency Alert in Sidebar */}
          {emergencyContacts.length > 0 && sidebarOpen && (
            <div className="mx-4 my-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <AlertOctagon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-800">حالات طارئة</p>
                  <p className="text-xs text-red-600">{emergencyContacts.length} حالة</p>
                </div>
              </div>
              <button
                onClick={() => openModal('emergency')}
                className="w-full text-sm font-medium text-red-700 hover:text-red-800 hover:bg-red-100 py-2 rounded-lg transition-colors"
              >
                عرض الحالات →
              </button>
            </div>
          )}

          {/* User Profile */}
          <div className="absolute bottom-0 right-0 left-0 p-6 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'أ'}
                </span>
              </div>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 overflow-hidden"
                >
                  <p className="font-semibold text-gray-900 truncate">{user?.name || user?.email || 'المدير'}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email || 'admin@cabinet.ma'}</p>
                  <p className="text-xs text-gray-400 mt-1">مدير النظام</p>
                </motion.div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-72' : 'mr-20'}`}>
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'dashboard' && 'لوحة التحكم الرئيسية'}
                    {activeTab === 'appointments' && 'إدارة المواعيد'}
                    {activeTab === 'contacts' && 'إدارة جهات الاتصال'}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {activeTab === 'dashboard' && 'نظرة عامة على النظام'}
                    {activeTab === 'appointments' && `${stats.appointments.total} موعد • ${stats.appointments.today} اليوم`}
                    {activeTab === 'contacts' && `${stats.contacts.total} اتصال • ${stats.contacts.new} جديد`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Emergency Alert */}
                {emergencyContacts.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                    <div className="relative">
                      <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-800">{emergencyContacts.length} حالة طارئة</p>
                      <button
                        onClick={() => openModal('emergency')}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        عرض →
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="hidden xl:flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">مواعيد اليوم</p>
                      <p className="text-sm font-semibold text-gray-900">{stats.appointments.today}</p>
                    </div>
                  </div>
                  {stats.contacts.emergency > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                        <AlertOctagon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">حالات طوارئ</p>
                        <p className="text-sm font-semibold text-gray-900">{stats.contacts.emergency}</p>
                      </div>
                    </div>
                  )}
                  {stats.contacts.urgent > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">عاجل</p>
                        <p className="text-sm font-semibold text-gray-900">{stats.contacts.urgent}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Search - Hidden on dashboard */}
                  {activeTab !== 'dashboard' && (
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ابحث..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm shadow-sm"
                      />
                    </div>
                  )}
                  
                  {/* Refresh */}
                  <motion.button
                    onClick={() => {
                      fetchDashboardStats();
                      if (activeTab === 'appointments') fetchAppointments();
                      if (activeTab === 'contacts') fetchContacts();
                      toast.success('تم تحديث البيانات');
                    }}
                    whileHover={{ rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="تحديث"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.button>
                  
                  {/* Add New - Hidden on dashboard */}
                  {activeTab !== 'dashboard' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (activeTab === 'appointments') {
                          resetForm('appointment');
                          openModal('appointment');
                        } else {
                          resetForm('contact');
                          openModal('contact');
                        }
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="font-medium">جديد</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">مرحباً بك، {user?.name || 'المدير'}</h1>
                      <p className="text-blue-100 opacity-90">
                        {new Date().toLocaleDateString('ar-MA', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-sm">إجمالي المواعيد</p>
                          <p className="text-2xl font-bold">{stats.appointments.total}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-sm">الاتصالات الجديدة</p>
                          <p className="text-2xl font-bold">{stats.contacts.new}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Briefcase className="w-16 h-16" />
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <StatsCards stats={stats} />

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Appointments */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">آخر المواعيد</h3>
                        <button
                          onClick={() => setActiveTab('appointments')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          عرض الكل →
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {appointments.slice(0, 5).map((appointment) => (
                        <div key={appointment._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              appointment.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                              appointment.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                              'bg-gray-50 text-gray-600'
                            }`}>
                              {appointment.status === 'confirmed' ? <CheckCircle className="w-5 h-5" /> :
                               appointment.status === 'pending' ? <Clock className="w-5 h-5" /> :
                               <Calendar className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.clientName}</p>
                              <p className="text-sm text-gray-500">{getServiceTypeLabel(appointment.serviceType)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(appointment.preferredDate)}
                            </p>
                            <p className="text-xs text-gray-500">{formatTime(appointment.preferredTime)}</p>
                          </div>
                        </div>
                      ))}
                      {appointments.length === 0 && (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">لا توجد مواعيد حالياً</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Contacts */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">آخر الاتصالات</h3>
                        <button
                          onClick={() => setActiveTab('contacts')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          عرض الكل →
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              contact.urgency === 'emergency' ? 'bg-red-50 text-red-600' :
                              contact.urgency === 'urgent' ? 'bg-orange-50 text-orange-600' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              {contact.urgency === 'emergency' ? <AlertOctagon className="w-5 h-5" /> :
                               contact.urgency === 'urgent' ? <AlertTriangle className="w-5 h-5" /> :
                               <MessageSquare className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{contact.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-[150px]">{contact.subject}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{formatDate(contact.createdAt)}</p>
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              getContactStatusInfo(contact.status).color
                            }`}>
                              {getContactStatusInfo(contact.status).icon}
                              <span>{getContactStatusInfo(contact.status).text}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {contacts.length === 0 && (
                        <div className="text-center py-8">
                          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">لا توجد اتصالات حالياً</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <QuickActions 
                  activeTab={activeTab}
                  openModal={openModal}
                  resetForm={resetForm}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">إجمالي المواعيد</p>
                        <p className="text-3xl font-bold mt-2">{stats.appointments.total}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100 text-sm">قيد الانتظار</p>
                        <p className="text-3xl font-bold mt-2">{stats.appointments.pending}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">مؤكد</p>
                        <p className="text-3xl font-bold mt-2">{stats.appointments.confirmed}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm">ملغي</p>
                        <p className="text-3xl font-bold mt-2">{stats.appointments.cancelled}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <CalendarX className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* View Toggle - Hidden on mobile */}
                      {!isMobile && (
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                          <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                              viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <List className="w-4 h-4 inline-block ml-1" />
                            جدول
                          </button>
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                              viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <Grid className="w-4 h-4 inline-block ml-1" />
                            شبكة
                          </button>
                        </div>
                      )}
                      
                      {/* Advanced Filters Button - Hidden on mobile */}
                      {!isMobile && (
                        <button
                          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
                        >
                          <Filter className="w-4 h-4" />
                          فلاتر متقدمة
                          {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                      
                      {/* Reset Filters */}
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
                      >
                        <FilterX className="w-4 h-4" />
                        إعادة تعيين
                      </button>
                      
                      {/* Hide Cancelled Toggle */}
                      <button
                        onClick={() => setShowCancelled(!showCancelled)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          !showCancelled ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {!showCancelled ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <EyeOpen className="w-4 h-4" />
                        )}
                        {showCancelled ? 'إخفاء الملغية' : 'إظهار الملغية'}
                      </button>
                    </div>
                    
                    {/* Export Button - Hidden on mobile */}
                    {!isMobile && (
                      <button
                        onClick={() => openModal('export')}
                        className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تصدير
                      </button>
                    )}
                  </div>

                  {/* Advanced Filters - Hidden on mobile */}
                  {showAdvancedFilters && !isMobile && (
                    <AdvancedFilters 
                      activeTab={activeTab}
                      filters={filters}
                      updateFilter={updateFilter}
                      applyFilters={applyFilters}
                    />
                  )}
                </div>

                {/* Bulk Actions Bar - Hidden on mobile */}
                {selectedItems.length > 0 && !isMobile && (
                  <BulkActionsBar 
                    activeTab={activeTab}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    bulkAppointmentActions={bulkAppointmentActions}
                    bulkContactActions={bulkContactActions}
                  />
                )}

                {/* Data Display */}
                {viewMode === 'table' && !isMobile ? (
                  <DataTable 
                    activeTab={activeTab}
                    data={activeTab === 'appointments' ? appointments : contacts}
                    loading={loading}
                    selectedItems={selectedItems}
                    toggleSelectAll={toggleSelectAll}
                    toggleSelectItem={toggleSelectItem}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    getAppointmentStatusInfo={getAppointmentStatusInfo}
                    getContactStatusInfo={getContactStatusInfo}
                    getUrgencyInfo={getUrgencyInfo}
                    getServiceTypeLabel={getServiceTypeLabel}
                    getMeetingTypeLabel={getMeetingTypeLabel}
                    getMeetingTypeIcon={getMeetingTypeIcon}
                    handleEditItem={handleEditItem}
                    setSelectedItem={setSelectedItem}
                    openModal={openModal}
                    updateAppointmentStatus={updateAppointmentStatus}
                    updateContactStatus={updateContactStatus}
                    updateContactUrgency={updateContactUrgency}
                    copyToClipboard={copyToClipboard}
                    openWhatsApp={openWhatsApp}
                    openEmail={openEmail}
                    openPhoneCall={openPhoneCall}
                    forms={forms}
                    setForms={setForms}
                    selectedItem={selectedItem}
                  />
                ) : (
                  renderCardGrid()
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-8">
                {/* Stats Cards with Urgency Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm">حالات طوارئ</p>
                        <p className="text-3xl font-bold mt-2">{stats.contacts.emergency}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <AlertOctagon className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">عاجل</p>
                        <p className="text-3xl font-bold mt-2">{stats.contacts.urgent}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100 text-sm">مرتفع</p>
                        <p className="text-3xl font-bold mt-2">{stats.contacts.high || 0}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Activity className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">عادي</p>
                        <p className="text-3xl font-bold mt-2">{stats.contacts.normal || 0}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Alert Bar */}
                {emergencyContacts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                          <AlertOctagon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-800 text-lg">⚠️ تنبيه! حالات تحتاج إلى اهتمام فوري</h3>
                          <p className="text-red-600">يوجد {emergencyContacts.length} اتصال يحتاج إلى معالجة عاجلة</p>
                        </div>
                      </div>
                      <button
                        onClick={() => openModal('emergency')}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-700 hover:to-red-900 shadow-md font-medium"
                      >
                        عرض الحالات الطارئة
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Actions Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* View Toggle - Hidden on mobile */}
                      {!isMobile && (
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                          <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                              viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <List className="w-4 h-4 inline-block ml-1" />
                            جدول
                          </button>
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                              viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <Grid className="w-4 h-4 inline-block ml-1" />
                            شبكة
                          </button>
                        </div>
                      )}
                      
                      {/* Advanced Filters Button - Hidden on mobile */}
                      {!isMobile && (
                        <button
                          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
                        >
                          <Filter className="w-4 h-4" />
                          فلاتر متقدمة
                          {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                      
                      {/* Reset Filters */}
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
                      >
                        <FilterX className="w-4 h-4" />
                        إعادة تعيين
                      </button>
                      
                      {/* Hide Archived Toggle */}
                      <button
                        onClick={() => setShowArchived(!showArchived)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          !showArchived ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {!showArchived ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <EyeOpen className="w-4 h-4" />
                        )}
                        {showArchived ? 'إخفاء المؤرشفة' : 'إظهار المؤرشفة'}
                      </button>
                    </div>
                    
                    {/* Export Button - Hidden on mobile */}
                    {!isMobile && (
                      <button
                        onClick={() => openModal('export')}
                        className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تصدير
                      </button>
                    )}
                  </div>

                  {/* Advanced Filters - Hidden on mobile */}
                  {showAdvancedFilters && !isMobile && (
                    <AdvancedFilters 
                      activeTab={activeTab}
                      filters={filters}
                      updateFilter={updateFilter}
                      applyFilters={applyFilters}
                    />
                  )}
                </div>

                {/* Bulk Actions Bar - Hidden on mobile */}
                {selectedItems.length > 0 && !isMobile && (
                  <BulkActionsBar 
                    activeTab={activeTab}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    bulkAppointmentActions={bulkAppointmentActions}
                    bulkContactActions={bulkContactActions}
                  />
                )}

                {/* Data Display */}
                {viewMode === 'table' && !isMobile ? (
                  <DataTable 
                    activeTab={activeTab}
                    data={activeTab === 'appointments' ? appointments : contacts}
                    loading={loading}
                    selectedItems={selectedItems}
                    toggleSelectAll={toggleSelectAll}
                    toggleSelectItem={toggleSelectItem}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    getAppointmentStatusInfo={getAppointmentStatusInfo}
                    getContactStatusInfo={getContactStatusInfo}
                    getUrgencyInfo={getUrgencyInfo}
                    getServiceTypeLabel={getServiceTypeLabel}
                    getMeetingTypeLabel={getMeetingTypeLabel}
                    getMeetingTypeIcon={getMeetingTypeIcon}
                    handleEditItem={handleEditItem}
                    setSelectedItem={setSelectedItem}
                    openModal={openModal}
                    updateAppointmentStatus={updateAppointmentStatus}
                    updateContactStatus={updateContactStatus}
                    updateContactUrgency={updateContactUrgency}
                    copyToClipboard={copyToClipboard}
                    openWhatsApp={openWhatsApp}
                    openEmail={openEmail}
                    openPhoneCall={openPhoneCall}
                    forms={forms}
                    setForms={setForms}
                    selectedItem={selectedItem}
                  />
                ) : (
                  renderCardGrid()
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-gray-900">
                {activeTab === 'dashboard' && 'لوحة التحكم'}
                {activeTab === 'appointments' && 'المواعيد'}
                {activeTab === 'contacts' && 'جهات الاتصال'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {emergencyContacts.length > 0 && (
                <button
                  onClick={() => openModal('emergency')}
                  className="relative p-2 text-red-600"
                >
                  <AlertOctagon className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {emergencyContacts.length}
                  </span>
                </button>
              )}
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">لوحة التحكم</h2>
                    <p className="text-xs text-gray-500">المكتب القانوني</p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-1">
                {[
                  { id: 'dashboard', label: 'الرئيسية', icon: <LayoutDashboard className="w-5 h-5" /> },
                  { id: 'appointments', label: 'المواعيد', icon: <Calendar className="w-5 h-5" />, badge: stats.appointments.pending },
                  { id: 'contacts', label: 'جهات الاتصال', icon: <MessageSquare className="w-5 h-5" />, badge: stats.contacts.new },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {tab.icon}
                    </div>
                    <span className="flex-1 text-right font-medium">{tab.label}</span>
                    {tab.badge > 0 && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Actions in Mobile Menu */}
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      resetForm('appointment');
                      openModal('appointment');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>موعد جديد</span>
                  </button>
                  <button
                    onClick={() => {
                      resetForm('contact');
                      openModal('contact');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 bg-purple-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>اتصال جديد</span>
                  </button>
                </div>
              </div>

              {/* User Profile in Mobile Menu */}
              <div className="absolute bottom-0 right-0 left-0 p-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'أ'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 truncate">{user?.name || 'المدير'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@cabinet.ma'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Content */}
        <main className="p-4">
          <div className="space-y-6">
            {activeTab === 'dashboard' && (
              <>
                {/* Mobile Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                    <p className="text-xs text-gray-500">المواعيد</p>
                    <p className="text-xl font-bold text-gray-900">{stats.appointments.total}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                    <p className="text-xs text-gray-500">جهات الاتصال</p>
                    <p className="text-xl font-bold text-gray-900">{stats.contacts.total}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                    <p className="text-xs text-gray-500">قيد الانتظار</p>
                    <p className="text-xl font-bold text-gray-900">{stats.appointments.pending}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                    <p className="text-xs text-gray-500">جديد</p>
                    <p className="text-xl font-bold text-gray-900">{stats.contacts.new}</p>
                  </div>
                </div>

                {/* Quick Actions Mobile */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      resetForm('appointment');
                      openModal('appointment');
                    }}
                    className="w-full p-4 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>موعد جديد</span>
                  </button>
                  <button
                    onClick={() => {
                      resetForm('contact');
                      openModal('contact');
                    }}
                    className="w-full p-4 bg-purple-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>اتصال جديد</span>
                  </button>
                </div>

                {/* Recent Items - Mobile */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">آخر المواعيد</h3>
                  {appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment._id} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{appointment.clientName}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs ${getAppointmentStatusInfo(appointment.status).color}`}>
                          {getAppointmentStatusInfo(appointment.status).text}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{formatDate(appointment.preferredDate)}</p>
                      <p className="text-sm text-gray-500">{formatTime(appointment.preferredTime)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث في المواعيد..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                {/* Mobile Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <p className="text-xs text-blue-600">إجمالي</p>
                    <p className="text-lg font-bold text-gray-900">{stats.appointments.total}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-xl">
                    <p className="text-xs text-yellow-600">قيد الانتظار</p>
                    <p className="text-lg font-bold text-gray-900">{stats.appointments.pending}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl">
                    <p className="text-xs text-green-600">مؤكد</p>
                    <p className="text-lg font-bold text-gray-900">{stats.appointments.confirmed}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl">
                    <p className="text-xs text-red-600">ملغي</p>
                    <p className="text-lg font-bold text-gray-900">{stats.appointments.cancelled}</p>
                  </div>
                </div>

                {/* Mobile Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => updateFilter('status', 'all')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.status === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => updateFilter('status', 'pending')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.status === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    قيد الانتظار
                  </button>
                  <button
                    onClick={() => updateFilter('status', 'confirmed')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.status === 'confirmed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    مؤكد
                  </button>
                  <button
                    onClick={() => updateFilter('status', 'cancelled')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.status === 'cancelled' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    ملغي
                  </button>
                </div>

                {/* Add New Button - Mobile */}
                <button
                  onClick={() => {
                    resetForm('appointment');
                    openModal('appointment');
                  }}
                  className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">إضافة موعد جديد</span>
                </button>

                {/* Mobile Grid View (Forced for mobile) */}
                {renderCardGrid()}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {/* Mobile Emergency Alert */}
                {emergencyContacts.length > 0 && (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
                      <div>
                        <p className="text-sm font-bold text-red-800">{emergencyContacts.length} حالة طارئة</p>
                        <button
                          onClick={() => openModal('emergency')}
                          className="text-xs text-red-600"
                        >
                          عرض →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث في جهات الاتصال..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                {/* Mobile Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <p className="text-xs text-red-600">طوارئ</p>
                    <p className="text-lg font-bold text-gray-900">{stats.contacts.emergency}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <p className="text-xs text-orange-600">عاجل</p>
                    <p className="text-lg font-bold text-gray-900">{stats.contacts.urgent}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <p className="text-xs text-purple-600">جديد</p>
                    <p className="text-lg font-bold text-gray-900">{stats.contacts.new}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <p className="text-xs text-blue-600">إجمالي</p>
                    <p className="text-lg font-bold text-gray-900">{stats.contacts.total}</p>
                  </div>
                </div>

                {/* Mobile Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => updateFilter('urgency', 'all')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.urgency === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => updateFilter('urgency', 'emergency')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.urgency === 'emergency' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    طوارئ
                  </button>
                  <button
                    onClick={() => updateFilter('urgency', 'urgent')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.urgency === 'urgent' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    عاجل
                  </button>
                  <button
                    onClick={() => updateFilter('urgency', 'normal')}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap ${filters.urgency === 'normal' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    عادي
                  </button>
                </div>

                {/* Add New Button - Mobile */}
                <button
                  onClick={() => {
                    resetForm('contact');
                    openModal('contact');
                  }}
                  className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">إضافة اتصال جديد</span>
                </button>

                {/* Mobile Grid View (Forced for mobile) */}
                {renderCardGrid()}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {/* Appointment Modal */}
      {modals.appointment && (
        <AppointmentModal 
          isOpen={modals.appointment}
          onClose={() => {
            closeModal('appointment');
            resetForm('appointment');
          }}
          form={forms.appointment}
          setForm={(data) => setForms(prev => ({ ...prev, appointment: data }))}
          errors={errors}
          editMode={editMode}
          isSubmitting={isSubmitting}
          onSubmit={handleAppointmentSubmit}
          validateForm={validateAppointmentForm}
        />
      )}

      {/* Contact Modal */}
      {modals.contact && (
        <ContactModal 
          isOpen={modals.contact}
          onClose={() => {
            closeModal('contact');
            resetForm('contact');
          }}
          form={forms.contact}
          setForm={(data) => setForms(prev => ({ ...prev, contact: data }))}
          errors={errors}
          editMode={editMode}
          isSubmitting={isSubmitting}
          onSubmit={handleContactSubmit}
          validateForm={validateContactForm}
        />
      )}

      {/* Details Modal */}
      {modals.details && selectedItem && (
        <DetailsModal 
          isOpen={modals.details}
          onClose={() => closeModal('details')}
          item={selectedItem}
          activeTab={activeTab}
          formatDate={formatDate}
          formatTime={formatTime}
          getAppointmentStatusInfo={getAppointmentStatusInfo}
          getContactStatusInfo={getContactStatusInfo}
          getUrgencyInfo={getUrgencyInfo}
          getServiceTypeLabel={getServiceTypeLabel}
          getMeetingTypeLabel={getMeetingTypeLabel}
          openWhatsApp={openWhatsApp}
          openEmail={openEmail}
          openPhoneCall={openPhoneCall}
          copyToClipboard={copyToClipboard}
          openModal={openModal}
          setForms={setForms}
        />
      )}

      {/* Reply Modal */}
      {modals.reply && selectedItem && (
        <ReplyModal 
          isOpen={modals.reply}
          onClose={() => {
            closeModal('reply');
            resetForm('reply');
          }}
          form={forms.reply}
          setForm={(data) => setForms(prev => ({ ...prev, reply: data }))}
          selectedItem={selectedItem}
          onSubmit={handleReplySubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {modals.deleteConfirm && selectedItem && (
        <DeleteConfirmModal 
          isOpen={modals.deleteConfirm}
          onClose={() => closeModal('deleteConfirm')}
          item={selectedItem}
          activeTab={activeTab}
          formatDate={formatDate}
          onConfirm={() => {
            if (activeTab === 'appointments') {
              deleteAppointment(selectedItem._id);
            } else {
              deleteContact(selectedItem._id);
            }
          }}
        />
      )}

      {/* Export Modal */}
      {modals.export && (
        <ExportModal 
          isOpen={modals.export}
          onClose={() => closeModal('export')}
          activeTab={activeTab}
          onExport={exportData}
        />
      )}

      {/* Emergency Panel Modal */}
      {modals.emergency && (
        <EmergencyPanel 
          isOpen={modals.emergency}
          onClose={() => closeModal('emergency')}
          emergencyContacts={emergencyContacts}
          formatDate={formatDate}
          getUrgencyInfo={getUrgencyInfo}
          setSelectedItem={setSelectedItem}
          openModal={openModal}
          updateContactUrgency={updateContactUrgency}
        />
      )}

      {/* WhatsApp Modal */}
      {modals.whatsapp && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">إرسال رسالة واتساب</h3>
                <button
                  onClick={() => closeModal('whatsapp')}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <textarea
                value={forms.whatsapp.message}
                onChange={(e) => setForms(prev => ({ 
                  ...prev, 
                  whatsapp: { ...prev.whatsapp, message: e.target.value }
                }))}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="اكتب رسالة واتساب..."
              />
              
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeDetails"
                  checked={forms.whatsapp.includeDetails}
                  onChange={(e) => setForms(prev => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, includeDetails: e.target.checked }
                  }))}
                  className="rounded border-gray-300"
                />
                <label htmlFor="includeDetails" className="text-sm text-gray-700">
                  إضافة معلومات التحية
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  const phone = selectedItem.clientPhone || selectedItem.phone;
                  let message = forms.whatsapp.message;
                  
                  if (forms.whatsapp.includeDetails) {
                    const name = selectedItem.clientName || selectedItem.name;
                    message = `مرحباً ${name},\n\n${message}\n\nمع التحية،\nفريق المكتب القانوني`;
                  }
                  
                  openWhatsApp(phone, message);
                  closeModal('whatsapp');
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                إرسال
              </button>
              <button
                onClick={() => closeModal('whatsapp')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Email Modal */}
      {modals.email && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">إرسال بريد إلكتروني</h3>
                <button
                  onClick={() => closeModal('email')}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <input
                type="text"
                value={forms.email.subject}
                onChange={(e) => setForms(prev => ({
                  ...prev,
                  email: { ...prev.email, subject: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="موضوع البريد الإلكتروني"
              />
              
              <textarea
                value={forms.email.message}
                onChange={(e) => setForms(prev => ({
                  ...prev,
                  email: { ...prev.email, message: e.target.value }
                }))}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="اكتب رسالة البريد الإلكتروني..."
              />
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  const email = selectedItem.clientEmail || selectedItem.email;
                  openEmail(email, forms.email.subject, forms.email.message);
                  closeModal('email');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                إرسال
              </button>
              <button
                onClick={() => closeModal('email')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Call Modal */}
      {modals.call && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">الاتصال الهاتفي</h3>
                <button
                  onClick={() => closeModal('call')}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <PhoneCall className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-900 font-medium mb-2">
                {selectedItem.clientName || selectedItem.name}
              </p>
              <p className="text-gray-600 mb-6">
                {selectedItem.clientPhone || selectedItem.phone}
              </p>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-center gap-3">
              <button
                onClick={() => {
                  const phone = selectedItem.clientPhone || selectedItem.phone;
                  openPhoneCall(phone);
                  closeModal('call');
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                الاتصال الآن
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;