import { forwardRef } from "react";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { SearchResult } from "@/lib/viewModel";

interface SearchModalProps {
  searchHidden: boolean;
  searchFade: number;
  searchEvents: "auto" | "none";
  query: string;
  results: SearchResult[];
  noResults: boolean;
  onClose: () => void;
  onQueryChange: (v: string) => void;
  onGo: (target: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchModal = forwardRef<HTMLInputElement, SearchModalProps>(function SearchModal({ searchHidden, searchFade, searchEvents, query, results, noResults, onClose, onQueryChange, onGo }, ref) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Buscar produtos" aria-hidden={searchHidden} style={{ position: "fixed", inset: 0, zIndex: 290, background: "rgba(7,8,12,.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", opacity: searchFade, pointerEvents: searchEvents, transition: "opacity .35s", overflow: "auto" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "clamp(88px,14vh,140px) clamp(20px,4vw,40px) 60px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>Buscar no cofre</span>
          <button type="button" onClick={onClose} aria-label="Fechar busca" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.16)", background: "none", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <input
          ref={ref}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Charizard, ETB, 151…"
          aria-label="Buscar"
          style={{ width: "100%", boxSizing: "border-box", background: "none", border: 0, borderBottom: "1px solid rgba(255,255,255,.18)", fontFamily: FONT_DISPLAY, fontSize: "clamp(34px,5vw,64px)", fontWeight: 500, letterSpacing: "-0.03em", color: "#f3f1ea", padding: "8px 0 16px", outline: "none" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {results.map((r) => (
            <button key={r.id} type="button" onClick={(e) => onGo(r.target, e)} style={{ display: "grid", gridTemplateColumns: "12px minmax(0,1fr) auto", gap: 18, alignItems: "center", padding: "18px 4px", background: "none", border: 0, borderBottom: "1px solid rgba(255,255,255,.08)", color: "#f3f1ea", textAlign: "left" }}>
              <span aria-hidden="true" style={{ width: 10, height: 10, transform: "rotate(45deg)", background: r.color }} />
              <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{r.name}</span>
                <span style={{ fontSize: 13, color: "#a3a6b4" }}>{r.sub}</span>
              </span>
              <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>{r.priceLabel}</span>
            </button>
          ))}
          {noResults && <span style={{ padding: "24px 0", color: "#a3a6b4" }}>Nenhum Pokémon selvagem por aqui. Tente outro nome.</span>}
        </div>
      </div>
    </div>
  );
});
