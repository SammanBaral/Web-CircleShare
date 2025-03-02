const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Reviewer is required"],
    },
    revieweeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Reviewee is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
    comment: String,
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;