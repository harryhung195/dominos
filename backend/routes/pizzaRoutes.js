const express = require("express");
const Pizza = require ("../models/Pizza");

const router = express.Router();

// Get all pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pizzas" });
  }
});

export default router;
