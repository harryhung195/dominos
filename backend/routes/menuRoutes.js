const express = require("express");
const MenuItem = require("../models/Menu");
const mongoose = require("mongoose");
const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Fetch all menu items
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    const { name, desc, image, price, category } = req.body;

    if (!name || !desc || !image || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMenuItem = new MenuItem({ name, desc, image, price, category });

    await newMenuItem.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a menu item
router.delete("/:id", async (req, res) => {
  try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
      }

      await menuItem.deleteOne(); // ✅ Correct method
      res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: "Server error" });
  }
});


// Update a menu item
router.put("/update/:id", async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, category, price },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});




// ✅ Ensure you're exporting the router correctly
router.post("/add", async (req, res) => {
  try {
    const { name, desc, image, price, category } = req.body;

    // Validation
    if (!name || !desc || !image || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new menu item
    const newMenuItem = new Menu({
      name,
      desc,
      image,
      price,
      category,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    res.status(500).json({ message: "Server Error: Unable to add item" });
  }
});

module.exports = router;