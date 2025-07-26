const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true }, // Item name
        quantity: { type: Number, required: true }, // Item quantity
        price: { type: Number, required: true } // Item price
      }
    ],
    orderAmount: { type: Number, required: true },
    cartItems: { type: Array, required: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      postcode: { type: String, required: true },
    },
    transactionId: { type: String, required: true, unique: true }, // 🔥 Ensure uniqueness
    orderStatus: { type: String, default: "Cooking Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);





