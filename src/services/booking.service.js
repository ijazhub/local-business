const bookingRepo = require('../repositories/booking.repository');
const businessRepo = require('../repositories/business.repository');
const customerRepo = require('../repositories/customer.repository');
const { BOOKING_STATUS } = require('../constants');
const AppError = require('../utils/AppError');

module.exports = {
  async book({ customerId, businessId, serviceId, scheduledAt, notes }) {
    if (!customerId || !businessId || !serviceId || !scheduledAt) {
      throw new AppError('customerId, businessId, serviceId and scheduledAt are required', 400);
    }
    const when = new Date(scheduledAt);
    if (isNaN(when) || when <= new Date()) {
      throw new AppError('scheduledAt must be a valid future date', 400);
    }

    if (!(await customerRepo.findById(customerId))) throw new AppError('Customer not found', 404);

    const business = await businessRepo.findById(businessId);
    if (!business) throw new AppError('Business not found', 404);

    const service = business.services.find((s) => String(s._id) === String(serviceId));
    if (!service) throw new AppError('Service not found for this business', 404);

    return bookingRepo.create({
      customerId,
      businessId,
      serviceId,
      serviceName: service.name,
      price: service.price,
      scheduledAt: when,
      notes,
    });
  },

  async getById(id) {
    const booking = await bookingRepo.findById(id);
    if (!booking) throw new AppError('Booking not found', 404);
    return booking;
  },

  async cancel(id) {
    const booking = await this.getById(id);
    if (booking.status === BOOKING_STATUS.CANCELLED) {
      throw new AppError('Booking is already cancelled', 409);
    }
    return bookingRepo.update(id, { status: BOOKING_STATUS.CANCELLED, cancelledAt: new Date() });
  },
};
