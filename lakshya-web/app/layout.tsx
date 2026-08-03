import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { defaultMetadata, defaultViewport, organizationSchema } from "@/lib/seo";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp";
import "./globals.css";

// ── SEO ────────────────────────────────────────────────────────
export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

// ── Root Layout ────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Preconnect to performance-critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-dvh bg-background font-sans text-foreground antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <QueryProvider>
            <LenisProvider>
              <TooltipProvider>
                {/* Global UI Elements */}
                <ScrollProgress />

                {/* Page Content */}
                {children}

                {/* Global Overlays */}
                <FloatingWhatsApp />
                <ToastProvider />
              </TooltipProvider>
            </LenisProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
