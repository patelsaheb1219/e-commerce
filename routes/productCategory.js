const express = require("express");
const router = express.Router();

const { createProductCategory } = require("../controller/productCategory");

router.post('/:userId', createProductCategory);

module.exports = router;