import nodemailer from "nodemailer";

// One transporter for the whole app, configured from the environment.
// Credentials must never be hardcoded: this repo is public.
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!user || !pass) {
  console.warn(
    "EMAIL_USER / EMAIL_PASS are not set — email sending is disabled. " +
      "Set them in backendtravease/.env to enable it."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

// Swallow mail failures: a destination should still save if the email bounces.
export const sendMail = async (options) => {
  if (!user || !pass) {
    console.warn("Email not sent (no credentials configured):", options.subject);
    return { skipped: true };
  }
  try {
    return await transporter.sendMail({ from: user, ...options });
  } catch (err) {
    console.error("Email failed to send:", err.message);
    return { error: err.message };
  }
};

export default transporter;
