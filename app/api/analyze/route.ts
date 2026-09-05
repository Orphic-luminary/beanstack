import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, role, skills } = body;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are BeanStack's AI career analyst.

Analyze the user's career profile for their desired role.

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not add any text outside the JSON.

Return exactly this structure:

{
  "careerReadiness": 0,
  "summary": "string",
  "strengths": ["string", "string", "string"],
  "skillGaps": ["string", "string", "string"],
  "recommendedPath": ["string", "string", "string"]
}

RULES:

careerReadiness must be a realistic INTEGER from 0 to 100.

The score should represent how prepared the candidate currently is for their desired role.

Consider:
- relevance of their skills to the desired role
- completeness of their current skills
- apparent experience level
- missing important skills

Do not give everyone a high score. Be critical and realistic.
          `,
        },

        {
          role: "user",
          content: `
Name: ${name}
Email: ${email}
Desired Role: ${role}
Current Skills: ${skills}

Analyze this person's career readiness and generate their personalized learning recommendations.
          `,
        },
      ],

      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("The AI returned no response");
    }

    const analysis = JSON.parse(content);

    const safeAnalysis = {
      careerReadiness: Number(analysis.careerReadiness) || 0,

      summary:
        typeof analysis.summary === "string"
          ? analysis.summary
          : "No summary available.",

      strengths: Array.isArray(analysis.strengths)
        ? analysis.strengths
        : [],

      skillGaps: Array.isArray(analysis.skillGaps)
        ? analysis.skillGaps
        : [],

      recommendedPath: Array.isArray(analysis.recommendedPath)
        ? analysis.recommendedPath
        : [],
    };

    return NextResponse.json(safeAnalysis);

  } catch (error) {
    console.error("GROQ ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze profile",
      },
      { status: 500 }
    );
  }
}