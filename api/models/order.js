const mongoose = require("mongoose");

// Define the schema for the cart item
const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  title: { type: String, required: true },
  categoryName: { type: String, required: true },
  category: { type: String, required: true },
});

// Define the main schema for the cart
const cartSchema = new mongoose.Schema({
  cart: [cartItemSchema],
  createdDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: "Not" },
  status: { type: String, default: "Placed" },
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

// Create the Mongoose model
const CartModel = mongoose.model("Orders", cartSchema);

module.exports = CartModel;
