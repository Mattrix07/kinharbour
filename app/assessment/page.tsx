"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentAnswers } from "../../lib/care-path";

const fieldClass =
  "w-full rounded-2xl border border-[#dfd3c1] bg-white px-4 py-3 text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-4 focus:ring-[#173f35]/10";

const labelClass = "text-sm font-semibold text-[#24342e]";

const initialAnswers: AssessmentAnswers = {
  relationship: "Parent",
  location: "Sydney NSW",
  urgency: "medium",
  livingSituation: "alone",
  mobility: "medium",
  cognition: "medium",
  medicalComplexity: "medium",
  familyCapacity: "medium",
  homeCarePreference: "unsure",
  budgetSensitivity: "medium",
};

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers);

  const completion = useMemo(() => {
    const values = Object.values(answers);
    return Math.round((values.filter(Boolean).length / values.length) * 100);
  }, [answers]);

  function update<K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kinharbour-assessment", JSON.stringify(answers));
    }
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#17231f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-xl font-semibold tracking-tight">KinHarbour</a>
        <a href="/" className="rounded-full border border-[#d8c9b7] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm">Back home</a>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-[2rem] border border-[#dfd3c1] bg-white p-8 shadow-sm lg:sticky lg:top-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Assessment</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Build a care pathway in under 5 minutes.</h1>
          <p className="mt-5 leading-8 text-[#5d6d65]">
            This is not a medical diagnosis. It is a structured decision guide to help families understand likely aged care pathways and next steps.
          </p>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#52645c]">
              <span>Profile completeness</span>
              <span>{completion}%</span>
            </div>
            <div className="h-3 rounded-full bg-[#eadfce]">
              <div className="h-3 rounded-full bg-[#173f35]" style={{ width: `${completion}%` }} />
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-[#f7f1e8] p-5 text-sm leading-6 text-[#5d6d65]">
            Tip: answer based on the person’s current situation, not what the family hopes will happen.
          </div>
        </aside>

        <form onSubmit={submitAssessment} className="rounded-[2rem] border border-[#dfd3c1] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>Who are you searching for?</span>
              <input className={fieldClass} value={answers.relationship} onChange={(e) => update("relationship", e.target.value)} placeholder="Parent, partner, relative" />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>Preferred location</span>
              <input className={fieldClass} value={answers.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Sydney NSW" />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>How urgent is the decision?</span>
              <select className={fieldClass} value={answers.urgency} onChange={(e) => update("urgency", e.target.value as AssessmentAnswers["urgency"])}>
                <option value="low">Low — planning ahead</option>
                <option value="medium">Medium — support needs are increasing</option>
                <option value="high">High — urgent or unsafe situation</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>Current living situation</span>
              <select className={fieldClass} value={answers.livingSituation} onChange={(e) => update("livingSituation", e.target.value as AssessmentAnswers["livingSituation"])}>
                <option value="alone">Living alone</option>
                <option value="with_partner">Living with partner</option>
                <option value="with_family">Living with family</option>
                <option value="hospital">In hospital / discharge planning</option>
                <option value="other">Other</option>
              </select>
            </label>

            <RadioGroup
              title="Mobility support needed"
              value={answers.mobility}
              onChange={(value) => update("mobility", value)}
            />
            <RadioGroup
              title="Memory or cognition concerns"
              value={answers.cognition}
              onChange={(value) => update("cognition", value)}
            />
            <RadioGroup
              title="Medical or nursing complexity"
              value={answers.medicalComplexity}
              onChange={(value) => update("medicalComplexity", value)}
            />
            <RadioGroup
              title="Family capacity to support"
              value={answers.familyCapacity}
              onChange={(value) => update("familyCapacity", value)}
              labels={{ low: "Limited", medium: "Some", high: "Strong" }}
            />

            <label className="grid gap-2 md:col-span-1">
              <span className={labelClass}>Preference today</span>
              <select className={fieldClass} value={answers.homeCarePreference} onChange={(e) => update("homeCarePreference", e.target.value as AssessmentAnswers["homeCarePreference"])}>
                <option value="home_first">Try to stay at home first</option>
                <option value="residential_open">Open to residential aged care</option>
                <option value="unsure">Unsure / comparing options</option>
              </select>
            </label>

            <RadioGroup
              title="Budget sensitivity"
              value={answers.budgetSensitivity}
              onChange={(value) => update("budgetSensitivity", value)}
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-[#f7f1e8] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[#17231f]">Ready to generate the pathway?</p>
              <p className="mt-1 text-sm text-[#5d6d65]">Your answers are saved locally in your browser for this first version.</p>
            </div>
            <button type="submit" className="rounded-full bg-[#173f35] px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-[#0f2f27]">
              Generate result
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function RadioGroup({
  title,
  value,
  onChange,
  labels = { low: "Low", medium: "Medium", high: "High" },
}: {
  title: string;
  value: "low" | "medium" | "high";
  onChange: (value: "low" | "medium" | "high") => void;
  labels?: Record<"low" | "medium" | "high", string>;
}) {
  return (
    <fieldset className="grid gap-3 rounded-3xl border border-[#eadfce] bg-[#fbf8f2] p-5">
      <legend className="mb-1 text-sm font-semibold text-[#24342e]">{title}</legend>
      <div className="grid grid-cols-3 gap-2">
        {(["low", "medium", "high"] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
              value === level
                ? "bg-[#173f35] text-white shadow-sm"
                : "bg-white text-[#52645c] hover:bg-[#f0e8dc]"
            }`}
          >
            {labels[level]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
