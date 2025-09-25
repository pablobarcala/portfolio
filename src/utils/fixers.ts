// utils/fixers.ts
type TLItem = { title?: string; subtitle?: string; period?: string; bullets?: string[] };
export function fixEducationTimeline(ui: any) {
  if (!ui || ui.type !== "timeline" || !Array.isArray(ui.items)) return ui;

  const norm = (s?: string) => (typeof s === "string" && s.trim().length ? s.trim() : "—");

  ui.items = ui.items.map((it: TLItem) => ({
    title: norm(it?.title),
    subtitle: norm(it?.subtitle),
    period: norm(it?.period),
    bullets: Array.isArray(it?.bullets) ? it!.bullets!.filter(Boolean) : [],
  }));

  // si todos los campos se quedaron en "—", elimina el item vacío
  ui.items = ui.items.filter((it: TLItem) =>
    !(it.title === "—" && it.subtitle === "—" && it.period === "—" && it.bullets?.length === 0)
  );

  // orden opcional por período (desc) si se puede parsear
  ui.items.sort((a: TLItem, b: TLItem) => parseEnd(b.period) - parseEnd(a.period));
  return ui;
}

function parseEnd(period?: string) {
  // "2023–2025" -> 2025; "—" -> 0
  const m = (period || "").match(/(\d{4})(?:\s*[–-]\s*(\d{4}|presente|actual|now))?/i);
  if (!m) return 0;
  const end = m[2] || m[1];
  if (/presente|actual|now/i.test(end)) return 9999;
  const n = parseInt(end, 10);
  return Number.isFinite(n) ? n : 0;
}
