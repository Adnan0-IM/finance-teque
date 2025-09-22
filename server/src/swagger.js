const swaggerJsdoc = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const path = require("path")

// Import your mongoose models (adjust paths)
let schemas = {};
try {
  const User = require("./models/User"); // adjust if different
  schemas.User = m2s(User, { omitFields: ["password", "__v"] });
} catch (_) {
  // Model not found yet; you can add later.
}

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Finance Teque API",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000" }],
  components: {
    securitySchemes: {
      cookieAuth: { type: "apiKey", in: "cookie", name: "token" }, // adjust cookie name
    },
    schemas, // populated from mongoose-to-swagger
  },
};

module.exports = swaggerJsdoc({
  definition,
  apis: [
    // JSDoc-annotated route files
    path.join(__dirname, "routes/**/*.js"),
  ],
});
