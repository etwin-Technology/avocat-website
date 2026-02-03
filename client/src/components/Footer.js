import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Shield,
  Clock,
  Globe,
  ChevronRight,
  Send,
  Award,
  Building,
  FileText,
  Scale,
  Calculator,
  MessageCircle,
  PhoneCall,
  CheckCircle,
  Lock,
  Users,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

const Footer = ({ language = 'ar' }) => {
  const currentYear = new Date().getFullYear();

  // Determine direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const content = {
    ar: {
      title: 'مكتب المحاماة',
      subtitle: 'التميز القانوني والابتكار',
      description: 'منصة مرجعية للخدمات القانونية بالمغرب. نربط المحامين والعملاء بثقة وتميز.',
      newsletter: 'ابق على اطلاع',
      emailPlaceholder: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
      newsletterNote: 'استقبل آخر المستجدات القانونية',
      certifications: 'الشهادات والاعتمادات',
      servicesTitle: 'خدماتنا',
      navigationTitle: 'روابط سريعة',
      contactTitle: 'اتصل بنا',
      followUs: 'تابعنا',
      privacy: 'الخصوصية',
      terms: 'شروط الاستخدام',
      cookies: 'الكوكيز',
      copyright: 'جميع الحقوق محفوظة',
      dataProtection: 'متوافق مع قانون 09-08 لحماية البيانات الشخصية',
      securePayments: 'مدفوعات آمنة',
      regulatoryInfo: 'معلومات تنظيمية',
      backToTop: 'العودة للأعلى',
      whatsappContact: 'واتساب',
      phoneContact: 'اتصال هاتفي',
      workHours: 'أوقات العمل',
      responseTime: 'رد خلال 24 ساعة',
      byAppointment: 'بموعد مسبق',
      poweredBy: 'بدعم من',
      techBy: 'الحلول التقنية مقدمة من',
      etwinTech: 'eTwin Technology',
      etwinDesc: 'منصة متكاملة لتطوير الأعمال',
      visitEtwint: 'زيارة eTwin Technology'
    },
    fr: {
      title: 'Cabinet d\'Avocats',
      subtitle: 'Excellence Juridique & Innovation',
      description: 'Plateforme de référence pour les services juridiques au Maroc. Nous connectons avocats et clients avec confiance et excellence.',
      newsletter: 'Restez informé',
      emailPlaceholder: 'Votre email',
      subscribe: 'S\'inscrire',
      newsletterNote: 'Recevez nos dernières actualités juridiques',
      certifications: 'Certifications',
      servicesTitle: 'Nos Services',
      navigationTitle: 'Navigation',
      contactTitle: 'Contact',
      followUs: 'Suivez-nous',
      privacy: 'Confidentialité',
      terms: 'Conditions d\'utilisation',
      cookies: 'Cookies',
      copyright: 'Tous droits réservés',
      dataProtection: 'Conforme à la loi 09-08 sur la protection des données personnelles',
      securePayments: 'Paiements sécurisés',
      regulatoryInfo: 'Informations réglementaires',
      backToTop: 'Retour en haut',
      whatsappContact: 'WhatsApp',
      phoneContact: 'Appel téléphonique',
      workHours: 'Heures de travail',
      responseTime: 'Réponse sous 24h',
      byAppointment: 'Sur rendez-vous',
      poweredBy: 'Propulsé par',
      techBy: 'Solutions technologiques fournies par',
      etwinTech: 'eTwin Technology',
      etwinDesc: 'Plateforme intégrée de développement commercial',
      visitEtwint: 'Visiter eTwin Technology'
    },
    en: {
      title: 'Law Office',
      subtitle: 'Legal Excellence & Innovation',
      description: 'Reference platform for legal services in Morocco. We connect lawyers and clients with trust and excellence.',
      newsletter: 'Stay Informed',
      emailPlaceholder: 'Your email',
      subscribe: 'Subscribe',
      newsletterNote: 'Receive our latest legal updates',
      certifications: 'Certifications',
      servicesTitle: 'Our Services',
      navigationTitle: 'Quick Links',
      contactTitle: 'Contact Us',
      followUs: 'Follow Us',
      privacy: 'Privacy',
      terms: 'Terms of Use',
      cookies: 'Cookies',
      copyright: 'All rights reserved',
      dataProtection: 'Compliant with Law 09-08 on personal data protection',
      securePayments: 'Secure Payments',
      regulatoryInfo: 'Regulatory Information',
      backToTop: 'Back to Top',
      whatsappContact: 'WhatsApp',
      phoneContact: 'Phone Call',
      workHours: 'Working Hours',
      responseTime: 'Response within 24h',
      byAppointment: 'By Appointment',
      poweredBy: 'Powered by',
      techBy: 'Technology solutions provided by',
      etwinTech: 'eTwin Technology',
      etwinDesc: 'Integrated business development platform',
      visitEtwint: 'Visit eTwin Technology'
    }
  };

  const current = content[language];

  const services = {
    ar: [
      { name: 'القانون المدني والتجاري', path: '/services/civil' },
      { name: 'قانون العقارات والأراضي', path: '/services/real-estate' },
      { name: 'قانون الأسرة والميراث', path: '/services/family' },
      { name: 'القانون الإداري والجبائي', path: '/services/administrative' },
      { name: 'التحكيم وحل النزاعات', path: '/services/arbitration' },
    ],
    fr: [
      { name: 'Droit Civil & Commercial', path: '/services/civil' },
      { name: 'Droit Immobilier', path: '/services/real-estate' },
      { name: 'Droit de la Famille & Successions', path: '/services/family' },
      { name: 'Droit Administratif & Fiscal', path: '/services/administrative' },
      { name: 'Arbitrage & Résolution de Conflits', path: '/services/arbitration' },
    ],
    en: [
      { name: 'Civil & Commercial Law', path: '/services/civil' },
      { name: 'Real Estate Law', path: '/services/real-estate' },
      { name: 'Family & Inheritance Law', path: '/services/family' },
      { name: 'Administrative & Tax Law', path: '/services/administrative' },
      { name: 'Arbitration & Dispute Resolution', path: '/services/arbitration' },
    ]
  };

  const quickLinks = {
    ar: [
      { name: 'الرئيسية', path: '/' },
      { name: 'من نحن', path: '/about' },
      { name: 'الخدمات', path: '/services' },
      { name: 'المقالات القانونية', path: '/articles' },
      { name: 'حجز موعد', path: '/appointment' },
      { name: 'اتصل بنا', path: '/contact' },
    ],
    fr: [
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Articles Juridiques', path: '/articles' },
      { name: 'Prendre Rendez-vous', path: '/appointment' },
      { name: 'Contact', path: '/contact' },
    ],
    en: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Legal Articles', path: '/articles' },
      { name: 'Book Appointment', path: '/appointment' },
      { name: 'Contact Us', path: '/contact' },
    ]
  };

  const contactInfo = {
    ar: [
      {
        icon: <Phone className="w-5 h-5" />,
        title: 'الهاتف',
        details: ['+212 6 XX XX XX XX', '+212 6 XX XX XX XX (طوارئ)'],
        schedule: 'الأحد - الخميس: 9:00 - 17:00',
      },
      {
        icon: <Mail className="w-5 h-5" />,
        title: 'البريد الإلكتروني',
        details: ['contact@avocat.ma', 'consultation@avocat.ma'],
        schedule: 'رد خلال 24 ساعة',
      },
      {
        icon: <MapPin className="w-5 h-5" />,
        title: 'العنوان',
        details: ['الدار البيضاء، المغرب', 'طابق 15، مكتب 1501'],
        schedule: 'بموعد مسبق',
      },
    ],
    fr: [
      {
        icon: <Phone className="w-5 h-5" />,
        title: 'Téléphone',
        details: ['+212 6 XX XX XX XX', '+212 6 XX XX XX XX (Urgent)'],
        schedule: 'Dimanche - Jeudi: 9:00 - 17:00',
      },
      {
        icon: <Mail className="w-5 h-5" />,
        title: 'Email',
        details: ['contact@avocat.ma', 'consultation@avocat.ma'],
        schedule: 'Réponse sous 24h',
      },
      {
        icon: <MapPin className="w-5 h-5" />,
        title: 'Adresse',
        details: ['Casablanca, Maroc', 'Niveau 15, Bureau 1501'],
        schedule: 'Sur rendez-vous',
      },
    ],
    en: [
      {
        icon: <Phone className="w-5 h-5" />,
        title: 'Phone',
        details: ['+212 6 XX XX XX XX', '+212 6 XX XX XX XX (Emergency)'],
        schedule: 'Sunday - Thursday: 9:00 - 17:00',
      },
      {
        icon: <Mail className="w-5 h-5" />,
        title: 'Email',
        details: ['contact@avocat.ma', 'consultation@avocat.ma'],
        schedule: 'Response within 24h',
      },
      {
        icon: <MapPin className="w-5 h-5" />,
        title: 'Address',
        details: ['Casablanca, Morocco', 'Floor 15, Office 1501'],
        schedule: 'By Appointment',
      },
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', url: '#' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#' },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', url: '#' },
  ];

  const currentServices = services[language];
  const currentQuickLinks = quickLinks[language];
  const currentContactInfo = contactInfo[language];

  // eTwin Technology redirect link
  const etwinWebsite = "https://etwintechnology.com";

  return (
    <footer className="bg-gradient-to-b from-[#0f1e3d] to-[#1a365d] text-white relative overflow-hidden" dir={direction}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#c9a33e] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2d4a8a] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Brand & Newsletter */}
            <div>
              <div className="flex items-center space-x-3 mb-6" dir={direction}>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a365d] to-[#c9a33e] rounded-xl flex items-center justify-center shadow-lg">
                    <Scale className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1a365d] to-[#c9a33e] rounded-xl blur opacity-30"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    <span className="text-[#c9a33e]">
                      {language === 'ar' ? 'المحامي' : language === 'fr' ? 'Maître' : 'Attorney'}
                    </span>{' '}
                    {language === 'ar' ? 'محمد اليزيدي' : 'Mohamed El Yazidi'}
                  </h2>
                  <p className="text-gray-400 text-sm">{current.subtitle}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 max-w-md">
                {current.description}
              </p>

              {/* Newsletter Subscription */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center" dir={direction}>
                  <Send className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {current.newsletter}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder={current.emailPlaceholder}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a33e] text-white placeholder-gray-400"
                    dir="ltr"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-semibold rounded-lg hover:from-[#d4b357] hover:to-[#e0c170] transition-all hover:shadow-lg">
                    {current.subscribe}
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {current.newsletterNote}
                </p>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm" dir={direction}>
                  <Award className="w-4 h-4 text-[#c9a33e]" />
                  <span className="text-sm">{language === 'ar' ? 'معتمد' : 'Certifié'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm" dir={direction}>
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{language === 'ar' ? 'بيانات آمنة' : 'Données Sécurisées'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm" dir={direction}>
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{language === 'ar' ? 'فريق متخصص' : 'Équipe Spécialisée'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/30 px-3 py-2 rounded-lg backdrop-blur-sm" dir={direction}>
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{language === 'ar' ? 'سرية تامة' : 'Confidentialité'}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Links & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center" dir={direction}>
                  <Building className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {current.servicesTitle}
                </h3>
                <ul className="space-y-3">
                  {currentServices.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={service.path}
                        className="flex items-center text-gray-300 hover:text-[#c9a33e] transition-colors group"
                        dir={direction}
                      >
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          language === 'ar' ? 'rotate-180 ml-2' : 'mr-2'
                        }`} />
                        <span>{service.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{current.navigationTitle}</h3>
                <ul className="space-y-3">
                  {currentQuickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="flex items-center text-gray-300 hover:text-[#c9a33e] transition-colors group"
                        dir={direction}
                      >
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          language === 'ar' ? 'rotate-180 ml-2' : 'mr-2'
                        }`} />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{current.contactTitle}</h3>
                <div className="space-y-6">
                  {currentContactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3" dir={direction}>
                      <div className="text-[#c9a33e] mt-1 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-200">{info.title}</h4>
                        <div className="space-y-1 mt-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs mt-2 flex items-center" dir={direction}>
                          <Clock className={`w-3 h-3 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                          {info.schedule}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* eTwin Technology Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-[#1a365d]/50 to-[#0f1e3d]/50 rounded-xl border border-gray-700 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2" dir={direction}>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{current.poweredBy}</p>
                    <h4 className="text-xl font-bold text-white">{current.etwinTech}</h4>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {current.etwinDesc} • {current.techBy} eTwin Technology
                </p>
              </div>
              <a
                href={etwinWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg flex items-center space-x-2"
                dir={direction}
              >
                <span>{current.visitEtwint}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Social & Language */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div>
                <h4 className="text-gray-400 mb-3">
                  {current.followUs}
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 bg-gray-800/50 hover:bg-[#c9a33e]/20 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group backdrop-blur-sm"
                      aria-label={social.name}
                    >
                      <span className="text-gray-300 group-hover:text-[#c9a33e] transition-colors">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Language & Legal */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Language Selector */}
                <div className="flex items-center space-x-2" dir={direction}>
                  <Globe className="w-5 h-5 text-gray-400" />
                  <select 
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a33e] backdrop-blur-sm"
                    defaultValue={language}
                    onChange={(e) => {
                      // Handle language change here
                      console.log('Language changed to:', e.target.value);
                    }}
                  >
                    <option value="ar">العربية</option>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap gap-4 justify-center" dir={direction}>
                  <Link to="/privacy" className="text-gray-400 hover:text-[#c9a33e] text-sm transition-colors">
                    {current.privacy}
                  </Link>
                  <Link to="/terms" className="text-gray-400 hover:text-[#c9a33e] text-sm transition-colors">
                    {current.terms}
                  </Link>
                  <Link to="/cookies" className="text-gray-400 hover:text-[#c9a33e] text-sm transition-colors">
                    {current.cookies}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#0f1e3d]/80 border-t border-gray-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400">
                  &copy; {currentYear} {current.title}. {current.copyright}.
                </p>
                <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start" dir={direction}>
                  <Shield className={`inline w-3 h-3 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  {current.dataProtection}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-4" dir={direction}>
                <div className="text-gray-400 text-sm">{current.securePayments} :</div>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-800/50 rounded flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-bold text-gray-300">CMI</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-800/50 rounded flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-bold text-gray-300">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-800/50 rounded flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xs font-bold text-gray-300">CIH</span>
                  </div>
                </div>
              </div>

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 bg-gray-800/50 hover:bg-[#c9a33e]/20 rounded-lg transition-colors flex items-center space-x-2 group backdrop-blur-sm"
                dir={direction}
              >
                <span className="text-gray-300 group-hover:text-[#c9a33e]">{current.backToTop}</span>
                <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-[#c9a33e]" />
              </button>
            </div>

            {/* Regulatory Info */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <div className="inline-flex flex-wrap justify-center gap-6 text-gray-500 text-sm mb-3">
                <span>RC: 1234567 {language === 'ar' ? 'الدار البيضاء' : 'Casablanca'}</span>
                <span>ICE: 002345678912</span>
                <span>Patente: 9876543</span>
                <span>IF: 456789123</span>
              </div>
              <p className="text-gray-600 text-xs">
                {language === 'ar' 
                  ? 'شركة مسجلة في السجل التجاري بالدار البيضاء • رقم الاعتماد: AG-2024-LAW-001'
                  : language === 'fr'
                    ? 'Société inscrite au Registre du Commerce de Casablanca • Numéro d\'agrément: AG-2024-LAW-001'
                    : 'Company registered in the Casablanca Trade Register • Accreditation number: AG-2024-LAW-001'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className={`fixed bottom-6 ${language === 'ar' ? 'right-6' : 'left-6'} flex flex-col gap-3 z-50`}>
        {/* WhatsApp Button */}
        <button
          onClick={() => window.open('https://wa.me/2126XXXXXXX', '_blank')}
          className="relative group"
          aria-label={current.whatsappContact}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all hover:scale-110">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className={`absolute -top-10 ${language === 'ar' ? 'left-0' : 'right-0'} bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
            {current.whatsappContact}
          </div>
        </button>

        {/* Phone Call Button */}
        <button
          onClick={() => window.location.href = 'tel:+2126XXXXXXX'}
          className="relative group"
          aria-label={current.phoneContact}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-110">
            <PhoneCall className="w-7 h-7 text-white" />
          </div>
          <div className={`absolute -top-10 ${language === 'ar' ? 'left-0' : 'right-0'} bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
            {current.phoneContact}
          </div>
        </button>

        {/* Quick Consultation Button */}
        <button
          onClick={() => window.location.href = '/appointment'}
          className="relative group"
          aria-label="Quick Consultation"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-[#c9a33e] to-[#d4b357] rounded-full shadow-2xl flex items-center justify-center hover:from-[#d4b357] hover:to-[#e0c170] transition-all hover:scale-110">
            <CheckCircle className="w-7 h-7 text-gray-900" />
          </div>
          <div className={`absolute -top-10 ${language === 'ar' ? 'left-0' : 'right-0'} bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
            {language === 'ar' ? 'استشارة سريعة' : language === 'fr' ? 'Consultation Rapide' : 'Quick Consultation'}
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;