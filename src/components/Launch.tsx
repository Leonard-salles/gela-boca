import Image from "next/image";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface LaunchProps {
  image: string | null;
}

export function Launch({ image }: LaunchProps) {
  return (
    <div style={{ marginTop: "clamp(96px,12vw,180px)" }}>
      <section
        data-launch
        id="lancamento"
        aria-labelledby="launch-t"
        style={{ position: "relative", minHeight: "100vh", boxSizing: "border-box", display: "flex", alignItems: "center", padding: "110px clamp(20px,4vw,64px) 60px", overflow: "hidden", background: "radial-gradient(80% 70% at 25% 50%,rgba(255,107,61,.16),rgba(255,107,61,0) 70%),#0b0a0e", borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "center" }}>
          <div style={{ position: "relative", display: "grid", placeItems: "center", minHeight: "min(68vh,620px)" }}>
            <div data-launch-glow aria-hidden="true" style={{ position: "absolute", width: "86%", aspectRatio: 1, borderRadius: "50%", background: "radial-gradient(closest-side,rgba(255,107,61,.55),rgba(255,107,61,0))", filter: "blur(30px)" }} />
            <div
              data-launch-box
              data-capture-src
              style={{
                position: "relative",
                width: "min(80%,440px)",
                aspectRatio: "1/1.08",
                borderRadius: 20,
                overflow: "hidden",
                backgroundImage: "linear-gradient(135deg,rgba(255,255,255,.05) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.05) 75%,transparent 75%),linear-gradient(160deg,#ff6b3d 0%,#6e1c22 50%,#170b12 100%)",
                backgroundSize: "36px 36px,100% 100%",
                boxShadow: "0 60px 120px -40px rgba(0,0,0,.9),inset 0 0 0 1px rgba(255,255,255,.18)",
              }}
            >
              {image && <Image src={image} alt="Elite Trainer Box Chamas Ancestrais" fill unoptimized sizes="(max-width: 768px) 80vw, 440px" style={{ objectFit: "contain", padding: "6%" }} />}
              <div style={{ position: "absolute", left: 0, right: 0, top: "24%", height: 1, background: "rgba(255,255,255,.3)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.22) 45%,rgba(255,255,255,0) 60%)", mixBlendMode: "overlay" }} />
              <span style={{ position: "absolute", left: 20, top: 20, padding: "6px 12px", borderRadius: 999, background: "#ffd23f", color: "#0a0b10", fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>Pré-venda</span>
              {!image && <span style={{ position: "absolute", left: 20, bottom: 20, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(243,241,234,.8)" }}>Foto · ETB Chamas Ancestrais</span>}
            </div>
          </div>
          <div data-dex style={{ position: "relative", border: "1px solid rgba(255,255,255,.12)", borderRadius: 28, background: "rgba(17,18,26,.78)", padding: "clamp(24px,3.4vw,48px)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 24 }}>
            <div data-scan aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: "linear-gradient(180deg,rgba(255,210,63,0),rgba(255,210,63,.09),rgba(255,210,63,0))", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>
              <span>03 — Lançamento em destaque</span>
              <span style={{ color: "#ffd23f" }}>Entrada Nº 001</span>
            </div>
            <h2 id="launch-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(44px,5.4vw,88px)", lineHeight: 0.92, letterSpacing: "-0.045em" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block" }}>Chamas</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block", color: "#ff6b3d" }}>Ancestrais.</span>
              </span>
            </h2>
            <p style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 14, lineHeight: 1.75, color: "#c9cad3", minHeight: "5.25em" }}>
              <span data-type>Elite Trainer Box com 9 boosters, protetores, dados e marcadores. Habitat natural: a prateleira do colecionador. Atenção: lote limitado a 40 unidades.</span>
              <span data-caret aria-hidden="true" style={{ color: "#ffd23f" }}>
                ▍
              </span>
            </p>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "minmax(0,1fr)", borderTop: "1px solid rgba(255,255,255,.1)" }}>
              {[
                ["Categoria", "Elite Trainer Box"],
                ["Lançamento", "14 de novembro de 2026"],
                ["Pré-venda", "R$ 599,90 no PIX"],
                ["Limite", "2 por CPF"],
              ].map(([k, v]) => (
                <div key={k} data-dex-row style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 15 }}>
                  <dt style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#a3a6b4" }}>{k}</dt>
                  <dd style={{ margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div data-countdown data-target="2026-11-14T10:00:00-03:00" role="timer" aria-label="Tempo até o lançamento" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 8 }}>
              {[
                ["d", "Dias", false],
                ["h", "Horas", false],
                ["m", "Min", false],
                ["s", "Seg", true],
              ].map(([cd, label, highlight]) => (
                <div key={cd as string} style={{ display: "flex", flexDirection: "column", gap: 6, padding: 14, borderRadius: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <span data-cd={cd} style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(28px,3vw,40px)", fontWeight: 600, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", color: highlight ? "#ffd23f" : undefined }}>
                    00
                  </span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <a href="#boosters" data-iris-to="#boosters" data-liquid data-swap data-magnetic style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16 }}>
                <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#ff6b3d", zIndex: -1 }} />
                <span style={{ display: "block", overflow: "hidden", height: 22 }}>
                  <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Garantir na pré-venda</span>
                    <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                      Garantir na pré-venda
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
                  <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
              <span style={{ fontSize: 14, color: "#a3a6b4" }}>Envio na data oficial de lançamento.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
