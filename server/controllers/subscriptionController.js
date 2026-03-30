const User = require("../models/User");

// SUBSCRIBE
exports.subscribeUser = async (req, res) => {
  const { plan } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    user.isSubscribed = true;
    user.plan = plan;

    await user.save();

    res.json({
      message: "Subscription activated",
      plan: user.plan,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SUBSCRIPTION
exports.getSubscription = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    isSubscribed: user.isSubscribed,
    plan: user.plan,
  });
};