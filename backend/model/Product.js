const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    instock: {type: Number, required: true},
    image: {type:[String], required: false},
    date: {type: Date, default: Date.now},
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;