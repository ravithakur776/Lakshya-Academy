export interface ResultSlide {
  id: string;
  year: number;
  title?: string;
  image: string;
  alt: string;
}

export const resultSlides: ResultSlide[] = [
  {
    id: "iit-jee-2026",
    year: 2026,
    title: "Lakshya Academy IIT-JEE Results 2026",
    image: "/images/lakshya-results-iit-jee-2026.jpg",
    alt: "Lakshya Academy IIT-JEE 2026 Results — Proud Moments Powered by Lakshya",
  },
  {
    id: "iit-jee-2025",
    year: 2025,
    title: "Lakshya Academy IIT-JEE Results 2025",
    image: "/images/lakshya-results-iit-jee-2025.jpg",
    alt: "Lakshya Academy IIT-JEE 2025 Results — Proud Moments Powered by Lakshya",
  },
];
