"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { LIMITS, normalise, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { fact } from "@/lib/placeholders";
import { serviceOptions, site } from "@/lib/site";
import { Icon } from "./Icon";
import { cx } from "./ui";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

const FIELD_ORDER: (keyof ContactInput)[] = ["name", "company", "email", "phone", "service", "message"];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");
  const [sent, setSent] = useState({ name: "", email: "" });

  // Pre-select a service when arriving from a "Enquire about this service" link.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && (serviceOptions as readonly string[]).includes(requested)) setService(requested);
  }, []);

  useEffect(() => {
    if (status !== "idle" && status !== "submitting") statusRef.current?.focus();
  }, [status]);

  const read = () => normalise(Object.fromEntries(new FormData(formRef.current!)));

  const revalidate = () => {
    if (touched) setErrors(validateContact(read()));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const input = read();
    const found = validateContact(input);
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setSent({ name: input.name, email: input.email });
        setStatus("success");
        formRef.current?.reset();
        setService("");
        setTouched(false);
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus(data.error === "not_configured" ? "not_configured" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    // Re-check while typing (not on blur), so error messages never shift the
    // layout between pressing and releasing the submit button.
    onInput: revalidate,
    className: cx(
      "mt-2 block w-full rounded-xl border bg-surface-2 px-4 py-3 text-base text-fg placeholder:text-dim transition-colors",
      "focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25",
      errors[name] ? "border-red-400" : "border-line-strong hover:border-fg/30",
    ),
  });

  const label = (name: keyof ContactInput, text: string, optional = false) => (
    <label htmlFor={`contact-${name}`} className="text-sm font-semibold">
      {text}
      {optional ? <span className="font-normal text-muted"> (optional)</span> : <span aria-hidden className="text-signal"> *</span>}
    </label>
  );

  const error = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="contact-required-note">
      <p id="contact-required-note" className="text-sm text-muted">
        All fields are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input type="text" autoComplete="name" maxLength={LIMITS.name} required {...fieldProps("name")} />
          {error("name")}
        </div>
        <div>
          {label("company", "Company")}
          <input type="text" autoComplete="organization" maxLength={LIMITS.company} required {...fieldProps("company")} />
          {error("company")}
        </div>
        <div>
          {label("email", "Email")}
          <input type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} required {...fieldProps("email")} />
          {error("email")}
        </div>
        <div>
          {label("phone", "Phone (with country code)")}
          <input type="tel" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone} placeholder="+1 555 000 0000" required {...fieldProps("phone")} />
          {error("phone")}
        </div>
      </div>

      <div>
        {label("service", "Service of interest")}
        <select
          required
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            if (touched) setErrors((prev) => ({ ...prev, service: undefined }));
          }}
          {...fieldProps("service")}
        >
          <option value="" disabled>
            Choose an option
          </option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {error("service")}
      </div>

      <div>
        {label("message", "Message")}
        <textarea
          rows={6}
          required
          maxLength={LIMITS.message}
          placeholder="More enquiries, better-qualified leads, a new website or support for an existing process — tell us what you need."
          {...fieldProps("message")}
        />
        {error("message")}
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-signal px-7 py-3 font-semibold text-signal-ink transition-colors hover:bg-signal-strong disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
        </button>
        <p className="text-xs text-muted sm:max-w-xs sm:text-right">
          By submitting this form you agree that we may contact you about your enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status === "success" && (
          <Notice tone="success" title={`Thank you, ${sent.name}.`}>
            We&apos;ve received your enquiry and will reply to {sent.email} within {fact("replyTime")}. For anything
            urgent, call{" "}
            <a className="font-semibold underline" href={site.contact.phoneHref}>
              {site.contact.phoneDisplay}
            </a>
            .
          </Notice>
        )}
        {status === "not_configured" && (
          <Notice tone="warning" title="Online form delivery isn't set up yet.">
            Your message has not been sent. Please email{" "}
            <a className="font-semibold underline" href={site.contact.emailHref}>
              {site.contact.email}
            </a>{" "}
            or call{" "}
            <a className="font-semibold underline" href={site.contact.phoneHref}>
              {site.contact.phoneDisplay}
            </a>
            .
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="error" title="Something went wrong and your enquiry wasn't sent.">
            Please try again, or email us at{" "}
            <a className="font-semibold underline" href={site.contact.emailHref}>
              {site.contact.email}
            </a>
            .
          </Notice>
        )}
      </div>
    </form>
  );
}

function Notice({ tone, title, children }: { tone: "success" | "warning" | "error"; title: string; children: React.ReactNode }) {
  const styles = {
    success: "border-signal/40 bg-signal/10 text-fg",
    warning: "border-sample/40 bg-sample/10 text-fg",
    error: "border-red-400/40 bg-red-500/10 text-fg",
  }[tone];
  return (
    <div className={cx("flex gap-3 rounded-xl border p-4", styles)}>
      <Icon name={tone === "success" ? "check" : "chat"} className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm">{children}</p>
      </div>
    </div>
  );
}
