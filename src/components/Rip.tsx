import type { CSSProperties } from "react";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import { CARDS } from "@/lib/data";

const FAN_IDS = ["c11", "c10", "c1", "c4", "c12"];

interface RipProps {
  boosterImage: string | null;
}

export function Rip({ boosterImage }: RipProps) {
  const packSkin: CSSProperties = boosterImage
    ? { backgroundImage: `url(${boosterImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(160deg,#ff6b3d 0%,#7a1d2a 46%,#1a0d18 100%)" };
  return (
    <div>
      <section data-rip id="rasgue" aria-labelledby="rip-t" style={{ position: "relative", height: "100vh", minHeight: 620, overflow: "hidden", background: "radial-gradient(60% 50% at 50% 55%,rgba(232,57,43,.18),rgba(232,57,43,0) 70%),#07080c" }}>
        <div style={{ position: "absolute", left: "clamp(20px,4vw,64px)", right: "clamp(20px,4vw,64px)", top: "clamp(96px,14vh,140px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 24, zIndex: 2, pointerEvents: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>04 — Rasgue o pacote</span>
            <h2 id="rip-t" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(36px,4.4vw,72px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
              Role para
              <br />
              <span style={{ color: "#a3a6b4" }}>rasgar.</span>
            </h2>
          </div>
          <span data-rip-hint style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>
            Role <span aria-hidden="true" style={{ width: 1, height: 28, background: "linear-gradient(#ffd23f,rgba(255,210,63,0))" }} />
          </span>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", paddingTop: "8vh" }}>
          <div data-pack style={{ position: "relative", width: "clamp(170px,19vw,260px)", aspectRatio: 0.58 }}>
            {FAN_IDS.map((id, i) => {
              const isHero = id === "c1";
              const isAlt = id === "c4";
              const name = CARDS.find((c) => c.id === id)?.name ?? "carta";
              return (
                <div
                  key={id}
                  data-fan-card
                  data-id={id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver ${name} ampliada`}
                  style={{
                    position: "absolute",
                    left: "8%",
                    right: "8%",
                    top: "8%",
                    aspectRatio: "63/88",
                    borderRadius: "4.8%/3.4%",
                    overflow: "hidden",
                    cursor: "zoom-in",
                    zIndex: isHero ? 3 : i === 1 || i === 3 ? 2 : 1,
                    boxShadow: isHero ? "0 24px 50px -10px rgba(0,0,0,.8),0 0 40px rgba(255,107,61,.35)" : "0 20px 40px -10px rgba(0,0,0,.7)",
                  }}
                >
                  <div data-fan-face style={{ position: "absolute", inset: 0, backgroundSize: "cover", backgroundColor: "#14161f" }} />
                  {(isHero || isAlt) && (
                    <div data-fan-holo aria-hidden="true" style={{ position: "absolute", inset: 0, mixBlendMode: "color-dodge", opacity: isHero ? 0.42 : 0.32, backgroundImage: "linear-gradient(110deg,#ff6b6b,#ffd36b,#6bffb8,#6bc8ff,#c48bff,#ff6b6b)", backgroundSize: "300% 100%" }} />
                  )}
                </div>
              );
            })}
            <div
              data-pack-body
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 5,
                clipPath: "polygon(0 15.8%,9% 14.3%,16% 16%,23% 14.4%,30% 16.2%,37% 14.3%,44% 16.1%,51% 14.5%,58% 16.3%,65% 14.2%,72% 16%,79% 14.4%,86% 16.2%,93% 14%,100% 15.5%,100% 100%,0 100%)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, borderRadius: 10, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.16)", ...packSkin }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "6%", background: "repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 2px,rgba(255,255,255,.06) 2px 6px)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "6%", background: "repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 2px,rgba(255,255,255,.06) 2px 6px)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.28) 45%,rgba(255,255,255,0) 60%)", mixBlendMode: "overlay" }} />
                {boosterImage && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "26%", background: "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0))" }} />}
                <span style={{ position: "absolute", left: 0, right: 0, top: "9%", textAlign: "center", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(243,241,234,.85)", textShadow: boosterImage ? "0 1px 4px rgba(0,0,0,.85)" : "none" }}>Booster · 10 cartas</span>
              </div>
            </div>
            <div
              data-pack-top
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 6,
                transformOrigin: "100% 15%",
                clipPath: "polygon(0 0,100% 0,100% 15.5%,93% 14%,86% 16.2%,79% 14.4%,72% 16%,65% 14.2%,58% 16.3%,51% 14.5%,44% 16.1%,37% 14.3%,30% 16.2%,23% 14.4%,16% 16%,9% 14.3%,0 15.8%)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, borderRadius: 10, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.16)", ...packSkin }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "6%", background: "repeating-linear-gradient(90deg,rgba(255,255,255,.3) 0 2px,rgba(255,255,255,.06) 2px 6px)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.28) 45%,rgba(255,255,255,0) 60%)", mixBlendMode: "overlay" }} />
                {boosterImage && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "55%", background: "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,0))" }} />}
                <span style={{ position: "absolute", left: 0, right: 0, top: "9%", textAlign: "center", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(243,241,234,.85)", textShadow: boosterImage ? "0 1px 4px rgba(0,0,0,.85)" : "none" }}>Booster · 10 cartas</span>
              </div>
            </div>
            <div data-rip-flash aria-hidden="true" style={{ position: "absolute", left: "-12%", right: "-12%", top: "15%", height: 4, marginTop: -2, background: "#fff", borderRadius: 4, boxShadow: "0 0 24px 6px rgba(255,230,160,.9)", opacity: 0, zIndex: 7 }} />
          </div>
        </div>
        <div data-rip-cta style={{ position: "absolute", left: 20, right: 20, bottom: "clamp(36px,7vh,72px)", zIndex: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 16, color: "#c9cad3", maxWidth: 420, textWrap: "pretty" }}>Dez cartas por pacote. Uma delas pode ser a sua lenda.</p>
          <a href="#boosters" data-iris-to="#boosters" data-liquid data-swap data-magnetic style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16 }}>
            <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#e8392b", zIndex: -1 }} />
            <span style={{ display: "block", overflow: "hidden", height: 22 }}>
              <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Comprar boosters</span>
                <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                  Comprar boosters
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
        <div data-card-zoom-backdrop aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(7,8,12,.86)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", opacity: 0, pointerEvents: "none" }} />
      </section>
    </div>
  );
}
