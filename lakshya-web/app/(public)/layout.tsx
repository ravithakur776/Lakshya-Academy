import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/common/back-to-top";
import { CursorGlow } from "@/components/common/cursor-glow";
import type { ReactNode } from "react";

/**
 * Public Pages Shared Layout
 *
 * Wraps all public-facing pages with:
 * - Announcement bar
 * - Sticky navbar
 * - Footer
 * - Back to top button
 * - Cursor glow effect
 *
 * Homepage (app/page.tsx) uses its own inline layout since
 * it predates this route group.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CursorGlow />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="min-h-dvh">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
