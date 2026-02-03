// pages/AppointmentConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Calendar, Clock, User, Mail, Phone, 
  MapPin, Briefcase, Download, Printer, Home, 
  Copy, ExternalLink, Shield, Award, Sparkles,
  ArrowLeft, FileText, CreditCard, Bell
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AppointmentConfirmation({ language = 'fr' }) {
  const { referenceNumber } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    // Launch confetti on success
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/appointments/${referenceNumber}`);
        
        if (!response.ok) {
          throw new Error('Appointment not found');
        }
        
        const data = await response.json();
        setAppointment(data.data.appointment);
        
        // Trigger confetti when appointment is loaded
        setTimeout(launchConfetti, 300);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        toast.error(getErrorMessage('not_found'));
        setTimeout(() => navigate('/appointment'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (referenceNumber) {
      fetchAppointment();
    } else {
      navigate('/appointment');
    }
  }, [referenceNumber, navigate]);

  const getErrorMessage = (key) => {
    const messages = {
      ar: {
        not_found: 'الموعد غير موجود',
        copied: 'تم النسخ!',
        print: 'جاري الطباعة...',
        share: 'تم المشاركة!'
      },
      fr: {
        not_found: 'Rendez-vous non trouvé',
        copied: 'Copié!',
        print: 'Impression en cours...',
        share: 'Partagé!'
      },
      en: {
        not_found: 'Appointment not found',
        copied: 'Copied!',
        print: 'Printing...',
        share: 'Shared!'
      }
    };
    return messages[language]?.[key] || messages.fr[key];
  };

  const content = {
    ar: {
      title: 'تم تأكيد الحجز بنجاح 🎉',
      subtitle: 'ستتلقى تأكيدًا بالبريد الإلكتروني قريبًا',
      reference: 'رقم المرجع',
      appointmentDetails: 'تفاصيل الموعد',
      clientInfo: 'معلومات العميل',
      service: 'نوع الخدمة',
      date: 'التاريخ',
      time: 'الوقت',
      location: 'المكان',
      status: 'الحالة',
      download: 'تحميل التأكيد',
      print: 'طباعة',
      share: 'مشاركة',
      back: 'العودة للرئيسية',
      newBooking: 'حجز جديد',
      copy: 'نسخ الرقم',
      stepsTitle: 'الخطوات التالية',
      steps: [
        'سيصلك بريد إلكتروني للتأكيد خلال 24 ساعة',
        'يرجى الوصول قبل 10 دقائق من الموعد',
        'إحضار جميع المستندات ذات الصلة',
        'اتصل بنا إذا كنت بحاجة إلى إعادة الجدولة'
      ],
      tipsTitle: 'نصائح للموعد',
      tips: [
        'احضر هوية رسمية',
        'احضر جميع المستندات المتعلقة بالقضية',
        'كن مستعدًا لشرح حالة مفصلة',
        'اكتب أي أسئلة تريد طرحها مسبقًا'
      ],
      contactTitle: 'للتواصل',
      contact: 'المساعدة الفورية: +212 6 10 20 30 40'
    },
    fr: {
      title: 'Réservation Confirmée 🎉',
      subtitle: 'Vous recevrez une confirmation par email sous peu',
      reference: 'Numéro de Référence',
      appointmentDetails: 'Détails du Rendez-vous',
      clientInfo: 'Informations Client',
      service: 'Type de Service',
      date: 'Date',
      time: 'Heure',
      location: 'Lieu',
      status: 'Statut',
      download: 'Télécharger la Confirmation',
      print: 'Imprimer',
      share: 'Partager',
      back: 'Retour à l\'Accueil',
      newBooking: 'Nouvelle Réservation',
      copy: 'Copier le numéro',
      stepsTitle: 'Prochaines Étapes',
      steps: [
        'Email de confirmation dans les 24h',
        'Arrivez 10 minutes avant le rendez-vous',
        'Apportez tous les documents pertinents',
        'Contactez-nous pour reprogrammer'
      ],
      tipsTitle: 'Conseils pour le Rendez-vous',
      tips: [
        'Apportez une pièce d\'identité',
        'Tous les documents relatifs au dossier',
        'Préparez un récit détaillé de votre situation',
        'Listez vos questions à l\'avance'
      ],
      contactTitle: 'Pour Nous Contacter',
      contact: 'Assistance immédiate: +212 6 10 20 30 40'
    },
    en: {
      title: 'Booking Confirmed 🎉',
      subtitle: 'You will receive email confirmation shortly',
      reference: 'Reference Number',
      appointmentDetails: 'Appointment Details',
      clientInfo: 'Client Information',
      service: 'Service Type',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      status: 'Status',
      download: 'Download Confirmation',
      print: 'Print',
      share: 'Share',
      back: 'Back to Home',
      newBooking: 'New Booking',
      copy: 'Copy number',
      stepsTitle: 'Next Steps',
      steps: [
        'Confirmation email within 24h',
        'Arrive 10 minutes before appointment',
        'Bring all relevant documents',
        'Contact us to reschedule'
      ],
      tipsTitle: 'Appointment Tips',
      tips: [
        'Bring official ID',
        'All case-related documents',
        'Prepare detailed situation summary',
        'List your questions in advance'
      ],
      contactTitle: 'Contact Us',
      contact: 'Immediate assistance: +212 6 10 20 30 40'
    }
  };

  const current = content[language];
  const isRTL = language === 'ar';

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      toast.success(getErrorMessage('copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handlePrint = () => {
    toast.loading(getErrorMessage('print'));
    setTimeout(() => {
      window.print();
      toast.dismiss();
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: current.title,
        text: `My appointment reference: ${referenceNumber}`,
        url: window.location.href,
      }).then(() => toast.success(getErrorMessage('share')));
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getServiceName = (serviceType) => {
    const services = {
      ar: {
        legal_consultation: 'استشارة قانونية',
        notary_service: 'خدمة توثيق',
        contract_review: 'مراجعة عقود',
        court_representation: 'تمثيل قضائي',
        business_setup: 'تأسيس شركات',
        family_law: 'قانون أسرة',
        real_estate: 'عقارات',
        criminal_defense: 'دفاع جنائي',
        tax_law: 'قانون ضريبي',
        labor_law: 'قانون عمل',
        immigration: 'هجرة',
        intellectual_property: 'ملكية فكرية',
        other: 'أخرى'
      },
      fr: {
        legal_consultation: 'Consultation Juridique',
        notary_service: 'Service Notarial',
        contract_review: 'Revue de Contrat',
        court_representation: 'Représentation Judiciaire',
        business_setup: 'Création d\'Entreprise',
        family_law: 'Droit de la Famille',
        real_estate: 'Immobilier',
        criminal_defense: 'Défense Pénale',
        tax_law: 'Droit Fiscal',
        labor_law: 'Droit du Travail',
        immigration: 'Immigration',
        intellectual_property: 'Propriété Intellectuelle',
        other: 'Autre'
      },
      en: {
        legal_consultation: 'Legal Consultation',
        notary_service: 'Notary Service',
        contract_review: 'Contract Review',
        court_representation: 'Court Representation',
        business_setup: 'Business Setup',
        family_law: 'Family Law',
        real_estate: 'Real Estate',
        criminal_defense: 'Criminal Defense',
        tax_law: 'Tax Law',
        labor_law: 'Labor Law',
        immigration: 'Immigration',
        intellectual_property: 'Intellectual Property',
        other: 'Other'
      }
    };
    return services[language]?.[serviceType] || serviceType;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 relative">
            <CheckCircle className="absolute inset-0 m-auto w-8 h-8 text-yellow-600 animate-pulse" />
          </div>
          <p className="text-white text-lg animate-pulse">Loading your confirmation...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 p-4 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e40af',
            color: 'white',
            border: '1px solid #3b82f6',
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative mx-auto mb-6"
          >
            <div className="relative w-32 h-32">
              {/* Outer Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(34, 197, 94, 0.7)',
                    '0 0 0 20px rgba(34, 197, 94, 0)',
                    '0 0 0 40px rgba(34, 197, 94, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 bg-green-500 rounded-full"
              />
              
              {/* Main Circle */}
              <div className="absolute inset-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>

              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.cos(i * 45 * Math.PI / 180) * 60,
                    y: Math.sin(i * 45 * Math.PI / 180) * 60,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">
              {current.title}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {current.subtitle}
          </p>

          {/* Reference Number Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mt-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative px-8 py-6 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {current.reference}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-gray-900 font-mono tracking-tight">
                        {referenceNumber}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyReference}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                        copied
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {current.copy}
                      {copied && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-1"
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                      <Printer className="w-4 h-4" />
                      {current.print}
                    </motion.button>

                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {current.share}
                      </motion.button>

                      <AnimatePresence>
                        {showShareOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-10"
                          >
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Link copied!');
                                setShowShareOptions(false);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Appointment Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointment Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  {current.appointmentDetails}
                </h2>
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  appointment.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Date */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      {current.date}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors">
                      {formatDate(appointment.preferredDate)}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      {current.time}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors">
                      {appointment.preferredTime}
                    </div>
                  </div>

                  {/* Service */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Briefcase className="w-4 h-4" />
                      {current.service}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors">
                      {getServiceName(appointment.serviceType)}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {current.location}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors capitalize">
                      {appointment.location}
                    </div>
                  </div>

                  {/* Meeting Type */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <User className="w-4 h-4" />
                      {language === 'ar' ? 'نوع المقابلة' : language === 'fr' ? 'Type de Rendez-vous' : 'Meeting Type'}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 group-hover:border-blue-300 transition-colors capitalize">
                      {appointment.meetingType.replace('_', ' ')}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Bell className="w-4 h-4" />
                      {language === 'ar' ? 'مستوى الاستعجال' : language === 'fr' ? 'Niveau d\'Urgence' : 'Urgency Level'}
                    </div>
                    <div className={`text-2xl font-bold p-4 rounded-xl border capitalize ${
                      appointment.urgencyLevel === 'normal'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : appointment.urgencyLevel === 'urgent'
                        ? 'bg-orange-50 text-orange-800 border-orange-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {appointment.urgencyLevel}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Client Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                {current.clientInfo}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <User className="w-4 h-4" />
                      {language === 'ar' ? 'الاسم' : language === 'fr' ? 'Nom' : 'Name'}
                    </div>
                    <div className="text-xl font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {appointment.clientName}
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Phone className="w-4 h-4" />
                      {language === 'ar' ? 'الهاتف' : language === 'fr' ? 'Téléphone' : 'Phone'}
                    </div>
                    <div className="text-xl font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {appointment.clientPhone}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <Mail className="w-4 h-4" />
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                    </div>
                    <div className="text-xl font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {appointment.clientEmail}
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <CreditCard className="w-4 h-4" />
                      {language === 'ar' ? 'رقم الملف' : language === 'fr' ? 'Numéro de Dossier' : 'File Number'}
                    </div>
                    <div className="text-xl font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono">
                      {appointment._id?.slice(-8).toUpperCase() || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {appointment.message && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
                    <FileText className="w-4 h-4" />
                    {language === 'ar' ? 'الملاحظات' : language === 'fr' ? 'Notes' : 'Notes'}
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <p className="text-gray-700 leading-relaxed">{appointment.message}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-8">
            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {current.stepsTitle}
              </h3>
              <ul className="space-y-4">
                {current.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-semibold text-white">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                {current.tipsTitle}
              </h3>
              <ul className="space-y-3">
                {current.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <span className="text-gray-700 leading-relaxed text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                {current.contactTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {current.contact}
              </p>
              <button
                onClick={() => window.location.href = 'tel:+212610203040'}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {language === 'ar' ? 'اتصل الآن' : language === 'fr' ? 'Appeler Maintenant' : 'Call Now'}
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <button
                onClick={() => navigate('/appointment')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-yellow-600 text-yellow-600 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
              >
                <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                {current.newBooking}
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                {current.back}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl text-center"
        >
          <p className="text-white/90 text-lg">
            {language === 'ar' 
              ? 'شكرًا لثقتك بـ Legal Pro Morocco. نحن هنا لخدمتك على مدار الساعة.'
              : language === 'fr'
                ? 'Merci de votre confiance en Legal Pro Morocco. Nous sommes à votre service 24h/24.'
                : 'Thank you for trusting Legal Pro Morocco. We are here to serve you 24/7.'}
          </p>
          <p className="text-yellow-400 text-sm mt-2 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            {language === 'ar' 
              ? 'سرية تامة • خبراء معتمدون • دعم متواصل'
              : language === 'fr'
                ? 'Confidentialité Totale • Experts Certifiés • Support Continu'
                : 'Total Confidentiality • Certified Experts • Continuous Support'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AppointmentConfirmation;