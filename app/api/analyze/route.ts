import OpenAI from "openai";
import { NextResponse } from "next/server";

const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, role, skills } = body;

    const response = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a career analyst. Analyze candidates and return useful career insights.",
        },
        {
          role: "user",
          content: `Analyze this candidate:

Name: ${name}
Desired role: ${role}
Skills: ${skills}

Return ONLY valid JSON in exactly this format:

{
  "careerReadiness": 75,
  "summary": "A short analysis",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "skillGaps": ["gap 1", "gap 2", "gap 3"],
  "recommendedPath": ["step 1", "step 2", "step 3"]
}`,
        },
      ],
    });

    const text = response.choices[0]?.message?.content;

    if (!text) {
      throw new Error("AI returned no response");
    }

    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to analyze profile" },
      { status: 500 }
    );
  }
}