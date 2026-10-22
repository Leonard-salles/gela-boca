import type { ApiEnrichment, CardDef, TcgdexCardResponse, TcgdexPricing } from "./types";
import { POKE_TYPES, STORE_CONFIG } from "./data";

// Porte 1:1 da geração de frentes de carta do protótipo (fx.js: drawFace/makeFaces)
// e da integração com a TCGdex API (imagens high.webp + preço de mercado).
// Cache em memória (módulo) — equivalente a window.__vaultFaces / window.__vaultCards.

type FaceCardInput = CardDef & { color: string; attacks: [string, number][] };

const faces = new Map<string, string>();
const cardData = new Map<string, FaceCardInput>();

const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

function roundRectPath(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  if (typeof (g as unknown as { roundRect?: unknown }).roundRect === "function") {
    g.roundRect(x, y, w, h, r);
  } else {
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }
}

function drawFace(c: FaceCardInput): string {
  const W = 630,
    H = 880;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d");
  if (!g) return "";
  const col = c.color,
    full = c.tier === "secreta";
  g.fillStyle = "#17141b";
  roundRectPath(g, 0, 0, W, H, 34);
  g.fill();
  const edge = g.createLinearGradient(0, 0, W, H);
  edge.addColorStop(0, hexA(col, 0.95));
  edge.addColorStop(0.5, "#f4efe2");
  edge.addColorStop(1, hexA(col, 0.95));
  g.fillStyle = edge;
  roundRectPath(g, 10, 10, W - 20, H - 20, 26);
  g.fill();
  const panel = g.createLinearGradient(0, 0, 0, H);
  panel.addColorStop(0, "#1d1f2a");
  panel.addColorStop(1, "#0c0d12");
  g.fillStyle = panel;
  roundRectPath(g, 24, 24, W - 48, H - 48, 16);
  g.fill();
  const ax = full ? 24 : 46,
    ay = full ? 24 : 112,
    aw = full ? W - 48 : W - 92,
    ah = full ? H - 48 : 392;
  const cx = ax + aw * 0.62,
    cy = ay + (full ? ah * 0.4 : ah * 0.45);
  g.save();
  roundRectPath(g, ax, ay, aw, ah, full ? 16 : 10);
  g.clip();
  const bg = g.createRadialGradient(cx, cy, 8, ax + aw / 2, ay + ah / 2, Math.max(aw, ah) * 0.85);
  bg.addColorStop(0, hexA(col, 1));
  bg.addColorStop(0.32, hexA(col, 0.5));
  bg.addColorStop(1, "#0b0c12");
  g.fillStyle = bg;
  g.fillRect(ax, ay, aw, ah);
  g.strokeStyle = "rgba(255,255,255,.13)";
  g.lineWidth = 2;
  for (let i = 1; i < 9; i++) {
    g.beginPath();
    g.arc(cx, cy, i * 40, 0, Math.PI * 2);
    g.stroke();
  }
  g.strokeStyle = "rgba(255,255,255,.055)";
  g.lineWidth = 1.5;
  for (let i = -ah; i < aw; i += 14) {
    g.beginPath();
    g.moveTo(ax + i, ay + ah);
    g.lineTo(ax + i + ah, ay);
    g.stroke();
  }
  if (full) {
    const sh = g.createLinearGradient(0, ay, 0, ay + ah);
    sh.addColorStop(0, "rgba(8,9,13,.8)");
    sh.addColorStop(0.18, "rgba(8,9,13,0)");
    sh.addColorStop(0.6, "rgba(8,9,13,0)");
    sh.addColorStop(1, "rgba(8,9,13,.94)");
    g.fillStyle = sh;
    g.fillRect(ax, ay, aw, ah);
  }
  g.fillStyle = "rgba(255,255,255,.55)";
  g.font = '500 15px "Geist Mono"';
  g.textAlign = "left";
  g.fillText("ARTE DA CARTA · SUBSTITUIR", ax + 22, full ? ay + ah * 0.6 : ay + ah - 20);
  g.restore();
  if (!full) {
    g.strokeStyle = hexA(col, 0.85);
    g.lineWidth = 3;
    roundRectPath(g, ax, ay, aw, ah, 10);
    g.stroke();
  }
  g.textAlign = "left";
  g.fillStyle = "#f6f3ea";
  g.font = '700 40px "Bricolage Grotesque"';
  g.fillText(c.name, 52, 84);
  g.textAlign = "right";
  g.font = '700 36px "Bricolage Grotesque"';
  g.fillText(String(c.hp), W - 52, 84);
  const hpW = g.measureText(String(c.hp)).width;
  g.font = '500 18px "Geist Mono"';
  g.fillStyle = "rgba(246,243,234,.75)";
  g.fillText("HP", W - 60 - hpW, 82);
  let y = full ? 650 : 566;
  g.textAlign = "left";
  g.font = '500 16px "Geist Mono"';
  g.fillStyle = col;
  g.fillText((c.set + "  ·  " + c.num).toUpperCase(), 52, y);
  y += 54;
  (c.attacks.length ? c.attacks : [["Golpe Rápido", 30], ["Ataque Especial", 120]]).forEach((a, i) => {
    for (let k = 0; k <= i; k++) {
      g.fillStyle = col;
      g.beginPath();
      g.arc(66 + k * 28, y - 10, 10, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = "#f6f3ea";
    g.font = '600 28px "Bricolage Grotesque"';
    g.textAlign = "left";
    g.fillText(String(a[0]), 66 + (i + 1) * 28 + 6, y);
    g.textAlign = "right";
    g.font = '700 30px "Bricolage Grotesque"';
    g.fillText(String(a[1]), W - 52, y);
    y += 60;
  });
  g.fillStyle = "rgba(255,255,255,.12)";
  g.fillRect(52, H - 90, W - 104, 1);
  g.font = '500 14px "Geist Mono"';
  g.fillStyle = "rgba(246,243,234,.6)";
  g.textAlign = "left";
  g.fillText("ILUS. — PLACEHOLDER", 52, H - 58);
  g.textAlign = "right";
  g.fillText(c.rarityShort, W - 52, H - 58);
  return cv.toDataURL("image/jpeg", 0.92);
}

export function faceOf(id: string): string | undefined {
  if (!faces.has(id)) {
    const data = cardData.get(id);
    if (data) {
      try {
        faces.set(id, data.img || drawFace(data));
      } catch (e) {
        console.error(e);
      }
    }
  }
  return faces.get(id);
}

function loadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const im = new Image();
    const t = setTimeout(() => resolve(false), 7000);
    im.onload = () => {
      clearTimeout(t);
      resolve(true);
    };
    im.onerror = () => {
      clearTimeout(t);
      resolve(false);
    };
    im.src = url;
  });
}

export async function makeFaces(cards: CardDef[]): Promise<Map<string, string>> {
  try {
    await Promise.all([
      document.fonts.load('700 40px "Bricolage Grotesque"'),
      document.fonts.load('600 28px "Bricolage Grotesque"'),
      document.fonts.load('500 16px "Geist Mono"'),
    ]);
  } catch {
    /* fontes opcionais */
  }
  await Promise.all(
    cards.map(async (c0) => {
      const c: FaceCardInput = { ...c0, color: POKE_TYPES[c0.type].c, attacks: POKE_TYPES[c0.type].a };
      cardData.set(c.id, c);
      if (c.img && (await loadImage(c.img))) {
        faces.set(c.id, c.img);
      } else {
        if (faces.has(c.id) && !String(faces.get(c.id)).startsWith("data:")) faces.delete(c.id);
        cardData.set(c.id, { ...c, img: null });
        faceOf(c.id);
      }
    })
  );
  return faces;
}

// ---------------------------------------------------------------------------
// TCGdex API — imagens high.webp + preço de mercado (TCGplayer USD / Cardmarket EUR)
// convertido para BRL. Se a API ou a imagem falhar, cai para a frente em canvas.
// ---------------------------------------------------------------------------

function priceFrom(p: TcgdexPricing | undefined, usdBrl: number, eurBrl: number) {
  if (!p) return null;
  const tp = p.tcgplayer;
  if (tp) {
    const order = ["holofoil", "normal", "reverse-holofoil", "1st-edition-holofoil"];
    const candidates = order.map((k) => tp[k]).concat(Object.values(tp));
    const v = candidates.find(
      (x): x is { marketPrice?: number; midPrice?: number } =>
        !!x && typeof x === "object" && ((x.marketPrice ?? 0) > 0 || (x.midPrice ?? 0) > 0)
    );
    if (v) {
      const n = (v.marketPrice || v.midPrice) as number;
      return { brl: n * usdBrl, src: "TCGplayer", ref: "US$ " + n.toFixed(2) };
    }
  }
  const cm = p.cardmarket;
  if (cm && (cm.trend || cm.avg)) {
    const n = (cm.trend || cm.avg) as number;
    return { brl: n * eurBrl, src: "Cardmarket", ref: "€ " + n.toFixed(2) };
  }
  return null;
}

export async function loadApi(
  cards: CardDef[],
  opts: { usdBrl: number; eurBrl: number } = { usdBrl: STORE_CONFIG.usdBrl, eurBrl: STORE_CONFIG.eurBrl }
): Promise<Record<string, ApiEnrichment>> {
  const out: Record<string, ApiEnrichment> = {};
  await Promise.all(
    cards.map(async (c) => {
      try {
        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), 6000);
        const r = await fetch(`https://api.tcgdex.net/v2/en/cards/${c.apiId}`, { signal: ctl.signal });
        clearTimeout(t);
        if (!r.ok) return;
        const d: TcgdexCardResponse = await r.json();
        out[c.id] = {
          img: d.image ? d.image + "/high.webp" : null,
          name: d.name,
          hp: d.hp,
          illus: d.illustrator,
          price: priceFrom(d.pricing, opts.usdBrl, opts.eurBrl),
        };
      } catch {
        /* API/imagem indisponível — mantém mock local */
      }
    })
  );
  return out;
}

export function mergedCard(c: CardDef, api: Record<string, ApiEnrichment>): CardDef {
  const a = api[c.id];
  if (!a) return c;
  const price = a.price ? Math.max(1.9, Math.ceil(a.price.brl) - 0.1) : c.price;
  return {
    ...c,
    name: a.name || c.name,
    hp: a.hp || c.hp,
    price,
    priceSrc: a.price ? `Ref. ${a.price.src} ${a.price.ref}` : "",
    illus: a.illus,
  };
}
