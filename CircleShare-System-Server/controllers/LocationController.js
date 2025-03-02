const Location = require("../models/Location");

const findAll = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newLocation = new Location(req.body);
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
};