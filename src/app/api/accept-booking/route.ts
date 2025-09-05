import { NextRequest } from "next/server";
import { deleteBooking, getBooking } from "@/lib/bookings";
import { sendMail } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  if (!token) {
    return new Response("Missing token", { status: 400, headers: { "Content-Type": "text/html" } });
  }

  const booking = getBooking(token);
  if (!booking) {
    return new Response("Invalid or expired token.", { status: 400, headers: { "Content-Type": "text/html" } });
  }

  // Send confirmation email to user with meeting link
  const meetingLink = "https://meet.google.com/lookup/demo-meeting";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:540px;margin:auto">
      <h2 style="margin-bottom:8px">Your Booking is Confirmed</h2>
      <p>Hi ${booking.name},</p>
      <p>Your session for <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been accepted.</p>
      <p>Join the meeting using the link below:</p>
      <p><a href="${meetingLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Join Google Meet</a></p>
      <p style="margin-top:16px;color:#6b7280">If the button doesn't work, copy this URL:<br/>${meetingLink}</p>
    </div>
  `;

  try {
    await sendMail({
      to: booking.userEmail,
      subject: `Booking Confirmed: ${booking.service}`,
      html,
    });
  } catch (e) {
    // If email sending fails, do not delete booking so they can retry
    return new Response("Failed to send confirmation email.", { status: 500, headers: { "Content-Type": "text/html" } });
  }

  // Prevent reuse
  deleteBooking(token);

  const page = `
    <html><body style="font-family:Arial,sans-serif">
      <div style="max-width:640px;margin:40px auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h1 style="margin:0 0 12px 0">Booking accepted and meeting link sent.</h1>
        <p>We have emailed ${booking.email} with the Google Meet link.</p>
      </div>
    </body></html>
  `;
  return new Response(page, { status: 200, headers: { "Content-Type": "text/html" } });
}


