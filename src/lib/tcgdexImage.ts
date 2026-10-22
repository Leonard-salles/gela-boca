// Monta a URL de imagem em alta resolução de uma carta direto na TCGdex API
// (https://tcgdex.dev) — gratuita, sem API key, sem request extra: o path é
// determinístico a partir do `apiId` do mock (ex.: "sv03.5-199").
// Regra do projeto: imagem de CARTA sempre vem da TCGdex; boosters/ETBs/
// bundles/boxes vêm da Pokemon Price Tracker API (ver sealedProducts.server.ts).
function tcgdexAssetPath(apiId: string): string {
  const [setId, localId] = apiId.split("-");
  const serie = setId.match(/^[a-z]+/i)?.[0] ?? setId; // "sv03.5" -> "sv", "swsh12" -> "swsh"
  return `https://assets.tcgdex.net/en/${serie}/${setId}/${localId}`;
}

export function tcgdexCardImageUrl(apiId: string): string {
  return `${tcgdexAssetPath(apiId)}/high.webp`;
}

// Mesma resolução do /high.webp, mas em PNG sem compressão lossy. Vale o custo
// extra de bytes em exibições grandes (ex.: cartão do Hero, quase em tamanho
// nativo), onde os artefatos do WebP ficam visíveis; nos cards pequenos do
// carrossel o webp já é imperceptível, então não vale trocar lá.
export function tcgdexCardImageUrlHD(apiId: string): string {
  return `${tcgdexAssetPath(apiId)}/high.png`;
}
