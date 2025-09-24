const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  getUsers,
  getUser,
  updateUserRole,
  deleteUser,
  verifyUser,
  userVerificationStatus,
} = require("../controllers/admin");

const router = express.Router();

// All routes below require admin
router.use(protect, authorize("admin"));

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: Get all users with filtering, pagination and search
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter by verification status
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term for email, name, phone or verification info
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [investor, startup, admin]
 *                       isVerified:
 *                         type: boolean
 *                       verification:
 *                         type: object
 *                         properties:
 *                           personal:
 *                             type: object
 *                             properties:
 *                               firstName:
 *                                 type: string
 *                               surname:
 *                                 type: string
 *                               dateOfBirth:
 *                                 type: string
 *                               localGovernment:
 *                                 type: string
 *                               stateOfResidence:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               ninNumber:
 *                                 type: string
 *                           nextOfKin:
 *                             type: object
 *                             properties:
 *                               fullName:
 *                                 type: string
 *                               phoneNumber:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               relationship:
 *                                 type: string
 *                           bankDetails:
 *                             type: object
 *                             properties:
 *                               accountName:
 *                                 type: string
 *                               accountNumber:
 *                                 type: string
 *                               bankName:
 *                                 type: string
 *                               bvnNumber:
 *                                 type: string
 *                               accountType:
 *                                 type: string
 *                           documents:
 *                             type: object
 *                             properties:
 *                               idDocument:
 *                                 type: string
 *                               idDocumentUrl:
 *                                 type: string
 *                               passportPhoto:
 *                                 type: string
 *                               passportPhotoUrl:
 *                                 type: string
 *                               utilityBill:
 *                                 type: string
 *                               utilityBillUrl:
 *                                 type: string
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, rejected]
 *                           rejectionReason:
 *                             type: string
 *                           reviewedAt:
 *                             type: string
 *                             format: date-time
 *                           reviewedBy:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       _id:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.get("/users", getUsers);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [investor, startup, admin]
 *                       isVerified:
 *                         type: boolean
 *                       verification:
 *                         type: object
 *                         properties:
 *                           personal:
 *                             type: object
 *                             properties:
 *                               firstName:
 *                                 type: string
 *                               surname:
 *                                 type: string
 *                               dateOfBirth:
 *                                 type: string
 *                               localGovernment:
 *                                 type: string
 *                               stateOfResidence:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               ninNumber:
 *                                 type: string
 *                           nextOfKin:
 *                             type: object
 *                             properties:
 *                               fullName:
 *                                 type: string
 *                               phoneNumber:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               relationship:
 *                                 type: string
 *                           bankDetails:
 *                             type: object
 *                             properties:
 *                               accountName:
 *                                 type: string
 *                               accountNumber:
 *                                 type: string
 *                               bankName:
 *                                 type: string
 *                               bvnNumber:
 *                                 type: string
 *                               accountType:
 *                                 type: string
 *                           documents:
 *                             type: object
 *                             properties:
 *                               idDocument:
 *                                 type: string
 *                               idDocumentUrl:
 *                                 type: string
 *                               passportPhoto:
 *                                 type: string
 *                               passportPhotoUrl:
 *                                 type: string
 *                               utilityBill:
 *                                 type: string
 *                               utilityBillUrl:
 *                                 type: string
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, rejected]
 *                           rejectionReason:
 *                             type: string
 *                           reviewedAt:
 *                             type: string
 *                             format: date-time
 *                           reviewedBy:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       _id:
 *                         type: string
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
// GET /api/admin/users/:id
router.get("/users/:id", getUser);

/**
 * @openapi
 * /api/admin/users/{id}/verification-status:
 *   patch:
 *     summary: Update verification status of a user
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *                 description: New verification status
 *               rejectionReason:
 *                 type: string
 *                 description: Rejection reason (required if status is rejected)
 *     responses:
 *       200:
 *         description: Verification status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [investor, startup, admin]
 *                       isVerified:
 *                         type: boolean
 *                       verification:
 *                         type: object
 *                         properties:
 *                           personal:
 *                             type: object
 *                             properties:
 *                               firstName:
 *                                 type: string
 *                               surname:
 *                                 type: string
 *                               dateOfBirth:
 *                                 type: string
 *                               localGovernment:
 *                                 type: string
 *                               stateOfResidence:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               ninNumber:
 *                                 type: string
 *                           nextOfKin:
 *                             type: object
 *                             properties:
 *                               fullName:
 *                                 type: string
 *                               phoneNumber:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               residentialAddress:
 *                                 type: string
 *                               relationship:
 *                                 type: string
 *                           bankDetails:
 *                             type: object
 *                             properties:
 *                               accountName:
 *                                 type: string
 *                               accountNumber:
 *                                 type: string
 *                               bankName:
 *                                 type: string
 *                               bvnNumber:
 *                                 type: string
 *                               accountType:
 *                                 type: string
 *                           documents:
 *                             type: object
 *                             properties:
 *                               idDocument:
 *                                 type: string
 *                               idDocumentUrl:
 *                                 type: string
 *                               passportPhoto:
 *                                 type: string
 *                               passportPhotoUrl:
 *                                 type: string
 *                               utilityBill:
 *                                 type: string
 *                               utilityBillUrl:
 *                                 type: string
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, rejected]
 *                           rejectionReason:
 *                             type: string
 *                           reviewedAt:
 *                             type: string
 *                           reviewedBy:
 *                             type: string
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
// PATCH /api/admin/users/:id/verification-status
// body: { status: "approved" | "rejected", rejectionReason?: string }
router.patch("/users/:id/verification-status", verifyUser);

/**
 * @openapi
 * /api/admin/users/{id}/verification-status:
 *   get:
 *     summary: Get verification status of a user
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *                       format: date-time
 *                       description: Timestamp when the user was verified
 *                     reviewedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the verification was reviewed
 *                     reviewedBy:
 *                       type: string
 *                       description: ID of the admin who reviewed the verification
 *                     submittedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the verification was submitted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
router.get("/users/:id/verification-status", userVerificationStatus);

/**
 * @openapi
 * /api/admin/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, investor, startup]
 *                 description: New role for the user
 *     responses:
 *       200:
 *         description: User role updated successfully
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
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *                     phone:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     _id:
 *                       type: string
 *       400:
 *         description: Invalid role
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
// PATCH /api/admin/users/:id/role
router.patch("/users/:id/role", updateUserRole);

/**
 * @openapi
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
// DELETE /api/admin/users/:id
router.delete("/users/:id", deleteUser);

module.exports = router;
