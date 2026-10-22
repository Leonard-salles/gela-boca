import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { CondDef } from "@/lib/types";

interface CondBadge {
  id: string;
  active: boolean;
  color: string;
}

interface CondDisplay extends CondDef {
  pctW: string;
  w1: number;
  w2: number;
  w3: number;
}

interface AuthenticityProps {
  conds: CondBadge[];
  cond: CondDisplay;
  condLeft: string;
  onSetCond: (id: string) => void;
}

const STEPS = [
  { n: "01", title: "Lupa e luz", desc: "Centralização, bordas, cantos e superfície inspecionados sob luz direta e lupa de 10x." },
  { n: "02", title: "Impressão e textura", desc: "Comparação de padrão de impressão, fonte e textura com uma carta de referência da mesma coleção." },
  { n: "03", title: "Classificação NM a HP", desc: "Dois avaliadores atribuem a condição. Se discordarem, vale a mais conservadora." },
  { n: "04", title: "Proteção e lacre", desc: "Sleeve, toploader e saquinho selado com etiqueta de condição. Do nosso cofre direto para o seu." },
];

export function Authenticity({ conds, cond, condLeft, onSetCond }: AuthenticityProps) {
  return (
    <section id="autenticidade" aria-labelledby="cond-t" style={{ padding: "clamp(96px,12vw,180px) clamp(20px,4vw,64px)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>06 — Condição e autenticidade</span>
          <h2 id="cond-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block" }}>Sem surpresa</span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block", color: "#a3a6b4" }}>na condição.</span>
            </span>
          </h2>
        </div>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div role="radiogroup" aria-label="Escala de condição" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", padding: 5, borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", background: "#0f1117" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: 5, bottom: 5, left: condLeft, width: "calc((100% - 10px) / 4)", borderRadius: 999, background: "#ffd23f", transition: "left .55s cubic-bezier(.16,1,.3,1)" }} />
              {conds.map((k) => (
                <button key={k.id} type="button" role="radio" aria-checked={k.active} onClick={() => onSetCond(k.id)} style={{ position: "relative", zIndex: 1, height: 52, border: 0, background: "none", color: k.color, fontFamily: FONT_MONO, fontWeight: 600, fontSize: 15, letterSpacing: ".06em", transition: "color .35s" }}>
                  {k.id}
                </button>
              ))}
            </div>
            <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: "clamp(28px,2.8vw,40px)", fontWeight: 600, letterSpacing: "-0.03em" }}>{cond.name}</h3>
              <p style={{ margin: 0, color: "#c9cad3", fontSize: 17, lineHeight: 1.6, maxWidth: 520, minHeight: "3.2em", textWrap: "pretty" }}>{cond.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>
                  <span style={{ color: "#a3a6b4" }}>Conservação</span>
                  <span>{cond.mult}</span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: cond.pctW, background: "#ffd23f", borderRadius: 6, transition: "width .6s cubic-bezier(.16,1,.3,1)" }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <div style={{ position: "relative", width: "min(100%,320px)", aspectRatio: "63/88", borderRadius: "4.8%/3.4%", overflow: "hidden", boxShadow: "0 40px 80px -30px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.1)" }}>
              <div data-cond-face data-id="c1" style={{ position: "absolute", inset: 0, backgroundSize: "cover", backgroundColor: "#14161f" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", boxShadow: "inset 0 0 0 3px rgba(255,255,255,.85),inset 0 0 18px 5px rgba(255,255,255,.5)", opacity: cond.w1, transition: "opacity .5s" }} />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  mixBlendMode: "screen",
                  opacity: cond.w2,
                  transition: "opacity .5s",
                  backgroundImage:
                    "repeating-linear-gradient(72deg,rgba(255,255,255,0) 0 38px,rgba(255,255,255,.4) 38px 39px,rgba(255,255,255,0) 39px 90px),repeating-linear-gradient(-30deg,rgba(255,255,255,0) 0 60px,rgba(255,255,255,.28) 60px 61px,rgba(255,255,255,0) 61px 140px)",
                }}
              />
              <div aria-hidden="true" style={{ position: "absolute", left: "-10%", right: "-10%", top: "58%", height: 3, background: "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.75),rgba(0,0,0,.6),rgba(255,255,255,0))", transform: "rotate(-14deg)", opacity: cond.w3, transition: "opacity .5s" }} />
              <span style={{ position: "absolute", right: 12, top: 12, padding: "5px 10px", borderRadius: 999, background: "#0a0b10", color: "#ffd23f", fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600, letterSpacing: ".1em" }}>{cond.id}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "clamp(96px,10vw,160px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "clamp(32px,5vw,80px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h3 data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(30px,3.2vw,48px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block" }}>Como verificamos</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block", color: "#a3a6b4" }}>cada carta.</span>
              </span>
            </h3>
            <p data-reveal="fade" style={{ margin: 0, color: "#a3a6b4", fontSize: 16, lineHeight: 1.6, maxWidth: 400 }}>Quatro etapas antes de qualquer carta ganhar preço e foto na loja.</p>
          </div>
          <div data-steps style={{ position: "relative", paddingLeft: 64, display: "flex", flexDirection: "column", gap: 56 }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,.08)" }} />
            <svg data-draw-svg aria-hidden="true" viewBox="0 0 40 100" preserveAspectRatio="none" style={{ position: "absolute", left: 4, top: 0, width: 40, height: "100%", overflow: "visible" }}>
              <path data-draw-path d="M20 0 L20 100" fill="none" stroke="#ffd23f" strokeWidth={2} strokeLinecap="round" />
            </svg>
            {STEPS.map((s) => (
              <div key={s.n} data-step style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
                <span data-step-dot aria-hidden="true" style={{ position: "absolute", left: -47, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#2a2d3a", transform: "scale(.7)" }} />
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#ffd23f" }}>Passo {s.n}</span>
                <h4 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.title}</h4>
                <p style={{ margin: 0, color: "#c9cad3", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
