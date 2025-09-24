const express = require("express");
const {
  submitVerification,
  uploadDocuments,
  getVerificationStatus,
} = require("../controllers/verification");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const router = express.Router();

/**
 * @openapi
 * /api/verification:
 *   post:
 *     summary: Submit verification information
 *     tags:
 *       - Verification
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *               surname:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               localGovernment:
 *                 type: string
 *               stateOfResidence:
 *                 type: string
 *               residentialAddress:
 *                 type: string
 *               ninNumber:
 *                 type: string
 *               kinFullName:
 *                 type: string
 *               kinPhoneNumber:
 *                 type: string
 *               kinEmail:
 *                 type: string
 *               kinResidentialAddress:
 *                 type: string
 *               kinRelationship:
 *                 type: string
 *               accountName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               bankName:
 *                 type: string
 *               bvnNumber:
 *                 type: string
 *               accountType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification information submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Verification information submitted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authenticated
 */
router.post("/", protect, submitVerification);

/**
 * @openapi
 * /api/verification/documents:
 *   post:
 *     summary: Upload verification documents
 *     tags:
 *       - Verification
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               identificationDocument:
 *                 type: string
 *                 format: binary
 *                 description: Government-issued ID (PNG, JPG, PDF)
 *               passportPhoto:
 *                 type: string
 *                 format: binary
 *                 description: Recent passport photo (PNG, JPG)
 *               utilityBill:
 *                 type: string
 *                 format: binary
 *                 description: Recent utility bill (PNG, JPG, PDF)
 *     responses:
 *       200:
 *         description: Documents uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Documents uploaded successfully
 *       400:
 *         description: Invalid file type or upload error
 *       401:
 *         description: Not authenticated
 */
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

/**
 * @openapi
 * /api/verification/status:
 *   get:
 *     summary: Get user's verification status
 *     tags:
 *       - Verification
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Verification status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [none, pending, approved, rejected]
 *                     isVerified:
 *                       type: boolean
 *                     rejectionReason:
 *                       type: string
 *                       description: Reason for rejection if status is rejected
 *                     verifiedAt:
 *                       type: string
 *                       description: Timestamp when the user was verified
 *                     reviewedAt:
 *                       type: string
 *                       description: Timestamp when the verification was reviewed
 *       401:
 *         description: Not authenticated
 */
router.get("/status", protect, getVerificationStatus);

module.exports = router;
