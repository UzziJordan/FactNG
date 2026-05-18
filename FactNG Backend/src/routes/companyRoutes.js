const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const {
  getCompanyInfo,
  updateCompanyInfo
} = require('../controllers/companyController');

// Public route
router.get('/', getCompanyInfo);

// Admin route
router.put('/', protect, updateCompanyInfo);

module.exports = router;
