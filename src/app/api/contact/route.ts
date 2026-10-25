import { NextResponse } from "next/server";
import { normalise, validateContact, type ContactInput } from "@/lib/contact";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Delivery is configured with server-side environment variables (never
 * exposed to the browser). The first configured option is used:
 *
 *   1. Resend (https://resend.com): RESEND_API_KEY, CONTACT_TO_EMAIL,
 *      optionally CONTACT_FROM_EMAIL (must be a verified sender domain).
 *   2. Webhook: CONTACT_WEBHOOK_URL receives the submission as JSON
 *      (works with Formspree, Zapier, Make, a Google Apps Script, etc.).
 *
 * With neither configured the endpoint returns 503 and the form tells the
 * visitor to email or call instead. It never pretends a message was sent.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const input = normalise(raw);

  // Honeypot: pretend success so bots don't retry, but deliver nothing.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const delivered = await deliver(input);
    if (!delivered) {
      return NextResponse.json(
        { ok: false, error: "not_configured" },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}

/** Returns false when no delivery method is configured. */
async function deliver(input: ContactInput): Promise<boolean> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;
  const { website: _honeypot, ...submission } = input;
  void _honeypot;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || `${site.name} Website <onboarding@resend.dev>`,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: submission.email,
        subject: `New enquiry: ${submission.service} — ${submission.name}`,
        text: formatText(submission),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return true;
  }

  if (CONTACT_WEBHOOK_URL) {
    const res = await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...submission, source: site.url, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return true;
  }

  return false;
}

function formatText(s: Omit<ContactInput, "website">) {
  return [
    `Name: ${s.name}`,
    `Company: ${s.company}`,
    `Email: ${s.email}`,
    `Phone: ${s.phone}`,
    `Service: ${s.service}`,
    "",
    s.message,
  ].join("\n");
}
