const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const verificationRoutes = require("./routes/verification");
const path = require("path");

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/finance-teque")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/verification", verificationRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../..", "dist")));

// Instead of using a wildcard, let's use a specific route for the SPA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "dist", "index.html"));
});

// Handle other routes for SPA
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "../..", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
