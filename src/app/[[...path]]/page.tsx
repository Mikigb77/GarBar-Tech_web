import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyPage } from "@/components/CompanyPage";
import { InformationPage } from "@/components/InformationPage";
import { PolicyPage } from "@/components/PolicyPage";
import { policies } from "@/content/policies";
import { company, copy, locales, routeInfo, pagePath, siteUrl, indexSite } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: [] },
    ...locales.flatMap((locale) => [
      { path: [locale] },
      { path: [locale, "legal"] },
      { path: [locale, "privacy"] },
      { path: [locale, "terms"] },
    ]),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const route = routeInfo((await params).path);
  if (!route) return {};
  const t = copy[route.locale];
  const title =
    route.section === "home"
      ? `${company.brand} — ${t.footer.statement.replace("\n", " ")}`
      : `${route.section === "legal" ? t.footer.legal : policies[route.locale][route.section].title} — ${company.brand}`;
  const description =
    route.section === "home"
      ? t.meta
      : route.section === "legal"
        ? t.legal.intro
        : policies[route.locale][route.section].intro;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: company.brand,
    alternates: {
      canonical: pagePath(route.locale, route.section),
      languages: Object.fromEntries(
        locales.map((locale) => [locale, pagePath(locale, route.section)]),
      ),
    },
    robots: { index: indexSite, follow: indexSite },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: company.brand,
      url: pagePath(route.locale, route.section),
      locale: { en: "en_GB", es: "es_ES", ca: "ca_ES" }[route.locale],
      images: [{ url: "/images/share.png", width: 1200, height: 630, alt: company.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/share.png"],
    },
    icons: { icon: "/favicon.svg", apple: "/images/apple-icon.png" },
  };
}

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const route = routeInfo((await params).path);
  if (!route) notFound();
  if (route.section === "legal") return <InformationPage locale={route.locale} />;
  if (route.section === "privacy" || route.section === "terms")
    return <PolicyPage locale={route.locale} kind={route.section} />;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brand,
    legalName: company.name,
    url: siteUrl,
    email: company.email,
    taxID: company.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Sant Antoni Mª Claret, 24, 3ª planta",
      postalCode: "08037",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
    brand: [
      { "@type": "Brand", name: "TaskFlow", url: "https://taskflow.garbar.tech" },
      { "@type": "Brand", name: "Lucid Saga", url: "https://lucidsaga.garbar.tech" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <CompanyPage locale={route.locale} />
    </>
  );
}
