import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Scale, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  Target,
  ArrowRight,
  ChevronRight,
  Phone,
  Play,
  Star,
  Sparkles,
  Video,
  Volume2,
  MessageCircle,
  Calendar,
  FileText
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Hero = ({ language = 'ar' }) => {
  const [mounted, setMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      setIsVideoPlaying(false);
    }, 60000);
  }, []);

  const content = {
    ar: {
      title: 'مكتب المحاماة المتخصص',
      subtitle: 'نقدم الاستشارات القانونية والحلول القضائية المثلى',
      description: 'خبرة تمتد لأكثر من 15 سنة في المجال القانوني مع فريق من المحامين المتخصصين في مختلف المجالات القانونية بالمغرب.',
      cta: 'احجز استشارة مجانية',
      ctaSecondary: 'تواصل معنا',
      certified: 'مكتب قانوني معتمد',
      features: [
        { icon: <Shield />, text: 'سرية تامة', desc: 'حماية كاملة لبياناتك' },
        { icon: <Users />, text: 'فريق متخصص', desc: 'محامون ذوو خبرة' },
        { icon: <Award />, text: 'جودة عالية', desc: 'أفضل النتائج' },
        { icon: <Clock />, text: 'سرعة الاستجابة', desc: 'دعم 24/7' },
        { icon: <CheckCircle />, text: 'ضمان النجاح', desc: 'خطط مضمونة' },
        { icon: <Target />, text: 'تخصص دقيق', desc: 'حلول مخصصة' },
      ],
      stats: [
        { number: 500, label: 'قضية ناجحة', suffix: '+' },
        { number: 15, label: 'سنة خبرة', suffix: '+' },
        { number: 98, label: 'رضا العملاء', suffix: '%' },
        { number: 50, label: 'عميل دائم', suffix: '+' },
        { number: 1000, label: 'ساعة استشارة', suffix: '+' },
        { number: 120, label: 'قضية سنوياً', suffix: '+' },
      ],
      videoCta: 'شاهد كيف نعمل',
      appointment: 'حجز موعد',
      emergency: 'حالة طارئة؟',
      scroll: 'مرر لأسفل',
      testimonialName: 'محمد العمراني',
      testimonialRole: 'مدير شركة',
      testimonialText: 'مكتب ممتاز! حصلت على أفضل خدمة قانونية في مشروعي العقاري',
      videoDuration: 'دقيقة واحدة',
      emergencyNumber: '+212 6 XX XX XX XX',
      playVideo: 'تشغيل الفيديو',
      watching: 'يشاهد الآن',
      viewers: '245+ مشاهد',
      soundOn: 'تشغيل الصوت',
      quickActions: [
        { icon: <MessageCircle />, text: 'محادثة فورية', color: 'from-green-500 to-emerald-600' },
        { icon: <Calendar />, text: 'حجز موعد', color: 'from-blue-500 to-cyan-600' },
        { icon: <FileText />, text: 'طلب استشارة', color: 'from-purple-500 to-pink-600' },
      ]
    },
    fr: {
      title: 'Cabinet d\'Avocats Spécialisé',
      subtitle: 'Conseils juridiques et solutions judiciaires optimales',
      description: 'Plus de 15 ans d\'expérience dans le domaine juridique avec une équipe d\'avocats spécialisés dans divers domaines du droit marocain.',
      cta: 'Prendre un Rendez-vous',
      ctaSecondary: 'Nous Contacter',
      certified: 'Cabinet Juridique Agréé',
      features: [
        { icon: <Shield />, text: 'Confidentialité Totale', desc: 'Protection complète' },
        { icon: <Users />, text: 'Équipe Spécialisée', desc: 'Avocats expérimentés' },
        { icon: <Award />, text: 'Haute Qualité', desc: 'Meilleurs résultats' },
        { icon: <Clock />, text: 'Rapidité', desc: 'Support 24/7' },
        { icon: <CheckCircle />, text: 'Succès Garanti', desc: 'Plans assurés' },
        { icon: <Target />, text: 'Expertise Précise', desc: 'Solutions sur mesure' },
      ],
      stats: [
        { number: 500, label: 'Cas Réussis', suffix: '+' },
        { number: 15, label: 'Ans d\'Expérience', suffix: '+' },
        { number: 98, label: 'Satisfaction Client', suffix: '%' },
        { number: 50, label: 'Clients Fidèles', suffix: '+' },
        { number: 1000, label: 'Heures de Conseil', suffix: '+' },
        { number: 120, label: 'Cas par An', suffix: '+' },
      ],
      videoCta: 'Voir Comment Nous Travaillons',
      appointment: 'Prendre Rendez-vous',
      emergency: 'Cas d\'Urgence?',
      scroll: 'Défilez vers le bas',
      testimonialName: 'Mohamed El Amrani',
      testimonialRole: 'Directeur d\'Entreprise',
      testimonialText: 'Cabinet excellent! J\'ai obtenu le meilleur service juridique pour mon projet immobilier',
      videoDuration: '1 minute',
      emergencyNumber: '+212 6 XX XX XX XX',
      playVideo: 'Lire la Vidéo',
      watching: 'En train de regarder',
      viewers: '245+ spectateurs',
      soundOn: 'Son activé',
      quickActions: [
        { icon: <MessageCircle />, text: 'Chat Instantané', color: 'from-green-500 to-emerald-600' },
        { icon: <Calendar />, text: 'Prendre RDV', color: 'from-blue-500 to-cyan-600' },
        { icon: <FileText />, text: 'Demande de Conseil', color: 'from-purple-500 to-pink-600' },
      ]
    },
    en: {
      title: 'Specialized Law Office',
      subtitle: 'Legal Consultations and Optimal Judicial Solutions',
      description: 'Over 15 years of experience in the legal field with a team of lawyers specialized in various areas of Moroccan law.',
      cta: 'Book Free Consultation',
      ctaSecondary: 'Contact Us',
      certified: 'Certified Law Office',
      features: [
        { icon: <Shield />, text: 'Complete Confidentiality', desc: 'Full data protection' },
        { icon: <Users />, text: 'Specialized Team', desc: 'Experienced lawyers' },
        { icon: <Award />, text: 'High Quality', desc: 'Best results' },
        { icon: <Clock />, text: 'Fast Response', desc: '24/7 support' },
        { icon: <CheckCircle />, text: 'Guaranteed Success', desc: 'Assured plans' },
        { icon: <Target />, text: 'Precise Expertise', desc: 'Custom solutions' },
      ],
      stats: [
        { number: 500, label: 'Successful Cases', suffix: '+' },
        { number: 15, label: 'Years Experience', suffix: '+' },
        { number: 98, label: 'Client Satisfaction', suffix: '%' },
        { number: 50, label: 'Loyal Clients', suffix: '+' },
        { number: 1000, label: 'Consultation Hours', suffix: '+' },
        { number: 120, label: 'Cases Annually', suffix: '+' },
      ],
      videoCta: 'See How We Work',
      appointment: 'Book Appointment',
      emergency: 'Emergency Case?',
      scroll: 'Scroll down',
      testimonialName: 'Mohamed El Amrani',
      testimonialRole: 'Company Director',
      testimonialText: 'Excellent office! I got the best legal service for my real estate project',
      videoDuration: '1 minute',
      emergencyNumber: '+212 6 XX XX XX XX',
      playVideo: 'Play Video',
      watching: 'Watching now',
      viewers: '245+ viewers',
      soundOn: 'Sound On',
      quickActions: [
        { icon: <MessageCircle />, text: 'Instant Chat', color: 'from-green-500 to-emerald-600' },
        { icon: <Calendar />, text: 'Book Appointment', color: 'from-blue-500 to-cyan-600' },
        { icon: <FileText />, text: 'Request Consultation', color: 'from-purple-500 to-pink-600' },
      ]
    }
  };

  const current = content[language];
  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  const lawyerPhotos = [
    { initials: 'MA', color: 'from-[#c9a33e] to-[#d4b357]' },
    { initials: 'SA', color: 'from-blue-600 to-purple-600' },
    { initials: 'FK', color: 'from-green-600 to-teal-600' },
    { initials: 'NR', color: 'from-red-600 to-pink-600' },
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" dir={direction}>
      {/* Optimized Background for Performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]">
        {/* Performance-friendly grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid-pattern" />
        
        {/* Reduced particle count for mobile */}
        {!isMobile && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#c9a33e] rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Optimized floating shapes */}
        <div className={`absolute top-10 ${isRTL ? 'right-4 md:right-10' : 'left-4 md:left-10'} w-48 md:w-72 h-48 md:h-72 bg-[#c9a33e]/10 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-10 ${isRTL ? 'left-4 md:left-10' : 'right-4 md:right-10'} w-64 md:w-96 h-64 md:h-96 bg-[#2d4a8a]/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className={`space-y-4 md:space-y-6 lg:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              
              {/* Quick Actions for Mobile */}
              <div className="lg:hidden mb-4">
                <div className="flex justify-center gap-3">
                  {current.quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`group relative p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation`}
                    >
                      <div className="text-white">
                        {React.cloneElement(action.icon, { size: 20 })}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {action.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div 
                ref={ref} 
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a33e]/20 to-[#c9a33e]/10 backdrop-blur-sm border border-[#c9a33e]/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 ${
                  mounted && inView ? 'animate-slideInLeft' : ''
                }`}
              >
                <div className="relative">
                  <Scale className="w-4 h-4 md:w-5 md:h-5 text-[#c9a33e]" />
                  <Sparkles className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 text-yellow-300 animate-ping" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-[#c9a33e] tracking-wide">
                  {current.certified}
                </span>
                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 animate-pulse" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2 md:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-white to-[#c9a33e] bg-clip-text text-transparent">
                    {current.title}
                  </span>
                </h1>
                
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed">
                  {current.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                {current.description}
              </p>

              {/* Features Grid - Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                {current.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#c9a33e]/30 active:scale-95 ${
                      mounted ? 'animate-slideInUp' : ''
                    } ${isMobile ? 'touch-manipulation' : 'hover:scale-105 hover:shadow-2xl hover:shadow-[#c9a33e]/20'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-2 md:gap-3 items-start`}>
                      <div className="p-1.5 md:p-2 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-lg group-hover:scale-110 transition-transform shrink-0">
                        <div className="text-white">
                          {React.cloneElement(feature.icon, { size: isMobile ? 16 : 20 })}
                        </div>
                      </div>
                      <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0`}>
                        <div className="font-semibold text-white text-sm md:text-base truncate">
                          {feature.text}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl hover:shadow-2xl hover:shadow-[#c9a33e]/40 transition-all duration-300 active:scale-95 touch-manipulation">
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-sm md:text-base">{current.cta}</span>
                    <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4b357] to-[#e0c170] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="group relative overflow-hidden bg-transparent border-2 border-white/30 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl hover:border-[#c9a33e] hover:text-[#c9a33e] transition-all duration-300 active:scale-95 touch-manipulation">
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-sm md:text-base">{current.ctaSecondary}</span>
                    <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Emergency Banner */}
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-lg md:rounded-xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-3 items-center`}>
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-400 animate-pulse" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className="font-semibold text-red-300 text-sm md:text-base">
                        {current.emergency}
                      </div>
                      <div className="text-xs md:text-sm text-red-200/80 font-mono">
                        {current.emergencyNumber}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap text-sm md:text-base touch-manipulation">
                    {current.appointment}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 md:space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {current.stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center transition-all duration-300 active:scale-95 ${
                      mounted ? 'animate-slideInRight' : ''
                    } ${isMobile ? 'touch-manipulation' : 'hover:scale-105 hover:border-[#c9a33e]/30 hover:shadow-2xl hover:shadow-[#c9a33e]/10'}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative z-10">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#c9a33e] mb-1 md:mb-2">
                        {mounted && inView ? (
                          <CountUp
                            end={stat.number}
                            duration={2.5}
                            suffix={stat.suffix}
                            className="font-mono"
                          />
                        ) : (
                          `0${stat.suffix}`
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300 font-medium leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Section */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-white/20 group-hover:border-[#c9a33e] transition-all duration-300 bg-gray-900">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <div className="w-full p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3">
                            <button 
                              onClick={handleVideoPlay}
                              className="p-2 md:p-3 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                            >
                              <Play className={`w-4 h-4 md:w-5 md:h-5 text-white ${isRTL ? 'mr-0.5' : 'ml-0.5'}`} fill="white" />
                            </button>
                            <div className="text-white">
                              <div className="font-semibold text-xs md:text-sm">{current.videoCta}</div>
                              <div className="text-xs text-gray-300 flex items-center gap-1">
                                <Video className="w-3 h-3" />
                                {current.videoDuration}
                              </div>
                            </div>
                          </div>
                          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation">
                            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </button>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-2 md:mt-3">
                          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#c9a33e] to-[#d4b357] rounded-full transition-all duration-100"
                              style={{ width: isVideoPlaying ? '100%' : '0%' }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{isVideoPlaying ? '0:45' : '0:00'}</span>
                            <span>1:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Content Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4 md:p-8">
                        <div className="mb-4 md:mb-6">
                          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                            <div className="flex">
                              {lawyerPhotos.map((photo, idx) => (
                                <div 
                                  key={idx}
                                  className={`w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${photo.color} flex items-center justify-center text-white font-bold text-xs md:text-sm border-2 border-gray-800 ${
                                    idx !== 0 ? `-ml-2 md:-ml-3` : ''
                                  }`}
                                >
                                  {photo.initials}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Courtroom Scene */}
                          <div className="relative w-48 md:w-64 h-24 md:h-32 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                            <div className="absolute top-2 left-2 right-2 h-3 md:h-4 bg-gray-700 rounded"></div>
                            <div className="absolute top-6 md:top-8 left-3 md:left-4 w-6 md:w-8 h-12 md:h-16 bg-gradient-to-b from-[#c9a33e]/30 to-[#c9a33e]/10 rounded"></div>
                            <div className="absolute top-6 md:top-8 right-3 md:right-4 w-6 md:w-8 h-12 md:h-16 bg-gradient-to-b from-blue-600/30 to-blue-600/10 rounded"></div>
                            <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-16 md:w-20 h-4 md:h-6 bg-gray-700 rounded"></div>
                            <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#c9a33e] rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Video Status */}
                        <div className="mt-2 md:mt-4">
                          <div className="inline-flex items-center gap-1 md:gap-2 bg-black/50 px-2 py-1 md:px-3 md:py-1 rounded-full">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-white text-xs md:text-sm">{current.watching}</span>
                            <span className="text-gray-300 text-xs">{current.viewers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Play Overlay */}
                    {!isVideoPlaying && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                        <button 
                          onClick={handleVideoPlay}
                          className="p-4 md:p-6 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full shadow-2xl transform group-hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
                        >
                          <div className="relative">
                            <Play className={`w-6 h-6 md:w-10 md:h-10 text-white ${isRTL ? 'mr-1' : 'ml-1'}`} fill="white" />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-3 md:gap-4 items-start mb-3 md:mb-4`}>
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                      MA
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className={`${isRTL ? 'text-right' : 'text-left'} min-w-0 flex-1`}>
                    <div className="font-semibold text-white text-sm md:text-base truncate">
                      {current.testimonialName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {current.testimonialRole}
                    </div>
                  </div>
                  <div className={`flex ${isRTL ? 'mr-auto' : 'ml-auto'} shrink-0`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#c9a33e] text-[#c9a33e]" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-xs md:text-sm italic line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
                  "{current.testimonialText}"
                </p>
                
                {/* Additional Reviews */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10">
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} items-center gap-1 md:gap-2`}>
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600"
                      />
                    ))}
                    <span className="text-xs text-gray-400">
                      {language === 'ar' ? '+12 تقييم' : 
                       language === 'fr' ? '+12 avis' : 
                       '+12 reviews'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {language === 'ar' ? 'قبل 3 أيام' : 
                     language === 'fr' ? 'Il y a 3 jours' : 
                     '3 days ago'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm mb-2">
              {current.scroll}
            </div>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#c9a33e] rounded-full animate-bounce mt-2" />
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions for Desktop */}
      <div className="hidden lg:block fixed top-1/2 right-4 transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {current.quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`group relative p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-lg hover:scale-110 transition-all duration-200`}
            >
              <div className="text-white">
                {React.cloneElement(action.icon, { size: 20 })}
              </div>
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {action.text}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 z-30 lg:hidden">
          <div className="flex justify-around items-center py-3">
            {current.quickActions.map((action, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center gap-1 active:scale-95 transition-transform touch-manipulation"
              >
                <div className={`p-2 bg-gradient-to-br ${action.color} rounded-lg`}>
                  <div className="text-white">
                    {React.cloneElement(action.icon, { size: 18 })}
                  </div>
                </div>
                <span className="text-xs text-white font-medium">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Optimized CSS */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .touch-manipulation {
          touch-action: manipulation;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: ${isRTL ? 'translateX(50px)' : 'translateX(-50px)'};
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: ${isRTL ? 'translateX(-50px)' : 'translateX(50px)'};
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        /* Prevent text selection on buttons for better mobile experience */
        button {
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve scrolling performance */
        * {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default Hero;