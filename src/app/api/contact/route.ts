import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, lang } = body as {
      name: string;
      email?: string;
      phone?: string;
      message: string;
      lang?: "en" | "bn";
    };

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: lang === "bn" ? "নাম এবং মেসেজ আবশ্যক।" : "Name and message are required." },
        { status: 400 }
      );
    }

    // ── Fetch admin settings ──────────────────────────────────────────────────
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({ slug: "store-settings" });

    const toEmail: string =
      (settings as any)?.contact?.adminEmail ||
      (settings as any)?.contact?.emailAddress ||
      "info@bismillahpakhi.com";

    const whatsappNumber: string =
      (settings as any)?.contact?.whatsappNumber || "8801947315330";

    // ── Build WhatsApp message ────────────────────────────────────────────────
    const waText = encodeURIComponent(
      lang === "bn"
        ? `📨 নতুন যোগাযোগ\n\nনাম: ${name}\n${email ? `ইমেইল: ${email}\n` : ""}${phone ? `ফোন: ${phone}\n` : ""}বার্তা:\n${message}`
        : `📨 New Contact Message\n\nName: ${name}\n${email ? `Email: ${email}\n` : ""}${phone ? `Phone: ${phone}\n` : ""}Message:\n${message}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

    // ── Send email via Resend SDK ─────────────────────────────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: "Bismillah Pakhi <onboarding@resend.dev>", // ⚠️ Resend requires onboarding@resend.dev or verified domain
          to: [toEmail], // ⚠️ Must be your verified Resend email unless domain is verified
          replyTo: email || undefined,
          subject: `[বিসমিল্লাহ পাখি] ${lang === "bn" ? "নতুন বার্তা" : "New Message"} — ${name}`,
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
      <tr><td style="padding:8px 0; color:#6b7280; font-size:13px; width:90px;">${lang === "bn" ? "নাম" : "Name"}</td><td style="padding:8px 0; font-weight:600; color:#111827;">${name}</td></tr>
      ${email ? `<tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">${lang === "bn" ? "ইমেইল" : "Email"}</td><td style="padding:8px 0; color:#111827;"><a href="mailto:${email}" style="color:#059669;">${email}</a></td></tr>` : ""}
      ${phone ? `<tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">${lang === "bn" ? "ফোন" : "Phone"}</td><td style="padding:8px 0; color:#111827;">${phone}</td></tr>` : ""}
    </table>
    <div style="margin-top:20px; padding:16px; background:#f0fdf4; border-radius:8px; border-left:3px solid #059669;">
      <p style="margin:0 0 6px; font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:.05em;">${lang === "bn" ? "বার্তা" : "Message"}</p>
      <p style="margin:0; color:#111827; line-height:1.7; white-space:pre-wrap;">${message}</p>
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
