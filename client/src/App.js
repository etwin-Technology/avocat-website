import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, BookOpen, Shield, Award, Gavel, Globe } from 'lucide-react';

// Modern Loading Component with 3D Lawyer Theme - Responsive
const LoadingSpinner = ({ message = "Loading..." }) => {
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 20);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a] overflow-hidden touch-manipulation">
      {/* Responsive Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Law Books - Reduced count on mobile */}
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: isMobile ? 0.3 + Math.random() * 0.4 : 0.5 + Math.random() * 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: rotation + i * 72,
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <BookOpen className={`${isMobile ? 'w-8 h-8' : 'w-16 h-16'} text-yellow-400/20`} />
          </motion.div>
        ))}

        {/* Floating Scales - Responsive sizing */}
        {[...Array(isMobile ? 2 : 3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: isMobile ? 0.6 + Math.random() * 0.3 : 0.8 + Math.random() * 0.4,
            }}
            animate={{
              y: ["0%", "20%", "0%"],
              rotate: rotation * (i + 1),
            }}
            transition={{
              y: {
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <Scale className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} text-yellow-500/30`} />
          </motion.div>
        ))}

        {/* 3D Particles - Reduced count on mobile */}
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-yellow-400/40 ${isMobile ? 'w-1 h-1' : 'w-2 h-2'}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5,
            }}
            animate={{
              y: ["0px", "-30px", "0px"],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main Loading Content - Responsive */}
      <div className="relative z-10 text-center max-w-2xl px-4 w-full">
        {/* 3D Animated Lawyer Logo - Responsive */}
        <div className={`relative mx-auto mb-8 md:mb-12 ${isMobile ? 'w-32 h-32' : 'w-48 h-48'}`}>
          {/* Outer Ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 border-4 border-yellow-400/30 rounded-full"
          >
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`absolute -top-2 -right-2 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} bg-yellow-400 rounded-full`}
            />
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`absolute -bottom-2 -left-2 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} bg-yellow-500 rounded-full`}
            />
          </motion.div>

          {/* Middle Ring */}
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className={`absolute border-3 border-yellow-500/50 rounded-full ${isMobile ? 'inset-6' : 'inset-8'}`}
          />

          {/* Center Logo */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotateX: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl ${isMobile ? 'inset-8' : 'inset-12'}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'perspective(1000px)',
            }}
          >
            <div className="relative">
              {/* Lawyer Icon */}
              <Gavel className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} text-white`} />
              
              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: [-60, 60],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 ${isMobile ? 'w-16' : 'w-20'}`}
              />
            </div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-yellow-400`} fill="currentColor" fillOpacity="0.3" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeInOut"
              }}
            >
              <Award className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-yellow-400`} fill="currentColor" fillOpacity="0.3" />
            </motion.div>
          </motion.div>
        </div>

        {/* Loading Text & Progress - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-2"
        >
          <h3 className={`font-bold text-white mb-4 md:mb-6 tracking-wide ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              {message}
            </span>
          </h3>

          {/* Animated Progress Bar */}
          <div className={`w-full max-w-md h-2 md:h-3 bg-white/10 rounded-full overflow-hidden mx-auto mb-6 md:mb-8`}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.8,
                ease: "easeInOut"
              }}
              className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative"
            >
              {/* Progress Bar Shimmer */}
              <motion.div
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 ${isMobile ? 'w-12' : 'w-20'}`}
              />
            </motion.div>
          </div>

          {/* Loading Status - Responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            <p className="text-yellow-300/80 text-xs md:text-sm font-medium">
              {isMobile ? 'Loading interface...' : 'Initializing Justice System Interface...'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-xs text-gray-400">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full" />
                  {isMobile ? 'Security' : 'Security Protocols'}
                </span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <span className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full" />
                  {isMobile ? 'Database' : 'Legal Database'}
                </span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                <span className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full" />
                  {isMobile ? 'Consultation' : 'Consultation System'}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Text - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 md:mt-12"
        >
          <p className="text-gray-400 text-xs md:text-sm">
            {isMobile ? 'Your justice journey' : 'Your journey to justice begins here'}
          </p>
          <motion.p
            animate={{
              textShadow: [
                "0 0 8px rgba(255, 255, 255, 0)",
                "0 0 8px rgba(255, 255, 255, 0.5)",
                "0 0 8px rgba(255, 255, 255, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-yellow-400/60 text-xs mt-1 md:mt-2"
          >
            ⚖️ {isMobile ? 'Legal Excellence' : 'Excellence in Legal Representation Since 2008'}
          </motion.p>
        </motion.div>
      </div>

      {/* Corner Accents - Responsive */}
      <div className={`absolute top-0 left-0 border-t-2 border-l-2 border-yellow-400/20 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'}`} />
      <div className={`absolute top-0 right-0 border-t-2 border-r-2 border-yellow-400/20 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'}`} />
      <div className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-yellow-400/20 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'}`} />
      <div className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-yellow-400/20 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'}`} />
    </div>
  );
};

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Appointment = lazy(() => import('./pages/Appointment'));
const AppointmentConfirmation = lazy(() => import('./components/AppointmentConfirmation'));

// Admin Components
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Language Context
const LanguageContext = React.createContext();

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');
  
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Modern Loading Fallback Component
const LoadingFallback = ({ height = "h-64", isAdmin = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center p-4">
          <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
          <p className="text-gray-600 text-sm md:text-base">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${height} flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]`}>
      <div className="relative">
        <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Gavel className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-yellow-500 animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

// Responsive Appointment Skeleton
const AppointmentSkeleton = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a] py-6 md:py-12 lg:py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header Skeleton */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className={`inline-block h-${isMobile ? '8' : '12'} w-${isMobile ? '32' : '48'} bg-white/10 rounded-full mb-4 md:mb-6 animate-pulse mx-auto`}></div>
          <div className={`h-${isMobile ? '12' : '16'} w-${isMobile ? 'full' : '3/4'} bg-white/10 rounded-xl mb-4 md:mb-6 animate-pulse mx-auto`}></div>
          <div className={`h-${isMobile ? '4' : '6'} w-${isMobile ? '2/3' : '1/2'} bg-white/10 rounded-lg mb-3 md:mb-4 animate-pulse mx-auto`}></div>
          <div className={`h-${isMobile ? '3' : '4'} w-${isMobile ? '4/5' : '2/3'} bg-white/10 rounded-lg animate-pulse mx-auto`}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Form Skeleton */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className={`h-3 md:h-4 w-${isMobile ? '20' : '24'} bg-white/10 rounded mb-2 md:mb-3 animate-pulse`}></div>
                    <div className="h-10 md:h-12 bg-white/5 rounded-lg md:rounded-xl animate-pulse"></div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className={`h-3 md:h-4 w-${isMobile ? '24' : '32'} bg-white/10 rounded mb-2 md:mb-3 animate-pulse`}></div>
                <div className={`grid grid-cols-${isMobile ? '2' : '3'} gap-${isMobile ? '2' : '3'}`}>
                  {[...Array(isMobile ? 4 : 6)].map((_, i) => (
                    <div key={i} className={`h-${isMobile ? '16' : '24'} bg-white/5 rounded-lg md:rounded-xl animate-pulse`}></div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className={`h-3 md:h-4 w-${isMobile ? '24' : '32'} bg-white/10 rounded mb-2 md:mb-3 animate-pulse`}></div>
                  <div className={`grid grid-cols-${isMobile ? '2' : '3'} gap-${isMobile ? '1' : '2'}`}>
                    {[...Array(isMobile ? 2 : 3)].map((_, i) => (
                      <div key={i} className={`h-${isMobile ? '12' : '20'} bg-white/5 rounded-lg md:rounded-xl animate-pulse`}></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={`h-3 md:h-4 w-${isMobile ? '24' : '32'} bg-white/10 rounded mb-2 md:mb-3 animate-pulse`}></div>
                  <div className={`grid grid-cols-${isMobile ? '2' : '4'} gap-${isMobile ? '1' : '2'}`}>
                    {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                      <div key={i} className={`h-${isMobile ? '8' : '12'} bg-white/5 rounded-lg md:rounded-xl animate-pulse`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className={`h-3 md:h-4 w-${isMobile ? '32' : '40'} bg-white/10 rounded mb-2 md:mb-3 animate-pulse`}></div>
                <div className={`h-${isMobile ? '24' : '32'} bg-white/5 rounded-lg md:rounded-xl animate-pulse`}></div>
              </div>

              <div className={`h-${isMobile ? '12' : '14'} bg-gradient-to-r from-yellow-500/30 to-yellow-400/30 rounded-lg md:rounded-xl animate-pulse`}></div>
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className={`h-${isMobile ? '24' : '32'} bg-white/5 rounded-lg md:rounded-2xl animate-pulse`}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-${isMobile ? '28' : '36'} bg-white/5 rounded-lg md:rounded-2xl animate-pulse`}></div>
              ))}
            </div>
            <div className={`h-${isMobile ? '48' : '64'} bg-white/5 rounded-lg md:rounded-2xl animate-pulse`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Responsive Animated Route Wrapper
const AnimatedRoute = ({ children, delay = 0, isRTL = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.4,
      delay,
      ease: "easeOut"
    }}
    className="w-full"
    dir={isRTL ? 'rtl' : 'ltr'}
  >
    {children}
  </motion.div>
);

// Language Selector Component
const LanguageSelector = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative" dir={currentLang?.dir || 'ltr'}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 touch-manipulation group"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-white font-medium text-sm md:text-base">
          {isMobile ? currentLang?.code.toUpperCase() : currentLang?.name}
        </span>
        <div className={`w-2 h-2 border-b-2 border-r-2 border-white transform transition-transform duration-300 ${isOpen ? 'rotate-225' : 'rotate-45'}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ${currentLang?.dir === 'rtl' ? 'right-0' : 'left-0'} bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-2 min-w-[140px] z-[100] animate-fadeIn border border-white/20`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
                document.documentElement.dir = lang.dir;
                document.documentElement.lang = lang.code;
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-white/30 transition-all duration-300 touch-manipulation ${language === lang.code ? 'bg-white/20' : ''}`}
              dir={lang.dir}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-800 text-sm md:text-base">{lang.name}</span>
                <span className="text-xs text-gray-600">{lang.code.toUpperCase()}</span>
              </div>
              {language === lang.code && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Floating Help Button - Responsive
const FloatingHelpButton = ({ language }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Hide on scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isRTL = language === 'ar';

  if (!isVisible) return null;

  return (
    <div className={`fixed ${isRTL ? 'left-4' : 'right-4'} bottom-4 md:bottom-6 z-40`}>
      <div className="flex flex-col gap-2 md:gap-3">
        <a
          href="https://wa.me/2126XXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all hover:scale-110 active:scale-95 touch-manipulation`}
          aria-label="WhatsApp"
        >
          <svg className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`} fill="white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.08-.2-.05-.09.02-1.49.95-2.11 1.37-.25.17-.47.25-.67.25-.28 0-.68-.13-1.04-.25-.42-.14-.8-.21-1.77-.75-.64-.35-1.13-.56-1.13-1.13 0-.42.32-.82.89-1.23 1.02-.72 2.27-1.23 3.63-1.23 1.36 0 1.97.31 2.42.57.39.22.7.5.93.82.23.33.31.74.23 1.15z"/>
          </svg>
        </a>
        <a
          href="tel:+2126XXXXXXX"
          className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-110 active:scale-95 touch-manipulation`}
          aria-label="Call"
        >
          <svg className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`} fill="white" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

// App Routes Component with RTL support
const AppRoutes = ({ language }) => {
  const location = useLocation();
  const isRTL = language === 'ar';

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <Home language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <ServicesPage language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <About language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <Contact language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/appointment" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<AppointmentSkeleton />}>
                <Appointment language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/appointment-confirmation/:referenceNumber" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <AppointmentConfirmation language={language} />
              </Suspense>
            </AnimatedRoute>
          }
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<LoadingFallback isAdmin />}>
                <AdminLogin />
              </Suspense>
            </AnimatedRoute>
          }
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AnimatedRoute>
                <Suspense fallback={<LoadingFallback isAdmin />}>
                  <AdminDashboard />
                </Suspense>
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin" 
          element={
            <Navigate to="/admin/dashboard" replace />
          }
        />

        {/* 404 Page */}
        <Route 
          path="*" 
          element={
            <AnimatedRoute isRTL={isRTL}>
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]">
                <div className="text-center text-white p-4 md:p-8 max-w-md">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">404</h1>
                  <p className="text-lg md:text-2xl mb-6 md:mb-8">
                    {language === 'ar' ? 'الصفحة غير موجودة' : language === 'fr' ? 'Page non trouvée' : 'Page Not Found'}
                  </p>
                  <a 
                    href="/" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all text-sm md:text-base"
                  >
                    {language === 'ar' ? 'العودة للرئيسية' : language === 'fr' ? 'Retour à l\'accueil' : 'Return Home'}
                  </a>
                </div>
              </div>
            </AnimatedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  const [language, setLanguage] = useState('ar');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set initial document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Simulate loading
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [language]);

  if (isLoading) {
    return <LoadingSpinner message="Justice. Excellence. Trust." />;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <div className="min-h-screen bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {/* Language Selector Floating Button for Mobile */}
          {isMobile && !window.location.pathname.startsWith('/admin') && (
            <div className="fixed bottom-20 right-4 z-40">
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
            </div>
          )}

          {/* Conditionally render Navbar */}
          <Suspense fallback={
            <div className="h-16 md:h-20 bg-gradient-to-r from-[#0a1931] to-[#1a365d] animate-pulse" />
          }>
            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={
                <Navbar language={language} onLanguageChange={setLanguage} />
              } />
            </Routes>
          </Suspense>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-140px)]">
            <AppRoutes language={language} />
          </main>

          {/* Floating Help Buttons */}
          {!window.location.pathname.startsWith('/admin') && (
            <FloatingHelpButton language={language} />
          )}

          {/* Conditionally render Footer */}
          <Suspense fallback={
            <div className="h-48 md:h-64 bg-gradient-to-b from-[#0f1e3d] to-[#1a365d] animate-pulse" />
          }>
            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={<Footer language={language} />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;