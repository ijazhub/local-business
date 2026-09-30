const customerService = require("../services/customer.service");
const asyncHandler = require("../utils/asyncHandler");

exports.create = asyncHandler(async (req, res) =>
  res.status(201).json(await customerService.create(req.body)),
);
