const express = require("express");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  sendPasswordResetEmail,
  sendSellerActivationEmail,
} = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
const cloudinary = require("cloudinary");
const Product = require("../model/product");
const ShopDeleteRequest = require("../model/shopDeleteRequest");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// create shop
router.post(
  "/create-shop",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const fileName = req.file.filename;
      const filePath = req.file.path;

      const myCloud = await cloudinary.v2.uploader.upload(filePath, {
        folder: "avatars",
        public_id: fileName,
      });

      const seller = {
        name: name,
        email: email,
        password: password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };

      const activationToken = createActivationToken(seller);

      const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;

      try {
        await sendSellerActivationEmail({
          name: name, // Pass the user's name here
          email: seller.email,
          subject: "Activate your Shop",
          activationUrlSeller: activationUrl,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your shop!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

      const imageId = existsSeller.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update seller info
router.put(
  "/update-seller-info",
  isAuthenticated,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        email,
        password,
        phoneNumber,
        name,
        description,
        address,
        zipCode,
      } = req.body;

      // Find the seller by their ID (better security)
      const seller = await Shop.findById(req.seller.id).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      // Verify the password
      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler(
            "Incorrect password. Please provide the correct information",
            400
          )
        );
      }

      // Update seller information if provided
      if (name) seller.name = name;
      if (email) seller.email = email;
      if (phoneNumber) seller.phoneNumber = phoneNumber;
      if (description) seller.description = description;
      if (address) seller.address = address;
      if (zipCode) seller.zipCode = zipCode;

      await seller.save();

      res.status(200).json({
        success: true,
        message: "Seller information updated successfully",
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop password
router.put(
  "/update-shop-password",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.seller._id).select("+password");

      const isPasswordMatched = await shop.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      shop.password = req.body.newPassword;

      await shop.save();

      res.status(200).json({
        success: true,
        message: "Shop Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Forgot seller password route
router.post(
  "/forgot-seller-password",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findOne({ email: req.body.email });

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      const token = jwt.sign(
        { shopId: seller._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );

      const resetLink = `${process.env.FRONTEND_URL}/reset-seller-password/${token}`;

      try {
        await sendPasswordResetEmail({
          name: seller.name || "Seller",
          email: seller.email,
          subject: "Password Reset",
          resetLink: resetLink,
        });
        res.status(201).json({
          success: true,
          message: "Email sent successfully",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Reset seller password
router.post(
  "/reset-seller-password/:token",
  catchAsyncErrors(async (req, res) => {
    try {
      // Verify the token sent by the seller
      const decodedToken = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY
      );

      // If the token is invalid, return an error
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }

      // Find the seller with the id from the token
      const user = await Shop.findOne({ _id: decodedToken.shopId });
      if (!user) {
        return res.status(401).send({ message: "No seller found" });
      }

      // Update user's password, triggering the pre-save hook to hash the password
      user.password = req.body.newPassword;
      await user.save();

      // Send success response
      res.status(200).send({ message: "Password updated" });
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).send({ message: "Invalid token" });
      }
      // Send error response for other errors
      res.status(500).send({ message: error.message });
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id)
        .populate("followers")
        .populate({
          path: "reviews.user", // Populate user info for each review
          select: "username email", // Select fields to include from user
        });

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get follower count of a shop
router.get(
  "/followers/:shopId",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      const shopId = req.params.shopId;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res
          .status(404)
          .json({ success: false, message: "Shop not found" });
      }

      // Return the follower count of the shop
      res
        .status(200)
        .json({ success: true, followersCount: shop.followersCount });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);

// Get follower count of the shop that owns the product
router.get(
  "/followers/:productId",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      const productId = req.params.productId;

      // Find the product by productId
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      // Find the shop that owns the product
      const shop = await Shop.findById(product.shop);
      if (!shop) {
        return res
          .status(404)
          .json({ success: false, message: "Shop not found" });
      }

      // Return the follower count of the shop
      res
        .status(200)
        .json({
          success: true,
          shopId: shop._id,
          followersCount: shop.followersCount,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);

// check if shop exists
router.post(
  "/check-shop-exists",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      // Find the shop by email
      const shop = await Shop.findOne({ email });

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      res.status(200).json({
        success: true,
        shopId: shop._id,
        shopName: shop.name,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// request to delete shop
router.post(
  "/request-delete-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId, reason } = req.body;

      // Find the shop by shopId
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      // Create a new deletion request
      const deletionRequest = new ShopDeleteRequest({
        shop: shop._id,
        reason: reason,
      });
      console.log(deletionRequest);
      // Save the deletion request in the database
      await deletionRequest.save();

      res.status(201).json({
        success: true,
        message: "Request to delete shop has been sent.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get follower count of the shop that owns the product
router.get("/followers/:productId", isAuthenticated, catchAsyncErrors(async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by productId
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Find the shop that owns the product
    const shop = await Shop.findById(product.shop);
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    // Return the follower count of the shop
    res.status(200).json({ success: true, shopId: shop._id, followersCount: shop.followersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}));


module.exports = router;
