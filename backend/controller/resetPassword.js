const express = require("express");
const router = express.Router();
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post("/reset-password", catchAsyncErrors (async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    // Find user by reset token
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    // Update user's password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
})
);

module.exports = router;
