const Notification = require("../models/Notification");

const findAll = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findByUserId = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findByUserId,
    markAsRead,
    deleteById,
};