const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

exports.verifyResetToken = async (req, res, next) => {
  const { token } = req.params; // Assuming the token is provided in the URL parameters

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token is valid and not expired
    const user = await User.findOne({
      _id: decodedToken.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the expiry time is in the future
    });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    // Attach the user to the request object for further processing
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

// Middleware to check if the user is authenticated as admin
exports.isAdminAuthenticated = (req, res, next) => {
  // Check if the user is logged in and is an admin
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next(); // Allow access to the admin interface
  } else {
    res.status(403).json({ message: "Unauthorized access." });
  }
};

// Middleware to check if the user has admin role
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resource!`)
      );
    }
    next();
  };
};

// Combined middleware to check if the user is authenticated as admin and has admin role
exports.isAdminAuthenticatedAndAuthorized = (req, res, next) => {
  exports.isAdminAuthenticated(req, res, () => {
    exports.isAdmin("admin")(req, res, next);
  });
};
