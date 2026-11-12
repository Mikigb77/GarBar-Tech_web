import Image from "next/image";
import {
  company,
  copy,
  locales,
  lucidSagaUrl,
  pagePath,
  taskflowUrl,
  type Locale,
  type Section,
} from "@/content/site";
import { Arrow, BrandLockup, TaskMark } from "./Brand";

const languageNames: Record<Locale, string> = { en: "English", es: "Español", ca: "Català" };

/**
 * The footer the GarBar product sites share (TaskFlow's and Lucid Saga's): the brand and a line
 * about it, then three columns, the company, its products and the company information; then the
 * fine print, the languages and a way back up, over the name in outline.
 */
export function Footer({ locale, section }: { locale: Locale; section: Section }) {
  const t = copy[locale];
  const home = pagePath(locale);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href={home} className="brand" aria-label={company.brand}>
            <BrandLockup />
          </a>
          <p>{t.footer.statement}</p>
          <p className="footer-made">
            <span className="status-dot" aria-hidden="true" />
            {t.footer.madeIn}
          </p>
        </div>
        <nav aria-labelledby="footer-company">
          <h2 id="footer-company">{t.footer.company}</h2>
          <a href={`${home}#company`}>{t.nav.about}</a>
          <a href={`${home}#contact`}>{t.contact.label}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </nav>
        <nav aria-labelledby="footer-products">
          <h2 id="footer-products">{t.footer.products}</h2>
          <a href={taskflowUrl(locale)} target="_blank" rel="noopener noreferrer">
            <TaskMark className="footer-product-mark" />
            TaskFlow
            <Arrow diagonal />
          </a>
          <a href={lucidSagaUrl(locale)} target="_blank" rel="noopener noreferrer">
            <Image
              className="footer-product-mark"
              src="/images/lucid-saga-icon.png"
              alt=""
              width={22}
              height={22}
            />
            Lucid Saga
            <Arrow diagonal />
          </a>
        </nav>
        <nav aria-labelledby="footer-information">
          <h2 id="footer-information">{t.footer.information}</h2>
          <a href={pagePath(locale, "legal")}>{t.footer.legal}</a>
          <a href={pagePath(locale, "privacy")}>{t.footer.privacy}</a>
          <a href={pagePath(locale, "terms")}>{t.footer.terms}</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <div className="footer-fine">
          <p>
            © 2026 {company.name} <span>{t.footer.rights}</span>
          </p>
          <p>{t.footer.trademark}</p>
        </div>
        <nav className="footer-languages" aria-label={t.nav.language}>
          {locales.map((lang) => (
            <a
              key={lang}
              href={pagePath(lang, section)}
              hrefLang={lang}
              lang={lang}
              aria-current={lang === locale ? "page" : undefined}
            >
              {languageNames[lang]}
            </a>
          ))}
        </nav>
        <a href="#top" className="footer-back">
          {t.footer.back}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 13V3m0 0L4 7m4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        {company.brand}
      </p>
    </footer>
  );
}
