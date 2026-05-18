const Office = require('../models/Office');

// @desc    Create office
// @route   POST /api/offices
// @access  Private/Admin
exports.createOffice = async (req, res, next) => {
  try {
    const { name, addresses } = req.body;
    
    if (!name || !addresses) {
      return res.status(400).json({ message: 'Name and addresses are required' });
    }

    const office = new Office({
      name,
      addresses,
      updatedBy: req.user.id
    });

    await office.save();
    res.status(201).json(office);
  } catch (error) {
    console.error('Error creating office:', error);
    next(error);
  }
};

// @desc    Get all offices (Public)
// @route   GET /api/offices
// @access  Public
exports.getAllOffices = async (req, res, next) => {
  try {
    const offices = await Office.find().sort({ name: 1 });
    res.json(offices);
  } catch (error) {
    console.error('Error fetching offices:', error);
    next(error);
  }
};

// @desc    Get all offices (Admin)
// @route   GET /api/offices/admin
// @access  Private/Admin
exports.getAdminOffices = async (req, res, next) => {
  try {
    const offices = await Office.find().sort({ name: 1 });
    res.json(offices);
  } catch (error) {
    console.error('Error fetching offices:', error);
    next(error);
  }
};

// @desc    Update office
// @route   PUT /api/offices/:id
// @access  Private/Admin
exports.updateOffice = async (req, res, next) => {
  try {
    const { name, addresses } = req.body;
    const office = await Office.findById(req.params.id);
    
    if (!office) return res.status(404).json({ message: 'Office not found' });

    if (name) office.name = name;
    if (addresses) office.addresses = addresses;
    
    office.updatedBy = req.user.id;
    const updatedOffice = await office.save();
    res.json(updatedOffice);
  } catch (error) {
    console.error('Error updating office:', error);
    next(error);
  }
};

// @desc    Delete office
// @route   DELETE /api/offices/:id
// @access  Private/Admin
exports.deleteOffice = async (req, res, next) => {
  try {
    const office = await Office.findByIdAndDelete(req.params.id);
    if (!office) return res.status(404).json({ message: 'Office not found' });
    res.json({ message: 'Office deleted' });
  } catch (error) {
    console.error('Error deleting office:', error);
    next(error);
  }
};
