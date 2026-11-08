import Image from "next/image";
import { company, copy, type Locale } from "@/content/site";
import { Arrow, BrandMark, Spark, TaskMark } from "./Brand";
import { CopyEmail } from "./CopyEmail";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </p>
  );
}

export function CompanyPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            {t.hero.first}
            <br />
            <span>{t.hero.second}</span>
          </h1>
          <p className="hero-description">{t.hero.body}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#products">
              {t.hero.cta}
              <Arrow diagonal />
            </a>
            <a className="text-link" href="#company">
              {t.hero.secondary}
              <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-plus plus-one">+</span>
          <span className="art-plus plus-two">+</span>
          <div className="idea-tile">
            <BrandMark />
            <span>
              IDEA → {locale === "en" ? "PRODUCT" : locale === "es" ? "PRODUCTO" : "PRODUCTE"}
            </span>
          </div>
          <div className="hero-taskflow">
            <div className="mini-project-name">
              <TaskMark />
              <span>taskflow</span>
              <span className="mini-arrow">↗</span>
            </div>
            <div className="mini-phone">
              <Image
                src={`/images/taskflow-${locale}.png`}
                alt=""
                width={780}
                height={1688}
                priority
              />
            </div>
            <span className="mini-label">01 / {t.projects.taskflow.tags[0].toUpperCase()}</span>
          </div>
          <div className="hero-lucid">
            <Image src="/images/lucid-saga-gate.webp" alt="" width={1000} height={800} priority />
            <div className="hero-lucid-label">
              <span>Lucid Saga</span>
              <span>
                02 /{" "}
                {locale === "en" ? "IMAGINATION" : locale === "es" ? "IMAGINACIÓN" : "IMAGINACIÓ"}
              </span>
            </div>
          </div>
          <div className="spark-tile">
            <Spark />
          </div>
          <span className="art-caption">{t.hero.studio}</span>
        </div>
        <div className="hero-baseline">
          <span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="8" cy="7" r="3" />
              <path d="M13 7c0 4-5 8-5 8S3 11 3 7a5 5 0 0 1 10 0Z" />
            </svg>
            {t.hero.location}
          </span>
          <span>
            {t.hero.note}
            <span className="tiny-spark">✳</span>
          </span>
        </div>
      </section>

      <section id="company" className="company-section container" aria-labelledby="company-title">
        <Label number="01">{t.about.label}</Label>
        <div className="company-body">
          <h2 id="company-title">
            {t.about.title}
            <br />
            <span>{t.about.accent}</span>
          </h2>
          <div className="company-prose">
            <p className="lead">{t.about.lead}</p>
            <p>{t.about.body}</p>
          </div>
          <p className="company-signature">
            <span className="signature-line" />
            {t.about.note}
          </p>
        </div>
      </section>

      <section
        id="products"
        className="products-section container"
        aria-labelledby="products-title"
      >
        <div className="section-heading">
          <div>
            <Label number="02">{t.projects.label}</Label>
            <h2 id="products-title">
              {t.projects.title}
              <br />
              <span>{t.projects.accent}</span>
            </h2>
          </div>
          <p>{t.projects.intro}</p>
        </div>
        <article
          id="taskflow"
          className="project project-taskflow"
          aria-labelledby="taskflow-title"
        >
          <div className="project-media taskflow-media">
            <div className="project-media-top">
              <span className="product-wordmark">
                <TaskMark />
                taskflow
              </span>
              <span className="project-number">01</span>
            </div>
            <div className="calendar-orbit" />
            <div className="phone-frame">
              <div className="phone-camera" />
              <Image
                src={`/images/taskflow-${locale}.png`}
                alt={t.projects.taskflow.imageAlt}
                width={780}
                height={1688}
                sizes="(max-width: 700px) 220px, 270px"
              />
            </div>
            <div className="voice-bubble">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="9" y="3" width="6" height="12" rx="3" />
                <path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3m-4 0h8" />
              </svg>
              <span>“{t.projects.taskflow.quote}”</span>
            </div>
          </div>
          <div className="project-copy">
            <p className="project-category">{t.projects.taskflow.category}</p>
            <div className="project-title-row">
              <h3 id="taskflow-title">TaskFlow</h3>
              <span className="project-status">
                <span />
                {t.projects.development}
              </span>
            </div>
            <h4>{t.projects.taskflow.title}</h4>
            <p className="project-description">{t.projects.taskflow.body}</p>
            <ul className="product-features" aria-label={t.projects.features}>
              {t.projects.taskflow.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">↳</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="project-tags">
              {t.projects.taskflow.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="project-link"
              href={`https://taskflow.garbar.tech/${locale}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.projects.visit}
              <Arrow diagonal />
            </a>
            <p className="coming-soon">{t.projects.coming}</p>
          </div>
        </article>

        <article id="lucid-saga" className="project project-lucid" aria-labelledby="lucid-title">
          <div className="project-media lucid-media">
            <Image
              className="lucid-art"
              src="/images/lucid-saga-gate.webp"
              alt={t.projects.lucid.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="project-media-top">
              <span className="product-wordmark lucid-wordmark">
                <Image src="/images/lucid-saga-icon.png" alt="" width={36} height={36} />
                Lucid Saga
              </span>
              <span className="project-number">02</span>
            </div>
            <p className="lucid-quote">{t.projects.lucid.quote}</p>
            <span className="lucid-corner">✧</span>
          </div>
          <div className="project-copy">
            <p className="project-category">{t.projects.lucid.category}</p>
            <div className="project-title-row">
              <h3 id="lucid-title">Lucid Saga</h3>
              <span className="project-status">
                <span />
                {t.projects.development}
              </span>
            </div>
            <h4>{t.projects.lucid.title}</h4>
            <p className="project-description">{t.projects.lucid.body}</p>
            <ul className="product-features" aria-label={t.projects.features}>
              {t.projects.lucid.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">↳</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="project-tags">
              {t.projects.lucid.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="project-link"
              href={`https://lucidsaga.garbar.tech/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.projects.visit}
              <Arrow diagonal />
            </a>
            <p className="coming-soon">{t.projects.coming}</p>
          </div>
        </article>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <div className="container">
          <div className="approach-heading">
            <Label number="03">{t.approach.label}</Label>
            <h2 id="approach-title">
              {t.approach.title}
              <br />
              <span>{t.approach.accent}</span>
            </h2>
            <Spark className="approach-spark" />
          </div>
          <div className="principles">
            {t.approach.items.map((item, index) => (
              <article key={item.title}>
                <span className={`principle-icon icon-${index}`} aria-hidden="true">
                  {index === 0 ? "↗" : index === 1 ? "✳" : "⊕"}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <div>
            <Label number="04">{t.contact.label}</Label>
            <h2 id="contact-title">
              {t.contact.first}
              <br />
              <span>{t.contact.second}</span>
            </h2>
            <p>{t.contact.body}</p>
            <a
              href={`mailto:${company.email}`}
              className="contact-email"
              aria-label={`${t.contact.action}: ${company.email}`}
            >
              {company.email}
              <Arrow diagonal />
            </a>
            <CopyEmail
              email={company.email}
              label={t.contact.copy}
              copied={t.contact.copied}
              error={t.contact.error}
            />
          </div>
          <div className="contact-art" aria-hidden="true">
            <BrandMark />
            <div className="contact-orbit" />
            <span>{t.footer.statement}</span>
          </div>
        </div>
        <div className="container contact-bottom">
          <span className="status-dot" />
          {t.contact.location}
        </div>
      </section>
    </main>
  );
}
