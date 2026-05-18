const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  createExpert,
  getAllExperts,
  getAdminExperts,
  updateExpert,
  reorderExperts,
  deleteExpert
} = require('../controllers/expertController');

// Public route
router.get('/', getAllExperts);

// Admin routes
router.get('/admin', protect, getAdminExperts);
router.post('/', protect, upload.single('image'), createExpert);
router.put('/reorder', protect, reorderExperts);
router.put('/:id', protect, upload.single('image'), updateExpert);
router.delete('/:id', protect, deleteExpert);

module.exports = router;
