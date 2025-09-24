const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

/**
 * Rate limiting for login attempts
 * Limits to 5 attempts per 15 minutes per IP address
 * Resets after 15 minutes and doesn't count successful logins
 */
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
  skipSuccessfulRequests: true, // Don't count successful logins against the limit
});

/**
 * Progressive request slowing for login attempts
 * Adds a delay to responses after 3 failed attempts
 * Delay increases with each subsequent attempt
 */
exports.loginSlowDown = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 3, // start slowing down after 3 requests
  delayMs: (hits) => hits * 500, // add 500ms delay per hit, 1.5s after 3 failures, 2s after 4, etc.
});

/**
 * General API rate limiter
 * Applies to all API routes to prevent abuse
 */
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});
