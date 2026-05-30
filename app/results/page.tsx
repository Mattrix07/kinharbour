"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  HeartHandshake,
  Home,
  MapPin,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AnimatedSection } from "../../components/animated-section";
import { CareScoreDonut, ProviderMatchChart, SupportRadar } from "../../components/result-charts";
import { AssessmentAnswers, demoAnswers, getCarePath } from "../../lib/care-path";

const providers = [
  {
    name: "Harbourview Care Residence",
    location: "Lower North Shore",
    fit: "Strong fit for family access and higher support needs",
    score: "92%",
    features: ["24/7 nursing", "Respite", "Memory support"],
    note: "Prioritise if hospital transition or supervision concerns are material.",
    icon: Building2,
  },
  {
    name: "Eucalyptus Home Support",
    location: "Inner Sydney",
    fit: "Good bridge option for home care while comparing residential pathways",
    score: "84%",
    features: ["Personal care", "Meal support", "Medication prompts"],
    note: "Useful if the family wants to test whether home care remains sustainable.",
    icon: Home,
  },
  {
    name: "Banksia Respite & Care",
    location: "Eastern Suburbs",
    fit: "Suitable for short-term respite and decision breathing room",
    score: "79%",
    features: ["Short stay", "Carer relief", "Assessment support"],
    note: "Consider if the family is not ready for permanent placement.",
    icon: HeartHandshake,
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
    <main className="luxury-shell min-h-screen text-[#17231f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 print:hidden">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173f35] text-lg font-semibold text-white shadow-lg shadow-emerald-950/15">
            K
          </span>
          <div>
            <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7a8b82]">CarePath report</p>
          </div>
        </a>
        <div className="flex gap-3">
          <a href="/assessment" className="inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm backdrop-blur">
            <RotateCcw className="h-4 w-4" />
            Retake
          </a>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15">
            <Printer className="h-4 w-4" />
            Print report
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6">
        <AnimatedSection className="glass-panel overflow-hidden rounded-[2.5rem]">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.38fr]">
            <article className="p-8 md:p-12">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d8c9b7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#31594d] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#bc7c51]" />
                Family-ready decision report
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Recommended pathway</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-7xl">
                {result.pathway}
              </h1>
              <p className="mt-7 max-w-4xl text-lg leading-8 text-[#5d6d65] md:text-xl">{result.summary}</p>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <Metric icon={ShieldCheck} label="Care complexity" value={`${result.score}/20+`} helper="Relative support signal" />
                <Metric icon={MapPin} label="Location" value={answers.location || "Not provided"} helper="Preferred search area" />
                <Metric icon={HeartHandshake} label="Decision for" value={answers.relationship || "Family member"} helper="Family context" />
              </div>
            </article>

            <aside className="depth-card m-4 rounded-[2rem] p-8 text-white lg:m-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Priority</p>
              <h2 className="mt-4 text-5xl font-semibold tracking-tight">{result.urgencyLabel}</h2>
              <p className="mt-5 leading-7 text-[#dbe8e3]">
                Use this output to align the family, prepare documents and compare providers. Confirm eligibility, funding and clinical decisions with qualified sources.
              </p>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-[#c9ded7]">Suggested next focus</p>
                <p className="mt-2 text-lg font-semibold">{result.nextSteps[0]}</p>
              </div>
            </aside>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" delay={0.05}>
          <CareScoreDonut score={result.score} />
          <SupportRadar answers={answers} />
        </AnimatedSection>

        <AnimatedSection className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" delay={0.1}>
          <Panel icon={AlertTriangle} eyebrow="Risk view" title="What needs attention">
            <Checklist items={result.riskFlags} variant="risk" />
          </Panel>
          <Panel icon={ArrowRight} eyebrow="Action plan" title="Recommended next steps">
            <Timeline items={result.nextSteps} />
          </Panel>
        </AnimatedSection>

        <AnimatedSection className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]" delay={0.15}>
          <Panel icon={FileText} eyebrow="Preparation" title="Documents to gather">
            <Checklist items={result.documents} />
          </Panel>
          <Panel icon={ShieldCheck} eyebrow="Provider search" title="Filters to apply">
            <div className="flex flex-wrap gap-3">
              {result.providerFilters.map((filter) => (
                <span key={filter} className="rounded-full border border-[#d8c9b7] bg-[#f7f1e8] px-4 py-2 text-sm font-semibold text-[#173f35] shadow-sm">
                  {filter}
                </span>
              ))}
            </div>
          </Panel>
        </AnimatedSection>

        <AnimatedSection className="premium-card mt-6 rounded-[2.4rem] p-8 md:p-10" delay={0.2}>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Shortlist</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Provider shortlist</h2>
            </div>
            <p className="text-lg leading-8 text-[#5d6d65]">
              Placeholder provider data is shown as a realistic operating model. Replace this with Supabase-backed provider records when ready.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <ProviderMatchChart providers={providers} />
            <div className="grid gap-5">
              {providers.map((provider) => {
                const Icon = provider.icon;
                return (
                  <article key={provider.name} className="group overflow-hidden rounded-[2rem] border border-[#eadfce] bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/10">
                    <div className="soft-highlight flex items-center justify-between gap-4 border-b border-[#eadfce] p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#173f35] shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <p className="text-sm font-semibold text-[#bc7c51]">{provider.location}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#173f35] shadow-sm">{provider.score}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold tracking-tight">{provider.name}</h3>
                      <p className="mt-3 leading-7 text-[#5d6d65]">{provider.fit}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {provider.features.map((feature) => (
                          <span key={feature} className="rounded-full bg-[#f7f1e8] px-3 py-2 text-xs font-semibold text-[#173f35]">{feature}</span>
                        ))}
                      </div>
                      <p className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fffaf2] p-4 text-sm leading-6 text-[#5d6d65]">{provider.note}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" delay={0.25}>
          <Panel icon={HeartHandshake} eyebrow="Family discussion" title="Questions to align everyone">
            <div className="grid gap-4 md:grid-cols-3">
              {result.conversationPrompts.map((prompt) => (
                <div key={prompt} className="rounded-3xl bg-[#f7f1e8] p-6 text-lg font-semibold leading-8 text-[#24342e] shadow-inner">
                  “{prompt}”
                </div>
              ))}
            </div>
          </Panel>
          <aside className="depth-card rounded-[2.2rem] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Next product layer</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Ready for Supabase and AI report generation.</h2>
            <p className="mt-5 leading-7 text-[#dbe8e3]">
              This page is structured so the result can be saved to a user account, enriched with provider data and exported as a premium PDF report.
            </p>
          </aside>
        </AnimatedSection>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value, helper }: { icon: React.ElementType; label: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl border border-[#eadfce] bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#5d6d65]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#17231f]">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#dfe9df] text-[#173f35]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9b8b7a]">{helper}</p>
    </div>
  );
}

function Panel({ icon: Icon, eyebrow, title, children }: { icon: React.ElementType; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="premium-card rounded-[2.2rem] p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dfe9df] text-[#173f35]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{title}</h2>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Checklist({ items, variant = "default" }: { items: string[]; variant?: "default" | "risk" }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl bg-[#f7f1e8] p-4 leading-7 text-[#43544c] shadow-inner">
          <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${variant === "risk" ? "bg-[#faeadb] text-[#9c542a]" : "bg-[#dfe9df] text-[#173f35]"}`}>
            {variant === "risk" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ items }: { items: string[] }) {
  return (
    <ol className="relative grid gap-4 before:absolute before:left-4 before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-[#d8c9b7]">
      {items.map((item, index) => (
        <li key={item} className="relative flex gap-4 rounded-2xl bg-[#f7f1e8] p-4 leading-7 text-[#43544c] shadow-inner transition hover:-translate-y-0.5 hover:bg-[#fffaf2]">
          <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173f35] text-sm font-bold text-white shadow-lg shadow-emerald-950/10">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
