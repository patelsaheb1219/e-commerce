const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts } = require("../controller/product");
const { protect, authorize } = require("../middleware/auth");

router.get('/', getAllProducts);
router.post('/', protect, authorize("seller", "admin"),createProduct);

module.exports = router;