// Tipos centrais do domínio da loja. Espelham 1:1 os dados originais do protótipo
// (Loja.dc.html) para permitir a migração direta da lógica sem perda de fidelidade.

export type PokeTypeId =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "dark"
  | "dragon"
  | "colorless";

export interface PokeType {
  c: string; // cor
  l: string; // rótulo em pt-BR
  a: [string, number][]; // ataques [nome, dano]
}

export type CardTier = "comum" | "rara" | "ultra" | "secreta";

export interface CardDef {
  id: string;
  apiId: string; // id na TCGdex (ex.: "sv03.5-199")
  name: string;
  set: string;
  num: string;
  rarity: string;
  rarityShort: string;
  tier: CardTier;
  type: PokeTypeId;
  cond: string;
  price: number;
  stock: number;
  hp: number;
  tabs: string[];
  // enriquecido em tempo de execução pela TCGdex API
  img?: string | null;
  illus?: string;
  priceSrc?: string;
}

export type ProductKind = "booster" | "etb" | "bundle" | "box";

export interface ProductDef {
  id: string;
  name: string;
  kind: ProductKind;
  kindLabel: string;
  meta: string;
  price: number;
  stock: number;
  max: number;
  color: string;
}

export interface CondDef {
  id: "NM" | "LP" | "MP" | "HP";
  name: string;
  pct: number;
  mult: string;
  desc: string;
  w: [number, number, number];
}

export interface FaqDef {
  q: string;
  a: string;
}

export interface EventDef {
  d: string;
  m: string;
  title: string;
  meta: string;
  spots: string;
}

export interface TestimonialDef {
  q: string;
  n: string;
  city: string;
  color: string;
}

export interface GalleryDef {
  label: string;
  w: string;
}

export interface CartItem {
  id: string;
  name: string;
  sub: string;
  price: number;
  color: string;
  qty: number;
}

export interface TcgdexPricing {
  tcgplayer?: Record<string, { marketPrice?: number; midPrice?: number } | number>;
  cardmarket?: { trend?: number; avg?: number };
}

export interface TcgdexCardResponse {
  image?: string;
  name?: string;
  hp?: number;
  illustrator?: string;
  pricing?: TcgdexPricing;
}

export interface ApiEnrichment {
  img: string | null;
  name?: string;
  hp?: number;
  illus?: string;
  price: { brl: number; src: string; ref: string } | null;
}
