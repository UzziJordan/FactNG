import React, { useState, useEffect } from 'react';
import { 
  MdPerson, 
  MdAutoStories, 
  MdLocationOn, 
  MdShare, 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdSave,
  MdImage,
  MdPublic,
  MdRefresh,
  MdCloudUpload,
  MdInfo
} from 'react-icons/md';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import * as api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

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

const CEO = () => {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', name: 'Company Info', icon: <MdInfo /> },
    { id: 'experts', name: 'Experts', icon: <MdPerson /> },
    { id: 'story', name: 'Our Story', icon: <MdAutoStories /> },
    { id: 'offices', name: 'Offices', icon: <MdLocationOn /> },
    { id: 'social', name: 'Social Links', icon: <MdShare /> },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">CEO Settings</h1>
          <p className="text-sm md:text-base text-[#7A7570] mt-1">Manage core company info and public content</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-100 shrink-0"
        >
          <MdPublic className="text-base md:text-lg" /> Public Live
        </motion.div>
      </motion.div>

      {/* Modern Tabs - Scrollable on mobile */}
      <motion.div variants={itemVariants} className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        <div className="bg-white p-1.5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex items-center min-w-max md:min-w-0 md:flex-wrap gap-1 md:gap-2">
          {tabs.map(tab => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 font-black text-[10px] md:text-xs lg:text-sm uppercase tracking-wider rounded-lg md:rounded-xl transition-all duration-300 shrink-0 ${
                activeTab === tab.id 
                  ? 'bg-[#C41E24] text-white shadow-lg shadow-red-500/20' 
                  : 'text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-50'
              }`}
            >
              <span className="text-sm md:text-base">{tab.icon}</span>
              {tab.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'info' && <CompanyInfoManager />}
            {activeTab === 'experts' && <ExpertsManager />}
            {activeTab === 'story' && <StoryManager />}
            {activeTab === 'offices' && <OfficesManager />}
            {activeTab === 'social' && <SocialLinksManager />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// --- COMPANY INFO MANAGER ---
const CompanyInfoManager = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    workingHours: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const data = await api.getCompanyInfo();
      if (data) {
        setFormData({
          phone: data.phone || '',
          email: data.email || '',
          workingHours: data.workingHours || ''
        });
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateCompanyInfo(formData);
      alert('Company information updated successfully!');
    } catch (error) {
      alert('Failed to update company information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-3xl text-[#C41E24]" /></div>;

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-6 md:mb-10">
        <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Company Contact Details</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">Global contact information shown across the website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <FaPhone className="text-[#C41E24]" /> Company Phone Number
            </label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+234 800 FACT NG"
              className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
              required
            />
          </div>
          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <FaEnvelope className="text-[#C41E24]" /> Support Email Address
            </label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="hello@factng.com"
              className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
              required
            />
          </div>
          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <MdRefresh className="text-[#C41E24]" /> Working Hours
            </label>
            <input 
              type="text" 
              value={formData.workingHours}
              onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
              placeholder="Mon - Fri: 8am - 6pm"
              className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
              required
            />
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={saving}
          className="w-full md:w-auto bg-[#C41E24] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-2"
        >
          {saving ? <MdRefresh className="animate-spin text-lg" /> : <MdSave className="text-lg" />}
          Update Company Info
        </motion.button>
      </form>
    </div>
  );
};

// --- EXPERTS MANAGER ---
const ExpertsManager = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    bio: '',
    isPublished: true,
    display_order: 0,
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSource, setImageSource] = useState('file'); // 'file' or 'url'

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminExperts();
      setExperts(data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageUrl: '' });
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'imageUrl' && imageSource === 'file') return;
      data.append(key, formData[key]);
    });

    if (imageSource === 'file' && imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        await api.updateExpert(editingId, data);
      } else {
        await api.createExpert(data);
      }
      resetForm();
      fetchExperts();
    } catch (error) {
      alert('Failed to save expert');
    }
  };

  const handleEdit = (expert) => {
    setFormData({
      name: expert.name,
      role: expert.role,
      experience: expert.experience || '',
      bio: expert.bio || '',
      isPublished: expert.isPublished,
      display_order: expert.display_order || 0,
      imageUrl: expert.image?.url || ''
    });
    setImagePreview(expert.image?.url);
    setImageSource(expert.image?.url?.startsWith('http') && !expert.image?.url?.includes('cloudinary') ? 'url' : 'file');
    setEditingId(expert._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this expert?')) {
      try {
        await api.deleteExpert(id);
        fetchExperts();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', experience: '', bio: '', isPublished: true, display_order: 0, imageUrl: '' });
    setImageFile(null);
    setImagePreview(null);
    setImageSource('file');
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <div>
          <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Team Experts</h3>
          <p className="text-xs md:text-sm text-[#7A7570] font-medium">Manage the professionals shown on the About page</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="bg-[#1A1A1A] text-white px-4 md:px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:bg-[#C41E24] transition-all"
        >
          {isAdding ? 'Cancel' : <><MdAdd /> Add Expert</>}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 40 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            onSubmit={handleSubmit} 
            className="p-5 md:p-8 bg-[#fcfbf9] rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Expert Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
                    required
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Professional Role</label>
                  <input 
                    type="text" 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Experience</label>
                    <input 
                      type="text" 
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="e.g. 8 years"
                      className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Display Order</label>
                    <input 
                      type="number" 
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: e.target.value})}
                      className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Profile Photo</label>

                <div className="flex bg-white p-1 rounded-xl border border-gray-100 mb-2 max-w-[180px]">
                  <button 
                    type="button"
                    onClick={() => setImageSource('file')}
                    className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'file' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    File
                  </button>
                  <button 
                    type="button"
                    onClick={() => setImageSource('url')}
                    className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'url' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    URL
                  </button>
                </div>

                {imageSource === 'file' ? (
                  <div className="relative group aspect-square max-w-[180px] bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-[#C41E24]/30 cursor-pointer">
                    {imagePreview && imageSource === 'file' ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <MdCloudUpload className="text-3xl md:text-4xl text-gray-300 group-hover:text-[#C41E24] transition-colors" />
                        <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase mt-2">Upload Photo</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4 max-w-[180px]">
                    <div className="relative group aspect-square bg-white rounded-xl border-2 border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'; }} />
                      ) : (
                        <MdCloudUpload className="text-3xl md:text-4xl text-gray-300" />
                      )}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Paste URL..."
                      value={formData.imageUrl}
                      onChange={handleUrlChange}
                      className="w-full bg-white p-2.5 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-xs"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-4 h-4 accent-[#C41E24]"
                  />
                  <span className="text-xs md:text-sm font-bold text-gray-700">Publish to Website</span>
                </div>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="mt-6 md:mt-8 bg-[#C41E24] text-white w-full md:w-auto px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
            >
              {editingId ? 'Update Expert' : 'Save Expert'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-3xl text-[#C41E24]" /></div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {experts.length === 0 && !isAdding && (
            <div className="col-span-full text-center p-10 text-gray-400 italic">No experts added yet.</div>
          )}
          {experts.map(expert => (
            <motion.div 
              variants={itemVariants}
              key={expert._id} 
              className="bg-[#fcfbf9] rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-50 flex items-center gap-3 md:gap-4 group hover:border-[#C41E24]/10 transition-colors"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden shadow-sm bg-white shrink-0">
                <img src={expert.image?.url} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#1A1A1A] text-sm md:text-base truncate">{expert.name}</h4>
                <p className="text-[10px] md:text-xs text-[#7A7570] font-medium truncate">{expert.role}</p>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <motion.button 
                  whileHover={{ scale: 1.2, color: '#C41E24' }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleEdit(expert)} 
                  className="p-1.5 text-gray-400 transition-colors"
                >
                  <MdEdit />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.2, color: '#ef4444' }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleDelete(expert._id)} 
                  className="p-1.5 text-gray-400 transition-colors"
                >
                  <MdDelete />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

// --- STORY MANAGER ---
const StoryManager = () => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageSource, setImageSource] = useState('file'); // 'file' or 'url'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminStory();
      if (data) {
        setContent(data.content);
        setImagePreview(data.image?.url);
        setImageUrl(data.image?.url || '');
        setImageSource(data.image?.url?.startsWith('http') && !data.image?.url?.includes('cloudinary') ? 'url' : 'file');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageUrl('');
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
    setImageFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    data.append('content', content);

    if (imageSource === 'url') {
      data.append('imageUrl', imageUrl);
    } else if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      await api.updateStory(data);
      alert('Story updated successfully!');
      fetchStory();
    } catch (error) {
      alert('Failed to update story');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-3xl text-[#C41E24]" /></div>;

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-6 md:mb-10">
        <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Our Story</h3>
        <p className="text-xs md:text-sm text-[#7A7570] font-medium">This content appears on the About page</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6 md:space-y-8 max-w-4xl">
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Story Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full bg-[#fcfbf9] p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-medium text-sm leading-relaxed"
            required
          ></textarea>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Story Image</label>

          <div className="flex bg-[#fcfbf9] p-1 rounded-xl border border-gray-100 mb-2 max-w-[180px]">
            <button 
              type="button"
              onClick={() => setImageSource('file')}
              className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'file' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              File
            </button>
            <button 
              type="button"
              onClick={() => setImageSource('url')}
              className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'url' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              URL
            </button>
          </div>

          {imageSource === 'file' ? (
            <div className="relative group max-w-md aspect-video bg-[#fcfbf9] rounded-xl md:rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden">
              {imagePreview && imageSource === 'file' ? (
                <img src={imagePreview} alt="Story Preview" className="w-full h-full object-cover" />
              ) : (
                <MdImage className="text-4xl md:text-5xl text-gray-200" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" className="bg-white text-[#1A1A1A] px-6 py-2 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest">Change Image</button>
              </div>
              <input 
                type="file" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4 max-w-md">
              <div className="relative group aspect-video bg-[#fcfbf9] rounded-xl md:rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+URL'; }} />
                ) : (
                  <MdImage className="text-4xl md:text-5xl text-gray-200" />
                )}
              </div>
              <input 
                type="text" 
                placeholder="Paste image URL here..."
                value={imageUrl}
                onChange={handleUrlChange}
                className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-xs md:text-sm"
              />
            </div>
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={saving}
          className="w-full md:w-auto bg-[#C41E24] text-white px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-2"
        >
          {saving ? <MdRefresh className="animate-spin text-lg" /> : <MdSave className="text-lg" />}
          Update Story Content
        </motion.button>
      </form>
    </div>
  );
};

// --- OFFICES MANAGER ---
const OfficesManager = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    addresses: [{ address: '' }]
  });

  const fetchOffices = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminOffices();
      setOffices(data);
    } catch (error) {
      console.error('Error fetching offices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleAddAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, { address: '' }] });
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index].address = value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleRemoveAddress = (index) => {
    setFormData({ ...formData, addresses: formData.addresses.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateOffice(editingId, formData);
      } else {
        await api.createOffice(formData);
      }
      resetForm();
      fetchOffices();
    } catch (error) {
      alert('Failed to save office');
    }
  };

  const handleEdit = (office) => {
    setFormData({ name: office.name, addresses: office.addresses });
    setEditingId(office._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this office?')) {
      try {
        await api.deleteOffice(id);
        fetchOffices();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', addresses: [{ address: '' }] });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <div>
          <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Office Locations</h3>
          <p className="text-xs md:text-sm text-[#7A7570] font-medium">Manage branch offices shown on the Contact page</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="bg-[#1A1A1A] text-white px-4 md:px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:bg-[#C41E24] transition-all"
        >
          {isAdding ? 'Cancel' : <><MdAdd /> Add Office</>}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 40 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            onSubmit={handleSubmit} 
            className="p-5 md:p-8 bg-[#fcfbf9] rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden max-w-3xl"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Office Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Abuja Office"
                  className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
                  required
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex justify-between">
                  <span>Addresses</span>
                  <button type="button" onClick={handleAddAddress} className="text-[#C41E24] hover:underline font-black">+ Add Another</button>
                </label>
                {formData.addresses.map((addr, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={addr.address}
                      onChange={(e) => handleAddressChange(idx, e.target.value)}
                      placeholder="Enter full address..."
                      className="flex-1 bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-medium text-sm"
                      required
                    />
                    {formData.addresses.length > 1 && (
                      <motion.button 
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                        type="button" 
                        onClick={() => handleRemoveAddress(idx)} 
                        className="p-2 md:p-4 text-gray-300 transition-colors"
                      >
                        <MdDelete />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="mt-6 md:mt-8 bg-[#C41E24] text-white w-full md:w-auto px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
            >
              {editingId ? 'Update Office' : 'Save Office'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-3xl text-[#C41E24]" /></div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 md:space-y-4"
        >
          {offices.length === 0 && !isAdding && (
            <div className="text-center p-10 text-gray-400 italic">No offices added yet.</div>
          )}
          {offices.map(office => (
            <motion.div 
              variants={itemVariants}
              key={office._id} 
              className="bg-[#fcfbf9] p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-50 flex justify-between items-start group hover:border-[#C41E24]/10 transition-colors"
            >
              <div className="min-w-0">
                <h4 className="font-bold text-[#1A1A1A] flex items-center gap-2 text-sm md:text-base">
                  <MdLocationOn className="text-[#C41E24]" />
                  {office.name}
                </h4>
                <div className="mt-2 space-y-1">
                  {office.addresses.map((a, i) => (
                    <p key={i} className="text-xs md:text-sm text-[#7A7570] font-medium pl-6 leading-relaxed">{a.address}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 md:gap-2 shrink-0">
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#C41E24' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(office)} 
                  className="p-2 text-gray-300 transition-colors bg-white rounded-lg md:rounded-xl shadow-sm"
                >
                  <MdEdit />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(office._id)} 
                  className="p-2 text-gray-300 transition-colors bg-white rounded-lg md:rounded-xl shadow-sm"
                >
                  <MdDelete />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};


// --- SOCIAL LINKS MANAGER ---
const SocialLinksManager = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState('Instagram');
  const [url, setUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const platforms = [
    { name: 'Instagram', icon: <FaInstagram />, color: 'text-pink-600' },
    { name: 'Facebook', icon: <FaFacebook />, color: 'text-blue-600' },
    { name: 'Tiktok', icon: <FaTiktok />, color: 'text-black' },
    { name: 'X', icon: <FaTwitter />, color: 'text-gray-900' },
    { name: 'WhatsApp', icon: <FaWhatsapp />, color: 'text-green-600' }
  ];

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminSocialLinks();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      await api.createSocialLink({ platform, url, icon: platform.toLowerCase() });
      setUrl('');
      setIsAdding(false);
      fetchLinks();
    } catch (error) {
      alert('Failed to add social link');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this social link?')) {
      try {
        await api.deleteSocialLink(id);
        fetchLinks();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const getPlatformIcon = (platformName) => {
    const p = platforms.find(p => p.name.toLowerCase() === platformName.toLowerCase());
    return p ? { icon: p.icon, color: p.color } : { icon: <MdShare />, color: 'text-gray-400' };
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-black text-[#1A1A1A]">Social Presence</h3>
          <p className="text-xs md:text-sm text-[#7A7570] font-medium">Manage how customers connect</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#1A1A1A] text-white px-4 md:px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:bg-[#C41E24] transition-all"
        >
          {isAdding ? 'Cancel' : <><MdAdd /> Add Link</>}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            onSubmit={handleAddLink} 
            className="p-5 md:p-6 bg-[#fcfbf9] rounded-2xl md:rounded-3xl border border-[#C41E24]/20 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Platform</label>
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm md:text-base"
                >
                  {platforms.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Profile/Contact URL</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={platform === 'WhatsApp' ? 'e.g., https://wa.me/...' : 'https://...'}
                  className="w-full bg-white p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                  required
                />
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="mt-6 bg-[#C41E24] text-white w-full md:w-auto px-8 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-red-500/20"
            >
              Save Social Link
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center p-10"><MdRefresh className="animate-spin text-3xl text-[#C41E24]" /></div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 md:space-y-4"
        >
          {links.length === 0 && !isAdding && (
            <div className="text-center p-10 text-gray-400 italic">No social links added yet.</div>
          )}
          {links.map(link => {
            const { icon, color } = getPlatformIcon(link.platform);
            return (
              <motion.div 
                variants={itemVariants}
                key={link._id} 
                className="flex gap-4 items-center bg-[#fcfbf9] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-50 group transition-all hover:border-[#C41E24]/10"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl shadow-sm shrink-0 ${color}`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest block">{link.platform}</span>
                  <p className="font-bold text-[#1A1A1A] text-xs md:text-sm truncate">{link.url}</p>
                </div>
                <div className="flex gap-1">
                    <motion.button 
                      whileHover={{ scale: 1.1, color: '#ef4444' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(link._id)}
                      className="p-2 text-gray-300 transition-colors bg-white rounded-lg md:rounded-xl shadow-sm"
                    >
                      <MdDelete className="text-lg md:text-xl" />
                    </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
export default CEO;