const express = require("express");
const router = express.Router();

const {
  getCartItems,
  updateCartItem,
  addItemToCart,
  getSavedCartItems,
  deleteCartItem,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

router.post("/", protect, addItemToCart);
router.get("/", protect, getCartItems);
router.get("/saved", protect, getSavedCartItems);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, deleteCartItem)

module.exports = router;
