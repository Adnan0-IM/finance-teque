const User = require("../models/User");
const path = require("path");

// @desc    Submit investor verification data
// @route   POST /api/verification
// @access  Private
exports.submitVerification = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      phoneNumber,
      dateOfBirth,
      localGovernment,
      stateOfResidence,
      residentialAddress,
      ninNumber,
      kinFullName,
      kinPhoneNumber,
      kinEmail,
      kinResidentialAddress,
      kinRelationship,
      accountName,
      accountNumber,
      bankName,
      bvnNumber,
      accountType,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update nested paths without replacing the whole object
    user.set({
      "verification.personal": {
        firstName,
        surname,
        phoneNumber,
        dateOfBirth,
        localGovernment,
        stateOfResidence,
        residentialAddress,
        ninNumber,
      },
      "verification.nextOfKin": {
        fullName: kinFullName,
        phoneNumber: kinPhoneNumber,
        email: kinEmail,
        residentialAddress: kinResidentialAddress,
        relationship: kinRelationship,
      },
      "verification.bankDetails": {
        accountName,
        accountNumber,
        bankName,
        bvnNumber,
        accountType,
      },
      "verification.status": "pending",
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Verification information submitted successfully",
      data: user.verification,
    });
  } catch (error) {
    console.error("Verification submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during verification submission",
      error: error.message,
    });
  }
};

// Helper: convert multer's saved absolute path to web path under /uploads
function toWebPath(absPath) {
  if (!absPath) return absPath;
  const marker = `${path.sep}uploads${path.sep}`;
  const idx = absPath.lastIndexOf(marker);
  if (idx >= 0) {
    // Normalize to a single leading slash web path: /uploads/...
    const rel = absPath.slice(idx).split(path.sep).join("/");
    return rel.startsWith("/") ? rel : `/${rel}`;
  }
  // Fallback: ensure single leading slash
  const web = absPath.split(path.sep).join("/");
  return web.startsWith("/") ? web : `/${web}`;
}

// @desc    Upload verification documents
// @route   POST /api/verification/documents
// @access  Private
exports.uploadDocuments = async (req, res) => {
  try {
    const idDocumentPath = req.files?.identificationDocument?.[0]?.path;
    const passportPhotoPath = req.files?.passportPhoto?.[0]?.path;
    const utilityBillPath = req.files?.utilityBill?.[0]?.path;

    if (!idDocumentPath || !passportPhotoPath || !utilityBillPath) {
      return res.status(400).json({
        success: false,
        message: "All required documents must be uploaded",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Save web-facing paths for frontend/admin consumption
    const idWeb = toWebPath(idDocumentPath);
    const ppWeb = toWebPath(passportPhotoPath);
    const ubWeb = toWebPath(utilityBillPath);

    user.set({
      "verification.documents.idDocument": idWeb,
      "verification.documents.passportPhoto": ppWeb,
      "verification.documents.utilityBill": ubWeb,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Documents uploaded successfully",
      data: user.verification.documents,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during document upload",
      error: error.message,
    });
  }
};

// @desc    Get verification status
// @route   GET /api/verification/status
// @access  Private
exports.getVerificationStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: user.verification.status,
        isVerified: user.isVerified,
        reviewedAt: user?.verification?.reviewedAt,
        submittedAt: user?.verification?.submittedAt,
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
