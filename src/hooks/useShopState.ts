"use client";

import { useState } from "react";
import type { ApiEnrichment } from "@/lib/types";

export type NavZone = "inicio" | "produtos";
export type CardsTab = "novidades" | "procuradas" | "lendarias";
export type ProductFilter = "todos" | "booster" | "box" | "etb" | "bundle";
export type CartStep = "cart" | "checkout" | "done";
export type PayMethod = "pix" | "card";
export type CondId = "NM" | "LP" | "MP" | "HP";
export type VipChannel = "email" | "whats";
export type ApiStatus = "loading" | "ok" | "off";

export interface CartLine {
  id: string;
  name: string;
  sub: string;
  price: number;
  color: string;
  qty: number;
}

export function useShopState() {
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  const [tab, setTab] = useState<CardsTab>("novidades");
  const [filter, setFilter] = useState<ProductFilter>("todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState<CartStep>("cart");
  const [pay, setPay] = useState<PayMethod>("pix");
  const [orderId, setOrderId] = useState("");
  const [cond, setCond] = useState<CondId>("NM");
  const [faq, setFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [vipChannel, setVipChannel] = useState<VipChannel>("email");
  const [vipValue, setVipValue] = useState("");
  const [vipDone, setVipDone] = useState(false);
  const [vipError, setVipError] = useState(false);
  const [interests, setInterests] = useState<string[]>(["Reposição", "Pré-vendas"]);
  const [navActive, setNavActive] = useState<NavZone>("inicio");
  const [api, setApi] = useState<Record<string, ApiEnrichment>>({});
  const [apiStatus, setApiStatus] = useState<ApiStatus>("loading");
  const [productImages, setProductImages] = useState<Record<string, string | null>>({});

  return {
    vw, setVw,
    tab, setTab,
    filter, setFilter,
    cart, setCart,
    cartOpen, setCartOpen,
    step, setStep,
    pay, setPay,
    orderId, setOrderId,
    cond, setCond,
    faq, setFaq,
    menuOpen, setMenuOpen,
    searchOpen, setSearchOpen,
    query, setQuery,
    vipChannel, setVipChannel,
    vipValue, setVipValue,
    vipDone, setVipDone,
    vipError, setVipError,
    interests, setInterests,
    navActive, setNavActive,
    api, setApi,
    apiStatus, setApiStatus,
    productImages, setProductImages,
  };
}

export type ShopState = ReturnType<typeof useShopState>;
