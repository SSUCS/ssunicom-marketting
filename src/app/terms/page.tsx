import { LegalPage, ToDraft, type LegalSection } from "@/components/LegalPage";
import { Fill } from "@/components/Sample";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use — SS Unicom Service",
  description: "Terms for using the SS Unicom Service website. Outline pending legal review.",
  path: "/terms",
});

/* OUTLINE. Do not publish without legal review. */
const sections: LegalSection[] = [
  { id: "acceptance", title: "Acceptance of these terms", body: <p>By using this website you accept these terms.</p> },
  { id: "use", title: "Use of the website", body: <ToDraft>Acceptable use of the website.</ToDraft> },
  {
    id: "not-advice",
    title: "General information, not advice",
    body: <p>Website content is general information, not legal, financial or other professional advice.</p>,
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        Content on this website belongs to <Fill k="legalEntity" /> unless stated otherwise.
      </p>
    ),
  },
  { id: "links", title: "Links to third-party websites", body: <p>We are not responsible for the content of websites we link to.</p> },
  { id: "liability", title: "Limitation of liability", body: <ToDraft>Liability wording, to be drafted by the legal adviser.</ToDraft> },
  {
    id: "law",
    title: "Governing law and jurisdiction",
    body: <ToDraft>Confirm, e.g. courts of Kanpur, Uttar Pradesh.</ToDraft>,
  },
  { id: "changes", title: "Changes to these terms", body: <p>We will post any changes on this page.</p> },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Email{" "}
        <a href={site.contact.emailHref}>
          {site.contact.email}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Use" intro="The terms that apply when you use this website." sections={sections} />;
}
