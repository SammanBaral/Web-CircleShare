const express = require("express");
const { findAll, findById, create, getMessagesBetweenUsers, deleteById } = require("../controllers/MessageController");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        await findAll(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        await findById(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        await create(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/between/:userId1/:userId2", async (req, res, next) => {
    try {
        await getMessagesBetweenUsers(req, res);
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