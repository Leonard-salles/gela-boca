import { Fragment } from "react";
import { FONT_DISPLAY } from "@/lib/fonts";
import { MarqueeTrack } from "./Marquee";

const items: [string, string][] = [
  ["Frete para todo o Brasil", "#ffd23f"],
  ["PIX com {pix}% de desconto", "#e8392b"],
  ["Cartas 100% originais", "#3fa7ff"],
  ["Embalagem protegida", "#4fd18b"],
  ["Lacre garantido", "#e46cff"],
];

export function BenefitsMarquee({ pix }: { pix: number }) {
  return (
    <section aria-label="Benefícios" style={{ borderBlock: "1px solid rgba(255,255,255,.09)", overflow: "hidden", padding: "22px 0", background: "#0a0b10" }}>
      <MarqueeTrack speed={40} rowStyle={{ display: "flex", alignItems: "center", gap: 48, paddingRight: 48, fontFamily: FONT_DISPLAY, fontSize: "clamp(18px,1.8vw,24px)", fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
        {items.map(([label, color]) => (
          <Fragment key={label}>
            <span>{label.replace("{pix}", String(pix))}</span>
            <span aria-hidden="true" style={{ width: 8, height: 8, background: color, transform: "rotate(45deg)" }} />
          </Fragment>
        ))}
      </MarqueeTrack>
    </section>
  );
}
