import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: digital reach, human follow-through`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image for every page. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#060708",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#c4f54a" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Digital reach. Human follow-through.
          </div>
          <div style={{ fontSize: 30, color: "#8b939e" }}>
            Lead generation · Web apps · Digital marketing
          </div>
        </div>
        <svg width="1040" height="40" viewBox="0 0 1040 40">
          <path d="M0 20 H1040" stroke="#1f242b" strokeWidth="3" />
          <path d="M0 20 H780" stroke="#c4f54a" strokeWidth="4" />
          {[0, 260, 520, 780].map((x) => (
            <circle key={x} cx={x + 12} cy="20" r="12" fill="#c4f54a" />
          ))}
          <circle cx="1028" cy="20" r="12" fill="#1f242b" />
        </svg>
      </div>
    ),
    size,
  );
}
