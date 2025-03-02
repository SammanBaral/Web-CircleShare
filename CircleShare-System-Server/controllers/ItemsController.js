const Item = require("../models/Item");
const { validationResult } = require("express-validator");

const findAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const items = await Item.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json(items); // ✅ Send only the array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const findById = async (req, res) => {
    console.log("Received ID:", req.params.id); // Log the ID being passed in the URL
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    const errors = validationResult(req);
    try {
        // If an image was uploaded, set the imageUrl
        if (req.file) {
            req.body.imageUrl = `/uploads/items/${req.file.filename}`;
        }

        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
};
