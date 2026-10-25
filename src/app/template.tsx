"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { PIXEL_DELAYS } from "@/lib/pixels";

// False until the first page has mounted, so only client-side navigations get the effect.
let navigated = false;

/** Re-mounts on every navigation and dissolves a pixel cover over the new page. */
export default function Template({ children }: { children: ReactNode }) {
  const [cover, setCover] = useState(navigated);

  useEffect(() => {
    navigated = true;
    if (!cover) return;
    const t = window.setTimeout(() => setCover(false), 900);
    return () => clearTimeout(t);
  }, [cover]);

  return (
    <>
      {cover && (
        <div aria-hidden="true" className="px-cover go">
          {PIXEL_DELAYS.map((d, i) => (
            <i key={i} style={{ "--d": `${d}ms` } as CSSProperties} />
          ))}
        </div>
      )}
      {children}
    </>
  );
}
