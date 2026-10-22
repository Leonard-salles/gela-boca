"use client";

import { useEffect, useRef } from "react";
import { FONT_BODY } from "@/lib/fonts";
import { CARDS, STORE_CONFIG } from "@/lib/data";
import { loadApi, makeFaces } from "@/lib/cardFace";
import { tcgdexCardImageUrl } from "@/lib/tcgdexImage";
import { initFx, type FxOptions } from "@/lib/fx";
import { buildViewModel } from "@/lib/viewModel";
import { useShopState, type CardsTab, type ProductFilter } from "@/hooks/useShopState";

import { Preloader, IrisOverlay, CursorEl, ProgressBar } from "@/components/Overlays";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BenefitsMarquee } from "@/components/BenefitsMarquee";
import { Categories } from "@/components/Categories";
import { CardsCarousel } from "@/components/CardsCarousel";
import { Launch } from "@/components/Launch";
import { Rip } from "@/components/Rip";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { MobileMenu } from "@/components/MobileMenu";

type FxController = ReturnType<typeof initFx>;

export default function Page() {
  const s = useShopState();
  const {
    vw, setVw, tab, setTab, filter, setFilter, cart, setCart, cartOpen, setCartOpen, step, setStep, pay, setPay,
    orderId, setOrderId, cond, faq, menuOpen, setMenuOpen, searchOpen, setSearchOpen, query, setQuery,
    vipChannel, vipValue, vipDone, vipError, interests,
    navActive, setNavActive, api, setApi, apiStatus, setApiStatus,
    productImages, setProductImages,
  } = s;

  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fxRef = useRef<FxController | null>(null);
  const flipStateRef = useRef<unknown>(null);
  const pendingCardsIn = useRef(false);
  const prevOverlayOpen = useRef(false);
  const prevMenuOpen = useRef(false);
  const prevSearchOpen = useRef(false);

  // Boot: inicializa o motor de animação (GSAP/Lenis) de imediato — não espera
  // as cartas, para o site inteiro não ficar congelado se a TCGdex demorar.
  // Preço/imagem das cartas (TCGdex) carregam em paralelo e só atualizam o
  // que depende deles (cardsView, reveal das cartas) quando chegarem.
  useEffect(() => {
    if (!rootRef.current) return;
    const options: FxOptions = {
      get: () => ({
        preloader: STORE_CONFIG.preloader,
        revealTrigger: STORE_CONFIG.revealTrigger,
        holo: STORE_CONFIG.holoIntensity,
        smooth: STORE_CONFIG.smoothScroll,
        cursor: STORE_CONFIG.customCursor,
      }),
      onNav: (n) => setNavActive((prev) => (prev === n ? prev : n)),
      onHero: () => {},
      onIrisNav: () => {
        setMenuOpen(false);
        setSearchOpen(false);
      },
    };
    fxRef.current = initFx(rootRef.current, options);
    return () => {
      fxRef.current?.destroy();
      fxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let dead = false;
    (async () => {
      const apiData = STORE_CONFIG.useApi ? await loadApi(CARDS) : {};
      if (dead) return;
      await makeFaces(CARDS.map((c) => ({ ...c, img: apiData[c.id]?.img ?? null })));
      if (dead) return;
      setApi(apiData);
      setApiStatus(Object.keys(apiData).length ? "ok" : "off");
    })();
    return () => {
      dead = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fotos reais de boosters/ETBs/bundles/boxes via Pokémon TCG API
  // (pokemontcgapi.com, chave só no servidor — ver /api/product-images).
  // Roda em paralelo ao boot do fx; sem imagem, mantém o placeholder estilizado.
  useEffect(() => {
    let dead = false;
    fetch("/api/product-images")
      .then((r) => (r.ok ? r.json() : {}))
      .then((images: Record<string, string | null>) => {
        if (!dead) setProductImages(images);
      })
      .catch(() => {});
    return () => {
      dead = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize debounced (160ms), igual ao protótipo.
  useEffect(() => {
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        setVw(window.innerWidth);
        fxRef.current?.onResize();
      }, 160);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc fecha carrinho, busca e menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (cartOpen || searchOpen || menuOpen)) {
        setCartOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, searchOpen, menuOpen, setCartOpen, setSearchOpen, setMenuOpen]);

  // Trava o scroll (Lenis) enquanto algum painel estiver aberto.
  const anyOverlayOpen = cartOpen || searchOpen || menuOpen;
  useEffect(() => {
    if (fxRef.current && anyOverlayOpen !== prevOverlayOpen.current) fxRef.current.lock(anyOverlayOpen);
    prevOverlayOpen.current = anyOverlayOpen;
  }, [anyOverlayOpen]);

  useEffect(() => {
    if (menuOpen && !prevMenuOpen.current) fxRef.current?.menuIn();
    prevMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && !prevSearchOpen.current) setTimeout(() => searchInputRef.current?.focus(), 80);
    prevSearchOpen.current = searchOpen;
  }, [searchOpen]);

  useEffect(() => {
    fxRef.current?.syncIndicators();
  }, [navActive, tab, filter, vw]);

  useEffect(() => {
    if (pendingCardsIn.current) {
      pendingCardsIn.current = false;
      fxRef.current?.cardsIn();
    }
  }, [tab]);

  useEffect(() => {
    if (flipStateRef.current) {
      const st = flipStateRef.current;
      flipStateRef.current = null;
      fxRef.current?.flipFrom(st);
    }
  }, [filter]);

  // ---- ações ligadas ao motor de animação (equivalente aos métodos do Component original) ----
  const setTabAction = (id: string) => {
    if (id === tab) return;
    if (!fxRef.current) {
      setTab(id as CardsTab);
      return;
    }
    pendingCardsIn.current = true;
    fxRef.current.cardsOut(() => setTab(id as CardsTab));
  };

  const setFilterAction = (f: string) => {
    if (f === filter) return;
    if (!fxRef.current) {
      setFilter(f as ProductFilter);
      return;
    }
    flipStateRef.current = fxRef.current.flipState();
    setFilter(f as ProductFilter);
  };

  const addToCart = (item: { id: string; name: string; sub: string; price: number; color: string }, btn: HTMLElement | null) => {
    const done = () => {
      setCart((prev) => {
        const ex = prev.find((i) => i.id === item.id);
        return ex ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { ...item, qty: 1 }];
      });
      fxRef.current?.badgePop();
    };
    if (fxRef.current && btn) fxRef.current.capture(btn, item.color, done);
    else done();
  };

  const qtyDelta = (id: string, d: number) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));

  const goTo = (sel: string, x?: number, y?: number) => {
    setSearchOpen(false);
    setMenuOpen(false);
    setCartOpen(false);
    const cx = x ?? window.innerWidth / 2,
      cy = y ?? window.innerHeight / 2;
    if (fxRef.current) setTimeout(() => fxRef.current!.iris(cx, cy, sel), 30);
  };
  const handleSearchGo = (target: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    goTo(target, e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderId("Nº " + Math.floor(100000 + Math.random() * 900000));
    setStep("done");
    setCart([]);
  };

  const vm = buildViewModel({ vw, tab, filter, cart, cartOpen, step, pay, orderId, cond, faq, menuOpen, searchOpen, query, vipChannel, vipValue, vipDone, vipError, interests, navActive, api, apiStatus, productImages });

  return (
    <div ref={rootRef} style={{ position: "relative", background: "#0a0b10", color: "#f3f1ea", fontFamily: FONT_BODY, minHeight: "100vh", overflowX: "clip" }}>
      <Preloader />
      <IrisOverlay />
      <CursorEl />
      <ProgressBar />

      <Header
        storeName={vm.storeName}
        isMobile={vm.isMobile}
        navInicio={vm.navInicio}
        navProdutos={vm.navProdutos}
        cartCount={vm.cartCount}
        cartLabel={vm.cartLabel}
        badgeOpacity={vm.badgeOpacity}
        menuOpen={vm.menuOpen}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => {
          setCartOpen(true);
          setStep("cart");
        }}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />

      <Hero L={vm.L} isMobile={vm.isMobile} />

      <BenefitsMarquee pix={vm.pix} />

      <Categories
        images={{
          cartas: tcgdexCardImageUrl(CARDS.find((c) => c.id === "c1")!.apiId),
          boosters: productImages.p1 ?? productImages.p2 ?? null,
          boxes: productImages.p6 ?? productImages.p3 ?? null,
          lancamento: productImages.launch ?? null,
        }}
      />

      <CardsCarousel tabs={vm.tabs} cardsView={vm.cardsView} apiNote={vm.apiNote} onSetTab={setTabAction} onAddToCart={addToCart} />

      <Launch image={productImages.launch ?? null} />
      <Rip boosterImage={productImages.rip ?? null} />

      <ProductsGrid chips={vm.chips} productsView={vm.productsView} onSetFilter={setFilterAction} onAddToCart={addToCart} />

      <Footer storeName={vm.storeName} storeLetters={vm.storeLetters} />

      <CartDrawer
        drawerHidden={vm.drawerHidden}
        drawerEvents={vm.drawerEvents as "auto" | "none"}
        drawerFade={vm.drawerFade}
        drawerX={vm.drawerX}
        cartCount={vm.cartCount}
        stepCart={vm.stepCart}
        stepCheckout={vm.stepCheckout}
        stepDone={vm.stepDone}
        shipText={vm.shipText}
        shipW={vm.shipW}
        cartEmpty={vm.cartEmpty}
        cartItems={vm.cartItems}
        cartHas={vm.cartHas}
        subtotal={vm.subtotal}
        pix={vm.pix}
        pixTotal={vm.pixTotal}
        instTotal={vm.instTotal}
        payPix={vm.payPix}
        payCard={vm.payCard}
        payPixBorder={vm.payPixBorder}
        payCardBorder={vm.payCardBorder}
        payTotal={vm.payTotal}
        orderId={vm.orderId}
        onClose={() => setCartOpen(false)}
        onInc={(id) => qtyDelta(id, 1)}
        onDec={(id) => qtyDelta(id, -1)}
        onRemove={(id) => qtyDelta(id, -999)}
        onCheckout={() => setStep("checkout")}
        onBackToCart={() => setStep("cart")}
        onSetPix={() => setPay("pix")}
        onSetCard={() => setPay("card")}
        onPlaceOrder={placeOrder}
      />

      <SearchModal
        ref={searchInputRef}
        searchHidden={vm.searchHidden}
        searchFade={vm.searchFade}
        searchEvents={vm.searchEvents as "auto" | "none"}
        query={vm.query}
        results={vm.results}
        noResults={vm.noResults}
        onClose={() => {
          setSearchOpen(false);
          setQuery("");
        }}
        onQueryChange={setQuery}
        onGo={handleSearchGo}
      />

      <MobileMenu menuHidden={vm.menuHidden} menuClip={vm.menuClip} menuEvents={vm.menuEvents as "auto" | "none"} storeName={vm.storeName} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
