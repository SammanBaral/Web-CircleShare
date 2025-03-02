const Refund = require("../models/Refund");

const findAll = async (req, res) => {
    try {
        const refunds = await Refund.find();
        res.status(200).json(refunds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const refund = await Refund.findById(req.params.id);
        if (!refund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.status(200).json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newRefund = new Refund(req.body);
        await newRefund.save();
        res.status(201).json(newRefund);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedRefund = await Refund.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedRefund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.status(200).json(updatedRefund);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedRefund = await Refund.findByIdAndDelete(req.params.id);
        if (!deletedRefund) {
            return res.status(404).json({ error: "Refund not found" });
        }
        res.status(200).json({ message: "Refund deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    updateStatus,
    deleteById,
};