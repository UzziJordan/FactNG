const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const generateToken = require('../utils/generateToken');

// @desc    Setup initial admin (only if none exist)
// @route   POST /api/admin/setup
// @access  Public
exports.setupAdmin = async (req, res, next) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Setup already completed' });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const newAdmin = new Admin({ name, email, password, role: 'superadmin' });
    await newAdmin.save();

    res.status(201).json({ message: 'Initial admin created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new admin
// @route   POST /api/admin/create
// @access  Private/Admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();  
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(admin);
    res.json({ 
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/me
// @access  Private
exports.getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete admin account
// @route   DELETE /api/admin/account
// @access  Private
exports.deleteAccount = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.user.id);
    res.json({ message: 'Admin account deleted' });
  } catch (error) {
    next(error);
  }
};

// --- Dashboard ---

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalProjects = await Project.countDocuments();
    const publishedProjects = await Project.countDocuments({ isPublished: true });
    const unreadMessages = await Contact.countDocuments({ status: 'unread' });
    const totalContacts = await Contact.countDocuments();

    res.json({
      totalProjects,
      publishedProjects,
      unreadMessages,
      totalContacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent projects
// @route   GET /api/admin/dashboard/recent-projects
// @access  Private
exports.getRecentProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).limit(3);
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent messages
// @route   GET /api/admin/dashboard/recent-messages
// @access  Private
exports.getRecentMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(4);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// --- File Upload ---
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    url: req.file.path,
    public_id: req.file.filename
  });
};
