const express = require("express");
const {
  register,
  login,
  getMe,
  updateMe,
  logout,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  setRole,
  deleteMe,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-code", resendVerificationCode);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updateMe", protect, updateMe);
router.put("/setRole", protect, setRole);
router.delete("/deleteMe", protect,deleteMe);
router.get("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
