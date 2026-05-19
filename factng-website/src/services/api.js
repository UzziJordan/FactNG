import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://factng.onrender.com/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- ADMIN / AUTH ---
export const login = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/admin/me');
  return response.data;
};

export const updateAdminProfile = async (profileData) => {
  const response = await api.put('/admin/profile', profileData);
  return response.data;
};

export const createAdmin = async (adminData) => {
  const response = await api.post('/admin/create', adminData);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete('/admin/account');
  return response.data;
};

// --- DASHBOARD ---
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

export const getRecentProjects = async () => {
  const response = await api.get('/admin/dashboard/recent-projects');
  return response.data;
};

export const getRecentMessages = async () => {
  const response = await api.get('/admin/dashboard/recent-messages');
  return response.data;
};

// --- PROJECTS ---
export const getAllProjects = async (params = {}) => {
  const response = await api.get('/projects', { params });
  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await api.get('/projects/featured');
  return response.data;
};

export const getAdminProjects = async (params = {}) => {
  const response = await api.get('/projects/admin', { params });
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const getAdminProjectById = async (id) => {
  const response = await api.get(`/projects/${id}/admin`);
  return response.data;
};

export const createProject = async (formData) => {
  const response = await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProject = async (id, formData) => {
  const response = await api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// --- SOCIAL LINKS ---
export const getSocialLinks = async () => {
  const response = await api.get('/social-links');
  return response.data;
};

export const getAdminSocialLinks = async () => {
  const response = await api.get('/social-links/admin');
  return response.data;
};

export const createSocialLink = async (linkData) => {
  const response = await api.post('/social-links', linkData);
  return response.data;
};

export const updateSocialLink = async (id, linkData) => {
  const response = await api.put(`/social-links/${id}`, linkData);
  return response.data;
};

export const deleteSocialLink = async (id) => {
  const response = await api.delete(`/social-links/${id}`);
  return response.data;
};

// --- EXPERTS ---
export const getAllExperts = async () => {
  const response = await api.get('/experts');
  return response.data;
};

export const getAdminExperts = async () => {
  const response = await api.get('/experts/admin');
  return response.data;
};

export const createExpert = async (formData) => {
  const response = await api.post('/experts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateExpert = async (id, formData) => {
  const response = await api.put(`/experts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteExpert = async (id) => {
  const response = await api.delete(`/experts/${id}`);
  return response.data;
};

export const reorderExperts = async (expertsData) => {
  const response = await api.put('/experts/reorder', { experts: expertsData });
  return response.data;
};

// --- CONTACT MESSAGES ---
export const submitContactForm = async (formData) => {
  const response = await api.post('/contacts', formData);
  return response.data;
};

export const getAdminMessages = async (params = {}) => {
  const response = await api.get('/contacts/admin', { params });
  return response.data;
};

export const getMessageById = async (id) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  const response = await api.put(`/contacts/${id}`, { status });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};

// --- STORY / CONTENT ---
export const getStory = async () => {
  const response = await api.get('/story');
  return response.data;
};

export const getAdminStory = async () => {
  const response = await api.get('/story/admin');
  return response.data;
};

export const updateStory = async (formData) => {
  const response = await api.put('/story', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// --- OFFICES ---
export const getOffices = async () => {
  const response = await api.get('/offices');
  return response.data;
};

// --- COMPANY INFO ---
export const getCompanyInfo = async () => {
  const response = await api.get('/company-info');
  return response.data;
};

export const updateCompanyInfo = async (infoData) => {
  const response = await api.put('/company-info', infoData);
  return response.data;
};

export const getAdminOffices = async () => {
  const response = await api.get('/offices/admin');
  return response.data;
};

export const createOffice = async (officeData) => {
  const response = await api.post('/offices', officeData);
  return response.data;
};

export const updateOffice = async (id, officeData) => {
  const response = await api.put(`/offices/${id}`, officeData);
  return response.data;
};

export const deleteOffice = async (id) => {
  const response = await api.delete(`/offices/${id}`);
  return response.data;
};

export default api;
