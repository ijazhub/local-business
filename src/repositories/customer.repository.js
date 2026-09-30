const Customer = require('../models/customer.model');

module.exports = {
  create: (data) => Customer.create(data),
  findById: (id) => Customer.findById(id).lean(),
  findByEmail: (email) => Customer.findOne({ email: email.toLowerCase() }).lean(),
};
