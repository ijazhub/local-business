const Business = require('../models/business.model');

module.exports = {
  create: (data) => Business.create(data),
  findAll: (filter = {}) => Business.find(filter).lean(),
  findById: (id) => Business.findById(id).lean(),
};
