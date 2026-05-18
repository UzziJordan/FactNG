const Story = require('../models/Story');

// @desc    Get story (Public)
// @route   GET /api/story
// @access  Public
exports.getStory = async (req, res, next) => {
  try {
    const story = await Story.findOne();
    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    next(error);
  }
};

// @desc    Get story (Admin)
// @route   GET /api/story/admin
// @access  Private/Admin
exports.getAdminStory = async (req, res, next) => {
  try {
    const story = await Story.findOne();
    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    next(error);
  }
};

// @desc    Update/Upsert story
// @route   PUT /api/story
// @access  Private/Admin
exports.updateStory = async (req, res, next) => {
  try {
    const { content, caption, imageUrl } = req.body;
    let story = await Story.findOne();

    if (!story) {
      story = new Story({
        content: content || 'Welcome to Fact NG',
        image: {
          url: imageUrl || '',
          caption: caption || ''
        },
        updatedBy: req.user.id
      });
    } else {
      if (content !== undefined) story.content = content;
      if (caption !== undefined) story.image.caption = caption;
      if (imageUrl !== undefined) story.image.url = imageUrl;
      story.updatedBy = req.user.id;
    }

    if (req.file) {
      story.image.url = req.file.path;
    }

    await story.save();
    res.json(story);
  } catch (error) {
    console.error('Error updating story:', error);
    next(error);
  }
};
