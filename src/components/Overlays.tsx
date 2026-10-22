import { FONT_BODY, FONT_MONO } from "@/lib/fonts";

// Camadas fixas globais: preloader (Pokébola), transição "íris", cursor
// personalizado e barra de progresso de scroll. Porte 1:1 do protótipo —
// toda a animação é feita pelo motor em lib/fx.ts via data-attributes.

export function Preloader() {
  return (
    <div data-preloader aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#0a0b10", display: "grid", placeItems: "center", overflow: "hidden" }}>
      <div data-pl-top style={{ position: "absolute", left: 0, right: 0, top: 0, height: "50%", background: "#e8392b", visibility: "hidden", borderBottom: "16px solid #0a0b10", boxSizing: "border-box" }} />
      <div data-pl-bot style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "50%", background: "#f3f1ea", visibility: "hidden", borderTop: "16px solid #0a0b10", boxSizing: "border-box" }} />
      <div data-pl-ball style={{ position: "relative", width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(#e8392b 0 46%,#0a0b10 46% 54%,#f3f1ea 54%)", boxShadow: "0 0 0 5px #0a0b10,0 30px 60px rgba(0,0,0,.6)" }}>
        <div data-pl-btn style={{ position: "absolute", left: "50%", top: "50%", width: 34, height: 34, margin: "-17px 0 0 -17px", borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 6px #0a0b10" }} />
      </div>
      <div data-pl-meta style={{ position: "absolute", left: 0, right: 0, bottom: "12vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span data-pl-num style={{ fontFamily: FONT_MONO, fontSize: 14, letterSpacing: ".2em", color: "#f3f1ea" }}>
          000%
        </span>
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#a3a6b4" }}>Abrindo o cofre</span>
      </div>
      <div data-pl-flash style={{ position: "absolute", inset: 0, background: "#fffbe8", opacity: 0, pointerEvents: "none" }} />
    </div>
  );
}

export function IrisOverlay() {
  return (
    <div
      data-iris
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 950,
        visibility: "hidden",
        clipPath: "circle(0px at 50% 50%)",
        background: "linear-gradient(#e8392b 0 calc(50% - 10px),#0a0b10 calc(50% - 10px) calc(50% + 10px),#f3f1ea calc(50% + 10px))",
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 12px #0a0b10" }} />
    </div>
  );
}

export function CursorEl() {
  return (
    <div data-cursor-el aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 9999, pointerEvents: "none", display: "none" }}>
      <div data-cursor-disk style={{ position: "absolute", left: -46, top: -46, width: 92, height: 92, borderRadius: "50%", background: "#f3f1ea", transform: "scale(0)", opacity: 0, display: "grid", placeItems: "center" }}>
        <span data-cursor-label style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12, color: "#0a0b10", whiteSpace: "nowrap" }}>
          Ver
        </span>
      </div>
      <div data-cursor-ball style={{ position: "absolute", left: -9, top: -9, width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 1.5px #0a0b10,0 0 0 3px rgba(243,241,234,.35)" }}>
        <div style={{ position: "absolute", left: 6, top: 6, width: 6, height: 6, borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 1.5px #0a0b10" }} />
      </div>
    </div>
  );
}

export function ProgressBar() {
  return (
    <div aria-hidden="true" style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 16, zIndex: 90, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 1, background: "rgba(255,255,255,.08)" }} />
      <div data-prog-fill style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 1, background: "#ffd23f", transformOrigin: "left center", transform: "scaleX(0)" }} />
      <div data-prog-ball style={{ position: "absolute", left: 0, bottom: 0, width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 1px #0a0b10" }}>
        <div style={{ position: "absolute", left: 4.5, top: 4.5, width: 5, height: 5, borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 1px #0a0b10" }} />
      </div>
    </div>
  );
}
