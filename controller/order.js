// Import Middleware
const asyncHandler = require("../middleware/async");

// Import Model
const Order = require("../models/Order");

// Import ErrorResponse
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc Get all orders
 * @route GET /api/v0/order
 * @access Private
 */
exports.getOrders = asyncHandler( async (req, res, next) => {
  if (!req.user.id) {
    return next(new ErrorResponse(`User not found or not logged In`, 404));
  }

  const orders = await Order.find({
    user: req.user.id,
  }).sort("-createdAt");

  res.status(200).json({ status: true, count: orders.length, data: orders });
});

/**
 * @desc Add new Order
 * @route POST /api/v0/order
 * @access Private
 */
exports.createOrder = asyncHandler( async (req, res, next) => {
  if (!req.user.id) {
    return next(new ErrorResponse(`User not found or not logged In`, 404));
  }
  req.body.user = req.user.id;
  const order = await Order.create(req.body);
  res.status(200).json({ status: true, data: order });
});
