const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true, default: '+234 800 FACT NG' },
  email: { type: String, required: true, default: 'hello@factng.com' },
  workingHours: { type: String, required: true, default: 'Mon - Fri: 8am - 6pm' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
