const express = require("express");
const {
  submitVerification,
  uploadDocuments,
  getVerificationStatus,
} = require("../controllers/verification");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.post("/", protect, submitVerification);

// Use multer for files
router.post(
  "/documents",
  protect,
  upload.fields([
    { name: "identificationDocument", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "utilityBill", maxCount: 1 },
  ]),
  uploadDocuments
);

router.get("/status", protect, getVerificationStatus);

module.exports = router;
