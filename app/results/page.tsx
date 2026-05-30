"use client";

import { useEffect, useMemo, useState } from "react";
import { AssessmentAnswers, demoAnswers, getCarePath } from "../../lib/care-path";

const providers = [
  {
    name: "Harbourview Care Residence",
    location: "Lower North Shore",
    fit: "Strong fit for family access and higher support needs",
    features: ["24/7 nursing", "Respite", "Memory support"],
    note: "Prioritise if hospital transition or supervision concerns are material.",
  },
  {
    name: "Eucalyptus Home Support",
    location: "Inner Sydney",
    fit: "Good bridge option for home care while comparing residential pathways",
    features: ["Personal care", "Meal support", "Medication prompts"],
    note: "Useful if the family wants to test whether home care remains sustainable.",
  },
  {
    name: "Banksia Respite & Care",
    location: "Eastern Suburbs",
    fit: "Suitable for short-term respite and decision breathing room",
    features: ["Short stay", "Carer relief", "Assessment support"],
    note: "Consider if the family is not ready for permanent placement.",
  },
];

export default function ResultsPage() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(demoAnswers);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") return;
    const stored = window.localStorage.getItem("kinharbour-assessment");
    if (stored) {
      try {
        setAnswers(JSON.parse(stored));
      } catch {
        setAnswers(demoAnswers);
      }
    }
  }, []);

  const result = useMemo(() => getCarePath(answers), [answers]);

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#17231f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 print:hidden">
        <a href="/" className="text-xl font-semibold tracking-tight">KinHarbour</a>
        <div className="flex gap-3">
          <a href="/assessment" className="rounded-full border border-[#d8c9b7] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm">Retake assessment</a>
          <button onClick={() => window.print()} className="rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-sm">Print report</button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <article className="rounded-[2rem] border border-[#dfd3c1] bg-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">CarePath result</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{result.pathway}</h1>
              </div>
              <div className="rounded-3xl bg-[#173f35] px-5 py-4 text-white">
                <p className="text-sm text-[#c9ded7]">Priority</p>
                <p className="mt-1 text-xl font-semibold">{result.urgencyLabel}</p>
              </div>
            </div>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-[#5d6d65]">{result.summary}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Metric label="Care complexity score" value={`${result.score}/20+`} />
              <Metric label="Preferred location" value={answers.location || "Not provided"} />
              <Metric label="Decision context" value={answers.relationship || "Family member"} />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-[#dfd3c1] bg-[#173f35] p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Important</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">This is decision support, not clinical advice.</h2>
            <p className="mt-5 leading-7 text-[#dbe8e3]">
              Use this output to structure family conversations and provider research. For eligibility, funding and clinical decisions, confirm with My Aged Care, clinicians and qualified advisers.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Risk flags identified">
            <Checklist items={result.riskFlags} />
          </Panel>
          <Panel title="Recommended next steps">
            <Checklist items={result.nextSteps} />
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Panel title="Documents to prepare">
            <Checklist items={result.documents} />
          </Panel>
          <Panel title="Provider filters to use">
            <div className="flex flex-wrap gap-3">
              {result.providerFilters.map((filter) => (
                <span key={filter} className="rounded-full bg-[#f7f1e8] px-4 py-2 text-sm font-semibold text-[#173f35]">
                  {filter}
                </span>
              ))}
            </div>
          </Panel>
        </div>

        <section className="mt-6 rounded-[2rem] border border-[#dfd3c1] bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Shortlist</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Example provider shortlist</h2>
            </div>
            <p className="max-w-xl leading-7 text-[#5d6d65]">
              These are placeholder providers to show the operating model. Replace them with a live provider database or curated research table when ready.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {providers.map((provider) => (
              <article key={provider.name} className="rounded-3xl border border-[#eadfce] bg-[#fbf8f2] p-6">
                <p className="text-sm font-semibold text-[#bc7c51]">{provider.location}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{provider.name}</h3>
                <p className="mt-3 leading-7 text-[#5d6d65]">{provider.fit}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {provider.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#173f35] shadow-sm">{feature}</span>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-[#5d6d65]">{provider.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#dfd3c1] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Family discussion guide</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Questions to align the family</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {result.conversationPrompts.map((prompt) => (
              <div key={prompt} className="rounded-3xl bg-[#f7f1e8] p-6 text-lg font-medium leading-8 text-[#24342e]">
                “{prompt}”
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[#f7f1e8] p-5">
      <p className="text-sm font-medium text-[#5d6d65]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#17231f]">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-[#dfd3c1] bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl bg-[#f7f1e8] p-4 leading-7 text-[#43544c]">
          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#dfe9df] text-xs font-bold text-[#173f35]">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
