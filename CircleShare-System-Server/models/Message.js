const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender is required"],
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Receiver is required"],
    },
    message: {
        type: String,
        required: [true, "Message content is required"],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    // Optional: Link messages to a reservation for context (e.g., enquiring about an item)
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;