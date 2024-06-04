const mongoose = require("mongoose");

const shopDeleteRequestSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
   reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const shopDeleteRequest = mongoose.model("ShopDeleteRequest", shopDeleteRequestSchema);

module.exports = shopDeleteRequest;
