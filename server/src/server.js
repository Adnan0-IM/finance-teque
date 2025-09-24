const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const verificationRoutes = require("./routes/verification");
const adminRoutes = require("./routes/admin");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerSpec = require("./swagger");
const { ensureAdminUser } = require("./utils/admin");

// Load env vars
dotenv.config();
// Load env vars (force the ../.env path so it works on aaPanel/PM2)
dotenv.config({ path: path.join(__dirname, "../.env") });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/finance-teque")
  .then(async () => {
    console.log("MongoDB Connected");
    // Seed an admin if configured
    await ensureAdminUser();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Setup Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// Enable CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://financetequecv.com"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Skip-Auth-Retry"],
  })
);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/verification", verificationRoutes);

// Mount admin routes
app.use("/api/admin", adminRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../", "dist")));

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    fallthrough: true,
    maxAge: "7d",
  })
);

// Instead of using a wildcard, let's use a specific route for the SPA
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../", "dist", "index.html"));
});

// Handle other routes for SPA
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "../", "dist", "index.html"));
});

// Multer/global error handler
app.use((err, req, res, next) => {
  if (
    err &&
    (err.name === "MulterError" || err.message?.startsWith("Invalid file type"))
  ) {
    return res.status(400).json({
      success: false,
      message: err.message || "Upload error",
    });
  }
  if (err) {
    console.error("Unhandled error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
  next();
});

app.get("/api/healthz", (_, res) => {
  res.send({ status: "ok", timeStamp: Date.now() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
