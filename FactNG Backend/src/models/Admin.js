//import Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//create Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin',
  }
}, { timestamps: true });

//Hash password before saving
adminSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Method to compare password
adminSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//Export Admin model
module.exports = mongoose.model('Admin', adminSchema);