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

// @desc Get product by id
// @routes GET /api/v0/product/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with the id ${req.params.id}`, 404));
  }

  res.status(200).json({ status: true, data: product });
});


// @desc Create a new product
// @routes POST /api/v0/product/:id
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});

// @desc Update an existing product
// @routes POST /api/v0/product/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // Check product exists
  if (!product) {
    return next(new ErrorResponse(`Product not found with the id ${req.params.id}`, 404));
  }

  // Check the user is product creator
  if (req.user.id !== product.user.toString()) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this product`))
  }

  // Update product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ status: true, data: product });
});

// @desc Update an existing product
// @routes POST /api/v0/product/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with the id ${req.params.id}`, 404));
  }

  // Check user is a product creator
  if (req.user.id !== product.user.toString()) {
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this product`, 401));
  }

  product.remove();
  
  res.status(200).json({ status: true, data: {} });

});