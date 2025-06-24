const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    productId: {type: String, required: true },
    name: {type: String, required: true},
    price: {type: Number, required: true},
    instock: {type: Number, required: true},
    qty : {type: Number, required: true},
    color: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;