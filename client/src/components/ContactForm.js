import { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Shield,
  Car,
  Heart,
  Landmark,
  Key,
  Briefcase,
  Home,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Globe,
  ExternalLink,
  Navigation,
  User,
  AlertCircle,
  Loader2,
  Maximize2,
  Compass,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

// API Configuration - USE PROXY PATH
const API_BASE_URL = '/api';

const ContactForm = ({ language = 'fr' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'general',
    subject: '',
    message: '',
    urgency: 'normal',
    language: 'fr',
    source: 'contact_page'
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendStatus, setBackendStatus] = useState('connected');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeSection, setActiveSection] = useState('form');
  const formRef = useRef(null);

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

  const isRTL = language === 'ar';

  // Update language in formData when language prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      language: language
    }));
  }, [language]);

  const services = {
    ar: [
      { name: 'القانون المدني', value: 'civil_law' },
      { name: 'القانون التجاري', value: 'commercial_law' },
      { name: 'قانون العقار', value: 'real_estate_law' },
      { name: 'القانون الإداري', value: 'administrative_law' },
      { name: 'قانون السير', value: 'traffic_law' },
      { name: 'قانون الأسرة', value: 'family_law' },
      { name: 'استشارة قانونية عامة', value: 'legal_consultation' },
      { name: 'خدمة التوثيق', value: 'notary_service' },
      { name: 'مراجعة العقود', value: 'contract_review' },
      { name: 'التمثيل القضائي', value: 'court_representation' },
      { name: 'أخرى', value: 'other' }
    ],
    fr: [
      { name: 'Droit Civil', value: 'civil_law' },
      { name: 'Droit Commercial', value: 'commercial_law' },
      { name: 'Droit Immobilier', value: 'real_estate_law' },
      { name: 'Droit Administratif', value: 'administrative_law' },
      { name: 'Droit Routier', value: 'traffic_law' },
      { name: 'Droit de la Famille', value: 'family_law' },
      { name: 'Consultation Juridique', value: 'legal_consultation' },
      { name: 'Service Notarial', value: 'notary_service' },
      { name: 'Revue de Contrat', value: 'contract_review' },
      { name: 'Représentation Judiciaire', value: 'court_representation' },
      { name: 'Autre', value: 'other' }
    ],
    en: [
      { name: 'Civil Law', value: 'civil_law' },
      { name: 'Commercial Law', value: 'commercial_law' },
      { name: 'Real Estate Law', value: 'real_estate_law' },
      { name: 'Administrative Law', value: 'administrative_law' },
      { name: 'Traffic Law', value: 'traffic_law' },
      { name: 'Family Law', value: 'family_law' },
      { name: 'Legal Consultation', value: 'legal_consultation' },
      { name: 'Notary Service', value: 'notary_service' },
      { name: 'Contract Review', value: 'contract_review' },
      { name: 'Court Representation', value: 'court_representation' },
      { name: 'Other', value: 'other' }
    ]
  };

  const currentServices = services[language];

  const contactInfo = {
    ar: {
      title: 'اتصل بنا',
      subtitle: 'نحن هنا لمساعدتك في جميع استفساراتك القانونية',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        service: 'نوع الخدمة',
        subject: 'الموضوع',
        message: 'رسالتك',
        urgency: 'درجة الاستعجال',
        submit: 'إرسال الرسالة',
        success: 'تم إرسال رسالتك بنجاح!',
        successSub: 'سنرد عليك في أقرب وقت ممكن',
        loading: 'جاري الإرسال...',
        error: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
      },
      contact: {
        title: 'معلومات التواصل',
        address: '123 شارع محمد الخامس، الدار البيضاء، المغرب',
        phone: '+212 5 20 30 40 50',
        email: 'contact@legalfirm.ma',
        hours: 'الأحد - الخميس: 9:00 - 17:00',
        emergency: 'حالة طارئة؟',
        map: 'خريطة الموقع',
        emergencyPhone: '+212 6 10 20 30 40'
      },
      urgencyOptions: [
        { value: 'low', label: 'منخفض', color: 'from-green-400 to-green-500' },
        { value: 'normal', label: 'عادي', color: 'from-gray-300 to-gray-400' },
        { value: 'high', label: 'عالي', color: 'from-blue-400 to-blue-500' },
        { value: 'urgent', label: 'عاجل', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'طارئ', color: 'from-red-400 to-red-500' }
      ],
      validation: {
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'بريد إلكتروني غير صالح',
        phoneRequired: 'رقم الهاتف مطلوب',
        subjectRequired: 'الموضوع مطلوب',
        serviceRequired: 'الخدمة مطلوبة',
        messageRequired: 'الرسالة مطلوبة',
        messageTooLong: 'الرسالة طويلة جداً (الحد الأقصى 5000 حرف)'
      },
      mobileMenu: 'القائمة',
      closeMenu: 'إغلاق',
      formSection: 'نموذج الاتصال',
      infoSection: 'معلومات الاتصال',
      mapSection: 'خريطة الموقع'
    },
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Nous sommes ici pour vous aider avec toutes vos questions juridiques',
      form: {
        name: 'Nom Complet',
        email: 'Email',
        phone: 'Téléphone',
        service: 'Type de Service',
        subject: 'Sujet',
        message: 'Votre Message',
        urgency: 'Niveau d\'Urgence',
        submit: 'Envoyer le Message',
        success: 'Votre message a été envoyé!',
        successSub: 'Nous vous répondrons dans les plus brefs délais',
        loading: 'Envoi en cours...',
        error: 'Une erreur est survenue. Veuillez réessayer.'
      },
      contact: {
        title: 'Informations de Contact',
        address: '123 Avenue Mohammed V, Casablanca, Maroc',
        phone: '+212 5 20 30 40 50',
        email: 'contact@legalfirm.ma',
        hours: 'Dimanche - Jeudi: 9:00 - 17:00',
        emergency: 'Cas d\'urgence?',
        map: 'Carte de Localisation',
        emergencyPhone: '+212 6 10 20 30 40'
      },
      urgencyOptions: [
        { value: 'low', label: 'Faible', color: 'from-green-400 to-green-500' },
        { value: 'normal', label: 'Normal', color: 'from-gray-300 to-gray-400' },
        { value: 'high', label: 'Élevé', color: 'from-blue-400 to-blue-500' },
        { value: 'urgent', label: 'Urgent', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'Urgence', color: 'from-red-400 to-red-500' }
      ],
      validation: {
        nameRequired: 'Nom requis',
        emailRequired: 'Email requis',
        emailInvalid: 'Email invalide',
        phoneRequired: 'Téléphone requis',
        subjectRequired: 'Sujet requis',
        serviceRequired: 'Service requis',
        messageRequired: 'Message requis',
        messageTooLong: 'Message trop long (max 5000 caractères)'
      },
      mobileMenu: 'Menu',
      closeMenu: 'Fermer',
      formSection: 'Formulaire de Contact',
      infoSection: 'Informations de Contact',
      mapSection: 'Carte de Localisation'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you with all your legal inquiries',
      form: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        service: 'Service Type',
        subject: 'Subject',
        message: 'Your Message',
        urgency: 'Urgency Level',
        submit: 'Send Message',
        success: 'Your message has been sent!',
        successSub: 'We will respond to you as soon as possible',
        loading: 'Sending...',
        error: 'An error occurred. Please try again.'
      },
      contact: {
        title: 'Contact Information',
        address: '123 Mohammed V Avenue, Casablanca, Morocco',
        phone: '+212 5 20 30 40 50',
        email: 'contact@legalfirm.ma',
        hours: 'Sunday - Thursday: 9:00 - 17:00',
        emergency: 'Emergency?',
        map: 'Location Map',
        emergencyPhone: '+212 6 10 20 30 40'
      },
      urgencyOptions: [
        { value: 'low', label: 'Low', color: 'from-green-400 to-green-500' },
        { value: 'normal', label: 'Normal', color: 'from-gray-300 to-gray-400' },
        { value: 'high', label: 'High', color: 'from-blue-400 to-blue-500' },
        { value: 'urgent', label: 'Urgent', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'Emergency', color: 'from-red-400 to-red-500' }
      ],
      validation: {
        nameRequired: 'Name required',
        emailRequired: 'Email required',
        emailInvalid: 'Invalid email',
        phoneRequired: 'Phone required',
        subjectRequired: 'Subject required',
        serviceRequired: 'Service required',
        messageRequired: 'Message required',
        messageTooLong: 'Message too long (max 5000 characters)'
      },
      mobileMenu: 'Menu',
      closeMenu: 'Close',
      formSection: 'Contact Form',
      infoSection: 'Contact Info',
      mapSection: 'Location Map'
    }
  };

  const current = contactInfo[language];

  // Check backend connection
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

  const validateForm = () => {
    const newErrors = {};
    const validation = current.validation;
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = validation.nameRequired;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = validation.emailRequired;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = validation.emailInvalid;
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = validation.phoneRequired;
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = validation.subjectRequired;
    }
    
    // Service validation
    if (!formData.serviceType || formData.serviceType === 'general') {
      newErrors.serviceType = validation.serviceRequired;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = validation.messageRequired;
    } else if (formData.message.length > 5000) {
      newErrors.message = validation.messageTooLong;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check backend connection
    if (backendStatus === 'disconnected') {
      toast.error(language === 'ar' ? 'الخادم غير متصل' : 
                  language === 'fr' ? 'Serveur déconnecté' : 
                  'Server disconnected', {
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      toast.error(language === 'ar' ? 'الرجاء تصحيح الأخطاء في النموذج' : 
                  language === 'fr' ? 'Veuillez corriger les erreurs dans le formulaire' : 
                  'Please correct errors in the form', {
        duration: 4000,
        icon: '⚠️',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare contact data matching the backend model
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        serviceType: formData.serviceType,
        urgency: formData.urgency,
        language: formData.language,
        source: 'contact_page',
        category: 'inquiry',
        status: 'new'
      };
      
      // Send to API
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || current.form.error);
      }
      
      // Show success message
      toast.success(current.form.success, {
        duration: 5000,
        icon: '✅',
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #86efac',
        },
      });
      
      setSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          serviceType: 'general',
          subject: '',
          message: '', 
          urgency: 'normal',
          language: language,
          source: 'contact_page'
        });
        setErrors({});
      }, 4000);
      
    } catch (error) {
      let errorMessage = current.form.error;
      
      if (error.message.includes('Missing required fields')) {
        errorMessage = language === 'ar' 
          ? 'الرجاء ملء جميع الحقول المطلوبة'
          : language === 'fr'
            ? 'Veuillez remplir tous les champs requis'
            : 'Please fill all required fields';
      } else if (error.message.includes('Invalid email format')) {
        errorMessage = language === 'ar' 
          ? 'بريد إلكتروني غير صالح'
          : language === 'fr'
            ? 'Email invalide'
            : 'Invalid email format';
      } else if (error.message.includes('Validation failed')) {
        errorMessage = language === 'ar' 
          ? 'الرجاء التحقق من المعلومات المدخلة'
          : language === 'fr'
            ? 'Veuillez vérifier les informations saisies'
            : 'Please check the information entered';
      } else if (error.message.includes('already exists')) {
        errorMessage = language === 'ar' 
          ? 'تم إرسال رسالة بنفس المعلومات مؤخراً'
          : language === 'fr'
            ? 'Un message avec les mêmes informations a été envoyé récemment'
            : 'A message with the same information was sent recently';
      }
      
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleUrgencyChange = (value) => {
    setFormData({
      ...formData,
      urgency: value
    });
  };

  // Mobile Navigation Menu
  const MobileNavigation = () => (
    <div className="lg:hidden fixed bottom-6 right-6 z-40">
      <div className="relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-14 h-14 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300"
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
                { id: 'form', label: current.formSection, icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'info', label: current.infoSection, icon: <Phone className="w-4 h-4" /> },
                { id: 'map', label: current.mapSection, icon: <MapPin className="w-4 h-4" /> },
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
                      ? 'bg-gradient-to-r from-[#c9a33e]/10 to-[#f0e6d2] text-[#c9a33e]'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={activeSection === item.id ? 'text-[#c9a33e]' : 'text-gray-500'}>
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
    <div className="relative min-h-screen bg-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      <Toaster 
        position={isMobile ? "top-center" : "top-right"}
        toastOptions={{
          style: {
            background: 'white',
            color: '#1f2937',
            border: '1px solid #c9a33e',
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
      
      {/* Connection Status */}
      {backendStatus === 'disconnected' && (
        <div className={`fixed ${isMobile ? 'top-2 right-2 left-2' : 'top-4 right-4'} z-50`}>
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between gap-2 animate-pulse">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
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
              {language === 'ar' ? 'إعادة المحاولة' : language === 'fr' ? 'Réessayer' : 'Retry'}
            </button>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(201, 163, 62, 0.2) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(201, 163, 62, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, x: 0 }}
              animate={{ 
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-[#c9a33e]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#c9a33e]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-[#f0e6d2]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={formRef} className="relative z-10 py-6 sm:py-8 lg:py-12 xl:py-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a33e]/10 to-[#f0e6d2] border border-[#c9a33e]/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a33e]" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wide">
                {current.title}
              </span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-gray-900 via-[#c9a33e] to-gray-900 bg-clip-text text-transparent">
                {current.title}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-3">
              {current.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              id="info"
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Emergency Banner */}
              <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-red-100 rounded-lg sm:rounded-xl">
                      <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <div className="font-bold text-red-700 text-sm sm:text-base lg:text-lg">{current.contact.emergency}</div>
                      <div className="text-xs sm:text-sm text-red-600 mt-0.5">
                        {language === 'ar' ? 'اتصل الآن:' : language === 'fr' ? 'Appelez maintenant:' : 'Call now:'} {current.contact.emergencyPhone}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={`tel:${current.contact.emergencyPhone}`}
                    className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-red-500/20 text-center"
                  >
                    {language === 'ar' ? 'اتصال' : language === 'fr' ? 'Appeler' : 'Call'}
                  </a>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                      {language === 'ar' ? 'اتصال هاتفي' : language === 'fr' ? 'Par téléphone' : 'By Phone'}
                    </h3>
                    <p className="text-[#c9a33e] font-mono text-sm sm:text-base lg:text-lg mb-1 truncate">{current.contact.phone}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === 'ar' ? 'الأحد - الخميس: 9 ص - 5 م' : language === 'fr' ? 'Dim - Jeu: 9h - 17h' : 'Sun - Thu: 9AM - 5PM'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                      {language === 'ar' ? 'بريد إلكتروني' : language === 'fr' ? 'Par email' : 'By Email'}
                    </h3>
                    <p className="text-[#c9a33e] font-mono text-xs sm:text-sm mb-1 truncate">{current.contact.email}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === 'ar' ? 'رد خلال 24 ساعة' : language === 'fr' ? 'Réponse sous 24h' : 'Response within 24h'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                      {language === 'ar' ? 'زيارتنا' : language === 'fr' ? 'Nous Visiter' : 'Visit Us'}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-1 leading-relaxed truncate">{current.contact.address.split(',')[0]}</p>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed truncate">{current.contact.address.split(',')[1]}</p>
                  </div>
                </motion.div>
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-1 sm:gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a33e]" />
                  <span>
                    {language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures de Bureau' : 'Office Hours'}
                  </span>
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'ar' ? 'الأحد - الخميس' : language === 'fr' ? 'Lundi - Vendredi' : 'Monday - Friday'}
                    </span>
                    <span className="font-medium text-gray-800 text-sm">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'ar' ? 'السبت' : language === 'fr' ? 'Samedi' : 'Saturday'}
                    </span>
                    <span className="font-medium text-gray-800 text-sm">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'ar' ? 'الأحد' : language === 'fr' ? 'Dimanche' : 'Sunday'}
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {language === 'ar' ? 'مغلق' : language === 'fr' ? 'Fermé' : 'Closed'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              id="form"
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-8 sm:py-10 md:py-12">
                    <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-full mb-4 sm:mb-6">
                      <CheckCircle className="text-[#c9a33e]" size={isMobile ? 36 : 48} />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                      {current.form.success}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
                      {current.form.successSub}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
                      <Loader2 size={14} className="animate-spin text-[#c9a33e]" />
                      <span>
                        {language === 'ar' ? 'سيتم إعادة تعيين النموذج تلقائياً' : language === 'fr' ? 'Réinitialisation automatique' : 'Auto-resetting form'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-lg sm:rounded-xl">
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {language === 'ar' ? 'أرسل رسالة' : language === 'fr' ? 'Envoyer un Message' : 'Send a Message'}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {language === 'ar' 
                            ? 'املأ النموذج وسنرد عليك في أقرب وقت'
                            : language === 'fr'
                            ? 'Remplissez le formulaire et nous vous répondrons dès que possible'
                            : 'Fill out the form and we\'ll get back to you as soon as possible'}
                        </p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                              <span>{current.form.name} *</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.name}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          />
                          {errors.name && (
                            <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                              <AlertCircle size={12} className="flex-shrink-0" />
                              <span>{errors.name}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                              <span>{current.form.email} *</span>
                            </div>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.email}
                            dir="ltr"
                          />
                          {errors.email && (
                            <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                              <AlertCircle size={12} className="flex-shrink-0" />
                              <span>{errors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Phone & Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                              <span>{current.form.phone} *</span>
                            </div>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.phone ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.phone}
                            dir="ltr"
                          />
                          {errors.phone && (
                            <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                              <AlertCircle size={12} className="flex-shrink-0" />
                              <span>{errors.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                              <span>{current.form.subject} *</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.subject ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={language === 'ar' ? 'موضوع رسالتك' : language === 'fr' ? 'Sujet de votre message' : 'Your message subject'}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          />
                          {errors.subject && (
                            <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                              <AlertCircle size={12} className="flex-shrink-0" />
                              <span>{errors.subject}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Service Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                            <span>{current.form.service} *</span>
                          </div>
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.serviceType ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300 appearance-none`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <option value="general" disabled>
                            {language === 'ar' ? 'اختر الخدمة' : language === 'fr' ? 'Choisir un Service' : 'Select a Service'}
                          </option>
                          {currentServices.map((service, index) => (
                            <option key={index} value={service.value}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && (
                          <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                            <AlertCircle size={12} className="flex-shrink-0" />
                            <span>{errors.serviceType}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Urgency Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                          {current.form.urgency}
                        </label>
                        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} sm:grid-cols-5 gap-2`}>
                          {current.urgencyOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleUrgencyChange(option.value)}
                              className={`py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ${
                                formData.urgency === option.value 
                                  ? `bg-gradient-to-r ${option.color} text-white ring-2 ring-offset-2 ring-offset-white ring-[#c9a33e]/20 shadow-md`
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e]" />
                            <span>{current.form.message} *</span>
                          </div>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={isMobile ? 4 : 6}
                          maxLength={5000}
                          className={`w-full bg-white border ${errors.message ? 'border-red-400' : 'border-gray-300'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 resize-none transition-all duration-300`}
                          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : language === 'fr' ? 'Écrivez votre message ici...' : 'Write your message here...'}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {errors.message && (
                          <div className="flex items-center gap-1 mt-1 sm:mt-2 text-red-500 text-xs sm:text-sm">
                            <AlertCircle size={12} className="flex-shrink-0" />
                            <span>{errors.message}</span>
                          </div>
                        )}
                        <div className="text-right text-xs text-gray-500 mt-1">
                          {formData.message.length}/5000
                        </div>
                      </div>
                      
                      {/* Privacy Note */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-[#f0e6d2] to-white backdrop-blur-sm border border-[#c9a33e]/30 rounded-lg sm:rounded-xl p-3 sm:p-4"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a33e] flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-gray-700">
                            {language === 'ar' 
                              ? 'نحن نحترم خصوصيتك. لن يتم مشاركة معلوماتك مع أي طرف ثالث.'
                              : language === 'fr'
                              ? 'Nous respectons votre vie privée. Vos informations ne seront pas partagées avec des tiers.'
                              : 'We respect your privacy. Your information will not be shared with any third party.'}
                          </p>
                        </div>
                      </motion.div>
                      
                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || backendStatus === 'disconnected'}
                        whileHover={{ scale: isMobile ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full overflow-hidden bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:shadow-xl sm:hover:shadow-2xl hover:shadow-[#c9a33e]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                          {isLoading && (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          )}
                          <span className="text-sm sm:text-lg">
                            {isLoading ? current.form.loading : current.form.submit}
                          </span>
                          {!isLoading && (
                            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 text-white ${isRTL ? 'rotate-180' : ''} ${isMobile ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                          )}
                        </div>
                        {isLoading && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-[#d4b357] to-[#e0c170]"
                          />
                        )}
                      </motion.button>
                    </form>
                  </>
                )}

                {/* Alternative Contact Methods */}
                <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  <a 
                    href="https://wa.me/212610203040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg sm:rounded-xl hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center shadow-sm"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <MessageSquare size={isMobile ? 16 : 20} />
                      <span className="font-semibold text-sm sm:text-base">WhatsApp</span>
                    </div>
                  </a>
                  
                  <a 
                    href={`tel:${current.contact.phone}`}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center shadow-sm"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <Phone size={isMobile ? 16 : 20} />
                      <span className="font-semibold text-sm sm:text-base">
                        {language === 'ar' ? 'اتصال هاتفي' : language === 'fr' ? 'Appel Téléphonique' : 'Phone Call'}
                      </span>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:contact@legalfirm.ma"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center shadow-sm"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      <Mail size={isMobile ? 16 : 20} />
                      <span className="font-semibold text-sm sm:text-base">Email</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            id="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 sm:mt-8 lg:mt-12 xl:mt-16"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              {/* Map Header */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-lg sm:rounded-xl text-white">
                      <Compass size={isMobile ? 20 : 24} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {current.contact.map}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        {language === 'ar' 
                          ? 'ابحث عنا في مركز الدار البيضاء المالي'
                          : language === 'fr'
                          ? 'Trouvez-nous au Casablanca Finance City'
                          : 'Find us at Casablanca Finance City'}
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Casablanca+Finance+City+Casablanca+Morocco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all shadow-sm text-sm sm:text-base"
                  >
                    <Maximize2 size={isMobile ? 16 : 18} />
                    <span>
                      {language === 'ar' ? 'افتح في خرائط جوجل' : language === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
                    </span>
                  </a>
                </div>
              </div>
              
              {/* Map Container */}
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Map Grid Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, rgba(201, 163, 62, 0.3) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(201, 163, 62, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }} />
                </div>
                
                {/* Center Marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-[#c9a33e]/30">
                      <MapPin className="text-white" size={isMobile ? 24 : 32} />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 sm:mt-2 px-3 py-1 sm:px-4 sm:py-2 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="font-semibold text-gray-900 whitespace-nowrap text-sm sm:text-base">
                        {language === 'ar' ? 'مكتب المحاماة' : language === 'fr' ? 'Cabinet d\'Avocats' : 'Law Office'}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {current.contact.address}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls Overlay */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 flex gap-1 sm:gap-2">
                  <button className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <span className="text-sm sm:text-base font-bold">+</span>
                  </button>
                  <button className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <span className="text-sm sm:text-base font-bold">-</span>
                  </button>
                  <button className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <Navigation size={isMobile ? 16 : 20} className="text-gray-700" />
                  </button>
                </div>
                
                {/* Location Info Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent p-3 sm:p-4 text-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <div>
                      <div className="font-semibold text-sm sm:text-base">{current.contact.address}</div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {language === 'ar' 
                          ? 'طابق 15، مكتب 1501 - قرب محطة ترامواي'
                          : language === 'fr'
                          ? 'Étage 15, Bureau 1501 - Près de la station de tramway'
                          : 'Floor 15, Office 1501 - Near tramway station'}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Clock size={isMobile ? 14 : 16} className="text-[#c9a33e]" />
                      <span className="text-xs sm:text-sm text-gray-700">{current.contact.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="text-[#c9a33e]" size={isMobile ? 20 : 24} />
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
                    {current.contact.map}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsMapOpen(false)}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 relative">
                {/* Full Screen Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-800 px-4">
                    <Globe size={isMobile ? 48 : 64} className="mx-auto mb-3 sm:mb-4 text-[#c9a33e]" />
                    <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{current.contact.address}</div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {language === 'ar' 
                        ? 'افتح في خرائط جوجل للعرض التفصيلي'
                        : language === 'fr'
                        ? 'Ouvrez dans Google Maps pour une vue détaillée'
                        : 'Open in Google Maps for detailed view'}
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Casablanca+Finance+City+Casablanca+Morocco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mt-4 sm:mt-6 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      <ExternalLink size={isMobile ? 16 : 18} />
                      <span>
                        {language === 'ar' ? 'افتح الخريطة الكاملة' : language === 'fr' ? 'Ouvrir la carte complète' : 'Open Full Map'}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;