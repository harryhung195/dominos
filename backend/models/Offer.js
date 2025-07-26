const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true }, // Percentage or fixed amount
  validUntil: { type: Date, required: true },
  image: { type: String }, // Optional for image URL
  offerCode: { type: String }, // Optional for promo codes
});

module.exports = mongoose.model("Offer", offerSchema);

