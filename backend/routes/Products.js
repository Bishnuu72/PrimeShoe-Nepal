const express = require("express");
const Product = require("../model/Product");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();


//get product
router.get("/allproduct", fetchUser, async(req, res) => {
    try {
        const products = await Product.find({user: req.user.id});
        res.json(products);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.get("/allhomeproduct", fetchUser, async(req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
})

//add product
router.post("/addproduct", fetchUser,
    body("name").isLength({min:3}).withMessage("Product name should be atleast of 3 characters"),
    body("description").isLength({min:10}).withMessage("Description should be at least of 10 characters"),
    body("price").isNumeric().withMessage("Price should be a number"),
    body("instock").isNumeric().withMessage("Instock should be a number"),
     async(req, res) => {
    try {
        const { name, description, price, instock } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const product = new Product({name, price, description, instock, user: req.user.id});
        const saveProduct = await product.save();
        res.status(201).json({saveProduct});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error    "});
    }
})

module.exports = router;
