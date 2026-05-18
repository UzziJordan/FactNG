const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  createSocialLink,
  getAllSocialLinks,
  getAdminSocialLinks,
  updateSocialLink,
  deleteSocialLink
} = require('../controllers/socialController');

// Public route
router.get('/', getAllSocialLinks);

// Admin routes
router.get('/admin', protect, getAdminSocialLinks);
router.post('/', protect, createSocialLink);
router.put('/:id', protect, updateSocialLink);
router.delete('/:id', protect, deleteSocialLink);

module.exports = router;
