const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        required: [true, "Transaction is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"],
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Refund = mongoose.model("Refund", refundSchema);
module.exports = Refund;
