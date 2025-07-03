const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();

const secret = process.env.JWT_SECRET;


router.post("/createuser",[
    body("name").isLength({min:3}).withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    ], async(req, res) => {
    // const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = bcrypt.genSaltSync(10);
        const secPassword = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });

        const data = {
            user: {
                id: user._id,
            }
        }
        var authToken = jwt.sign(data, secret);

        res.status(201).json({message: "User created successfully!", user, authToken});
    } catch (error) {
        console.log(error);
    }
})

//login
router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min: 5}).withMessage("Password must be at least of 5 characters"),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({message: "Password Not Matched"});
        }

        const data = {
            user: {
                id: user._id,
            },
        };
        var authToken = jwt.sign(data, secret);
        res.status(201).json({ message: "Login Successfull", user, authToken});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }

})

//User details
router.get("/getuser", fetchUser, async(req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})


// Update User
router.put('/updateuser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});


module.exports = router;
