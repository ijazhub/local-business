const bookingService = require("../services/booking.service");
const asyncHandler = require("../utils/asyncHandler");

exports.book = asyncHandler(async (req, res) =>
  res.status(201).json(await bookingService.book(req.body)),
);
exports.getById = asyncHandler(async (req, res) =>
  res.json(await bookingService.getById(req.params.id)),
);
exports.cancel = asyncHandler(async (req, res) =>
  res.json(await bookingService.cancel(req.params.id)),
);
exports.getByCustomerId = asyncHandler(async (req, res) =>
  res.json(await bookingService.getByCustomerId(req.params.id)),
);
exports.getByBusinessId = asyncHandler(async (req, res) =>
  res.json(await bookingService.getByBusinessId(req.params.id)),
);
