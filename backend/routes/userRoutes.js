const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Ensure all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered. Please login." });
        }

        // Create and save the new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Received login request:", req.body); // Debugging

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        console.log("User found:", user); // Debugging

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ GET ALL USERS
router.get("/getallusers", async (req, res) => {
    try {
      const users = await User.find({});
      console.log("Users from DB:", users); // Debugging
      res.send(users);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  




module.exports = router;
  

// ✅ DELETE USER
router.post("/deleteuser", async (req, res) => {
    const { userid } = req.body;
    
    try {
        const deletedUser = await User.findByIdAndDelete(userid);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(400).json({ message: "Failed to delete user", error: error.message });
    }
});

module.exports = router;


// Update user role
router.put("/:userId/role", async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters
    const { role } = req.body; // Get new role from request body
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's role (case insensitive)
      user.isAdmin = role.toLowerCase() === 'admin';
  
      // Save the updated user
      const updatedUser = await user.save();
  
      // Send the updated user back in the response
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;