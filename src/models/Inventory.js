const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Inventory", inventorySchema);
