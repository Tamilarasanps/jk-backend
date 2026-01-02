const mongoose = require("mongoose");

// Define the schema
const pricingSchema = new mongoose.Schema({
  basicPackage: { type: String, required: true },
  standardPackage: { type: String, required: true },
  premiumPackage: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model("Pricing", pricingSchema);
