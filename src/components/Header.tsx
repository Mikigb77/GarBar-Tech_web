"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale, Section } from "@/content/site";
import { BrandLockup, Arrow } from "./Brand";
import brand from "@/content/brand.json";

type Labels = { about: string; projects: string; contact: string; menu: string; language: string };
export function Header({
  locale,
  section,
  labels,
}: {
  locale: Locale;
  section: Section;
  labels: Labels;
}) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = `/${locale}/`;
  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href={home} className="brand" aria-label={brand.name}>
          <BrandLockup />
        </a>
        <nav className="desktop-nav" aria-label={labels.menu}>
          <a href={`${home}#company`}>{labels.about}</a>
          <a href={`${home}#products`}>
            {labels.projects}
            <span className="nav-count">02</span>
          </a>
        </nav>
        <div className="header-actions">
          <nav className="language-switch" aria-label={labels.language}>
            {(["en", "es", "ca"] as const).map((lang) => (
              <a
                key={lang}
                href={`/${lang}/${section === "home" ? "" : `${section}/`}`}
                hrefLang={lang}
                lang={lang}
                aria-current={lang === locale ? "page" : undefined}
                aria-label={{ en: "English", es: "Español", ca: "Català" }[lang]}
              >
                {lang.toUpperCase()}
              </a>
            ))}
          </nav>
          <a className="header-contact" href={`${home}#contact`}>
            {labels.contact}
            <Arrow diagonal />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={labels.menu}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label={labels.menu}>
          <a href={`${home}#company`} onClick={() => setOpen(false)}>
            {labels.about}
            <Arrow diagonal />
          </a>
          <a href={`${home}#products`} onClick={() => setOpen(false)}>
            {labels.projects}
            <Arrow diagonal />
          </a>
          <a href={`${home}#contact`} onClick={() => setOpen(false)}>
            {labels.contact}
            <Arrow diagonal />
          </a>
        </nav>
      )}
    </header>
  );
}
