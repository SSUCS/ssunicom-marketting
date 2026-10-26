import type { Metadata } from "next";
import { PageHero, Spacer } from "@/components/sections";
import { Row, cx } from "@/components/ui";
import { SHOW_SAMPLE_MARKERS, facts, sampleLists, type Fact } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Placeholder checklist — SS Universal Communication Services",
  robots: { index: false, follow: false },
};

/** One readable line per list item, whatever shape the list uses. */
function describe(item: unknown): string {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.quote === "string") return `“${o.quote}” (${o.role}, ${o.org})`;
    if (typeof o.client === "string") return `${o.client}: ${o.text}`;
    if (typeof o.name === "string" && typeof o.role === "string") return `${o.name} (${o.role})`;
    if (typeof o.name === "string") return o.name;
  }
  return String(item);
}

/** Internal page: every sample value from src/lib/placeholders.ts and whether it is confirmed. */
export default function PlaceholdersPage() {
  const factRows = Object.entries(facts as Record<string, Fact>).map(([key, f]) => ({
    key,
    ask: f.ask,
    value: [f.value],
    confirmed: f.confirmed,
  }));
  const listRows = Object.entries(sampleLists).map(([key, l]) => ({
    key,
    ask: l.ask,
    value: (l.items as readonly unknown[]).map(describe),
    confirmed: l.confirmed,
  }));
  const rows = [...factRows, ...listRows];
  const open = rows.filter((r) => !r.confirmed).length;
  const th = "px-5 py-4 font-normal";

  return (
    <div className="wrap @container">
      <PageHero
        size="md"
        label="Internal"
        title={"Placeholder\nchecklist"}
        intro={
          <>
            Every value below is edited in <code className="text-orange-deep">src/lib/placeholders.ts</code>. Replace it,
            then set <code className="text-orange-deep">confirmed: true</code>.
          </>
        }
        aside={
          <dl className="flex h-full flex-col justify-end">
            {[
              { label: "Still samples", value: `${open} of ${rows.length}` },
              { label: "Sample markers", value: SHOW_SAMPLE_MARKERS ? "On" : "Off" },
            ].map((d) => (
              <div key={d.label} className="border-t border-line px-6 py-4 md:px-7">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">{d.label}</dt>
                <dd className="display mt-1 text-3xl">{d.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Spacer />
      <Row full>
        <div className="panel relative z-[2] overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">
              <tr className="border-b border-line">
                <th className={th}>Status</th>
                <th className={th}>Key</th>
                <th className={th}>What the company needs to supply</th>
                <th className={th}>Current value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-b border-line align-top last:border-0">
                  <td className="px-5 py-4">
                    <span
                      className={cx(
                        "inline-flex items-center gap-1.5 border px-1.5 py-[3px] font-mono text-[0.625rem] uppercase leading-none tracking-[0.12em]",
                        r.confirmed ? "border-ink" : "border-orange",
                      )}
                    >
                      <span aria-hidden className={cx("size-1.5", r.confirmed ? "bg-ink" : "bg-orange")} />
                      {r.confirmed ? "Confirmed" : "Sample"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-mute">{r.key}</td>
                  <td className="px-5 py-4">{r.ask}</td>
                  <td className="px-5 py-4 text-mute">
                    {r.value.length === 1 ? (
                      r.value[0]
                    ) : (
                      <ul className="space-y-1.5">
                        {r.value.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
    </div>
  );
}
