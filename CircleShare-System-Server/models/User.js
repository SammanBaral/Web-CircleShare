const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number"],
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false, // Exclude password from queries unless explicitly selected
    },
    profilePictureUrl: {
        type: String,
        default: null,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },// Assuming new users are not admins
    averageRating: {
        type: Number,
        default: 0,
    },
});

// 🔹 Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔹 Compare entered password with stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Generate JWT token
UserSchema.methods.getSignedJwtToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "30d", // Default to 30 days if not set
    });
};

module.exports = mongoose.model("User", UserSchema);
