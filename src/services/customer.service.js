const customerRepo = require('../repositories/customer.repository');
const AppError = require('../utils/AppError');

module.exports = {
  async create(data) {
    if (data.email && (await customerRepo.findByEmail(data.email))) {
      throw new AppError('Customer with this email already exists', 409);
    }
    return customerRepo.create(data);
  },
};
