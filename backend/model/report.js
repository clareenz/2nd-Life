const mongoose = require('mongoose');

// Product Report Schema
const productReportSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
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

// Shop Report Schema
const shopReportSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
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

const ProductReport = mongoose.model('ProductReport', productReportSchema);
const ShopReport = mongoose.model('ShopReport', shopReportSchema);

module.exports = { ProductReport, ShopReport };
