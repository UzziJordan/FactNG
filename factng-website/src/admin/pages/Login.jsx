import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Fact NG Logo.png';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdError } from 'react-icons/md';
import { login } from '../../services/api';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({ email, password });
      
      // Store the token
      localStorage.setItem('token', data.token);
      
      // Store admin info if needed
      if (data.admin) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
      }

      // Success! Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3f1] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo & Branding */}
        <div className="text-center mb-10">
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={Logo} alt="FactNG Logo" className="h-20 mx-auto mb-4" 
          />
          <h1 className="text-3xl font-black text-[#1A1A1A]">Admin Portal</h1>
          <p className="text-gray-500 mt-2">Sign in to manage the FactNG platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium overflow-hidden"
            >
              <MdError className="text-xl flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@factng.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#f5f3f1] rounded-2xl outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-[#f5f3f1] rounded-2xl outline-none focus:ring-2 focus:ring-[#C41E24]/20 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C41E24] transition"
                  disabled={loading}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#C41E24]" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#C41E24] font-bold hover:underline">Forgot Password?</button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-[#C41E24] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : 'Sign In'}
            </motion.button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-sm text-gray-500">
          Not an admin? <button onClick={() => navigate('/')} className="text-[#1A1A1A] font-bold hover:underline">Return to Website</button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;