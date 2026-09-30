const businessRepo = require('../repositories/business.repository');
const { CATEGORIES } = require('../constants');
const AppError = require('../utils/AppError');

function checkCategory(category) {
  if (!CATEGORIES.includes(category)) {
    throw new AppError(`Invalid category. Allowed: ${CATEGORIES.join(', ')}`, 400);
  }
}

module.exports = {
  listCategories: () => CATEGORIES,

  onboard(data) {
    const { budget } = data;
    if (budget && budget.min > budget.max) {
      throw new AppError('budget.min cannot be greater than budget.max', 400);
    }
    return businessRepo.create(data);
  },

  listAll: () => businessRepo.findAll(),

  listByCategory(category) {
    checkCategory(category);
    return businessRepo.findAll({ category });
  },

  // Flattens every business's services into one list with price
  async listAllServices(category) {
    if (category) checkCategory(category);
    const businesses = await businessRepo.findAll(category ? { category } : {});
    return businesses.flatMap((b) =>
      b.services.map((s) => ({
        serviceId: s._id,
        serviceName: s.name,
        description: s.description,
        price: s.price,
        durationMins: s.durationMins,
        businessId: b._id,
        businessName: b.name,
        category: b.category,
      }))
    );
  },
};
