const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;
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
  const charge = await stripe.charges.create(
    {
      amount: req.body.totalAmount * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Total order amount to be paid is: ${req.body.totalAmount}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    },
    {
      idempotencyKey: uuid(),
    }
  );

  if (charge.paid) {
    req.body.paymentStatus = "payment_received";
    req.body.orderStatus = "order_placed";
  } else if (!charge.paid) {
    req.body.paymentStatus = "payment_decline";
  } else {
    req.body.paymentStatus = "payment_pending";
  }
  const order = await Order.create(req.body);
  res.status(200).json({ status: true, data: order });
});
