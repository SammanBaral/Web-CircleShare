const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
        required: [true, "Reservation is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"],
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "debit_card", "wallet", "cash"],
        required: [true, "Payment method is required"],
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;