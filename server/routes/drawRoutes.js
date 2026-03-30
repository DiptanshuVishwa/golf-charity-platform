const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { runDraw, getResults } = require("../controllers/drawController");
const admin = require("../middleware/adminMiddleware");

// Only admin should run draw (we'll simplify for now)
router.post("/run", protect, admin, runDraw);
router.get("/results", protect, getResults);

module.exports = router;