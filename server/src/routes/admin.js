const express = require("express");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

function toAbsolute(req, webPath) {
  if (!webPath) return null;
  if (/^https?:\/\//i.test(webPath)) return webPath;
  const base = `${req.protocol}://${req.get("host")}`;
  return `${base}${webPath.startsWith("/") ? "" : "/"}${webPath}`;
}

function mapUserForAdmin(req, u) {
  if (!u) return u;
  const obj = JSON.parse(JSON.stringify(u));
  const docs = (obj.verification && obj.verification.documents) || {};
  obj.verification = obj.verification || {};
  obj.verification.documents = {
    idDocument: docs.idDocument,
    idDocumentUrl: toAbsolute(req, docs.idDocument),
    passportPhoto: docs.passportPhoto,
    passportPhotoUrl: toAbsolute(req, docs.passportPhoto),
    utilityBill: docs.utilityBill,
    utilityBillUrl: toAbsolute(req, docs.utilityBill),
  };
  return obj;
}

// All routes below require admin
router.use(protect, authorize("admin"));

// GET /api/admin/users?status=pending&q=search&page=1&limit=20
router.get("/users", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const status = (req.query.status || "").trim();
    const q = (req.query.q || "").trim();

    const filter = {};
    if (status) filter["verification.status"] = status;
    if (q) {
      const rx = new RegExp(q, "i");
      filter.$or = [
        { email: rx },
        { name: rx },
        { phone: rx },
        { "verification.personal.firstName": rx },
        { "verification.personal.surname": rx },
        { "verification.nextOfKin.fullName": rx },
      ];
    }

    const [items, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-password")
        .lean(),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items.map((u) => mapUserForAdmin(req, u)),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/admin/users/:id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: mapUserForAdmin(req, user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PATCH /api/admin/users/:id/verification-status
// body: { status: "approved" | "rejected", reason?: string }
router.patch("/users/:id/verification-status", async (req, res) => {
  try {
    const { status, reason } = req.body || {};
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const update = {
      "verification.status": status,
      isVerified: status === "approved",
      "verification.rejectionReason": status === "rejected" ? (reason || "") : undefined,
      "verification.reviewedAt": new Date(),
      "verification.reviewedBy": req.user._id,
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .select("-password")
      .lean();

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: mapUserForAdmin(req, user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
