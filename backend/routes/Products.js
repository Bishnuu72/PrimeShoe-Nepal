const express = require("express");
const Product = require("../model/Product");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const { route } = require("./Carts");   
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
        console.log("this from frontend", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let image = req.files.map((el) => {
            return el.filename;
        })
        const product = new Product({name, price, image, description, instock, user: req.user.id});
        const saveProduct = await product.save();
        res.status(201).json({saveProduct});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
})

//update product
router.put("/updateproduct/:id", fetchUser, async(req, res) => {
    const {name, description, price, instock} = req.body;
    try {
        const newProduct = {}
        if(name) newProduct.name = name
        if(description) newProduct.description = description
        if(price) newProduct.price = price
        if(instock) newProduct.instock = instock

        let product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: "Product Not Found!"})
            if(!product.user || product.user.toString() !== req.user.id){
                return res.status(401).json({error: "Unauthorized access"})
            }
            product = await Product.findByIdAndUpdate(req.params.id, {$set: newProduct}, {new:true})
            res.status(200).json({product});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "internal server error"})
    }
})

//delete product
router.delete("/deleteproduct/:id", fetchUser, async(req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error: "Product Not Found!"})
            if(!product.user || product.user.toString() !== req.user.id) {
                return res.status(401).json({error: "Unauthorized access"})
            }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Product deleted"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "internal server error"});
    }
});



module.exports = router;
