import { company, copy, pagePath, taskflowUrl, type Locale } from "@/content/site";
import { Arrow } from "./Brand";

export function InformationPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main id="main" className="information-page container">
      <a className="back-link" href={pagePath(locale)}>
        <span aria-hidden="true">←</span>
        {t.legal.home}
      </a>
      <p className="section-label">
        <span className="brand-text">{company.brand}</span>
        <span>{t.legal.label}</span>
      </p>
      <h1>{t.legal.title}</h1>
      <p className="information-intro">{t.legal.intro}</p>
      <dl className="company-details">
        {[
          [t.legal.name, company.name],
          [t.legal.tax, company.taxId],
          [t.legal.address, company.address],
          [t.legal.register, company.register],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div>
          <dt>{t.legal.contact}</dt>
          <dd>
            <a href={`mailto:${company.email}`}>
              {company.email}
              <Arrow diagonal />
            </a>
          </dd>
        </div>
      </dl>
      <section className="information-body">
        <h2>{t.legal.products}</h2>
        <p>{t.legal.productBody}</p>
        <div className="information-product-links">
          <a
            href={taskflowUrl(locale)}
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
        </div>
        <div className="policy-related">
          <a href={pagePath(locale, "privacy")}>
            {t.footer.privacy}
            <Arrow />
          </a>
          <a href={pagePath(locale, "terms")}>
            {t.footer.terms}
            <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}
