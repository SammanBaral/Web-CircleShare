const Review = require("../models/Review");

const findAll = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
};