const cloudinary = require("cloudinary");
const express = require("express");
const path = require("path");
const Admin = require("../model/admin");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  sendActivationEmail,
  sendPasswordResetEmail,
  sendSellerActivationEmail,
} = require("../utils/sendMail");
const sendAdminToken = require("../utils/adminToken");
const { isAuthenticated, isAdmin,isAuth } = require("../middleware/auth");
const Shop = require("../model/shop");
const Product = require("../model/product");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// login user
router.post(
  "/login-admin",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      const admin = await Admin.findOne({ username }).select("+password");
      if (!admin) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      // const isPasswordValid = await admin.comparePassword(password);
      // if (!isPasswordValid) {
      //   return next(new ErrorHandler("Incorrect email or password", 400));
      // }

      sendAdminToken(admin, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getAdmin",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    console.log("hello:");
    try {
      const admin = await Admin.findById(req.admin.id);
      if (!admin) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("admin_token", null, {
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


module.exports = router;