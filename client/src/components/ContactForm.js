import { useState, useRef } from 'react';
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
  PhoneCall
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

// Import your API service
// If you don't have one, create api.js file in src/services/
import api from '../services/api'; // Adjust path as needed (default export)

const ContactForm = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    urgency: 'normal'
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMapOpen, setIsMapOpen] = useState(false);
  const formRef = useRef(null);

  const isRTL = language === 'ar';

  const services = {
    ar: [
      { name: 'القانون المدني', icon: <Home size={20} /> },
      { name: 'القانون التجاري', icon: <Briefcase size={20} /> },
      { name: 'قانون العقار', icon: <Key size={20} /> },
      { name: 'القانون الإداري', icon: <Landmark size={20} /> },
      { name: 'قانون السير', icon: <Car size={20} /> },
      { name: 'قانون الأسرة', icon: <Heart size={20} /> }
    ],
    fr: [
      { name: 'Droit Civil', icon: <Home size={20} /> },
      { name: 'Droit Commercial', icon: <Briefcase size={20} /> },
      { name: 'Droit Immobilier', icon: <Key size={20} /> },
      { name: 'Droit Administratif', icon: <Landmark size={20} /> },
      { name: 'Droit Routier', icon: <Car size={20} /> },
      { name: 'Droit de la Famille', icon: <Heart size={20} /> }
    ],
    en: [
      { name: 'Civil Law', icon: <Home size={20} /> },
      { name: 'Commercial Law', icon: <Briefcase size={20} /> },
      { name: 'Real Estate Law', icon: <Key size={20} /> },
      { name: 'Administrative Law', icon: <Landmark size={20} /> },
      { name: 'Traffic Law', icon: <Car size={20} /> },
      { name: 'Family Law', icon: <Heart size={20} /> }
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
        message: 'رسالتك',
        urgency: 'درجة الاستعجال',
        submit: 'إرسال الرسالة',
        success: 'تم إرسال رسالتك بنجاح!',
        successSub: 'سنرد عليك في أقرب وقت ممكن',
        loading: 'جاري الإرسال...'
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
        { value: 'normal', label: 'عادي', color: 'from-gray-300 to-gray-400' },
        { value: 'urgent', label: 'عاجل', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'طارئ', color: 'from-red-400 to-red-500' }
      ]
    },
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Nous sommes ici pour vous aider avec toutes vos questions juridiques',
      form: {
        name: 'Nom Complet',
        email: 'Email',
        phone: 'Téléphone',
        service: 'Type de Service',
        message: 'Votre Message',
        urgency: 'Niveau d\'Urgence',
        submit: 'Envoyer le Message',
        success: 'Votre message a été envoyé!',
        successSub: 'Nous vous répondrons dans les plus brefs délais',
        loading: 'Envoi en cours...'
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
        { value: 'normal', label: 'Normal', color: 'from-gray-300 to-gray-400' },
        { value: 'urgent', label: 'Urgent', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'Urgence', color: 'from-red-400 to-red-500' }
      ]
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you with all your legal inquiries',
      form: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        service: 'Service Type',
        message: 'Your Message',
        urgency: 'Urgency Level',
        submit: 'Send Message',
        success: 'Your message has been sent!',
        successSub: 'We will respond to you as soon as possible',
        loading: 'Sending...'
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
        { value: 'normal', label: 'Normal', color: 'from-gray-300 to-gray-400' },
        { value: 'urgent', label: 'Urgent', color: 'from-yellow-400 to-yellow-500' },
        { value: 'emergency', label: 'Emergency', color: 'from-red-400 to-red-500' }
      ]
    }
  };

  const current = contactInfo[language];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'ar' ? 'الاسم مطلوب' : language === 'fr' ? 'Nom requis' : 'Name required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : language === 'fr' ? 'Email requis' : 'Email required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'بريد إلكتروني غير صالح' : language === 'fr' ? 'Email invalide' : 'Invalid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : language === 'fr' ? 'Téléphone requis' : 'Phone required';
    }
    
    if (!formData.service) {
      newErrors.service = language === 'ar' ? 'الخدمة مطلوبة' : language === 'fr' ? 'Service requis' : 'Service required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = language === 'ar' ? 'الرسالة مطلوبة' : language === 'fr' ? 'Message requis' : 'Message required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  setIsLoading(true);
  
  try {
    // Prepare contact data
    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: formData.service,
      serviceType: formData.service,
      urgency: formData.urgency,
      language: language,
      source: 'contact_page'
    };
    
    console.log('📧 Submitting contact form:', contactData);
    
    // Send to API using ApiService
    const response = await api.submitContact(contactData);
    
    console.log('✅ Contact form submitted successfully:', response);
    
    // Show success message
    toast.success(current.form.success, {
      duration: 4000,
      position: 'top-right',
      icon: '✅',
      style: {
        background: '#10B981',
        color: 'white',
      }
    });
    
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        service: '', 
        message: '', 
        urgency: 'normal' 
      });
      setErrors({});
    }, 4000);
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    let errorMessage = current.form.error || 'Failed to send message';
    
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
    }
    
    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-right',
      icon: '❌',
      style: {
        background: '#EF4444',
        color: 'white',
      }
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

  return (
    <div className="relative min-h-screen bg-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            border: '1px solid #c9a33e',
            padding: '16px',
            fontSize: '14px',
          },
        }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(201, 163, 62, 0.2) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(201, 163, 62, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#c9a33e]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#f0e6d2]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={formRef} className="relative z-10 py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a33e]/10 to-[#f0e6d2] border border-[#c9a33e]/20 rounded-full px-6 py-3 mb-6">
              <MessageSquare className="w-5 h-5 text-[#c9a33e]" />
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                {current.title}
              </span>
              <Sparkles className="w-4 h-4 text-[#c9a33e]" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-[#c9a33e] to-gray-900 bg-clip-text text-transparent">
                {current.title}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {current.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Emergency Banner */}
              <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <PhoneCall className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <div className="font-bold text-red-700 text-lg">{current.contact.emergency}</div>
                      <div className="text-sm text-red-600 mt-1">
                        {language === 'ar' ? 'اتصل الآن:' : language === 'fr' ? 'Appelez maintenant:' : 'Call now:'} {current.contact.emergencyPhone}
                      </div>
                    </div>
                  </div>
                  <a 
                    href={`tel:${current.contact.emergencyPhone}`}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/20"
                  >
                    {language === 'ar' ? 'اتصال' : language === 'fr' ? 'Appeler' : 'Call'}
                  </a>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {language === 'ar' ? 'اتصال هاتفي' : language === 'fr' ? 'Par téléphone' : 'By Phone'}
                    </h3>
                    <p className="text-[#c9a33e] font-mono text-lg mb-1">{current.contact.phone}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'الأحد - الخميس: 9 ص - 5 م' : language === 'fr' ? 'Dim - Jeu: 9h - 17h' : 'Sun - Thu: 9AM - 5PM'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {language === 'ar' ? 'بريد إلكتروني' : language === 'fr' ? 'Par email' : 'By Email'}
                    </h3>
                    <p className="text-[#c9a33e] font-mono text-sm mb-1">{current.contact.email}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'رد خلال 24 ساعة' : language === 'fr' ? 'Réponse sous 24h' : 'Response within 24h'}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:border-[#c9a33e]/40 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-[#c9a33e]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {language === 'ar' ? 'زيارتنا' : language === 'fr' ? 'Nous Visiter' : 'Visit Us'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{current.contact.address.split(',')[0]}</p>
                    <p className="text-gray-500 text-sm">{current.contact.address.split(',')[1]}</p>
                  </div>
                </motion.div>
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#c9a33e]" />
                  <span>
                    {language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures de Bureau' : 'Office Hours'}
                  </span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {language === 'ar' ? 'الأحد - الخميس' : language === 'fr' ? 'Lundi - Vendredi' : 'Monday - Friday'}
                    </span>
                    <span className="font-medium text-gray-800">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {language === 'ar' ? 'السبت' : language === 'fr' ? 'Samedi' : 'Saturday'}
                    </span>
                    <span className="font-medium text-gray-800">9:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {language === 'ar' ? 'الأحد' : language === 'fr' ? 'Dimanche' : 'Sunday'}
                    </span>
                    <span className="font-medium text-gray-800">
                      {language === 'ar' ? 'مغلق' : language === 'fr' ? 'Fermé' : 'Closed'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-10 md:py-12">
                    <div className="inline-flex p-4 bg-gradient-to-br from-[#c9a33e]/10 to-[#f0e6d2] rounded-full mb-6">
                      <CheckCircle className="text-[#c9a33e]" size={48} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {current.form.success}
                    </h3>
                    <p className="text-gray-600 text-lg mb-8">
                      {current.form.successSub}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Loader2 size={16} className="animate-spin text-[#c9a33e]" />
                      <span>
                        {language === 'ar' ? 'سيتم إعادة التوجيه تلقائياً' : language === 'fr' ? 'Redirection automatique' : 'Auto-redirecting'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-xl">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {language === 'ar' ? 'أرسل رسالة' : language === 'fr' ? 'Envoyer un Message' : 'Send a Message'}
                        </h3>
                        <p className="text-gray-600">
                          {language === 'ar' 
                            ? 'املأ النموذج وسنرد عليك في أقرب وقت'
                            : language === 'fr'
                            ? 'Remplissez le formulaire et nous vous répondrons dès que possible'
                            : 'Fill out the form and we\'ll get back to you as soon as possible'}
                        </p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-[#c9a33e]" />
                              <span>{current.form.name} *</span>
                            </div>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.name}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          />
                          {errors.name && (
                            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                              <AlertCircle size={14} />
                              <span>{errors.name}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#c9a33e]" />
                              <span>{current.form.email} *</span>
                            </div>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.email}
                            dir="ltr"
                          />
                          {errors.email && (
                            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                              <AlertCircle size={14} />
                              <span>{errors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Phone & Service */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#c9a33e]" />
                              <span>{current.form.phone} *</span>
                            </div>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.phone ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300`}
                            placeholder={current.form.phone}
                            dir="ltr"
                          />
                          {errors.phone && (
                            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                              <AlertCircle size={14} />
                              <span>{errors.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-[#c9a33e]" />
                              <span>{current.form.service} *</span>
                            </div>
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.service ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 transition-all duration-300 appearance-none`}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          >
                            <option value="" disabled>
                              {language === 'ar' ? 'اختر الخدمة' : language === 'fr' ? 'Choisir un Service' : 'Select a Service'}
                            </option>
                            {currentServices.map((service, index) => (
                              <option key={index} value={service.name}>
                                {service.name}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                              <AlertCircle size={14} />
                              <span>{errors.service}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Urgency Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {current.form.urgency}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {current.urgencyOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleUrgencyChange(option.value)}
                              className={`py-3 rounded-xl font-medium transition-all duration-300 ${
                                formData.urgency === option.value 
                                  ? `bg-gradient-to-r ${option.color} text-white ring-2 ring-offset-2 ring-offset-white ring-[#c9a33e]/20`
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#c9a33e]" />
                            <span>{current.form.message}</span>
                          </div>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full bg-white border ${errors.message ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a33e] focus:ring-2 focus:ring-[#c9a33e]/20 resize-none transition-all duration-300`}
                          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : language === 'fr' ? 'Écrivez votre message ici...' : 'Write your message here...'}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {errors.message && (
                          <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                            <AlertCircle size={14} />
                            <span>{errors.message}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Privacy Note */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-[#f0e6d2] to-white backdrop-blur-sm border border-[#c9a33e]/30 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-[#c9a33e] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">
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
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full overflow-hidden bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-[#c9a33e]/40 transition-all duration-300"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {isLoading && (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          )}
                          <span className="text-lg">
                            {isLoading ? current.form.loading : current.form.submit}
                          </span>
                          {!isLoading && (
                            <ArrowRight className={`w-5 h-5 text-white ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1`} />
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
              </div>

              {/* Alternative Contact Methods */}
              <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="https://wa.me/212610203040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 p-4 text-center shadow-sm"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <MessageSquare size={20} />
                    <span className="font-semibold">WhatsApp</span>
                  </div>
                </a>
                
                <a 
                  href={`tel:${current.contact.phone}`}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 p-4 text-center shadow-sm"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Phone size={20} />
                    <span className="font-semibold">
                      {language === 'ar' ? 'اتصال هاتفي' : language === 'fr' ? 'Appel Téléphonique' : 'Phone Call'}
                    </span>
                  </div>
                </a>
                
                <a 
                  href="mailto:contact@legalfirm.ma"
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 p-4 text-center shadow-sm"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Mail size={20} />
                    <span className="font-semibold">Email</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 lg:mt-16"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
              {/* Map Header */}
              <div className="p-6 md:p-8 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-xl text-white">
                      <Compass size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {current.contact.map}
                      </h3>
                      <p className="text-gray-600 mt-1">
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold rounded-xl hover:shadow-lg transition-all shadow-sm"
                  >
                    <Maximize2 size={18} />
                    <span>
                      {language === 'ar' ? 'افتح في خرائط جوجل' : language === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
                    </span>
                  </a>
                </div>
              </div>
              
              {/* Map Container */}
              <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Map Grid Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, rgba(201, 163, 62, 0.3) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(201, 163, 62, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                  }} />
                </div>
                
                {/* Center Marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-[#c9a33e]/30">
                      <MapPin className="text-white" size={32} />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="font-semibold text-gray-900 whitespace-nowrap">
                        {language === 'ar' ? 'مكتب المحاماة' : language === 'fr' ? 'Cabinet d\'Avocats' : 'Law Office'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {current.contact.address}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <span className="text-lg font-bold">+</span>
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <span className="text-lg font-bold">-</span>
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-gray-700">
                    <Navigation size={20} className="text-gray-700" />
                  </button>
                </div>
                
                {/* Location Info Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent p-4 text-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold">{current.contact.address}</div>
                      <div className="text-sm text-gray-600">
                        {language === 'ar' 
                          ? 'طابق 15، مكتب 1501 - قرب محطة ترامواي'
                          : language === 'fr'
                          ? 'Étage 15, Bureau 1501 - Près de la station de tramway'
                          : 'Floor 15, Office 1501 - Near tramway station'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#c9a33e]" />
                      <span className="text-sm text-gray-700">{current.contact.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#c9a33e]" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">
                  {current.contact.map}
                </h3>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 relative">
              {/* Full Screen Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-800">
                  <Globe size={64} className="mx-auto mb-4 text-[#c9a33e]" />
                  <div className="text-2xl font-bold mb-2">{current.contact.address}</div>
                  <p className="text-gray-600">
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
                    className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={18} />
                    <span>
                      {language === 'ar' ? 'افتح الخريطة الكاملة' : language === 'fr' ? 'Ouvrir la carte complète' : 'Open Full Map'}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;