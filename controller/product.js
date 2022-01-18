// Import Middleware
const asyncHandler = require("../middleware/async");

// Import Model
const User = require("../models/User");
const Product = require("../models/Product");

// Import ErrorResponse
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all the products
// @routes GET /api/v0/product
// @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ status: true, data: products });
});


// @desc Create a new product
// @routes POST /api/v0/product/:userId
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    let user = await User.findById(req.params.userId);
    if (user) {
      req.body.user = req.params.userId;
      const { name, description, sku, price, photo, user } = req.body;
      const product = await Product.create({
        name,
        description,
        sku,
        price,
        photo,
        user
      });

      res.status(200).json({ success: true, data: product });
    } else {
      return next(new ErrorResponse(`User ${req.params.userId} is not authorized to create this product`, 401));
    }
  } else {
    return next(new ErrorResponse(`Opps! User ID not found`, 404));
  }
});
