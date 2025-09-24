const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  // Prefer cookie token first to avoid stale Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Fallback: Get token from header
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "somesecret");

    // Get user from the token
    req.user = await User.findById(decoded.id);

    // Sliding session: re-issue a fresh token on successful auth
    if (req.user && typeof req.user.getSignedJwtToken === "function") {
      const newToken = req.user.getSignedJwtToken();

      // Parse cookie expiration time like "7d", "1h", "30m", "60s"
      let cookieExpire = process.env.JWT_COOKIE_EXPIRE || "7d"; // default
      let expireMs = 7 * 24 * 60 * 60 * 1000;
      if (typeof cookieExpire === "string") {
        const match = cookieExpire.match(/^(\d+)([dhms])$/);
        if (match) {
          const value = parseInt(match[1], 10);
          const unit = match[2];
          switch (unit) {
            case "d":
              expireMs = value * 24 * 60 * 60 * 1000;
              break;
            case "h":
              expireMs = value * 60 * 60 * 1000;
              break;
            case "m":
              expireMs = value * 60 * 1000;
              break;
            case "s":
              expireMs = value * 1000;
              break;
            default:
              break;
          }
        }
      }

      res.cookie("token", newToken, {
        expires: new Date(Date.now() + expireMs),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
