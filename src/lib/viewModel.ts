import { CARDS, CONDS, EVENTS, FAQS, GALLERY, PRODUCTS, STORE_CONFIG, TESTIMONIALS, BADGE_COLOR_BY_TIER, POKE_TYPES } from "./data";
import { mergedCard } from "./cardFace";
import type { ApiEnrichment, CardDef } from "./types";
import type { ApiStatus, CardsTab, CondId, NavZone, PayMethod, ProductFilter, VipChannel } from "@/hooks/useShopState";

// Camada de dados derivados — porte 1:1 de `renderVals()` do protótipo original.
// Recebe o estado "cru" + as ações (já conectadas ao motor de animação em
// page.tsx) e devolve tudo que a UI precisa para renderizar, com os mesmos
// textos, cores e cálculos do protótipo (PIX, parcelamento, frete grátis…).

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fmt = (v: number) => brl.format(v);
const inst = (v: number) => {
  const n = Math.max(1, Math.min(10, Math.floor(v / 20)));
  return n > 1 ? `ou ${n}x de ${fmt(v / n)} sem juros` : "à vista no cartão";
};

export interface HeroLayout {
  mTop: string;
  mRight: string;
  mH: string;
  mW: string;
  mTf: string;
  mR: string;
  glow: number;
  cardOpacity: number;
  scrim: number;
  tj: string;
  tpb: string;
  tmw: string;
  navLinks: string;
  phTop: string;
}

export interface CardView extends CardDef {
  color: string;
  typeLabel: string;
  badge: string;
  pix: string;
  inst: string;
}

export interface ProductView {
  id: string;
  name: string;
  kind: string;
  kindLabel: string;
  meta: string;
  price: number;
  display: "flex" | "none";
  pix: string;
  inst: string;
  stock: number;
  max: number;
  hpW: string;
  hpColor: string;
  hpLabel: string;
  hpNote: string;
  glow: string;
  silW: string;
  silH: string;
  silR: string;
  color: string;
  image: string | null;
}

export interface CartLineView {
  id: string;
  name: string;
  sub: string;
  color: string;
  qty: number;
  line: string;
}

export interface SearchResult {
  id: string;
  name: string;
  sub: string;
  color: string;
  target: string;
  priceLabel: string;
}

export interface StateSnapshot {
  vw: number;
  tab: CardsTab;
  filter: ProductFilter;
  cart: { id: string; name: string; sub: string; price: number; color: string; qty: number }[];
  cartOpen: boolean;
  step: "cart" | "checkout" | "done";
  pay: PayMethod;
  orderId: string;
  cond: CondId;
  faq: number;
  menuOpen: boolean;
  searchOpen: boolean;
  query: string;
  vipChannel: VipChannel;
  vipValue: string;
  vipDone: boolean;
  vipError: boolean;
  interests: string[];
  navActive: NavZone;
  api: Record<string, ApiEnrichment>;
  apiStatus: ApiStatus;
  productImages: Record<string, string | null>;
}

export function buildViewModel(s: StateSnapshot) {
  const mob = s.vw < 820;
  const pix = STORE_CONFIG.pixDiscount / 100;

  // Banner sempre em tela cheia horizontal (sem o "cartão" retrato do desktop).
  // GIF do banner ocupa o fundo inteiro (full-bleed); no desktop a carta em
  // destaque volta a aparecer no "cartão" retrato flutuante à direita.
  const L: HeroLayout = mob
    ? { mTop: "0px", mRight: "0px", mH: "100%", mW: "100%", mTf: "none", mR: "0px", glow: 0, cardOpacity: 0, scrim: 1, tj: "flex-end", tpb: "148px", tmw: "100%", navLinks: "none", phTop: "96px" }
    : { mTop: "calc(50% + 22px)", mRight: "clamp(20px,4vw,64px)", mH: "min(80dvh,880px)", mW: "calc(min(80dvh,880px) * 600 / 825)", mTf: "translateY(-50%)", mR: "28px", glow: 1, cardOpacity: 1, scrim: 0.6, tj: "center", tpb: "40px", tmw: "min(56%,780px)", navLinks: "flex", phTop: "22px" };

  const cardsView: CardView[] = CARDS.filter((c) => c.tabs.includes(s.tab)).map((c0) => {
    const c = mergedCard(c0, s.api);
    const t = POKE_TYPES[c.type];
    return { ...c, color: t.c, typeLabel: t.l, badge: BADGE_COLOR_BY_TIER[c.tier], pix: fmt(c.price * (1 - pix)), inst: inst(c.price) };
  });

  const tabs = ([
    ["novidades", "Novidades"],
    ["procuradas", "Mais procuradas"],
    ["lendarias", "Lendárias"],
  ] as [CardsTab, string][]).map(([id, label]) => ({ id, label, active: s.tab === id, color: s.tab === id ? "#f3f1ea" : "#a3a6b4" }));

  const chips = ([
    ["todos", "Todos"],
    ["booster", "Boosters"],
    ["box", "Boxes"],
    ["etb", "ETB"],
    ["bundle", "Bundles"],
  ] as [ProductFilter, string][]).map(([id, label]) => ({ id, label, active: s.filter === id, color: s.filter === id ? "#0a0b10" : "#c9cad3" }));

  const productsView: ProductView[] = PRODUCTS.map((p) => {
    const pct = p.stock / p.max,
      hpColor = pct > 0.5 ? "#4fd18b" : pct > 0.2 ? "#ffd23f" : "#ff5a4a";
    const isPack = p.kind === "booster";
    return {
      id: p.id,
      name: p.name,
      kind: p.kind,
      kindLabel: p.kindLabel,
      meta: p.meta,
      price: p.price,
      color: p.color,
      display: s.filter === "todos" || p.kind === s.filter ? "flex" : "none",
      pix: fmt(p.price * (1 - pix)),
      inst: inst(p.price),
      stock: p.stock,
      max: p.max,
      hpW: Math.max(4, pct * 100) + "%",
      hpColor,
      hpLabel: `${p.stock}/${p.max}`,
      hpNote: pct <= 0.2 ? "Últimas unidades" : "Em estoque",
      glow: p.color + "55",
      silW: isPack ? "36%" : "62%",
      silH: isPack ? "70%" : "50%",
      silR: isPack ? "8px" : "12px",
      image: s.productImages[p.id] ?? null,
    };
  });

  const cartItems: CartLineView[] = s.cart.map((i) => ({ id: i.id, name: i.name, sub: i.sub, color: i.color, qty: i.qty, line: fmt(i.price * i.qty * (1 - pix)) }));
  const count = s.cart.reduce((a, i) => a + i.qty, 0);
  const sub = s.cart.reduce((a, i) => a + i.price * i.qty, 0);
  const subPix = sub * (1 - pix);
  const freeAt = 299;
  const left = Math.max(0, freeAt - subPix);
  const ni = Math.max(1, Math.min(10, Math.floor(sub / 20)));

  const ci = CONDS.findIndex((c) => c.id === s.cond);
  const cc = CONDS[ci];

  const qn = s.query.trim().toLowerCase();
  const all: SearchResult[] = [
    ...CARDS.map((c0) => mergedCard(c0, s.api)).map((c) => ({ id: c.id, name: c.name, sub: `${c.set} · ${c.num}`, color: POKE_TYPES[c.type].c, target: "#cartas", priceLabel: fmt(c.price * (1 - pix)) })),
    ...PRODUCTS.map((p) => ({ id: p.id, name: p.name, sub: p.meta, color: p.color, target: "#boosters", priceLabel: fmt(p.price * (1 - pix)) })),
  ];
  const results = (qn ? all.filter((r) => (r.name + " " + r.sub).toLowerCase().includes(qn)) : all.slice(0, 5)).slice(0, 6);

  return {
    storeName: STORE_CONFIG.storeName,
    pix: STORE_CONFIG.pixDiscount,
    isMobile: mob,
    L,
    storeLetters: Array.from(STORE_CONFIG.storeName).map((ch) => (ch === " " ? " " : ch)),
    navInicio: s.navActive === "inicio",
    navProdutos: s.navActive === "produtos",
    tabs,
    cardsView,
    chips,
    productsView,
    apiNote: s.apiStatus === "ok" ? "Imagens e preços de referência: TCGdex API (TCGplayer / Cardmarket), convertidos para BRL." : s.apiStatus === "loading" ? "Carregando cartas da TCGdex API…" : "TCGdex indisponível — exibindo dados locais.",
    cartCount: count,
    badgeOpacity: count ? 1 : 0,
    cartLabel: `Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`,
    cartItems,
    cartEmpty: count === 0,
    cartHas: count > 0,
    subtotal: fmt(sub),
    pixTotal: fmt(subPix),
    instTotal: ni > 1 ? `ou ${ni}x de ${fmt(sub / ni)} sem juros` : "",
    shipText: count === 0 ? `Frete grátis acima de ${fmt(freeAt)} no PIX` : left > 0 ? `Faltam ${fmt(left)} para o frete grátis` : "Você ganhou frete grátis",
    shipW: Math.min(100, (subPix / freeAt) * 100) + "%",
    drawerX: s.cartOpen ? "translateX(0%)" : "translateX(110%)",
    drawerFade: s.cartOpen ? 1 : 0,
    drawerEvents: s.cartOpen ? "auto" : "none",
    drawerHidden: !s.cartOpen,
    stepCart: s.step === "cart",
    stepCheckout: s.step === "checkout",
    stepDone: s.step === "done",
    payPix: s.pay === "pix",
    payCard: s.pay === "card",
    payPixBorder: s.pay === "pix" ? "#ffd23f" : "rgba(255,255,255,.14)",
    payCardBorder: s.pay === "card" ? "#ffd23f" : "rgba(255,255,255,.14)",
    payTotal: s.pay === "pix" ? fmt(subPix) : fmt(sub),
    orderId: s.orderId,
    conds: CONDS.map((c) => ({ id: c.id, active: c.id === s.cond, color: c.id === s.cond ? "#0a0b10" : "#c9cad3" })),
    cond: { ...cc, pctW: cc.pct + "%", w1: cc.w[0], w2: cc.w[1], w3: cc.w[2] },
    condLeft: `calc(5px + (100% - 10px) * ${ci / 4})`,
    faqs: FAQS.map((f, i) => ({
      ...f,
      id: "faq-" + i,
      open: s.faq === i,
      rows: s.faq === i ? "1fr" : "0fr",
      op: s.faq === i ? 1 : 0,
      rot: s.faq === i ? "45deg" : "0deg",
      iconBg: s.faq === i ? "#ffd23f" : "rgba(255,255,255,0)",
      iconColor: s.faq === i ? "#0a0b10" : "#f3f1ea",
    })),
    events: EVENTS,
    testimonials: TESTIMONIALS,
    galleryA: GALLERY.slice(0, 4),
    galleryB: GALLERY.slice(4),
    searchFade: s.searchOpen ? 1 : 0,
    searchEvents: s.searchOpen ? "auto" : "none",
    searchHidden: !s.searchOpen,
    query: s.query,
    results,
    noResults: results.length === 0,
    menuOpen: s.menuOpen,
    menuClip: s.menuOpen ? "circle(150% at calc(100% - 44px) 44px)" : "circle(0% at calc(100% - 44px) 44px)",
    menuEvents: s.menuOpen ? "auto" : "none",
    menuHidden: !s.menuOpen,
    vipEmail: s.vipChannel === "email",
    vipWhats: s.vipChannel === "whats",
    vipEmailColor: s.vipChannel === "email" ? "#0a0b10" : "#c9cad3",
    vipEmailBg: s.vipChannel === "email" ? "#f3f1ea" : "rgba(255,255,255,0)",
    vipWhatsColor: s.vipChannel === "whats" ? "#0a0b10" : "#c9cad3",
    vipWhatsBg: s.vipChannel === "whats" ? "#f3f1ea" : "rgba(255,255,255,0)",
    vipType: s.vipChannel === "email" ? "email" : "tel",
    vipPh: s.vipChannel === "email" ? "seu@email.com" : "(11) 90000-0000",
    vipLabel: s.vipChannel === "email" ? "Seu e-mail" : "Seu WhatsApp",
    vipValue: s.vipValue,
    vipError: s.vipError,
    vipForm: !s.vipDone,
    vipDone: s.vipDone,
    interestsView: ["Reposição", "Pré-vendas", "Torneios", "Cartas avulsas"].map((n) => {
      const on = s.interests.includes(n);
      return { n, on, bg: on ? "rgba(255,210,63,.14)" : "rgba(255,255,255,0)", bd: on ? "#ffd23f" : "rgba(255,255,255,.16)", fg: on ? "#ffd23f" : "#c9cad3" };
    }),
  };
}

export type ViewModel = ReturnType<typeof buildViewModel>;
