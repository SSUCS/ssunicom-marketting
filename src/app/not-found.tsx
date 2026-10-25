import { ButtonLink, Container, Label } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="pt-6 sm:pt-10">
      <div className="tile bg-grid p-8 sm:p-14">
        <Label index="404">Not found</Label>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">This lead went cold.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
