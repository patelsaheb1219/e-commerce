const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const { createOrder, getOrders } = require("../controller/order");

router.get("/", protect, getOrders);
router.post("/", protect, createOrder);

module.exports = router;