const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// POST /api/auth/reset-password
router.post(
  "/reset-password",
  [
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("token").notEmpty().withMessage("Reset token is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { password, token } = req.body;

    try {
      // Find user by reset token and check if token is not expired
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update password and clear reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: "Password has been reset successfully." });
    } catch (err) {
      console.error("Reset Password Error:", err);
      res.status(500).json({ message: "Server error." });
    }
  }
);

module.exports = router;
