import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  ChevronRight, CheckCircle, Shield, Sparkles, Star, 
  MapPin, Award, Briefcase, PhoneCall, ArrowRight,
  Building, FileText, BookOpen, GraduationCap, Scale,
  Loader2, ExternalLink
} from 'lucide-react';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Appointment = ({ language = 'fr' }) => {
  const [loading, setLoading] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load availability when date changes
  useEffect(() => {
    if (formData.preferredDate) {
      fetchAvailability(formData.preferredDate);
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
      successMessage: 'تم طلب الموعد بنجاح! سنتواصل معك قريباً للتأكيد.',
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
      ]
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
      successMessage: 'Rendez-vous demandé avec succès ! Nous vous contacterons pour confirmation.',
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
      ]
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
      successMessage: 'Appointment requested successfully! We will contact you shortly for confirmation.',
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
      ]
    }
  };

  const current = content[language];
  const isRTL = language === 'ar';

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Reset time when date changes
    if (name === 'preferredDate') {
      setFormData(prev => ({
        ...prev,
        preferredTime: '',
        [name]: value,
      }));
    }
  };

  const fetchAvailability = async (date) => {
    try {
      setLoadingAvailability(true);
      const response = await fetch(`${API_BASE_URL}/appointments/availability/slots?date=${date}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }
      
      const data = await response.json();
      setAvailability(data.data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for API
      const appointmentData = {
        ...formData,
        language: language,
        preferredDate: new Date(formData.preferredDate).toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || current.errorMessage);
      }

      // Success - show success toast with reference number
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-green-50 to-emerald-100 shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-green-200`}
        >
          <div className="flex-1 w-0 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {current.bookingSuccess} 🎉
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {current.successMessage}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {current.bookingReference}: <span className="font-mono text-emerald-700">{data.data.referenceNumber}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'ar' 
                      ? 'سيصلك بريد إلكتروني بتفاصيل الحجز'
                      : language === 'fr'
                        ? 'Un email avec les détails vous sera envoyé'
                        : 'An email with booking details will be sent to you'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => {
                  // Copy reference number to clipboard
                  navigator.clipboard.writeText(data.data.referenceNumber);
                  toast.success('Copied to clipboard!');
                }}
                className="flex-1 inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {language === 'ar' ? 'نسخ الرقم المرجعي' : language === 'fr' ? 'Copier le numéro' : 'Copy Reference'}
              </button>
             <button
  onClick={() => {
    // Open confirmation page in new tab
    window.open(`/appointment-confirmation/${data.data.referenceNumber}`, '_blank');
  }}
  className="flex-1 inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-sm font-medium text-white hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
>
  {current.viewDetails}
  <ExternalLink className="ml-2 w-4 h-4" />
</button>
            </div>
          </div>
        </motion.div>
      ), {
        duration: 8000,
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

    } catch (error) {
      console.error('Appointment error:', error);
      
      // Enhanced error handling
      let errorMessage = current.errorMessage;
      
      if (error.message.includes('already booked')) {
        errorMessage = language === 'ar' 
          ? 'هذا الوقت محجوز بالفعل. يرجى اختيار وقت آخر.'
          : language === 'fr'
            ? 'Ce créneau est déjà réservé. Veuillez choisir un autre horaire.'
            : 'This time slot is already booked. Please choose another time.';
      } else if (error.message.includes('Validation failed')) {
        errorMessage = language === 'ar'
          ? 'الرجاء التحقق من المعلومات المدخلة'
          : language === 'fr'
            ? 'Veuillez vérifier les informations saisies'
            : 'Please check the information entered';
      }
      
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate next 7 days for date picker
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #c9a33e 2px, transparent 0%)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-900/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-yellow-200/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 rounded-full px-6 py-3 mb-8">
              <div className="relative">
                <Calendar className="w-5 h-5 text-yellow-700" />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-yellow-800 tracking-wide">
                {current.title}
              </span>
              <Star className="w-4 h-4 text-yellow-600" />
            </div>

            {/* Title & Description */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-yellow-600 to-gray-900 bg-clip-text text-transparent">
                  {current.title}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {current.subtitle}
              </p>
              
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {current.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            color: '#1f2937',
            border: '1px solid #d97706',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
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

      <div className="relative z-10 py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'ar' ? 'معلومات الحجز' : language === 'fr' ? 'Informations de Réservation' : 'Booking Information'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-yellow-700" />
                          <span>{current.nameLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder={language === 'ar' ? 'ادخل اسمك الكامل' : 'Enter your full name'}
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-yellow-700" />
                          <span>{current.phoneLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder="+212 6 XX XX XX XX"
                        disabled={loading}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-yellow-700" />
                          <span>{current.emailLabel} *</span>
                        </div>
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                        placeholder="your@email.com"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-yellow-700" />
                        <span>{current.serviceLabel} *</span>
                      </div>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {current.services.map((service) => (
                        <motion.button
                          key={service.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                          disabled={loading}
                          className={`group relative overflow-hidden border rounded-xl p-4 text-center transition-all duration-300 ${
                            formData.serviceType === service.value
                              ? 'border-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md'
                              : 'border-gray-200 bg-white hover:border-yellow-400 hover:bg-gray-50'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div className="relative z-10">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${
                              formData.serviceType === service.value
                                ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                                : 'bg-gray-100 group-hover:bg-yellow-50'
                            }`}>
                              <div className={formData.serviceType === service.value ? 'text-white' : 'text-gray-600 group-hover:text-yellow-600'}>
                                {service.icon}
                              </div>
                            </div>
                            <div className={`text-sm font-medium ${
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-700" />
                        <span>{current.dateLabel} *</span>
                      </div>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {getNextDays().map((date, index) => {
                        const dateObj = new Date(date);
                        const isToday = index === 0;
                        const isSelected = formData.preferredDate === date;
                        
                        return (
                          <motion.button
                            key={date}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => !loading && setFormData(prev => ({ ...prev, preferredDate: date }))}
                            disabled={loading}
                            className={`relative overflow-hidden border rounded-xl p-4 text-center transition-all duration-300 ${
                              isSelected
                                ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-blue-800 text-white'
                                : 'border-gray-200 bg-white hover:border-yellow-400 hover:bg-gray-50'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="relative z-10">
                              <div className={`text-2xl font-bold ${
                                isSelected ? 'text-white' : 'text-gray-900'
                              }`}>
                                {dateObj.getDate()}
                              </div>
                              <div className={`text-xs ${
                                isSelected ? 'text-white/90' : 'text-gray-600'
                              }`}>
                                {dateObj.toLocaleDateString(language, { weekday: 'short' })}
                              </div>
                              {isToday && (
                                <div className="absolute -top-1 -right-1">
                                  <Sparkles className="w-3 h-3 text-yellow-500" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection with Availability */}
                  {formData.preferredDate && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-700" />
                            <span>{current.timeLabel} *</span>
                          </div>
                        </label>
                        {loadingAvailability && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {current.loadingAvailability}
                          </div>
                        )}
                      </div>
                      
                      {availability.length === 0 && !loadingAvailability ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                          <p className="text-yellow-700 text-sm">
                            {current.noSlotsAvailable}
                          </p>
                          <p className="text-yellow-600 text-xs mt-1">
                            {language === 'ar' 
                              ? 'يرجى اختيار تاريخ آخر'
                              : language === 'fr'
                                ? 'Veuillez choisir une autre date'
                                : 'Please choose another date'}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => {
                            const isAvailable = availability.includes(time);
                            const isSelected = formData.preferredTime === time;
                            
                            return (
                              <motion.button
                                key={time}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => isAvailable && !loading && setFormData(prev => ({ ...prev, preferredTime: time }))}
                                disabled={!isAvailable || loading}
                                className={`border rounded-xl py-3 text-sm transition-all duration-300 ${
                                  !isAvailable
                                    ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                    : isSelected
                                      ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-blue-800 text-white'
                                      : 'border-gray-200 bg-white text-gray-700 hover:border-yellow-400 hover:text-gray-900 hover:bg-gray-50'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {time}
                                {!isAvailable && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {language === 'ar' ? 'محجوز' : language === 'fr' ? 'Réservé' : 'Booked'}
                                  </div>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                      
                      {availability.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          {language === 'ar' 
                            ? `${availability.length} وقت متاح`
                            : language === 'fr'
                              ? `${availability.length} créneaux disponibles`
                              : `${availability.length} slots available`}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Additional Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Meeting Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {current.meetingType}
                      </label>
                      <select
                        name="meetingType"
                        value={formData.meetingType}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                      >
                        {current.meetingTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {current.locationLabel}
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
                      >
                        {current.locations.map((location) => (
                          <option key={location.value} value={location.value}>
                            {location.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Urgency Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {current.urgencyLabel}
                      </label>
                      <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-yellow-700" />
                        <span>{current.messageLabel}</span>
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      disabled={loading}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300 resize-none"
                      placeholder={language === 'ar' ? 'أخبرنا المزيد عن حالتك...' : 'Tell us more about your case...'}
                    />
                  </div>

                  {/* Privacy Note */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {current.privacyNote}
                      </p>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || !formData.preferredDate || !formData.preferredTime}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-lg">{current.submitLoading}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">{current.submitButton}</span>
                          <ChevronRight className={`w-5 h-5 text-white ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1`} />
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

            {/* Right Column - Contact Info & Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2 space-y-8"
            >
              {/* Emergency Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                      <PhoneCall className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div>
                      <div className="font-bold text-red-700 text-lg">{current.emergency}</div>
                      <div className="text-sm text-red-600 mt-1">
                        +212 6 10 20 30 40
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => window.location.href = 'tel:+212610203040'}
                  >
                    {current.emergencyContact}
                  </motion.button>
                </div>
              </motion.div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{current.phoneContact}</h3>
                    <p className="text-yellow-600 font-mono text-lg mb-1">+212 5 20 30 40 50</p>
                    <p className="text-sm text-gray-500">{current.phoneHours}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{current.emailContact}</h3>
                    <p className="text-yellow-600 font-mono text-sm mb-1">rdv@legalpromaroc.ma</p>
                    <p className="text-sm text-gray-500">{current.emailResponse}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{language === 'ar' ? 'زيارتنا' : language === 'fr' ? 'Nous Visiter' : 'Visit Us'}</h3>
                    <p className="text-gray-700 text-sm mb-1 leading-relaxed">123 Avenue Mohammed V</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Casablanca, Maroc</p>
                  </div>
                </motion.div>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>{current.whyChooseUs}</span>
                </h3>
                <div className="space-y-4">
                  {current.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                        <div className="text-white">
                          {React.cloneElement(feature.icon, { size: 18 })}
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures de Bureau' : 'Office Hours'}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'الأحد - الخميس' : language === 'fr' ? 'Lundi - Vendredi' : 'Monday - Friday'}
                    </span>
                    <span className="font-medium text-gray-900">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'السبت' : language === 'fr' ? 'Samedi' : 'Saturday'}
                    </span>
                    <span className="font-medium text-gray-900">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 leading-relaxed">
                      {language === 'ar' ? 'الأحد' : language === 'fr' ? 'Dimanche' : 'Sunday'}
                    </span>
                    <span className="font-medium text-gray-900">{language === 'ar' ? 'مغلق' : language === 'fr' ? 'Fermé' : 'Closed'}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'كيفية حجز موعد' : language === 'fr' ? 'Comment Réserver un Rendez-vous' : 'How to Book an Appointment'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'عملية سهلة ومباشرة في 4 خطوات فقط'
                : language === 'fr' 
                  ? 'Un processus simple et direct en seulement 4 étapes'
                  : 'A simple and direct process in just 4 steps'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '01', title: language === 'ar' ? 'املأ النموذج' : language === 'fr' ? 'Remplir le Formulaire' : 'Fill the Form', icon: <User className="w-6 h-6" /> },
              { number: '02', title: language === 'ar' ? 'اختر الوقت' : language === 'fr' ? 'Choisir l\'Horaire' : 'Choose Time', icon: <Calendar className="w-6 h-6" /> },
              { number: '03', title: language === 'ar' ? 'تأكيد الحجز' : language === 'fr' ? 'Confirmer la Réservation' : 'Confirm Booking', icon: <CheckCircle className="w-6 h-6" /> },
              { number: '04', title: language === 'ar' ? 'مقابلة الخبير' : language === 'fr' ? 'Rencontrer l\'Expert' : 'Meet Expert', icon: <GraduationCap className="w-6 h-6" /> },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 hover:border-yellow-200">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-500 to-yellow-600' : 'from-blue-700 to-blue-800'} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                    {step.number}
                  </div>
                  <div className="mb-4">
                    <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-50 to-yellow-100' : 'from-blue-50 to-blue-100'} rounded-xl flex items-center justify-center`}>
                      <div className={index % 2 === 0 ? 'text-yellow-600' : 'text-blue-700'}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{step.title}</h3>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
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