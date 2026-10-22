import "server-only";
import { cacheLife } from "next/cache";
import { SEALED_PRODUCT_QUERIES } from "./sealedProductQueries";

// Integração server-only com a Pokemon Price Tracker API
// (pokemonpricetracker.com) — provedor independente de catálogo/preços de
// produtos lacrados (booster boxes, ETBs, bundles, coleções), com imagens
// hospedadas no CDN do TCGplayer. Exige API key própria (header
// `Authorization: Bearer`) e cobra créditos por request — nunca deve ser
// chamada direto do client. Chave: variável de ambiente
// POKEMON_PRICE_TRACKER_API_KEY (ver .env.local.example).

const API_BASE = "https://www.pokemonpricetracker.com/api/v2";

interface SealedProductApiItem {
  id: string;
  name: string;
  setName: string | null;
  imageCdnUrl800?: string | null;
  imageCdnUrl400?: string | null;
  imageUrl?: string | null;
}

interface SealedListResponse {
  data: SealedProductApiItem[];
}

async function searchSealedProduct(search: string): Promise<string | null> {
  "use cache";
  // Catálogo muda pouco; revalida 1x/dia para poupar os créditos diários do
  // plano gratuito (cada busca custa 1 crédito com limit=1).
  cacheLife("days");

  const key = process.env.POKEMON_PRICE_TRACKER_API_KEY;
  if (!key) return null;

  // Billing é por `limit` pedido, não por resultados retornados — limit=1
  // custa 1 crédito. sortOrder=asc traz o produto "base" primeiro (nome mais
  // curto, sem variante regional/bundle/case), ver sealedProductQueries.ts.
  const params = new URLSearchParams({ search, limit: "1", sortOrder: "asc" });

  try {
    const res = await fetch(`${API_BASE}/sealed-products?${params.toString()}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) {
      console.error(`pokemonpricetracker.com: ${res.status} ao buscar "${search}"`);
      return null;
    }
    const json: SealedListResponse = await res.json();
    const item = json.data?.[0];
    return item?.imageCdnUrl800 ?? item?.imageCdnUrl400 ?? item?.imageUrl ?? null;
  } catch (e) {
    console.error(`pokemonpricetracker.com: falha ao buscar "${search}"`, e);
    return null;
  }
}

export async function getProductImages(): Promise<Record<string, string | null>> {
  const entries = Object.entries(SEALED_PRODUCT_QUERIES);
  const results = await Promise.all(entries.map(([, query]) => searchSealedProduct(query.search)));
  return Object.fromEntries(entries.map(([id], i) => [id, results[i]]));
}
