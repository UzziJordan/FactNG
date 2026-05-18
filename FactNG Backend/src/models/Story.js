const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: {
    url: String,
    caption: String
  },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);