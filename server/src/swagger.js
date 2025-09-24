const swaggerJsdoc = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const path = require("path");

// Import your mongoose models (adjust paths)
let schemas = {};
try {
  const User = require("./models/User"); // adjust if different
  schemas.User = m2s(User, { omitFields: ["password", "__v"] });

  // Enhance User schema with descriptions
  schemas.User.properties = schemas.User.properties || {};
  schemas.User.description = "User account information";

  // Add descriptions to User properties
  if (schemas.User.properties.name) {
    schemas.User.properties.name.description = "User's full name";
  }
  if (schemas.User.properties.email) {
    schemas.User.properties.email.description =
      "User's email address (must be unique)";
  }
  if (schemas.User.properties.phone) {
    schemas.User.properties.phone.description = "User's phone number";
  }
  if (schemas.User.properties.role) {
    schemas.User.properties.role.description = "User's role in the system";
  }
  if (schemas.User.properties.isVerified) {
    schemas.User.properties.isVerified.description =
      "Whether the user has completed the verification process";
  }
  if (schemas.User.properties.emailVerified) {
    schemas.User.properties.emailVerified.description =
      "Whether the user's email has been verified";
  }
  if (schemas.User.properties.verification) {
    schemas.User.properties.verification.description =
      "User's verification information and status";
  }

  // Add verification status schema
  schemas.VerificationStatus = {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["none", "pending", "approved", "rejected"],
        description: "Current verification status",
      },
      isVerified: {
        type: "boolean",
        description: "Whether the user is verified",
      },
      rejectionReason: {
        type: "string",
        description: "Reason for rejection if status is rejected",
      },
      verifiedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the user was verified",
      },
      reviewedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the verification was reviewed",
      },
      reviewedBy: {
        type: "string",
        description: "ID of the admin who reviewed the verification",
      },
    },
  };

  // Add login response schema
  schemas.LoginResponse = {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      token: { type: "string", description: "JWT authentication token" },
      user: { type: "object", properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          isVerified: { type: "boolean" },
          phone: { type: "string" }
        }
      }
    }
  };

  // Add registration response schema
  schemas.RegistrationResponse = {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      message: {
        type: "string",
        example: "Registration successful. Please verify your email.",
      },
    },
  };
} catch (_) {
  // Model not found yet; you can add later.
}

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Finance Teque API",
    version: "1.0.0",
    description: "API documentation for Finance Teque application",
    contact: {
      name: "Finance Teque Support",
      email: "support@financeteque.com",
    },
  },
  servers: [
    { url: "https://financetequecv.com", description: "Production server" },
    { url: "http://localhost:3000", description: "Development server" },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentication and user management endpoints",
    },
    {
      name: "Verification",
      description: "User verification and document upload endpoints",
    },
    { name: "Admin", description: "Admin-only endpoints for user management" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
        description: "Authentication cookie containing JWT token",
      },
    },
    schemas, // populated from mongoose-to-swagger with enhancements
  },
};

module.exports = swaggerJsdoc({
  definition,
  apis: [
    // JSDoc-annotated route files
    path.join(__dirname, "routes/**/*.js"),
  ],
});
