const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // facebook, instagram, linkedin
  url: { type: String, required: true },
  icon: { type: String }, // optional icon name/class
  is_active: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('SocialLink', socialLinkSchema);