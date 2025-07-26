const express = require("express");
const stripe = require("stripe")("***REMOVED***");
const Order = require("../models/Order");

const router = express.Router();

// ✅ Create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { subtotal, user, customer, cartItems } = req.body;

    console.log("✅ Checkout Session Data:", req.body);

    if (!subtotal || !user || !cartItems || !customer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(subtotal * 100),
      currency: "usd",
      metadata: { userid: user._id },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Error in create-checkout-session:", error);
    res.status(500).json({ message: "Failed to create payment session", error: error.message });
  }
});

// ✅ Confirm Payment and Save Order
router.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentIntentId, user, cartItems, customer, subtotal } = req.body;

    console.log("🟢 Confirm-Payment Data Received:", req.body); // Debugging log

    if (!paymentIntentId || !user || !cartItems || !subtotal || !customer) {
      console.error("❌ Missing required fields", { paymentIntentId, user, cartItems, customer, subtotal });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify Payment on Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("✅ Stripe Payment Status:", paymentIntent.status);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    // 📦 Save Order in MongoDB
    const newOrder = new Order({
      userid: user._id,
      name: user.name,
      email: user.email,
      items: cartItems,
      orderAmount: subtotal,
      transactionId: paymentIntentId,
     status: "Cooking Pending",
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        address: customer.address,
        postcode: customer.postcode,
      },
      createdAt: new Date(),
    });

    console.log("🟢 Saving Order:", newOrder); // Debugging log
    await newOrder.save();

    res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    console.error("❌ Error in confirm-payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;