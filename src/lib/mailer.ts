import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  // Do not throw at import time in dev; emails will fail gracefully
  // eslint-disable-next-line no-console
  console.warn("SMTP env vars are not fully configured.");
}

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const from = opts.from || `Bookings <${SMTP_USER}>`;
  return transporter.sendMail({ from, to: opts.to, subject: opts.subject, html: opts.html });
}


