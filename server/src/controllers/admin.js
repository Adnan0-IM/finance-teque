const User = require("../models/User");

function toAbsolute(req, webPath) {
  if (!webPath) return null;
  if (/^https?:\/\//i.test(webPath)) return webPath;
  const base = `${req.protocol}://${req.get("host")}`;
  // Normalize any number of leading slashes down to one
  const normalized = `/${String(webPath)}`.replace(/^\/+/, "/");
  return `${base}${normalized}`;
}

function mapUserForAdmin(req, u) {
  if (!u) return u;
  const obj = JSON.parse(JSON.stringify(u));
  const docs = (obj.verification && obj.verification.documents) || {};
  const norm = (p) => (p ? String(p).replace(/^\/+/, "/") : p);
  obj.verification = obj.verification || {};
  obj.verification.documents = {
    idDocument: norm(docs.idDocument),
    idDocumentUrl: toAbsolute(req, docs.idDocument),
    passportPhoto: norm(docs.passportPhoto),
    passportPhotoUrl: toAbsolute(req, docs.passportPhoto),
    utilityBill: norm(docs.utilityBill),
    utilityBillUrl: toAbsolute(req, docs.utilityBill),
  };
  return obj;
}

exports.getUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "20", 10), 1),
      100
    );
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while getting users",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: mapUserForAdmin(req, user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while getting user",
      error: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const allowed = ["investor", "startup", "admin", "none"];
    if (!allowed.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role supplied" });
    }

    // Prevent an admin from demoting themselves
    if (
      req.user &&
      String(req.user._id) === String(req.params.id) &&
      role !== "admin"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Admins cannot demote themselves" });
    }

    // Prevent removing role from the last remaining admin
    if (role !== "admin") {
      const target = await User.findById(req.params.id).select("role");
      if (!target) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      if (target.role === "admin") {
        const adminCount = await User.countDocuments({ role: "admin" });
        if (adminCount <= 1) {
          return res.status(400).json({
            success: false,
            message: "Cannot remove role from the last admin",
          });
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("name email role isVerified phone createdAt");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("updateUserRole error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body || {};

    // Validate the request
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'rejected'",
      });
    }

    if (status === "rejected" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required when status is 'rejected'",
      });
    }

    // Verify user exists before updating
    const userExists = await User.findById(req.params.id);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create update object
    const update = {
      "verification.status": status,
      isVerified: status === "approved",
      "verification.rejectionReason":
        status === "rejected" ? rejectionReason : undefined,
      "verification.reviewedAt": new Date(),
    };

    // Only add reviewedBy if req.user exists and has an _id
    if (req.user && req.user._id) {
      update["verification.reviewedBy"] = req.user._id;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found after update",
      });
    }

    res.json({ success: true, data: mapUserForAdmin(req, user) });
  } catch (error) {
    console.error("Error updating verification status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating verification status",
      error: error.message,
    });
  }
};

exports.userVerificationStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: user.verification?.status || "none",
        isVerified: user.isVerified || false,
        rejectionReason: user.verification?.rejectionReason || "",
      },
    });
  } catch (error) {
    console.error("Get verification status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error retrieving verification status",
      error: error.message,
    });
  }
};
