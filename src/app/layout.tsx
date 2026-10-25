import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { Spotlight } from "@/components/Spotlight";
import { SHOW_SAMPLE_MARKERS } from "@/lib/placeholders";
import { site } from "@/lib/site";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", weight: ["400", "500", "600", "700"], display: "swap" });
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", weight: ["400", "500", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SS Unicom Service — Lead Generation & Web Apps, India",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_IN", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#060708" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} ${code.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JavaScript is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col">
        {SHOW_SAMPLE_MARKERS && (
          <div className="border-b border-sample/30 bg-sample/10 px-4 py-2 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sample">
            Preview build · details outlined in amber are samples ·{" "}
            <Link href="/placeholders" className="underline underline-offset-2">
              see checklist
            </Link>
          </div>
        )}
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <Spotlight />
        <Analytics />
      </body>
    </html>
  );
}
