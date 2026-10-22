import Image from "next/image";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { ProductView } from "@/lib/viewModel";

interface Chip {
  id: string;
  label: string;
  active: boolean;
  color: string;
}

interface ProductsGridProps {
  chips: Chip[];
  productsView: ProductView[];
  onSetFilter: (id: string) => void;
  onAddToCart: (item: { id: string; name: string; sub: string; price: number; color: string }, btn: HTMLElement) => void;
}

export function ProductsGrid({ chips, productsView, onSetFilter, onAddToCart }: ProductsGridProps) {
  return (
    <section id="boosters" data-zone-end aria-labelledby="grid-t" style={{ padding: "clamp(96px,12vw,180px) clamp(20px,4vw,64px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>05 — Lacrados de fábrica</span>
            <h2 id="grid-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block" }}>Boosters</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block", color: "#a3a6b4" }}>&amp; Boxes.</span>
              </span>
            </h2>
          </div>
          <div role="group" aria-label="Filtrar produtos" data-ind-group style={{ position: "relative", display: "flex", gap: 2, padding: 5, border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, maxWidth: "100%" }}>
            <span data-ind-mark aria-hidden="true" style={{ position: "absolute", left: 0, top: 5, bottom: 5, width: 0, borderRadius: 999, background: "#f3f1ea", opacity: 0 }} />
            {chips.map((ch) => (
              <button key={ch.id} type="button" data-active={String(ch.active)} aria-pressed={ch.active} onClick={() => onSetFilter(ch.id)} style={{ position: "relative", zIndex: 1, height: 40, padding: "0 clamp(10px,1.2vw,18px)", borderRadius: 999, background: "none", border: 0, color: ch.color, fontSize: 14, fontWeight: 500, transition: "color .35s", whiteSpace: "nowrap" }}>
                {ch.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: 16 }}>
          {productsView.map((p) => (
            <article key={p.id} data-grid-item data-flip-id={p.id} style={{ display: p.display, flexDirection: "column", border: "1px solid rgba(255,255,255,.09)", borderRadius: 22, background: "#101219", overflow: "hidden" }}>
              <div data-capture-src style={{ position: "relative", aspectRatio: "1/1", display: "grid", placeItems: "center", backgroundImage: `radial-gradient(60% 55% at 50% 45%,${p.glow},rgba(0,0,0,0) 70%),linear-gradient(135deg,rgba(255,255,255,.03) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.03) 50%,rgba(255,255,255,.03) 75%,transparent 75%)`, backgroundSize: "100% 100%,24px 24px", backgroundColor: "#0d0f15" }}>
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 260px" style={{ objectFit: "contain", padding: "12%" }} unoptimized />
                ) : (
                  <>
                    <div aria-hidden="true" style={{ position: "relative", width: p.silW, height: p.silH, borderRadius: p.silR, overflow: "hidden", background: `linear-gradient(160deg,${p.color},#1a0d18 82%)`, boxShadow: "0 30px 50px -20px rgba(0,0,0,.85),inset 0 0 0 1px rgba(255,255,255,.2)" }}>
                      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "8%", background: "repeating-linear-gradient(90deg,rgba(255,255,255,.28) 0 2px,rgba(255,255,255,.05) 2px 6px)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.25) 45%,rgba(255,255,255,0) 60%)", mixBlendMode: "overlay" }} />
                    </div>
                    <span style={{ position: "absolute", left: 14, bottom: 12, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#7b7f8e" }}>Foto do produto</span>
                  </>
                )}
                <span style={{ position: "absolute", left: 14, top: 14, padding: "5px 10px", borderRadius: 999, background: "rgba(10,11,16,.7)", border: "1px solid rgba(255,255,255,.14)", fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase" }}>{p.kindLabel}</span>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, textWrap: "balance" }}>{p.name}</h3>
                  <span style={{ fontSize: 13.5, color: "#a3a6b4" }}>{p.meta}</span>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    <span style={{ color: "#a3a6b4", overflow: "hidden", textOverflow: "ellipsis" }}>HP · {p.hpNote}</span>
                    <span style={{ color: p.hpColor }}>{p.hpLabel}</span>
                  </div>
                  <div role="meter" aria-label="Estoque" aria-valuenow={p.stock} aria-valuemin={0} aria-valuemax={p.max} style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.08)", overflow: "hidden", marginTop: 10 }}>
                    <div style={{ height: "100%", width: p.hpW, background: p.hpColor, borderRadius: 6, boxShadow: `0 0 12px ${p.hpColor}` }} />
                  </div>
                </div>
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {p.pix} <span style={{ fontSize: 12, fontWeight: 500, color: "#a3a6b4" }}>no PIX</span>
                  </span>
                  <span style={{ fontSize: 12.5, color: "#a3a6b4" }}>{p.inst}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => onAddToCart({ id: p.id, name: p.name, sub: p.meta, price: p.price, color: p.color }, e.currentTarget)}
                  data-press
                  aria-label={`Adicionar ${p.name} ao carrinho`}
                  className="group/add"
                  style={{ height: 48, borderRadius: 999, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.04)", color: "#f3f1ea", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                >
                  <span aria-hidden="true" style={{ position: "relative", width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 1px rgba(243,241,234,.5)" }} />
                  Adicionar ao carrinho
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
