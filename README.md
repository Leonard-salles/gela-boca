# Gela Boca — loja Pokémon TCG (Next.js)

Recriação 1:1 do protótipo `Loja.dc.html` (Claude Design) em **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, com o mesmo motor de animação em **GSAP + ScrollTrigger + Flip + Lenis**.

Nome da loja: **Gela Boca** (provisório — trocar em `src/lib/data.ts`, `STORE_CONFIG.storeName`).

## Rodando

```bash
npm install
cp .env.local.example .env.local   # cole sua chave da Pokemon Price Tracker API (ver abaixo)
npm run dev     # http://localhost:3000
npm run build && npm run start   # build de produção
```

## Estrutura

- `src/app/page.tsx` — composição da página e orquestração do motor de animação (boot, resize, esc, lock de scroll).
- `src/hooks/useShopState.ts` — estado "cru" da loja (carrinho, abas, filtros, modais…).
- `src/lib/viewModel.ts` — valores derivados (preços em PIX/parcelado, frete grátis, textos computados) — porte do `renderVals()` original.
- `src/lib/fx.ts` — motor de animação (preloader, hero carrossel, cards holográficos, marquees, pin de scroll, transição "íris", cursor customizado, drag do carrossel) — porte 1:1 de `fx.js`.
- `src/lib/cardFace.ts` — geração da frente das cartas em canvas (fallback) + integração com a **TCGdex API** (imagem oficial + preço de mercado TCGplayer/Cardmarket convertido para BRL).
- `src/lib/sealedProducts.server.ts` + `src/lib/sealedProductQueries.ts` — integração server-only com a **Pokemon Price Tracker API** (pokemonpricetracker.com) para fotos reais de boosters/ETBs/bundles/boxes, servida via `src/app/api/product-images/route.ts`.
- `src/lib/data.ts` — dados mockados (cartas, produtos, FAQ, eventos, depoimentos, galeria).
- `src/components/*` — uma seção por arquivo, espelhando as `<section>` do protótipo original.

## O que é mock / placeholder (igual ao protótipo original)

- Endereço, CNPJ e WhatsApp da loja.
- GIFs do hero (`public/banners/banner-1.gif` e `banner-2.gif`) — hoje são arquivos vazios; troque por GIFs verticais 9:16 reais (ou veja a nota abaixo sobre vídeo).
- Fotos de categorias, galeria da loja e verso das cartas — placeholders estilizados.
- Fotos de boosters/ETBs/bundles/boxes — reais via Pokemon Price Tracker API **se** `POKEMON_PRICE_TRACKER_API_KEY` estiver configurada (ver abaixo); sem a chave, cai no placeholder estilizado por cor, sem quebrar o layout.
- Preço, estoque, eventos e depoimentos — mockados em `src/lib/data.ts`.
- Checkout é só uma simulação (não processa pagamento real).

## Dados reais já conectados

- Frente das cartas e preço de referência vêm da **TCGdex API** (`https://api.tcgdex.net`), com fallback para a arte gerada em canvas se a API/imagem falhar. É pública, sem API key, chamada direto do client.
- Fotos de boosters/ETBs/bundles/boxes vêm da **Pokemon Price Tracker API** (`pokemonpricetracker.com`), um provedor independente de catálogo/preços de produtos lacrados (dados do TCGplayer). Essa API **exige conta e API key própria** por request (cabeçalho `Authorization: Bearer`) e cobra créditos por chamada, então:
  1. Crie uma chave grátis em https://www.pokemonpricetracker.com/api (plano Free: 100 créditos/dia)
  2. Copie `.env.local.example` para `.env.local` e cole a chave em `POKEMON_PRICE_TRACKER_API_KEY`
  3. A chave nunca chega ao browser: o client busca em `/api/product-images` (nossa própria rota), que repassa só as URLs de imagem já resolvidas
  4. Cada busca usa `limit=1` (1 crédito) — 8 produtos = 8 créditos por atualização completa, bem abaixo do limite diário do plano grátis
  5. Cacheado via `"use cache"` + `cacheLife("days")` (revalida 1x/dia) para não gastar créditos à toa e manter as fotos frescas
  6. O mapeamento produto → busca na API (nome em inglês do set real mais próximo + tipo de produto, validado manualmente contra resultados reais) fica em `src/lib/sealedProductQueries.ts`, editável se os produtos mockados mudarem

## Próximos passos sugeridos

- Trocar os GIFs por `<video autoPlay muted loop playsInline>` (WebM/MP4) para melhor performance, mantendo o GIF como fallback.
- Páginas `/produtos` e `/produtos/[slug]` (hoje tudo vive na landing, como no protótipo).
- Testes end-to-end do fluxo de carrinho/checkout simulado.
