const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }, 
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  payment_method: {
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "cash_on_delivery"],
    required: true
  },
  orderStatus: {
    type: String,
    enum: ["order_pending", "order_placed", "order_shipped", "order_out_for_delivery", "order_delivered"],
    default: "order_pending",
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["payment_pending", "payment_received"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Order", OrderSchema);