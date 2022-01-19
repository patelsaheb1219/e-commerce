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
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});
