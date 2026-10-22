import { FONT_DISPLAY, FONT_MONO } from "@/lib/fonts";

interface InterestView {
  n: string;
  on: boolean;
  bg: string;
  bd: string;
  fg: string;
}

interface VipProps {
  vipForm: boolean;
  vipDone: boolean;
  vipEmail: boolean;
  vipWhats: boolean;
  vipEmailBg: string;
  vipEmailColor: string;
  vipWhatsBg: string;
  vipWhatsColor: string;
  vipLabel: string;
  vipType: string;
  vipValue: string;
  vipPh: string;
  vipError: boolean;
  interestsView: InterestView[];
  onSetEmail: () => void;
  onSetWhats: () => void;
  onVipChange: (v: string) => void;
  onToggleInterest: (n: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function Vip({ vipForm, vipDone, vipEmail, vipWhats, vipEmailBg, vipEmailColor, vipWhatsBg, vipWhatsColor, vipLabel, vipType, vipValue, vipPh, vipError, interestsView, onSetEmail, onSetWhats, onVipChange, onToggleInterest, onSubmit, onReset }: VipProps) {
  return (
    <section id="vip" aria-labelledby="vip-t" style={{ padding: "0 clamp(20px,4vw,64px) clamp(96px,12vw,160px)" }}>
      <div
        data-reveal="clip"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          position: "relative",
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.1)",
          background: "radial-gradient(80% 120% at 90% 0%,rgba(47,107,255,.34),rgba(47,107,255,0) 60%),radial-gradient(60% 90% at 0% 100%,rgba(232,57,43,.22),rgba(232,57,43,0) 60%),#10121a",
          padding: "clamp(28px,6vw,88px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>11 — Lista VIP</span>
          <h2 id="vip-t" style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "clamp(38px,4.6vw,72px)", lineHeight: 0.94, letterSpacing: "-0.04em" }}>
            Saiba da reposição
            <br />
            <span style={{ color: "#ffd23f" }}>antes de todo mundo.</span>
          </h2>
          <p style={{ margin: 0, color: "#c9cad3", fontSize: 17, lineHeight: 1.6, maxWidth: 440 }}>Lançamentos, reposições e vagas de torneio. Uma mensagem por semana, no máximo.</p>
        </div>

        {vipForm && (
          <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div role="group" aria-label="Canal" style={{ display: "inline-flex", alignSelf: "flex-start", padding: 4, borderRadius: 999, border: "1px solid rgba(255,255,255,.14)" }}>
              <button type="button" aria-pressed={vipEmail} onClick={onSetEmail} style={{ height: 40, padding: "0 18px", borderRadius: 999, border: 0, background: vipEmailBg, color: vipEmailColor, fontSize: 14, fontWeight: 500, transition: "background .3s,color .3s" }}>
                E-mail
              </button>
              <button type="button" aria-pressed={vipWhats} onClick={onSetWhats} style={{ height: 40, padding: "0 18px", borderRadius: 999, border: 0, background: vipWhatsBg, color: vipWhatsColor, fontSize: 14, fontWeight: 500, transition: "background .3s,color .3s" }}>
                WhatsApp
              </button>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#a3a6b4" }}>{vipLabel}</span>
              <input type={vipType} value={vipValue} onChange={(e) => onVipChange(e.target.value)} placeholder={vipPh} aria-invalid={vipError} style={{ height: 60, padding: "0 22px", borderRadius: 16, border: "1px solid rgba(255,255,255,.16)", background: "rgba(10,11,16,.6)", color: "#f3f1ea", fontSize: 17, outline: "none" }} />
            </label>
            {vipError && (
              <span role="alert" style={{ color: "#ff8a7a", fontSize: 14 }}>
                Confira o contato digitado.
              </span>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {interestsView.map((it) => (
                <button key={it.n} type="button" aria-pressed={it.on} onClick={() => onToggleInterest(it.n)} style={{ height: 40, padding: "0 16px", borderRadius: 999, border: `1px solid ${it.bd}`, background: it.bg, color: it.fg, fontSize: 14, transition: "all .3s" }}>
                  {it.n}
                </button>
              ))}
            </div>
            <button type="submit" data-liquid data-swap style={{ alignSelf: "flex-start", position: "relative", display: "inline-flex", alignItems: "center", gap: 16, height: 60, padding: "0 8px 0 28px", borderRadius: 999, border: 0, background: "#f3f1ea", color: "#0a0b10", overflow: "hidden", isolation: "isolate", fontWeight: 600, fontSize: 16 }}>
              <span data-liquid-fill aria-hidden="true" style={{ position: "absolute", right: 8, top: 8, width: 44, height: 44, borderRadius: "50%", background: "#ffd23f", zIndex: -1 }} />
              <span style={{ display: "block", overflow: "hidden", height: 22 }}>
                <span data-swap-col style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>Entrar na lista</span>
                  <span aria-hidden="true" style={{ display: "block", height: 22, lineHeight: "22px", whiteSpace: "nowrap" }}>
                    Entrar na lista
                  </span>
                </span>
              </span>
              <span aria-hidden="true" style={{ width: 44, height: 44, display: "grid", placeItems: "center", flex: "none" }}>
                <svg data-liquid-arrow width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0b10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          </form>
        )}

        {vipDone && (
          <div role="status" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            <span aria-hidden="true" style={{ position: "relative", width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%)", boxShadow: "0 0 0 2px #0a0b10" }}>
              <span style={{ position: "absolute", left: 19, top: 19, width: 18, height: 18, borderRadius: "50%", background: "#ffd23f", boxShadow: "0 0 0 3px #0a0b10" }} />
            </span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em" }}>Capturado. Você está na lista.</span>
            <span style={{ color: "#c9cad3" }}>Avisaremos primeiro quando algo bom chegar.</span>
            <button type="button" onClick={onReset} style={{ background: "none", border: 0, padding: 0, minHeight: 44, color: "#f3f1ea", textDecoration: "underline", textUnderlineOffset: 5, fontSize: 15 }}>
              Cadastrar outro contato
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
