const Item = require("../models/Item");

const ownerMiddleware = (model) => async (req, res, next) => {
    try {
        const item = await model.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "User not authorized to access this resource" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = ownerMiddleware;