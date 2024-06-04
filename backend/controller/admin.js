const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

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
          return next(new ErrorHandler("Admin doesn't exist!", 400));
        }
  
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
          return next(new ErrorHandler("Incorrect username or password", 400));
        }
  
        sendToken(admin, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  

// load admin
router.get(
  "/getadmin",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
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

module.exports = router;
