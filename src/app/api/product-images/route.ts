import { NextResponse } from "next/server";
import { getProductImages } from "@/lib/sealedProducts.server";

// Ponte entre o client (sem acesso à API key) e a Pokémon TCG API
// (pokemontcgapi.com). Mantém a chave só no servidor e repassa ao front-end
// apenas as URLs de imagem já resolvidas. Cache/revalidação 1x/dia vive em
// `"use cache"` dentro de lib/sealedProducts.server.ts.
export async function GET() {
  const images = await getProductImages();
  return NextResponse.json(images);
}
