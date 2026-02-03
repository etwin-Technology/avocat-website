import React, { useState, useEffect } from 'react';
import { 
  Award, Users, Scale, Target, Clock, Shield, 
  ChevronRight, Star, Building, Globe, TrendingUp,
  CheckCircle, Phone, Mail, MapPin, Sparkles,
  Briefcase, Globe as GlobeIcon, FileText, Scale as ScaleIcon,
  BookOpen, Calendar, Linkedin, Twitter, Facebook, Instagram,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const About = ({ language }) => {
  const [mounted, setMounted] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const content = {
    ar: {
      title: 'من نحن',
      subtitle: 'مكتب المحاماة الرائد منذ 2008',
      description: 'نحن فريق من المحامين المتخصصين الذين يعملون معاً لتقديم حلول قانونية استثنائية. نحن نؤمن بأن كل قضية فريدة من نوعها وتستحق اهتماماً خاصاً.',
      mission: 'مهمتنا',
      missionText: 'تقديم خدمات قانونية متميزة تحقق أهداف عملائنا مع الحفاظ على أعلى معايير النزاهة والاحترافية.',
      vision: 'رؤيتنا',
      visionText: 'أن نكون الخيار الأول للمؤسسات والأفراد في جميع المجالات القانونية على مستوى المغرب.',
      values: 'قيمنا الأساسية',
      valuesList: [
        { icon: <Shield />, title: 'النزاهة', description: 'شفافية تامة والتزام كامل بالمبادئ الأخلاقية' },
        { icon: <Target />, title: 'التخصص', description: 'عمق معرفي في كل مجال من مجالات القانون' },
        { icon: <TrendingUp />, title: 'الابتكار', description: 'حلول قانونية مبتكرة تلائم العصر الرقمي' },
        { icon: <Users />, title: 'الشراكة', description: 'علاقة تعاونية طويلة المدى مع عملائنا' }
      ],
      stats: [
        { number: 15, label: 'سنوات الخبرة', suffix: '+' },
        { number: 500, label: 'قضية ناجحة', suffix: '+' },
        { number: 50, label: 'خبير قانوني', suffix: '+' },
        { number: 98, label: 'رضا العملاء', suffix: '%' },
      ],
      team: 'الفريق القيادي',
      teamDescription: 'يضم فريقنا نخبة من المحامين ذوي الخبرة الواسعة والشهادات الدولية في مختلف التخصصات القانونية.',
      cta: 'ابدأ رحلتك القانونية معنا',
      expertise: 'مجالات تخصصنا',
      expertiseList: [
        { title: 'القانون التجاري', icon: <Briefcase />, desc: 'تأسيس الشركات والعقود التجارية' },
        { title: 'التحكيم الدولي', icon: <GlobeIcon />, desc: 'حل النزاعات عبر الحدود' },
        { title: 'الملكية الفكرية', icon: <FileText />, desc: 'براءات الاختراع والعلامات التجارية' },
        { title: 'القانون العقاري', icon: <Building />, desc: 'المعاملات والمنازعات العقارية' },
        { title: 'الضرائب والاستثمار', icon: <ScaleIcon />, desc: 'التخطيط الضريبي والاستثماري' },
        { title: 'التقاضي المدني', icon: <BookOpen />, desc: 'التمثيل في المحاكم' },
      ],
      contactTitle: 'تواصل معنا',
      contactDesc: 'نحن هنا لمساعدتك في جميع احتياجاتك القانونية',
      address: '123 شارع محمد الخامس، الدار البيضاء، المغرب',
      phone: '+212 5 20 30 40 50',
      email: 'info@legalfirm.ma',
      hours: 'الأحد - الخميس: 9 ص - 6 م',
      emergency: 'حالات الطوارئ: +212 6 10 20 30 40',
      social: 'تابعنا على وسائل التواصل الاجتماعي',
      bookConsultation: 'احجز استشارة مجانية'
    },
    fr: {
      title: 'À Propos de Nous',
      subtitle: 'Cabinet d\'Avocats Leader Depuis 2008',
      description: 'Nous sommes une équipe d\'avocats spécialisés travaillant ensemble pour fournir des solutions juridiques exceptionnelles. Nous croyons que chaque affaire est unique et mérite une attention particulière.',
      mission: 'Notre Mission',
      missionText: 'Fournir des services juridiques d\'excellence qui atteignent les objectifs de nos clients tout en maintenant les normes les plus élevées d\'intégrité et de professionnalisme.',
      vision: 'Notre Vision',
      visionText: 'Être le premier choix pour les entreprises et les particuliers dans tous les domaines juridiques au Maroc.',
      values: 'Nos Valeurs Fondamentales',
      valuesList: [
        { icon: <Shield />, title: 'Intégrité', description: 'Transparence totale et engagement envers les principes éthiques' },
        { icon: <Target />, title: 'Spécialisation', description: 'Expertise approfondie dans chaque domaine du droit' },
        { icon: <TrendingUp />, title: 'Innovation', description: 'Solutions juridiques innovantes adaptées à l\'ère numérique' },
        { icon: <Users />, title: 'Partenariat', description: 'Relation collaborative à long terme avec nos clients' }
      ],
      stats: [
        { number: 15, label: 'Années d\'Expérience', suffix: '+' },
        { number: 500, label: 'Affaires Réussies', suffix: '+' },
        { number: 50, label: 'Experts Juridiques', suffix: '+' },
        { number: 98, label: 'Satisfaction Client', suffix: '%' },
      ],
      team: 'Notre Équipe de Direction',
      teamDescription: 'Notre équipe comprend des avocats d\'élite avec une vaste expérience et des certifications internationales dans divers domaines juridiques.',
      cta: 'Commencez Votre Voyage Juridique Avec Nous',
      expertise: 'Nos Domaines d\'Expertise',
      expertiseList: [
        { title: 'Droit Commercial', icon: <Briefcase />, desc: 'Création d\'entreprises et contrats commerciaux' },
        { title: 'Arbitrage International', icon: <GlobeIcon />, desc: 'Résolution de litiges transfrontaliers' },
        { title: 'Propriété Intellectuelle', icon: <FileText />, desc: 'Brevets et marques déposées' },
        { title: 'Droit Immobilier', icon: <Building />, desc: 'Transactions et litiges immobiliers' },
        { title: 'Fiscalité & Investissement', icon: <ScaleIcon />, desc: 'Planification fiscale et investissement' },
        { title: 'Contentieux Civil', icon: <BookOpen />, desc: 'Représentation devant les tribunaux' },
      ],
      contactTitle: 'Contactez-nous',
      contactDesc: 'Nous sommes là pour vous aider dans tous vos besoins juridiques',
      address: '123 Avenue Mohammed V, Casablanca, Maroc',
      phone: '+212 5 20 30 40 50',
      email: 'info@legalfirm.ma',
      hours: 'Lun - Ven: 9h - 18h',
      emergency: 'Urgences: +212 6 10 20 30 40',
      social: 'Suivez-nous sur les réseaux sociaux',
      bookConsultation: 'Réservez une Consultation Gratuite'
    },
    en: {
      title: 'About Us',
      subtitle: 'Leading Law Firm Since 2008',
      description: 'We are a team of specialized lawyers working together to provide exceptional legal solutions. We believe every case is unique and deserves special attention.',
      mission: 'Our Mission',
      missionText: 'To provide excellent legal services that achieve our clients\' objectives while maintaining the highest standards of integrity and professionalism.',
      vision: 'Our Vision',
      visionText: 'To be the first choice for businesses and individuals in all legal fields across Morocco.',
      values: 'Our Core Values',
      valuesList: [
        { icon: <Shield />, title: 'Integrity', description: 'Full transparency and commitment to ethical principles' },
        { icon: <Target />, title: 'Specialization', description: 'Deep expertise in every legal field' },
        { icon: <TrendingUp />, title: 'Innovation', description: 'Innovative legal solutions for the digital age' },
        { icon: <Users />, title: 'Partnership', description: 'Long-term collaborative relationship with our clients' }
      ],
      stats: [
        { number: 15, label: 'Years Experience', suffix: '+' },
        { number: 500, label: 'Successful Cases', suffix: '+' },
        { number: 50, label: 'Legal Experts', suffix: '+' },
        { number: 98, label: 'Client Satisfaction', suffix: '%' },
      ],
      team: 'Leadership Team',
      teamDescription: 'Our team includes elite lawyers with extensive experience and international certifications in various legal fields.',
      cta: 'Start Your Legal Journey With Us',
      expertise: 'Our Areas of Expertise',
      expertiseList: [
        { title: 'Corporate Law', icon: <Briefcase />, desc: 'Company formation and commercial contracts' },
        { title: 'International Arbitration', icon: <GlobeIcon />, desc: 'Cross-border dispute resolution' },
        { title: 'Intellectual Property', icon: <FileText />, desc: 'Patents and trademarks' },
        { title: 'Real Estate Law', icon: <Building />, desc: 'Property transactions and disputes' },
        { title: 'Tax & Investment', icon: <ScaleIcon />, desc: 'Tax planning and investment' },
        { title: 'Civil Litigation', icon: <BookOpen />, desc: 'Court representation' },
      ],
      contactTitle: 'Contact Us',
      contactDesc: 'We are here to help you with all your legal needs',
      address: '123 Mohammed V Avenue, Casablanca, Morocco',
      phone: '+212 5 20 30 40 50',
      email: 'info@legalfirm.ma',
      hours: 'Mon - Fri: 9AM - 6PM',
      emergency: 'Emergency: +212 6 10 20 30 40',
      social: 'Follow us on social media',
      bookConsultation: 'Book a Free Consultation'
    }
  };

  const current = content[language];
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section with White Background */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#f8f5f0]">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, rgba(201, 163, 62, 0.2) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(201, 163, 62, 0.2) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
          
          {/* Floating Shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#c9a33e]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#f0e6d2]/20 to-transparent rounded-full blur-3xl" />
          
          {/* Subtle Particles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, x: 0 }}
                animate={{ 
                  y: [0, -50, 0],
                  x: [0, Math.sin(i) * 30, 0]
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
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
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Badge */}
            <div ref={ref} className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#c9a33e]/10 to-[#f0e6d2] border border-[#c9a33e]/20 rounded-full px-6 py-3 mb-8 ${inView ? 'animate-slideInLeft' : ''}`}>
              <div className="relative">
                <Scale className="w-5 h-5 text-[#c9a33e]" />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-[#c9a33e]" />
              </div>
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                {current.subtitle}
              </span>
              <Star className="w-4 h-4 text-[#c9a33e]" />
            </div>

            {/* Title & Description */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-[#c9a33e] to-gray-900 bg-clip-text text-transparent">
                  {current.title}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {current.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {current.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 hover:border-[#c9a33e]/40 hover:shadow-xl"
                >
                  <div className="relative z-10">
                    <div className="text-3xl lg:text-4xl font-bold text-[#c9a33e] mb-2">
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
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a33e]/0 to-[#c9a33e]/0 group-hover:from-[#c9a33e]/10 group-hover:to-[#c9a33e]/5 transition-all duration-500" />
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <Link to="/appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{current.cta}</span>
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4b357] to-[#e0c170] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden bg-white border border-gray-300 text-gray-700 font-bold px-8 py-4 rounded-xl hover:border-[#c9a33e] transition-all duration-300 hover:text-[#c9a33e] hover:shadow-lg"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>{language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Nous Contacter' : 'Contact Us'}</span>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#c9a33e]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#c9a33e] rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, #c9a33e 2px, transparent 0%)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:border-[#c9a33e]/30"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{current.mission}</h3>
                  <p className="text-gray-600 leading-relaxed">{current.missionText}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:border-[#c9a33e]/30"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-[#f0e6d2] to-[#c9a33e]/20 rounded-2xl border border-[#c9a33e]/30">
                  <Award className="w-8 h-8 text-[#c9a33e]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{current.vision}</h3>
                  <p className="text-gray-600 leading-relaxed">{current.visionText}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551135049-8a33b2c69d42?auto=format&fit=crop&w=2070&q=80")',
          }} />
        </div>

        <div className="relative z-10 container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {current.values}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'أساس نجاحنا يعتمد على مجموعة من القيم الراسخة' 
                : language === 'fr' 
                  ? 'Le fondement de notre succès repose sur un ensemble de valeurs solides'
                  : 'The foundation of our success is built on strong core values'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {current.valuesList.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ${activeValue === index ? 'ring-2 ring-[#c9a33e]' : 'hover:border-[#c9a33e]/40'}`}
                onMouseEnter={() => setActiveValue(index)}
                onClick={() => setActiveValue(index)}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl mb-6 transition-all duration-300 ${activeValue === index ? 'bg-gradient-to-br from-[#c9a33e] to-[#d4b357]' : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-[#f0e6d2] group-hover:to-[#c9a33e]/20'}`}>
                    <div className={activeValue === index ? 'text-white' : 'text-gray-600 group-hover:text-[#c9a33e]'}>
                      {React.cloneElement(value.icon, { size: 28 })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 48%, #c9a33e 48%, #c9a33e 52%, transparent 52%)`,
            backgroundSize: '100px 100px',
          }} />
        </div>

        <div className="relative z-10 container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {current.expertise}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نغطي جميع المجالات القانونية الرئيسية' 
                : language === 'fr' 
                  ? 'Nous couvrons tous les principaux domaines juridiques'
                  : 'We cover all major legal areas'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.expertiseList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to="/services">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#c9a33e] group-hover:-translate-y-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:bg-gradient-to-br group-hover:from-[#f0e6d2] group-hover:to-[#c9a33e]/20 transition-all duration-300">
                        <div className="text-gray-600 group-hover:text-[#c9a33e]">
                          {React.cloneElement(item.icon, { size: 24 })}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551836026-d5c2ca1c4c8c?auto=format&fit=crop&w=2070&q=80")',
          }} />
        </div>

        <div className="relative z-10 container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {current.team}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {current.teamDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: language === 'ar' ? 'المحامي محمد اليزيدي' : language === 'fr' ? 'Avocat Mohamed El Yazidi' : 'Lawyer Mohamed El Yazidi',
                role: language === 'ar' ? 'شريك مؤسس' : language === 'fr' ? 'Associé Fondateur' : 'Founding Partner',
                description: language === 'ar' 
                  ? 'خبير في القانون التجاري الدولي مع 15+ سنة خبرة' 
                  : language === 'fr' 
                    ? 'Expert en droit commercial international avec 15+ ans d\'expérience'
                    : 'Expert in international business law with 15+ years experience',
                img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500',
              },
              { 
                name: language === 'ar' ? 'المحامية فاطمة العلمي' : language === 'fr' ? 'Avocate Fatima El Alami' : 'Lawyer Fatima El Alami',
                role: language === 'ar' ? 'شريك' : language === 'fr' ? 'Associée' : 'Partner',
                description: language === 'ar' 
                  ? 'متخصصة في الملكية الفكرية والتحكيم الدولي' 
                  : language === 'fr' 
                    ? 'Spécialisée en propriété intellectuelle et arbitrage international'
                    : 'Specialized in intellectual property and international arbitration',
                img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500',
              },
              { 
                name: language === 'ar' ? 'المحامي كريم الدريسي' : language === 'fr' ? 'Avocat Karim El Drissi' : 'Lawyer Karim El Drissi',
                role: language === 'ar' ? 'مدير العمليات' : language === 'fr' ? 'Directeur des Opérations' : 'Operations Director',
                description: language === 'ar' 
                  ? 'خبير في القانون العقاري والضرائب مع خبرة دولية' 
                  : language === 'fr' 
                    ? 'Expert en droit immobilier et fiscalité avec expérience internationale'
                    : 'Expert in real estate law and taxation with international experience',
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500',
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-[#c9a33e]">
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#c9a33e]/10 to-[#f0e6d2] text-[#c9a33e] text-sm font-semibold mb-4 border border-[#c9a33e]/20">
                      {member.role}
                    </div>
                    <p className="text-gray-600 mb-6">{member.description}</p>
                    <div className="flex gap-3">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f0e6d2] transition-colors cursor-pointer border border-gray-200 hover:border-[#c9a33e]">
                        <Linkedin className="w-4 h-4 text-gray-600 hover:text-[#c9a33e]" />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f0e6d2] transition-colors cursor-pointer border border-gray-200 hover:border-[#c9a33e]">
                        <Twitter className="w-4 h-4 text-gray-600 hover:text-[#c9a33e]" />
                      </a>
                      <a href="mailto:contact@legalfirm.ma" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#f0e6d2] transition-colors cursor-pointer border border-gray-200 hover:border-[#c9a33e]">
                        <Mail className="w-4 h-4 text-gray-600 hover:text-[#c9a33e]" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#f8f5f0]">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a33e 2px, transparent 0%)',
              backgroundSize: '40px 40px',
            }} />
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#c9a33e]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#f0e6d2]/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {current.cta}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'تواصل معنا اليوم للحصول على استشارة مجانية' 
                  : language === 'fr' 
                    ? 'Contactez-nous aujourd\'hui pour une consultation gratuite'
                    : 'Contact us today for a free consultation'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/appointment" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{current.bookConsultation}</span>
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.button>
                </Link>
                
                <Link to="/contact" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-bold px-8 py-4 rounded-xl hover:border-[#c9a33e] hover:text-[#c9a33e] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Nous Appeler' : 'Call Us'}</span>
                  </motion.button>
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#c9a33e]" />
                    <a href={`mailto:${current.email}`} className="hover:text-[#c9a33e] transition-colors">
                      {current.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#c9a33e]" />
                    <a href={`tel:${current.phone.replace(/\s/g, '')}`} className="hover:text-[#c9a33e] transition-colors">
                      {current.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#c9a33e]" />
                    <span>{current.address.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;