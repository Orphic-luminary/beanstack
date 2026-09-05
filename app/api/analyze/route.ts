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

Analyze the user's career profile and return ONLY valid JSON.
Do not use markdown or code fences.

Return exactly this structure:

{
  "score": number,
  "summary": "string",
  "strengths": ["string", "string", "string"],
  "gaps": ["string", "string", "string"]
}
          `,
        },
        {
          role: "user",
          content: `
Name: ${name}
Email: ${email}
Desired Role: ${role}
Skills: ${skills}

Analyze this person's career readiness.
          `,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "The AI returned no response" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(content);

    const safeAnalysis = {
        careerReadiness: analysis.careerReadiness ?? 0,
        summary: analysis.summary ?? "No summary available.",
        strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
        skillGaps: Array.isArray(analysis.skillGaps)
        ? analysis.skillGaps
        : [],
        recommendedPath: Array.isArray(analysis.recommendedPath)
        ? analysis.recommendedPath
        : [],
    };

    return NextResponse.json(analysis);
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