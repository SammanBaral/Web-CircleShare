const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure the uploads folder exists
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // Save files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Initialize multer with storage settings
const upload = multer({ storage }).single("imageFile");

// 📌 API Route: Handle Image Upload
router.post("/upload", upload.single("imageFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const imageUrl = `http://localhost:3000/api/upload/${req.file.filename}`; // Change to match your API domain

    res.json({ success: true, imageUrl });
});

module.exports = router;
