const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [50, "Name cannot be more than 50 characters"]
  },
  description: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);