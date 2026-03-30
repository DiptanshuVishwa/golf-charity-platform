const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getCharities, selectCharity } = require("../controllers/charityController");

router.get("/", protect, getCharities);
router.post("/select", protect, selectCharity);

module.exports = router;