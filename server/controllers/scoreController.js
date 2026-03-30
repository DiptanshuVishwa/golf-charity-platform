const User = require("../models/User");

// ADD SCORE
exports.addScore = async (req, res) => {
  const { value } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (value < 1 || value > 45) {
      return res.status(400).json({ message: "Score must be between 1–45" });
    }

    const newScore = {
      value,
      date: new Date(),
    };

    // Add new score at beginning
    user.scores.unshift(newScore);

    // Keep only latest 5
    if (user.scores.length > 5) {
      user.scores.pop();
    }

    await user.save();

    res.json(user.scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SCORES
exports.getScores = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.scores);
};