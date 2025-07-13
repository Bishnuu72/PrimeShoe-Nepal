const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String }, // Base64 format
    country: { type: String },
    dob: { type: String },
    phone: { type: String },
    state: {type: String},
    date: { type: Date, default: Date.now}
})

const user = mongoose.model("user", userSchema);

module.exports = user;
