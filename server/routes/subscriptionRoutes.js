const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { subscribeUser, getSubscription } = require("../controllers/subscriptionController");

router.post("/subscribe", protect, subscribeUser);
router.get("/", protect, getSubscription);

module.exports = router;