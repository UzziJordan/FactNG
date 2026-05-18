const Expert = require('../models/Expert');

// @desc    Create expert
// @route   POST /api/experts
// @access  Private/Admin
exports.createExpert = async (req, res, next) => {
  try {
    const { name, role, experience, bio, isPublished, display_order, imageUrl, caption } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = req.file.path;
    }

    const expert = new Expert({
      name,
      role,
      experience,
      bio,
      isPublished: isPublished === 'true' || isPublished === true,
      display_order: display_order || 0,
      image: {
        url: finalImageUrl,
        caption: caption || ''
      },
      createdBy: req.user.id
    });

    await expert.save();
    res.status(201).json(expert);
  } catch (error) {
    console.error('Error creating expert:', error);
    next(error);
  }
};

// @desc    Get all experts (Public)
// @route   GET /api/experts
// @access  Public
exports.getAllExperts = async (req, res, next) => {
  try {
    const experts = await Expert.find({ isPublished: true }).sort({ display_order: 1 });
    res.json(experts);
  } catch (error) {
    console.error('Error fetching experts:', error);
    next(error);
  }
};

// @desc    Get all experts (Admin)
// @route   GET /api/experts/admin
// @access  Private/Admin
exports.getAdminExperts = async (req, res, next) => {
  try {
    const experts = await Expert.find().sort({ display_order: 1 });
    res.json(experts);
  } catch (error) {
    console.error('Error fetching experts:', error);
    next(error);
  }
};

// @desc    Update expert
// @route   PUT /api/experts/:id
// @access  Private/Admin
exports.updateExpert = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: 'Expert not found' });

    const { name, role, experience, bio, isPublished, display_order, imageUrl, caption } = req.body;

    expert.name = name || expert.name;
    expert.role = role || expert.role;
    expert.experience = experience || expert.experience;
    expert.bio = bio || expert.bio;
    
    if (isPublished !== undefined) {
      expert.isPublished = isPublished === 'true' || isPublished === true;
    }
    
    if (display_order !== undefined) {
      expert.display_order = display_order;
    }

    if (req.file) {
      expert.image.url = req.file.path;
    } else if (imageUrl !== undefined) {
      expert.image.url = imageUrl;
    }
    if (caption !== undefined) {
      expert.image.caption = caption;
    }

    const updatedExpert = await expert.save();
    res.json(updatedExpert);
  } catch (error) {
    console.error('Error updating expert:', error);
    next(error);
  }
};

// @desc    Reorder experts
// @route   PUT /api/experts/reorder
// @access  Private/Admin
exports.reorderExperts = async (req, res, next) => {
  try {
    const { experts } = req.body; // Array of { id, display_order }
    
    if (!Array.isArray(experts)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const updatePromises = experts.map(item => 
      Expert.findByIdAndUpdate(item.id, { display_order: item.display_order })
    );

    await Promise.all(updatePromises);
    res.json({ message: 'Experts reordered successfully' });
  } catch (error) {
    console.error('Error reordering experts:', error);
    next(error);
  }
};

// @desc    Delete expert
// @route   DELETE /api/experts/:id
// @access  Private/Admin
exports.deleteExpert = async (req, res, next) => {
  try {
    const expert = await Expert.findByIdAndDelete(req.params.id);
    if (!expert) return res.status(404).json({ message: 'Expert not found' });
    res.json({ message: 'Expert deleted' });
  } catch (error) {
    console.error('Error deleting expert:', error);
    next(error);
  }
};
