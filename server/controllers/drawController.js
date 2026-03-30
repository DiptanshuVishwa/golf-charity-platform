const User = require("../models/User");

let lastDraw = [];

// GENERATE RANDOM 5 NUMBERS
const generateDraw = () => {
  const numbers = new Set();

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(numbers);
};

// RUN DRAW
exports.runDraw = async (req, res) => {
  try {
    const drawNumbers = generateDraw();
    lastDraw = drawNumbers;

    const users = await User.find();

    let results = [];

    users.forEach((user) => {
      const userScores = user.scores.map((s) => s.value);

      let matches = userScores.filter((num) =>
        drawNumbers.includes(num)
      ).length;

      if (matches >= 3) {
        results.push({
          user: user.email,
          matches,
        });
      }
    });

    res.json({
      drawNumbers,
      results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET LAST RESULTS
exports.getResults = (req, res) => {
  res.json({
    lastDraw,
  });
};