const multer = require("multer");
const path = require("path");
const fs = require("fs");

// uploads root: server/src/uploads/verification
const uploadRoot = path.join(__dirname, "..", "uploads", "verification");
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadRoot),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9-_]/gi, "_")
      .slice(0, 50);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const userPrefix = req.user && req.user.id ? `${req.user.id}_` : "";
    cb(null, `${userPrefix}${base}_${unique}${ext}`);
  },
});

const allowed = new Set(["image/jpeg", "image/png", "application/pdf"]);
const fileFilter = (_, file, cb) => {
  if (allowed.has(file.mimetype)) return cb(null, true);
  return cb(new Error("Invalid file type. Allowed: PDF, JPG, PNG"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 3,
  },
});

module.exports = { upload };
