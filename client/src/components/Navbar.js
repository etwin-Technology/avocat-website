import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ChevronDown, 
  ChevronRight,
  Search, 
  Shield,
  Award,
  Calendar,
  Sparkles,
  Home,
  Building,
  FileText,
  Users,
  Newspaper,
  Mail,
  Scale,
  Key,
  Briefcase,
  Heart,
  Landmark,
  Car,
  Star,
  Globe,
  CheckCircle,
  Info,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const isRTL = language === 'ar';
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const languageRef = useRef(null);

  const navItems = [
    { 
      name: { ar: 'الرئيسية', fr: 'Accueil', en: 'Home' }, 
      href: '/',
      icon: <Home size={18} />
    },
    { 
      name: { ar: 'من نحن', fr: 'À Propos', en: 'About' }, 
      href: '/about',
      icon: <Info size={18} />,
      dropdown: {
        ar: [
          { name: 'فريق العمل', href: '/about/team', icon: <Users size={16} /> },
          { name: 'مكتبنا', href: '/about/office', icon: <Building size={16} /> },
          { name: 'جوائزنا', href: '/about/awards', icon: <Award size={16} /> },
          { name: 'شركاؤنا', href: '/about/partners', icon: <Users size={16} /> }
        ],
        fr: [
          { name: 'Notre Équipe', href: '/about/team', icon: <Users size={16} /> },
          { name: 'Notre Cabinet', href: '/about/office', icon: <Building size={16} /> },
          { name: 'Nos Prix', href: '/about/awards', icon: <Award size={16} /> },
          { name: 'Nos Partenaires', href: '/about/partners', icon: <Users size={16} /> }
        ],
        en: [
          { name: 'Our Team', href: '/about/team', icon: <Users size={16} /> },
          { name: 'Our Office', href: '/about/office', icon: <Building size={16} /> },
          { name: 'Our Awards', href: '/about/awards', icon: <Award size={16} /> },
          { name: 'Our Partners', href: '/about/partners', icon: <Users size={16} /> }
        ]
      }
    },
    { 
      name: { ar: 'خدماتنا', fr: 'Services', en: 'Services' }, 
      href: '#services', // تغيير إلى رابط قسم في نفس الصفحة
      icon: <Scale size={18} />,
      dropdown: {
        ar: [
          { name: 'القانون المدني', href: '#civil-law', icon: <FileText size={16} /> },
          { name: 'قانون العقارات', href: '#real-estate-law', icon: <Key size={16} /> },
          { name: 'القانون التجاري', href: '#commercial-law', icon: <Briefcase size={16} /> },
          { name: 'قانون الأسرة', href: '#family-law', icon: <Heart size={16} /> },
          { name: 'القانون الإداري', href: '#administrative-law', icon: <Landmark size={16} /> },
          { name: 'قانون السير', href: '#traffic-law', icon: <Car size={16} /> }
        ],
        fr: [
          { name: 'Droit Civil', href: '#civil-law', icon: <FileText size={16} /> },
          { name: 'Droit Immobilier', href: '#real-estate-law', icon: <Key size={16} /> },
          { name: 'Droit Commercial', href: '#commercial-law', icon: <Briefcase size={16} /> },
          { name: 'Droit de la Famille', href: '#family-law', icon: <Heart size={16} /> },
          { name: 'Droit Administratif', href: '#administrative-law', icon: <Landmark size={16} /> },
          { name: 'Droit Routier', href: '#traffic-law', icon: <Car size={16} /> }
        ],
        en: [
          { name: 'Civil Law', href: '#civil-law', icon: <FileText size={16} /> },
          { name: 'Real Estate Law', href: '#real-estate-law', icon: <Key size={16} /> },
          { name: 'Commercial Law', href: '#commercial-law', icon: <Briefcase size={16} /> },
          { name: 'Family Law', href: '#family-law', icon: <Heart size={16} /> },
          { name: 'Administrative Law', href: '#administrative-law', icon: <Landmark size={16} /> },
          { name: 'Traffic Law', href: '#traffic-law', icon: <Car size={16} /> }
        ]
      }
    },
    { 
      name: { ar: 'المقالات', fr: 'Articles', en: 'Articles' }, 
      href: '/articles',
      icon: <Newspaper size={18} />,
      dropdown: {
        ar: [
          { name: 'أخبار قانونية', href: '/articles/news', icon: <Newspaper size={16} /> },
          { name: 'تحليلات', href: '/articles/analysis', icon: <BookOpen size={16} /> },
          { name: 'نصائح قانونية', href: '/articles/tips', icon: <CheckCircle size={16} /> },
          { name: 'سؤال وجواب', href: '/articles/faq', icon: <HelpCircle size={16} /> }
        ],
        fr: [
          { name: 'Nouvelles Juridiques', href: '/articles/news', icon: <Newspaper size={16} /> },
          { name: 'Analyses', href: '/articles/analysis', icon: <BookOpen size={16} /> },
          { name: 'Conseils Juridiques', href: '/articles/tips', icon: <CheckCircle size={16} /> },
          { name: 'FAQ', href: '/articles/faq', icon: <HelpCircle size={16} /> }
        ],
        en: [
          { name: 'Legal News', href: '/articles/news', icon: <Newspaper size={16} /> },
          { name: 'Analysis', href: '/articles/analysis', icon: <BookOpen size={16} /> },
          { name: 'Legal Tips', href: '/articles/tips', icon: <CheckCircle size={16} /> },
          { name: 'FAQ', href: '/articles/faq', icon: <HelpCircle size={16} /> }
        ]
      }
    },
    { 
      name: { ar: 'اتصل بنا', fr: 'Contact', en: 'Contact' }, 
      href: '/contact',
      icon: <Mail size={18} />
    }
  ];

  const languages = [
    { code: 'ar', name: 'العربية', short: 'AR', direction: 'rtl' },
    { code: 'fr', name: 'Français', short: 'FR', direction: 'ltr' },
    { code: 'en', name: 'English', short: 'EN', direction: 'ltr' }
  ];

  // Set document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close language dropdown
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      // Close desktop dropdowns
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDropdownEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (index) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };

  const handleLanguageChange = (code) => {
    const newLanguage = languages.find(lang => lang.code === code);
    if (newLanguage) {
      document.documentElement.dir = newLanguage.direction;
      document.documentElement.lang = code;
      onLanguageChange(code);
      setIsLanguageOpen(false);
      setIsOpen(false);
      setActiveDropdown(null);
      setMobileDropdown(null);
    }
  };

  const handleHashLinkClick = (href) => {
    // إذا كان الرابط يبدأ بـ # فهذا يعني رابط قسم في نفس الصفحة
    if (href.startsWith('#')) {
      // إذا كنا في الصفحة الرئيسية
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // إذا كنا في صفحة أخرى، نذهب إلى الصفحة الرئيسية ثم ننتقل إلى القسم
        window.location.href = `/${href}`;
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileDropdown(null);
    setIsLanguageOpen(false);
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={`bg-gradient-to-r from-[#c9a33e] via-[#d4b357] to-[#c9a33e] text-gray-900 py-2 transition-all duration-300 ${isScrolled ? 'opacity-90' : 'opacity-100'} hidden sm:block`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-sm font-medium" dir={isRTL ? 'rtl' : 'ltr'}>
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-center">
              {language === 'ar' 
                ? 'استشارة أولية مجانية! اتصل الآن: +212 6 XX XX XX XX' 
                : language === 'fr' 
                ? 'Consultation gratuite! Appelez maintenant: +212 6 XX XX XX XX'
                : 'Free initial consultation! Call now: +212 6 XX XX XX XX'}
            </span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Top Info Bar */}
      <div className={`bg-[#1a365d] text-white py-3 transition-all duration-500 ${isScrolled ? 'py-2 opacity-90' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
              <a href="tel:+2126XXXXXXX" className="flex items-center gap-2 hover:text-[#c9a33e] transition-colors group">
                <div className="relative">
                  <Phone size={16} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="hidden xs:inline">+212 6 XX XX XX XX</span>
                <span className="xs:hidden">{language === 'ar' ? 'اتصل' : 'Call'}</span>
              </a>
              
              <div className="hidden md:flex items-center gap-2">
                <MapPin size={16} />
                <span>{language === 'ar' ? 'الدار البيضاء، المغرب' : language === 'fr' ? 'Casablanca, Maroc' : 'Casablanca, Morocco'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="hidden sm:inline">9:00 - 17:00</span>
                <span className="sm:hidden">9-17</span>
              </div>
            </div>

            {/* Language & Actions */}
            <div className="flex items-center gap-3 sm:gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button 
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-all min-w-[80px] justify-center"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <Globe size={16} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {languages.find(lang => lang.code === language)?.short}
                  </span>
                  <span className="text-sm font-medium sm:hidden">
                    {languages.find(lang => lang.code === language)?.code}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className={`absolute top-full mt-2 ${isRTL ? 'right-0' : 'left-0'} bg-white text-gray-900 rounded-lg shadow-2xl py-2 min-w-[160px] z-[100] animate-fadeIn border border-gray-200`}>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {language === 'ar' ? 'اختر اللغة' : language === 'fr' ? 'Choisir la langue' : 'Select Language'}
                      </span>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-all ${language === lang.code ? 'bg-[#1a365d]/5' : ''}`}
                        dir={lang.direction}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${language === lang.code ? 'bg-[#c9a33e] text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <span className="text-xs font-bold">{lang.short}</span>
                          </div>
                          <span className="font-medium text-gray-800">{lang.name}</span>
                        </div>
                        {language === lang.code && (
                          <CheckCircle className="w-5 h-5 text-[#c9a33e]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* WhatsApp Quick */}
              <a 
                href="https://wa.me/2126XXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition-all"
              >
                <MessageCircle size={16} />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-white'}`} ref={dropdownRef}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo - Responsive */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
              onClick={closeAllDropdowns}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1a365d] to-[#2d4a8a] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <Star className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-[#c9a33e] animate-pulse" />
              </div>
              <div className={`${isRTL ? 'text-right' : 'text-left'} hidden sm:block`}>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a365d] leading-tight">
                  <span className="text-[#c9a33e]">
                    {language === 'ar' ? 'المحامي' : language === 'fr' ? 'Avocat' : 'Lawyer'}
                  </span>
                  <br className="hidden md:block" />
                  <span className="text-sm md:text-base lg:text-lg">
                    {language === 'ar' ? 'محمد اليزيدي' : language === 'fr' ? 'Mohamed El Yazidi' : 'Mohamed El Yazidi'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-medium hidden md:block">
                  {language === 'ar' ? 'مكتب قانوني معتمد' : language === 'fr' ? 'Cabinet Juridique Agréé' : 'Certified Law Office'}
                </div>
              </div>
              <div className="sm:hidden">
                <div className="text-lg font-bold text-[#1a365d]">
                  <span className="text-[#c9a33e]">
                    {language === 'ar' ? 'محامي' : language === 'fr' ? 'Avocat' : 'Lawyer'}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'ar' ? 'مكتب معتمد' : language === 'fr' ? 'Cabinet Agréé' : 'Certified'}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleHashLinkClick(item.href)}
                      className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 ${
                        location.pathname === '/' && location.hash === item.href
                          ? 'bg-gradient-to-r from-[#1a365d]/10 to-[#c9a33e]/10 text-[#1a365d] font-semibold'
                          : 'text-gray-700 hover:text-[#1a365d] hover:bg-gray-100'
                      }`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <span className="text-gray-600">
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.name[language]}</span>
                      {item.dropdown && (
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (item.dropdown) {
                          setActiveDropdown(index);
                        } else {
                          closeAllDropdowns();
                        }
                      }}
                      className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 ${
                        location.pathname === item.href 
                          ? 'bg-gradient-to-r from-[#1a365d]/10 to-[#c9a33e]/10 text-[#1a365d] font-semibold'
                          : 'text-gray-700 hover:text-[#1a365d] hover:bg-gray-100'
                      }`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <span className="text-gray-600">
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.name[language]}</span>
                      {item.dropdown && (
                        <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === index && (
                    <div 
                      className={`absolute top-full mt-2 min-w-[220px] xl:min-w-[240px] bg-white rounded-xl shadow-2xl py-2 z-[99] animate-fadeIn border border-gray-200 ${isRTL ? 'right-0' : 'left-0'}`}
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={handleDropdownLeave}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {item.name[language]}
                        </span>
                      </div>
                      {item.dropdown[language].map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleHashLinkClick(subItem.href)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all group w-full text-left"
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <div className="text-[#c9a33e]">
                            {subItem.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium text-gray-800 group-hover:text-[#1a365d] text-sm xl:text-base">
                              {subItem.name}
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-[#c9a33e] ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Search Button */}
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  closeAllDropdowns();
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all ml-2"
              >
                <Search size={20} className="text-gray-600" />
              </button>

              {/* Quick Appointment - Desktop */}
              <Link
                to="/appointment"
                onClick={closeAllDropdowns}
                className="flex items-center gap-2 ml-2 px-4 xl:px-6 py-2 xl:py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-bold rounded-lg hover:shadow-xl hover:shadow-[#c9a33e]/30 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <Calendar size={16} className="hidden xl:block" />
                <span>{language === 'ar' ? 'حجز موعد' : language === 'fr' ? 'Rendez-vous' : 'Book Now'}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  closeAllDropdowns();
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              
              {/* Mobile Appointment Button */}
              <Link
                to="/appointment"
                onClick={closeAllDropdowns}
                className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <Calendar size={16} />
                <span className="text-sm">{language === 'ar' ? 'موعد' : language === 'fr' ? 'RDV' : 'Book'}</span>
              </Link>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 border-t z-[100] animate-slideDown">
            <div className="container mx-auto">
              <div className="relative">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن خدماتنا...' : language === 'fr' ? 'Recherchez nos services...' : 'Search our services...'}
                  className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a33e] text-sm sm:text-base`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div 
            ref={mobileMenuRef}
            className={`absolute top-0 h-full bg-white w-full sm:w-80 shadow-2xl ${
              isRTL ? 'right-0' : 'left-0'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Mobile Header */}
            <div className="p-4 sm:p-6 border-b">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1a365d] to-[#2d4a8a] rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a365d]">
                      {language === 'ar' ? 'المحامي' : language === 'fr' ? 'Avocat' : 'Lawyer'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'ar' ? 'مكتب قانوني معتمد' : language === 'fr' ? 'Cabinet Agréé' : 'Certified Office'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-6">
                <a 
                  href="tel:+2126XXXXXXX"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1a365d] to-[#2d4a8a] text-white rounded-lg hover:opacity-90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={18} />
                  <span className="font-medium">{language === 'ar' ? 'اتصل' : language === 'fr' ? 'Appeler' : 'Call'}</span>
                </a>
                <Link
                  to="/appointment"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 rounded-lg hover:opacity-90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar size={18} />
                  <span className="font-medium">{language === 'ar' ? 'موعد' : language === 'fr' ? 'Rendez-vous' : 'Appointment'}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
              {navItems.map((item, index) => (
                <div key={index} className="mb-1">
                  <div className="flex items-center">
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => {
                          handleHashLinkClick(item.href);
                          if (!item.dropdown) {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }
                        }}
                        className={`flex items-center gap-3 flex-1 p-4 rounded-lg transition-all ${
                          location.pathname === '/' && location.hash === item.href
                            ? 'bg-gradient-to-r from-[#1a365d]/10 to-[#c9a33e]/10 text-[#1a365d] font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-gray-600">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name[language]}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={`flex items-center gap-3 flex-1 p-4 rounded-lg transition-all ${
                          location.pathname === item.href 
                            ? 'bg-gradient-to-r from-[#1a365d]/10 to-[#c9a33e]/10 text-[#1a365d] font-semibold'
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (!item.dropdown) {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }
                        }}
                      >
                        <div className="text-gray-600">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name[language]}</span>
                      </Link>
                    )}
                    
                    {item.dropdown && (
                      <button
                        onClick={() => toggleMobileDropdown(index)}
                        className="p-4 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <ChevronDown size={16} className={`transition-transform ${mobileDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && mobileDropdown === index && (
                    <div className="ml-10 mt-1 space-y-1">
                      {item.dropdown[language].map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleHashLinkClick(subItem.href)}
                          className="flex items-center gap-3 p-3 pl-4 rounded-lg hover:bg-gray-50 transition-all w-full text-left"
                        >
                          <div className="text-[#c9a33e]">
                            {subItem.icon}
                          </div>
                          <span className="text-gray-700">{subItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t p-4 sm:p-6 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  {language === 'ar' ? 'اختر اللغة' : language === 'fr' ? 'Choisir la langue' : 'Select Language'}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                        language === lang.code 
                          ? 'bg-[#1a365d] text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                      }`}
                      dir={lang.direction}
                    >
                      <span className="text-lg font-bold mb-1">{lang.short}</span>
                      <span className="text-xs">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <a 
                href="https://wa.me/2126XXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all mb-4"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
              
              <div className="text-center text-xs text-gray-600">
                {language === 'ar' 
                  ? 'مكتب المحاماة المتخصص - جميع الحقوق محفوظة © 2024'
                  : language === 'fr'
                  ? 'Cabinet d\'Avocats Spécialisé - Tous droits réservés © 2024'
                  : 'Specialized Law Office - All rights reserved © 2024'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;