const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  submitContactForm,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController');

// Public route
router.post('/', submitContactForm);

// Admin routes
router.get('/admin', protect, getAllMessages);
router.get('/:id', protect, getMessageById);
router.put('/:id', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
