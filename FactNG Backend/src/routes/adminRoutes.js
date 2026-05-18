const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const { 
  createAdmin, 
  loginAdmin, 
  getAdminProfile,
  updateProfile,
  deleteAccount,
  getDashboardStats,
  getRecentProjects,
  getRecentMessages,
  uploadFile
} = require('../controllers/adminController');

// Auth
router.post('/login', loginAdmin);
router.post('/create', protect, createAdmin);
router.get('/me', protect, getAdminProfile);
router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);

// Dashboard
router.get('/dashboard/stats', protect, getDashboardStats);
router.get('/dashboard/recent-projects', protect, getRecentProjects);
router.get('/dashboard/recent-messages', protect, getRecentMessages);

// File Upload
router.post('/upload', protect, upload.single('image'), uploadFile);

module.exports = router;
