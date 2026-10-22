import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import { MarqueeTrack } from "./Marquee";

export function Sell() {
  return (
    <section id="venda" aria-labelledby="venda-t" style={{ padding: "clamp(72px,9vw,140px) 0", background: "#ffd23f", color: "#0a0b10", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ overflow: "hidden" }}>
        <MarqueeTrack speed={28} rowStyle={{ display: "flex", alignItems: "center", gap: 40, paddingRight: 40, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "clamp(64px,11vw,190px)", lineHeight: 1, letterSpacing: "-0.05em", whiteSpace: "nowrap" }}>
          <span>Compramos coleções</span>
          <span style={{ width: ".28em", height: ".28em", background: "#0a0b10", transform: "rotate(45deg)" }} />
          <span style={{ color: "rgba(0,0,0,0)", WebkitTextStroke: "2px #0a0b10" }}>Trocamos cartas</span>
          <span style={{ width: ".28em", height: ".28em", background: "#e8392b", transform: "rotate(45deg)" }} />
        </MarqueeTrack>
      </div>
      <div style={{ maxWidth: 1440, margin: "clamp(48px,6vw,88px) auto 0", padding: "0 clamp(20px,4vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>07 — Venda ou troque</span>
          <h2 id="venda-t" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(36px,4.4vw,68px)", lineHeight: 0.95, letterSpacing: "-0.04em", textWrap: "balance" }}>
            Aquele binder parado vale mais do que você imagina.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, maxWidth: 520, textWrap: "pretty" }}>
            Avaliamos coleções inteiras, binders e cartas avulsas. Pagamento via PIX na hora ou crédito na loja com 15% a mais.
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12, borderTop: "1.5px solid #0a0b10", paddingTop: 18 }}>
            {[
              ["01", "Envie fotos pelo WhatsApp"],
              ["02", "Proposta em até 24h"],
              ["03", "Receba no PIX ou em crédito"],
            ].map(([n, t]) => (
              <li key={n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".1em" }}>{n}</span>
                <span style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.35 }}>{t}</span>
              </li>
            ))}
          </ol>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener" data-liquid data-swap data-magnetic style={{ alignSelf: "flex-start", position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, background: "#0a0b10", color: "#f3f1ea", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16 }}>
            <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#e8392b", zIndex: -1 }} />
            <span style={{ display: "block", overflow: "hidden", height: 22 }}>
              <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Avaliar minha coleção no WhatsApp</span>
                <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap", color: "#0a0b10" }}>
                  Avaliar minha coleção no WhatsApp
                </span>
              </span>
            </span>
            <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
              <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
