
const express = require("express");
const router = express.Router();
const User = require("../model/user");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncErrors");

router.post("/forgot-password", catchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate reset token (you can use libraries like `crypto` for this)
    const resetToken = generateResetToken();
    // Save reset token in user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    // Send email with reset link
    await sendMail({
      email: user.email,
      subject: "Password Reset",
      message: `Click the following link to reset your password: ${server}/reset-password/${resetToken}`,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
}));

module.exports = router;
