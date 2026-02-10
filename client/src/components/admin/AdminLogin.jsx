import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Scale,
  BookOpen,
  Shield,
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  Key,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Briefcase,
  Building,
  Server,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings
} from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@legalpro.ma');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [serverStatus, setServerStatus] = useState('checking');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const navigate = useNavigate();

  // URL de l'API
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Vérifier la connectivité réseau au démarrage
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      checkServerConnection();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setServerStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    checkServerConnection();

    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRemember = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    const lockoutEnd = localStorage.getItem('accountLockout');
    if (lockoutEnd) {
      const lockoutEndTime = new Date(lockoutEnd);
      if (lockoutEndTime > new Date()) {
        setLockoutTime(lockoutEndTime);
      } else {
        localStorage.removeItem('accountLockout');
        localStorage.removeItem('failedAttempts');
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Vérifier la connexion au serveur
  const checkServerConnection = async () => {
    if (!navigator.onLine) {
      setServerStatus('offline');
      return false;
    }

    setServerStatus('checking');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setServerStatus('online');
        return true;
      } else {
        setServerStatus('error');
        return false;
      }
    } catch (error) {
      setServerStatus('offline');
      return false;
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lockoutTime && lockoutTime > new Date()) {
      const remainingMinutes = Math.ceil((lockoutTime - new Date()) / (1000 * 60));
      toast.error(`Compte temporairement verrouillé. Réessayez dans ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.`);
      return;
    }

    if (!email || !password) {
      toast.error('Veuillez saisir votre email et mot de passe');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Veuillez saisir une adresse email valide');
      return;
    }

    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Réponse du serveur invalide');
      }

      if (response.ok) {
        if (data.status === 'success' && data.data && data.data.token) {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberMe');
          }

          localStorage.removeItem('failedAttempts');
          setFailedAttempts(0);

          localStorage.setItem('adminToken', data.data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.data));
          
          toast.success('Connexion réussie ! Redirection...');
          
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 1000);
        } else {
          throw new Error('Structure de réponse invalide');
        }
      } else {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        localStorage.setItem('failedAttempts', attempts.toString());

        if (attempts >= 5) {
          const lockoutEnd = new Date(Date.now() + 15 * 60 * 1000);
          localStorage.setItem('accountLockout', lockoutEnd.toISOString());
          setLockoutTime(lockoutEnd);
          toast.error('Trop de tentatives échouées. Compte verrouillé pendant 15 minutes.');
        } else {
          throw new Error(data?.message || `Identifiants incorrects (${5 - attempts} tentatives restantes)`);
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        toast.error('Délai de connexion dépassé. Veuillez réessayer.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error('Erreur réseau. Vérifiez votre connexion internet.');
        setIsOnline(false);
        setServerStatus('offline');
      } else if (error.message.includes('offline')) {
        toast.error('Vous êtes hors ligne. Vérifiez votre connexion internet.');
      } else {
        toast.error(error.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
      }
      
      checkServerConnection();
    } finally {
      setLoading(false);
    }
  };

  // Réessayer la connexion serveur
  const retryConnection = async () => {
    setServerStatus('checking');
    const success = await checkServerConnection();
    
    if (success) {
      toast.success('Connexion au serveur rétablie !');
    } else {
      toast.error('Impossible de se connecter au serveur');
    }
  };

  // Utiliser les identifiants de démonstration
  const useDemoCredentials = () => {
    setEmail('admin@cabinet.ma');
    setPassword('password123');
    toast.success('Identifiants de démonstration chargés');
  };

  const resetForm = () => {
    setEmail('admin@legalpro.ma');
    setPassword('');
    toast.success('Formulaire réinitialisé');
  };

  const lockoutRemaining = lockoutTime ? Math.ceil((lockoutTime - new Date()) / (1000 * 60)) : 0;

  // Obtenir l'icône du statut
  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    
    switch (serverStatus) {
      case 'online': return <Wifi className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      case 'checking': return <RefreshCw className="w-4 h-4 animate-spin" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 p-4 md:p-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a202c',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px'
          },
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Section gauche - Présentation cabinet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-2/5"
          >
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-2xl p-8 h-full">
              <div className="flex flex-col h-full">
                {/* Logo et titre */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-900/30 rounded-xl">
                      <Scale className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">Legal Pro</h1>
                      <p className="text-stone-300 text-sm">Cabinet d'Avocats</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
                  
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Espace Professionnel Réservé
                  </h2>
                </div>

                {/* Détails cabinet */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-900/20 rounded-lg mt-1">
                      <Building className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Cabinet Principal</p>
                      <p className="text-sm text-stone-300">Casablanca, Morocco</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-900/20 rounded-lg mt-1">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Spécialisations</p>
                      <p className="text-sm text-stone-300">Droit des affaires • Droit pénal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-900/20 rounded-lg mt-1">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Depuis 2008</p>
                      <p className="text-sm text-stone-300">Excellence juridique</p>
                    </div>
                  </div>

                  {/* Statut serveur */}
                  <div className="mt-6 pt-6 border-t border-stone-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          serverStatus === 'online' ? 'bg-green-900/30' : 
                          serverStatus === 'checking' ? 'bg-yellow-900/30' : 'bg-red-900/30'
                        }`}>
                          {getStatusIcon()}
                        </div>
                        <div>
                          <p className="text-sm text-stone-300">Statut système</p>
                          <p className="text-xs font-medium text-stone-400">
                            {serverStatus === 'online' ? 'Connecté' : 
                             serverStatus === 'checking' ? 'Vérification...' : 'Déconnecté'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={retryConnection}
                        disabled={serverStatus === 'checking'}
                        className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Citation */}
                <div className="mt-auto pt-6 border-t border-stone-700">
                  <div className="relative">
                    <div className="absolute -top-4 -left-2 text-4xl text-amber-600/30">"</div>
                    <p className="text-stone-300 italic text-sm pl-6">
                      La justice est la garantie des droits de chaque citoyen.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-xs text-stone-400">Maître Ahmed</span>
                      </div>
                      <Shield className="w-4 h-4 text-amber-500/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section droite - Formulaire login */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-3/5"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 h-full">
              {/* En-tête formulaire */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl mb-6 border border-stone-200">
                  <div className="relative">
                    <Shield className="w-10 h-10 text-stone-700" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">
                  Connexion Avocat
                </h3>
                <p className="text-stone-600">
                  Accédez à votre espace de travail sécurisé
                </p>
              </div>

              {/* Indicateur de verrouillage */}
              {lockoutRemaining > 0 && (
                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-red-900">
                        Accès temporairement suspendu
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        Réessayez dans {lockoutRemaining} minute{lockoutRemaining > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ Email */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Identifiant professionnel
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-500"
                      placeholder="avocat@cabinet.ma"
                      required
                      disabled={loading || lockoutRemaining > 0}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Champ Mot de passe */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-stone-700">
                      Code d'accès
                    </label>
                    {failedAttempts > 0 && (
                      <span className="text-xs text-amber-600">
                        {5 - failedAttempts} tentatives restantes
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-500"
                      placeholder="••••••••"
                      required
                      disabled={loading || lockoutRemaining > 0}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                      disabled={loading || lockoutRemaining > 0}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                      disabled={loading || lockoutRemaining > 0}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-700">
                      Se souvenir de moi
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={useDemoCredentials}
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
                    disabled={loading || lockoutRemaining > 0}
                  >
                    <Key className="w-4 h-4 mr-1" />
                    Identifiants démo
                  </button>
                </div>

                {/* Actions rapides */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={useDemoCredentials}
                    className="flex-1 py-3 px-4 border border-amber-200 text-amber-700 hover:bg-amber-50 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    disabled={loading || lockoutRemaining > 0}
                  >
                    <Key className="w-4 h-4" />
                    <span className="text-sm font-medium">Identifiants de test</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl transition-all disabled:opacity-50"
                    disabled={loading || lockoutRemaining > 0}
                  >
                    <span className="text-sm font-medium">Nettoyer</span>
                  </button>
                </div>

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={loading || !isOnline || serverStatus !== 'online' || lockoutRemaining > 0}
                  className={`w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white font-medium py-4 px-4 rounded-xl transition-all flex items-center justify-center space-x-3 group ${
                    loading || !isOnline || serverStatus !== 'online' || lockoutRemaining > 0
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-xl hover:shadow-stone-900/10 hover:from-stone-900 hover:to-stone-950 active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : !isOnline ? (
                    <>
                      <WifiOff className="w-5 h-5" />
                      <span>Hors ligne</span>
                    </>
                  ) : serverStatus !== 'online' ? (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      <span>Serveur indisponible</span>
                    </>
                  ) : lockoutRemaining > 0 ? (
                    <>
                      <Clock className="w-5 h-5" />
                      <span>Accès suspendu ({lockoutRemaining}min)</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Accéder à l'espace avocat</span>
                    </>
                  )}
                </button>

                {/* Indicateur de sécurité */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-stone-100 rounded-lg">
                        <Shield className="w-4 h-4 text-stone-600" />
                      </div>
                      <span className="text-xs text-stone-500 mt-1">Confidentialité</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-stone-100 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-stone-600" />
                      </div>
                      <span className="text-xs text-stone-500 mt-1">Sécurisé</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-stone-100 rounded-lg">
                        <Server className="w-4 h-4 text-stone-600" />
                      </div>
                      <span className="text-xs text-stone-500 mt-1">Backend</span>
                    </div>
                  </div>
                </div>
              </form>

              {/* Note importante */}
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-amber-900">
                      Mode démonstration activé
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Email: admin@legalpro.ma | Mot de passe: password123
                    </p>
                    <p className="text-xs text-amber-600 mt-2">
                      ⚠️ Backend requis: /api/auth/login et /api/health
                    </p>
                  </div>
                </div>
              </div>

              {/* Dépannage de connexion */}
              {serverStatus !== 'online' && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-start">
                    <Settings className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 mb-1">
                        Problèmes de connexion ?
                      </p>
                      <p className="text-xs text-yellow-700">
                        Assurez-vous que le serveur backend est en cours d'exécution
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pied de page formulaire */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <div className="text-center">
                  <p className="text-xs text-stone-500">
                    © {new Date().getFullYear()} Legal Pro Cabinet d'Avocats
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Système professionnel • Version Backend
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Message responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-stone-500">
            ⚖️ Système dédié aux professionnels du droit • Backend Ready
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;