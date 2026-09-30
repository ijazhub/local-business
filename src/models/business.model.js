const mongoose = require('mongoose');
const { CATEGORIES } = require('../constants');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  durationMins: { type: Number, min: 1 },
});

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES, index: true },
    description: { type: String, trim: true },
    city: { type: String, trim: true },
    phone: { type: String, trim: true },
    budget: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
    },
    services: {
      type: [serviceSchema],
      validate: [(v) => v.length > 0, 'At least one service is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Business', businessSchema);
