import { company, copy, pagePath, type Locale } from "@/content/site";
import { Arrow } from "./Brand";

export function InformationPage({
  locale,
  privacy = false,
}: {
  locale: Locale;
  privacy?: boolean;
}) {
  const t = copy[locale];
  return (
    <main id="main" className="information-page container">
      <a className="back-link" href={pagePath(locale)}>
        <span aria-hidden="true">←</span>
        {t.legal.home}
      </a>
      <p className="section-label">
        <span>GARBAR IN-TEC</span>
        <span>{privacy ? t.privacy.label : t.legal.label}</span>
      </p>
      <h1>{privacy ? t.privacy.title : t.legal.title}</h1>
      <p className="information-intro">{privacy ? t.privacy.intro : t.legal.intro}</p>
      {privacy ? (
        <div className="information-body">
          {t.privacy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <a
            href="https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t.privacy.authority}
            <Arrow diagonal />
          </a>
          <p className="updated-date">{t.privacy.updated}</p>
          <a className="text-link" href={pagePath(locale, "legal")}>
            {t.footer.legal}
            <Arrow />
          </a>
        </div>
      ) : (
        <>
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
            </div>
          </section>
        </>
      )}
    </main>
  );
}
