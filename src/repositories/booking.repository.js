const Booking = require('../models/booking.model');

module.exports = {
  create: (data) => Booking.create(data),
  findById: (id) => Booking.findById(id).lean(),
  update: (id, changes) => Booking.findByIdAndUpdate(id, changes, { new: true }).lean(),
};
