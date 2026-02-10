import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  ChevronRight, CheckCircle, Shield, Sparkles, Star, 
  MapPin, Award, Briefcase, PhoneCall, ArrowRight,
  Building, FileText, BookOpen, GraduationCap, Scale,
  Loader2, ExternalLink, AlertCircle, Wifi, WifiOff,
  Menu, X
} from 'lucide-react';

// API Configuration - USE PROXY PATH
const API_BASE_URL = '/api';

const Appointment = ({ language = 'fr' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('unknown');
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeSection, setActiveSection] = useState('form');
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceType: 'legal_consultation',
    preferredDate: '',
    preferredTime: '',
    message: '',
    language: 'fr',
    meetingType: 'in_person',
    location: 'casablanca',
    urgencyLevel: 'normal'
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Device detection helpers
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  useEffect(() => {
    setMounted(true);
    checkBackendConnection();
  }, []);

  // Check if backend is running
  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch (error) {
      setBackendStatus('disconnected');
    }
  };

  // Load availability when date changes
  useEffect(() => {
    if (formData.preferredDate) {
      fetchAvailability(formData.preferredDate);
    } else {
      setAvailability([]);
      setAvailabilityError(null);
    }
  }, [formData.preferredDate]);

  const content = {
    ar: {
      title: 'احجز استشارة قانونية',
      subtitle: 'ابدأ رحلتك القانونية مع خبراء متخصصين',
      description: 'املأ النموذج للحصول على استشارة قانونية مخصصة. فريقنا سيتواصل معك لتأكيد الموعد.',
      nameLabel: 'الاسم الكامل',
      phoneLabel: 'رقم الهاتف',
      emailLabel: 'البريد الإلكتروني',
      serviceLabel: 'نوع الخدمة',
      dateLabel: 'التاريخ المفضل',
      timeLabel: 'الوقت المناسب',
      messageLabel: 'تفاصيل إضافية (اختياري)',
      privacyNote: 'ملاحظة: سيتم التواصل معك لتأكيد الموعد. معلوماتك محمية بسرية تامة.',
      submitLoading: 'جاري الإرسال...',
      submitButton: 'حجز الموعد',
      phoneContact: 'اتصال هاتفي',
      emailContact: 'بريد إلكتروني',
      emergencyContact: 'حالات طارئة',
      phoneHours: 'من الأحد إلى الخميس: 9 صباحاً - 6 مساءً',
      emailResponse: 'رد خلال 24 ساعة',
      emergencyAvailable: 'متاح 24/7',
      services: [
        { value: 'legal_consultation', label: 'استشارة قانونية', icon: <Briefcase /> },
        { value: 'notary_service', label: 'خدمة التوثيق', icon: <FileText /> },
        { value: 'contract_review', label: 'مراجعة العقود', icon: <Scale /> },
        { value: 'court_representation', label: 'التمثيل القضائي', icon: <GraduationCap /> },
        { value: 'business_setup', label: 'تأسيس الشركات', icon: <Building /> },
        { value: 'family_law', label: 'قانون الأسرة', icon: <BookOpen /> },
        { value: 'real_estate', label: 'العقارات', icon: <Building /> },
        { value: 'criminal_defense', label: 'الدفاع الجنائي', icon: <Shield /> },
        { value: 'tax_law', label: 'القانون الجبائي', icon: <FileText /> },
        { value: 'labor_law', label: 'قانون العمل', icon: <Briefcase /> },
        { value: 'immigration', label: 'الهجرة', icon: <User /> },
        { value: 'intellectual_property', label: 'الملكية الفكرية', icon: <Award /> },
        { value: 'other', label: 'خدمات أخرى', icon: <MessageSquare /> },
      ],
      successMessage: 'تم طلب الموعد بنجاح! يتم توجيهك إلى صفحة التأكيد...',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      requiredField: 'هذا الحقل مطلوب',
      today: 'اليوم',
      selectTime: 'اختر الوقت',
      emergency: 'حالة طارئة؟ اتصل الآن',
      whyChooseUs: 'لماذا تختارنا؟',
      features: [
        { icon: <Shield />, text: 'سرية تامة' },
        { icon: <CheckCircle />, text: 'خبراء معتمدون' },
        { icon: <Clock />, text: 'رد سريع خلال 24 ساعة' },
        { icon: <Award />, text: '15+ سنة خبرة' },
      ],
      bookingSuccess: 'تم الحجز بنجاح',
      bookingReference: 'رقم المرجع',
      viewDetails: 'عرض التفاصيل',
      availableSlots: 'الأوقات المتاحة',
      noSlotsAvailable: 'لا توجد أوقات متاحة لهذا التاريخ',
      loadingAvailability: 'جاري تحميل الأوقات المتاحة...',
      meetingType: 'نوع المقابلة',
      locationLabel: 'المكان',
      urgencyLabel: 'مستوى الاستعجال',
      meetingTypes: [
        { value: 'in_person', label: 'مقابلة شخصية' },
        { value: 'video_call', label: 'مكالمة فيديو' },
        { value: 'phone_call', label: 'مكالمة هاتفية' }
      ],
      locations: [
        { value: 'casablanca', label: 'الدار البيضاء' },
        { value: 'rabat', label: 'الرباط' },
        { value: 'marrakech', label: 'مراكش' },
        { value: 'online', label: 'أونلاين' }
      ],
      urgencyLevels: [
        { value: 'normal', label: 'عادي' },
        { value: 'urgent', label: 'عاجل' },
        { value: 'emergency', label: 'طارئ' }
      ],
      networkError: 'خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
      serviceUnavailable: 'خدمة التحقق من التوفر غير متاحة مؤقتاً',
      tryAgain: 'إعادة المحاولة',
      available: 'متاح',
      noAvailableTimes: 'لا توجد أوقات متاحة',
      chooseAnotherDate: 'يرجى اختيار تاريخ آخر أو التواصل معنا مباشرة',
      slotsAvailable: 'أوقات متاحة',
      backendDown: 'الخادم غير متصل. يرجى تشغيل السيرفر أولاً.',
      testConnection: 'اختبار الاتصال',
      dateRequired: 'الرجاء اختيار تاريخ',
      timeRequired: 'الرجاء اختيار وقت',
      fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
      invalidTime: 'وقت غير صالح',
      serverConnected: 'الاتصال بالخادم ناجح',
      mobileMenu: 'القائمة',
      closeMenu: 'إغلاق',
      formSection: 'نموذج الحجز',
      contactSection: 'معلومات الاتصال',
      featuresSection: 'ميزاتنا',
      hoursSection: 'ساعات العمل'
    },
    fr: {
      title: 'Prendre un Rendez-vous',
      subtitle: 'Commencez votre parcours juridique avec nos experts',
      description: 'Remplissez le formulaire pour obtenir une consultation juridique personnalisée. Notre équipe vous contactera pour confirmation.',
      nameLabel: 'Nom complet',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      serviceLabel: 'Type de service',
      dateLabel: 'Date souhaitée',
      timeLabel: 'Horaire préféré',
      messageLabel: 'Détails supplémentaires (optionnel)',
      privacyNote: 'Note : Vous serez contacté pour confirmation. Vos informations sont protégées confidentiellement.',
      submitLoading: 'Envoi en cours...',
      submitButton: 'Demander un rendez-vous',
      phoneContact: 'Par téléphone',
      emailContact: 'Par email',
      emergencyContact: 'Urgence',
      phoneHours: 'Lun-Ven: 9h-18h',
      emailResponse: 'Réponse sous 24h',
      emergencyAvailable: 'Disponible 24h/24',
      services: [
        { value: 'legal_consultation', label: 'Consultation juridique', icon: <Briefcase /> },
        { value: 'notary_service', label: 'Service notarial', icon: <FileText /> },
        { value: 'contract_review', label: 'Revue de contrat', icon: <Scale /> },
        { value: 'court_representation', label: 'Représentation judiciaire', icon: <GraduationCap /> },
        { value: 'business_setup', label: 'Création d\'entreprise', icon: <Building /> },
        { value: 'family_law', label: 'Droit de la famille', icon: <BookOpen /> },
        { value: 'real_estate', label: 'Immobilier', icon: <Building /> },
        { value: 'criminal_defense', label: 'Défense pénale', icon: <Shield /> },
        { value: 'tax_law', label: 'Droit fiscal', icon: <FileText /> },
        { value: 'labor_law', label: 'Droit du travail', icon: <Briefcase /> },
        { value: 'immigration', label: 'Immigration', icon: <User /> },
        { value: 'intellectual_property', label: 'Propriété intellectuelle', icon: <Award /> },
        { value: 'other', label: 'Autre', icon: <MessageSquare /> },
      ],
      successMessage: 'Demande de rendez-vous envoyée avec succès ! Vous serez redirigé vers la page de confirmation...',
      errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
      requiredField: 'Ce champ est requis',
      today: 'Aujourd\'hui',
      selectTime: 'Sélectionnez l\'heure',
      emergency: 'Cas d\'urgence? Appelez maintenant',
      whyChooseUs: 'Pourquoi Nous Choisir ?',
      features: [
        { icon: <Shield />, text: 'Confidentialité totale' },
        { icon: <CheckCircle />, text: 'Experts certifiés' },
        { icon: <Clock />, text: 'Réponse rapide sous 24h' },
        { icon: <Award />, text: '15+ ans d\'expérience' },
      ],
      bookingSuccess: 'Réservation réussie',
      bookingReference: 'Numéro de référence',
      viewDetails: 'Voir les détails',
      availableSlots: 'Créneaux disponibles',
      noSlotsAvailable: 'Aucun créneau disponible pour cette date',
      loadingAvailability: 'Chargement des créneaux disponibles...',
      meetingType: 'Type de rendez-vous',
      locationLabel: 'Lieu',
      urgencyLabel: 'Niveau d\'urgence',
      meetingTypes: [
        { value: 'in_person', label: 'En personne' },
        { value: 'video_call', label: 'Appel vidéo' },
        { value: 'phone_call', label: 'Appel téléphonique' }
      ],
      locations: [
        { value: 'casablanca', label: 'Casablanca' },
        { value: 'rabat', label: 'Rabat' },
        { value: 'marrakech', label: 'Marrakech' },
        { value: 'online', label: 'En ligne' }
      ],
      urgencyLevels: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'emergency', label: 'Urgence' }
      ],
      networkError: 'Erreur de connexion au serveur. Veuillez vérifier votre connexion Internet.',
      serviceUnavailable: 'Service de vérification des disponibilités temporairement indisponible',
      tryAgain: 'Réessayer',
      available: 'Disponible',
      noAvailableTimes: 'Aucun créneau disponible',
      chooseAnotherDate: 'Veuillez choisir une autre date ou nous contacter directement',
      slotsAvailable: 'créneaux disponibles',
      backendDown: 'Serveur non connecté. Veuillez démarrer le serveur d\'abord.',
      testConnection: 'Tester la connexion',
      dateRequired: 'Veuillez choisir une date',
      timeRequired: 'Veuillez choisir un horaire',
      fillAllFields: 'Veuillez remplir tous les champs obligatoires',
      invalidTime: 'Horaire invalide',
      serverConnected: 'Connexion au serveur réussie',
      mobileMenu: 'Menu',
      closeMenu: 'Fermer',
      formSection: 'Formulaire de Réservation',
      contactSection: 'Contact',
      featuresSection: 'Nos Avantages',
      hoursSection: 'Heures de Bureau'
    },
    en: {
      title: 'Book an Appointment',
      subtitle: 'Start your legal journey with our experts',
      description: 'Fill out the form for a personalized legal consultation. Our team will contact you for confirmation.',
      nameLabel: 'Full Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
      serviceLabel: 'Service Type',
      dateLabel: 'Preferred Date',
      timeLabel: 'Preferred Time',
      messageLabel: 'Additional Details (optional)',
      privacyNote: 'Note: You will be contacted for confirmation. Your information is protected confidentially.',
      submitLoading: 'Sending...',
      submitButton: 'Request Appointment',
      phoneContact: 'By Phone',
      emailContact: 'By Email',
      emergencyContact: 'Emergency',
      phoneHours: 'Mon-Fri: 9AM-6PM',
      emailResponse: 'Response within 24h',
      emergencyAvailable: 'Available 24/7',
      services: [
        { value: 'legal_consultation', label: 'Legal Consultation', icon: <Briefcase /> },
        { value: 'notary_service', label: 'Notary Service', icon: <FileText /> },
        { value: 'contract_review', label: 'Contract Review', icon: <Scale /> },
        { value: 'court_representation', label: 'Court Representation', icon: <GraduationCap /> },
        { value: 'business_setup', label: 'Business Setup', icon: <Building /> },
        { value: 'family_law', label: 'Family Law', icon: <BookOpen /> },
        { value: 'real_estate', label: 'Real Estate', icon: <Building /> },
        { value: 'criminal_defense', label: 'Criminal Defense', icon: <Shield /> },
        { value: 'tax_law', label: 'Tax Law', icon: <FileText /> },
        { value: 'labor_law', label: 'Labor Law', icon: <Briefcase /> },
        { value: 'immigration', label: 'Immigration', icon: <User /> },
        { value: 'intellectual_property', label: 'Intellectual Property', icon: <Award /> },
        { value: 'other', label: 'Other', icon: <MessageSquare /> },
      ],
      successMessage: 'Appointment requested successfully! Redirecting you to confirmation page...',
      errorMessage: 'An error occurred. Please try again.',
      requiredField: 'This field is required',
      today: 'Today',
      selectTime: 'Select Time',
      emergency: 'Emergency case? Call now',
      whyChooseUs: 'Why Choose Us?',
      features: [
        { icon: <Shield />, text: 'Total confidentiality' },
        { icon: <CheckCircle />, text: 'Certified experts' },
        { icon: <Clock />, text: 'Fast response within 24h' },
        { icon: <Award />, text: '15+ years experience' },
      ],
      bookingSuccess: 'Booking Successful',
      bookingReference: 'Reference Number',
      viewDetails: 'View Details',
      availableSlots: 'Available Slots',
      noSlotsAvailable: 'No slots available for this date',
      loadingAvailability: 'Loading available slots...',
      meetingType: 'Meeting Type',
      locationLabel: 'Location',
      urgencyLabel: 'Urgency Level',
      meetingTypes: [
        { value: 'in_person', label: 'In Person' },
        { value: 'video_call', label: 'Video Call' },
        { value: 'phone_call', label: 'Phone Call' }
      ],
      locations: [
        { value: 'casablanca', label: 'Casablanca' },
        { value: 'rabat', label: 'Rabat' },
        { value: 'marrakech', label: 'Marrakech' },
        { value: 'online', label: 'Online' }
      ],
      urgencyLevels: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'emergency', label: 'Emergency' }
      ],
      networkError: 'Server connection error. Please check your internet connection.',
      serviceUnavailable: 'Availability check service temporarily unavailable',
      tryAgain: 'Try Again',
      available: 'Available',
      noAvailableTimes: 'No available time slots',
      chooseAnotherDate: 'Please select another date or contact us directly',
      slotsAvailable: 'slots available',
      backendDown: 'Server not connected. Please start the server first.',
      testConnection: 'Test Connection',
      dateRequired: 'Please select a date',
      timeRequired: 'Please select a time',
      fillAllFields: 'Please fill all required fields',
      invalidTime: 'Invalid time slot',
      serverConnected: 'Server connection successful',
      mobileMenu: 'Menu',
      closeMenu: 'Close',
      formSection: 'Booking Form',
      contactSection: 'Contact Info',
      featuresSection: 'Our Features',
      hoursSection: 'Office Hours'
    }
  };

  const current = content[language];
  const isRTL = language === 'ar';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === 'preferredDate') {
      setFormData(prev => ({
        ...prev,
        preferredTime: '',
        [name]: value,
      }));
    }
  };

  const fetchAvailability = async (date) => {
    if (!date) {
      setAvailability([]);
      setAvailabilityError(null);
      return;
    }

    if (backendStatus === 'disconnected') {
      setAvailabilityError(current.backendDown);
      setAvailability([]);
      return;
    }

    try {
      setLoadingAvailability(true);
      setAvailabilityError(null);
      
      const safeDate = encodeURIComponent(date);
      const endpoint = `/api/appointments/availability/slots?date=${safeDate}`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        const slots = data.data?.availableSlots || [];
        setAvailability(slots);
        
        if (slots.length === 0) {
          setAvailabilityError(current.noSlotsAvailable);
        } else {
          setAvailabilityError(null);
        }
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
      
    } catch (error) {
      let errorMessage = current.errorMessage;
      
      if (error.message.includes('Failed to fetch') || 
          error.message.includes('NetworkError') || 
          error.message.includes('Network request failed')) {
        errorMessage = current.networkError;
        setBackendStatus('disconnected');
      } else if (error.message.includes('404')) {
        errorMessage = current.serviceUnavailable;
      } else if (error.message.includes('500')) {
        errorMessage = language === 'ar' ? 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.' :
                     language === 'fr' ? 'Erreur serveur. Veuillez réessayer plus tard.' :
                     'Server error. Please try again later.';
      }
      
      setAvailabilityError(errorMessage);
      setAvailability([]);
      
    } finally {
      setLoadingAvailability(false);
    }
  };

  const formatTimeForDisplay = (time24h) => {
    if (!time24h) return '';
    
    if (time24h.includes('AM') || time24h.includes('PM')) {
      return time24h;
    }
    
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatTimeForBackend = (displayTime) => {
    if (!displayTime) return '';
    
    if (!displayTime.includes('AM') && !displayTime.includes('PM')) {
      return displayTime;
    }
    
    const [time, period] = displayTime.split(' ');
    let [hours, minutes] = time.split(':');
    
    hours = parseInt(hours, 10);
    
    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      toast.error(current.fillAllFields, {
        duration: 4000,
        icon: '❌',
      });
      return;
    }
    
    if (!formData.preferredDate) {
      toast.error(current.dateRequired, {
        duration: 4000,
        icon: '❌',
      });
      return;
    }
    
    if (!formData.preferredTime) {
      toast.error(current.timeRequired, {
        duration: 4000,
        icon: '❌',
      });
      return;
    }
    
    if (backendStatus === 'disconnected') {
      toast.error(current.backendDown, {
        duration: 5000,
        icon: <WifiOff className="w-5 h-5" />,
      });
      return;
    }
    
    setLoading(true);

    try {
      // Format date as YYYY-MM-DD
      const appointmentDate = new Date(formData.preferredDate);
      const formattedDate = appointmentDate.toISOString().split('T')[0];
      
      // Convert time to 24h format for backend
      const backendTime = formatTimeForBackend(formData.preferredTime);
      
      const appointmentData = {
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        serviceType: formData.serviceType,
        preferredDate: formattedDate,
        preferredTime: backendTime,
        meetingType: formData.meetingType,
        location: formData.location,
        urgencyLevel: formData.urgencyLevel,
        message: formData.message,
        language: language
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || current.errorMessage);
      }

      // Extract appointment reference from response
      let appointmentRef = null;
      
      // Check all possible response structures
      if (data.appointmentReference) {
        appointmentRef = data.appointmentReference;
      } else if (data.data?.appointmentReference) {
        appointmentRef = data.data.appointmentReference;
      } else if (data.reference) {
        appointmentRef = data.reference;
      } else if (data.data?.reference) {
        appointmentRef = data.data.reference;
      } else if (data.id) {
        appointmentRef = data.id;
      } else if (data.data?.id) {
        appointmentRef = data.data.id;
      } else if (data.appointmentId) {
        appointmentRef = data.appointmentId;
      } else if (data.data?.appointmentId) {
        appointmentRef = data.data.appointmentId;
      }

      // If no reference found, check the actual response structure
      if (!appointmentRef) {
        // Try to extract reference from any string in the response
        const responseString = JSON.stringify(data);
        const refMatch = responseString.match(/APPT-\d+-\d+/);
        if (refMatch) {
          appointmentRef = refMatch[0];
        }
      }

      if (!appointmentRef) {
        // Generate a fallback reference based on timestamp
        appointmentRef = `APPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }

      // Show success message
      const successMsg = language === 'ar' 
        ? `تم طلب الموعد بنجاح! يتم التوجيه إلى صفحة التأكيد...`
        : language === 'fr'
          ? `Rendez-vous demandé avec succès ! Redirection en cours...`
          : `Appointment requested successfully! Redirecting...`;

      toast.success(successMsg, {
        duration: 2000,
        icon: '✅',
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #86efac',
        },
      });

      // Reset form
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceType: 'legal_consultation',
        preferredDate: '',
        preferredTime: '',
        message: '',
        language: language,
        meetingType: 'in_person',
        location: 'casablanca',
        urgencyLevel: 'normal'
      });
      
      setAvailability([]);
      setAvailabilityError(null);

      // IMPORTANT: Use a shorter timeout and ensure navigation happens
      setTimeout(() => {
        navigate(`/appointment-confirmation/${appointmentRef}`, { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Appointment submission error:', error);
      
      let errorMessage = current.errorMessage;
      
      if (error.message.includes('already booked')) {
        errorMessage = language === 'ar' 
          ? 'هذا الوقت محجوز بالفعل. يرجى اختيار وقت آخر.'
          : language === 'fr'
            ? 'Ce créneau est déjà réservé. Veuillez choisir un autre horaire.'
            : 'This time slot is already booked. Please choose another time.';
      } else if (error.message.includes('Validation failed') || error.message.includes('Invalid')) {
        errorMessage = language === 'ar'
          ? 'الرجاء التحقق من المعلومات المدخلة'
          : language === 'fr'
            ? 'Veuillez vérifier les informations saisies'
            : 'Please check the information entered';
      } else if (error.message.includes('Missing required fields')) {
        errorMessage = language === 'ar'
          ? 'يرجى ملء جميع الحقول المطلوبة'
          : language === 'fr'
            ? 'Veuillez remplir tous les champs obligatoires'
            : 'Please fill all required fields';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = current.networkError;
        setBackendStatus('disconnected');
      }
      
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  };

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < (isMobile ? 4 : isTablet ? 5 : 7); i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      days.push(formattedDate);
    }
    return days;
  };

  const handleDateSelect = (date) => {
    if (!loading) {
      setFormData(prev => ({
        ...prev,
        preferredDate: date,
        preferredTime: '',
      }));
    }
  };

  const handleTimeSelect = (time24h) => {
    if (!loading) {
      const displayTime = formatTimeForDisplay(time24h);
      setFormData(prev => ({
        ...prev,
        preferredTime: displayTime,
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Mobile Navigation Menu
  const MobileNavigation = () => (
    <div className="lg:hidden fixed bottom-6 right-6 z-40">
      <div className="relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 p-2"
            >
              {[
                { id: 'form', label: current.formSection, icon: <User className="w-4 h-4" /> },
                { id: 'contact', label: current.contactSection, icon: <Phone className="w-4 h-4" /> },
                { id: 'features', label: current.featuresSection, icon: <Star className="w-4 h-4" /> },
                { id: 'hours', label: current.hoursSection, icon: <Clock className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg mb-1 last:mb-0 transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={activeSection === item.id ? 'text-yellow-600' : 'text-gray-500'}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Backend Status Alert */}
      {backendStatus === 'disconnected' && (
        <div className={`fixed ${isMobile ? 'top-2 right-2 left-2' : 'top-4 right-4'} z-50`}>
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between gap-2 animate-pulse">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {language === 'ar' ? 'الخادم غير متصل' : 
                 language === 'fr' ? 'Serveur déconnecté' : 
                 'Server disconnected'}
              </span>
            </div>
            <button
              onClick={checkBackendConnection}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
            >
              {current.testConnection}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative min-h-[40vh] sm:min-h-[45vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #c9a33e 2px, transparent 0%)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="absolute top-10 right-10 w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-900/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-yellow-200/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8">
              <div className="relative">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-700" />
                <Sparkles className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 text-yellow-600" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-yellow-800 tracking-wide">
                {current.title}
              </span>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-2">
                <span className="bg-gradient-to-r from-gray-900 via-yellow-600 to-gray-900 bg-clip-text text-transparent">
                  {current.title}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                {current.subtitle}
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
                {current.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster 
        position={isMobile ? "top-center" : "top-right"}
        toastOptions={{
          style: {
            background: 'white',
            color: '#1f2937',
            border: '1px solid #d97706',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            fontSize: isMobile ? '14px' : '16px',
            maxWidth: isMobile ? '90vw' : '400px',
          },
          success: {
            iconTheme: {
              primary: '#059669',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: 'white',
            },
          },
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 py-4 sm:py-6 lg:py-8 xl:py-12">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {/* Form Section */}
            <motion.div
              id="form"
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {language === 'ar' ? 'معلومات الحجز' : language === 'fr' ? 'Informations de Réservation' : 'Booking Information'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                          <span>{current.nameLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder={language === 'ar' ? 'ادخل اسمك الكامل' : 'Enter your full name'}
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                          <span>{current.phoneLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder="+212 6 XX XX XX XX"
                        disabled={loading}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                          <span>{current.emailLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder="your@email.com"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                        <span>{current.serviceLabel} *</span>
                      </div>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3">
                      {current.services.map((service) => (
                        <motion.button
                          key={service.value}
                          type="button"
                          whileHover={{ scale: isMobile ? 1 : 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                          disabled={loading}
                          className={`group relative overflow-hidden border rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center transition-all duration-300 ${
                            formData.serviceType === service.value
                              ? 'border-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-sm sm:shadow-md'
                              : 'border-gray-200 bg-white hover:border-yellow-400 hover:bg-gray-50'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div className="relative z-10">
                            <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg mb-1 sm:mb-2 ${
                              formData.serviceType === service.value
                                ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                                : 'bg-gray-100 group-hover:bg-yellow-50'
                            }`}>
                              <div className={formData.serviceType === service.value ? 'text-white' : 'text-gray-600 group-hover:text-yellow-600'}>
                                {React.cloneElement(service.icon, { size: isMobile ? 14 : 18 })}
                              </div>
                            </div>
                            <div className={`text-xs sm:text-sm font-medium ${
                              formData.serviceType === service.value ? 'text-yellow-700' : 'text-gray-700 group-hover:text-gray-900'
                            }`}>
                              {service.label}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                        <span>{current.dateLabel} *</span>
                      </div>
                    </label>
                    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} sm:grid-cols-3 gap-2`}>
                      {getNextDays().map((date, index) => {
                        const dateObj = new Date(date);
                        const isToday = index === 0;
                        const isSelected = formData.preferredDate === date;
                        
                        return (
                          <motion.button
                            key={date}
                            type="button"
                            whileHover={{ scale: isMobile ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateSelect(date)}
                            disabled={loading}
                            className={`relative overflow-hidden border rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center transition-all duration-300 ${
                              isSelected
                                ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-blue-800 text-white'
                                : 'border-gray-200 bg-white hover:border-yellow-400 hover:bg-gray-50'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="relative z-10">
                              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                                isSelected ? 'text-white' : 'text-gray-900'
                              }`}>
                                {dateObj.getDate()}
                              </div>
                              <div className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                                {dateObj.toLocaleDateString(language, { weekday: 'short' })}
                              </div>
                              {isToday && (
                                <div className="absolute -top-1 -right-1">
                                  <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {formData.preferredDate && (
                    <div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                            <span>{current.timeLabel} *</span>
                          </div>
                        </label>
                        {formData.preferredDate && (
                          <div className="text-xs text-gray-500">
                            {formatDate(formData.preferredDate)}
                          </div>
                        )}
                      </div>
                      
                      {loadingAvailability ? (
                        <div className="flex items-center justify-center py-6 sm:py-8">
                          <div className="text-center">
                            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-yellow-600 mx-auto mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm text-gray-600">{current.loadingAvailability}</p>
                          </div>
                        </div>
                      ) : availabilityError ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                          <p className="text-red-700 text-xs sm:text-sm font-medium">{availabilityError}</p>
                          <p className="text-red-600 text-xs mt-1">
                            {current.chooseAnotherDate}
                          </p>
                          <button
                            type="button"
                            onClick={() => fetchAvailability(formData.preferredDate)}
                            className="mt-2 sm:mt-3 px-3 py-1 sm:px-4 sm:py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                          >
                            {current.tryAgain}
                          </button>
                        </div>
                      ) : availability.length === 0 ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
                          <p className="text-yellow-700 text-xs sm:text-sm font-medium mb-1">
                            {current.noAvailableTimes}
                          </p>
                          <p className="text-yellow-600 text-xs">
                            {current.chooseAnotherDate}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3 sm:mb-4`}>
                            {availability.map((time24h) => {
                              const displayTime = formatTimeForDisplay(time24h);
                              const isSelected = formData.preferredTime === displayTime;
                              
                              return (
                                <motion.button
                                  key={time24h}
                                  type="button"
                                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleTimeSelect(time24h)}
                                  disabled={loading}
                                  className={`
                                    border rounded-lg sm:rounded-xl py-2 px-1 sm:py-3 sm:px-2 text-xs sm:text-sm transition-all duration-300
                                    ${isSelected
                                      ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-sm sm:shadow-md'
                                      : 'border-gray-200 bg-white text-gray-700 hover:border-yellow-400 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                                    }
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                                  `}
                                >
                                  <div className="font-medium truncate">{displayTime}</div>
                                  <div className="text-xs opacity-75 mt-0.5">
                                    {current.available}
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-500 px-1">
                            <div className="flex items-center gap-2 mb-2 sm:mb-0">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                                <span>
                                  {availability.length} {current.slotsAvailable}
                                </span>
                              </div>
                            </div>
                            
                            {formData.preferredTime && (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                <span className="font-medium text-green-700 text-sm">
                                  {formData.preferredTime}
                                </span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Additional Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        {current.meetingType}
                      </label>
                      <select
                        name="meetingType"
                        value={formData.meetingType}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                      >
                        {current.meetingTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        {current.locationLabel}
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                      >
                        {current.locations.map((location) => (
                          <option key={location.value} value={location.value}>
                            {location.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        {current.urgencyLabel}
                      </label>
                      <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                      >
                        {current.urgencyLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-700" />
                        <span>{current.messageLabel}</span>
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={isMobile ? 3 : 4}
                      disabled={loading}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300 resize-none"
                      placeholder={language === 'ar' ? 'أخبرنا المزيد عن حالتك...' : 'Tell us more about your case...'}
                    />
                  </div>

                  {/* Privacy Note */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {current.privacyNote}
                      </p>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || !formData.preferredDate || !formData.preferredTime || backendStatus === 'disconnected'}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="text-sm sm:text-lg">{current.submitLoading}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-lg">{current.submitButton}</span>
                          <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 text-white ${isRTL ? 'rotate-180' : ''} ${isMobile ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                        </>
                      )}
                    </div>
                    {loading && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700"
                      />
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar Section */}
            <motion.div
              id="contact"
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8"
            >
              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl">
                      <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
                    </div>
                    <div>
                      <div className="font-bold text-red-700 text-base sm:text-lg">{current.emergency}</div>
                      <div className="text-xs sm:text-sm text-red-600 mt-0.5">
                        +212 6 10 20 30 40
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => window.location.href = 'tel:+212610203040'}
                  >
                    {current.emergencyContact}
                  </motion.button>
                </div>
              </motion.div>

              {/* Contact Cards */}
              <div id="contact" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{current.phoneContact}</h3>
                    <p className="text-yellow-600 font-mono text-sm sm:text-base lg:text-lg mb-1 truncate">+212 5 20 30 40 50</p>
                    <p className="text-xs sm:text-sm text-gray-500">{current.phoneHours}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{current.emailContact}</h3>
                    <p className="text-yellow-600 font-mono text-xs sm:text-sm mb-1 truncate">rdv@legalpromaroc.ma</p>
                    <p className="text-xs sm:text-sm text-gray-500">{current.emailResponse}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{language === 'ar' ? 'زيارتنا' : language === 'fr' ? 'Nous Visiter' : 'Visit Us'}</h3>
                    <p className="text-gray-700 text-xs sm:text-sm mb-1 leading-relaxed truncate">123 Avenue Mohammed V</p>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed truncate">Casablanca, Maroc</p>
                  </div>
                </motion.div>
              </div>

              {/* Why Choose Us */}
              <motion.div
                id="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  <span>{current.whyChooseUs}</span>
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {current.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                        <div className="text-white">
                          {React.cloneElement(feature.icon, { size: isMobile ? 16 : 18 })}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                id="hours"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                  {language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures de Bureau' : 'Office Hours'}
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'الأحد - الخميس' : language === 'fr' ? 'Lundi - Vendredi' : 'Monday - Friday'}
                    </span>
                    <span className="font-medium text-gray-900 text-sm">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'السبت' : language === 'fr' ? 'Samedi' : 'Saturday'}
                    </span>
                    <span className="font-medium text-gray-900 text-sm">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'الأحد' : language === 'fr' ? 'Dimanche' : 'Sunday'}
                    </span>
                    <span className="font-medium text-gray-900 text-sm">{language === 'ar' ? 'مغلق' : language === 'fr' ? 'Fermé' : 'Closed'}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {language === 'ar' ? 'كيفية حجز موعد' : language === 'fr' ? 'Comment Réserver un Rendez-vous' : 'How to Book an Appointment'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
              {language === 'ar' 
                ? 'عملية سهلة ومباشرة في 4 خطوات فقط'
                : language === 'fr' 
                  ? 'Un processus simple et direct en seulement 4 étapes'
                  : 'A simple and direct process in just 4 steps'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[
              { number: '01', title: language === 'ar' ? 'املأ النموذج' : language === 'fr' ? 'Remplir le Formulaire' : 'Fill the Form', icon: <User className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { number: '02', title: language === 'ar' ? 'اختر الوقت' : language === 'fr' ? 'Choisir l\'Horaire' : 'Choose Time', icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { number: '03', title: language === 'ar' ? 'تأكيد الحجز' : language === 'fr' ? 'Confirmer la Réservation' : 'Confirm Booking', icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { number: '04', title: language === 'ar' ? 'مقابلة الخبير' : language === 'fr' ? 'Rencontrer l\'Expert' : 'Meet Expert', icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" /> },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-md sm:shadow-lg border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300 hover:border-yellow-200">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-500 to-yellow-600' : 'from-blue-700 to-blue-800'} rounded-full flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold`}>
                    {step.number}
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-50 to-yellow-100' : 'from-blue-50 to-blue-100'} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                      <div className={index % 2 === 0 ? 'text-yellow-600' : 'text-blue-700'}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 leading-relaxed">{step.title}</h3>
                </div>
                {index < 3 && !isMobile && (
                  <div className="hidden sm:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;