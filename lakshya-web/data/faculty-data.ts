export type FacultyMember = {
  id: string;
  name: string;
  slug: string;
  title: string;
  qualification: string;
  experience: string;
  experienceYears: number;
  subjects: string[];
  bio: string;
  philosophy: string;
  photoUrl: string;
  rating: number;
  studentsCoached: string;
  topRankers: string;
  isDirector: boolean;
};

export const facultyMembersData: FacultyMember[] = [
  {
    id: "f1",
    name: "Mr. Vikas Shandilya",
    slug: "mr-vikas-shandilya",
    title: "Co-Director & Senior Faculty",
    qualification: "B.Tech, Mechanical Engineering, IIT (BHU)",
    experience: "17+ Years",
    experienceYears: 17,
    subjects: ["Mathematics", "Chemistry"],
    bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mechanical Engineering from IIT (BHU) with over 17 years of experience mentoring thousands of JEE Advanced toppers.",
    philosophy: "Mathematics and Chemistry are languages of pattern and precision. Once a student grasps the fundamental logic, even the toughest JEE Advanced problems become predictable.",
    photoUrl: "/images/faculty/vikas-shandilya.jpg",
    rating: 4.9,
    studentsCoached: "5,000+",
    topRankers: "100+",
    isDirector: true,
  },
  {
    id: "f2",
    name: "Mr. Pushpendra Sharma",
    slug: "mr-pushpendra-sharma",
    title: "Co-Director & Senior Faculty",
    qualification: "B.Tech, Mining Engineering, IIT (BHU)",
    experience: "17+ Years",
    experienceYears: 17,
    subjects: ["Physics", "Chemistry"],
    bio: "Co-founder & Director of Lakshya Academy. B.Tech in Mining Engineering from IIT (BHU) with 17+ years of expertise in Physics and Physical Chemistry conceptual mastery.",
    philosophy: "Physics is not about memorizing equations; it is about building intuitive physical models and mastering mathematical execution under exam pressure.",
    photoUrl: "/images/faculty/pushpendra-sharma.jpg",
    rating: 4.9,
    studentsCoached: "5,000+",
    topRankers: "100+",
    isDirector: true,
  },
];

export const facultyMembers = facultyMembersData;
