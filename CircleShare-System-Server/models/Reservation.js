const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: [true, "Item is required"],
    },
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Borrower is required"],
    },
    lenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Lender is required"],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
    },
    pickupTime: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending",
    },
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;