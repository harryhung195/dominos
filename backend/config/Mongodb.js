require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("✅ MongoDB Connection Successful");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

module.exports = connectDB;