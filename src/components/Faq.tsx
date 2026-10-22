import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface FaqView {
  id: string;
  q: string;
  a: string;
  open: boolean;
  rows: string;
  op: number;
  rot: string;
  iconBg: string;
  iconColor: string;
}

interface FaqProps {
  faqs: FaqView[];
  onToggle: (i: number) => void;
}

export function Faq({ faqs, onToggle }: FaqProps) {
  return (
    <section id="faq" aria-labelledby="faq-t" style={{ padding: "clamp(96px,12vw,180px) clamp(20px,4vw,64px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>10 — FAQ</span>
          <h2 id="faq-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block" }}>Perguntas</span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block", color: "#a3a6b4" }}>frequentes.</span>
            </span>
          </h2>
          <p style={{ margin: 0, color: "#a3a6b4", fontSize: 16, lineHeight: 1.6 }}>
            Não achou? <a href="https://wa.me/5500000000000" target="_blank" rel="noopener">Fale com a gente no WhatsApp</a>.
          </p>
        </div>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          {faqs.map((f, i) => (
            <div key={f.id} style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
              <h3 style={{ margin: 0 }}>
                <button type="button" aria-expanded={f.open} aria-controls={f.id} onClick={() => onToggle(i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "26px 0", background: "none", border: 0, color: "#f3f1ea", textAlign: "left", fontFamily: FONT_DISPLAY, fontSize: "clamp(20px,2vw,26px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ position: "relative", flex: "none", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", background: f.iconBg, transform: `rotate(${f.rot})`, transition: "transform .5s cubic-bezier(.16,1,.3,1),background .3s" }}>
                    <span style={{ position: "absolute", left: 14, right: 14, top: 21, height: 2, background: f.iconColor }} />
                    <span style={{ position: "absolute", top: 14, bottom: 14, left: 21, width: 2, background: f.iconColor }} />
                  </span>
                </button>
              </h3>
              <div id={f.id} role="region" style={{ display: "grid", gridTemplateRows: f.rows, transition: "grid-template-rows .55s cubic-bezier(.16,1,.3,1)" }}>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ margin: 0, padding: "0 64px 28px 0", color: "#c9cad3", fontSize: 16, lineHeight: 1.65, opacity: f.op, transition: "opacity .4s", textWrap: "pretty" }}>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
