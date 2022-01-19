const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } = require("../controller/product");
const { protect, authorize } = require("../middleware/auth");

router.get('/', getAllProducts);
router.post('/', protect, authorize("seller", "admin"),createProduct);

router.get('/:id', getProductById);
router.put('/:id', protect, authorize("seller", "admin"), updateProduct);
router.delete('/:id', protect, authorize("seller", "admin"), deleteProduct);

module.exports = router;