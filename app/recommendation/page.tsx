"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Heart, Save, Users, Zap } from "lucide-react";
import { CareScoreDonut, ProviderMatchChart, SupportRadar } from "../../components/result-charts";
import { Panel, Pill, ProductShell } from "../../components/product-shell";
import { AssessmentAnswers, demoAnswers, getCarePath } from "../../lib/care-path";

const providerMatches = [
  { name: "BaptistCare", score: "92%", costRange: "$18,000–$28,000/yr", features: ["Dementia", "Respite", "Home care"] },
  { name: "HammondCare", score: "85%", costRange: "$20,000–$32,000/yr", features: ["Memory care", "Respite", "Nursing"] },
  { name: "Uniting Care", score: "78%", costRange: "$16,000–$24,000/yr", features: ["Budget fit", "Home support", "Transport"] },
];

const journey = [
  { stage: "Learn", label: "Understanding options" },
  { stage: "Assess", label: "Your situation" },
  { stage: "Approved", label: "Funding approved" },
  { stage: "Compare", label: "Provider selection" },
  { stage: "Contact", label: "Reach out" },
  { stage: "Decide", label: "Make decision" },
];

export default function RecommendationPage() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(demoAnswers);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("kinharbour-assessment");
    if (!stored) return;
    try {
      setAnswers(JSON.parse(stored));
    } catch {
      setAnswers(demoAnswers);
    }
  }, []);

  const result = useMemo(() => getCarePath(answers), [answers]);
  const confidence = Math.min(96, Math.max(72, 72 + result.score));

  return (
    <ProductShell
      eyebrow="Recommendation"
      title="Your personalised care recommendation."
      description="A clear pathway recommendation, confidence signal, reasoning, provider matches and next steps based on the assessment profile."
      actions={
        <button onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15">
          <Save className="h-4 w-4" />
          {saved ? "Saved" : "Save to dashboard"}
        </button>
      }
    >
      <Panel>
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap gap-2"><Pill>{result.urgencyLabel}</Pill><Pill>{answers.location}</Pill></div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#17231f]">{result.pathway}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5d6d65]">{result.summary}</p>
          </div>
          <div className="rounded-full bg-[#dfe9df] p-8 text-center shadow-inner">
            <p className="text-5xl font-semibold text-[#173f35]">{confidence}%</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#61736a]">Confidence</p>
          </div>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <CareScoreDonut score={result.score} />
        <SupportRadar answers={answers} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel>
          <div className="flex items-center gap-3"><Zap className="h-5 w-5 text-[#bc7c51]" /><h2 className="text-2xl font-semibold tracking-tight">Why this pathway</h2></div>
          <ul className="mt-6 grid gap-3">
            {result.riskFlags.map((reason) => (
              <li key={reason} className="flex gap-3 rounded-2xl bg-[#f7f1e8] p-4 leading-7 text-[#43544c]"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#173f35]" />{reason}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3"><AlertCircle className="h-5 w-5 text-[#bc7c51]" /><h2 className="text-2xl font-semibold tracking-tight">Next steps</h2></div>
          <ol className="mt-6 grid gap-3">
            {result.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-2xl bg-[#f7f1e8] p-4 leading-7 text-[#43544c]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#173f35] text-sm font-bold text-white">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </Panel>
      </div>

      <Panel className="mt-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><div className="flex items-center gap-3"><Heart className="h-5 w-5 text-[#173f35]" /><h2 className="text-3xl font-semibold tracking-tight">Provider matches</h2></div><p className="mt-4 leading-7 text-[#5d6d65]">Use these provider matches as a starting shortlist, then compare availability, fees and family preferences.</p></div>
          <ProviderMatchChart providers={providerMatches} />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {providerMatches.map((provider) => (
            <div key={provider.name} className="rounded-3xl border border-[#eadfce] bg-[#f7f1e8] p-5">
              <div className="flex items-start justify-between gap-4"><h3 className="text-xl font-semibold">{provider.name}</h3><span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#173f35]">{provider.score}</span></div>
              <p className="mt-3 font-semibold text-[#bc7c51]">{provider.costRange}</p>
              <div className="mt-4 flex flex-wrap gap-2">{provider.features.map((feature) => <Pill key={feature}>{feature}</Pill>)}</div>
            </div>
          ))}
        </div>
        <a href="/shortlist" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#173f35] px-6 py-4 font-semibold text-white shadow-xl shadow-emerald-950/15">Open shortlist <ArrowRight className="h-4 w-4" /></a>
      </Panel>

      <Panel className="mt-6">
        <div className="flex items-center gap-3"><Users className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Care journey</h2></div>
        <div className="mt-6 grid gap-3 md:grid-cols-6">
          {journey.map((item, index) => (
            <div key={item.stage} className={`rounded-2xl p-4 text-center ${index === 1 ? "bg-[#173f35] text-white" : "bg-[#f7f1e8] text-[#43544c]"}`}>
              <p className="font-semibold">{item.stage}</p><p className={`mt-2 text-xs leading-5 ${index === 1 ? "text-[#dbe8e3]" : "text-[#61736a]"}`}>{item.label}</p>
            </div>
          ))}
        </div>
      </Panel>
    </ProductShell>
  );
}
