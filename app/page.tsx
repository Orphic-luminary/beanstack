"use client";

import { useState } from "react";

const features = [
  {
    number: "01",
    title: "Personalized learning",
    description:
      "A learning path built around your current skills, goals, and the role you want to reach.",
  },
  {
    number: "02",
    title: "Build real proof",
    description:
      "Work through practical challenges and projects that turn learning into something you can actually show.",
  },
  {
    number: "03",
    title: "Get discovered",
    description:
      "Businesses can discover skilled learners based on what they can actually do — not just what's written on a resume.",
  },
];

const steps = [
  {
    step: "01",
    title: "Tell us your goal",
    text: "Choose what you want to learn or the kind of role you're aiming for.",
  },
  {
    step: "02",
    title: "Follow your path",
    text: "BeanStack builds a focused learning journey around your current level.",
  },
  {
    step: "03",
    title: "Prove your skills",
    text: "Complete challenges and projects that demonstrate practical ability.",
  },
  {
    step: "04",
    title: "Connect with businesses",
    text: "Get matched with businesses looking for people with your skills.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#10140f]">
      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-[#f7f8f4]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10140f] text-lg font-bold text-[#d7ff4f]">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">beanstack</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#how" className="transition hover:opacity-60">
              How it works
            </a>
            <a href="#features" className="transition hover:opacity-60">
              Why BeanStack
            </a>
            <a href="#business" className="transition hover:opacity-60">
              For businesses
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-black/5">
              Log in
            </button>
            <button className="rounded-full bg-[#10140f] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Get started
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 md:hidden"
          >
            <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/5 bg-[#f7f8f4] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-sm font-medium">
              <a href="#how" onClick={() => setMenuOpen(false)}>
                How it works
              </a>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Why BeanStack
              </a>
              <a href="#business" onClick={() => setMenuOpen(false)}>
                For businesses
              </a>
              <button className="rounded-full bg-[#10140f] px-5 py-3 text-white">
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-40 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="absolute left-1/2 top-20 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#d7ff4f]/30 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-[#9fca00]" />
              Learning meets opportunity
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[100px]">
              Don't just
              <br />
              <span className="text-[#607c00]">learn.</span>{" "}
              <span className="italic">become.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
              BeanStack connects personalized learning with real-world
              opportunities — helping you build skills, prove what you can do,
              and get discovered by businesses.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#10140f] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 sm:w-auto">
                Start your journey
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

              <button className="w-full rounded-full border border-black/10 bg-white/50 px-7 py-4 text-sm font-semibold transition hover:bg-white sm:w-auto">
                I'm a business
              </button>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="rounded-[32px] border border-black/10 bg-[#10140f] p-3 shadow-2xl shadow-black/10 sm:p-5">
              <div className="overflow-hidden rounded-[22px] bg-[#eef0e9]">
                {/* Dashboard top */}
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#10140f]" />
                    <span className="text-xs font-semibold">Your path</span>
                  </div>

                  <span className="rounded-full bg-[#d7ff4f] px-3 py-1 text-[10px] font-bold">
                    68% COMPLETE
                  </span>
                </div>

                <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-black/40">
                      Current goal
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                      Become a Full-Stack Developer
                    </h3>

                    <div className="mt-8 space-y-3">
                      {[
                        ["HTML & CSS", "Complete"],
                        ["JavaScript", "Complete"],
                        ["React", "In progress"],
                        ["Backend", "Upcoming"],
                      ].map(([name, status], i) => (
                        <div
                          key={name}
                          className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                i < 2
                                  ? "bg-[#d7ff4f]"
                                  : "bg-[#10140f] text-white"
                              }`}
                            >
                              {i < 2 ? "✓" : i + 1}
                            </div>
                            <span className="text-sm font-semibold">
                              {name}
                            </span>
                          </div>

                          <span className="text-xs text-black/40">
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-black/5 bg-white/60 p-6 lg:border-l lg:border-t-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-black/40">
                      Next challenge
                    </p>

                    <div className="mt-5 rounded-2xl bg-[#10140f] p-5 text-white">
                      <span className="text-xs text-[#d7ff4f]">
                        PRACTICAL TASK
                      </span>
                      <h4 className="mt-3 text-lg font-semibold">
                        Build a responsive landing page
                      </h4>

                      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[45%] rounded-full bg-[#d7ff4f]" />
                      </div>

                      <p className="mt-3 text-xs text-white/50">
                        Estimated time · 2 hours
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/5 p-4">
                      <p className="text-xs text-black/40">SKILL SCORE</p>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-semibold">84</span>
                        <span className="mb-1 text-xs text-black/40">
                          / 100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-7 -left-3 hidden rounded-2xl border border-black/10 bg-white p-4 shadow-xl sm:block lg:-left-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Businesses hiring
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "N", "S"].map((letter) => (
                    <div
                      key={letter}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#dfe4d8] text-xs font-bold"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold">+128 this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-[#10140f] px-6 py-24 text-white lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d7ff4f]">
            The problem
          </p>

          <h2 className="mt-7 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
            The internet gave everyone access to education.
            <br />
            <span className="text-white/35">
              It didn't give everyone a path to opportunity.
            </span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              ["Courses", "Everywhere."],
              ["Certificates", "Not enough."],
              ["Real opportunities", "Hard to find."],
            ].map(([top, bottom]) => (
              <div
                key={top}
                className="border-t border-white/15 pt-6"
              >
                <p className="text-sm text-white/40">{top}</p>
                <p className="mt-2 text-xl font-medium">{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#607c00]">
                One ecosystem
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Learning should lead somewhere.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-black/55">
                BeanStack closes the gap between learning a skill and having
                someone trust you with it.
              </p>
            </div>

            <div className="divide-y divide-black/10">
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="group grid gap-5 py-8 sm:grid-cols-[70px_1fr]"
                >
                  <span className="font-mono text-sm text-black/30">
                    {feature.number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight transition group-hover:text-[#607c00]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-black/55">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-[#e6eadf] px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#607c00]">
              How it works
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              From “I want to learn”
              <br />
              to “I can do this.”
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-[#f7f8f4] p-7 sm:p-8"
              >
                <span className="font-mono text-xs font-bold text-[#607c00]">
                  {item.step}
                </span>

                <h3 className="mt-16 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      <section id="business" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[36px] bg-[#d7ff4f]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
                  For businesses
                </p>

                <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Stop filtering resumes.
                  <br />
                  Find people who can actually do the work.
                </h2>

                <p className="mt-6 max-w-lg leading-7 text-black/60">
                  Discover candidates through skills, challenges, projects and
                  real evidence of what they can do.
                </p>

                <button className="mt-9 rounded-full bg-[#10140f] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  Hire through BeanStack →
                </button>
              </div>

              <div className="relative hidden min-h-[420px] overflow-hidden bg-[#bde32d] lg:block">
                <div className="absolute left-16 top-20 w-72 rotate-[-7deg] rounded-3xl bg-white p-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfe4d8] font-bold">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Aarav Sharma</p>
                      <p className="text-xs text-black/40">
                        Frontend Developer
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#eef0e9] px-3 py-1.5 text-[10px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xs text-black/40">
                      Skill match
                    </span>
                    <span className="text-sm font-bold">94%</span>
                  </div>
                </div>

                <div className="absolute bottom-16 right-10 w-60 rotate-[6deg] rounded-3xl bg-[#10140f] p-5 text-white shadow-2xl">
                  <p className="text-[10px] uppercase tracking-widest text-[#d7ff4f]">
                    Recommended
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    12 candidates match your role.
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    Based on verified skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl rounded-[36px] bg-[#10140f] px-6 py-20 text-center text-white sm:px-12 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d7ff4f]">
            Your next chapter
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Your skills are worth more than a certificate.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/50">
            Build something. Prove it. Put yourself where opportunity can find
            you.
          </p>

          <button className="mt-9 rounded-full bg-[#d7ff4f] px-7 py-4 text-sm font-bold text-[#10140f] transition hover:-translate-y-1">
            Join BeanStack →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10140f] text-sm font-bold text-[#d7ff4f]">
              B
            </div>
            <span className="font-bold">beanstack</span>
          </div>

          <p className="text-xs text-black/40">
            Learn. Build. Prove. Connect.
          </p>

          <p className="text-xs text-black/40">
            © {new Date().getFullYear()} BeanStack
          </p>
        </div>
      </footer>
    </main>
  );
}