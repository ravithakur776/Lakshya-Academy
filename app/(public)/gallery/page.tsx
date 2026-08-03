import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import GalleryClientPage from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery | Lakshya Academy — Campus, Events & Results",
  description: "Explore Lakshya Academy's campus, classrooms, events, seminars, award ceremonies, and student life. See what life at Mathura's premier IIT-JEE institute looks like.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="See Lakshya"
        titleHighlight="in Action"
        description="Smart classrooms, cutting-edge labs, award ceremonies, and the infectious energy of students chasing their IIT dreams. Welcome to Lakshya Academy."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        size="sm"
      />
      <GalleryClientPage />
    </>
  );
}
