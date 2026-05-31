"use client";

import { useState } from "react";
import { Check, MessageSquare, Table2, Trash2 } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const initialProviders = [
  { id: 1, name: "BaptistCare", status: "considering", notes: "Excellent dementia support. Need to confirm availability.", matchScore: 92, proximityScore: 88, careScore: 90, reviewScore: 85, budgetScore: 80, rating: 4.5, costRange: "$18,000–$28,000/yr", dementia: true, respite: true },
  { id: 2, name: "HammondCare", status: "visited", notes: "Great facility tour. Staff attentive. Waiting on cost breakdown.", matchScore: 85, proximityScore: 82, careScore: 88, reviewScore: 87, budgetScore: 75, rating: 4.3, costRange: "$20,000–$32,000/yr", dementia: false, respite: true },
  { id: 3, name: "Uniting Care", status: "contacted", notes: "Good budget fit and broad local coverage.", matchScore: 78, proximityScore: 75, careScore: 80, reviewScore: 82, budgetScore: 85, rating: 4.2, costRange: "$16,000–$24,000/yr", dementia: true, respite: false },
];

const statusOptions = ["considering", "contacted", "visited", "applied", "preferred", "not_suitable"];
const statusLabels: Record<string, string> = { considering: "Considering", contacted: "Contacted", visited: "Visited", applied: "Applied", preferred: "Preferred", not_suitable: "Not suitable" };

export default function ShortlistPage() {
  const [providers, setProviders] = useState(initialProviders);
  const [compareMode, setCompareMode] = useState(false);

  function updateStatus(id: number, status: string) {
    setProviders((current) => current.map((provider) => provider.id === id ? { ...provider, status } : provider));
  }

  function removeProvider(id: number) {
    setProviders((current) => current.filter((provider) => provider.id !== id));
  }

  return (
    <ProductShell
      eyebrow="Shortlist"
      title="Compare providers and track decision status."
      description="Turn provider research into a shared shortlist with status tracking, family notes, match scores and side-by-side comparison."
      actions={<button onClick={() => setCompareMode((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15"><Table2 className="h-4 w-4" /> {compareMode ? "Card view" : "Compare side-by-side"}</button>}
    >
      {!compareMode ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {providers.map((provider) => (
            <Panel key={provider.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">{provider.name}</h2>
                  <div className="mt-2 flex items-center gap-2"><Pill>{statusLabels[provider.status]}</Pill><span className="text-sm font-semibold text-[#bc7c51]">★ {provider.rating}</span></div>
                </div>
                <div className="text-right"><p className="text-4xl font-semibold text-[#173f35]">{provider.matchScore}%</p><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61736a]">Match</p></div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Proximity", provider.proximityScore],
                  ["Care fit", provider.careScore],
                  ["Reviews", provider.reviewScore],
                  ["Budget", provider.budgetScore],
                ].map(([label, score]) => (
                  <div key={label} className="rounded-2xl bg-[#f7f1e8] p-4"><p className="text-sm text-[#61736a]">{label}</p><p className="mt-1 text-2xl font-semibold">{score}%</p></div>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-[#61736a]">Status</span>
                <select value={provider.status} onChange={(event) => updateStatus(provider.id, event.target.value)} className="mt-2 w-full rounded-2xl border border-[#dfd3c1] bg-white px-4 py-3 outline-none">
                  {statusOptions.map((option) => <option key={option} value={option}>{statusLabels[option]}</option>)}
                </select>
              </label>

              <div className="mt-5 rounded-2xl bg-[#f7f1e8] p-4"><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#61736a]"><MessageSquare className="h-4 w-4" /> Family notes</p><p className="leading-7 text-[#43544c]">{provider.notes}</p></div>
              <div className="mt-5 flex flex-wrap gap-2">{provider.dementia && <Pill>Dementia</Pill>}{provider.respite && <Pill>Respite</Pill>}<Pill>{provider.costRange}</Pill></div>
              <button onClick={() => removeProvider(provider.id)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"><Trash2 className="h-4 w-4" /> Remove</button>
            </Panel>
          ))}
        </div>
      ) : (
        <Panel>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
              <thead><tr className="text-sm text-[#61736a]"><th className="px-4">Provider</th><th>Match</th><th>Care</th><th>Budget</th><th>Status</th><th>Features</th></tr></thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id} className="rounded-2xl bg-[#f7f1e8]">
                    <td className="rounded-l-2xl px-4 py-4 font-semibold">{provider.name}</td>
                    <td className="font-semibold text-[#173f35]">{provider.matchScore}%</td>
                    <td>{provider.careScore}%</td>
                    <td>{provider.budgetScore}%</td>
                    <td>{statusLabels[provider.status]}</td>
                    <td className="rounded-r-2xl py-4">{provider.dementia && <Check className="mr-2 inline h-4 w-4 text-[#173f35]" />} Dementia {provider.respite && "· Respite"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </ProductShell>
  );
}
