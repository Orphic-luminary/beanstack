"use client";

import { FormEvent, useRef, useState } from "react";

type Stage = "form" | "processing" | "result";

export default function Home() {
  const [stage, setStage] = useState<Stage>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setResumeName(file.name);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setStage("processing");

    // Fake AI processing for demo
    setTimeout(() => {
      setStage("result");
    }, 3500);
  }

  function reset() {
    setStage("form");
  }

  if (stage === "processing") {
    return (
      <main className="processing-page">
        <div className="brand">
          bean<span>stack</span>
        </div>

        <div className="processing-content">
          <div className="loader">
            <div className="loader-inner">
              <span>AI</span>
            </div>
          </div>

          <h1>Analyzing your potential</h1>

          <p>
            We&apos;re studying your skills, experience and career direction.
          </p>

          <div className="analysis-steps">
            <div>
              <span className="step-dot active"></span>
              Reading your profile
            </div>
            <div>
              <span className="step-dot active"></span>
              Analyzing your resume
            </div>
            <div>
              <span className="step-dot"></span>
              Building your learning path
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (stage === "result") {
    return (
      <main className="result-page">
        <nav className="navbar">
          <div className="brand">
            bean<span>stack</span>
          </div>

          <button className="nav-button" onClick={reset}>
            Analyze another profile
          </button>
        </nav>

        <section className="result-container">
          <div className="result-header">
            <div className="success-icon">✓</div>

            <p className="eyebrow">YOUR PROFILE ANALYSIS IS READY</p>

            <h1>
              You&apos;re closer than you think,
              <br />
              <span>{name || "future builder"}.</span>
            </h1>

            <p className="result-subtitle">
              Here&apos;s what we discovered about your current profile.
            </p>
          </div>

          <div className="score-section">
            <div className="score-card">
              <p>CAREER READINESS</p>

              <div className="score">
                <span>78</span>
                <small>/100</small>
              </div>

              <div className="progress">
                <div className="progress-fill"></div>
              </div>

              <p className="score-description">
                You have a strong foundation. A few focused improvements could
                significantly increase your opportunities.
              </p>
            </div>

            <div className="summary-card">
              <p className="card-label">PROFILE SUMMARY</p>

              <h2>
                Strong potential with
                <span> room to specialize.</span>
              </h2>

              <p>
                Your current profile shows a solid foundation. Based on your
                skills and chosen career direction, we identified a few areas
                where focused learning could make the biggest difference.
              </p>
            </div>
          </div>

          <div className="insights-grid">
            <div className="insight-card strengths">
              <div className="card-icon">↗</div>

              <p className="card-label">YOUR STRENGTHS</p>

              <ul>
                <li>Strong foundational skills</li>
                <li>Clear career direction</li>
                <li>Good potential for growth</li>
              </ul>
            </div>

            <div className="insight-card gaps">
              <div className="card-icon">!</div>

              <p className="card-label">GROWTH OPPORTUNITIES</p>

              <ul>
                <li>Build more practical projects</li>
                <li>Develop industry-specific skills</li>
                <li>Strengthen your portfolio</li>
              </ul>
            </div>
          </div>

          <section className="next-step">
            <div>
              <p className="eyebrow">WHAT&apos;S NEXT?</p>

              <h2>Your personalized path starts here.</h2>

              <p>
                BeanStack can now help you build a learning journey based on
                where you are and where you want to go.
              </p>
            </div>

            <button>
              Build my learning path
              <span>→</span>
            </button>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="form-page">
      <nav className="navbar">
        <div className="brand">
          bean<span>stack</span>
        </div>

        <div className="nav-right">
          <span>AI-powered career growth</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">DISCOVER WHERE YOU STAND</p>

          <h1>
            Your next opportunity starts with understanding
            <span> yourself.</span>
          </h1>

          <p className="hero-description">
            Tell us about yourself, upload your resume, and let BeanStack
            analyze your current profile.
          </p>

          <div className="mini-points">
            <div>
              <span>01</span>
              Share your profile
            </div>
            <div>
              <span>02</span>
              Get AI insights
            </div>
            <div>
              <span>03</span>
              Find your path
            </div>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <p>STEP 01</p>
            <h2>Let&apos;s start with you.</h2>
          </div>

          <div className="input-group">
            <label>Your name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>What role are you aiming for?</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer, Data Analyst..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Your key skills</label>
            <input
              type="text"
              placeholder="e.g. JavaScript, Python, Design..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Upload your resume</label>

            <div
              className={`upload-box ${dragging ? "dragging" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFile(e.target.files?.[0])}
                hidden
              />

              {resumeName ? (
                <>
                  <div className="file-icon">✓</div>
                  <strong>{resumeName}</strong>
                  <span>Resume selected successfully</span>
                </>
              ) : (
                <>
                  <div className="upload-icon">↑</div>
                  <strong>Drop your resume here</strong>
                  <span>or click to browse · PDF, DOC or DOCX</span>
                </>
              )}
            </div>
          </div>

          <button type="submit" className="analyze-button">
            Analyze my profile
            <span>→</span>
          </button>

          <p className="privacy-note">
            Your information is used only to generate your profile analysis.
          </p>
        </form>
      </section>
    </main>
  );
}