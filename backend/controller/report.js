const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const { body, validationResult } = require("express-validator");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ProductReport, ShopReport } = require("../model/report");

// Validate report request body for product report
router.post(
  "/report-product/:productId",
  [
    body("reason").isLength({ min: 1 }).withMessage("Reason is required."),
  ],
  catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productId = req.params.productId;
    const { reason } = req.body;

    try {
      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      // Create a new product report
      const productReport = new ProductReport({
        product: productId,
        reason: reason,
      });

      await productReport.save();

      res.status(200).json({ message: "Product reported successfully." });
    } catch (error) {
      console.error("Error reporting product:", error);
      res.status(500).json({ message: "An error occurred while reporting the product." });
    }
  })
);

// Validate report request body for shop report
router.post(
  "/report-shop/:shopId",
  [
    body("reason").isLength({ min: 1 }).withMessage("Reason is required."),
  ],
  catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shopId = req.params.shopId;
    const { reason } = req.body;

    try {
      // Find the shop by ID
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(404).json({ message: "Shop not found." });
      }

      // Create a new shop report
      const shopReport = new ShopReport({
        shop: shopId,
        reason: reason,
      });

      await shopReport.save();

      res.status(200).json({ message: "Shop reported successfully." });
    } catch (error) {
      console.error("Error reporting shop:", error);
      res.status(500).json({ message: "An error occurred while reporting the shop." });
    }
  })
);

module.exports = router;
