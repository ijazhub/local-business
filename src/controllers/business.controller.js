const businessService = require("../services/business.service");
const asyncHandler = require("../utils/asyncHandler");

exports.onboard = asyncHandler(async (req, res) =>
  res.status(201).json(await businessService.onboard(req.body)),
);
exports.listAll = asyncHandler(async (req, res) =>
  res.json(await businessService.listAll()),
);
exports.listByCategory = asyncHandler(async (req, res) =>
  res.json(
    await businessService.listByCategory(req.params.category.toUpperCase()),
  ),
);
exports.listCategories = (req, res) =>
  res.json(businessService.listCategories());
exports.listServices = asyncHandler(async (req, res) =>
  res.json(
    await businessService.listAllServices(
      req.query.category && req.query.category.toUpperCase(),
    ),
  ),
);
