const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const cloudinary = require("cloudinary");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        images = req.files;

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i].path, {
            folder: "products",
            public_id: images[i].filename,
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id })
        .populate("reviews.user")
        .populate("reviews.productId")
        .populate("shop");

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {

      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }


      // Delete images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        const image = product.images[i];
        if (image && image.public_id) {
          const result = await cloudinary.uploader.destroy(image.public_id);
        }
      }

      // Delete the product from the database
      await product.deleteOne();

      res.status(200).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find()
      .populate({
        path: 'reviews.user',
        select: 'username email'
      })
      .populate("reviews.productId")
      .populate("shop");

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//update shop of product
router.put("/update-shop-products", async (req, res, next) => {
  try {
    const { sellerId } = req.body;

    //Update the shop with the retrieved products
    const updatedShop = await Shop.findById(sellerId);

    if (!updatedShop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    // Find all products associated with the provided shop ID
    const products = await Product.updateMany(
      { shopId: sellerId },
      { $set: { shop: updatedShop } }
    );

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found for the provided shop ID",
      });
    }

    // Return the updated shop
    return res.status(200).json({
      success: true,
      message: "Shop updated successfully with products",
      products,
    });
  } catch (error) {
    return next(error);
  }
});

// Update product
router.put(
  "/update-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { name, price, stock } = req.body; // Assuming these are the fields you want to update

      // Validate if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 404));
      }

      // Update the product fields
      product.name = name;
      product.discountPrice = price;
      product.stock = stock;

      // Save the updated product
      await product.save();

      res.status(200).json({
        success: true,
        product,
        message: "Product updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Route to get total reviews of a product and calculate average rating
router.get(
  "/reviews/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {

      // Find the product by ID and populate the user details in the reviews
      const product = await Product.findById(req.params.id)
        .populate({
          path: 'reviews.user',
          select: 'username email'
        });

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Calculate the total number of reviews
      const totalReviews = product.reviews.length;

      // Calculate the average rating
      const averageRating = totalReviews > 0 ? 
        product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

      // Respond with the product's total reviews and average rating
      res.status(201).json({
        success: true,
        totalReviews,
        averageRating,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// Route to get average rating of all products of a shop
router.get(
  "/reviews-shop/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {

      // Find all products of the shop
      const products = await Product.find({ shop: req.params.shopId });

      if (!products || products.length === 0) {
        return next(new ErrorHandler("No products found for this shop", 404));
      }


      // Calculate the average rating for each product
      const productRatings = products.map(product => {
        const totalReviews = product.reviews.length;
        const averageRating = totalReviews > 0 ? 
          product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
        return averageRating;
      });

      // Calculate the overall average rating for all products
      const overallAverageRating = productRatings.reduce((sum, rating) => sum + rating, 0) / productRatings.length;

      // Respond with the overall average rating
      res.status(201).json({
        success: true,
        overallAverageRating,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



module.exports = router;
