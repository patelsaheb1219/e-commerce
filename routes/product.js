const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts } = require("../controller/product");

router.get('/', getAllProducts);
router.post('/:id', createProduct);

module.exports = router;