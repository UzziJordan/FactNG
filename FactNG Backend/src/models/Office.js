const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true }
}, { _id: false });

const officeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Abuja Office", "Lagos Office"
  addresses: [addressSchema],
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Office', officeSchema);