import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { TestimonialDef } from "@/lib/types";
import { MarqueeTrack } from "./Marquee";

interface NumbersProps {
  testimonials: TestimonialDef[];
}

const COUNTERS: [string, string, string | null][] = [
  ["12480", "12.480", "+"],
  ["8400", "8.400", null],
  ["21500", "21.500", null],
];

const LABELS = ["cartas em estoque", "treinadores atendidos", "envios para todo o Brasil"];

function QuoteCards({ testimonials }: { testimonials: TestimonialDef[] }) {
  return (
    <>
      {testimonials.map((t) => (
        <figure key={t.n} style={{ margin: 0, flex: "none", width: "clamp(280px,28vw,400px)", padding: 28, boxSizing: "border-box", borderRadius: 22, border: "1px solid rgba(255,255,255,.09)", background: "#10121a", display: "flex", flexDirection: "column", gap: 22 }}>
          <blockquote style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 20, lineHeight: 1.35, letterSpacing: "-0.01em", textWrap: "pretty" }}>&ldquo;{t.q}&rdquo;</blockquote>
          <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
            <span aria-hidden="true" style={{ width: 10, height: 10, transform: "rotate(45deg)", background: t.color }} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{t.n}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".08em", color: "#a3a6b4" }}>{t.city}</span>
          </figcaption>
        </figure>
      ))}
    </>
  );
}

function PillCards({ testimonials }: { testimonials: TestimonialDef[] }) {
  return (
    <>
      {testimonials.map((t) => (
        <figure key={t.n} style={{ margin: 0, flex: "none", width: "clamp(240px,22vw,320px)", padding: "20px 24px", boxSizing: "border-box", borderRadius: 999, border: "1px solid rgba(255,255,255,.09)", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 10, height: 10, transform: "rotate(45deg)", background: t.color, flex: "none" }} />
          <span style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>{t.n}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#a3a6b4", whiteSpace: "nowrap" }}>{t.city}</span>
        </figure>
      ))}
    </>
  );
}

export function Numbers({ testimonials }: NumbersProps) {
  return (
    <section aria-labelledby="num-t" style={{ padding: "clamp(96px,12vw,180px) 0 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,4vw,64px)" }}>
        <span id="num-t" style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>
          09 — Em números
        </span>
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 16 }}>
          {COUNTERS.map(([count, display, suffix], i) => (
            <div key={count} style={{ borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(56px,7vw,120px)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>
                <span data-count={count}>{display}</span>
                {suffix && <span style={{ color: "#ffd23f" }}>{suffix}</span>}
              </span>
              <span style={{ color: "#a3a6b4", fontSize: 16 }}>{LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div aria-label="Depoimentos" style={{ marginTop: "clamp(64px,8vw,120px)", display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
        <MarqueeTrack speed={70} hoverSlow rowStyle={{ display: "flex", gap: 16, paddingRight: 16 }}>
          <QuoteCards testimonials={testimonials} />
        </MarqueeTrack>
        <div aria-hidden="true">
          <MarqueeTrack speed={80} dir="right" hoverSlow rowStyle={{ display: "flex", gap: 16, paddingRight: 16 }}>
            <PillCards testimonials={testimonials} />
          </MarqueeTrack>
        </div>
      </div>
    </section>
  );
}
