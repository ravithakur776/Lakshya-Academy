import type { Metadata, Viewport } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Default viewport configuration for all pages
 */
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F7A3C" },
    { media: "(prefers-color-scheme: dark)", color: "#0F7A3C" },
  ],
};

/**
 * Keywords hyper-targeted for "Best IIT JEE Coaching in Mathura"
 */
export const SEO_KEYWORDS = [
  "Best IIT JEE Coaching in Mathura",
  "Top IIT JEE Coaching Institute Mathura",
  "Best Coaching in Mathura for JEE Main and Advanced",
  "IIT JEE Coaching Krishna Nagar Mathura",
  "Best JEE Coaching for Class 11 Mathura",
  "Best JEE Coaching for Class 12 Mathura",
  "Best JEE Coaching for Droppers in Mathura",
  "IIT BHU Faculty Coaching Mathura",
  "Vikas Shandilya IIT BHU Mathura",
  "Pushpendra Sharma IIT BHU Mathura",
  "Sabal Agrawal AIR 272 JEE Advanced 2025",
  "Lakshya Academy Mathura",
  "Lakshya IIT Academy Krishna Nagar Mathura",
  "Best Engineering Entrance Coaching in Mathura",
  "LTPE 2026 Scholarship Exam Mathura",
];

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Best IIT JEE Coaching in Mathura | Lakshya Academy (IIT BHU Alumni)",
    template: "%s | Best IIT JEE Coaching in Mathura — Lakshya Academy",
  },
  description:
    "Lakshya Academy is the #1 Best IIT JEE Coaching Institute in Mathura led by IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma. Proven top rankers like Sabal Agrawal AIR 272 (JEE Advanced 2025). Class 11, Class 12 & Droppers batches in Krishna Nagar, Mathura.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: "Lakshya Academy Mathura",
    title: "Best IIT JEE Coaching in Mathura | Lakshya Academy",
    description:
      "Looking for the Best IIT JEE Coaching in Mathura? Lakshya Academy offers 100% concept-based learning by IIT (BHU) directors in Krishna Nagar. Air-conditioned classrooms, small 50-student batches, and proven top ranks.",
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Best IIT JEE Coaching in Mathura — Lakshya Academy Toppers & Directors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best IIT JEE Coaching in Mathura | Lakshya Academy",
    description:
      "Join Lakshya Academy — Mathura's premier IIT JEE coaching institute led by IIT (BHU) directors Vikas Shandilya & Pushpendra Sharma. Proven JEE Advanced AIR 272.",
    images: ["/images/hero/hero-bg.jpg"],
    creator: "@lakshyaacademy",
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/logo.png"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

/**
 * Generates page-level metadata by merging with defaults.
 */
export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || "/images/hero/hero-bg.jpg";
  const metaDescription =
    description ||
    "Lakshya Academy is the Best IIT JEE Coaching in Mathura, taught by IIT (BHU) alumni directors. Admissions open for Class 11, Class 12, and Dropper batches in Krishna Nagar, Mathura.";

  return {
    title,
    description: metaDescription,
    keywords: SEO_KEYWORDS,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | Best IIT JEE Coaching in Mathura — Lakshya Academy`,
      description: metaDescription,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title: `${title} | Lakshya Academy Mathura`,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

/**
 * Complete LocalBusiness & EducationalOrganization JSON-LD Schema for Google Search & Maps
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: "Lakshya Academy",
      alternateName: "Lakshya IIT Academy Mathura",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/images/gallery/directors-ranker-batch.jpg`,
      description:
        "Best IIT JEE Coaching Institute in Mathura, Uttar Pradesh, founded in 2017 by IIT (BHU) alumni directors Mr. Vikas Shandilya and Mr. Pushpendra Sharma.",
      foundingDate: "2017",
      telephone: "+91 9319098141",
      email: "2017lakshya@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "190/2, Above PC Jewellers, Krishna Nagar",
        addressLocality: "Mathura",
        addressRegion: "Uttar Pradesh",
        postalCode: "281001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.4924,
        longitude: 77.6737,
      },
      hasMap: "https://share.google/JS10432St6nvkkaoT",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "211",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.instagram.com/lakshyaacademymathura/",
        "https://www.facebook.com/profile.php?id=61574186937957",
        "https://www.youtube.com/@lakshyaacademymathura854",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
      name: "Lakshya Academy — Best IIT JEE Coaching in Mathura",
      image: `${SITE_CONFIG.url}/images/hero/hero-bg.jpg`,
      priceRange: "₹₹",
      telephone: "+91 9319098141",
      address: {
        "@type": "PostalAddress",
        streetAddress: "190/2, Above PC Jewellers, Krishna Nagar",
        addressLocality: "Mathura",
        addressRegion: "Uttar Pradesh",
        postalCode: "281001",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "20:00",
        },
      ],
    },
  ],
};
