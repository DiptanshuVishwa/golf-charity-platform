const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
name: String,
  email: { type: String, unique: true },
  password: String,

  isSubscribed: { type: Boolean, default: false },
  plan: { type: String, default: "none" },

  scores: [
    {
      value: Number,
      date: Date,
    },
  ],

  charity: {
    name: String,
    percentage: Number,
  },

  winnings: {
    total: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("User", userSchema);