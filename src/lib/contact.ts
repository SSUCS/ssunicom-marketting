/**
 * Contact form schema and validation, shared by the browser form and the
 * /api/contact route so both apply exactly the same rules.
 */

import { serviceOptions } from "./site";

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot field: real visitors leave it empty. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export const LIMITS = { name: 100, company: 120, email: 200, phone: 20, message: 3000 } as const;

export function normalise(raw: Record<string, unknown>): ContactInput {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    service: str(raw.service),
    message: str(raw.message),
    website: str(raw.website),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > LIMITS.name) errors.name = "Please shorten your name.";

  if (input.company.length > LIMITS.company) errors.company = "Please shorten the company name.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(input.email) || input.email.length > LIMITS.email)
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (input.phone && !PHONE_RE.test(input.phone))
    errors.phone = "Please enter a valid phone number, including the country code.";

  if (!input.service) errors.service = "Please choose the service you're interested in.";
  else if (!(serviceOptions as readonly string[]).includes(input.service))
    errors.service = "Please choose an option from the list.";

  if (!input.message) errors.message = "Please tell us a little about your requirements.";
  else if (input.message.length < 20) errors.message = "Please add a little more detail (at least 20 characters).";
  else if (input.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return errors;
}
