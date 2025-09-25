// UiBlocks.tsx
import type { UIPayload } from "@/utils/ui-payload";

type Accent = "emerald" | "cyan" | "purple" | "red" | null | undefined;

function normalizeAccent(x?: string): Accent {
  switch (x) {
    case "emerald":
    case "cyan":
    case "purple":
    case "red":
      return x;
    default:
      return null;
  }
}

export function UiBlock({
  ui,
  onButtonClick,
}: {
  ui: UIPayload;
  onButtonClick: (value: string) => void;
}) {
  const a: Accent = ui.type === "card" ? normalizeAccent(ui.accent) : null;

  switch (ui.type) {
    case "card": {
      return (
        <div
          className={[
            "rounded-2xl border shadow px-4 py-3 backdrop-blur",
            "bg-neutral-800/70 border-white/10",
            ringCls(a),
          ].join(" ")}
        >
          {ui.title && (
            <div className="mb-1 flex items-center gap-2">
              <span className={pillCls(a)} />
              <h4 className="text-white font-semibold">{ui.title}</h4>
            </div>
          )}
          {ui.body && <p className="text-neutral-400 text-sm leading-relaxed">{ui.body}</p>}
        </div>
      );
    }

    case "buttons": {
      const items = Array.isArray(ui.items) ? ui.items : [];
      return (
        <div
          className={[
            "rounded-2xl border p-3 backdrop-blur",
            "bg-neutral-800/70 border-white/10",
            ringCls(a),
          ].join(" ")}
        >
          {ui.title && (
            <h4 className="text-white font-semibold mb-2">{ui.title}</h4>
          )}
          <div className="flex flex-wrap gap-2">
            {items.map((b, i) => {
              const disabled = !b?.value;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && onButtonClick(b.value!)}
                  className={[
                    "px-3 py-1.5 rounded-xl border transition",
                    "text-white focus:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-white/30",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    btnCls(a),
                  ].join(" ")}
                >
                  {b?.label ?? "—"}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case "skills": {
      const items = Array.isArray(ui.items) ? ui.items : [];
      return (
        <div
          className={[
            "rounded-2xl border p-3 backdrop-blur",
            "bg-neutral-800/70 border-white/10",
            ringCls(a),
          ].join(" ")}
        >
          {ui.title && (
            <div className="mb-2 flex items-center gap-2">
                <span className={pillCls('emerald')} />
                <h4 className="text-white font-semibold">{ui.title}</h4>
            </div>
          )}
          <div className="space-y-3">
            {items.map((s, i) => {
            //   const level = clampNumber(s?.level ?? 0, 0, 100);
              return (
                <div key={i}>
                    <p className="text-sm font-bold text-emerald-500">{s.label}</p>
                    {s.value && (
                        <p className="text-sm text-neutral-400 font-thin">{s.value}</p>
                    )}
                    {s.bullets && (
                        <p className="text-sm text-neutral-400 font-thin">{s.bullets.join(", ")}</p>
                    )}
                  {/* <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>{s?.name ?? "Skill"}</span> */}
                    {/* <span>{level}%</span> */}
                  {/* </div> */}
                  {/* <div
                    className="h-2 rounded bg-white/10 overflow-hidden"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={level}
                    aria-label={s?.name ?? "Skill level"}
                    title={`${level}%`}
                  >
                    <div
                      className={[
                        "h-full transition-[width] duration-500",
                        barCls(a),
                      ].join(" ")}
                      style={{ width: `${level}%` }}
                    />
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "links": {
      const items = Array.isArray(ui.items) ? ui.items : [];
      return (
        <div
          className={[
            "rounded-2xl border p-3 backdrop-blur",
            "bg-neutral-800/70 border-white/10",
            ringCls(a),
          ].join(" ")}
        >
          {ui.title && (
            <h4 className="text-white font-semibold mb-2">{ui.title}</h4>
          )}
          <ul className="space-y-1">
            {items.map((l, i) => (
              <li key={i} className="flex items-center gap-2">
                <a
                  href={l?.href ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 underline hover:text-sky-200 truncate"
                  title={l?.href}
                >
                  {l?.label ?? l?.href ?? "Link"}
                </a>
                <svg
                  className="w-3.5 h-3.5 text-sky-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 3h7v7M21 3l-9 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 14v5a2 2 0 0 1-2 2h-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "timeline": {
      // permitir accent en timeline si vino desde la IA
      const aAllTypes: Accent = "accent" in ui ? normalizeAccent((ui as any).accent) : null;
      const items = Array.isArray(ui.items) ? ui.items : [];

      // estado vacío
      if (items.length === 0) {
        return (
          <div className={["rounded-2xl border p-3 backdrop-blur","bg-neutral-800/70 border-white/10", ringCls(aAllTypes)].join(" ")}>
            {ui.title && <h4 className="text-white font-semibold mb-3">{ui.title}</h4>}
            <p className="text-white/70 text-sm">No education data available.</p>
          </div>
        );
      }

      return (
        <div className={["rounded-2xl border p-3 backdrop-blur","bg-neutral-800/70 border-white/10", ringCls(aAllTypes)].join(" ")}>
          {ui.title && <h4 className="text-white font-semibold mb-3">{ui.title}</h4>}
          <div className="relative">
            <div className="absolute left-[10px] top-0 bottom-0 w-px bg-white/15" />
            <div className="space-y-4">
              {items.map((it, i) => {
                const title = it?.title && it.title.trim() ? it.title : "—";
                const subtitle = it?.subtitle && it.subtitle.trim() ? it.subtitle : undefined;
                const period = it?.period && it.period.trim() ? it.period : "—";
                const bullets = Array.isArray(it?.bullets) ? it!.bullets!.filter(Boolean) : [];

                return (
                  <div key={i} className="relative pl-6">
                    <span className={["absolute left-0 top-1.5 w-3 h-3 rounded-full ring-2 ring-black/20", dotCls(aAllTypes)].join(" ")} />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-white font-medium">{title}</div>
                        <span className="px-2 py-0.5 text-[11px] rounded-full bg-white/10 text-white/80 border border-white/10">
                          {period}
                        </span>
                      </div>
                      {subtitle && <div className="text-emerald-500 text-sm font-bold">{subtitle}</div>}

                      {bullets.length > 0 && (
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {bullets.map((b, j) => (
                            <li key={j} className="text-white/90">{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  // Fallback si llega un tipo desconocido
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-800/70 p-3">
      <p className="text-white/80 text-sm">Unsupported UI block.</p>
    </div>
  );
}

/* ---------------- helpers de estilo por accent ---------------- */

function ringCls(accent: Accent) {
  switch (accent) {
    case "emerald":
      return "ring-1 ring-emerald-300/25";
    case "cyan":
      return "ring-1 ring-cyan-300/25";
    case "purple":
      return "ring-1 ring-purple-300/25";
    case "red":
      return "ring-1 ring-red-300/25";
    default:
      return "ring-1 ring-white/10";
  }
}

function pillCls(accent: Accent) {
  switch (accent) {
    case "emerald":
      return "w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.55)]";
    case "cyan":
      return "w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.55)]";
    case "purple":
      return "w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.55)]";
    case "red":
      return "w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.55)]";
    default:
      return "w-2.5 h-2.5 rounded-full bg-white/50";
  }
}

function btnCls(accent: Accent) {
  switch (accent) {
    case "emerald":
      return "bg-emerald-400/15 border-emerald-300/20 hover:bg-emerald-400/25";
    case "cyan":
      return "bg-cyan-400/15 border-cyan-300/20 hover:bg-cyan-400/25";
    case "purple":
      return "bg-purple-400/15 border-purple-300/20 hover:bg-purple-400/25";
    case "red":
      return "bg-red-400/15 border-red-300/20 hover:bg-red-400/25";
    default:
      return "bg-white/10 border-white/10 hover:bg-white/20";
  }
}

function barCls(accent: Accent) {
  switch (accent) {
    case "emerald":
      return "bg-gradient-to-r from-emerald-400 to-emerald-300";
    case "cyan":
      return "bg-gradient-to-r from-cyan-400 to-sky-300";
    case "purple":
      return "bg-gradient-to-r from-purple-400 to-fuchsia-300";
    case "red":
      return "bg-gradient-to-r from-red-400 to-amber-300";
    default:
      return "bg-white/70";
  }
}

function dotCls(accent: Accent) {
  switch (accent) {
    case "emerald":
      return "bg-emerald-400";
    case "cyan":
      return "bg-cyan-400";
    case "purple":
      return "bg-purple-400";
    case "red":
      return "bg-red-400";
    default:
      return "bg-white/60";
  }
}

function clampNumber(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
