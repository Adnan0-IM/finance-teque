const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      enum: ["investor", "startup", "admin"],
      default: "investor",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
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

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

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

module.exports = mongoose.model("User", UserSchema);
