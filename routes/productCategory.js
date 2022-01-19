const express = require("express");
const router = express.Router();

const {
  createProductCategory,
  getAllProductCategories,
  updateProductCategory,
  deleteProductCategory,
  getProductCategoryById,
} = require("../controller/productCategory");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("admin"), createProductCategory);
router.get("/", getAllProductCategories);

router.get('/:id', getProductCategoryById);
router.put("/:id", protect, authorize("admin"), updateProductCategory);
router.delete("/:id", protect, authorize("admin"), deleteProductCategory);

module.exports = router;
