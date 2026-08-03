export type CourseItem = {
  id: string;
  name: string;
  courseName: string;
  slug: string;
  targetClass: string;
  duration: string;
  subjects: string[];
  batchSize: number;
  timings: string[];
  fee: string;
  description: string;
  isPopular?: boolean;
};

export const coursesData: CourseItem[] = [
  {
    id: "c1",
    name: "Class 11 Program",
    courseName: "Aspire",
    slug: "aspire-class-11",
    targetClass: "Class 11",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Competitive / Installment Options Available",
    description: "Architected for Class 11 students to build rock-solid JEE Main & Advanced fundamentals while excelling in school boards.",
    isPopular: true,
  },
  {
    id: "c2",
    name: "Class 12 Program",
    courseName: "Zenith",
    slug: "zenith-class-12",
    targetClass: "Class 12",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Competitive / Installment Options Available",
    description: "1-year intensive rank booster program for Class 12 covering 12th board syllabus alongside comprehensive 11th revision.",
    isPopular: true,
  },
  {
    id: "c3",
    name: "Dropper / Repeater Batch",
    courseName: "Excel",
    slug: "excel-droppers",
    targetClass: "Class 12 Passed (Droppers)",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    batchSize: 50,
    timings: ["Morning Batch", "Evening Batch"],
    fee: "Based on JEE Main Score or Scholarship (Up to 100%)",
    description: "Full-throttle 1-year dedicated program for Class 12 passed aspirants targeting Top 500 ranks in JEE 2026.",
    isPopular: true,
  },
];
