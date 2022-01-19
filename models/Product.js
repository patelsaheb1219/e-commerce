const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "description cannot be more than 500 characters"],
    },
    sku: {
      type: String,
      required: true,
      minlength: [12, "SKU cannot be less than 12"],
      maxlength: [12, "SKU cannot be more than 12"],
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
