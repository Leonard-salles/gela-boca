import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";
import type { CartLineView } from "@/lib/viewModel";

interface CartDrawerProps {
  drawerHidden: boolean;
  drawerEvents: "auto" | "none";
  drawerFade: number;
  drawerX: string;
  cartCount: number;
  stepCart: boolean;
  stepCheckout: boolean;
  stepDone: boolean;
  shipText: string;
  shipW: string;
  cartEmpty: boolean;
  cartItems: CartLineView[];
  cartHas: boolean;
  subtotal: string;
  pix: number;
  pixTotal: string;
  instTotal: string;
  payPix: boolean;
  payCard: boolean;
  payPixBorder: string;
  payCardBorder: string;
  payTotal: string;
  orderId: string;
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBackToCart: () => void;
  onSetPix: () => void;
  onSetCard: () => void;
  onPlaceOrder: (e: React.FormEvent) => void;
}

export function CartDrawer(p: CartDrawerProps) {
  return (
    <div aria-hidden={p.drawerHidden} style={{ position: "fixed", inset: 0, zIndex: 300, pointerEvents: p.drawerEvents }}>
      <div onClick={p.onClose} style={{ position: "absolute", inset: 0, background: "rgba(5,6,10,.62)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", opacity: p.drawerFade, transition: "opacity .45s" }} />
      <aside role="dialog" aria-modal="true" aria-label="Carrinho" style={{ position: "absolute", top: 10, right: 10, bottom: 10, width: "min(440px,calc(100% - 20px))", background: "#11131b", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, display: "flex", flexDirection: "column", transform: p.drawerX, transition: "transform .65s cubic-bezier(.16,1,.3,1)", overflow: "hidden", boxShadow: "-30px 0 80px rgba(0,0,0,.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 22px 18px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Seu carrinho</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: "#a3a6b4" }}>{p.cartCount}</span>
          </div>
          <button type="button" onClick={p.onClose} aria-label="Fechar carrinho" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.14)", background: "none", color: "#f3f1ea", display: "grid", placeItems: "center", padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {p.stepCart && (
          <>
            <div style={{ padding: "0 22px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 13.5, color: "#c9cad3" }}>{p.shipText}</span>
              <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: p.shipW, background: "#4fd18b", transition: "width .6s cubic-bezier(.16,1,.3,1)" }} />
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "0 22px", borderTop: "1px solid rgba(255,255,255,.08)" }} data-lenis-prevent="">
              {p.cartEmpty && (
                <div style={{ height: "100%", minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", color: "#a3a6b4" }}>
                  <span aria-hidden="true" style={{ position: "relative", width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(#2a2d3a 0 44%,#0a0b10 44% 56%,#2a2d3a 56%)", boxShadow: "0 0 0 2px #0a0b10" }}>
                    <span style={{ position: "absolute", left: 17, top: 17, width: 14, height: 14, borderRadius: "50%", background: "#3a3e4d", boxShadow: "0 0 0 3px #0a0b10" }} />
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: "#f3f1ea" }}>Nenhuma captura ainda.</span>
                  <span style={{ fontSize: 14 }}>Adicione uma carta ou booster para começar.</span>
                </div>
              )}
              {p.cartItems.map((i) => (
                <div key={i.id} style={{ display: "grid", gridTemplateColumns: "52px minmax(0,1fr) auto", gap: 14, alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <span aria-hidden="true" style={{ width: 52, height: 64, borderRadius: 8, background: `linear-gradient(160deg,${i.color},#14111a 85%)`, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.15)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.25 }}>{i.name}</span>
                    <span style={{ fontSize: 12.5, color: "#a3a6b4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.sub}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <button type="button" onClick={() => p.onDec(i.id)} aria-label="Diminuir quantidade" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,.16)", background: "none", color: "#f3f1ea", padding: 0 }}>
                        −
                      </button>
                      <span style={{ minWidth: 24, textAlign: "center", fontFamily: FONT_MONO, fontSize: 13 }}>{i.qty}</span>
                      <button type="button" onClick={() => p.onInc(i.id)} aria-label="Aumentar quantidade" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,.16)", background: "none", color: "#f3f1ea", padding: 0 }}>
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap" }}>{i.line}</span>
                    <button type="button" onClick={() => p.onRemove(i.id)} style={{ background: "none", border: 0, padding: "4px 0", color: "#a3a6b4", fontSize: 12.5, textDecoration: "underline", textUnderlineOffset: 3 }}>
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {p.cartHas && (
              <div style={{ padding: "20px 22px 22px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", gap: 14, background: "#0e1017" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#a3a6b4" }}>
                  <span>Subtotal</span>
                  <span>{p.subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 15 }}>No PIX ({p.pix}% off)</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>{p.pixTotal}</span>
                </div>
                <span style={{ fontSize: 12.5, color: "#a3a6b4", textAlign: "right", marginTop: -8 }}>{p.instTotal}</span>
                <button type="button" onClick={p.onCheckout} data-press style={{ height: 56, borderRadius: 999, border: 0, background: "#f3f1ea", color: "#0a0b10", fontWeight: 600, fontSize: 16 }}>
                  Finalizar compra
                </button>
              </div>
            )}
          </>
        )}

        {p.stepCheckout && (
          <form onSubmit={p.onPlaceOrder} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ flex: 1, overflow: "auto", padding: "4px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }} data-lenis-prevent="">
              <button type="button" onClick={p.onBackToCart} style={{ alignSelf: "flex-start", background: "none", border: 0, padding: 0, minHeight: 36, color: "#a3a6b4", fontSize: 14 }}>
                ← Voltar ao carrinho
              </button>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>Checkout simulado</span>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#a3a6b4" }}>
                Nome completo
                <input required autoComplete="name" style={{ height: 50, padding: "0 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.14)", background: "#0a0b10", color: "#f3f1ea", fontSize: 15 }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#a3a6b4" }}>
                E-mail
                <input type="email" required autoComplete="email" style={{ height: 50, padding: "0 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.14)", background: "#0a0b10", color: "#f3f1ea", fontSize: 15 }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#a3a6b4" }}>
                CEP
                <input inputMode="numeric" required autoComplete="postal-code" placeholder="00000-000" style={{ height: 50, padding: "0 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.14)", background: "#0a0b10", color: "#f3f1ea", fontSize: 15 }} />
              </label>
              <div role="radiogroup" aria-label="Pagamento" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                <button type="button" role="radio" aria-checked={p.payPix} onClick={p.onSetPix} style={{ height: 64, borderRadius: 14, border: `1px solid ${p.payPixBorder}`, background: "#0a0b10", color: "#f3f1ea", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, fontSize: 15, fontWeight: 600 }}>
                  PIX
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#a3a6b4" }}>{p.pix}% de desconto</span>
                </button>
                <button type="button" role="radio" aria-checked={p.payCard} onClick={p.onSetCard} style={{ height: 64, borderRadius: 14, border: `1px solid ${p.payCardBorder}`, background: "#0a0b10", color: "#f3f1ea", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, fontSize: 15, fontWeight: 600 }}>
                  Cartão
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#a3a6b4" }}>até 10x sem juros</span>
                </button>
              </div>
            </div>
            <div style={{ padding: "20px 22px 22px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", gap: 12, background: "#0e1017" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 15 }}>Total</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 600 }}>{p.payTotal}</span>
              </div>
              <button type="submit" data-press style={{ height: 56, borderRadius: 999, border: 0, background: "#ffd23f", color: "#0a0b10", fontWeight: 600, fontSize: 16 }}>
                Confirmar pedido
              </button>
            </div>
          </form>
        )}

        {p.stepDone && (
          <div role="status" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 32, textAlign: "center" }}>
            <span aria-hidden="true" style={{ position: "relative", width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 3px #0a0b10,0 0 40px rgba(255,210,63,.4)" }}>
              <span style={{ position: "absolute", left: 25, top: 25, width: 22, height: 22, borderRadius: "50%", background: "#ffd23f", boxShadow: "0 0 0 4px #0a0b10" }} />
            </span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Pedido capturado!</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#ffd23f" }}>{p.orderId}</span>
            <span style={{ color: "#a3a6b4", fontSize: 14, maxWidth: 280 }}>Este é um checkout de demonstração. Nenhuma cobrança foi feita.</span>
            <button type="button" onClick={p.onClose} style={{ marginTop: 8, height: 48, padding: "0 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,.18)", background: "none", color: "#f3f1ea", fontWeight: 600 }}>
              Continuar comprando
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
