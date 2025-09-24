const User = require("../models/User");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../services/mail");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    // Generate a 6-digit code and send verification email
    const code = user.setEmailVerificationCode();
    await user.save({ validateBeforeSave: false });
    try {
      await sendVerificationEmail(user.email, code);
    } catch (e) {
      console.error("Send verification email failed:", e);
      // Optionally you may delete user if email fails or allow resend later
    }
    res.status(201).json({
      success: true,
      message:
        "Registration successful. A verification code was sent to your email.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        emailVerified: user.emailVerified,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email and password",
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Block login until email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// @desc    Verify email with 6-digit code
// @route   POST /api/auth/verify-email
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Email and code are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or code" });
    }

    if (user.emailVerified) {
      return res
        .status(200)
        .json({ success: true, message: "Email already verified" });
    }

    const ok = user.validateEmailVerificationCode(code);
    if (!ok) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    user.emailVerified = true;
    user.clearEmailVerificationCode();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Email verified successfully, you can now login to your account",
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({
      success: false,
      message: "Server error verifying email",
      error: error.message,
    });
  }
};

// @desc    Resend verification code
// @route   POST /api/auth/resend-code
// @access  Public
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const cooldownMs = Number(process.env.EMAIL_RESEND_COOLDOWN_MS || 60_000);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Avoid user enumeration
      return res.status(200).json({
        success: true,
        message: "If the email exists, a code was sent",
      });
    }

    if (user.emailVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email already verified" });
    }

    const last = user.emailVerificationLastSentAt?.getTime?.() || 0;
    const elapsed = Date.now() - last;
    if (last && elapsed < cooldownMs) {
      const wait = Math.ceil((cooldownMs - elapsed) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${
          wait > 0 ? wait : 1
        }s before requesting another code`,
      });
    }

    const code = user.setEmailVerificationCode();
    user.emailVerificationLastSentAt = new Date();
    await user.save({ validateBeforeSave: false });

    try {
      await sendVerificationEmail(user.email, code);
    } catch (e) {
      console.error("Send verification email failed:", e);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send verification email" });
    }

    res.status(200).json({ success: true, message: "Verification code sent" });
  } catch (error) {
    console.error("Resend code error:", error);
    res.status(500).json({
      success: false,
      message: "Server error resending code",
      error: error.message,
    });
  }
};

// @desc PUT set Current logged i user role
// @route PUT /api/auth/role
// @access Private
exports.setRole = async (req, res) => {
  // allowed roles ["investor", "startup"]
  // user is already available in req due to the auth middleware
  const { role } = req.body;
  if (role !== "investor" && role !== "startup")
    return res.status(403).json({
      success: false,
      message: "investor and startup are the only accepted roles",
    });
  try {
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      data: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
        phone: user?.phone,
      },
    });
  } catch (error) {
    console.error("Set role error:", error);
    res.status(500).json({
      success: false,
      message: "Server error setting user role",
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // user is already available in req due to the auth middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
        phone: user?.phone,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error retrieving user profile",
      error: error.message,
    });
  }
};

// @desc    Update current logged in user
// @route   PUT /api/auth/updateMe
// @access  Private
exports.updateMe = async (req, res) => {
  try {
    // Only allow certain fields to be updated
    const allowedUpdates = ["name", "phone"];
    const payload = req.body?.data ?? req.body ?? {};
    const updates = {};
    for (const key of allowedUpdates) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        updates[key] = payload[key];
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
        phone: user?.phone,
      },
    });
  } catch (error) {
    console.error("Update me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating user profile",
      error: error.message,
    });
  }
};

// @desc    Delete current logged in user
// @route   DELETE /api/auth/delete
// @access  Private
exports.deleteMe = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    // Clear auth cookie
    const options = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.cookie("token", "none", options);

    res.status(200).json({
      success: true,
      data: {},
      message: "Successfully deleted account",
    });
  } catch (error) {
    console.error("Delete me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting account",
      error: error.message,
    });
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  res.cookie("token", "none", options);

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    // Avoid user enumeration
    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link was sent",
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  // Send email
  try {
    await sendResetPasswordEmail(user.email, resetToken);
    res
      .status(200)
      .json({ success: true, message: "Reset link sent to email" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      success: false,
      message: "Failed to send reset email",
      error: err.message,
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Token and password are required" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ success: true, message: "Password reset successful" });
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Parse cookie expiration time
  let cookieExpire = process.env.JWT_COOKIE_EXPIRE || "7d"; // Default to 7 days
  let expireMs = 7 * 24 * 60 * 60 * 1000; // Default: 7 days in milliseconds

  if (typeof cookieExpire === "string") {
    // Parse time format like "7d" or "1h"
    const match = cookieExpire.match(/^(\d+)([dhms])$/);
    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2];

      switch (unit) {
        case "d": // days
          expireMs = value * 24 * 60 * 60 * 1000;
          break;
        case "h": // hours
          expireMs = value * 60 * 60 * 1000;
          break;
        case "m": // minutes
          expireMs = value * 60 * 1000;
          break;
        case "s": // seconds
          expireMs = value * 1000;
          break;
      }
    }
  }

  const options = {
    expires: new Date(Date.now() + expireMs),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  // Log token in development
  if (process.env.NODE_ENV !== "production") {
    console.log("Generated token:", token);
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        phone: user.phone,
      },
    });
};
