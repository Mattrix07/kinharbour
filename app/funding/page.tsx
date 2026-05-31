"use client";

import { useMemo, useState } from "react";
import { Calculator, Check, FileText, HelpCircle, WalletCards } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const fundingOptions = [
  {
    id: "hcp",
    name: "Home Care Package",
    description: "Government-subsidised support for home-based care.",
    levels: [
      { level: "Level 1", cost: "$8,000–$15,000/yr", support: "Basic support" },
      { level: "Level 2", cost: "$15,000–$32,000/yr", support: "Moderate support" },
      { level: "Level 3", cost: "$32,000–$60,000/yr", support: "High support" },
      { level: "Level 4", cost: "$60,000–$90,000/yr", support: "Intensive support" },
    ],
    eligibility: ["ACAT assessment required", "Older Australian or eligible younger person", "Care needs assessed by My Aged Care"],
    pros: ["Government subsidised", "Flexible provider choice", "Can stay at home"],
    cons: ["Waitlists can apply", "Means testing may apply", "Provider fees vary"],
  },
  {
    id: "residential",
    name: "Residential Aged Care",
    description: "24-hour care in an aged care home.",
    levels: [
      { level: "Standard", cost: "$45,000–$70,000/yr", support: "Daily living and care" },
      { level: "High", cost: "$70,000–$120,000/yr", support: "Complex and nursing support" },
    ],
    eligibility: ["ACAT approval for residential care", "Accommodation and means assessment", "Provider vacancy required"],
    pros: ["24-hour support", "Meals, activities and care on-site", "Suitable for higher needs"],
    cons: ["Major transition", "RAD/DAP decisions", "Less independence"],
  },
  {
    id: "private",
    name: "Private Care",
    description: "Self-funded supports while waiting or filling service gaps.",
    levels: [
      { level: "Casual", cost: "$40–$80/hr", support: "As-needed services" },
      { level: "Regular", cost: "$15,000–$40,000/yr", support: "Scheduled weekly support" },
    ],
    eligibility: ["No government approval required", "Self-funded", "Subject to provider availability"],
    pros: ["Fast to start", "Highly flexible", "Useful as a bridge"],
    cons: ["No subsidy", "Can become expensive", "Quality varies"],
  },
];

export default function FundingPage() {
  const [selectedOption, setSelectedOption] = useState("hcp");
  const [budgetInput, setBudgetInput] = useState("50000");
  const option = fundingOptions.find((item) => item.id === selectedOption) ?? fundingOptions[0];

  const costCalculation = useMemo(() => {
    const annualBudget = Number(budgetInput) || 0;
    return {
      annualBudget,
      hcpLevel: annualBudget < 15000 ? 1 : annualBudget < 32000 ? 2 : annualBudget < 60000 ? 3 : 4,
      monthly: Math.round(annualBudget / 12),
      weekly: Math.round(annualBudget / 52),
    };
  }, [budgetInput]);

  return (
    <ProductShell eyebrow="Funding guide" title="Understand likely care funding and costs." description="Give families a plain-English view of home care, residential care and private care funding pathways before they compare providers.">
      <div className="grid gap-4 md:grid-cols-3">
        {fundingOptions.map((item) => (
          <button key={item.id} onClick={() => setSelectedOption(item.id)} className={`rounded-[2rem] border p-6 text-left transition hover:-translate-y-1 ${selectedOption === item.id ? "border-[#173f35] bg-[#173f35] text-white shadow-2xl shadow-emerald-950/15" : "border-[#eadfce] bg-white/70 text-[#17231f] shadow-sm"}`}>
            <WalletCards className={`h-6 w-6 ${selectedOption === item.id ? "text-white" : "text-[#173f35]"}`} />
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{item.name}</h2>
            <p className={`mt-3 leading-7 ${selectedOption === item.id ? "text-[#dbe8e3]" : "text-[#5d6d65]"}`}>{item.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#173f35]" /><h2 className="text-3xl font-semibold tracking-tight">{option.name}</h2></div>
          <div className="mt-6 grid gap-3">
            {option.levels.map((level) => (
              <div key={level.level} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f1e8] p-4">
                <div><p className="font-semibold">{level.level}</p><p className="text-sm text-[#61736a]">{level.support}</p></div>
                <p className="font-semibold text-[#bc7c51]">{level.cost}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div><h3 className="mb-3 font-semibold">Advantages</h3><ul className="grid gap-2">{option.pros.map((item) => <li key={item} className="flex gap-2 text-sm text-[#43544c]"><Check className="h-4 w-4 text-[#173f35]" /> {item}</li>)}</ul></div>
            <div><h3 className="mb-3 font-semibold">Considerations</h3><ul className="grid gap-2">{option.cons.map((item) => <li key={item} className="flex gap-2 text-sm text-[#43544c]"><HelpCircle className="h-4 w-4 text-[#bc7c51]" /> {item}</li>)}</ul></div>
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center gap-3"><Calculator className="h-5 w-5 text-[#173f35]" /><h2 className="text-3xl font-semibold tracking-tight">Budget calculator</h2></div>
          <label className="mt-6 grid gap-2"><span className="text-sm font-semibold text-[#61736a]">Annual care budget</span><input value={budgetInput} onChange={(event) => setBudgetInput(event.target.value)} className="rounded-2xl border border-[#dfd3c1] bg-white px-4 py-3 outline-none" /></label>
          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-[#f7f1e8] p-4"><p className="text-sm text-[#61736a]">Indicative HCP level</p><p className="mt-1 text-3xl font-semibold text-[#173f35]">Level {costCalculation.hcpLevel}</p></div>
            <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#f7f1e8] p-4"><p className="text-sm text-[#61736a]">Monthly</p><p className="mt-1 text-2xl font-semibold">${costCalculation.monthly.toLocaleString()}</p></div><div className="rounded-2xl bg-[#f7f1e8] p-4"><p className="text-sm text-[#61736a]">Weekly</p><p className="mt-1 text-2xl font-semibold">${costCalculation.weekly.toLocaleString()}</p></div></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{option.eligibility.map((item) => <Pill key={item}>{item}</Pill>)}</div>
        </Panel>
      </div>
    </ProductShell>
  );
}
