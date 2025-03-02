const express = require("express");
const { findAll, findByUserId, markAsRead, deleteById } = require("../controllers/NotificationController");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        await findAll(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/user/:userId", async (req, res, next) => {
    try {
        await findByUserId(req, res);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id/mark-as-read", async (req, res, next) => {
    try {
        await markAsRead(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteById(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;