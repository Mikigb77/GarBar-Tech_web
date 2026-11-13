import { company, copy, pagePath, type Locale } from "@/content/site";
import { policies, type PolicyKind } from "@/content/policies";
import { Arrow } from "./Brand";

export function PolicyPage({ locale, kind }: { locale: Locale; kind: PolicyKind }) {
  const t = copy[locale];
  const document = policies[locale][kind];
  return (
    <main id="main" className="information-page policy-page container">
      <a className="back-link" href={pagePath(locale)}>
        <span aria-hidden="true">←</span>
        {t.legal.home}
      </a>
      <p className="section-label">
        <span className="brand-text">{company.brand}</span>
        <span>{kind === "privacy" ? t.footer.privacy : t.footer.terms}</span>
      </p>
      <h1>{document.title}</h1>
      <p className="information-intro">{document.intro}</p>
      <p className="policy-date">
        <time dateTime="2026-11-13">{document.updated}</time>
      </p>
      <div className="policy-layout">
        <nav className="policy-toc" aria-label={document.contents}>
          <h2>{document.contents}</h2>
          <ol>
            {document.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="information-body policy-body">
          {document.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.links && (
                <ul className="policy-provider-links">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <Arrow diagonal />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="policy-related">
            <a href={pagePath(locale, "legal")}>
              {t.footer.legal}
              <Arrow />
            </a>
            <a href={pagePath(locale, kind === "privacy" ? "terms" : "privacy")}>
              {kind === "privacy" ? t.footer.terms : t.footer.privacy}
              <Arrow />
            </a>
          </div>
          <dl className="policy-contact">
            <div>
              <dt>{t.legal.contact}</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t.legal.support}</dt>
              <dd>
                <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
