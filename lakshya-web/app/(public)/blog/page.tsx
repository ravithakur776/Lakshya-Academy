import type { Metadata } from "next";
import { BlogClientPage } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog | Lakshya Academy — JEE Preparation Tips & Strategies",
  description: "Expert articles on JEE preparation, study strategies, chemistry tricks, dropper's guide, and parenting tips directly by Lakshya Academy's IIT (BHU) alumni directors.",
  openGraph: {
    title: "JEE Preparation Blog | Lakshya Academy",
    description: "Evidence-based JEE strategies from IIT (BHU) alumni directors Mr. Vikas Shandilya & Mr. Pushpendra Sharma.",
  },
};

export default function BlogPage() {
  return <BlogClientPage />;
}
