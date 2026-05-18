const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g. "Lead Architect", "Site Engineer"
    experience: { type: String }, // e.g. "8 years"
    bio: { type: String },
    image: {
        url: String,
        caption: String,
    },
    isPublished: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Expert', expertSchema);