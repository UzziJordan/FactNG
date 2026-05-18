const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  createOffice,
  getAllOffices,
  getAdminOffices,
  updateOffice,
  deleteOffice
} = require('../controllers/officeController');

// Public route
router.get('/', getAllOffices);

// Admin routes
router.get('/admin', protect, getAdminOffices);
router.post('/', protect, createOffice);
router.put('/:id', protect, updateOffice);
router.delete('/:id', protect, deleteOffice);

module.exports = router;
