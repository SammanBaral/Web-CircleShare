const express = require("express");
const connectDB = require("./config/db");
const UserRouter = require("./routes/userRoute.js");
const ItemsRouter = require("./routes/ItemsRoute.js"); // Import ItemsRoute
const CategoryRouter = require("./routes/CategoryRoute.js"); // Import CategoryRoute
const cors = require("cors"); // Import CORS
const path = require("path");
const multer = require("multer"); // Import multer

const app = express();
connectDB();

const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Loaded .env successfully:", result.parsed);
}

// Enable CORS
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json()); // Ensure the request body is parsed as JSON

// Use Routes
app.use("/api/user", UserRouter);
app.use("/api/items", ItemsRouter);
app.use("/api/categories", CategoryRouter); // Use CategoryRouter

// Serve static files (Ensure folder exists)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage }); // Initialize multer

// File upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ success: true, imageUrl: `/uploads/${req.file.filename}` });
});

app.use("/api/items/uploads/item", express.static("uploads/item"));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});