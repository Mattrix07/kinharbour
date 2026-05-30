"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AssessmentAnswers } from "../lib/care-path";

const levelScore = {
  low: 34,
  medium: 66,
  high: 92,
};

const mutedLevelScore = {
  low: 92,
  medium: 62,
  high: 34,
};

const COLORS = ["#173f35", "#dfe9df"];

export function CareScoreDonut({ score }: { score: number }) {
  const normalisedScore = Math.min(100, Math.max(8, Math.round((score / 18) * 100)));
  const data = [
    { name: "Care complexity", value: normalisedScore },
    { name: "Remaining", value: 100 - normalisedScore },
  ];

  return (
    <div className="h-[260px] rounded-[2rem] border border-[#eadfce] bg-white/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bc7c51]">Score</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Care complexity</h3>
        </div>
        <p className="rounded-full bg-[#173f35] px-3 py-1 text-sm font-bold text-white">{normalisedScore}%</p>
      </div>
      <div className="relative mt-2 h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={58}
              outerRadius={78}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-semibold text-[#173f35]">{normalisedScore}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a8b82]">Index</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SupportRadar({ answers }: { answers: AssessmentAnswers }) {
  const data = [
    { subject: "Mobility", value: levelScore[answers.mobility] },
    { subject: "Cognition", value: levelScore[answers.cognition] },
    { subject: "Medical", value: levelScore[answers.medicalComplexity] },
    { subject: "Family", value: mutedLevelScore[answers.familyCapacity] },
    { subject: "Budget", value: levelScore[answers.budgetSensitivity] },
  ];

  return (
    <div className="h-[320px] rounded-[2rem] border border-[#eadfce] bg-white/70 p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bc7c51]">Profile</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">Support needs map</h3>
      <div className="mt-2 h-[235px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="#dfd3c1" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#61736a", fontSize: 12 }} />
            <Radar dataKey="value" stroke="#173f35" fill="#173f35" fillOpacity={0.22} strokeWidth={2} />
            <Tooltip formatter={(value) => `${value}/100`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProviderMatchChart({ providers }: { providers: { name: string; score: string }[] }) {
  const data = providers.map((provider) => ({
    name: provider.name.replace(" Care", "").replace(" Residence", ""),
    match: Number(provider.score.replace("%", "")),
  }));

  return (
    <div className="rounded-[2rem] border border-[#eadfce] bg-white/70 p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bc7c51]">Shortlist</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Provider match</h3>
        </div>
        <p className="text-sm font-medium text-[#61736a]">Illustrative match scoring</p>
      </div>
      <div className="mt-5 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -26, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: "#61736a", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#61736a", fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="match" radius={[12, 12, 0, 0]} fill="#173f35" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
