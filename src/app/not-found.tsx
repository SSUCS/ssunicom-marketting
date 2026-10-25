import { ButtonLink, DisplayHeading, Micro, Row } from "@/components/ui";
import { CubeTile } from "@/components/visuals";

export default function NotFound() {
  return (
    <div className="wrap @container">
      <div className="h-10 md:h-[3.9rem]" />
      <div className="relative overflow-hidden border-t border-line px-4 pb-16 pt-14 md:px-5 md:pb-20">
        <span aria-hidden className="absolute right-4 top-4 size-3 bg-orange md:right-5 md:top-5" />
        <DisplayHeading as="h1" text="404" className="text-[clamp(7rem,30vw,22rem)] leading-[0.8]" />
        <Micro className="absolute bottom-4 left-4 md:bottom-5 md:left-5">Page not found</Micro>
      </div>
      <Row>
        <div className="p-6 md:p-8 lg:col-span-2">
          <p className="text-xl md:text-2xl">This lead went cold.</p>
          <p className="mt-3 text-mute">The page you’re looking for doesn’t exist or has moved.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/contact" variant="line">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <div className="max-lg:hidden" />
        <CubeTile className="min-h-56" />
      </Row>
    </div>
  );
}
