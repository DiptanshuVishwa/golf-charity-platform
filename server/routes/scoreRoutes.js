const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addScore, getScores } = require("../controllers/scoreController");

router.post("/add", protect, addScore);
router.get("/", protect, getScores);

module.exports = router;