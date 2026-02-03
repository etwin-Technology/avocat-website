import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  MoreVertical,
  Shield,
  FileText,
  Home,
  Award,
  Star,
  Plus,
  X
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { format, parseISO, isValid, parse, isDate } from 'date-fns';
import { ar, fr, enUS } from 'date-fns/locale';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalContacts: 0,
    pendingAppointments: 0,
    newMessages: 0,
    todayAppointments: 0,
    upcomingAppointments: 0
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState([]);
  
  const isRTL = language === 'ar';

  // API Base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Check authentication on mount
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
        console.error('Error parsing user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
        return false;
      }
    };

    if (checkAuth()) {
      fetchData();
    }
  }, [navigate]);

  // Fetch data function
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/admin/login');
        return;
      }

      console.log('Fetching dashboard data...');
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const responses = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`, { headers }),
        fetch(`${API_BASE_URL}/admin/appointments?limit=50`, { headers }),
        fetch(`${API_BASE_URL}/admin/contacts?limit=50`, { headers })
      ]);

      const [statsRes, appointmentsRes, contactsRes] = responses;
      
      const statsText = await statsRes.text();
      const appointmentsText = await appointmentsRes.text();
      const contactsText = await contactsRes.text();

      let statsData, appointmentsData, contactsData;

      // Parse stats
      try {
        statsData = JSON.parse(statsText);
      } catch (error) {
        console.error('Error parsing stats:', error);
        throw new Error('Invalid JSON response from stats endpoint');
      }

      // Parse appointments
      try {
        appointmentsData = JSON.parse(appointmentsText);
      } catch (error) {
        console.error('Error parsing appointments:', error);
        throw new Error('Invalid JSON response from appointments endpoint');
      }

      // Parse contacts
      try {
        contactsData = JSON.parse(contactsText);
      } catch (error) {
        console.error('Error parsing contacts:', error);
        throw new Error('Invalid JSON response from contacts endpoint');
      }

      // Check for API errors
      if (statsData.status === 'error') {
        throw new Error(statsData.message || 'Failed to fetch stats');
      }
      
      if (appointmentsData.status === 'error') {
        throw new Error(appointmentsData.message || 'Failed to fetch appointments');
      }
      
      if (contactsData.status === 'error') {
        throw new Error(contactsData.message || 'Failed to fetch contacts');
      }

      // Set data
      setStats({
        totalAppointments: statsData.data?.appointments?.total || 0,
        totalContacts: statsData.data?.contacts?.total || 0,
        pendingAppointments: statsData.data?.appointments?.pending || 0,
        newMessages: statsData.data?.contacts?.new || 0,
        todayAppointments: statsData.data?.appointments?.today || 0,
        upcomingAppointments: statsData.data?.upcomingAppointments || 0
      });

      // Set appointments and contacts
      setAppointments(appointmentsData.data?.appointments || appointmentsData.data || []);
      setContacts(contactsData.data?.contacts || contactsData.data || []);

      toast.success('Data loaded successfully');

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      if (error.message.includes('Invalid JSON response')) {
        toast.error('Backend error - check if admin routes are defined');
      } else if (error.message.includes('401') || error.message.includes('403')) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      } else {
        toast.error(error.message || 'Failed to load dashboard data');
      }
      
      // Load dummy data for development
      loadDummyData();
    } finally {
      setLoading(false);
    }
  };

  // Load dummy data for development
  const loadDummyData = () => {
    console.log('Loading dummy data for development');
    
    // Dummy stats
    setStats({
      totalAppointments: 128,
      totalContacts: 56,
      pendingAppointments: 12,
      newMessages: 5,
      todayAppointments: 8,
      upcomingAppointments: 25
    });

    // Dummy appointments with valid dates
    const dummyAppointments = [
      {
        _id: '1',
        referenceNumber: 'APP-2024-001',
        clientName: 'John Doe',
        clientEmail: 'john@example.com',
        serviceType: 'Legal Consultation',
        preferredDate: '2024-01-15T10:00:00.000Z',
        preferredTime: '10:00 AM',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        referenceNumber: 'APP-2024-002',
        clientName: 'Jane Smith',
        clientEmail: 'jane@example.com',
        serviceType: 'Contract Review',
        preferredDate: '2024-01-16T14:00:00.000Z',
        preferredTime: '2:00 PM',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        referenceNumber: 'APP-2024-003',
        clientName: 'Robert Johnson',
        clientEmail: 'robert@example.com',
        serviceType: 'Notary Service',
        preferredDate: '2024-01-17T11:30:00.000Z',
        preferredTime: '11:30 AM',
        status: 'completed',
        createdAt: new Date().toISOString()
      },
      {
        _id: '4',
        referenceNumber: 'APP-2024-004',
        clientName: 'Sarah Williams',
        clientEmail: 'sarah@example.com',
        serviceType: 'Family Law',
        preferredDate: '2024-01-18T09:00:00.000Z',
        preferredTime: '9:00 AM',
        status: 'cancelled',
        createdAt: new Date().toISOString()
      }
    ];

    // Dummy contacts with valid dates
    const dummyContacts = [
      {
        _id: '1',
        referenceNumber: 'CONT-2024-001',
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '+212-612-345678',
        subject: 'Legal Advice Needed',
        message: 'I need legal advice regarding a property dispute that has been ongoing for several months...',
        status: 'new',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        referenceNumber: 'CONT-2024-002',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        phone: '+212-698-765432',
        subject: 'Contract Review Request',
        message: 'Could you please review my employment contract? I have some concerns about the terms...',
        status: 'read',
        createdAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
      },
      {
        _id: '3',
        referenceNumber: 'CONT-2024-003',
        name: 'Ahmed Benali',
        email: 'ahmed@example.com',
        phone: '+212-600-112233',
        subject: 'Real Estate Transaction',
        message: 'I am interested in your real estate legal services for a property purchase in Casablanca...',
        status: 'replied',
        createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      }
    ];

    setAppointments(dummyAppointments);
    setContacts(dummyContacts);
    
    toast('⚠️ Using demo data. Please set up backend routes.', {
      icon: '⚠️',
      duration: 4000
    });
  };

  // SAFE DATE FORMATTING FUNCTION - FIXED
  const formatDate = (dateString, formatType = 'date') => {
    if (!dateString) return '-';
    
    try {
      let date;
      
      // Try parsing as ISO string first
      if (typeof dateString === 'string') {
        // Check if it's already a valid date
        if (!isNaN(Date.parse(dateString))) {
          date = new Date(dateString);
        } else {
          // Try to parse with date-fns
          date = parseISO(dateString);
        }
      } else if (dateString instanceof Date) {
        date = dateString;
      } else {
        return '-';
      }
      
      // Check if date is valid
      if (!isValid(date) || isNaN(date.getTime())) {
        return '-';
      }
      
      const locales = { ar, fr, en: enUS };
      const locale = locales[language] || enUS;
      
      if (formatType === 'date') {
        return format(date, 'PP', { locale });
      } else if (formatType === 'datetime') {
        return format(date, 'PPp', { locale });
      } else {
        return format(date, 'PP', { locale });
      }
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return '-';
    }
  };

  // Format date for table display (date only)
  const formatTableDate = (dateString) => {
    return formatDate(dateString, 'date');
  };

  // Format date for detailed display
  const formatDetailedDate = (dateString) => {
    return formatDate(dateString, 'datetime');
  };

  // Status colors
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  // Update status function
  const updateStatus = async (type, id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const endpoint = type === 'appointment' 
        ? `${API_BASE_URL}/admin/appointments/${id}/status`
        : `${API_BASE_URL}/admin/contacts/${id}/status`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        toast.success('Status updated successfully');
        fetchData(); // Refresh data
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  // Delete item
  const deleteItem = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const endpoint = type === 'appointment' 
        ? `${API_BASE_URL}/admin/appointments/${id}`
        : `${API_BASE_URL}/admin/contacts/${id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        toast.success('Deleted successfully');
        fetchData(); // Refresh data
      } else {
        throw new Error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error(error.message || 'Failed to delete');
    }
  };

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      (appointment.clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (appointment.clientEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (appointment.referenceNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (appointment.serviceType?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    return (
      (contact.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (contact.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (contact.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (contact.referenceNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl border-r border-gray-200 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Legal Pro Admin</h1>
              <p className="text-sm text-gray-500">Management Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === 'appointments'
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
              {stats.pendingAppointments > 0 && (
                <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.pendingAppointments}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === 'contacts'
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
              {stats.newMessages > 0 && (
                <span className="ml-auto bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.newMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* User profile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{user?.name || user?.email || 'Admin'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'appointments' && 'Appointments Management'}
                {activeTab === 'contacts' && 'Contact Messages'}
                {activeTab === 'analytics' && 'Analytics & Reports'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' && `Welcome back, ${user?.name || 'Admin'}`}
                {activeTab === 'appointments' && 'Manage all client appointments'}
                {activeTab === 'contacts' && 'View and respond to client inquiries'}
                {activeTab === 'analytics' && 'Performance insights and statistics'}
                {activeTab === 'settings' && 'Configure your admin settings'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Stats */}
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Appointments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-green-600">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Need your attention</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">New Messages</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.newMessages}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Awaiting response</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Today's Appointments</p>
                    <p className="text-3xl font-bold text-green-600">{stats.todayAppointments}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Scheduled for today</p>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Appointments */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.slice(0, 5).map((appointment) => (
                        <tr key={appointment._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{appointment.clientName}</div>
                            <div className="text-sm text-gray-500">{appointment.serviceType}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {formatTableDate(appointment.preferredDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status || 'pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Recent Messages</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {contacts.slice(0, 5).map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 truncate max-w-xs">{contact.subject}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                              {contact.status || 'new'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Appointments Table */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">All Appointments ({filteredAppointments.length})</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toast.success('Export feature coming soon!')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setDateRange('all');
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAppointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono text-sm font-medium text-blue-600">
                          {appointment.referenceNumber || `APP-${appointment._id?.slice(-8) || '000001'}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{appointment.clientName}</div>
                            <div className="text-sm text-gray-500">{appointment.clientEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {appointment.serviceType || 'Legal Consultation'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatTableDate(appointment.preferredDate)}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.preferredTime || '10:00 AM'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus('appointment', appointment._id, 'confirmed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus('appointment', appointment._id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem('appointment', appointment._id)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredAppointments.length > itemsPerPage && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredAppointments.length)}</span> of{' '}
                  <span className="font-medium">{filteredAppointments.length}</span> appointments
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">{currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contacts Table */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Contact Messages ({filteredContacts.length})</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toast.success('Export feature coming soon!')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500">{contact.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{contact.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatTableDate(contact.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status || 'new'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus('contact', contact._id, 'read')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as Read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus('contact', contact._id, 'replied')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as Replied"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem('contact', contact._id)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Appointments Overview</h3>
              <div className="space-y-4">
                {Object.entries({
                  'Legal Consultation': 45,
                  'Contract Review': 32,
                  'Notary Service': 28,
                  'Family Law': 19,
                  'Real Estate': 15
                }).map(([service, count]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="text-gray-700">{service}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(count / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Statistics</h3>
              <div className="h-64 flex items-end gap-2">
                {[30, 45, 60, 75, 90, 85, 70, 65, 80, 95, 85, 75].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                      style={{ height: `${value}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => toast.success('Settings saved!')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;