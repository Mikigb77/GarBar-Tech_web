import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { company, copy, lucidSagaUrl, taskflowUrl, type Locale } from "@/content/site";
import { worlds } from "@/content/worlds";
import { Arrow, BrandMark, StoreBadge, TaskMark } from "./Brand";
import { CopyEmail } from "./CopyEmail";
import { Fireflies } from "./Fireflies";
import { IdeaConsole } from "./IdeaConsole";
import { TaskFlowPhone, TaskIcon } from "./TaskFlowPhone";

function Label({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </p>
  );
}

/** A line of a heading that slides up into place when its section is revealed. */
function Line({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="line" style={{ "--i": index } as CSSProperties}>
      <span>{children}</span>
    </span>
  );
}

function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          {item}
          <span className="marquee-star" aria-hidden="true">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function CompanyPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const statement = t.about.statement.split(" ");
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title" data-pointer>
        <Aurora />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {t.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              <Line index={0}>{t.hero.first}</Line>
              <Line index={1}>
                {t.hero.second} <em>{t.hero.accent}</em>
              </Line>
            </h1>
            <p className="hero-description">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button button-accent" href="#products">
                {t.hero.cta}
                <Arrow />
              </a>
              <a className="button button-ghost" href="#contact">
                {t.hero.secondary}
                <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-stage">
            <IdeaConsole demo={t.hero.demo} />
          </div>
        </div>
        <a className="scroll-cue" href="#company">
          <span>{t.hero.scroll}</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <Marquee items={t.marquee} />

      <section id="company" className="company-section" aria-labelledby="company-title">
        <div className="container">
          <Label number="01">{t.about.label}</Label>
          <h2 id="company-title" className="statement" data-words>
            {statement.map((word, index) => (
              <span key={index} className={word.startsWith("GarBar") ? "word word-brand" : "word"}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <dl className="facts">
            {t.about.facts.map((fact, index) => (
              <div
                key={fact.value}
                data-reveal
                style={{ "--i": index } as CSSProperties}
                className="fact"
              >
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="products" className="products-section" aria-labelledby="products-title">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <Label number="02">{t.projects.label}</Label>
              <h2 id="products-title">
                <Line index={0}>{t.projects.title}</Line>
                <Line index={1}>
                  <em>{t.projects.accent}</em>
                </Line>
              </h2>
            </div>
            <p>{t.projects.intro}</p>
          </div>

          <div className="product-stack">
            <article
              id="taskflow"
              className="product product-taskflow"
              aria-labelledby="taskflow-title"
              data-reveal
              data-pointer
            >
              <div className="tf-glow" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="product-copy">
                <div className="product-top">
                  <span className="product-name">
                    <TaskMark />
                    <span id="taskflow-title" className="tf-wordmark">
                      taskflow<span className="tf-dot">.</span>
                    </span>
                  </span>
                  <span className="product-status">
                    <span />
                    {t.projects.development}
                  </span>
                </div>
                <p className="product-category">01 · {t.projects.taskflow.category}</p>
                <h3>
                  {t.projects.taskflow.title}
                  <em className="tf-accent">{t.projects.taskflow.titleAccent}</em>
                </h3>
                <p className="product-description">{t.projects.taskflow.body}</p>
                <ul className="product-features" aria-label={t.projects.features}>
                  {t.projects.taskflow.features.map((feature) => (
                    <li key={feature.text}>
                      <span>
                        {feature.text}
                        {feature.pro ? <span className="tf-pro">Pro</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="product-actions">
                  <a
                    className="button button-taskflow"
                    href={taskflowUrl(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.projects.visit} TaskFlow
                    <Arrow diagonal />
                  </a>
                  <StoreBadge store={t.projects.store} />
                </div>
              </div>
              <div className="product-media taskflow-media">
                <div className="tf-art">
                  <div className="tf-bubble" aria-hidden="true">
                    <span className="tf-bubble-mic">
                      <TaskIcon name="mic" size={22} />
                    </span>
                    <p>{t.projects.taskflow.quote}</p>
                  </div>
                  <p className="tf-toast" aria-hidden="true">
                    <span className="tf-chip-check">
                      <TaskIcon name="check" size={14} />
                    </span>
                    {t.projects.taskflow.added}
                  </p>
                  <div className="tf-phone-wrap">
                    <span className="tf-ring" aria-hidden="true" />
                    <TaskFlowPhone locale={locale} />
                  </div>
                </div>
              </div>
            </article>

            <article
              id="lucid-saga"
              className="product product-lucid"
              aria-labelledby="lucid-title"
              data-reveal
              data-pointer
            >
              <div className="product-media lucid-media">
                <Image
                  className="lucid-art"
                  src="/images/lucid-saga-gate.webp"
                  alt={t.projects.lucid.imageAlt}
                  fill
                  sizes="(max-width: 950px) 100vw, 50vw"
                />
                <Fireflies className="fireflies" />
              </div>
              <div className="product-copy">
                <div className="product-top">
                  <span className="product-name">
                    <Image src="/images/lucid-saga-icon.png" alt="" width={40} height={40} />
                    <span id="lucid-title">Lucid Saga</span>
                  </span>
                  <span className="product-status">
                    <span />
                    {t.projects.development}
                  </span>
                </div>
                <p className="product-category">02 · {t.projects.lucid.category}</p>
                <h3>{t.projects.lucid.title}</h3>
                <p className="product-description">{t.projects.lucid.body}</p>
                <ul className="product-features" aria-label={t.projects.features}>
                  {t.projects.lucid.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="product-actions">
                  <a
                    className="button button-lucid"
                    href={lucidSagaUrl(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.projects.visit} Lucid Saga
                    <Arrow diagonal />
                  </a>
                  <StoreBadge store={t.projects.store} />
                </div>
              </div>
              <div className="worlds">
                <p className="worlds-label">{t.projects.lucid.worlds}</p>
                <div className="worlds-window" aria-hidden="true">
                  <ul className="worlds-track">
                    {[...worlds, ...worlds].map((world, index) => (
                      <li key={`${world.id}-${index}`}>
                        <Image
                          src={`/images/worlds/${world.id}.webp`}
                          alt=""
                          width={560}
                          height={510}
                          sizes="180px"
                        />
                        <span>{world.title[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <div className="container approach-grid">
          <div className="approach-heading" data-reveal>
            <Label number="03">{t.approach.label}</Label>
            <h2 id="approach-title">
              <Line index={0}>{t.approach.title}</Line>
              <Line index={1}>
                <em>{t.approach.accent}</em>
              </Line>
            </h2>
          </div>
          <ol className="principles">
            {t.approach.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                data-pointer
                style={{ "--i": index } as CSSProperties}
              >
                <span className="principle-number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <span className={`principle-icon icon-${index}`} aria-hidden="true">
                  {index === 0 ? "↗" : index === 1 ? "✳" : "⊕"}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title" data-pointer>
        <Aurora className="aurora-contact" />
        <div className="container contact-grid">
          <div data-reveal>
            <Label number="04">{t.contact.label}</Label>
            <h2 id="contact-title">
              <Line index={0}>{t.contact.first}</Line>
              <Line index={1}>
                <em>{t.contact.second}</em>
              </Line>
            </h2>
            <p className="contact-body">{t.contact.body}</p>
            <a
              href={`mailto:${company.email}`}
              className="contact-email"
              aria-label={`${t.contact.action}: ${company.email}`}
            >
              <span>{company.email}</span>
              <Arrow diagonal />
            </a>
            <CopyEmail
              email={company.email}
              label={t.contact.copy}
              copied={t.contact.copied}
              error={t.contact.error}
            />
          </div>
          <div className="contact-art" aria-hidden="true" data-reveal>
            <div className="contact-orbit orbit-1" />
            <div className="contact-orbit orbit-2" />
            <BrandMark draw />
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
