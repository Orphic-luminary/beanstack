import { extractText } from "unpdf";
import mammoth from "mammoth";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Get all submitted form data
    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const role = (formData.get("role") as string) || "";
    const skills = (formData.get("skills") as string) || "";

    // Get uploaded resume
    const resume = formData.get("resume") as File | null;

    if (!resume) {
      return NextResponse.json(
        {
          error: "No resume uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let resumeText = "";

    if (resume.type === "application/pdf") {
    const pdf = await extractText(
        new Uint8Array(bytes),
        {
        mergePages: true,
        }
    );

    resumeText = pdf.text;
    }
    else if (
    resume.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
    const result = await mammoth.extractRawText({
        buffer,
    });

    resumeText = result.value;
    } else {
    return NextResponse.json(
        {
        error: "Only PDF and DOCX resumes are supported",
        },
        {
        status: 400,
        }
    );
    }    // Check whether text was successfully extracted
    if (!resumeText.trim()) {
      return NextResponse.json(
        {
          error:
            "We could not extract readable text from this resume. Please upload another PDF or DOCX file.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // SEND PROFILE + RESUME TO GROQ
    // -----------------------------
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
Do not add explanations before or after the JSON.

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
- completeness of their skills
- education
- work experience
- projects
- achievements
- technical ability
- missing important skills

Do not give everyone a high score.

Be critical, realistic, and specific.

strengths must contain exactly 3 concise strengths.

skillGaps must contain exactly 3 important areas the candidate should improve.

recommendedPath must contain exactly 3 actionable next steps.
          `,
        },

        {
          role: "user",

          content: `
Name:${name}

Email:${email}

Desired Role:${role}

Skills entered by the user:${skills}

Here is the candidate's resume:

----- RESUME START -----

${resumeText.slice(0, 12000)}

----- RESUME END -----

Analyze this person's career readiness based on BOTH their entered information and their resume.

Pay particular attention to:

- education
- work experience
- projects
- technical skills
- achievements
- relevance to the desired role
- missing skills required for the role
          `,
        },
      ],

      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    // Get AI response
    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("The AI returned no response");
    }

    // Convert AI JSON text into JavaScript object
    const analysis = JSON.parse(content);

    // Validate and safely structure the result
    const safeAnalysis = {
      careerReadiness: Math.max(
        0,
        Math.min(100, Number(analysis.careerReadiness) || 0)
      ),

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

    // Send analysis back to frontend
    return NextResponse.json(safeAnalysis);
  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze profile",
      },
      {
        status: 500,
      }
    );
  }
}