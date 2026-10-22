import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { EventDef, GalleryDef } from "@/lib/types";
import { MarqueeTrack } from "./Marquee";

interface OurStoreProps {
  events: EventDef[];
  galleryA: GalleryDef[];
  galleryB: GalleryDef[];
}

function GalleryRow({ items }: { items: GalleryDef[] }) {
  return (
    <>
      {items.map((g) => (
        <figure
          key={g.label}
          data-cursor="view"
          style={{ margin: 0, flex: "none", width: g.w, height: "clamp(180px,20vw,300px)", borderRadius: 20, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,.08)", backgroundImage: "linear-gradient(135deg,rgba(255,255,255,.04) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.04) 50%,rgba(255,255,255,.04) 75%,transparent 75%)", backgroundSize: "32px 32px", backgroundColor: "#11131a" }}
        >
          <figcaption style={{ position: "absolute", left: 16, bottom: 14, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#a3a6b4" }}>{g.label}</figcaption>
        </figure>
      ))}
    </>
  );
}

export function OurStore({ events, galleryA, galleryB }: OurStoreProps) {
  return (
    <section id="nossa-loja" aria-labelledby="loja-t" style={{ padding: "clamp(96px,12vw,180px) 0 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,4vw,64px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>08 — Nossa loja &amp; eventos</span>
            <h2 id="loja-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block" }}>Mesa posta.</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block", color: "#a3a6b4" }}>Traga seu deck.</span>
              </span>
            </h2>
          </div>
          <p data-reveal="fade" style={{ maxWidth: 400, margin: 0, color: "#a3a6b4", fontSize: 16, lineHeight: 1.6, textWrap: "pretty" }}>
            Doze lugares para jogar, binders da casa para trocar e uma liga toda semana. Chame o grupo.
          </p>
        </div>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 16 }}>
          <div data-reveal="fade" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, background: "#101219", padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>Endereço</span>
              <address style={{ fontStyle: "normal", fontSize: 18, lineHeight: 1.5 }}>
                Rua [Endereço], 000 — Bairro
                <br />
                Cidade · UF · 00000-000
              </address>
            </div>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "minmax(0,1fr)", borderTop: "1px solid rgba(255,255,255,.1)" }}>
              {[
                ["Terça a sexta", "13h às 21h"],
                ["Sábado", "10h às 22h"],
                ["Domingo", "12h às 19h"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                  <dt style={{ color: "#a3a6b4" }}>{k}</dt>
                  <dd style={{ margin: 0 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: "auto" }}>
              <a href="https://maps.google.com" target="_blank" rel="noopener" data-liquid data-swap data-magnetic style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 56, padding: "0 6px 0 24px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 15 }}>
                <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 6, top: 6, width: 44, height: 44, borderRadius: "50%", background: "#3fa7ff", zIndex: -1 }} />
                <span style={{ display: "block", overflow: "hidden", height: 22 }}>
                  <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Como chegar</span>
                    <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                      Como chegar
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
                  <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener" style={{ fontSize: 15, fontWeight: 500, minHeight: 44, display: "inline-flex", alignItems: "center" }}>
                Reservar uma mesa
              </a>
            </div>
          </div>
          <div data-reveal="fade" data-delay="0.1" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, background: "#101219", padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4", marginBottom: 12 }}>Agenda</span>
            {events.map((ev) => (
              <div key={ev.title} style={{ display: "grid", gridTemplateColumns: "64px minmax(0,1fr) auto", gap: 18, alignItems: "center", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 64, borderRadius: 14, background: "rgba(255,255,255,.05)" }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em" }}>{ev.d}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>{ev.m}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{ev.title}</span>
                  <span style={{ fontSize: 14, color: "#a3a6b4" }}>{ev.meta}</span>
                </div>
                <span style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(255,210,63,.4)", color: "#ffd23f", fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".06em", whiteSpace: "nowrap" }}>{ev.spots}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div aria-label="Galeria da loja" style={{ marginTop: "clamp(64px,8vw,120px)", display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
        <MarqueeTrack speed={60} hoverSlow rowStyle={{ display: "flex", gap: 16, paddingRight: 16 }}>
          <GalleryRow items={galleryA} />
        </MarqueeTrack>
        <MarqueeTrack speed={70} dir="right" hoverSlow rowStyle={{ display: "flex", gap: 16, paddingRight: 16 }}>
          <GalleryRow items={galleryB} />
        </MarqueeTrack>
      </div>
    </section>
  );
}
