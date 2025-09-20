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

module.exports = { sendVerificationEmail };
