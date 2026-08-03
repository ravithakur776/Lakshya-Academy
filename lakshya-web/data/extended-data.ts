// Extended static data for detail pages

export interface CourseDetail {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  duration: string;
  targetAudience: string;
  batchSize: number;
  startDate: string;
  overview: string;
  curriculum: {
    phase: string;
    topics: string[];
  }[];
  features: string[];
  schedule: string;
  feeStructure: {
    totalFee: string;
    installmentAvailable: boolean;
    scholarshipInfo: string;
  };
  suitableFor: string[];
}

export const courseDetails: Record<string, CourseDetail> = {
  "aspire-class-11": {
    slug: "aspire-class-11",
    title: "Aspire Batch",
    subtitle: "2-Year Integrated JEE Mains & Advanced Program for Class 11th Students",
    tagline: "Build a rock-solid foundation for JEE Advanced from Class 11th",
    badge: "2-Year JEE Program",
    duration: "2 Years (Class 11 & 12)",
    targetAudience: "Students moving to Class 11th",
    batchSize: 50,
    startDate: "April 2026",
    overview:
      "The Aspire Batch is our flagship 2-year program designed for students moving to Class 11. Led directly by IIT (BHU) alumni directors Mr. Vikas Shandilya and Mr. Pushpendra Sharma, this course covers the entire Class 11 and 12 Physics, Chemistry, and Mathematics syllabus from foundational concepts to advanced problem-solving required for JEE Advanced.",
    curriculum: [
      {
        phase: "Phase 1: Class 11th Foundation & Core Concepts (Apr - Nov)",
        topics: [
          "Physics: Kinematics, Laws of Motion, Work Energy Power, Rotational Dynamics",
          "Chemistry: Atomic Structure, Periodic Table, Chemical Bonding, Mole Concept",
          "Mathematics: Sets & Relations, Quadratic Equations, Trigonometry, Sequences & Series",
        ],
      },
      {
        phase: "Phase 2: Class 11th Advanced Revision & Board Preparation (Dec - Feb)",
        topics: [
          "Physics: Thermodynamics, Waves & Oscillations, Fluid Mechanics",
          "Chemistry: Equilibrium, Redox, Organic Chemistry Basics (GOC)",
          "Mathematics: Coordinate Geometry, Permutations & Combinations, Binomial Theorem",
        ],
      },
      {
        phase: "Phase 3: Class 12th Syllabus + JEE Advanced Mastery (Mar - Nov)",
        topics: [
          "Physics: Electrostatics, Magnetism, Optics, Modern Physics",
          "Chemistry: Electrochemistry, Chemical Kinetics, Coordination Compounds, Organic Reactions",
          "Mathematics: Calculus (Limits, Derivatives, Integrals), Vectors & 3D Geometry",
        ],
      },
      {
        phase: "Phase 4: Full Mock Test Series & Rank Boosting (Dec - May)",
        topics: [
          "Daily Test Series (DTS) matching exact JEE Main & Advanced patterns",
          "Director 1-on-1 performance analysis & rank enhancement strategy",
          "Full syllabus revision with previous 15 years' question analysis",
        ],
      },
    ],
    features: [
      "Taught directly by IIT (BHU) Alumni Directors with 17+ years experience",
      "Strict 50-student batch size limit for personalized 1-on-1 attention",
      "Comprehensive study modules, DPPs, and AITS (All-India Test Series)",
      "Daily post-class doubt clearance sessions with main faculty",
      "Up to 100% scholarship available through LTPE 2026",
    ],
    schedule: "6 Days/week | 4 Hours/day (Morning & Evening batches available)",
    feeStructure: {
      totalFee: "Contact Admissions for current fee structure & scholarship discounts",
      installmentAvailable: true,
      scholarshipInfo: "Earn up to 100% tuition fee waiver based on LTPE 2026 performance",
    },
    suitableFor: [
      "Class 10th passed students aiming for top 500 AIR in JEE Advanced",
      "Students looking for authentic IITian mentorship without moving to Kota",
      "Parents looking for disciplined environment & regular academic updates",
    ],
  },

  "zenith-class-12": {
    slug: "zenith-class-12",
    title: "Zenith Batch",
    subtitle: "1-Year Target JEE Mains & Advanced Program for Class 12th Students",
    tagline: "Master Class 12th syllabus while systematically revising Class 11th concepts",
    badge: "Target JEE 2026",
    duration: "1 Year (Class 12)",
    targetAudience: "Students moving to Class 12th",
    batchSize: 50,
    startDate: "April 2026",
    overview:
      "The Zenith Batch is tailored for Class 12 students who need to master the Class 12th syllabus while simultaneously strengthening Class 11th weak topics. Guided by our IIT (BHU) alumni directors, this program balances Board Exam excellence with high-level JEE Advanced problem solving.",
    curriculum: [
      {
        phase: "Phase 1: Class 12th Core Syllabus Completion (Apr - Sep)",
        topics: [
          "Physics: Electrostatics, Current Electricity, Magnetism, EMI & AC, Optics",
          "Chemistry: Physical & Inorganic Chemistry, Named Organic Reactions",
          "Mathematics: Differential & Integral Calculus, Matrices & Determinants",
        ],
      },
      {
        phase: "Phase 2: Class 11th Revision & Bridge Modules (Oct - Nov)",
        topics: [
          "Targeted revision of Mechanics, Thermodynamics, GOC, and Algebra",
          "Weak area diagnostics & intensive problem-solving workshops",
        ],
      },
      {
        phase: "Phase 3: Board Exam Preparation & JEE Main Crash Tests (Dec - Feb)",
        topics: [
          "NCERT line-by-line coverage for Class 12th Board Exams",
          "JEE Main Speed & Accuracy test series with instant score analysis",
        ],
      },
      {
        phase: "Phase 4: JEE Advanced Final Push (Mar - May)",
        topics: [
          "Multi-conceptual questions & matrix match problem solving",
          "Director-led test series and individual rank booster strategies",
        ],
      },
    ],
    features: [
      "Dual focus on CBSE/UP Board Exam scoring (90%+) and JEE Advanced rank",
      "Direct guidance from IIT (BHU) directors Mr. Vikas & Mr. Pushpendra",
      "Small batch size of 50 students ensuring personal progress tracking",
      "Weekly Part Tests, Full Tests & Video Solution discussions",
    ],
    schedule: "6 Days/week | 4 Hours/day",
    feeStructure: {
      totalFee: "Contact Admissions for current fee structure & scholarship discounts",
      installmentAvailable: true,
      scholarshipInfo: "Earn up to 100% scholarship based on Class 11 marks or LTPE score",
    },
    suitableFor: [
      "Class 11th students moving to Class 12th aiming for 99+ percentile in JEE Main",
      "Students wanting strong Board Exam score along with top JEE Advanced rank",
    ],
  },

  "excel-droppers": {
    slug: "excel-droppers",
    title: "Excel Batch",
    tagline: "Transform your gap year into an IIT rank with rigorous problem solving",
    subtitle: "1-Year Intensive Rank Booster Program for Class 12th Passed / Dropper Students",
    badge: "Rank Booster",
    duration: "1 Year (Repeater / Dropper)",
    targetAudience: "Class 12th Passed Students",
    batchSize: 50,
    startDate: "May / June 2026",
    overview:
      "The Excel Batch is our dedicated repeater program built for droppers who want to maximize their JEE Main & Advanced rank in 1 year. Without board exam distractions, students undergo an intensive 10-month training covering full Class 11 and 12 syllabus with advanced shortcut techniques and daily problem practice.",
    curriculum: [
      {
        phase: "Phase 1: Rapid Full Syllabus Coverage & Concept Polish (May - Oct)",
        topics: [
          "Complete Class 11 & 12 syllabus taught from fundamentals to Advanced level",
          "Daily Practice Problems (DPPs) with 50+ questions per subject daily",
        ],
      },
      {
        phase: "Phase 2: Advanced Problem Solving & Mock Tests (Nov - Jan)",
        topics: [
          "JEE Main 1st Attempt test series with percentile estimation",
          "Error analysis notebooks maintained for every student under Director supervision",
        ],
      },
      {
        phase: "Phase 3: JEE Advanced Specialized Training (Feb - May)",
        topics: [
          "Complex multi-correct, numerical, and paragraph-based question practice",
          "Exclusive All-India Test Series (AITS) & Rank Improvement Program",
        ],
      },
    ],
    features: [
      "Taught by IIT (BHU) Alumni directors with 17+ years proven track record of top rankers",
      "Strict study schedule with mandatory self-study library hours",
      "Daily doubt clearance sessions until 7 PM directly with faculty",
      "Special emphasis on speed, accuracy, and negative marking elimination",
    ],
    schedule: "6 Days/week | 6 Hours/day (Includes guided self-study & problem solving)",
    feeStructure: {
      totalFee: "Contact Admissions for current fee structure & scholarship discounts",
      installmentAvailable: true,
      scholarshipInfo: "Up to 100% scholarship available based on previous JEE Main percentile",
    },
    suitableFor: [
      "Class 12th passed students taking a drop year to target top IITs & NITs",
      "Students wanting to jump from 85-90 percentile to 99+ percentile in JEE Main",
    ],
  },
};

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "crack-jee-advanced-1-year",
    title: "How to Crack JEE Advanced in 1 Year: A Complete Strategy Guide",
    category: "JEE Strategy",
    categoryColor: "bg-emerald-100 text-emerald-700",
    date: "July 28, 2025",
    readTime: "8 min read",
    excerpt: "A comprehensive roadmap for Class 12 & Dropper students aiming to crack JEE Advanced in their first attempt. Covers time management, subject prioritization, and mock test strategy.",
    content: `JEE Advanced is one of the most rigorous competitive examinations globally. Rather than testing pure memorization, it evaluates a student's analytical depth, multi-concept application, and problem-solving speed under pressure.

### Phase 1: Building Unshakable Conceptual Clarity (Months 1–4)
Focus strictly on understanding core physical & mathematical principles rather than memorizing formula sheets. In Physics, master mechanics and electrodynamics from ground zero. In Chemistry, focus on reaction mechanisms rather than rote learning.

- **Daily Practice Problem (DPP) Discipline**: Solve 30-40 targeted JEE-level problems daily across Physics, Chemistry, and Mathematics.
- **Micro-Analysis of Errors**: Maintain an 'Error Notebook' listing every wrong question and the exact concept gap that caused it.

### Phase 2: High-Volume Multi-Concept Problem Solving (Months 5–8)
JEE Advanced questions frequently combine multiple chapters (e.g., combining Calculus with Coordinate Geometry, or Electromagnetism with SHM).

- **Timely Doubt Clearance**: Never let doubts accumulate for more than 24 hours. Get them resolved directly with experienced IIT alumni faculty.
- **60-30-10 Time Split**: Allocate 60% of your time to active problem practice, 30% to theory revision, and 10% to past paper analysis.

### Phase 3: Simulated Full-Length Mock Tests (Months 9–12)
Take full 6-hour simulated tests (Paper 1 & Paper 2) strictly in actual NTA/IIT exam slots (9 AM–12 PM and 2:30 PM–5:30 PM). Analyze every paper for at least 2 hours to identify time management traps.`,
    author: "Mr. Vikas Shandilya",
    authorRole: "Director & Co-Founder | IIT (BHU) Mechanical",
    authorAvatar: "/images/faculty/vikas-shandilya.jpg",
    coverImage: "/images/faculty/vikas-shandilya.jpg",
    tags: ["JEE Advanced", "Strategy", "Time Management", "Preparation"],
    featured: true,
  },
  {
    id: "b2",
    slug: "jee-mains-mistakes",
    title: "Top 10 Mistakes Students Make While Preparing for JEE Mains",
    category: "Tips & Tricks",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "July 15, 2025",
    readTime: "6 min read",
    excerpt: "Avoid these 10 common mistakes in negative marking, formula application, and test strategy that prevent students from achieving their 99+ percentile goal.",
    content: `Having mentored thousands of JEE aspirants over the last 17+ years, we frequently see brilliant students lose valuable marks due to avoidable strategy mistakes. Here are the top 10 mistakes to eliminate immediately:

1. **Ignoring NCERT for Inorganic & Organic Chemistry**: 80% of JEE Main Chemistry questions are direct or derived statements from NCERT textbooks.
2. **Over-attending Lectures Without Self-Study**: Spending 6 hours in class without 4 hours of focused self-practice yields diminishing returns.
3. **Ignoring Negative Marking Penalties**: Attempting wildcard guesses in single-choice questions destroys your percentile rank.
4. **Not Timing Practice Sessions**: Solving 20 questions in 3 hours at home builds false confidence; train with a 2-minute timer per question.
5. **Postponing Mock Test Series**: Waiting to "finish the entire syllabus" before attempting test series is a critical trap. Start mock tests early.
6. **Focusing Only on Favorite Subjects**: Weakness in even one subject severely impacts your total rank. Maintain equal momentum across Physics, Chemistry & Math.
7. **Neglecting Revision Cycles**: Concepts fade rapidly without weekly revision intervals.
8. **Copying Solutions Without Attempting First**: Looking at solutions after 1 minute of trying deprives your brain of analytical development.
9. **Irregular Sleep and Exam-Night Stress**: Cramming overnight before test day drastically lowers cognitive performance.
10. **Lack of Personal Guidance**: Trying to navigate complex topics alone without expert IITian mentorship.`,
    author: "Mr. Pushpendra Sharma",
    authorRole: "Director & Co-Founder | IIT (BHU) Mining",
    authorAvatar: "/images/faculty/pushpendra-sharma.jpg",
    coverImage: "/images/gallery/pushpendra-sir-lecture.jpg",
    tags: ["JEE Mains", "Mistakes", "Tips", "Percentile"],
    featured: true,
  },
  {
    id: "b3",
    slug: "foundation-course-advantage",
    title: "Foundation Course: Why Starting Early Gives You a 3x Advantage",
    category: "Foundation",
    categoryColor: "bg-purple-100 text-purple-700",
    date: "July 5, 2025",
    readTime: "5 min read",
    excerpt: "Students who start early in Class 8, 9 & 10 build mathematical maturity and analytical thinking that makes Class 11-12 JEE preparation seamless.",
    content: `Starting early in Class 8, 9, or 10 is not about burdening young minds with Class 11-12 formulas. Instead, it is about cultivating mathematical intuition, analytical reasoning, and scientific curiosity.

### Why Early Preparation Works:
- **Mathematical Aptitude**: Algebra, Geometry, and Basic Calculus concepts become second nature.
- **Olympiad & NTSE Exposure**: Exposure to competitive exams like NSEC, NSEP, and RMO builds confidence under pressure.
- **Stress-Free Class 11 Transition**: While others experience a steep difficulty jump in Class 11, foundation students transition smoothly.`,
    author: "Mr. Vikas Shandilya",
    authorRole: "Director & Co-Founder | IIT (BHU) Mechanical",
    authorAvatar: "/images/faculty/vikas-shandilya.jpg",
    coverImage: "/images/faculty/vikas-shandilya.jpg",
    tags: ["Foundation", "Early Preparation", "Class 8", "Class 9"],
    featured: false,
  },
  {
    id: "b4",
    slug: "organic-chemistry-shortcuts",
    title: "Mastering Organic Chemistry: 7 Reaction Patterns That Cover 80% of JEE Questions",
    category: "Chemistry",
    categoryColor: "bg-amber-100 text-amber-700",
    date: "June 20, 2025",
    readTime: "10 min read",
    excerpt: "Stop memorizing individual reactions. Master these 7 fundamental reaction mechanisms to predict organic chemistry products with high accuracy.",
    content: `Organic Chemistry is not a memory test — it is a logical system driven by electron density and stability. Once you master core mechanism types, predicting reaction products becomes straightforward.

### The 7 Core Patterns to Master:
1. **Electrophilic Addition to Alkenes & Alkynes**: Markovnikov vs. Anti-Markovnikov addition rules.
2. **Nucleophilic Substitution ($SN1$ vs $SN2$)**: Solvent polarity, carbocation stability, and stereochemistry.
3. **Nucleophilic Addition to Carbonyls**: Grignard reagents, Aldol & Cannizzaro reactions.
4. **Electrophilic Aromatic Substitution ($EAS$)**: Directing effects of activating & deactivating groups on Benzene.
5. **Elimination Reactions ($E1$ vs $E2$)**: Saytzeff vs Hofmann elimination selectivity.
6. **Acid-Base Strength Evaluation**: Resonance, Inductive effect, and Hyperconjugation rules.
7. **Rearrangement Reactions**: Hydride and Methyl shifts in carbocation intermediates.`,
    author: "Mr. Pushpendra Sharma",
    authorRole: "Director & Co-Founder | IIT (BHU) Mining",
    authorAvatar: "/images/faculty/pushpendra-sharma.jpg",
    coverImage: "/images/faculty/pushpendra-sharma.jpg",
    tags: ["Organic Chemistry", "JEE Chemistry", "Shortcuts", "Mechanisms"],
    featured: false,
  },
  {
    id: "b5",
    slug: "dropper-year-guide",
    title: "Dropper's Guide: How to Use Your Gap Year Strategically for JEE",
    category: "Dropper",
    categoryColor: "bg-rose-100 text-rose-700",
    date: "June 10, 2025",
    readTime: "7 min read",
    excerpt: "Dropping a year for JEE requires courage and strategy. Learn how 78% of Lakshya's dropper students drastically improve their ranks.",
    content: `Taking a drop year for JEE is a strategic investment in your future. You already possess baseline knowledge — your goal now is to turn weak topics into scoring strengths and refine exam temperament.

### The Dropper's Winning Roadmap:
- **Audit Previous Attempts**: Identify exact topic gaps and time management bottlenecks from your previous exam.
- **Daily 6-Hour Focused Self-Study**: Combine daily practice problems (DPPs) with timed sectional tests.
- **Weekly Mock Test Series**: Take a full test every Sunday, followed by 3 hours of rigorous test analysis.
- **Direct Mentor Accountability**: Weekly check-ins with your mentors to stay disciplined and motivated.`,
    author: "Mr. Vikas Shandilya",
    authorRole: "Director & Co-Founder | IIT (BHU) Mechanical",
    authorAvatar: "/images/faculty/vikas-shandilya.jpg",
    coverImage: "/images/gallery/directors-ranker-batch.jpg",
    tags: ["Dropper", "Gap Year", "JEE Strategy", "Second Attempt"],
    featured: false,
  },
  {
    id: "b6",
    slug: "parent-guide-jee-preparation",
    title: "Parent's Complete Guide: How to Support Your Child Through JEE Preparation",
    category: "For Parents",
    categoryColor: "bg-teal-100 text-teal-700",
    date: "May 25, 2025",
    readTime: "6 min read",
    excerpt: "JEE preparation is an emotional and academic journey for the entire family. Discover how parents can foster confidence and peace of mind.",
    content: `Parents play a pivotal role in creating an environment where an aspirant can thrive emotionally and academically.

### Key Guidelines for Parents:
1. **Focus on Effort & Consistency Over Test Marks**: Scores fluctuate during preparation. Encourage continuous effort rather than stressing over single test scores.
2. **Ensure Balanced Nutrition & Rest**: Proper sleep and physical well-being enhance memory retention and cognitive performance.
3. **Maintain Open Communication**: Be an empathetic listener so your child feels comfortable sharing academic stress.
4. **Partner with Experienced Mentors**: Work closely with directors who provide transparent progress updates and personalized guidance.`,
    author: "Mr. Pushpendra Sharma",
    authorRole: "Director & Co-Founder | IIT (BHU) Mining",
    authorAvatar: "/images/faculty/pushpendra-sharma.jpg",
    coverImage: "/images/faculty/pushpendra-sharma.jpg",
    tags: ["Parents", "Support", "JEE Journey", "Mental Health"],
    featured: false,
  },
];

export const blogCategories = ["All", "JEE Strategy", "Tips & Tricks", "Foundation", "Chemistry", "Dropper", "For Parents"];

// ── FAQ Data ──────────────────────────────────────────────────
export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
  faqs: { q: string; a: string }[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "admissions",
    name: "Admissions",
    icon: "📋",
    faqs: [
      {
        q: "Who teaches the classes at Lakshya Academy?",
        a: "All classes, lectures, and doubt sessions are conducted directly by IIT (BHU) alumni co-founders Mr. Vikas Shandilya & Mr. Pushpendra Sharma with 17+ years of experience each.",
      },
      {
        q: "What is the maximum batch size?",
        a: "We maintain a strict limit of 50 students per batch to guarantee individual attention and personal tracking.",
      },
    ],
  },
  {
    id: "ltpe",
    name: "LTPE Exam",
    icon: "🏆",
    faqs: [
      {
        q: "How can I register for the LTPE 2026 Scholarship Exam?",
        a: "You can register for FREE on our website under the LTPE tab. The exam takes place on 23 August 2026 offering up to 100% tuition fee waiver.",
      },
    ],
  },
  {
    id: "courses",
    name: "Courses",
    icon: "🎓",
    faqs: [
      {
        q: "Which courses are offered at Lakshya Academy?",
        a: "We offer Aspire (2-Year for Class 11), Zenith (1-Year for Class 12), and Excel (1-Year Rank Booster for Droppers) exclusively for IIT-JEE.",
      },
    ],
  },
];

export const faqData = faqCategories.flatMap((c) => c.faqs);

// ── Gallery Data ──────────────────────────────────────────────
export const galleryCategories = ["All", "Achievements", "Classrooms", "Events", "Celebrations"];

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image?: string;
  gradient: string;
  icon: string;
  date?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Manvendra Singh (AIR 6824) Seated with Parents",
    category: "Achievements",
    image: "/images/gallery/manvendra-singh-parents.jpg",
    gradient: "from-[#0F7A3C] to-emerald-900",
    icon: "🏆",
    date: "JEE Advanced 2024",
  },
  {
    id: "g2",
    title: "Mr. Pushpendra Sharma (IIT BHU) Interactive Physics Lecture",
    category: "Classrooms",
    image: "/images/gallery/pushpendra-sir-lecture.jpg",
    gradient: "from-teal-700 to-emerald-950",
    icon: "👨‍🏫",
    date: "Classroom Session",
  },
  {
    id: "g3",
    title: "Directors & IIT-JEE Topper Ranker Batch Felicitation",
    category: "Celebrations",
    image: "/images/gallery/directors-ranker-batch.jpg",
    gradient: "from-emerald-700 to-green-900",
    icon: "🎖️",
    date: "Batch Felicitation",
  },
  {
    id: "g4",
    title: "Modern Smart Classroom Infrastructure at Lakshya Academy",
    category: "Classrooms",
    image: "/images/gallery/classroom-infrastructure.jpg",
    gradient: "from-green-800 to-teal-950",
    icon: "🏫",
    date: "Campus Facilities",
  },
  {
    id: "g5",
    title: "JEE Topper Victory Rally — Krishna Nagar Mathura",
    category: "Events",
    image: "/images/gallery/topper-rally-1.jpg",
    gradient: "from-[#0F7A3C] to-emerald-900",
    icon: "🏆",
    date: "August 2025",
  },
  {
    id: "g6",
    title: "Devanshi Garg — IIT Guwahati Selection",
    category: "Achievements",
    image: "/images/gallery/devanshi-garg-iitg.jpg",
    gradient: "from-blue-700 to-indigo-900",
    icon: "🎓",
    date: "JEE Main 2024",
  },
  {
    id: "g7",
    title: "Mohak Kalra (AIR 185) & Aayush Singh (AIR 279) with Parents",
    category: "Achievements",
    image: "/images/gallery/mohak-aayush-toppers-2022.jpg",
    gradient: "from-amber-600 to-orange-800",
    icon: "🌟",
    date: "JEE Main 2022",
  },
  {
    id: "g8",
    title: "Sanjhi Priya — IIT Bombay Selection",
    category: "Achievements",
    image: "/images/gallery/sanjhi-priya-iitb.jpg",
    gradient: "from-purple-700 to-indigo-950",
    icon: "🎓",
    date: "JEE Advanced 2023",
  },
  {
    id: "g9",
    title: "Ritik Saraswat — IIT BHU Selection",
    category: "Achievements",
    image: "/images/gallery/ritik-saraswat-iitbhu.jpg",
    gradient: "from-emerald-700 to-teal-900",
    icon: "🎓",
    date: "JEE Advanced",
  },
  {
    id: "g10",
    title: "Srajan Agrawal — IIT BHU Selection",
    category: "Achievements",
    image: "/images/gallery/srajan-agrawal-iitbhu.jpg",
    gradient: "from-teal-800 to-emerald-950",
    icon: "🎓",
    date: "JEE Advanced",
  },
  {
    id: "g11",
    title: "Harsh Sharma — IIT Kanpur Selection",
    category: "Achievements",
    image: "/images/gallery/harsh-sharma-iitk.jpg",
    gradient: "from-blue-800 to-indigo-950",
    icon: "🎓",
    date: "JEE Advanced",
  },
  {
    id: "g12",
    title: "Rishabh Agrawal — IIT Kanpur Selection",
    category: "Achievements",
    image: "/images/gallery/rishabh-agrawal-iitk.jpg",
    gradient: "from-indigo-800 to-purple-950",
    icon: "🎓",
    date: "JEE Advanced",
  },
  {
    id: "g13",
    title: "Directors & IIT-JEE Topper Batch Group Photo",
    category: "Celebrations",
    image: "/images/gallery/directors-toppers-group.jpg",
    gradient: "from-green-700 to-emerald-900",
    icon: "👨‍🎓",
    date: "Annual Batch",
  },
  {
    id: "g14",
    title: "IIT-JEE Toppers Cake Cutting & Directors Celebration",
    category: "Celebrations",
    image: "/images/gallery/cake-celebration.jpg",
    gradient: "from-emerald-700 to-green-900",
    icon: "🎉",
    date: "July 2025",
  },
  {
    id: "g15",
    title: "Classroom Lecture & Focused Study Session",
    category: "Classrooms",
    image: "/images/gallery/classroom-boys-study.jpg",
    gradient: "from-teal-700 to-emerald-950",
    icon: "📚",
    date: "July 2025",
  },
  {
    id: "g16",
    title: "Interactive Classroom Problem Solving Session",
    category: "Classrooms",
    image: "/images/gallery/classroom-girls-study.jpg",
    gradient: "from-emerald-800 to-green-950",
    icon: "✏️",
    date: "June 2025",
  },
  {
    id: "g17",
    title: "Classroom Exam & Diagnostic Test Session",
    category: "Classrooms",
    image: "/images/gallery/exam-session.jpg",
    gradient: "from-teal-700 to-emerald-950",
    icon: "📝",
    date: "June 2025",
  },
  {
    id: "g18",
    title: "JEE Advanced Rankers Procession with Directors",
    category: "Events",
    image: "/images/gallery/topper-rally-2.jpg",
    gradient: "from-emerald-800 to-teal-900",
    icon: "🚗",
    date: "May 2025",
  },
  {
    id: "g19",
    title: "Grand Street Procession of Toppers in Mathura",
    category: "Events",
    image: "/images/gallery/street-procession.jpg",
    gradient: "from-[#0F7A3C] to-green-950",
    icon: "💐",
    date: "May 2025",
  },
];

export const galleryData = galleryItems;
