const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["investor", "startup", "admin", "none"],
      index: true,
    },

    isVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    // Fields for email verification flow
    emailVerificationCodeHash: { type: String },
    emailVerificationExpires: { type: Date },
    emailVerificationLastSentAt: { type: Date },
    // Fields for password reset flow
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    verification: {
      personal: {
        firstName: String,
        surname: String,
        dateOfBirth: String,
        localGovernment: String,
        stateOfResidence: String,
        residentialAddress: String,
        ninNumber: String,
      },
      nextOfKin: {
        fullName: String,
        phoneNumber: String,
        email: String,
        residentialAddress: String,
        relationship: String,
      },
      bankDetails: {
        accountName: String,
        accountNumber: String,
        bankName: String,
        bvnNumber: String,
        accountType: String,
      },
      documents: {
        idDocument: String,
        passportPhoto: String,
        utilityBill: String,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      // review metadata for admin actions
      rejectionReason: String,
      reviewedAt: Date,
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      submittedAt: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful index for admin filtering by verification status
UserSchema.index({ "verification.status": 1, createdAt: -1 });

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "somesecret", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Helper methods for email verification
UserSchema.methods.setEmailVerificationCode = function (
  ttlMs = 10 * 60 * 1000
) {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const hash = crypto.createHash("sha256").update(code).digest("hex");
  this.emailVerificationCodeHash = hash;
  this.emailVerificationExpires = new Date(Date.now() + ttlMs);
  return code; // return plain code so it can be emailed
};

UserSchema.methods.validateEmailVerificationCode = function (code) {
  if (!this.emailVerificationCodeHash || !this.emailVerificationExpires)
    return false;
  if (this.emailVerificationExpires.getTime() < Date.now()) return false;
  const hash = crypto.createHash("sha256").update(code).digest("hex");
  return hash === this.emailVerificationCodeHash;
};

UserSchema.methods.clearEmailVerificationCode = function () {
  this.emailVerificationCodeHash = undefined;
  this.emailVerificationExpires = undefined;
};

module.exports = mongoose.model("User", UserSchema);
