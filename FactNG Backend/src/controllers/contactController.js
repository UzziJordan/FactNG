const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const { fullname, phone, email, serviceInterested, message } = req.body;

    if (!fullname || !email || !serviceInterested || !message) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const contact = new Contact({
      fullname,
      phone,
      email,
      serviceInterested,
      message
    });

    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error.message);
    next(error);
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/contacts/admin
// @access  Private/Admin
exports.getAllMessages = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await Contact.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    next(error);
  }
};

// @desc    Get one message
// @route   GET /api/contacts/:id
// @access  Private/Admin
exports.getMessageById = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    // Auto mark as read when opened if it was unread
    if (message.status === 'unread') {
      message.status = 'read';
      await message.save();
    }
    
    res.json(message);
  } catch (error) {
    console.error('Error fetching contact:', error);
    next(error);
  }
};

// @desc    Update message status
// @route   PUT /api/contacts/:id
// @access  Private/Admin
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const message = await Contact.findById(req.params.id);
    
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    if (status) {
      message.status = status;
      await message.save();
    }
    
    res.json(message);
  } catch (error) {
    console.error('Error updating contact:', error);
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    next(error);
  }
};
