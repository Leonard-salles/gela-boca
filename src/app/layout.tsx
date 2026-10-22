import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { FONT_BODY } from "@/lib/fonts";
import "./globals.css";

// Fontes auto-hospedadas (next/font/local) em vez de next/font/google: o
// Turbopack tem um bug intermitente ao baixar fontes do Google durante o
// build na Vercel ("Module not found: @vercel/turbopack-next/.../font").
const display = localFont({
  src: "./fonts/bricolage-grotesque-variable.woff2",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gela Boca — Cartas, boosters e boxes Pokémon TCG",
  description:
    "Cartas avulsas, boosters e boxes 100% originais, com envio rápido para todo o Brasil. Cada booster esconde uma lenda.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        style={{
          margin: 0,
          background: "#0a0b10",
          color: "#f3f1ea",
          fontFamily: FONT_BODY,
        }}
      >
        {children}
      </body>
    </html>
  );
}
