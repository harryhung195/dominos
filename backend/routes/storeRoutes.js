const express = require("express");
const Store = require("../models/Store");
const router = express.Router();

// ✅ Get all stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, address, lat, lng } = req.body;
    if (!name || !address || !lat || !lng) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const newStore = new Store({ name, address, lat, lng });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ error: "Failed to add store" });
  }
});

// ✅ Delete a store (Admin only)
router.delete("/:id",  async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    await store.deleteOne();
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete store" });
  }
});

module.exports = router;
