import type { Metadata, Viewport } from "next";
import { Roboto_Mono, Turret_Road } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { GridLines } from "@/components/GridLines";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/motion";
import { Preloader } from "@/components/Preloader";
import { PreloaderController, PreviewNotice, SmoothScroll } from "@/components/site-effects";
import { SHOW_SAMPLE_MARKERS } from "@/lib/placeholders";
import { site } from "@/lib/site";
import "./globals.css";

// Turret Road stands in for the reference's wide pixel face; Roboto Mono sets everything else.
const display = Turret_Road({ subsets: ["latin"], weight: ["800"], variable: "--font-turret", display: "swap" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", display: "swap" });

// Runs before first paint: enables JS-only styles and skips the preloader on repeat visits.
const HEAD_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ssu-pl'))d.classList.add('pl-skip')}catch(e){d.classList.add('pl-skip')}})();";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SS Universal Communication Services — Lead Generation & Web Apps, India",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_IN", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#e4e4e4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <noscript>
          <style>{"#preloader{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[300] bg-orange px-4 py-3 font-mono text-sm uppercase focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <Preloader />
        <GridLines />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <PreloaderController />
        <SmoothScroll />
        {SHOW_SAMPLE_MARKERS && <PreviewNotice />}
        <Analytics />
      </body>
    </html>
  );
}
