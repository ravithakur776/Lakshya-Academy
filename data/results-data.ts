export type ResultRecord = {
  id: string;
  name: string;
  rank: string;
  exam: string;
  year: number;
  course: string;
  photoUrl: string;
  isTopTopper: boolean;
};

export const topResultsData: ResultRecord[] = [
  {
    id: "r1",
    name: "Sabal Agrawal",
    rank: "AIR 272",
    exam: "JEE Advanced 2025",
    year: 2025,
    course: "Classroom Program",
    photoUrl: "/images/placeholders/topper-sabal-agrawal.jpg",
    isTopTopper: true,
  },
  {
    id: "r2",
    name: "Shyam Agrawal",
    rank: "AIR 2199",
    exam: "JEE Advanced 2025 (99.697%ile)",
    year: 2025,
    course: "3-Year Classroom Program",
    photoUrl: "/images/placeholders/topper-shyam-agrawal.jpg",
    isTopTopper: true,
  },
  {
    id: "r3",
    name: "Khush Varshney",
    rank: "AIR 3748",
    exam: "JEE Advanced 2025 (98.82%ile)",
    year: 2025,
    course: "Classroom Target Batch",
    photoUrl: "/images/placeholders/topper-khush-varshney.jpg",
    isTopTopper: true,
  },
  {
    id: "r4",
    name: "Manvendra Singh",
    rank: "AIR 6824",
    exam: "JEE Advanced 2024",
    year: 2024,
    course: "Classroom Program",
    photoUrl: "/images/placeholders/topper-manvendra.jpg",
    isTopTopper: true,
  },
  {
    id: "r5",
    name: "Ansh Arora",
    rank: "DTU B.Tech",
    exam: "JEE Qualified — DTU Selection",
    year: 2024,
    course: "Foundation to JEE Batch",
    photoUrl: "/images/placeholders/topper-ansh.jpg",
    isTopTopper: true,
  },
  {
    id: "r6",
    name: "Rutvik Kelkar",
    rank: "AIR 2072",
    exam: "JEE Main 2025 (IIT BHU)",
    year: 2025,
    course: "Classroom Program",
    photoUrl: "/images/placeholders/topper-rutvik.jpg",
    isTopTopper: true,
  },
];

export const RESULTS_STATS = {
  topRanker: {
    name: "Sabal Agrawal",
    rank: "AIR 272",
    exam: "JEE Advanced 2025",
  },
  jeeMainQualified: "200+",
  jeeAdvancedQualified: "80+",
};
