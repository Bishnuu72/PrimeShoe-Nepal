const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String }, // Base64 format
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now}
})

const user = mongoose.model("user", userSchema);

module.exports = user;
