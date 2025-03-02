const Reservation = require("../models/Reservation");

const findAll = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    updateStatus,
    deleteById,
};