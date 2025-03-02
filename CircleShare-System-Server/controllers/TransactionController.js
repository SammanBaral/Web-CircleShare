const Transaction = require("../models/Transaction");

const findAll = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
};