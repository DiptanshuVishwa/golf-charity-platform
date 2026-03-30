const User = require("../models/User");

// Dummy charity list (MVP)
const charities = [
  { name: "Helping Hands Foundation" },
  { name: "Green Earth Initiative" },
  { name: "Child Education Fund" },
];

// GET CHARITIES
exports.getCharities = async (req, res) => {
  res.json(charities);
};

// SELECT CHARITY
exports.selectCharity = async (req, res) => {
  const { name, percentage } = req.body;

  try {
    if (percentage < 10) {
      return res.status(400).json({ message: "Minimum 10% required" });
    }

    const user = await User.findById(req.user._id);

    user.charity = {
      name,
      percentage,
    };

    await user.save();

    res.json({
      message: "Charity selected",
      charity: user.charity,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};