"use client";

import { useEffect, useState } from "react";
import { cx } from "./ui";

type Time = { h: number; m: number; s: number };

const ZONES = [
  { city: "Kanpur", zone: "Asia/Kolkata", abbr: "IST" },
  { city: "New York", zone: "America/New_York", abbr: "ET" },
] as const;

function timeIn(zone: string, date: Date): Time {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: get("hour"), m: get("minute"), s: get("second") };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Face({ time }: { time: Time | null }) {
  const hand = (deg: number) => `rotate(${deg.toFixed(2)} 50 50)`;
  return (
    <svg viewBox="0 0 100 100" className="w-full">
      <circle cx="50" cy="50" r="48" fill="#f6f6f6" stroke="#9e9e9e" strokeWidth="0.6" />
      {Array.from({ length: 60 }, (_, i) => (
        <line
          key={i}
          x1="50"
          x2="50"
          y1={i % 5 ? 5.5 : 5}
          y2={i % 5 ? 8 : 11}
          stroke={i % 5 ? "#bebebe" : "#0e0e0e"}
          strokeWidth={i % 5 ? 0.6 : 1.6}
          transform={hand(i * 6)}
        />
      ))}
      {time && (
        <>
          <line x1="50" y1="55" x2="50" y2="27" stroke="#0e0e0e" strokeWidth="3.2" transform={hand(((time.h % 12) + time.m / 60) * 30)} />
          <line x1="50" y1="56" x2="50" y2="14" stroke="#0e0e0e" strokeWidth="2" transform={hand((time.m + time.s / 60) * 6)} />
          <line x1="50" y1="58" x2="50" y2="11" stroke="#ff7120" strokeWidth="1" transform={hand(time.s * 6)} />
        </>
      )}
      <rect x="47.5" y="47.5" width="5" height="5" fill="#ff7120" />
    </svg>
  );
}

/** Live clocks for Kanpur and New York. Decorative: the page says the same thing in words. */
export function DualClock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <div aria-hidden="true" className={cx("grid grid-cols-2 gap-[3cqw]", className)}>
      {ZONES.map((z) => {
        const t = now ? timeIn(z.zone, now) : null;
        return (
          <div key={z.zone} className="flex flex-col items-center gap-4">
            <Face time={t} />
            <div className="text-center">
              <p className="display text-[clamp(1.6rem,2.6cqw,2.4rem)] leading-none">{t ? `${pad(t.h)}:${pad(t.m)}` : "--:--"}</p>
              <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mute">
                {z.city} · {z.abbr}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
