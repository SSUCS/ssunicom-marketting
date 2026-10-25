import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: digital reach, human follow-through`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The pixel "SS" monogram from the logo, drawn on a 40×40 grid.
const S = [".####", "#....", "#....", ".###.", "....#", "....#", "####."];
const MONOGRAM = S.map((row) => `${row}.${row}`)
  .flatMap((row, y) =>
    [...row].map((cell, x) => (cell === "#" ? `M${(5.7 + x * 2.6).toFixed(2)} ${(10.9 + y * 2.6).toFixed(2)}h2.3v2.3h-2.3z` : "")),
  )
  .join("");

/** Default social-sharing image for every page: the grid, the mark and the tagline. */
export default async function OpengraphImage() {
  // Turret Road (SIL Open Font License, see _og/TurretRoad-OFL.txt), the site's display face.
  const display = await readFile(join(process.cwd(), "src/app/_og/TurretRoad-ExtraBold.ttf"));
  const lines = [60, 330, 600, 870, 1140];
  const headline = { display: "flex", fontFamily: "Turret Road", fontSize: 70, lineHeight: 1, textTransform: "uppercase" } as const;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#e4e4e4", color: "#0e0e0e" }}>
        {lines.map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 0, width: 1, height: 630, background: "#9e9e9e" }} />
        ))}
        <div style={{ position: "absolute", left: 60, top: 120, width: 1081, height: 1, background: "#9e9e9e" }} />
        <div style={{ position: "absolute", left: 60, top: 510, width: 1081, height: 1, background: "#9e9e9e" }} />

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 30,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "0 26px",
            background: "#e4e4e4",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 40 40">
            <path d="M8 0H40V32L32 40H0V8Z" fill="#ff7120" />
            <path d={MONOGRAM} fill="#0e0e0e" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Turret Road", fontSize: 34, lineHeight: 1, textTransform: "uppercase" }}>
              SS Unicom
            </div>
            <div style={{ display: "flex", marginTop: 6, fontSize: 15, letterSpacing: 9, color: "#636363", textTransform: "uppercase" }}>
              Service
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 61,
            top: 121,
            width: 1079,
            height: 389,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 52px",
            background: "#f6f6f6",
          }}
        >
          <div style={headline}>Digital reach.</div>
          <div style={{ ...headline, marginTop: 14 }}>Human follow-through.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44, fontSize: 26, color: "#636363" }}>
            <div style={{ width: 14, height: 14, background: "#ff7120" }} />
            Lead generation · Web apps · Digital marketing
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 548,
            display: "flex",
            padding: "4px 26px",
            fontSize: 22,
            letterSpacing: 3,
            color: "#636363",
            textTransform: "uppercase",
            background: "#e4e4e4",
          }}
        >
          Kanpur, India · Serving the US and India
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Turret Road", data: display, weight: 800, style: "normal" }] },
  );
}
