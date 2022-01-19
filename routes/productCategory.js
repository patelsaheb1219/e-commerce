const express = require("express");
const router = express.Router();

const { createProductCategory } = require("../controller/productCategory");
const { protect, authorize } = require("../middleware/auth");

router.post('/', protect, authorize("seller", "admin"), createProductCategory);

module.exports = router;