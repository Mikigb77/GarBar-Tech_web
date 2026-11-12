import type { ReactNode } from "react";
import localFont from "next/font/local";
import { copy, routeInfo } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { CursorGlow } from "@/components/CursorGlow";
import "../globals.css";

const manrope = localFont({
  src: "../../fonts/Manrope.ttf",
  display: "swap",
  weight: "200 800",
  variable: "--font-manrope",
});

// Lucid Saga's own type, used only in its product card, as on its website: Literata Display for
// titles and Literata for its world names. Not preloaded, so other pages never fetch them.
const literataDisplay = localFont({
  src: "../../fonts/LiterataDisplay-Medium.woff2",
  display: "swap",
  weight: "500",
  variable: "--font-literata-display",
  preload: false,
});
const literata = localFont({
  src: "../../fonts/Literata-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-literata",
  preload: false,
});

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  const route = routeInfo((await params).path) ?? {
    locale: "en" as const,
    section: "home" as const,
  };
  const t = copy[route.locale];
  return (
    <html
      lang={route.locale}
      className={`${manrope.variable} ${literataDisplay.variable} ${literata.variable}`}
    >
      <body id="top" data-section={route.section}>
        <Motion />
        <CursorGlow />
        <div className="scroll-progress" aria-hidden="true" />
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <Header locale={route.locale} section={route.section} labels={t.nav} />
        {children}
        <Footer locale={route.locale} section={route.section} />
      </body>
    </html>
  );
}
