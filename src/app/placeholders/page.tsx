import type { Metadata } from "next";
import { Container, Label } from "@/components/ui";
import { SHOW_SAMPLE_MARKERS, facts, sampleLists, type Fact } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Placeholder checklist — SS Unicom Service",
  robots: { index: false, follow: false },
};

/** Internal page: every sample value from src/lib/placeholders.ts and whether it is confirmed. */
export default function PlaceholdersPage() {
  const factRows = Object.entries(facts as Record<string, Fact>).map(([key, f]) => ({
    key,
    ask: f.ask,
    value: f.value,
    confirmed: f.confirmed,
  }));
  const listRows = Object.entries(sampleLists).map(([key, l]) => ({
    key,
    ask: l.ask,
    value: l.items.map((i) => (typeof i === "string" ? i : Object.values(i).join(" — "))).join(" · "),
    confirmed: l.confirmed,
  }));
  const rows = [...factRows, ...listRows];
  const open = rows.filter((r) => !r.confirmed).length;

  return (
    <Container className="pt-6 sm:pt-10">
      <div className="tile bg-grid p-7 sm:p-10">
        <Label>Internal · not indexed</Label>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Placeholder checklist</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Every value below is edited in <code className="font-mono text-fg">src/lib/placeholders.ts</code>. Replace the
          value, then set <code className="font-mono text-fg">confirmed: true</code>.{" "}
          <strong className="text-fg">
            {open} of {rows.length}
          </strong>{" "}
          items are still samples. Sample markers are {SHOW_SAMPLE_MARKERS ? "on" : "off"}.
        </p>
      </div>
      <div className="tile mt-3 overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <tr className="border-b border-line">
              <th className="px-5 py-4 font-normal">Status</th>
              <th className="px-5 py-4 font-normal">Key</th>
              <th className="px-5 py-4 font-normal">What the company needs to supply</th>
              <th className="px-5 py-4 font-normal">Current value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-line last:border-0 align-top">
                <td className="px-5 py-3.5">
                  <span
                    className={
                      r.confirmed
                        ? "rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase text-signal"
                        : "rounded-full bg-sample/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase text-sample"
                    }
                  >
                    {r.confirmed ? "Confirmed" : "Sample"}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-muted">{r.key}</td>
                <td className="px-5 py-3.5">{r.ask}</td>
                <td className="px-5 py-3.5 text-muted">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
