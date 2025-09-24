const User = require("../models/User");

async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "System Admin";
  const phone = process.env.ADMIN_PHONE || "0000000000";

  if (!email || !password) {
    console.warn(
      "[Admin seed] ADMIN_EMAIL/ADMIN_PASSWORD not set. Skipping admin seeding."
    );
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("[Admin seed] Admin user already exists:", email);
    return;
  }

  await User.create({
    name,
    email,
    phone,
    password, // hashed by pre-save hook
    role: "admin",
    isVerified: true,
    emailVerified: true,
  });

  console.log("[Admin seed] Admin user created:", email);
}

module.exports = { ensureAdminUser };
