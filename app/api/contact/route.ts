import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Create reusable transporter — configure with your SMTP credentials in .env.local
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Email to the site owner (you) — notifying about the new message
function buildOwnerEmail(data: ContactBody) {
  const { firstName, lastName, email, phone, message } = data;
  return {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `New Contact Message from ${firstName} ${lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Georgia', 'Times New Roman', serif; margin: 0; padding: 0; background-color: #f4f2ed; }
          .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #1A2B3C, #2a3f55); padding: 32px 30px; text-align: center; }
          .header h1 { color: #C5A059; font-size: 20px; margin: 0 0 6px; letter-spacing: 2px; text-transform: uppercase; }
          .header p { color: rgba(255,255,255,0.6); font-size: 12px; margin: 0; letter-spacing: 1px; }
          .body { padding: 30px; }
          .field { margin-bottom: 20px; }
          .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #C5A059; margin-bottom: 6px; }
          .field-value { font-size: 15px; color: #1A2B3C; line-height: 1.6; padding: 10px 14px; background: #FAF8F5; border-left: 3px solid #C5A059; border-radius: 4px; }
          .divider { height: 1px; background: linear-gradient(to right, transparent, #E5E1D8, transparent); margin: 24px 0; }
          .footer { padding: 20px 30px; background: #FAF8F5; text-align: center; font-size: 11px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message</h1>
            <p>Received via Portfolio Website</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #1A2B3C; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value">${phone || "Not provided"}</div>
            </div>
            <div class="divider"></div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          <div class="footer">
            This email was sent from the contact form on advabdulmulla.com
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

// Auto-reply email to the user
function buildAutoReplyEmail(data: ContactBody) {
  const { firstName, email } = data;
  return {
    from: `"Adv. Abdul Mulla" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${firstName}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Georgia', 'Times New Roman', serif; margin: 0; padding: 0; background-color: #f4f2ed; }
          .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #1A2B3C, #2a3f55); padding: 36px 30px; text-align: center; }
          .header h1 { color: #C5A059; font-size: 22px; margin: 0 0 8px; font-weight: 400; }
          .header p { color: rgba(255,255,255,0.55); font-size: 11px; margin: 0; letter-spacing: 2px; text-transform: uppercase; }
          .body { padding: 35px 30px; color: #333; line-height: 1.8; font-size: 14px; }
          .body p { margin: 0 0 16px; }
          .highlight { color: #C5A059; font-weight: 600; }
          .signature { margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0ede6; }
          .signature .name { font-size: 16px; color: #1A2B3C; font-weight: 700; margin: 0; }
          .signature .phone { font-size: 13px; color: #1A2B3C; margin: 6px 0 0; }
          .signature .phone a { color: #1A2B3C; text-decoration: none; font-weight: 600; }
          .footer { padding: 20px 30px; background: #FAF8F5; text-align: center; }
          .footer p { font-size: 11px; color: #999; margin: 0 0 8px; }
          .footer a { color: #C5A059; text-decoration: none; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="font-body">Adv. Abdul Mulla</h1>
            <p>Advocate &bull; Author &bull; Legal Awareness Contributor</p>
          </div>
          <div class="body">
            <p>Dear <span class="highlight">${firstName}</span>,</p>
            <p>Thank you for submitting your consultation request through our website.</p>
            <p>Your request has been successfully received. We appreciate you taking the time to reach out to us.</p>
            <p>You may contact us at <a href="tel:9370072022" style="color: #1A2B3C; font-weight: 700; text-decoration: none;"><strong>9370072022</strong></a> <strong>between 11:00 AM to 6:00 PM</strong>. Kindly note that <strong>11:00 AM to 3:00 PM are court working hours</strong>; therefore, for non-urgent matters, we request you to preferably call after 3:00 PM.</p>
            <p>Thank you for your understanding. We look forward to assisting you.</p>
            <div class="signature">
              <p class="name">Adv. Abdul Mulla</p>
              <p class="phone"><a href="tel:9370072022" style="color: #1A2B3C; text-decoration: none; font-weight: 600;">📞 9370072022</a></p>
            </div>
          </div>
          <div class="footer">
            <p>Unit No. 409, 4th Floor, Krystal Square, E-Ward, Nagala Park, Near Khanvilkar Pump, Kolhapur - 416003</p>
            <a href="mailto:adv.abduloffice@gmail.com">adv.abduloffice@gmail.com</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    // Validate required fields
    const { firstName, lastName, email, message } = body;
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP credentials not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly." },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(buildOwnerEmail(body)),
      transporter.sendMail(buildAutoReplyEmail(body)),
    ]);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
