import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface FooterProps {
  storeName: string;
  storeLetters: string[];
}

const PAYMENTS = ["PIX", "Visa", "Mastercard", "Elo", "Amex", "Boleto"];

export function Footer({ storeName, storeLetters }: FooterProps) {
  return (
    <footer style={{ padding: "clamp(72px,8vw,120px) clamp(20px,4vw,64px) 40px", borderTop: "1px solid rgba(255,255,255,.08)", background: "#07080c", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>{storeName}</span>
            <p style={{ margin: 0, color: "#a3a6b4", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>Cartas avulsas, boosters e boxes originais. Loja física e envio para todo o Brasil.</p>
          </div>
          <nav aria-label="Loja" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4", marginBottom: 8 }}>Loja</span>
            <a href="#cartas" data-iris-to="#cartas" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Cartas avulsas</a>
            <a href="#boosters" data-iris-to="#boosters" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Boosters &amp; boxes</a>
            <a href="#lancamento" data-iris-to="#lancamento" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Pré-venda</a>
            <a href="#venda" data-iris-to="#venda" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Venda suas cartas</a>
          </nav>
          <nav aria-label="Ajuda" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4", marginBottom: 8 }}>Ajuda</span>
            <a href="#faq" data-iris-to="#faq" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Envio e prazos</a>
            <a href="#autenticidade" data-iris-to="#autenticidade" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Autenticidade</a>
            <a href="#faq" data-iris-to="#faq" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Trocas e devoluções</a>
            <a href="#nossa-loja" data-iris-to="#nossa-loja" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Eventos</a>
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4", marginBottom: 8 }}>Redes</span>
            <a href="#" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Instagram</a>
            <a href="#" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>TikTok</a>
            <a href="#" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>YouTube</a>
            <a href="#" style={{ textDecoration: "none", minHeight: 32, display: "flex", alignItems: "center" }}>Discord</a>
          </div>
        </div>

        <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4", marginRight: 8 }}>Pagamento</span>
          {PAYMENTS.map((p) => (
            <span key={p} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.14)", fontSize: 13 }}>
              {p}
            </span>
          ))}
        </div>

        <div data-wordmark aria-hidden="true" style={{ marginTop: 64, display: "flex", justifyContent: "center", overflow: "hidden", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "clamp(40px,10.4vw,190px)", lineHeight: 0.9, letterSpacing: "-0.05em", whiteSpace: "nowrap", paddingBottom: ".04em" }}>
          {storeLetters.map((ch, i) => (
            <span key={i} data-wm-l style={{ display: "inline-block" }}>
              {ch}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, fontSize: 12.5, lineHeight: 1.6, color: "#8f93a1" }}>
          <p style={{ margin: 0, maxWidth: 760 }}>Loja independente, não afiliada à Nintendo, Game Freak, Creatures ou The Pokémon Company. Pokémon e nomes relacionados são marcas de seus respectivos titulares.</p>
          <span>© 2026 {storeName} · CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
