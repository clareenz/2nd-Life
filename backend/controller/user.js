const cloudinary = require("cloudinary");
const express = require("express");
const path = require("path");
const User = require("../model/user");
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
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const Shop = require("../model/shop");
const Product = require("../model/product");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    const fileName = req.file.filename;
    const filePath = req.file.path;

    //user exist
    if (userEmail) {
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(filePath, {
      folder: "avatars",
      public_id: fileName,
    });

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    // Clean up the file after uploading
    fs.unlinkSync(filePath);

    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    try {
      await sendActivationEmail({
        name: name, // Pass the user's name here
        email: user.email,
        subject: "Activate your account",
        activationUrl: activationUrl, // Pass the activation URL here
      });
      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect email or password", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        user,
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
      res.cookie("token", null, {
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

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      // Find the user by the current email or user ID (better security)
      const user = await User.findOne({ email: req.user.email }).select(
        "+password"
      );

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      // Verify the password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler(
            "Incorrect password. Please provide the correct information",
            400
          )
        );
      }

      // Update user information if provided
      if (name) user.name = name;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User information updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        const imageId = existsUser.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const fileName = req.file.filename;
        const filePath = req.file.path;

        const myCloud = await cloudinary.v2.uploader.upload(filePath, {
          folder: "avatars",
          public_id: fileName,
        });

        existsUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      await existsUser.save();

      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;


      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
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
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user information with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//forgot password
router.post(
  "/forgot-password",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10m",
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      try {
        await sendPasswordResetEmail({
          name: user.name || "User", // Assuming you have a name field
          email: user.email,
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

//reset password
router.post(
  "/reset-password/:token",
  catchAsyncErrors(async (req, res) => {
    try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY
      );

      // If the token is invalid, return an error
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }

      // Find the user with the id from the token
      const user = await User.findOne({ _id: decodedToken.userId });
      if (!user) {
        return res.status(401).send({ message: "No user found" });
      }
      // Update user's password, triggering the pre-save hook to hash the password
      user.password = req.body.newPassword;
      await user.save();

      // Send success response
      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      // Handle specific JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).send({ message: "Invalid token" });
      }
      // Send error response for other errors
      res.status(500).send({ message: err.message });
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user account
router.delete(
  "/delete-user-account",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user.id; // Get the user ID from the authenticated request
      // Find the user by ID and delete it from the database
      await User.findByIdAndDelete(userId);
      // Logout the user by clearing the token cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      // Send a success response
      res
        .status(200)
        .json({ success: true, message: "User account deleted successfully!" });
    } catch (error) {
      // Handle errors
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Follow a shop
router.post(
  "/follow/:shopId",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const userId = req.user._id;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res
          .status(404)
          .json({ success: false, message: "Shop not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Check if the user is already following the shop
      if (shop.followers.includes(userId)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User is already following this shop",
            isFollowing: true,
          });
      }

      // Add the user to the shop's followers array
      shop.followers.push(userId);
      shop.followersCount += 1; // Increment followers count
      await shop.save(); // Save the updated shop to the database

      // Add the shop to the user's followingShops array
      user.followingShops.push(shopId);
      await user.save();

      res
        .status(200)
        .json({
          success: true,
          message: "User followed the shop successfully",
          isFollowing: true,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);

// Unfollow a shop
router.post(
  "/unfollow/:shopId",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const userId = req.user._id;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res
          .status(404)
          .json({ success: false, message: "Shop not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Check if the user is following the shop
      if (!shop.followers.includes(userId)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User is not following this shop",
            isFollowing: false,
          });
      }

      // Remove the user from the shop's followers array
      shop.followers = shop.followers.filter(
        (followerId) => followerId.toString() !== userId.toString()
      );
      shop.followersCount -= 1; // Decrement followers count
      await shop.save(); // Save the updated shop to the database

      // Remove the shop from the user's followingShops array
      user.followingShops = user.followingShops.filter(
        (followingShopId) => followingShopId.toString() !== shopId.toString()
      );
      await user.save();

      res
        .status(200)
        .json({
          success: true,
          message: "User unfollowed the shop successfully",
          isFollowing: false,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  })
);

module.exports = router;