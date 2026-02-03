import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, BookOpen, Shield, Award, Gavel } from 'lucide-react';

// Modern Loading Component with 3D Lawyer Theme
const LoadingSpinner = ({ message = "Loading..." }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a] overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Law Books */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: rotation + i * 72,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <BookOpen className="w-16 h-16 text-yellow-400/20" />
          </motion.div>
        ))}

        {/* Floating Scales */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: 0.8 + Math.random() * 0.4,
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
            <Scale className="w-20 h-20 text-yellow-500/30" />
          </motion.div>
        ))}

        {/* 3D Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-400/40"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5,
            }}
            animate={{
              y: ["0px", "-50px", "0px"],
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

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* 3D Animated Lawyer Logo */}
        <div className="relative w-48 h-48 mx-auto mb-12">
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
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
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
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-500 rounded-full"
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
            className="absolute inset-8 border-3 border-yellow-500/50 rounded-full"
          />

          {/* Center Logo */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateX: [0, 20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'perspective(1000px)',
            }}
          >
            <div className="relative">
              {/* Lawyer Icon */}
              <Gavel className="w-16 h-16 text-white" />
              
              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
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
              <Shield className="w-8 h-8 text-yellow-400" fill="currentColor" fillOpacity="0.3" />
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
              <Award className="w-8 h-8 text-yellow-400" fill="currentColor" fillOpacity="0.3" />
            </motion.div>
          </motion.div>
        </div>

        {/* Loading Text & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              {message}
            </span>
          </h3>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-md h-3 bg-white/10 rounded-full overflow-hidden mx-auto mb-8">
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
                className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>
          </div>

          {/* Loading Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-yellow-300/80 text-sm font-medium">
              Initializing Justice System Interface...
            </p>
            <div className="flex justify-center gap-8 text-xs text-gray-400">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Security Protocols
                </span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Legal Database
                </span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Consultation System
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-gray-400 text-sm">
            Your journey to justice begins here
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
            className="text-yellow-400/60 text-xs mt-2"
          >
            ⚖️ Excellence in Legal Representation Since 2008
          </motion.p>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-yellow-400/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-yellow-400/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-yellow-400/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-yellow-400/20" />
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

// Admin Components - ADD THESE IMPORTS
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');
  
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Fallback component for lazy loading
const LoadingFallback = ({ height = "h-64" }) => (
  <div className={`w-full ${height} flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]`}>
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Gavel className="w-8 h-8 text-yellow-500 animate-pulse" />
      </div>
    </div>
  </div>
);

// Admin Loading Fallback
const AdminLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading admin panel...</p>
    </div>
  </div>
);

// Page loading skeleton components
const AppointmentSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a] py-12 lg:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="text-center mb-12 lg:mb-16">
        <div className="inline-block h-12 w-48 bg-white/10 rounded-full mb-6 animate-pulse mx-auto"></div>
        <div className="h-16 w-3/4 bg-white/10 rounded-xl mb-6 animate-pulse mx-auto"></div>
        <div className="h-6 w-1/2 bg-white/10 rounded-lg mb-4 animate-pulse mx-auto"></div>
        <div className="h-4 w-2/3 bg-white/10 rounded-lg animate-pulse mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Form Skeleton */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-white/10 rounded mb-3 animate-pulse"></div>
                  <div className="h-12 bg-white/5 rounded-xl animate-pulse"></div>
                </div>
              ))}
            </div>
            
            <div>
              <div className="h-4 w-32 bg-white/10 rounded mb-3 animate-pulse"></div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 w-32 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-4 w-32 bg-white/10 rounded mb-3 animate-pulse"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="h-4 w-40 bg-white/10 rounded mb-3 animate-pulse"></div>
              <div className="h-32 bg-white/5 rounded-xl animate-pulse"></div>
            </div>

            <div className="h-14 bg-gradient-to-r from-yellow-500/30 to-yellow-400/30 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Contact Info Skeleton */}
        <div className="space-y-8">
          <div className="h-32 bg-white/5 rounded-2xl animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-36 bg-white/5 rounded-2xl animate-pulse"></div>
            ))}
          </div>
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Animated Route Wrapper
const AnimatedRoute = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      duration: 0.5,
      delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);

// App Routes Component
const AppRoutes = ({ language }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <Home language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <ServicesPage language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <About language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<LoadingFallback height="h-[60vh]" />}>
                <Contact language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/appointment" 
          element={
            <AnimatedRoute>
              <Suspense fallback={<AppointmentSkeleton />}>
                <Appointment language={language} />
              </Suspense>
            </AnimatedRoute>
          } 
        />
        <Route 
          path="/appointment-confirmation/:referenceNumber" 
          element={
            <AnimatedRoute>
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
              <Suspense fallback={<AdminLoadingFallback />}>
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
                <Suspense fallback={<AdminLoadingFallback />}>
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

        {/* Add a 404 route for unmatched paths */}
        <Route 
          path="*" 
          element={
            <AnimatedRoute>
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1931] via-[#1a365d] to-[#2d4a8a]">
                <div className="text-center text-white p-8">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-xl mb-8">Page Not Found</p>
                  <a 
                    href="/" 
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
                  >
                    Return Home
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

  // Simulate initial app loading with progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Justice. Excellence. Trust." />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Conditionally render Navbar and Footer - hide for admin routes */}
        <Suspense fallback={
          <div className="h-20 bg-gradient-to-r from-[#0a1931] to-[#1a365d] animate-pulse" />
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

        {/* Conditionally render Footer - hide for admin routes */}
        <Suspense fallback={
          <div className="h-64 bg-gradient-to-b from-[#0f1e3d] to-[#1a365d] animate-pulse" />
        }>
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Footer language={language} />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;