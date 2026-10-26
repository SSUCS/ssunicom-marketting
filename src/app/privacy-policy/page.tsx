import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { Placeholder } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SS Unicom Service handles personal information submitted through this website. Draft pending legal review.",
  path: "/privacy-policy",
});

/*
 * DRAFT. Do not publish without company confirmation and legal review.
 * Nothing below states the company's actual data practices, jurisdiction,
 * retention periods or compliance status; those are marked as placeholders.
 */
const sections: LegalSection[] = [
  {
    id: "information-collected",
    title: "Information we collect",
    body: (
      <>
        <p>When you use the contact form on this website, we collect the information you choose to provide:</p>
        <ul>
          <li>Name</li>
          <li>Company name (optional)</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
          <li>The service you are interested in and your message</li>
        </ul>
        <p>
          We may also receive limited technical information, such as your browser type and pages visited, through
          server logs or analytics tools if they are enabled. <Placeholder>Confirm what technical data is collected</Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "Why we collect it",
    body: (
      <>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Respond to your inquiry and discuss your requirements</li>
          <li>Prepare and follow up on proposals you have requested</li>
          <li>Maintain records of business communications</li>
        </ul>
        <p>
          <Placeholder>Confirm all purposes and the legal basis for processing, if applicable</Placeholder>
        </p>
      </>
    ),
  },
  {
    id: "contact-form",
    title: "Contact-form submissions",
    body: (
      <p>
        Messages sent through the contact form are delivered to our team by{" "}
        <Placeholder>name the email or form service used</Placeholder>. Please do not include sensitive personal,
        financial or identity-document information in the form.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <p>
        This website does not use analytics or advertising cookies unless they are enabled by the company.{" "}
        <Placeholder>If analytics is enabled, name the provider, the cookies set and how visitors can opt out</Placeholder>
      </p>
    ),
  },
  {
    id: "storage-security",
    title: "Data storage and security",
    body: (
      <p>
        We take reasonable steps to protect the information you provide.{" "}
        <Placeholder>Describe where data is stored and the security measures in place</Placeholder>
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party service providers",
    body: (
      <p>
        We may use third-party providers to host this website and deliver form submissions. They process data on our
        behalf only as needed to provide their services.{" "}
        <Placeholder>List hosting, email and analytics providers</Placeholder>
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <p>
        We keep inquiry information only for as long as needed for the purposes described above.{" "}
        <Placeholder>State the retention period</Placeholder>
      </p>
    ),
  },
  {
    id: "your-requests",
    title: "Your requests and how to contact us",
    body: (
      <p>
        You may ask to access, correct or delete the personal information you have shared with us by emailing{" "}
        <a href={site.contact.emailHref} className="font-semibold text-accent underline-offset-4 hover:underline">
          {site.contact.email}
        </a>
        . <Placeholder>Confirm the rights available and the applicable data-protection law</Placeholder>
      </p>
    ),
  },
  {
    id: "updates",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of the page shows
        when it was last changed.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={<Placeholder>Add date on publication</Placeholder>}
      intro={
        <p>
          This policy explains how {site.name} collects and uses personal information submitted through{" "}
          {site.url.replace(/^https?:\/\//, "")}.
        </p>
      }
      sections={sections}
    />
  );
}
