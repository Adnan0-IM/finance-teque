const express = require("express");
const {
  submitVerification,
  uploadDocuments,
  getVerificationStatus,
} = require("../controllers/verification");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, submitVerification);
router.post("/documents", protect, uploadDocuments);
router.get("/status", protect, getVerificationStatus);

module.exports = router;
