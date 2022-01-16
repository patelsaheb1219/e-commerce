const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");

const ProductCategory = require("../models/ProductCategory");
const User = require("../models/User");

const ErrorResponse = require("../utils/errorResponse");

// @desc Create new Product Category
// @routes POST /api/v0/productCategory
// @access Private
exports.createProductCategory = asyncHandler(async (req, res, next) => {
  console.log("params", req.params);
  if (req.params.userId) {
    const user = await User.findById(req.params.userId);
    if (user && user.role === "seller") {
      const { name, description } = req.body;
      const productCategory = await ProductCategory.create({
        name,
        description
      })
      res.status(200).json({ status: true, data: productCategory });
    } else {
      return next(new ErrorResponse(`User ${req.params.userId} is not found or not authorized to add new product Category`, 401));
    }
  } else {
    return next(new ErrorResponse(`Opps! User ID not found`, 404));
  }
})