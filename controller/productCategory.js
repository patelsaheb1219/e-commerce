const asyncHandler = require("../middleware/async");

const ProductCategory = require("../models/ProductCategory");

const ErrorResponse = require("../utils/errorResponse");

// @desc Create new Product Category
// @routes POST /api/v0/productCategory
// @access Private
exports.createProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.create(req.body);
  res.status(200).json({ status: true, data: productCategory });
});

// @desc Get All Product Category
// @routes GET /api/v0/productCategory
// @access Public
exports.getAllProductCategories = asyncHandler(async (req, res, next) => {
  const categories = await ProductCategory.find();
  res.status(200).json({ status: true, data: categories });
});

exports.getProductCategoryById = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const category = await ProductCategory.findById(req.params.id);
    
    if (!category) {
      return next(new ErrorResponse(`Product category not found with id ${req.params.id}`, 404));
    }
    
    res.status(200).json({ status: true, data: category });
  } else {
    return next(new ErrorResponse(`Product Category Id not found`))
  }
})

// @desc Update an existing Product Category
// @routes PUT /api/v0/productCategory/:id
// @access Private
exports.updateProductCategory = asyncHandler(async (req, res, next) => {
  let productCategory = await ProductCategory.findById(req.params.id);

  if (!productCategory) {
    return next(
      new ErrorResponse(`Product Category not found with id ${req.params.id}`, 404)
    );
  }

  productCategory = await ProductCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ status: true, data: productCategory });
});

// @desc DELETE an existing Product Category
// @routes DELETE /api/v0/productCategory/:id
// @access Private
exports.deleteProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id);

  if (!productCategory) {
    return next(
      new ErrorResponse(`Product Category not found with id ${req.params.id}`, 404)
    );
  }

  productCategory.remove();

  res.status(200).json({ status: true, data: {} });
});
