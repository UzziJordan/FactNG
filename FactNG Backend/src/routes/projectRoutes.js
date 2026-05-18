const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  createProject,
  getAllProjects,
  getFeaturedProjects,
  getAdminProjects,
  getProjectById,
  getAdminProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// --- ADMIN ROUTES (Protected) ---
// Note: Must come before generic :id routes
router.get('/admin', protect, getAdminProjects);
router.get('/:id/admin', protect, getAdminProjectById);
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

// --- PUBLIC ROUTES ---
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

module.exports = router;
