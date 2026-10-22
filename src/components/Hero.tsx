import Image from "next/image";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { HeroLayout } from "@/lib/viewModel";
import { CARDS } from "@/lib/data";
import { tcgdexCardImageUrlHD } from "@/lib/tcgdexImage";

interface HeroProps {
  L: HeroLayout;
  isMobile: boolean;
}

function hideImg(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

// Carta em destaque do "cartão" retrato lateral (sempre vem da TCGdex — ver
// regra do projeto em src/lib/tcgdexImage.ts). O GIF do banner, por sua vez,
// ocupa o fundo inteiro da seção (ver camada de background em cada slide).
const HERO_CARD_1 = tcgdexCardImageUrlHD(CARDS.find((c) => c.id === "c13")!.apiId); // Mewtwo ex
const HERO_CARD_2 = tcgdexCardImageUrlHD(CARDS.find((c) => c.id === "c7")!.apiId); // Rayquaza VMAX

export function Hero({ L, isMobile }: HeroProps) {
  const banner2Src = isMobile ? "/banners/banner-2-mobile.jpg" : "/banners/banner-2.jpg";
  return (
    <section
      data-hero
      id="top"
      tabIndex={0}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques da loja — use as setas do teclado"
      style={{ position: "relative", width: "100%", height: "100dvh", minHeight: 560, overflow: "hidden", outline: "none", touchAction: "pan-y", background: "#0a0b10" }}
    >
      {/* Slide 1 — novo drop */}
      <div
        data-slide
        role="group"
        aria-roledescription="slide"
        aria-label="1 de 2"
        style={{ position: "absolute", inset: 0, background: "radial-gradient(110% 90% at 80% 40%,rgba(232,57,43,.32),rgba(232,57,43,0) 60%),radial-gradient(60% 60% at 10% 100%,rgba(255,210,63,.10),rgba(255,210,63,0) 70%),#120a0d" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/banners/banner-1.jpg" alt="" fill unoptimized onError={hideImg} style={{ objectFit: "cover" }} />
        </div>
        {!isMobile && (
          <div data-hero-scrub style={{ position: "absolute", top: L.mTop, right: L.mRight, height: L.mH, width: L.mW, transform: L.mTf, zIndex: 1 }}>
            <div data-hp style={{ position: "relative", width: "100%", height: "100%" }}>
              <div data-hglow aria-hidden="true" style={{ position: "absolute", inset: "-10%", borderRadius: 60, background: "radial-gradient(closest-side,rgba(232,57,43,.6),rgba(232,57,43,0))", filter: "blur(40px)", opacity: L.glow, overflow: "hidden" }}>
                <Image src={HERO_CARD_1} alt="" fill unoptimized style={{ objectFit: "cover", filter: "blur(50px) saturate(1.5)", opacity: 0.7 }} />
              </div>
              <div data-hm style={{ position: "absolute", inset: 0, borderRadius: L.mR, overflow: "hidden", background: "#170c10", boxShadow: "0 40px 100px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08)" }}>
                <Image src={HERO_CARD_1} alt="Mewtwo ex — carta em destaque" fill unoptimized style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        )}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: L.scrim, background: "linear-gradient(180deg,rgba(10,11,16,.55) 0%,rgba(10,11,16,0) 25%,rgba(10,11,16,.4) 50%,rgba(10,11,16,.96) 82%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", justifyContent: L.tj, padding: `96px clamp(20px,4vw,64px) ${L.tpb}`, boxSizing: "border-box", pointerEvents: "none" }}>
          <div style={{ maxWidth: L.tmw, pointerEvents: "auto", display: "flex", flexDirection: "column", gap: "clamp(20px,2.4vw,30px)" }}>
            <div data-hf style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#f3f1ea" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8392b", boxShadow: "0 0 0 4px rgba(232,57,43,.25)" }} />
              Novo drop · Estoque lacrado
            </div>
            <h1 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(44px,6.6vw,116px)", lineHeight: 0.92, letterSpacing: "-0.045em", textWrap: "balance" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block" }}>Cada booster</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block" }}>esconde uma</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block", color: "#ffd23f" }}>lenda.</span>
              </span>
            </h1>
            <p data-hf style={{ maxWidth: 470, margin: 0, fontSize: "clamp(16px,1.25vw,19px)", lineHeight: 1.55, color: "#d3d4dc", textWrap: "pretty" }}>
              Cartas avulsas, boosters e boxes 100% originais, com envio rápido para todo o Brasil.
            </p>
            <div data-hf style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
              <a href="#produtos" data-iris-to="#produtos" data-liquid data-swap data-magnetic style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>
                <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#e8392b", zIndex: -1 }} />
                <span style={{ display: "block", overflow: "hidden", height: 22 }}>
                  <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Abrir meu booster agora</span>
                    <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                      Abrir meu booster agora
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
                  <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
              <a href="#lancamento" data-iris-to="#lancamento" style={{ fontSize: 15, fontWeight: 500, color: "#f3f1ea", textDecoration: "underline", textDecorationColor: "rgba(243,241,234,.35)", textUnderlineOffset: 6, minHeight: 44, display: "inline-flex", alignItems: "center" }}>
                Ver pré-venda
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 — nossa loja */}
      <div
        data-slide
        role="group"
        aria-roledescription="slide"
        aria-label="2 de 2"
        style={{ position: "absolute", inset: 0, background: "radial-gradient(110% 90% at 80% 40%,rgba(47,107,255,.36),rgba(47,107,255,0) 60%),radial-gradient(60% 60% at 10% 100%,rgba(255,210,63,.12),rgba(255,210,63,0) 70%),#0a0e1c" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={banner2Src} alt="" fill unoptimized onError={hideImg} style={{ objectFit: "cover" }} />
        </div>
        {!isMobile && (
          <div data-hero-scrub style={{ position: "absolute", top: L.mTop, right: L.mRight, height: L.mH, width: L.mW, transform: L.mTf, zIndex: 1 }}>
            <div data-hp style={{ position: "relative", width: "100%", height: "100%" }}>
              <div data-hglow aria-hidden="true" style={{ position: "absolute", inset: "-10%", borderRadius: 60, background: "radial-gradient(closest-side,rgba(47,107,255,.65),rgba(47,107,255,0))", filter: "blur(40px)", opacity: L.glow, overflow: "hidden" }}>
                <Image src={HERO_CARD_2} alt="" fill unoptimized style={{ objectFit: "cover", filter: "blur(50px) saturate(1.5)", opacity: 0.7 }} />
              </div>
              <div data-hm style={{ position: "absolute", inset: 0, borderRadius: L.mR, overflow: "hidden", background: "#0c1124", boxShadow: "0 40px 100px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08)" }}>
                <Image src={HERO_CARD_2} alt="Rayquaza VMAX — carta em destaque" fill unoptimized style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        )}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: L.scrim, background: "linear-gradient(180deg,rgba(10,11,16,.55) 0%,rgba(10,11,16,0) 25%,rgba(10,11,16,.4) 50%,rgba(10,11,16,.96) 82%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", justifyContent: L.tj, padding: `96px clamp(20px,4vw,64px) ${L.tpb}`, boxSizing: "border-box", pointerEvents: "none" }}>
          <div style={{ maxWidth: L.tmw, pointerEvents: "auto", display: "flex", flexDirection: "column", gap: "clamp(20px,2.4vw,30px)" }}>
            <h2 style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.6vw,100px)", lineHeight: 0.92, letterSpacing: "-0.045em", textWrap: "balance" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block" }}>Chame seus amigos</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block" }}>e venha se divertir</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".07em" }}>
                <span data-hl style={{ display: "block", color: "#ffd23f" }}>na nossa loja</span>
              </span>
            </h2>
            <p data-hf style={{ maxWidth: 480, margin: 0, fontSize: "clamp(16px,1.25vw,19px)", lineHeight: 1.55, color: "#d3d4dc", textWrap: "pretty" }}>
              Mesas para jogar, trocas entre treinadores e muito booster para abrir juntos. Sua próxima partida começa aqui.
            </p>
            <div data-hf style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
              <a href="#nossa-loja" data-iris-to="#nossa-loja" data-liquid data-swap data-magnetic style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, background: "#f3f1ea", color: "#0a0b10", textDecoration: "none", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>
                <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#ffd23f", zIndex: -1 }} />
                <span style={{ display: "block", overflow: "hidden", height: 22 }}>
                  <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Convoque seu time e venha</span>
                    <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                      Convoque seu time e venha
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
                  <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
              <a href="#nossa-loja" data-iris-to="#nossa-loja" style={{ fontSize: 15, fontWeight: 500, color: "#f3f1ea", textDecoration: "underline", textDecorationColor: "rgba(243,241,234,.35)", textUnderlineOffset: 6, minHeight: 44, display: "inline-flex", alignItems: "center" }}>
                Ver agenda de eventos
              </a>
            </div>
          </div>
        </div>
      </div>

      <div data-wipe-ring aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, borderRadius: "50%", border: "14px solid", borderColor: "#e8392b #e8392b #f3f1ea #f3f1ea", boxSizing: "border-box", zIndex: 5, pointerEvents: "none", opacity: 0, boxShadow: "0 0 0 4px #0a0b10,inset 0 0 0 4px #0a0b10" }} />

      <div style={{ position: "absolute", zIndex: 6, left: "clamp(20px,4vw,64px)", right: "clamp(20px,4vw,64px)", bottom: "clamp(20px,4dvh,40px)", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px 20px", pointerEvents: "none" }}>
        <div data-hero-ui style={{ display: "flex", gap: 14, pointerEvents: "auto" }}>
          <button type="button" data-ind="0" aria-label="Ir para o destaque 1: Novo drop" style={{ display: "flex", flexDirection: "column", gap: 10, width: "clamp(96px,10vw,150px)", background: "none", border: 0, padding: "10px 0", color: "#f3f1ea", textAlign: "left" }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>01 · Novo drop</span>
            <span style={{ position: "relative", display: "block", height: 2, background: "rgba(255,255,255,.2)", overflow: "hidden", borderRadius: 2 }}>
              <span data-ind-bar style={{ position: "absolute", inset: 0, background: "#f3f1ea", transformOrigin: "left center", transform: "scaleX(0)" }} />
            </span>
          </button>
          <button type="button" data-ind="1" aria-label="Ir para o destaque 2: Nossa loja" style={{ display: "flex", flexDirection: "column", gap: 10, width: "clamp(96px,10vw,150px)", background: "none", border: 0, padding: "10px 0", color: "#f3f1ea", textAlign: "left" }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>02 · Nossa loja</span>
            <span style={{ position: "relative", display: "block", height: 2, background: "rgba(255,255,255,.2)", overflow: "hidden", borderRadius: 2 }}>
              <span data-ind-bar style={{ position: "absolute", inset: 0, background: "#f3f1ea", transformOrigin: "left center", transform: "scaleX(0)" }} />
            </span>
          </button>
        </div>
        <div data-hero-ui style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
          <button type="button" data-hero-prev aria-label="Destaque anterior" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.2)", background: "rgba(10,11,16,.35)", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" data-hero-next aria-label="Próximo destaque" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.2)", background: "rgba(10,11,16,.35)", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
