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

require("dotenv").config();
const secret = process.env.JWT_SECRET;
const FRONTEND_URL=process.env.VITE_FRONTEND_URL;

// ================= CREATE USER ===================
router.post("/createuser", [
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const secPassword = bcrypt.hashSync(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
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
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email.toLowerCase() });
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
    const { name, email, address, country, dob, phone, state } = req.body;

    const updateFields = { name, email, address, country, dob, phone, state };
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


// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ Status: "User not existed" });
    }

    // Generate JWT reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
      expiresIn: "1h",
    });

    // Log the target email
    console.log("Sending password reset email to:", email);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    const resetLink = `${FRONTEND_URL}/reset-password/${user._id}/${token}`;

    const mailOptions = {
      from: `PrimeShoe NP <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - PrimeShoe Nepal",
      text: `
      Hello ${user.name || 'User'},
      You requested a password reset. Click the link below to reset it:
      ${resetLink}
      This link will expire in 1 hour.
      If you did not request this, please ignore it.
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ Status: "Email not sent", Error: error });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({ Status: "Success", Info: info.response });
      }
    });
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

module.exports = router;
