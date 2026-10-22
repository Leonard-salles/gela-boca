// Mapeamento curado: cada produto mockado (src/lib/data.ts → PRODUCTS) para a
// busca equivalente na Pokemon Price Tracker API (pokemonpricetracker.com),
// que cataloga produtos lacrados reais (booster boxes, ETBs, bundles, coleções)
// com preço de mercado (TCGPlayer). Os nomes em PT-BR do mock são
// fictícios/traduzidos, então aqui apontamos para o nome em inglês do set real
// mais próximo + tipo de produto, só para trazer uma foto de embalagem
// condizente. `sortOrder: "asc"` + `sortBy: "name"` (default) garante que o
// produto "base" (nome mais curto, sem variante/case/bundle regional) vem
// primeiro — validado manualmente contra a API para cada entrada abaixo.
export interface SealedQuery {
  search: string;
}

export const SEALED_PRODUCT_QUERIES: Record<string, SealedQuery> = {
  p1: { search: "Prismatic Evolutions Booster Pack" },
  p2: { search: "Surging Sparks Booster Pack" },
  p3: { search: "Prismatic Evolutions Elite Trainer Box" },
  p4: { search: "Surging Sparks Elite Trainer Box" },
  p5: { search: "Stellar Crown Booster Bundle" },
  p6: { search: "Obsidian Flames Booster Box" },
  p7: { search: "151 Binder Collection" },
  p8: { search: "Paldean Fates Booster Bundle" },
  launch: { search: "Obsidian Flames Elite Trainer Box" },
  rip: { search: "Surging Sparks Booster Pack" },
};
