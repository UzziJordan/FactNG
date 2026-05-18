const CompanyInfo = require('../models/CompanyInfo');

// @desc    Get company info (Public)
// @route   GET /api/company-info
// @access  Public
exports.getCompanyInfo = async (req, res, next) => {
  try {
    let info = await CompanyInfo.findOne();
    if (!info) {
      // Return defaults if none exists
      info = {
        phone: '+234 800 FACT NG',
        email: 'hello@factng.com',
        workingHours: 'Mon - Fri: 8am - 6pm'
      };
    }
    res.json(info);
  } catch (error) {
    console.error('Error fetching company info:', error);
    next(error);
  }
};

// @desc    Update company info (Admin)
// @route   PUT /api/company-info
// @access  Private/Admin
exports.updateCompanyInfo = async (req, res, next) => {
  try {
    const { phone, email, workingHours } = req.body;
    let info = await CompanyInfo.findOne();

    if (!info) {
      info = new CompanyInfo({
        phone,
        email,
        workingHours,
        updatedBy: req.user.id
      });
    } else {
      if (phone !== undefined) info.phone = phone;
      if (email !== undefined) info.email = email;
      if (workingHours !== undefined) info.workingHours = workingHours;
      info.updatedBy = req.user.id;
    }

    await info.save();
    res.json(info);
  } catch (error) {
    console.error('Error updating company info:', error);
    next(error);
  }
};
