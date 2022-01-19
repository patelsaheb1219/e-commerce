const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts, updateProduct } = require("../controller/product");
const { protect, authorize } = require("../middleware/auth");

router.get('/', getAllProducts);
router.post('/', protect, authorize("seller", "admin"),createProduct);
router.put('/:id', protect, authorize("seller", "admin"), updateProduct);

module.exports = router;