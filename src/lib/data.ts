import type {
  CardDef,
  CondDef,
  EventDef,
  FaqDef,
  GalleryDef,
  PokeType,
  PokeTypeId,
  ProductDef,
  TestimonialDef,
} from "./types";

// Mock data 1:1 com o protótipo original (Loja.dc.html). Preços, estoque, eventos,
// depoimentos e números seguem mockados — ver ASSUMPTIONS.md do protótipo original.

export const POKE_TYPES: Record<PokeTypeId, PokeType> = {
  fire: { c: "#ff6b3d", l: "Fogo", a: [["Brasa", 40], ["Labareda Total", 220]] },
  water: { c: "#3fa7ff", l: "Água", a: [["Jato d'Água", 30], ["Maré Alta", 160]] },
  grass: { c: "#4fd18b", l: "Planta", a: [["Folha Navalha", 30], ["Raiz Profunda", 90]] },
  electric: { c: "#ffd23f", l: "Elétrico", a: [["Faísca", 30], ["Trovão Final", 200]] },
  psychic: { c: "#e46cff", l: "Psíquico", a: [["Mente Clara", 40], ["Onda Psíquica", 150]] },
  dark: { c: "#8f96c8", l: "Noturno", a: [["Mordida Sombria", 50], ["Lua Negra", 180]] },
  dragon: { c: "#d8b04a", l: "Dragão", a: [["Rugido", 60], ["Meteoro Celeste", 250]] },
  colorless: { c: "#d8d2c2", l: "Incolor", a: [["Investida", 40], ["Vento Sagrado", 170]] },
};

export const CARDS: CardDef[] = [
  { id: "c1", apiId: "sv03.5-199", name: "Charizard ex", set: "Escarlate e Violeta 151", num: "199/165", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "fire", cond: "NM", price: 1890, stock: 2, hp: 330, tabs: ["procuradas", "lendarias"] },
  { id: "c2", apiId: "sv08-238", name: "Pikachu ex", set: "Fagulhas Impetuosas", num: "238/191", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "electric", cond: "NM", price: 1450, stock: 3, hp: 200, tabs: ["novidades", "procuradas"] },
  { id: "c3", apiId: "sv08.5-161", name: "Umbreon ex", set: "Evoluções Prismáticas", num: "161/131", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "dark", cond: "NM", price: 3200, stock: 1, hp: 280, tabs: ["novidades", "procuradas"] },
  { id: "c4", apiId: "sv03.5-205", name: "Mew ex", set: "Escarlate e Violeta 151", num: "205/165", rarity: "Hiper Rara", rarityShort: "HR", tier: "secreta", type: "psychic", cond: "NM", price: 420, stock: 5, hp: 180, tabs: ["procuradas", "lendarias"] },
  { id: "c5", apiId: "sv06-214", name: "Greninja ex", set: "Máscaras do Crepúsculo", num: "214/167", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "water", cond: "LP", price: 980, stock: 2, hp: 310, tabs: ["novidades"] },
  { id: "c6", apiId: "swsh12-186", name: "Lugia V", set: "Tempestade Prateada", num: "186/195", rarity: "Arte Alternativa", rarityShort: "AA", tier: "ultra", type: "colorless", cond: "NM", price: 1150, stock: 1, hp: 220, tabs: ["lendarias", "procuradas"] },
  { id: "c7", apiId: "swsh7-218", name: "Rayquaza VMAX", set: "Céus em Evolução", num: "218/203", rarity: "Secreta Alternativa", rarityShort: "SR", tier: "secreta", type: "dragon", cond: "LP", price: 2600, stock: 1, hp: 320, tabs: ["lendarias"] },
  { id: "c8", apiId: "sv01-245", name: "Gardevoir ex", set: "Escarlate e Violeta", num: "245/198", rarity: "Ultra Rara", rarityShort: "UR", tier: "ultra", type: "psychic", cond: "NM", price: 260, stock: 6, hp: 310, tabs: ["novidades"] },
  { id: "c9", apiId: "sv07-170", name: "Terapagos ex", set: "Coroa Estelar", num: "170/175", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "colorless", cond: "NM", price: 510, stock: 4, hp: 230, tabs: ["novidades", "lendarias"] },
  { id: "c10", apiId: "sv02-203", name: "Magikarp", set: "Evoluções em Paldea", num: "203/193", rarity: "Ilustração Rara", rarityShort: "IR", tier: "rara", type: "water", cond: "NM", price: 290, stock: 3, hp: 30, tabs: ["procuradas"] },
  { id: "c11", apiId: "sv03.5-166", name: "Bulbasaur", set: "Escarlate e Violeta 151", num: "166/165", rarity: "Ilustração Rara", rarityShort: "IR", tier: "rara", type: "grass", cond: "NM", price: 140, stock: 7, hp: 70, tabs: ["novidades"] },
  { id: "c12", apiId: "sv03.5-007", name: "Squirtle", set: "Escarlate e Violeta 151", num: "007/165", rarity: "Comum", rarityShort: "C", tier: "comum", type: "water", cond: "NM", price: 4.9, stock: 24, hp: 60, tabs: ["novidades"] },
  { id: "c13", apiId: "sv10-231", name: "Mewtwo ex", set: "Rivais Predestinados", num: "231/182", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "psychic", cond: "NM", price: 2890, stock: 1, hp: 280, tabs: ["novidades", "procuradas", "lendarias"] },
  { id: "c15", apiId: "sv03.5-009", name: "Blastoise ex", set: "Escarlate e Violeta 151", num: "009/165", rarity: "Ultra Rara", rarityShort: "UR", tier: "ultra", type: "water", cond: "NM", price: 195, stock: 6, hp: 330, tabs: ["novidades", "procuradas"] },
  { id: "c18", apiId: "sv08.5-073", name: "Dragapult ex", set: "Evoluções Prismáticas", num: "073/131", rarity: "Ilustração Especial", rarityShort: "SIR", tier: "secreta", type: "dragon", cond: "NM", price: 890, stock: 2, hp: 300, tabs: ["novidades", "lendarias"] },
  { id: "c19", apiId: "sv08.5-041", name: "Sylveon ex", set: "Evoluções Prismáticas", num: "041/131", rarity: "Ultra Rara", rarityShort: "UR", tier: "ultra", type: "colorless", cond: "NM", price: 220, stock: 6, hp: 280, tabs: ["novidades"] },
  { id: "c25", apiId: "sv10-039", name: "Ethan's Ho-Oh ex", set: "Rivais Predestinados", num: "039/182", rarity: "Ultra Rara", rarityShort: "UR", tier: "ultra", type: "fire", cond: "NM", price: 260, stock: 4, hp: 330, tabs: ["lendarias", "procuradas"] },
  { id: "c27", apiId: "sv02-061", name: "Chien-Pao ex", set: "Evoluções em Paldea", num: "061/193", rarity: "Ultra Rara", rarityShort: "UR", tier: "ultra", type: "water", cond: "NM", price: 175, stock: 6, hp: 240, tabs: ["novidades", "procuradas"] },
];

export const PRODUCTS: ProductDef[] = [
  { id: "p1", name: "Booster Evoluções Prismáticas", kind: "booster", kindLabel: "Booster", meta: "10 cartas por pacote", price: 39.9, stock: 120, max: 200, color: "#e46cff" },
  { id: "p2", name: "Booster Fagulhas Impetuosas", kind: "booster", kindLabel: "Booster", meta: "10 cartas por pacote", price: 29.9, stock: 64, max: 200, color: "#ffd23f" },
  { id: "p3", name: "Elite Trainer Box Evoluções Prismáticas", kind: "etb", kindLabel: "ETB", meta: "9 boosters + acessórios", price: 649.9, stock: 3, max: 40, color: "#e46cff" },
  { id: "p4", name: "Elite Trainer Box Fagulhas Impetuosas", kind: "etb", kindLabel: "ETB", meta: "9 boosters + acessórios", price: 389.9, stock: 18, max: 40, color: "#ffd23f" },
  { id: "p5", name: "Booster Bundle Coroa Estelar", kind: "bundle", kindLabel: "Bundle", meta: "6 boosters lacrados", price: 189.9, stock: 22, max: 60, color: "#3fa7ff" },
  { id: "p6", name: "Booster Box Chamas Obsidianas", kind: "box", kindLabel: "Booster Box", meta: "36 boosters lacrados", price: 1099.9, stock: 5, max: 12, color: "#ff6b3d" },
  { id: "p7", name: "Coleção Especial 151", kind: "box", kindLabel: "Coleção", meta: "Binder + 4 boosters", price: 459.9, stock: 9, max: 30, color: "#e8392b" },
  { id: "p8", name: "Booster Bundle Destinos de Paldea", kind: "bundle", kindLabel: "Bundle", meta: "6 boosters lacrados", price: 219.9, stock: 41, max: 60, color: "#4fd18b" },
];

export const CONDS: CondDef[] = [
  { id: "NM", name: "Near Mint", pct: 100, mult: "100% do valor de referência", desc: "Praticamente perfeita. Bordas e cantos intactos, sem riscos visíveis a olho nu.", w: [0, 0, 0] },
  { id: "LP", name: "Lightly Played", pct: 85, mult: "cerca de 85% do valor", desc: "Desgaste leve: pequenas marcas brancas nas bordas ou um risco fino visível só contra a luz.", w: [0.45, 0.25, 0] },
  { id: "MP", name: "Moderately Played", pct: 70, mult: "cerca de 70% do valor", desc: "Bordas esbranquiçadas, riscos visíveis e cantos levemente arredondados. Ótima para jogar.", w: [0.8, 0.6, 0] },
  { id: "HP", name: "Heavily Played", pct: 50, mult: "cerca de 50% do valor", desc: "Desgaste forte: vincos, marcas de dobra ou riscos profundos. Sem rasgos ou danos de água.", w: [1, 1, 1] },
];

export const FAQS: FaqDef[] = [
  { q: "Quanto tempo leva o envio?", a: "Postamos em até 1 dia útil após a confirmação do pagamento. O prazo dos Correios ou da transportadora aparece no checkout pelo seu CEP, e o código de rastreio chega por e-mail e WhatsApp." },
  { q: "As cartas são originais?", a: "Sim. Produtos lacrados vêm de distribuidores oficiais e cada carta avulsa é conferida com lupa, luz e comparação de impressão antes de entrar no estoque." },
  { q: "Como funciona a pré-venda?", a: "Você garante o produto pelo preço de pré-venda e nós enviamos assim que ele chega, normalmente na data oficial de lançamento. Se houver atraso, avisamos e você pode cancelar com reembolso integral." },
  { q: "Posso trocar ou devolver?", a: "Produtos lacrados podem ser devolvidos em até 7 dias após o recebimento, sem violação do lacre. Cartas avulsas com divergência de condição são trocadas ou reembolsadas." },
  { q: "Como as cartas são embaladas?", a: "Sleeve, toploader e saquinho selado, dentro de caixa rígida com proteção contra impacto. Boxes vão com reforço de canto." },
];

export const EVENTS: EventDef[] = [
  { d: "17", m: "Out", title: "Liga semanal", meta: "Sábado · 14h · Formato Standard", spots: "12 vagas" },
  { d: "23", m: "Out", title: "Noite de trocas", meta: "Sexta · 19h · Aberto a todos", spots: "Entrada livre" },
  { d: "07", m: "Nov", title: "Pré-release Chamas Ancestrais", meta: "Sábado · 10h · Selado", spots: "6 vagas" },
  { d: "21", m: "Nov", title: "Torneio Standard mensal", meta: "Sábado · 13h · Inscrição R$ 30", spots: "20 vagas" },
];

export const TESTIMONIALS: TestimonialDef[] = [
  { q: "Chegou em 2 dias, com toploader e caixa rígida. A Umbreon veio perfeita.", n: "Marina S.", city: "São Paulo · SP", color: "#8f96c8" },
  { q: "Abri o ETB na mesa da loja com meus amigos. Melhor sábado do mês.", n: "Rafael T.", city: "Curitiba · PR", color: "#ff6b3d" },
  { q: "Vendi meu binder antigo e saí com crédito para montar meu deck.", n: "Júlia M.", city: "Belo Horizonte · MG", color: "#4fd18b" },
  { q: "Condição NM de verdade. Conferi com lupa e estava impecável.", n: "Diego A.", city: "Recife · PE", color: "#3fa7ff" },
  { q: "A pré-venda chegou no dia do lançamento. Sem enrolação.", n: "Camila R.", city: "Porto Alegre · RS", color: "#ffd23f" },
  { q: "Atendimento rápido e honesto sobre o estado de cada carta.", n: "Lucas P.", city: "Salvador · BA", color: "#e46cff" },
];

export const GALLERY: GalleryDef[] = [
  { label: "Foto · mesas de jogo", w: "clamp(260px,28vw,440px)" },
  { label: "Foto · torneio de sábado", w: "clamp(200px,18vw,280px)" },
  { label: "Foto · vitrine de boxes", w: "clamp(240px,24vw,380px)" },
  { label: "Foto · abertura de booster", w: "clamp(200px,20vw,300px)" },
  { label: "Foto · fachada", w: "clamp(220px,22vw,340px)" },
  { label: "Foto · noite de trocas", w: "clamp(260px,28vw,440px)" },
  { label: "Foto · binder da casa", w: "clamp(200px,18vw,280px)" },
  { label: "Foto · premiação", w: "clamp(240px,24vw,360px)" },
];

export const BADGE_COLOR_BY_TIER: Record<string, string> = {
  secreta: "#ffd23f",
  ultra: "#e46cff",
  rara: "#3fa7ff",
  comum: "#a3a6b4",
};

// Configuração "Tweaks" do protótipo original (props do componente)
export const STORE_CONFIG = {
  storeName: "Gela Boca",
  pixDiscount: 5,
  preloader: "sessão" as "sessão" | "sempre" | "desligado",
  revealTrigger: "hover" as "hover" | "inView",
  holoIntensity: 1,
  smoothScroll: true,
  customCursor: true,
  useApi: true,
  usdBrl: 5.4,
  eurBrl: 6.3,
};
