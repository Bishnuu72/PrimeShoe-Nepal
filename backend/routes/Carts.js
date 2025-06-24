const express = require("express");
const Cart = require("../model/Cart");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Add product to cart
router.post("/addtocart",fetchUser,
  [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("name").isLength({ min: 3 }).withMessage("Product name should be at least 3 characters"),
    body("qty").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("price").isNumeric().withMessage("Price should be a number"),
    body("instock").isNumeric().withMessage("Instock should be a number"),
    body("color").notEmpty().withMessage("Color is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { productId, name, qty, color, price, instock } = req.body;

        const cart = new Cart({
            productId,
            name,
            qty,
            color,
            price,
            instock,
            user: req.user.id,
      });

        const savedCart = await cart.save();
        res.status(201).json({message: "Product added to the cart", cart: savedCart});
    }   catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
