const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const secret = process.env.JWT_SECRET;

// ================= CREATE USER ===================
router.post("/createuser", [
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const secPassword = bcrypt.hashSync(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });

    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, secret);

    res.status(201).json({ message: "User created successfully!", user, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ================= LOGIN ===================
router.post("/login", [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) return res.status(400).json({ message: "Password Not Matched" });

    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, secret);

    res.status(201).json({ message: "Login Successful", user, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ================= GET USER ===================
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ================= UPDATE USER PROFILE ===================
router.put("/updateuser", fetchUser, upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, address } = req.body;

    const updateFields = { name, email, address };
    if (req.file) updateFields.profileImage = req.file.buffer.toString("base64");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});

router.put("/delete-profile-image", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: '' },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile image removed", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to remove image" });
  }
});

// ================= FORGOT PASSWORD ===================
router.post("/forgot-password", [
  body("email").isEmail().withMessage("Valid email is required"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'Namaste Paws <yourEmail@gmail.com>',
      to: email,
      subject: 'Reset Your Password - PrimeShoe Nepal',
      html: `
        <p>Hello ${user.name || 'User'},</p>
        <p>You requested a password reset. Click the link below to reset it:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore it.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
