import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { Placeholder } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms governing the use of the SS Unicom Service website. Draft pending legal review.",
  path: "/terms",
});

/*
 * DRAFT. Do not publish without review by the company's legal adviser.
 * Governing law, jurisdiction and liability wording are deliberately left
 * as placeholders and must not be filled in without legal advice.
 */
const sections: LegalSection[] = [
  {
    id: "use",
    title: "Use of this website",
    body: (
      <p>
        By using this website you agree to these terms. You may use the website for lawful purposes only and must not
        attempt to disrupt it or gain unauthorised access to it or its systems.
      </p>
    ),
  },
  {
    id: "informational",
    title: "Informational content",
    body: (
      <>
        <p>
          Content on this website is provided for general information about our services. It does not constitute an
          offer, a contract or professional advice of any kind.
        </p>
        <p>
          {site.name} provides business process support. We do not provide legal, financial, lending or immigration
          advice, and nothing on this website should be read as a guarantee of any financial, immigration or other
          outcome. Any engagement is governed by a separate written agreement.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        Unless stated otherwise, the content, design and graphics on this website belong to {site.name}. You may not
        reproduce them for commercial purposes without our written permission.{" "}
        <Placeholder>Confirm ownership of logo and content</Placeholder>
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: (
      <p>
        This website may link to websites operated by others. We are not responsible for their content or privacy
        practices.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        <Placeholder>Liability wording to be drafted by the company&apos;s legal adviser</Placeholder>
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    body: (
      <p>
        <Placeholder>Governing law and jurisdiction to be confirmed by the company&apos;s legal adviser</Placeholder>
      </p>
    ),
  },
  {
    id: "updates",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. Continued use of the website after changes are published means
        you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to{" "}
        <a href={site.contact.emailHref} className="font-semibold text-accent underline-offset-4 hover:underline">
          {site.contact.email}
        </a>{" "}
        or through our{" "}
        <Link href="/contact" className="font-semibold text-accent underline-offset-4 hover:underline">
          contact page
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={<Placeholder>Add date on publication</Placeholder>}
      intro={<p>These terms apply to your use of the {site.name} website.</p>}
      sections={sections}
    />
  );
}
