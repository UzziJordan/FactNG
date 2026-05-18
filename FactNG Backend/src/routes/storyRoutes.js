const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  getStory,
  getAdminStory,
  updateStory
} = require('../controllers/contentController');

// Public route
router.get('/', getStory);

// Admin routes
router.get('/admin', protect, getAdminStory);
router.put('/', protect, upload.single('image'), updateStory);

module.exports = router;
