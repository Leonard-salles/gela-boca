import { FONT_DISPLAY } from "@/lib/fonts";

interface HeaderProps {
  storeName: string;
  isMobile: boolean;
  navInicio: boolean;
  navProdutos: boolean;
  cartCount: number;
  cartLabel: string;
  badgeOpacity: number;
  menuOpen: boolean;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onToggleMenu: () => void;
}

export function Header({ storeName, isMobile, navInicio, navProdutos, cartCount, cartLabel, badgeOpacity, menuOpen, onOpenSearch, onOpenCart, onToggleMenu }: HeaderProps) {
  return (
    <header data-nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div
        data-nav-bar
        style={{
          pointerEvents: "auto",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "20px clamp(16px,3vw,40px)",
          border: "1px solid rgba(255,255,255,0)",
          borderRadius: 999,
        }}
      >
        <a href="#top" data-iris-to="[data-hero]" aria-label="Início" style={{ display: "flex", alignItems: "center", gap: 10, color: "#f3f1ea", textDecoration: "none", minHeight: 44 }}>
          <span aria-hidden="true" style={{ position: "relative", width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 1.5px rgba(243,241,234,.5)", flex: "none" }}>
            <span style={{ position: "absolute", left: 8.5, top: 8.5, width: 9, height: 9, borderRadius: "50%", background: "#f3f1ea", boxShadow: "0 0 0 2px #0a0b10" }} />
          </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{storeName}</span>
        </a>

        <nav aria-label="Principal" data-ind-group style={{ position: "relative", display: isMobile ? "none" : "flex", alignItems: "center", gap: 4 }}>
          <span data-ind-mark aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 0, borderRadius: 999, background: "rgba(255,255,255,.1)", opacity: 0 }} />
          <a href="#top" data-iris-to="[data-hero]" data-active={String(navInicio)} data-swap style={{ position: "relative", display: "flex", alignItems: "center", height: 44, padding: "0 18px", color: "#f3f1ea", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
            <span style={{ display: "block", overflow: "hidden", height: 20 }}>
              <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "block", height: 20, lineHeight: "20px" }}>Início</span>
                <span aria-hidden="true" style={{ display: "block", height: 20, lineHeight: "20px", color: "#ffd23f" }}>
                  Início
                </span>
              </span>
            </span>
          </a>
          <a href="#produtos" data-iris-to="#produtos" data-active={String(navProdutos)} data-swap style={{ position: "relative", display: "flex", alignItems: "center", height: 44, padding: "0 18px", color: "#f3f1ea", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
            <span style={{ display: "block", overflow: "hidden", height: 20 }}>
              <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "block", height: 20, lineHeight: "20px" }}>Produtos</span>
                <span aria-hidden="true" style={{ display: "block", height: 20, lineHeight: "20px", color: "#ffd23f" }}>
                  Produtos
                </span>
              </span>
            </span>
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button type="button" aria-label="Buscar" onClick={onOpenSearch} data-magnetic style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.14)", background: "rgba(10,11,16,.25)", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <button type="button" aria-label={cartLabel} onClick={onOpenCart} data-cart-icon style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", border: 0, background: "#f3f1ea", color: "#0a0b10", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span data-cart-badge style={{ position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, padding: "0 5px", boxSizing: "border-box", borderRadius: 999, background: "#e8392b", color: "#0a0b10", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, display: "grid", placeItems: "center", opacity: badgeOpacity, boxShadow: "0 0 0 2px #0a0b10" }}>
              {cartCount}
            </span>
          </button>
          {isMobile && (
            <button type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={onToggleMenu} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.14)", background: "rgba(10,11,16,.25)", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
