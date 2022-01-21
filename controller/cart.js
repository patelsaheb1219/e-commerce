// Import Middleware
const asyncHandler = require("../middleware/async");

// Import Model
const Cart = require("../models/Cart");

// Import ErrorResponse
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc Get Added Cart items of a particular user
 * @route GET /api/v0/cart/user
 */
exports.getCartItems = asyncHandler(async (req, res, next) => {
  if (req.user.id) {
    const cartItems = await Cart.find({ user: req.user.id, status: "added" }).sort(
      "-createdAt"
    );
    res.status(200).json({ status: true, data: cartItems });
  } else {
    return next(new ErrorResponse(`User not found or not logged In`, 404))
  }
})

/**
  @desc Add product to the cart
  @routes POST /api/v0/cart/
  @access Private
 */
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const cart = await Cart.create(req.body);
  res.status(200).json({ status: true, data: cart });
})

/**
 * @desc Update Cart Item
 * @route PUT /api/v0/cart/:id
 * @access Private
 */
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  let cartItem = await Cart.findById(req.params.id);


  if (!cartItem) {
    return next(new ErrorResponse(`Cart Item not found`, 404));
  }

  if (req.user.id !== cartItem.user.toString()) {
    return next(new ErrorResponse(`User is not authorize to update this cart Item`, 401));
  }

  cartItem = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  
  res.status(200).json({ status: 200, data: cartItem });
});