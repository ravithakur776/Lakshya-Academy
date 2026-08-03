import { NextRequest, NextResponse } from "next/server";

/**
 * AI Blog Draft Generator
 * Uses a template-based approach for now (Gemini API can be wired in later).
 * Returns a structured blog draft with SEO fields.
 */
export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Generate SEO-optimized slug
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const title = `${topic}: Complete Guide for JEE Aspirants 2025`;
    const seoTitle = `${topic} | JEE Preparation Guide 2025 | Lakshya Academy`;
    const metaDescription = `Comprehensive guide on ${topic} for JEE Main & Advanced 2025. Expert tips from Lakshya Academy's IIT alumni faculty. Start your preparation today.`;

    const draft = {
      title,
      slug,
      seoTitle,
      metaDescription,
      excerpt: `A comprehensive guide on ${topic} tailored for JEE Main and JEE Advanced aspirants. Covers key concepts, common mistakes, and effective study strategies from our expert faculty.`,
      tags: [topic, "JEE Preparation", "IIT-JEE", "Study Tips", "Lakshya Academy"],
      content: `# ${title}

## Introduction

${topic} is one of the most critical areas in JEE preparation. Students who master this concept gain a significant edge in both JEE Main and JEE Advanced examinations.

In this comprehensive guide, we'll cover everything you need to know about ${topic} — from fundamental concepts to advanced problem-solving strategies.

---

## Why ${topic} Matters for JEE

JEE Advanced has consistently tested deep conceptual understanding of ${topic}. In the past 5 years, approximately 8-12 questions per paper have been directly or indirectly based on this topic.

**Key reasons to prioritize ${topic}:**

- High weightage in both JEE Main and Advanced
- Frequently combined with other topics in multi-concept problems
- Forms the foundation for several advanced chapters
- Scoring becomes significantly easier once mastered

---

## Core Concepts to Master

### 1. Fundamental Principles

Begin with a thorough understanding of the underlying theory. Do not rush to problem-solving without a solid conceptual base.

### 2. Standard Problem Types

Practice standard problem types systematically before attempting advanced questions. Categorize problems by difficulty and track your progress.

### 3. Common Mistakes to Avoid

Most students lose marks due to:
- Misreading the problem statement
- Skipping unit conversions
- Making sign errors in calculations
- Ignoring limiting conditions

---

## Study Strategy from Lakshya Academy

Our faculty recommends a **3-phase approach**:

**Phase 1 — Concept Building (Week 1-2)**
Read NCERT thoroughly. Build mental models. Make brief notes.

**Phase 2 — Problem Practice (Week 3-5)**
Solve 20-30 problems daily. Focus on variety, not volume. Review mistakes carefully.

**Phase 3 — Revision & Mock Tests (Week 6+)**
Attempt timed mock tests. Analyze your weak areas. Revise once every 2 weeks.

---

## Recommended Books

1. **H.C. Verma** — For building strong fundamentals
2. **D.C. Pandey** — For variety of problems
3. **Previous Year Papers (2015-2025)** — Essential for pattern recognition

---

## Key Takeaways

- Consistency beats intensity. 2 hours daily is better than 10 hours on weekends.
- Maintain an error log to track and eliminate repeated mistakes.
- Teach concepts to others — it solidifies your own understanding.
- Use Lakshya Academy's test series to track your progress objectively.

---

## Conclusion

Mastering ${topic} requires disciplined effort and the right guidance. At Lakshya Academy, our expert faculty provides personalized attention to help every student achieve their IIT dream.

**Ready to take the next step?** [Book a free counselling session](/contact) with our academic advisors today.

---

*Written by the Faculty Team at Lakshya Academy, Mathura. With 15+ years of IIT-JEE coaching experience.*`,
    };

    return NextResponse.json(draft);
  } catch (error) {
    console.error("[POST /api/admin/ai/blog]", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
