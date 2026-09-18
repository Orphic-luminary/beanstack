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
    // ==========================================
    // 1. GET FORM DATA
    // ==========================================

    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const role = (formData.get("role") as string) || "";
    const skills = (formData.get("skills") as string) || "";

    // ==========================================
    // 2. GET RESUME
    // ==========================================

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

    // ==========================================
    // 3. CONVERT RESUME TO BUFFER
    // ==========================================

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let resumeText = "";

    // ==========================================
    // 4. EXTRACT TEXT FROM PDF
    // ==========================================

    if (resume.type === "application/pdf") {
      const pdf = await extractText(new Uint8Array(bytes), {
        mergePages: true,
      });

      resumeText = pdf.text;
    }

    // ==========================================
    // 5. EXTRACT TEXT FROM DOCX
    // ==========================================

    else if (
      resume.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer,
      });

      resumeText = result.value;
    }

    // ==========================================
    // 6. REJECT OTHER FILE TYPES
    // ==========================================

    else {
      return NextResponse.json(
        {
          error: "Only PDF and DOCX resumes are supported",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // 7. MAKE SURE RESUME TEXT EXISTS
    // ==========================================

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

    // ==========================================
    // 8. SEND PROFILE + RESUME TO GROQ
    // ==========================================

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        // --------------------------------------
        // SYSTEM PROMPT
        // --------------------------------------

        {
          role: "system",

          content: `
You are BeanStack's AI career analyst.

Your job is to analyze a candidate's profile and resume
for their desired career role.

IMPORTANT:

You must NOT calculate the final Career Readiness score.

BeanStack will calculate the final score mathematically
using the six individual scores you provide.

You must independently evaluate these six factors.

------------------------------------------
1. SKILLS
------------------------------------------

Evaluate how strong and relevant the candidate's demonstrated
skills are for their desired role.

Consider:
- technical skills
- tools and technologies
- depth of knowledge
- relevance to the target role
- completeness of the skill set

Give a score from 0 to 100.

------------------------------------------
2. EXPERIENCE
------------------------------------------

Evaluate the candidate's relevant practical or professional
experience.

Consider:
- internships
- jobs
- freelance work
- practical work
- responsibilities
- relevance to the desired role

Students with little or no professional experience should
receive a lower score here.

Give a score from 0 to 100.

------------------------------------------
3. PROJECTS
------------------------------------------

Evaluate the candidate's projects and portfolio.

Consider:
- number of meaningful projects
- technical complexity
- relevance to the target role
- practical implementation
- evidence of real problem solving

Simple tutorial projects should not receive the same score
as substantial real-world projects.

Give a score from 0 to 100.

------------------------------------------
4. ROLE ALIGNMENT
------------------------------------------

Evaluate how closely the candidate's overall profile matches
their desired role.

Consider:
- skills
- experience
- projects
- education
- career direction

Give a score from 0 to 100.

------------------------------------------
5. EDUCATION
------------------------------------------

Evaluate how relevant the candidate's educational background
is to their desired role.

Consider:
- degree
- specialization
- relevant subjects
- academic background

Give a score from 0 to 100.

------------------------------------------
6. CERTIFICATIONS
------------------------------------------

Evaluate useful certifications, achievements, competitions,
credentials, or other demonstrated accomplishments.

If the candidate has little or no evidence of certifications
or achievements, give an appropriately low score.

Do not punish a candidate excessively simply because they
do not have certifications.

Give a score from 0 to 100.

------------------------------------------
SCORING BEHAVIOR
------------------------------------------

Be critical, realistic, and evidence-based.

Do not give everyone high scores.

A beginner with limited skills, experience and projects
should score significantly lower than an experienced candidate.

Do not assume skills or experience that are not present
in the provided information.

Use evidence from the resume whenever possible.

------------------------------------------
OUTPUT FORMAT
------------------------------------------

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Do not write anything before or after the JSON.

Return exactly this structure:

{
  "summary": "A concise overall summary of the candidate.",
  "profileAnalysis": "A personalized 2-4 sentence analysis explaining what stands out about the candidate, what is holding them back, and what they should focus on next.",

  "scores": {
    "skills": 0,
    "experience": 0,
    "projects": 0,
    "roleAlignment": 0,
    "education": 0,
    "certifications": 0
  },

  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],

  "skillGaps": [
    "Skill gap 1",
    "Skill gap 2",
    "Skill gap 3"
  ],

  "recommendedPath": [
    "Actionable step 1",
    "Actionable step 2",
    "Actionable step 3"
  ]
}

Additional rules:

- strengths must contain exactly 3 items.
- skillGaps must contain exactly 3 items.
- recommendedPath must contain exactly 3 items.
- Each item must be concise and specific.
- The profileAnalysis must be based on the actual candidate information.
- Do not invent experience, projects, skills, education or achievements.
          `,
        },

        // --------------------------------------
        // USER PROMPT
        // --------------------------------------

        {
          role: "user",

          content: `
Analyze this candidate.

==========================================
CANDIDATE INFORMATION
==========================================

Name:
${name}

Email:
${email}

Desired Role:
${role}

Skills entered by the user:
${skills}

==========================================
RESUME
==========================================

----- RESUME START -----

${resumeText.slice(0, 12000)}

----- RESUME END -----

==========================================
INSTRUCTIONS
==========================================

Analyze the candidate using BOTH:

1. The information entered by the candidate.
2. The information extracted from their resume.

Pay particular attention to:

- education
- work experience
- internships
- projects
- technical skills
- tools and technologies
- achievements
- certifications
- relevance to the desired role
- missing skills required for the desired role
- evidence of practical ability

Do not assume information that is not present.
          `,
        },
      ],

      temperature: 0.7,
      max_completion_tokens: 1500,
    });

    // ==========================================
    // 9. GET AI RESPONSE
    // ==========================================

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("The AI returned no response");
    }

    // ==========================================
    // 10. PARSE AI JSON
    // ==========================================

    const analysis = JSON.parse(content);

    // ==========================================
    // 11. EXTRACT INDIVIDUAL SCORES
    // ==========================================

    const scores = analysis.scores ?? {};

    const skillsScore = Math.max(
      0,
      Math.min(100, Number(scores.skills) || 0)
    );

    const experienceScore = Math.max(
      0,
      Math.min(100, Number(scores.experience) || 0)
    );

    const projectsScore = Math.max(
      0,
      Math.min(100, Number(scores.projects) || 0)
    );

    const roleAlignmentScore = Math.max(
      0,
      Math.min(100, Number(scores.roleAlignment) || 0)
    );

    const educationScore = Math.max(
      0,
      Math.min(100, Number(scores.education) || 0)
    );

    const certificationsScore = Math.max(
      0,
      Math.min(100, Number(scores.certifications) || 0)
    );

    // ==========================================
    // 12. CALCULATE CAREER READINESS
    // ==========================================

    const careerReadiness = Math.round(
      skillsScore * 0.35 +
        experienceScore * 0.20 +
        projectsScore * 0.20 +
        roleAlignmentScore * 0.10 +
        educationScore * 0.10 +
        certificationsScore * 0.05
    );

    // ==========================================
    // 13. CREATE SAFE RESPONSE
    // ==========================================

    const safeAnalysis = {
      careerReadiness,

      summary:
        typeof analysis.summary === "string"
          ? analysis.summary
          : "No summary available.",

      profileAnalysis:
        typeof analysis.profileAnalysis === "string"
          ? analysis.profileAnalysis
          : "No profile analysis available.",

      scores: {
        skills: skillsScore,
        experience: experienceScore,
        projects: projectsScore,
        roleAlignment: roleAlignmentScore,
        education: educationScore,
        certifications: certificationsScore,
      },

      strengths: Array.isArray(analysis.strengths)
        ? analysis.strengths.slice(0, 3)
        : [],

      skillGaps: Array.isArray(analysis.skillGaps)
        ? analysis.skillGaps.slice(0, 3)
        : [],

      recommendedPath: Array.isArray(analysis.recommendedPath)
        ? analysis.recommendedPath.slice(0, 3)
        : [],
    };

    // ==========================================
    // 14. SEND RESULT TO FRONTEND
    // ==========================================

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