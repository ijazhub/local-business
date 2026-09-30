const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Customer', customerSchema);
