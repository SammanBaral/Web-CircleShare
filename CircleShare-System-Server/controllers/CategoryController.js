const Category = require("../models/Category");

const findAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, error: "Category not found" });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ success: false, error: "Category not found" });
        }
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, error: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
};