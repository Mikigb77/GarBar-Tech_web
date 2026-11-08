import { company, copy, pagePath, type Locale } from "@/content/site";
import { Arrow, BrandMark } from "./Brand";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = pagePath(locale);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href={home} className="brand" aria-label={company.brand}>
            <BrandMark />
            <span>
              garbar<span className="brand-sub">in-tec</span>
            </span>
          </a>
          <p>{t.footer.statement}</p>
          <span className="footer-location">Barcelona · 41°23′ N 2°10′ E</span>
        </div>
        <nav aria-label={t.footer.company}>
          <h2>{t.footer.company}</h2>
          <a href={`${home}#company`}>{t.nav.about}</a>
          <a href={`${home}#contact`}>{t.contact.label}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </nav>
        <nav aria-label={t.footer.products}>
          <h2>{t.footer.products}</h2>
          <a
            href={`https://taskflow.garbar.tech/${locale}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            TaskFlow
            <Arrow diagonal />
          </a>
          <a
            href={`https://lucidsaga.garbar.tech/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucid Saga
            <Arrow diagonal />
          </a>
        </nav>
        <nav aria-label={t.footer.information}>
          <h2>{t.footer.information}</h2>
          <a href={pagePath(locale, "legal")}>{t.footer.legal}</a>
          <a href={pagePath(locale, "privacy")}>{t.footer.privacy}</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>
          © 2026 {company.name} <span>{t.footer.rights}</span>
        </p>
        <a href="#top">
          {t.footer.back}
          <Arrow diagonal />
        </a>
      </div>
    </footer>
  );
}
