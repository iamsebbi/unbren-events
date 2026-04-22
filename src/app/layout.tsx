import type { Metadata } from "next";
import { Xanh_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
} from "@/lib/seo";
import EventsLayoutClient from "./_shared/EventsLayoutClient";
import { getSettings } from "./sanity/data";
import { getSiteSettings } from "./sanity/queries";
import { draftMode } from "next/headers";

import "../styles/globals.css";
import "./styles/styles.css";

const xanhMono = Xanh_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-events",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.siteTitle || SITE_NAME;
  const description = settings?.siteDescription || DEFAULT_DESCRIPTION;
  const ogImage = settings?.ogImage;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: title,
      description: description,
      url: SITE_URL,
      siteName: title,
      locale: "ro_RO",
      type: "website",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      ...(ogImage && { images: [ogImage] }),
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/unbrenlogo.svg`,
  image: `${SITE_URL}/unbrenlogo.svg`,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressCountry: "RO",
  },
  telephone: "+40750454181",
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "47.1585",
    longitude: "27.6014",
  },
  sameAs: [
    "https://instagram.com/unbren.ro",
    "https://facebook.com/unbren.ro",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const { isEnabled } = await draftMode();

  return (
    <html
      lang="ro"
      className={`${xanhMono.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body>
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <EventsLayoutClient settings={settings}>
          {children}
        </EventsLayoutClient>
        <Toaster richColors position="top-right" />
        <Analytics />

        {/* EXIT PREVIEW — pure inline styles, no Tailwind dependency */}
        {isEnabled && (
          <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'4px', backgroundColor:'#22c55e', zIndex:999999 }} />
        )}
        {isEnabled && (
          <a
            href="/api/draft-mode/disable"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#000',
              color: '#fff',
              border: '2px solid #22c55e',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.15em',
              textDecoration: 'none',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          >
            🟢 EXIT PREVIEW MODE
          </a>
        )}
      </body>
    </html>
  );
}
