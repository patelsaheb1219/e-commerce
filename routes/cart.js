const express = require("express");
const router = express.Router();

const {
  getCartItems,
  updateCartItem,
  addItemToCart,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

router.post("/", protect, addItemToCart);
router.get("/", protect, getCartItems);
router.put("/:id", protect, updateCartItem);

module.exports = router;
