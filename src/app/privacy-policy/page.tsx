import { LegalPage, ToDraft, type LegalSection } from "@/components/LegalPage";
import { Fill } from "@/components/Sample";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy — SS Universal Communication Services",
  description: "How SS Universal Communication Services handles personal information submitted through this website. Outline pending legal review.",
  path: "/privacy-policy",
});

/*
 * OUTLINE. Do not publish without legal review. Section headings follow the
 * content doc; the text under each is a brief for the legal adviser.
 */
const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        <Fill k="legalEntity" />, <Fill k="address" />. Contact:{" "}
        <a href={site.contact.emailHref}>
          {site.contact.email}
        </a>
        .
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect through this website",
    body: (
      <>
        <p>The enquiry form (name, company, email, phone, service of interest and message), analytics and cookies.</p>
        <ToDraft>Confirm which analytics and cookies, if any, are used.</ToDraft>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: <p>Responding to enquiries and improving the site.</p>,
  },
  {
    id: "client-data",
    title: "Data we handle on behalf of clients",
    body: (
      <ToDraft>Explain how data handled for clients (for example, contact lists for calling campaigns) differs from website data.</ToDraft>
    ),
  },
  {
    id: "service-providers",
    title: "Sharing with service providers",
    body: <ToDraft>Name the email delivery, hosting and analytics providers.</ToDraft>,
  },
  {
    id: "storage-security",
    title: "Storage, security and retention",
    body: <ToDraft>State where data is stored, the security measures in place and the retention periods.</ToDraft>,
  },
  {
    id: "your-rights",
    title: "Your rights and how to make a request",
    body: <ToDraft>List the rights available under the applicable law and how to exercise them.</ToDraft>,
  },
  {
    id: "cookies",
    title: "Cookies and analytics choices",
    body: <ToDraft>Describe the cookies set and how visitors can opt out.</ToDraft>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We will post any changes on this page with a new &ldquo;last updated&rdquo; date.</p>,
  },
  {
    id: "contact",
    title: "Contact for privacy questions",
    body: (
      <p>
        Email{" "}
        <a href={site.contact.emailHref}>
          {site.contact.email}
        </a>{" "}
        or call {site.contact.phoneDisplay}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy |policy"
      intro="How we handle information submitted through this website, and how that differs from data we handle on behalf of clients."
      sections={sections}
    />
  );
}
