const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/Mongodb"); // MongoDB connection
const menuRoutes = require("./routes/menuRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const offerRoutes = require("./routes/offerRoutes.js");
const storeRoutes = require("./routes/storeRoutes.js")
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://dominos-beige.vercel.app", credentials: true }));

// Connect to MongoDB
connectDB();

// Routes

app.use("/api/menu", menuRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/stores", storeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



