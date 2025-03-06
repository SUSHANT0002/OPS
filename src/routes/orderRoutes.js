const express = require("express");
const { createOrderHandler, getOrderHandler } = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createOrderHandler);
router.get("/:id", authenticateUser, getOrderHandler);

module.exports = router;
