import type { ReactNode } from "react";
import localFont from "next/font/local";
import { copy, routeInfo } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import "../globals.css";

const manrope = localFont({
  src: "../../fonts/Manrope.ttf",
  display: "swap",
  weight: "200 800",
  variable: "--font-manrope",
});

// TaskFlow's own type, used only in its product card, as on its website: Bricolage Grotesque for
// titles and an Instrument Serif italic accent. Not preloaded, so other pages never fetch them.
const bricolage = localFont({
  src: "../../fonts/BricolageGrotesque.ttf",
  display: "swap",
  weight: "200 800",
  variable: "--font-bricolage",
  preload: false,
});
const instrumentSerif = localFont({
  src: "../../fonts/InstrumentSerif-Italic.ttf",
  display: "swap",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
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
      className={`${manrope.variable} ${bricolage.variable} ${instrumentSerif.variable}`}
    >
      <body id="top" data-section={route.section}>
        <Motion />
        <div className="scroll-progress" aria-hidden="true" />
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <Header locale={route.locale} section={route.section} labels={t.nav} />
        {children}
        <Footer locale={route.locale} />
      </body>
    </html>
  );
}
