const SocialLink = require('../models/SocialLink');

// @desc    Create social link
// @route   POST /api/social-links
// @access  Private/Admin
exports.createSocialLink = async (req, res, next) => {
  try {
    const { platform, url, icon, is_active, display_order } = req.body;
    
    if (!platform || !url) {
      return res.status(400).json({ message: 'Platform and URL are required' });
    }

    const socialLink = new SocialLink({
      platform,
      url,
      icon,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
      updatedBy: req.user.id
    });

    await socialLink.save();
    res.status(201).json(socialLink);
  } catch (error) {
    console.error('Error creating social link:', error);
    next(error);
  }
};

// @desc    Get active social links (Public)
// @route   GET /api/social-links
// @access  Public
exports.getAllSocialLinks = async (req, res, next) => {
  try {
    const socialLinks = await SocialLink.find({ is_active: true }).sort({ display_order: 1 });
    res.json(socialLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    next(error);
  }
};

// @desc    Get all social links (Admin)
// @route   GET /api/social-links/admin
// @access  Private/Admin
exports.getAdminSocialLinks = async (req, res, next) => {
  try {
    const socialLinks = await SocialLink.find().sort({ display_order: 1 });
    res.json(socialLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    next(error);
  }
};

// @desc    Update social link
// @route   PUT /api/social-links/:id
// @access  Private/Admin
exports.updateSocialLink = async (req, res, next) => {
  try {
    const { platform, url, icon, is_active, display_order } = req.body;
    const socialLink = await SocialLink.findById(req.params.id);
    
    if (!socialLink) return res.status(404).json({ message: 'Social link not found' });

    if (platform) socialLink.platform = platform;
    if (url) socialLink.url = url;
    if (icon) socialLink.icon = icon;
    if (is_active !== undefined) socialLink.is_active = is_active;
    if (display_order !== undefined) socialLink.display_order = display_order;
    
    socialLink.updatedBy = req.user.id;
    const updatedSocialLink = await socialLink.save();
    res.json(updatedSocialLink);
  } catch (error) {
    console.error('Error updating social link:', error);
    next(error);
  }
};

// @desc    Delete social link
// @route   DELETE /api/social-links/:id
// @access  Private/Admin
exports.deleteSocialLink = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.findByIdAndDelete(req.params.id);
    if (!socialLink) return res.status(404).json({ message: 'Social link not found' });
    res.json({ message: 'Social link deleted' });
  } catch (error) {
    console.error('Error deleting social link:', error);
    next(error);
  }
};
