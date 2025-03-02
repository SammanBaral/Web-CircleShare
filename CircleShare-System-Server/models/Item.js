const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    description: String,
    availabilityStatus: {
        type: String,
        enum: ["available", "unavailable", "reserved"],
        default: "available",
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: [true, "Location is required"],
    },
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required"],
    },
    rulesNotes: String,
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    condition: {
        type: String,
        enum: ["new", "used", "good", "fair"],
    },
    maxBorrowDuration: Number, // In days
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;