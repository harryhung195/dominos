import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  category: String,
});

export default mongoose.model("Pizza", pizzaSchema);