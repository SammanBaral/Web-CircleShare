const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    message: {
        type: String,
        required: [true, "Notification message is required"],
    },
    type: {
        type: String,
        enum: ["reservation", "payment", "system"],
        required: [true, "Type is required"],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;