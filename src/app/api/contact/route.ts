import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Resend } from 'resend';

// In-memory sliding window rate limiter: 5 requests per 60 seconds per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate Limiting ──────────────────────────────────────────────────────────
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown-ip";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json();
    let { name, email, phone, message, lang } = body as {
      name: string;
      email?: string;
      phone?: string;
      message: string;
      lang?: "en" | "bn";
    };

    // ── Input Sanitization & Bounds ───────────────────────────────────────────
    name = (name || "").trim().slice(0, 100);
    message = (message || "").trim().slice(0, 2000);
    email = email ? email.trim().slice(0, 150) : undefined;
    phone = phone ? phone.trim().slice(0, 30) : undefined;

    if (!name || !message) {
      return NextResponse.json(
        { error: lang === "bn" ? "নাম এবং মেসেজ আবশ্যক।" : "Name and message are required." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: lang === "bn" ? "সঠিক ইমেইল ঠিকানা প্রদান করুন।" : "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (phone && !/^[0-9+() \t-]{6,25}$/.test(phone)) {
      return NextResponse.json(
        { error: lang === "bn" ? "সঠিক ফোন নম্বর প্রদান করুন।" : "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // ── Fetch admin settings ──────────────────────────────────────────────────
    let toEmail = "info@bismillahpakhi.com";
    let whatsappNumber = "8801947315330";

    try {
      const payload = await getPayload({ config: configPromise });
      const settings = await payload.findGlobal({ slug: "store-settings" });

      toEmail =
        (settings as any)?.contact?.adminEmail ||
        (settings as any)?.contact?.emailAddress ||
        "info@bismillahpakhi.com";

      whatsappNumber =
        ((settings as any)?.contact?.whatsappNumber || "8801947315330").replace(/[^0-9]/g, "");
    } catch (dbErr) {
      console.warn("[contact/route] Store settings fetch error, using defaults:", dbErr);
    }

    // ── Build WhatsApp message ────────────────────────────────────────────────
    const waText = encodeURIComponent(
      lang === "bn"
        ? `📨 নতুন যোগাযোগ\n\nনাম: ${name}\n${email ? `ইমেইল: ${email}\n` : ""}${phone ? `ফোন: ${phone}\n` : ""}বার্তা:\n${message}`
        : `📨 New Contact Message\n\nName: ${name}\n${email ? `Email: ${email}\n` : ""}${phone ? `Phone: ${phone}\n` : ""}Message:\n${message}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

    // ── Send email via Resend SDK with HTML Escaped Inputs ────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (RESEND_API_KEY) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = email ? escapeHtml(email) : "";
        const safePhone = phone ? escapeHtml(phone) : "";
        const safeMessage = escapeHtml(message);

        const resend = new Resend(RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: "Bismillah Pakhi <onboarding@resend.dev>",
          to: [toEmail],
          replyTo: email || undefined,
          subject: `[বিসমিল্লাহ পাখি] ${lang === "bn" ? "নতুন বার্তা" : "New Message"} — ${safeName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: sans-serif; max-width: 560px; margin: 40px auto; background: #f9fafb; padding: 0; border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg,#059669,#0d9488); padding: 28px 32px;">
    <h1 style="color:white; margin:0; font-size:20px;">📨 ${lang === "bn" ? "নতুন যোগাযোগ বার্তা" : "New Contact Message"}</h1>
    <p style="color:rgba(255,255,255,.8); margin:6px 0 0; font-size:13px;">বিসমিল্লাহ পাখি এন্ড অ্যাকোয়ারিয়াম</p>
  </div>
  <div style="background:white; padding: 28px 32px; border: 1px solid #e5e7eb; border-top: none;">
    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0; color:#6b7280; font-size:13px; width:90px;">${lang === "bn" ? "নাম" : "Name"}</td><td style="padding:8px 0; font-weight:600; color:#111827;">${safeName}</td></tr>
      ${safeEmail ? `<tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">${lang === "bn" ? "ইমেইল" : "Email"}</td><td style="padding:8px 0; color:#111827;"><a href="mailto:${safeEmail}" style="color:#059669;">${safeEmail}</a></td></tr>` : ""}
      ${safePhone ? `<tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">${lang === "bn" ? "ফোন" : "Phone"}</td><td style="padding:8px 0; color:#111827;">${safePhone}</td></tr>` : ""}
    </table>
    <div style="margin-top:20px; padding:16px; background:#f0fdf4; border-radius:8px; border-left:3px solid #059669;">
      <p style="margin:0 0 6px; font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:.05em;">${lang === "bn" ? "বার্তা" : "Message"}</p>
      <p style="margin:0; color:#111827; line-height:1.7; white-space:pre-wrap;">${safeMessage}</p>
    </div>
    <div style="margin-top:24px; text-align:center;">
      <a href="${whatsappUrl}" style="display:inline-block; padding:12px 24px; background:#25D366; color:white; border-radius:8px; text-decoration:none; font-weight:600; font-size:14px;">💬 WhatsApp-এ রিপ্লাই দিন</a>
    </div>
  </div>
</body>
</html>`,
        });

        if (error) {
          console.error("[Resend Error]:", error);
          emailSent = false;
        } else {
          emailSent = true;
        }
      } catch (err) {
        console.error("[Resend Exception]:", err);
        emailSent = false;
      }
    } else {
      console.warn("RESEND_API_KEY is not set in environment variables");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      whatsappUrl,
      toEmail,
    });
  } catch (err) {
    console.error("[contact/route]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
