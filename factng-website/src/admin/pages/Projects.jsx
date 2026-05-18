import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdFilterList, MdMoreVert, MdChevronLeft, MdChevronRight, MdRefresh, MdEdit, MdDelete, MdCloudUpload } from 'react-icons/md';
import * as api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    totalPages: 1,
    totalProjects: 0
  });
  
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    location: '',
    date: '',
    status: 'In Progress',
    description: '',
    category: 'Interior',
    isPublished: true,
    caption: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSource, setImageSource] = useState('file'); // 'file' or 'url'

  const fetchProjects = async (page = 1) => {
    try {
      setLoading(true);
      const data = await api.getAdminProjects({ 
        search: searchTerm,
        page: page,
        limit: 8
      });
      setProjects(data.projects);
      setPaginationData({
        totalPages: data.totalPages,
        totalProjects: data.totalProjects
      });
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginationData.totalPages) {
      fetchProjects(newPage);
    }
  };

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
        await api.updateProject(editingId, data);
      } else {
        await api.createProject(data);
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      alert('Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      client: project.client || '',
      location: project.location || '',
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
      status: project.status || 'In Progress',
      description: project.description || '',
      category: project.category || 'Interior',
      isPublished: project.isPublished,
      caption: project.image?.caption || '',
      imageUrl: project.image?.url || ''
    });
    setImagePreview(project.image?.url);
    setImageSource(project.image?.url?.startsWith('http') && !project.image?.url?.includes('cloudinary') ? 'url' : 'file');
    setEditingId(project._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        fetchProjects();
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      client: '',
      location: '',
      date: '',
      status: 'In Progress',
      description: '',
      category: 'Interior',
      isPublished: true,
      caption: '',
      imageUrl: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setImageSource('file');
    setEditingId(null);
    setIsAdding(false);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600';
      case 'In Progress': return 'bg-amber-50 text-amber-600';
      case 'Pending': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Search and Action Bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col xs:flex-row flex-1 w-full max-w-xl gap-3 md:gap-4">
          <div className="relative flex-1">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#C41E24]/10 transition text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProjects()}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchProjects} 
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm text-sm shrink-0"
          >
            <MdRefresh className="text-xl" />
            <span className="xs:inline">Reload</span>
          </motion.button>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-[#C41E24] text-white rounded-xl font-bold transition shadow-lg shadow-red-500/30 text-sm whitespace-nowrap"
        >
          {isAdding ? 'Cancel' : <><MdAdd className="text-xl" /> Add Project</>}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            onSubmit={handleSubmit} 
            className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm space-y-6 md:space-y-8 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Project Title</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                    required
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Client Name</label>
                  <input 
                    type="text" 
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                    required
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Wuse 2, Abuja"
                    className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-xs md:text-sm"
                    >
                      <option value="Interior">Interior</option>
                      <option value="Exterior">Exterior</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Renovation">Renovation</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-xs md:text-sm"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Project Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-[#fcfbf9] p-3 md:p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold uppercase text-[10px] md:text-xs"
                    required
                  />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                      className="w-4 h-4 md:w-5 md:h-5 accent-[#C41E24]" 
                    />
                    <span className="text-xs md:text-sm font-bold text-gray-700">Publish to Website</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Showcase Image</label>
                
                <div className="flex bg-[#fcfbf9] p-1 rounded-xl border border-gray-100 mb-1 md:mb-2">
                  <button 
                    type="button"
                    onClick={() => setImageSource('file')}
                    className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'file' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Upload File
                  </button>
                  <button 
                    type="button"
                    onClick={() => setImageSource('url')}
                    className={`flex-1 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${imageSource === 'url' ? 'bg-[#C41E24] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Image URL
                  </button>
                </div>

                {imageSource === 'file' ? (
                  <div className="relative group aspect-video bg-[#fcfbf9] rounded-xl md:rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-[#C41E24]/30">
                    {imagePreview && imageSource === 'file' ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <MdCloudUpload className="text-3xl md:text-4xl text-gray-300" />
                        <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase mt-2 text-center px-2">Upload Photo</span>
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
                  <div className="space-y-3 md:space-y-4">
                    <div className="relative group aspect-video bg-[#fcfbf9] rounded-xl md:rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+URL'; }} />
                      ) : (
                        <MdCloudUpload className="text-3xl md:text-4xl text-gray-300" />
                      )}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Paste image URL here..."
                      value={formData.imageUrl}
                      onChange={handleUrlChange}
                      className="w-full bg-[#fcfbf9] p-2.5 md:p-3 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-bold text-xs"
                    />
                  </div>
                )}
                
                <input 
                  type="text"
                  placeholder="Image caption (optional)"
                  value={formData.caption}
                  onChange={(e) => setFormData({...formData, caption: e.target.value})}
                  className="w-full bg-[#fcfbf9] p-2.5 md:p-3 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 text-[10px] md:text-xs font-medium"
                />
              </div>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="w-full bg-[#fcfbf9] p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#C41E24]/10 font-medium text-sm leading-relaxed"
                placeholder="Describe the scope of work..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 md:gap-4 pt-2">
              <button type="button" onClick={resetForm} className="px-4 md:px-8 py-3 md:py-4 font-bold text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="bg-[#C41E24] text-white px-6 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
              >
                {editingId ? 'Update Project' : 'Save & Publish'}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Projects Table Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto -mx-0">
          <table className="w-full text-left min-w-[700px] md:min-w-0">
            <thead className="bg-[#fcfbf9]/50 border-b border-gray-100">
              <tr className="text-gray-400 text-[9px] md:text-[11px] font-black uppercase tracking-widest">
                <th className="px-5 md:px-8 py-4 md:py-5">Project</th>
                <th className="px-5 md:px-8 py-4 md:py-5 hidden sm:table-cell">Client</th>
                <th className="px-5 md:px-8 py-4 md:py-5 hidden md:table-cell">Location</th>
                <th className="px-5 md:px-8 py-4 md:py-5">Status</th>
                <th className="px-5 md:px-8 py-4 md:py-5 hidden lg:table-cell">Category</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-50"
            >
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-8 py-10 text-center">
                    <MdRefresh className="animate-spin text-3xl text-[#C41E24] mx-auto" />
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-10 text-center text-gray-400 italic text-sm">No projects found.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <motion.tr 
                    variants={itemVariants}
                    key={project._id} 
                    className="group hover:bg-[#fcfbf9] transition-colors"
                  >
                    <td className="px-5 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={project.image?.url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-[#1A1A1A] text-xs md:text-sm truncate">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-8 py-4 md:py-6 text-xs md:text-sm text-[#7A7570] font-medium hidden sm:table-cell truncate max-w-[120px]">{project.client}</td>
                    <td className="px-5 md:px-8 py-4 md:py-6 text-xs md:text-sm text-[#7A7570] font-medium hidden md:table-cell truncate max-w-[150px]">{project.location}</td>
                    <td className="px-5 md:px-8 py-4 md:py-6">
                      <span className={`text-[8px] md:text-[10px] px-2 md:px-4 py-1 md:py-1.5 rounded-full font-black uppercase tracking-widest ${getStatusStyles(project.status)} whitespace-nowrap`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 md:px-8 py-4 md:py-6 text-[9px] md:text-xs text-gray-400 font-black uppercase tracking-widest hidden lg:table-cell">{project.category}</td>
                    <td className="px-5 md:px-8 py-4 md:py-6 text-right">
                      <div className="flex justify-end gap-1.5 md:gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(project)} 
                          className="p-1.5 md:p-2 text-gray-400 hover:text-[#C41E24] transition-colors bg-white rounded-lg shadow-sm border border-gray-100"
                        >
                          <MdEdit className="text-lg md:text-xl" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(project._id)} 
                          className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 transition-colors bg-white rounded-lg shadow-sm border border-gray-100"
                        >
                          <MdDelete className="text-lg md:text-xl" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-5 md:px-8 py-4 md:py-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#fcfbf9]/30">
          <p className="text-[10px] md:text-sm text-gray-400 font-medium order-2 sm:order-1 text-center sm:text-left">
            Showing <span className="text-[#1A1A1A] font-bold">{paginationData.totalProjects === 0 ? 0 : (currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, paginationData.totalProjects)}</span> of <span className="text-[#1A1A1A] font-bold">{paginationData.totalProjects}</span>
          </p>
          <div className="flex items-center gap-1.5 md:gap-2 order-1 sm:order-2">
            <motion.button 
              whileHover={currentPage === 1 ? {} : { scale: 1.1 }}
              whileTap={currentPage === 1 ? {} : { scale: 0.9 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 md:p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition shadow-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <MdChevronLeft className="text-lg md:text-xl" />
            </motion.button>
            
            <div className="flex gap-1 md:gap-1.5 overflow-x-auto max-w-[120px] xs:max-w-[200px] md:max-w-none no-scrollbar">
              {[...Array(paginationData.totalPages)].map((_, i) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`min-w-[28px] md:min-w-[40px] h-7 md:h-10 rounded-lg font-bold shadow-lg transition-all text-[10px] md:text-sm shrink-0 ${
                    currentPage === i + 1 
                      ? 'bg-[#C41E24] text-white shadow-red-500/20' 
                      : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>

            <motion.button 
              whileHover={currentPage === paginationData.totalPages ? {} : { scale: 1.1 }}
              whileTap={currentPage === paginationData.totalPages ? {} : { scale: 0.9 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationData.totalPages}
              className={`p-1.5 md:p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition shadow-sm ${currentPage === paginationData.totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <MdChevronRight className="text-lg md:text-xl" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;