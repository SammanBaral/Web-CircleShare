const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    findAll,
    findById,
    create,
    update,
    deleteById,
    login,
    getMe,
    uploadImage,
} = require("../controllers/UserController");
const { protect } = require("../middleware/auth");

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "D:\\Web CircleShare\\CircleShare-System-Server\\user_images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Public routes
router.post("/create", create);
router.post("/login", login);

// Protected routes
router.get("/", protect, findAll);
router.get("/me", protect, getMe);
router.get("/:id", protect, findById);
router.put("/:id", protect, update);
router.delete("/:id", protect, deleteById);
router.post("/upload", protect, upload.single("file"), uploadImage);

module.exports = router;