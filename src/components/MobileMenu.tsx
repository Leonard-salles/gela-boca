import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface MobileMenuProps {
  menuHidden: boolean;
  menuClip: string;
  menuEvents: "auto" | "none";
  storeName: string;
  onClose: () => void;
}

const LINKS = [
  { href: "#top", irisTo: "[data-hero]", label: "Início" },
  { href: "#produtos", irisTo: "#produtos", label: "Produtos" },
  { href: "#cartas", irisTo: "#cartas", label: "Cartas" },
  { href: "#nossa-loja", irisTo: "#nossa-loja", label: "Nossa loja" },
  { href: "#venda", irisTo: "#venda", label: "Venda suas cartas" },
];

export function MobileMenu({ menuHidden, menuClip, menuEvents, storeName, onClose }: MobileMenuProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={menuHidden}
      style={{ position: "fixed", inset: 0, zIndex: 280, background: "#e8392b", color: "#0a0b10", clipPath: menuClip, transition: "clip-path .75s cubic-bezier(.76,0,.24,1)", pointerEvents: menuEvents, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, padding: "96px 24px 40px", boxSizing: "border-box" }}
    >
      <button type="button" onClick={onClose} aria-label="Fechar menu" style={{ position: "absolute", top: 20, right: 16, width: 48, height: 48, borderRadius: "50%", border: "1.5px solid #0a0b10", background: "none", color: "#0a0b10", display: "grid", placeItems: "center", padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} data-iris-to={l.irisTo} style={{ display: "block", overflow: "hidden", color: "#0a0b10", textDecoration: "none" }}>
          <span data-menu-li style={{ display: "block", fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(44px,12vw,80px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            {l.label}
          </span>
        </a>
      ))}
      <span style={{ marginTop: 32, fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>{storeName} · Ter–Dom</span>
    </div>
  );
}
