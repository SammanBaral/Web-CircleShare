const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// @desc    Get all users
exports.findAll = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single user
exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Register user
exports.create = async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) return res.status(400).json({ success: false, error: "User already exists" });

        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update user
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).select("-password");
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete user (with image cleanup)
exports.deleteById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        // Delete profile image if exists
        if (user.profilePictureUrl) {
            const imagePath = path.join(__dirname, "..", "user_images", user.profilePictureUrl);
            fs.unlink(imagePath, (err) => {
                if (err) console.log("Failed to delete image:", err);
            });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, error: "Provide username/password" });

        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get current user
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Upload profile image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
        res.status(200).json({ success: true, data: req.file.filename });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Helper: Send JWT token
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token });
};