import { NextRequest } from "next/server";
import { createBooking, type ServiceType } from "@/lib/bookings";
import { sendMail } from "@/lib/mailer";

function isValidEmail(v: string) {
  return /\S+@\S+\.\S+/.test(v);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { service, designatedEmail, date, time, name, userEmail } = (body || {}) as {
      service?: ServiceType;
      designatedEmail?: string;
      date?: string;
      time?: string;
      name?: string;
      userEmail?: string;
    };

    if (!service || !designatedEmail || !date || !time || !name || !userEmail) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(userEmail) || !isValidEmail(designatedEmail)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const booking = createBooking({ service, designatedEmail, date, time, name, userEmail });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const acceptUrl = `${baseUrl}/api/accept-booking?token=${encodeURIComponent(booking.token)}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:540px;margin:auto">
        <h2 style="margin-bottom:8px">New Booking Request</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <div style="margin-top:16px">
          <a href="${acceptUrl}" style="display:inline-block;background:#16a34a;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Accept Booking</a>
        </div>
      </div>
    `;

    await sendMail({
      to: designatedEmail,
      subject: `Booking Request: ${service} - ${name}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}


