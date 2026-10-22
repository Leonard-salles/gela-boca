import type { CSSProperties, ReactNode } from "react";

// Faixa infinita (marquee) reutilizada em vários pontos da loja (benefícios,
// "compramos coleções", galeria da loja, depoimentos). A duplicação do
// conteúdo é necessária para o loop contínuo via GSAP (xPercent 0 → -50) em
// lib/fx.ts (setupMarquees).
interface MarqueeTrackProps {
  speed: number;
  dir?: "right";
  hoverSlow?: boolean;
  rowStyle?: CSSProperties;
  children: ReactNode;
}

export function MarqueeTrack({ speed, dir, hoverSlow, rowStyle, children }: MarqueeTrackProps) {
  return (
    <div data-marquee-track data-speed={speed} data-dir={dir} data-hover-slow={hoverSlow ? "1" : undefined} style={{ display: "flex", width: "max-content" }}>
      <div style={rowStyle}>{children}</div>
      <div aria-hidden="true" style={rowStyle}>
        {children}
      </div>
    </div>
  );
}
