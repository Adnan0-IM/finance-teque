require("dotenv").config();
const sgMail = require("@sendgrid/mail");

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set. Emails will fail.");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
// sgMail.setDataResidency('eu'); // Uncomment if using EU subuser

const FROM = process.env.SENDGRID_FROM_EMAIL || "no-reply@example.com";

async function sendVerificationEmail(to, code) {
  const msg = {
    to,
    from: FROM,
    subject: "Your verification code",
    text: `Your verification code is ${code}. It expires in 10 minutes.`,
    html: `<p>Your verification code is <strong>${code}</strong>. It expires in 10 minutes.</p>`,
  };
  await sgMail.send(msg);
}

async function sendResetPasswordEmail(to, token) {
  const appUrl = process.env.APP_URL || "http://localhost:5173";
  const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(
    token
  )}`;

  const msg = {
    to,
    from: FROM,
    subject: "Password reset request",
    text: `You requested a password reset. Use this link to set a new password: ${resetUrl}. This link expires in 10 minutes. If you did not request this, please ignore this email.`,
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to set a new password (valid for 10 minutes):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };
  await sgMail.send(msg);
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
