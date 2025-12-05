import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Body = { name?: string; email?: string; message?: string };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Basic validation
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Configure SMTP transporter using env variables
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL; // recipient

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      // eslint-disable-next-line no-console
      console.error("Missing SMTP configuration in environment variables");
      return NextResponse.json({ error: "Server email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailSubject = `Contact from ${name} <${email}>`;
    const mailText = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const info = await transporter.sendMail({
      from: `${name} <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: mailSubject,
      text: mailText,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    // eslint-disable-next-line no-console
    console.log("Contact message sent:", info?.messageId || info);

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error in contact API:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
