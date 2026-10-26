"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
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

  // Prefill from links: ?service= from "Enquire" buttons, ?email= from the footer call-back form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    if (requested && (serviceOptions as readonly string[]).includes(requested)) setService(requested);
    const email = params.get("email");
    const input = formRef.current?.elements.namedItem("email");
    if (email && input instanceof HTMLInputElement && !input.value) input.value = email.slice(0, LIMITS.email);
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
      "mt-1 block w-full rounded-none border-0 border-b bg-transparent py-3 text-base text-ink placeholder:text-dim transition-colors",
      "focus:outline-none focus-visible:outline-none",
      errors[name] ? "border-error focus:border-error" : "border-line hover:border-ink/50 focus:border-ink",
    ),
  });

  const label = (name: keyof ContactInput, text: string, optional = false) => (
    <label htmlFor={`contact-${name}`} className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">
      {text}
      {optional ? <span> (optional)</span> : <span aria-hidden className="text-orange-deep"> *</span>}
    </label>
  );

  const error = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-2 text-sm text-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-7" aria-describedby="contact-required-note">
      <p id="contact-required-note" className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">
        All fields are required.
      </p>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
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
        <div className="relative">
          <select
            required
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              if (touched) setErrors((prev) => ({ ...prev, service: undefined }));
            }}
            {...fieldProps("service")}
            className={cx(fieldProps("service").className, "cursor-pointer appearance-none pr-8")}
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
          <Icon name="chevron-right" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90" />
        </div>
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
          className={cx(fieldProps("message").className, "mt-3 resize-y border px-4")}
        />
        {error("message")}
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "submitting"} className="btn disabled:cursor-wait disabled:opacity-70">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />}
        </button>
        <p className="text-xs leading-relaxed text-mute sm:max-w-xs sm:text-right">
          By sending this form you agree that we may contact you about your enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline decoration-orange underline-offset-2 hover:text-ink">
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
            <a className="underline decoration-orange underline-offset-2" href={site.contact.phoneHref}>
              {site.contact.phoneDisplay}
            </a>
            .
          </Notice>
        )}
        {status === "not_configured" && (
          <Notice tone="warning" title="Online form delivery isn't set up yet.">
            Your message has not been sent. Please email{" "}
            <a className="underline decoration-orange underline-offset-2" href={site.contact.emailHref}>
              {site.contact.email}
            </a>{" "}
            or call{" "}
            <a className="underline decoration-orange underline-offset-2" href={site.contact.phoneHref}>
              {site.contact.phoneDisplay}
            </a>
            .
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="error" title="Something went wrong and your enquiry wasn't sent.">
            Please try again, or email us at{" "}
            <a className="underline decoration-orange underline-offset-2" href={site.contact.emailHref}>
              {site.contact.email}
            </a>
            .
          </Notice>
        )}
      </div>
    </form>
  );
}

function Notice({ tone, title, children }: { tone: "success" | "warning" | "error"; title: string; children: ReactNode }) {
  const styles = {
    success: "border-ink",
    warning: "border-orange",
    error: "border-error",
  }[tone];
  return (
    <div className={cx("flex gap-3 border bg-bg p-4", styles)}>
      <Icon name={tone === "success" ? "check" : "chat"} className={cx("mt-0.5 h-5 w-5 shrink-0", tone === "error" && "text-error")} />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
