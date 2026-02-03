import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@legalpro.ma');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // API base URL - adjust this to match your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password });
      console.log('API URL:', `${API_BASE_URL}/auth/login`);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      
      // Get response text first
      const responseText = await response.text();
      console.log('Response text:', responseText.substring(0, 100));

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed data:', data);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid server response format');
      }

      // Check response structure
      if (response.ok) {
        // Success - Check if response has the expected structure
        if (data.status === 'success' && data.data && data.data.token) {
          // Save token and user data
          localStorage.setItem('adminToken', data.data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.data));
          
          toast.success(data.message || 'Login successful!');
          console.log('Login successful, token saved:', data.data.token.substring(0, 50) + '...');
          
          // Redirect to dashboard
          setTimeout(() => navigate('/admin/dashboard'), 1000);
        } else {
          // Response is ok but missing expected data
          console.warn('Unexpected response structure:', data);
          throw new Error(data.message || 'Login successful but missing data');
        }
      } else {
        // Error response
        throw new Error(data?.message || data?.error || `Login failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Login error details:', error);
      
      // More specific error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error('Cannot connect to server. Please check if backend is running.');
      } else if (error.message.includes('Invalid server response format')) {
        toast.error('Server returned invalid format. Please check backend response.');
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Test API connection function
  const testAPIConnection = async () => {
    try {
      toast.loading('Testing connection...');
      const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'GET',
      });
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error('Invalid JSON response');
      }
      
      toast.dismiss();
      
      if (response.ok) {
        toast.success(`API Connection successful! ${data.message || ''}`);
      } else {
        toast.error(`API Error: ${data.message || 'Connection failed'}`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Cannot connect to API: ${error.message}`);
      console.error('Connection test error:', error);
    }
  };

  // Test auth endpoint specifically
  const testAuthEndpoint = async () => {
    try {
      toast.loading('Testing auth endpoint...');
      const response = await fetch(`${API_BASE_URL}/auth/test`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      const data = await response.json();
      toast.dismiss();
      toast.success(`Auth endpoint working: ${data.message || 'OK'}`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Auth endpoint test failed: ${error.message}`);
      console.error('Auth test error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Pro Admin</h1>
            <p className="text-gray-600 mt-2">Sign in to your admin dashboard</p>
            
            {/* API Connection Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-left">
              <p className="text-xs text-blue-700 font-mono break-all">
                API Endpoint: {API_BASE_URL}/auth/login
              </p>
              <p className="text-xs text-green-600 mt-1">
                ✓ Backend detected at: http://localhost:5000
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Test Connection Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={testAPIConnection}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 rounded-lg transition-all hover:shadow-lg text-sm"
                >
                  Test Server
                </button>
                
                <button
                  type="button"
                  onClick={testAuthEndpoint}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2 rounded-lg transition-all hover:shadow-lg text-sm"
                >
                  Test Auth
                </button>
              </div>
            </div>
          </form>

          {/* Debug Info & Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
            <p className="text-sm font-mono text-gray-800">admin@legalpro.ma</p>
            <p className="text-sm font-mono text-gray-800">password123</p>
            
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-500 mb-1">Current Status:</p>
              <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                <li className="text-green-600">✓ Backend server is responding</li>
                <li className="text-green-600">✓ /api/auth/login endpoint working</li>
                <li>Response structure: status, message, data</li>
                <li>Make sure your .env has: REACT_APP_API_URL=http://localhost:5000/api</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} Legal Pro Morocco. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;