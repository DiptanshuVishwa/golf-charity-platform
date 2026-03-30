const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const scoreRoutes = require("./routes/scoreRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const charityRoutes = require("./routes/charityRoutes");
const drawRoutes = require("./routes/drawRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();
connectDB();

// middleware
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/admin", adminRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});