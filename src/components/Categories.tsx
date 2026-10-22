import Image from "next/image";
import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface CategoryDef {
  href: string;
  color: string;
  alpha: string;
  shape: "circle" | "diamond";
  index: string;
  title: string;
  desc: string;
  image: string | null;
}

interface CategoriesProps {
  images: { cartas: string | null; boosters: string | null; boxes: string | null; lancamento: string | null };
}

export function Categories({ images }: CategoriesProps) {
  const CATEGORIES: CategoryDef[] = [
    { href: "#cartas", color: "#e46cff", alpha: "61", shape: "circle", index: "01 · Energia psíquica", title: "Cartas Avulsas", desc: "Raras, ilustrações e staples para o seu deck.", image: images.cartas },
    { href: "#boosters", color: "#ff6b3d", alpha: "61", shape: "circle", index: "02 · Energia de fogo", title: "Boosters", desc: "Pacotes lacrados das coleções mais recentes.", image: images.boosters },
    { href: "#boosters", color: "#ffd23f", alpha: "52", shape: "diamond", index: "03 · Energia elétrica", title: "Boxes & Coleções", desc: "ETBs, bundles e coleções especiais.", image: images.boxes },
    { href: "#lancamento", color: "#3fa7ff", alpha: "52", shape: "diamond", index: "04 · Energia aquática", title: "Pré-venda", desc: "Garanta o próximo lançamento antes de todo mundo.", image: images.lancamento },
  ];
  return (
    <section id="produtos" data-zone-start aria-labelledby="cat-t" style={{ padding: "clamp(96px,12vw,180px) clamp(20px,4vw,64px) 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>01 — Categorias</span>
            <h2 id="cat-t" data-reveal="lines" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(40px,5.2vw,84px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block" }}>Escolha sua</span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-li style={{ display: "block", color: "#a3a6b4" }}>próxima captura.</span>
              </span>
            </h2>
          </div>
          <p data-reveal="fade" style={{ maxWidth: 380, margin: 0, color: "#a3a6b4", fontSize: 16, lineHeight: 1.6, textWrap: "pretty" }}>
            Do staple de R$ 5 para fechar o deck até a box lacrada que vai para a estante. Tudo conferido antes de sair daqui.
          </p>
        </div>
        <div data-reveal="stagger" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 16 }}>
          {CATEGORIES.map((c) => (
            <a key={c.title} href={c.href} data-iris-to={c.href} data-cat data-color={c.color} data-shape={c.shape} data-cursor="view" style={{ display: "block", color: "#f3f1ea", textDecoration: "none" }}>
              <div data-cat-inner style={{ position: "relative", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)", background: "#12141c" }}>
                {c.image ? (
                  <div data-cat-media style={{ position: "absolute", inset: 0 }}>
                    <Image src={c.image} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div
                    data-cat-media
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `radial-gradient(70% 55% at 60% 35%,${c.color}${c.alpha},${c.color}00 70%),linear-gradient(135deg,rgba(255,255,255,.035) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.035) 50%,rgba(255,255,255,.035) 75%,transparent 75%)`,
                      backgroundSize: "100% 100%,28px 28px",
                      backgroundColor: "#12141c",
                    }}
                  />
                )}
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(70% 55% at 60% 35%,${c.color}3d,${c.color}00 70%)` }} />
                <div data-particles style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, background: "linear-gradient(rgba(10,11,16,0),rgba(10,11,16,.88))" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: c.color }}>{c.index}</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(30px,2.8vw,42px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{c.title}</span>
                    <span style={{ color: "#c9cad3", fontSize: 15, lineHeight: 1.5 }}>{c.desc}</span>
                  </div>
                  <span aria-hidden="true" style={{ flex: "none", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", display: "grid", placeItems: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
