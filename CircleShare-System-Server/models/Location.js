const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    neighborhood: {
        type: String,
        required: [true, "Neighborhood is required"],
    },
    radius: {
        type: Number,
        required: [true, "Radius is required"],
        min: [1, "Radius must be at least 1km"],
    },
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;