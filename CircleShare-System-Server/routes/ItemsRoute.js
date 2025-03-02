const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");
const { findAll, findById, create, update, deleteById } = require("../controllers/ItemsController");
const router = express.Router();


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all items
router.get("/", findAll);


// GET item by ID
router.get("/:id", async (req, res, next) => {
    try {
        await findById(req, res); // Find item by ID
    } catch (error) {
        next(error);
    }
});

// POST create a new item
router.post(
    "/create",
    upload.single("imageFile"), // Middleware to handle file upload
    check("name").notEmpty().withMessage("Item name is required"),
    async (req, res, next) => {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);
        try {
            await create(req, res);
        } catch (error) {
            next(error);
        }
    }
);

// PUT update item by ID
router.put(
    "/:id",
    upload.single("imageFile"), // Middleware to handle file upload
    check("name").optional().notEmpty().withMessage("Item name is required"),
    check("categoryId").optional().notEmpty().withMessage("Category is required"),
    check("locationId").optional().notEmpty().withMessage("Location is required"),
    check("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    async (req, res, next) => {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);
        try {
            await update(req, res);
        } catch (error) {
            next(error);
        }
    }
);

// DELETE item by ID
router.delete("/:id", async (req, res, next) => {
    try {
        await deleteById(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;