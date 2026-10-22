import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { CardView } from "@/lib/viewModel";

interface Tab {
  id: string;
  label: string;
  active: boolean;
  color: string;
}

interface CardsCarouselProps {
  tabs: Tab[];
  cardsView: CardView[];
  apiNote: string;
  onSetTab: (id: string) => void;
  onAddToCart: (item: { id: string; name: string; sub: string; price: number; color: string }, btn: HTMLElement) => void;
}

export function CardsCarousel({ tabs, cardsView, apiNote, onSetTab, onAddToCart }: CardsCarouselProps) {
  return (
    <section id="cartas" aria-labelledby="cartas-t" style={{ padding: "clamp(96px,12vw,180px) 0 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,4vw,64px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>02 — Passe o mouse para revelar</span>
          <h2 id="cartas-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block" }}>Cartas em</span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-li style={{ display: "block", color: "#a3a6b4" }}>destaque.</span>
            </span>
          </h2>
        </div>
        <div role="tablist" aria-label="Filtrar cartas" data-ind-group style={{ position: "relative", display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <span data-ind-mark aria-hidden="true" style={{ position: "absolute", left: 0, bottom: -1, height: 2, width: 0, background: "#ffd23f", opacity: 0 }} />
          {tabs.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={t.active} data-active={String(t.active)} onClick={() => onSetTab(t.id)} style={{ height: 48, padding: "0 14px", background: "none", border: 0, color: t.color, fontSize: 15, fontWeight: 500, transition: "color .3s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div data-track-vp data-cursor="drag" tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Cartas em destaque. Use as setas esquerda e direita." style={{ marginTop: 40, overflow: "hidden", touchAction: "pan-y", userSelect: "none", WebkitMaskImage: "linear-gradient(90deg,transparent 0,#000 4%,#000 96%,transparent 100%)", maskImage: "linear-gradient(90deg,transparent 0,#000 4%,#000 96%,transparent 100%)" }}>
        <div data-track style={{ display: "flex", gap: "clamp(18px,2vw,28px)", padding: "28px clamp(20px,4vw,64px) 32px", width: "max-content", perspective: 1400 }}>
          {cardsView.map((c) => (
            <article key={c.id} data-card-item data-id={c.id} data-tier={c.tier} aria-label={`${c.name}, ${c.rarity}`} style={{ flex: "none", width: "clamp(232px,21vw,300px)", display: "flex", flexDirection: "column", gap: 18 }}>
              <div data-lift data-capture-src style={{ position: "relative", aspectRatio: "63/88" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: "8% 6% -4%", background: c.color, filter: "blur(30px)", opacity: 0.2, borderRadius: 24 }} />
                <div data-tilt-inner style={{ position: "absolute", inset: 0, borderRadius: "4.8%/3.4%", overflow: "hidden", background: "#0d0e14", boxShadow: "0 30px 60px -22px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.09)" }}>
                  <div
                    data-back
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      backgroundImage:
                        "repeating-linear-gradient(45deg,rgba(255,210,63,.08) 0 1px,transparent 1px 14px),repeating-linear-gradient(-45deg,rgba(255,210,63,.08) 0 1px,transparent 1px 14px),radial-gradient(80% 60% at 50% 50%,#2c1420,#0f0b12 72%)",
                    }}
                  >
                    <div style={{ position: "absolute", inset: "6%", border: "1px solid rgba(255,210,63,.35)", borderRadius: "3%/2.2%" }} />
                    <div style={{ width: "36%", aspectRatio: 1, transform: "rotate(45deg)", border: "1px solid rgba(255,210,63,.6)", display: "grid", placeItems: "center", background: "linear-gradient(135deg,rgba(232,57,43,.55),rgba(10,11,16,.2))" }}>
                      <div style={{ width: "38%", aspectRatio: 1, borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 4px #0a0b10,0 0 24px rgba(255,210,63,.6)" }} />
                    </div>
                    <span style={{ position: "absolute", bottom: "10%", left: 0, right: 0, textAlign: "center", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: ".3em", color: "rgba(255,210,63,.75)" }}>Nº {c.num}</span>
                  </div>
                  <div data-blocks aria-hidden="true" style={{ position: "absolute", inset: 0 }} />
                  <div data-holo aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", mixBlendMode: "color-dodge", backgroundImage: "repeating-linear-gradient(110deg,#ff6b6b 0%,#ffd36b 6%,#6bffb8 12%,#6bc8ff 18%,#c48bff 24%,#ff6b6b 30%)", backgroundSize: "300% 300%", backgroundPosition: "var(--bx,50%) var(--by,50%)", filter: "saturate(1.2) brightness(.9)" }} />
                  <div
                    data-glitter
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      pointerEvents: "none",
                      mixBlendMode: "color-dodge",
                      backgroundImage: "radial-gradient(circle,rgba(255,255,255,.95) 0 .7px,transparent 1.3px),radial-gradient(circle,rgba(255,236,190,.85) 0 .6px,transparent 1.1px)",
                      backgroundSize: "9px 11px,13px 7px",
                      backgroundPosition: "0 0,4px 3px",
                      WebkitMaskImage: "radial-gradient(circle at var(--mx,50%) var(--my,50%),#000 0,transparent 48%)",
                      maskImage: "radial-gradient(circle at var(--mx,50%) var(--my,50%),#000 0,transparent 48%)",
                    }}
                  />
                  <div data-glare aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", mixBlendMode: "overlay", background: "radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.7),rgba(255,255,255,0) 52%)" }} />
                  <div data-sheen aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "100%", pointerEvents: "none", transform: "translateX(-130%)", background: "linear-gradient(100deg,rgba(255,255,255,0) 35%,rgba(255,255,255,.6) 50%,rgba(255,255,255,0) 65%)", mixBlendMode: "overlay" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 2px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <h3 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.name}</h3>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#a3a6b4" }}>{c.num}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span data-shiny style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px", borderRadius: 999, border: `1px solid ${c.badge}`, color: c.badge, fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase" }}>
                    <span data-shiny-sweep aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", background: "linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.55),rgba(255,255,255,0))", transform: "translateX(-120%)" }} />
                    <span aria-hidden="true" style={{ width: 6, height: 6, background: c.badge, transform: "rotate(45deg)" }} />
                    {c.rarity}
                  </span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "#a3a6b4" }}>
                    {c.typeLabel} · {c.cond}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, marginTop: 4 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {c.pix} <span style={{ fontSize: 12, fontWeight: 500, color: "#a3a6b4" }}>no PIX</span>
                    </span>
                    <span style={{ fontSize: 12.5, color: "#a3a6b4" }}>{c.inst}</span>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: "#7b7f8e" }}>{c.priceSrc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => onAddToCart({ id: c.id, name: c.name, sub: `${c.set} · ${c.num} · ${c.cond}`, price: c.price, color: c.color }, e.currentTarget)}
                    data-press
                    aria-label={`Adicionar ${c.name} ao carrinho`}
                    style={{ flex: "none", height: 44, padding: "0 18px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", border: 0, fontWeight: 600, fontSize: 14 }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "4px clamp(20px,4vw,64px) 0", display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".06em", color: "#7b7f8e", maxWidth: 340 }}>{apiNote}</span>
        <div aria-hidden="true" style={{ flex: 1, height: 2, background: "rgba(255,255,255,.12)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
          <div data-track-thumb style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "30%", background: "#ffd23f", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" data-car-prev aria-label="Cartas anteriores" data-magnetic style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", background: "none", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" data-car-next aria-label="Próximas cartas" data-magnetic style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", background: "none", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
