import React, { useState, useEffect } from 'react';
import { MdPerson, MdLock, MdPersonAdd, MdDeleteForever, MdSave, MdAdminPanelSettings, MdCheckCircle, MdError } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, updateAdminProfile, createAdmin, deleteAccount } from '../../services/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setAdmin(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      showStatus('error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading && !admin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C41E24]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A]">Account Settings</h1>
          <p className="text-[#7A7570] mt-1">Manage your administrative profile and permissions</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#1A1A1A] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
        >
          <MdAdminPanelSettings className="text-lg" /> Super Admin Access
        </motion.div>
      </motion.div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}
        >
          {message.type === 'success' ? <MdCheckCircle className="text-xl" /> : <MdError className="text-xl" />}
          {message.text}
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        {/* Modern Sidebar Tabs - Horizontal on mobile */}
        <motion.div variants={itemVariants} className="w-full lg:w-72 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 md:gap-3 pb-2 lg:pb-0 no-scrollbar">
          <TabButton 
            id="profile" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            icon={<MdPerson />} 
            label="Profile" 
          />
          <TabButton 
            id="password" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            icon={<MdLock />} 
            label="Security" 
          />
          <TabButton 
            id="add-admin" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            icon={<MdPersonAdd />} 
            label="Admins" 
          />
          <div className="lg:pt-6">
            <TabButton 
              id="danger" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              icon={<MdDeleteForever />} 
              label="Danger" 
              isDanger
            />
          </div>
        </motion.div>

        {/* Content Area Card */}
        <motion.div variants={itemVariants} className="flex-1 bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 min-h-[400px] md:min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && <ProfileDetails key={admin?._id || 'profile'} admin={admin} showStatus={showStatus} onUpdate={fetchProfile} />}
              {activeTab === 'password' && <ChangePassword showStatus={showStatus} />}
              {activeTab === 'add-admin' && <AddNewAdmin showStatus={showStatus} />}
              {activeTab === 'danger' && <DangerZone showStatus={showStatus} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TabButton = ({ id, activeTab, setActiveTab, icon, label, isDanger }) => (
  <motion.button 
    whileHover={{ x: activeTab === id ? 0 : 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap lg:w-full relative overflow-hidden ${
      activeTab === id 
        ? isDanger ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-[#C41E24] text-white shadow-lg shadow-red-500/20'
        : isDanger ? 'text-red-400 hover:bg-red-50' : 'text-gray-400 hover:bg-white hover:text-[#1A1A1A]'
    }`}
  >
    {activeTab === id && (
      <motion.div 
        layoutId="active-tab"
        className="absolute inset-0 bg-black/5"
      ></motion.div>
    )}
    <span className="text-lg md:text-xl relative z-10">{icon}</span>
    <span className="relative z-10">{label}</span>
  </motion.button>
);

const ProfileDetails = ({ admin, showStatus, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedData = await updateAdminProfile(formData);
      
      // Update local storage so the rest of the UI (header) stays in sync
      const currentAdmin = JSON.parse(localStorage.getItem('admin') || '{}');
      localStorage.setItem('admin', JSON.stringify({ ...currentAdmin, ...updatedData }));
      
      // Also trigger a storage event so other components can listen
      window.dispatchEvent(new Event('storage'));

      showStatus('success', 'Profile updated successfully');
      onUpdate();
    } catch (error) {
      showStatus('error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Profile Information</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">Update your account's profile information and email address.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
          <input 
            type="email" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-[#1A1A1A] disabled:opacity-50 text-white w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-2 shadow-lg transition-all"
        >
          {loading ? 'Saving...' : <><MdSave className="text-lg md:text-xl" /> Save Profile Details</>}
        </motion.button>
      </form>
    </div>
  );
};

const ChangePassword = ({ showStatus }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return showStatus('error', 'New passwords do not match');
    }
    try {
      setLoading(true);
      await updateAdminProfile({ 
        password: formData.newPassword 
      });
      showStatus('success', 'Password updated successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showStatus('error', error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Update Password</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">New Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
            minLength={6}
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-[#C41E24] disabled:opacity-50 text-white w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-2 shadow-xl shadow-red-500/20 transition-all"
        >
          {loading ? 'Updating...' : <><MdLock className="text-lg md:text-xl" /> Change Password</>}
        </motion.button>
      </form>
    </div>
  );
};

const AddNewAdmin = ({ showStatus }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAdmin(formData);
      showStatus('success', 'New admin registered successfully');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      showStatus('error', error.response?.data?.message || 'Failed to register admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">System Administrators</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">Add new team members with administrative privileges.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Full name of new admin" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
          <input 
            type="email" 
            placeholder="example@factng.com" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Default Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-[#1A1A1A] disabled:opacity-50 text-white w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-2 shadow-lg transition-all"
        >
          {loading ? 'Registering...' : <><MdPersonAdd className="text-lg md:text-xl" /> Register Admin</>}
        </motion.button>
      </form>
    </div>
  );
};

const DangerZone = ({ showStatus }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you absolutely sure? This action is permanent and you will be logged out.')) return;

    try {
      setLoading(true);
      await deleteAccount();
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    } catch (error) {
      showStatus('error', 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-black text-red-600">Danger Zone</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">Irreversible actions that affect your system access.</p>
      </div>

      <div className="bg-red-50/20 border-2 border-dashed border-red-100 rounded-2xl md:rounded-3xl p-6 md:p-10 space-y-6">
        <div className="space-y-2 text-center max-w-sm mx-auto">
          <h4 className="font-black text-[#1A1A1A] uppercase tracking-wide text-sm md:text-base">Deactivate Account</h4>
          <p className="text-[10px] md:text-xs text-gray-500 font-bold leading-relaxed">
            Warning: This action is permanent. All your administrative records will be transferred or removed.
          </p>
        </div>
        <div className="flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 disabled:opacity-50 text-white w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-red-500/20 transition-all"
          >
            {loading ? 'Deleting...' : <><MdDeleteForever className="text-xl md:text-2xl" /> Delete Account</>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Settings;