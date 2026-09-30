const mongoose = require('mongoose');
const { BOOKING_STATUS } = require('../constants');

const bookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    // Snapshot so old bookings stay correct even if the service changes later
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    scheduledAt: { type: Date, required: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: Object.values(BOOKING_STATUS), default: BOOKING_STATUS.BOOKED },
    cancelledAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Booking', bookingSchema);
