import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Validate required fields
    if (!formData.name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }
    
    if (!formData.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create email content from form data
    const emailContent = Object.entries(formData)
      .filter(([key, value]) => value && value.toString().trim() !== '')
      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
      .join('<br><br>');

    const textContent = Object.entries(formData)
      .filter(([key, value]) => value && value.toString().trim() !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n\n');

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER, // Use authenticated email as sender
      to: process.env.CONTACT_EMAIL,
      subject: `Partnership Dealer Inquiry - ${formData.name}`,
      text: textContent,
      html: `
        <h2>New Partnership Dealer Inquiry</h2>
        <p><strong>Submitted by:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <hr>
        <h3>Form Details:</h3>
        ${emailContent}
      `,
      replyTo: formData.email, // Allow replies to go to the form submitter
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}