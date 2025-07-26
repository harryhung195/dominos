
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/Menu");
const Offer= require("./models/Offer");
const Store = require("./models/Store");
const {
  menuItems,
  myDominosBoxMenu,
  meltzzMenu,
  snacksidesMenu,
  chickenMenu,
  drinksMenu,
  dessertMenu,
} = require("./data"); // Import all menu categories

const {Offers} = require("./offer");
const Stores = require("./stores");

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!", error);
    process.exit(1);
  }
};

// Function to import data
const importData = async () => {
  try {
    await connectDB();

    // 🗑️ Delete existing menu items
    await MenuItem.deleteMany();
    console.log("🗑️ Old menu items removed");
  // 🗑️ Delete old offers
  await Offer.deleteMany();
  console.log("🗑️ Old offers removed");
    // 🔀 Combine all menu categories into one array
    const allMenuItems = [
      ...menuItems,
      ...myDominosBoxMenu,
      ...meltzzMenu,
      ...snacksidesMenu,
      ...chickenMenu,
      ...drinksMenu,
      ...dessertMenu,
    ];

    // 🔍 Validate before inserting
    allMenuItems.forEach((item) => {
      if (!item.name || !item.image || !item.price || !item.category) {
        throw new Error(`❌ Missing required fields: ${JSON.stringify(item)}`);
      }
    });

    // ✅ Insert into MongoDB
    await MenuItem.insertMany(allMenuItems);
    console.log(`✅ ${allMenuItems.length} menu items added!`);
    //insert into Offer to MongoDB
    await Offer.insertMany(Offers);
    console.log(`✅ ${Offers.length} offers added!`);
     //insert into Stores to MongoDB
     await Store.insertMany(Stores);
     console.log(`${Stores.length} stores added!`)

    // 🔌 Close DB connection
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

// Run import function
importData();

