import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">This page took a wrong turn.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
