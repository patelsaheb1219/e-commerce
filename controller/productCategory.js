const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");

const ProductCategory = require("../models/ProductCategory");
const User = require("../models/User");

const ErrorResponse = require("../utils/errorResponse");

// @desc Create new Product Category
// @routes POST /api/v0/productCategory
// @access Private
exports.createProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.create(req.body)
  res.status(200).json({ status: true, data: productCategory });
})