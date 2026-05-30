"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentAnswers } from "../../lib/care-path";

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

const steps = [
  "Family context",
  "Current situation",
  "Support needs",
  "Preferences",
];

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers);
  const [step, setStep] = useState(0);

  const completion = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function update<K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kinharbour-assessment", JSON.stringify(answers));
    }
    router.push("/results");
  }

  return (
    <main className="luxury-shell min-h-screen text-[#17231f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173f35] text-lg font-semibold text-white shadow-lg shadow-emerald-950/15">K</span>
          <div>
            <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7a8b82]">Assessment</p>
          </div>
        </a>
        <a href="/" className="rounded-full border border-[#d8c9b7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm backdrop-blur">Back home</a>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="glass-panel h-fit rounded-[2.2rem] p-8 lg:sticky lg:top-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Guided assessment</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">A calmer way to capture what’s changing.</h1>
          <p className="mt-5 leading-8 text-[#5d6d65]">
            Work through the decision in stages. The result turns this profile into a pathway, risk view and family-ready report.
          </p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#52645c]">
              <span>Step {step + 1} of {steps.length}</span>
              <span>{completion}%</span>
            </div>
            <div className="h-3 rounded-full bg-[#eadfce] shadow-inner">
              <div className="h-3 rounded-full bg-[#173f35] transition-all duration-500" style={{ width: `${completion}%` }} />
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {steps.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setStep(index)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  step === index
                    ? "bg-[#173f35] text-white shadow-lg shadow-emerald-950/10"
                    : "bg-white/65 text-[#607269] hover:bg-white"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${step === index ? "bg-white/15" : "bg-[#f0e8dc]"}`}>
                  {index + 1}
                </span>
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-[#dfd3c1]/70 bg-white/55 p-5 text-sm leading-6 text-[#5d6d65] backdrop-blur">
            This is decision support, not a medical diagnosis. The aim is to help the family know what to prepare and compare next.
          </div>
        </aside>

        <form onSubmit={submitAssessment} className="premium-card overflow-hidden rounded-[2.2rem]">
          <div className="border-b border-[#eadfce] bg-white/50 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">{steps[step]}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{getStepTitle(step)}</h2>
          </div>

          <div className="p-6 md:p-8">
            {step === 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                <TextField label="Who are you searching for?" value={answers.relationship} onChange={(value) => update("relationship", value)} placeholder="Parent, partner, relative" />
                <TextField label="Preferred location" value={answers.location} onChange={(value) => update("location", value)} placeholder="e.g. Sydney NSW" />
                <ChoiceCard
                  className="md:col-span-2"
                  title="Preference today"
                  value={answers.homeCarePreference}
                  onChange={(value) => update("homeCarePreference", value as AssessmentAnswers["homeCarePreference"])}
                  options={[
                    ["home_first", "Try home first", "The family wants to preserve independence at home if safe."],
                    ["residential_open", "Open to residential", "The family is ready to compare residential aged care."],
                    ["unsure", "Unsure", "The family needs structured guidance before deciding."],
                  ]}
                />
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6">
                <ChoiceCard
                  title="How urgent is the decision?"
                  value={answers.urgency}
                  onChange={(value) => update("urgency", value as AssessmentAnswers["urgency"])}
                  options={[
                    ["low", "Planning ahead", "There is time to compare options calmly."],
                    ["medium", "Needs increasing", "Support needs are becoming more noticeable."],
                    ["high", "Urgent or unsafe", "There may be immediate safety or discharge pressure."],
                  ]}
                />
                <ChoiceCard
                  title="Current living situation"
                  value={answers.livingSituation}
                  onChange={(value) => update("livingSituation", value as AssessmentAnswers["livingSituation"])}
                  options={[
                    ["alone", "Living alone", "More monitoring or safety planning may be needed."],
                    ["with_partner", "With partner", "Support may depend on partner capacity."],
                    ["with_family", "With family", "Family care capacity is part of the pathway."],
                    ["hospital", "Hospital/discharge", "Transition planning may be time sensitive."],
                    ["other", "Other", "The situation needs a flexible review."],
                  ]}
                />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6 md:grid-cols-2">
                <ScaleCard title="Mobility support" value={answers.mobility} onChange={(value) => update("mobility", value)} />
                <ScaleCard title="Memory or cognition" value={answers.cognition} onChange={(value) => update("cognition", value)} />
                <ScaleCard title="Medical complexity" value={answers.medicalComplexity} onChange={(value) => update("medicalComplexity", value)} />
                <ScaleCard title="Family capacity" value={answers.familyCapacity} onChange={(value) => update("familyCapacity", value)} labels={{ low: "Limited", medium: "Some", high: "Strong" }} />
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-6">
                <ScaleCard title="Budget sensitivity" value={answers.budgetSensitivity} onChange={(value) => update("budgetSensitivity", value)} />
                <div className="rounded-[2rem] border border-[#dfd3c1]/80 bg-[#173f35] p-6 text-white shadow-2xl shadow-emerald-950/15">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Ready</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">Generate the family pathway report.</h3>
                  <p className="mt-4 max-w-2xl leading-7 text-[#dbe8e3]">
                    Your current answers will be stored locally in the browser and used to produce the care-path result page.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 border-t border-[#eadfce] bg-[#fffaf2]/70 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
              className="rounded-full border border-[#d8c9b7] bg-white px-7 py-4 font-semibold text-[#173f35] shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button type="submit" className="rounded-full bg-[#173f35] px-8 py-4 font-semibold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#0f2f27]">
              {step === steps.length - 1 ? "Generate result" : "Continue"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function getStepTitle(step: number) {
  return [
    "Who is this decision for?",
    "What is happening right now?",
    "How much support is needed?",
    "Confirm the final details.",
  ][step];
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="grid gap-3">
      <span className="text-sm font-semibold text-[#24342e]">{label}</span>
      <input
        className="w-full rounded-2xl border border-[#dfd3c1] bg-white/90 px-4 py-4 text-[#17231f] outline-none transition focus:border-[#173f35] focus:ring-4 focus:ring-[#173f35]/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function ChoiceCard({
  title,
  value,
  onChange,
  options,
  className = "",
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string, string][];
  className?: string;
}) {
  return (
    <section className={`grid gap-4 ${className}`}>
      <h3 className="text-sm font-semibold text-[#24342e]">{title}</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {options.map(([optionValue, label, helper]) => (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 ${
              value === optionValue
                ? "border-[#173f35] bg-[#173f35] text-white shadow-2xl shadow-emerald-950/15"
                : "border-[#eadfce] bg-white/80 text-[#17231f] shadow-sm hover:bg-white"
            }`}
          >
            <p className="text-lg font-semibold">{label}</p>
            <p className={`mt-3 text-sm leading-6 ${value === optionValue ? "text-[#dbe8e3]" : "text-[#5d6d65]"}`}>{helper}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function ScaleCard({
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
    <fieldset className="rounded-[2rem] border border-[#eadfce] bg-white/70 p-5 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-[#24342e]">{title}</legend>
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#f7f1e8] p-2">
        {(["low", "medium", "high"] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
              value === level
                ? "bg-[#173f35] text-white shadow-lg shadow-emerald-950/10"
                : "text-[#52645c] hover:bg-white"
            }`}
          >
            {labels[level]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
