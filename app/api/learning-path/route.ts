import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      role,
      skills,
      careerReadiness,
      summary,
      strengths,
      skillGaps,
    } = body;

    if (!role) {
      return NextResponse.json(
        { error: "Desired role is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",

          content: `
You are BeanStack's personalized career learning-path architect.

Your job is to create a practical learning roadmap for a candidate based on:

- their desired role
- current skills
- career readiness score
- strengths
- skill gaps
- profile summary

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any text outside the JSON.

Return exactly this structure:

{
  "goal": "string",
  "estimatedDuration": "string",
  "phases": [
    {
      "title": "string",
      "duration": "string",
      "description": "string",
      "skills": ["string", "string"],
      "tasks": ["string", "string", "string"],
      "project": "string"
    }
  ]
}

RULES:

Create exactly 4 phases.

The phases should progress logically from the candidate's current level toward job readiness.

Each phase must contain:

- a clear title
- realistic duration
- short description
- 2 important skills
- exactly 3 practical tasks
- one practical project

Do not recommend skills the candidate already clearly possesses unless they need deeper mastery.

Prioritize practical projects and job-relevant skills over generic theory.

The roadmap should be achievable by a student or early-career developer.

Make the roadmap specific to the desired role.

Do not create a generic roadmap that could apply to everyone.
          `,
        },

        {
          role: "user",

          content: `
Candidate name:
${name || "Candidate"}

Desired role:
${role}

Current skills:
${skills || "Not provided"}

Career readiness:
${careerReadiness}/100

Profile summary:
${summary || "Not available"}

Current strengths:
${Array.isArray(strengths) ? strengths.join(", ") : "Not available"}

Skill gaps:
${Array.isArray(skillGaps) ? skillGaps.join(", ") : "Not available"}

Create a personalized learning path that takes this candidate from their current position toward being job-ready for:

${role}
          `,
        },
      ],

      temperature: 0.7,
      max_completion_tokens: 2500,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("The AI returned no learning path");
    }

    const learningPath = JSON.parse(content);

    const safePath = {
      goal:
        typeof learningPath.goal === "string"
          ? learningPath.goal
          : `Become job-ready for ${role}`,

      estimatedDuration:
        typeof learningPath.estimatedDuration === "string"
          ? learningPath.estimatedDuration
          : "3-6 months",

      phases: Array.isArray(learningPath.phases)
        ? learningPath.phases
        : [],
    };

    return NextResponse.json(safePath);
  } catch (error) {
    console.error("LEARNING PATH ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate learning path",
      },
      { status: 500 }
    );
  }
}