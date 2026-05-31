"use client";
// @ts-nocheck

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bookmark,
  Calculator,
  Check,
  ChevronDown,
  Home,
  Landmark,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  ThumbsUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

const providers = [
  {
    id: 1,
    name: "Eastern Suburbs HammondCare Home Care",
    location: "Bondi Junction, NSW",
    rating: "4.7 (89)",
    match: 91,
    price: "Package-funded / moderate out-of-pocket",
    tags: ["Home care", "Clinical support", "Dementia care"],
    reason: "Closest option to home and strongest care fit for current needs.",
    scores: { proximity: 92, care: 96, reviews: 88, budget: 94 },
    weeklyEstimate: 860,
  },
  {
    id: 2,
    name: "Uniting Waverley Home Support",
    location: "Waverley, NSW",
    rating: "4.4 (74)",
    match: 84,
    price: "$260–$440/week",
    tags: ["Home care", "Transport", "Respite"],
    reason: "Good balance of cost, availability, and care fit.",
    scores: { proximity: 82, care: 91, reviews: 78, budget: 88 },
    weeklyEstimate: 720,
  },
  {
    id: 3,
    name: "BaptistCare At Home Eastern Sydney",
    location: "Randwick, NSW",
    rating: "4.6 (121)",
    match: 78,
    price: "$300–$520/week",
    tags: ["Nursing", "Meal support", "Personal care"],
    reason: "Strong clinical capability but slightly weaker proximity fit.",
    scores: { proximity: 68, care: 89, reviews: 90, budget: 76 },
    weeklyEstimate: 790,
  },
];

const steps = [
  "Register or confirm status with My Aged Care",
  "Book or review ACAT assessment",
  "Compare recommended providers",
  "Share plan with family members",
  "Shortlist 2–3 preferred services",
  "Book first provider call or tour",
  "Upload medical and medication summary",
];

const familyMembers = [
  { initials: "S", name: "Sarah", role: "Primary carer", status: "Active" },
  { initials: "J", name: "James", role: "Son", status: "Active" },
  { initials: "M", name: "Mia", role: "Daughter", status: "Invited" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Logo() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M13.5 38.5C11.1 27.2 17.8 17.3 29.2 11.5c2.5 9.9.3 20.7-7.1 28.1-2.3 2.3-5.1 4-8.6 5.1Z" fill="#0b2c34" />
      <path d="M18.5 42.7c10.5-15.3 22-25.2 34.6-29.5.9 11.5-5.3 21.8-16 27-5.6 2.7-11.7 3.5-18.6 2.5Z" fill="#75aaa0" />
      <path d="M24.1 50.1c8.4-12.4 17.9-19.6 28.4-21.6-.6 9.7-6.4 17.7-15.2 21.2-4.1 1.6-8.4 1.8-13.2.4Z" fill="#4f8f83" />
      <path d="M15 40.4c10.4-8 21.3-14.4 36.2-23.1" stroke="#d5e8df" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M23.8 49.1c7.9-6.9 16-12.2 27-18.3" stroke="#d5e8df" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function Card({ children, className = "" }) {
  return <section className={cx("rounded-[1.7rem] border border-[#10241f]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(61,45,28,.08)]", className)}>{children}</section>;
}

function Pill({ children, tone = "default" }) {
  const styles = {
    default: "bg-[#eaf4ef] text-[#4f8f83]",
    muted: "bg-[#f3f4f1] text-[#53666a]",
    dark: "bg-[#0b2c34] text-white",
  };
  return <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", styles[tone])}>{children}</span>;
}

function TopNav({ active, setActive }) {
  const tabs = [
    ["overview", "Overview", BarChart3],
    ["providers", "Providers", Bookmark],
    ["costs", "Costs", Wallet],
    ["family", "Family", Users],
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#10241f]/10 bg-[#fffaf2]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <button onClick={() => setActive("overview")} className="flex items-center gap-3 text-[#0b2c34]">
          <Logo />
          <span className="text-2xl font-semibold tracking-tight">KinHarbour</span>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setActive(id)} className={cx("relative flex items-center gap-2 pb-6 pt-6 text-sm font-semibold", active === id ? "text-[#0b2c34]" : "text-[#53666a]")}> 
              <Icon className="h-4 w-4" />{label}
              {active === id && <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#4f8f83]" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-[#53666a]" />
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b2c34] font-semibold text-white">S</div>
          <div className="hidden sm:block"><p className="font-semibold leading-5">Sarah</p><p className="text-xs text-[#53666a]">Primary carer</p></div>
          <ChevronDown className="h-4 w-4 text-[#53666a]" />
        </div>
      </div>
    </header>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm"><span className="text-[#53666a]">{label}</span><span className="font-semibold text-[#10241f]">{value}%</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ece9]"><div className="h-full rounded-full bg-[#6ea59f]" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function ProviderDetailCard({ provider, saved, onSave }) {
  return (
    <article className="rounded-[1.55rem] border border-[#10241f]/10 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">{provider.name}</h3>
          <p className="mt-2 flex items-center gap-2 text-[#53666a]"><MapPin className="h-4 w-4" />{provider.location}<span className="text-[#b88745]">★ {provider.rating}</span></p>
          <p className="mt-3 text-sm font-medium text-[#53666a]">{provider.price}</p>
        </div>
        <div className="grid h-24 w-24 place-items-center rounded-full border-[8px] border-[#4f8f83] bg-[#f8f1e8] text-center"><p className="text-2xl font-semibold leading-none">{provider.match}%</p><p className="text-xs text-[#53666a]">match</p></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2"><ScoreBar label="Proximity" value={provider.scores.proximity} /><ScoreBar label="Care fit" value={provider.scores.care} /><ScoreBar label="Reviews" value={provider.scores.reviews} /><ScoreBar label="Budget fit" value={provider.scores.budget} /></div>
      <div className="mt-5 flex flex-wrap gap-2">{provider.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>
      <p className="mt-5 text-sm text-[#53666a]">✓ {provider.reason}</p>
      <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => onSave(provider.id)} className={cx("inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white", saved ? "bg-[#4f8f83]" : "bg-[#0b2c34]")}><Bookmark className="h-4 w-4" />{saved ? "Saved" : "Save"}</button><button className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-[#53666a]"><Phone className="h-4 w-4" />Call</button></div>
    </article>
  );
}

function ComparePanel({ shortlisted }) {
  if (shortlisted.length < 2) return null;
  const rows = [
    ["Overall match", (p) => p.match],
    ["Proximity", (p) => p.scores.proximity],
    ["Care fit", (p) => p.scores.care],
    ["Reviews", (p) => p.scores.reviews],
    ["Budget fit", (p) => p.scores.budget],
  ];

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Side-by-side comparison</h2><p className="mt-1 text-sm text-[#53666a]">A clearer view of which shortlisted service best aligns to Margaret.</p></div><Pill tone="muted">{shortlisted.length} shortlisted</Pill></div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-[180px_repeat(3,minmax(180px,1fr))] gap-3">
          <div />
          {shortlisted.map((provider) => <div key={provider.id} className="rounded-2xl bg-[#f8f1e8] p-4"><p className="font-semibold text-[#0b2c34]">{provider.name}</p><p className="mt-1 text-sm text-[#53666a]">{provider.location}</p></div>)}
          {rows.map(([label, getter]) => (
            <React.Fragment key={label}>
              <div className="flex items-center rounded-2xl bg-[#eef3ef] px-4 py-4 text-sm font-semibold text-[#53666a]">{label}</div>
              {shortlisted.map((provider) => <div key={`${provider.id}-${label}`} className="rounded-2xl border border-[#10241f]/10 bg-white px-4 py-4 text-center font-semibold text-[#0b2c34]">{getter(provider)}%</div>)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}

function OverviewPage({ savedIds, completed, toggleStep, setActive }) {
  const savedProviders = providers.filter((provider) => savedIds.includes(provider.id));
  const displayProviders = savedProviders.length ? savedProviders : providers.slice(0, 3);
  const progress = Math.round((completed.length / steps.length) * 100);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-5xl font-semibold leading-[.95] tracking-[-.055em] text-[#0b2c34] md:text-6xl">Care Plan for Margaret</h1>
          <p className="mt-3 text-lg text-[#53666a]">Primary carer: Sarah · Daughter</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf4ef] px-5 py-3 text-sm font-semibold text-[#4f8f83]"><Home className="h-4 w-4" />Home care services recommended</div>
      </div>

      <section className="rounded-[2.4rem] border border-white/80 bg-white/70 p-4 shadow-[0_32px_90px_rgba(61,45,28,.13)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center justify-between bg-[#0b2c34] px-8 py-6 text-white">
            <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/12"><ShieldCheck className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-[.24em] text-white/55">Personalised care snapshot</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Family Decision Dashboard</h2></div></div>
            <span className="rounded-full bg-white/12 px-5 py-2 text-sm font-semibold text-white/85">Home Support</span>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="rounded-[1.7rem] bg-[#f4efe7] p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-5"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#e2eee8] text-[#5a9a96]"><BarChart3 className="h-7 w-7" /></span><div><p className="text-lg text-[#53666a]">Current Stage</p><h3 className="mt-1 text-3xl font-semibold tracking-[-.03em] text-[#0b2c34]">Home Care Assessment</h3></div></div>
                  <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-[10px] border-[#5f9d94] bg-white/70 text-center shadow-inner"><div><p className="text-3xl font-semibold leading-none text-[#0b2c34]">87%</p><p className="mt-1 text-xs font-semibold uppercase tracking-[.12em] text-[#53666a]">confidence</p></div></div>
                </div>
              </div>

              <div className="mt-7"><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">Recommendation</p><h3 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.045em] text-[#0b2c34]">Home care services now, with residential planning on watch.</h3><p className="mt-4 max-w-3xl text-lg leading-8 text-[#53666a]">Margaret appears best suited to support at home because her needs can likely be managed with local services, family involvement remains strong, and nearby provider fit is high.</p></div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Primary pathway</p><p className="mt-1 font-semibold text-[#0b2c34]">Home care package</p></div>
                <div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Action progress</p><p className="mt-1 font-semibold text-[#0b2c34]">{completed.length} of {steps.length} complete</p><div className="mt-3 h-2 rounded-full bg-[#e1e7e4]"><div className="h-full rounded-full bg-[#4f8f83]" style={{ width: `${progress}%` }} /></div></div>
                <div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Watch area</p><p className="mt-1 font-semibold text-[#0b2c34]">Future residential need</p></div>
              </div>
            </div>

            <div className="grid gap-7">
              <div>
                <div className="flex items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">Recommended next steps</p><Pill tone="muted">{progress}% complete</Pill></div>
                <div className="mt-4 grid gap-3">
                  {steps.slice(0, 4).map((step, index) => {
                    const done = completed.includes(index);
                    return (
                      <button key={step} onClick={() => toggleStep(index)} className="flex items-center gap-4 rounded-2xl bg-[#fbfaf6] px-4 py-3 text-left transition hover:bg-[#f4efe7]">
                        <span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold", index === 0 ? "bg-[#69aaa8] text-white" : "bg-[#eef2f0] text-[#53666a]")}>{index + 1}</span>
                        <span className={cx("flex-1 text-[15px]", index === 0 ? "font-semibold text-[#0b2c34]" : "font-medium text-[#53666a]")}>{step}</span>
                        <span className={cx("grid h-6 w-6 place-items-center rounded-md border", done ? "border-[#4f8f83] bg-[#4f8f83] text-white" : "border-[#d5dfda] bg-white")}>{done && <Check className="h-4 w-4" />}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">{savedProviders.length ? "Shortlisted providers" : "Recommended providers"}</p><p className="mt-1 text-sm text-[#53666a]">Updates as providers are saved in the Providers tab.</p></div><button onClick={() => setActive("providers")} className="rounded-full bg-[#eef6f3] px-4 py-2 text-sm font-semibold text-[#4f8f83]">Manage</button></div>
                <div className="mt-4 grid gap-3">
                  {displayProviders.map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[#10241f]/10 bg-white px-4 py-4">
                      <div><p className="font-semibold leading-tight text-[#0b2c34]">{provider.name}</p><p className="mt-1 flex items-center gap-2 text-sm text-[#53666a]"><MapPin className="h-3.5 w-3.5" />{provider.location}</p></div>
                      <span className="shrink-0 rounded-full bg-[#eaf4ef] px-3 py-1 text-sm font-semibold text-[#4f8f83]">{provider.match}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-8 mb-8 rounded-[1.5rem] border border-[#dfe7e2] bg-[#fbfaf6] px-6 py-5 text-center text-lg italic text-[#53666a]">“Margaret is likely suitable for home support now. Begin with My Aged Care status, compare local providers, and keep residential planning visible as needs change.”</div>
        </div>
      </section>
    </main>
  );
}

function ProvidersPage({ savedIds, toggleSave }) {
  const shortlisted = useMemo(() => providers.filter((provider) => savedIds.includes(provider.id)), [savedIds]);
  const [showCompare, setShowCompare] = useState(true);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8"><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Providers</h1><p className="mt-3 text-lg text-[#53666a]">Compare recommended services and build a shortlist that the family can review together.</p></div>
      <Card><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Shortlist</h2><p className="mt-1 text-sm text-[#53666a]">Saved providers appear here and can be compared side by side.</p></div><div className="flex flex-wrap gap-3"><Pill tone="muted">{shortlisted.length} saved</Pill><button onClick={() => setShowCompare((current) => !current)} disabled={shortlisted.length < 2} className={cx("rounded-full px-4 py-2 text-sm font-semibold", shortlisted.length < 2 ? "bg-[#ecefea] text-[#96a29f]" : "bg-[#0b2c34] text-white")}>{showCompare ? "Hide comparison" : "Compare shortlisted"}</button></div></div>{shortlisted.length === 0 ? <div className="mt-5 rounded-2xl bg-[#f8f1e8] p-5 text-[#53666a]">No providers saved yet. Save providers below to build your shortlist.</div> : <div className="mt-5 grid gap-3 md:grid-cols-3">{shortlisted.map((provider) => <div key={provider.id} className="rounded-2xl bg-[#f8f1e8] p-4"><p className="font-semibold text-[#0b2c34]">{provider.name}</p><p className="mt-1 text-sm text-[#53666a]">{provider.match}% match · {provider.location}</p></div>)}</div>}</Card>
      {showCompare && shortlisted.length >= 2 && <div className="mt-6"><ComparePanel shortlisted={shortlisted} /></div>}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">{providers.map((provider) => <ProviderDetailCard key={provider.id} provider={provider} saved={savedIds.includes(provider.id)} onSave={toggleSave} />)}</div>
    </main>
  );
}

function CostsPage({ savedIds }) {
  const [funding, setFunding] = useState("package");
  const [hours, setHours] = useState(12);
  const recommended = providers.find((provider) => savedIds.includes(provider.id)) || providers[0];
  const totalWeekly = Math.round((hours * 68 + recommended.weeklyEstimate) / 2);
  const governmentWeekly = funding === "package" ? Math.round(totalWeekly * 0.72) : funding === "mixed" ? Math.round(totalWeekly * 0.38) : 0;
  const outOfPocketWeekly = totalWeekly - governmentWeekly;
  const annualTotal = totalWeekly * 52;
  const annualOutOfPocket = outOfPocketWeekly * 52;
  const annualGovernment = governmentWeekly * 52;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8"><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Costs</h1><p className="mt-3 text-lg text-[#53666a]">Illustrative cost planning for Margaret&apos;s recommended home care pathway.</p></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <Card><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#4f8f83]">Cost planner</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0b2c34]">Estimate likely support costs</h2></div><Calculator className="h-8 w-8 text-[#4f8f83]" /></div><div className="mt-6 flex flex-wrap gap-3">{[["package", "Public / package-funded"], ["mixed", "Mixed funding"], ["private", "Private pay"]].map(([value, label]) => <button key={value} onClick={() => setFunding(value)} className={cx("rounded-full px-4 py-2 text-sm font-semibold", funding === value ? "bg-[#0b2c34] text-white" : "bg-[#edf2ef] text-[#53666a]")}>{label}</button>)}</div><div className="mt-6"><div className="flex items-center justify-between text-sm text-[#53666a]"><span>Weekly support intensity</span><span>{hours} hrs / week</span></div><input type="range" min="6" max="30" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-4 w-full accent-[#4f8f83]" /></div><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Estimated weekly cost</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${totalWeekly.toLocaleString()}</p></div><div className="rounded-[1.25rem] bg-[#eef6f3] p-4"><p className="text-sm text-[#53666a]">Government / package support</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${annualGovernment.toLocaleString()} / yr</p></div><div className="rounded-[1.25rem] bg-[#fff4e8] p-4"><p className="text-sm text-[#53666a]">Likely out-of-pocket</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${annualOutOfPocket.toLocaleString()} / yr</p></div></div><div className="mt-6 rounded-[1.35rem] border border-[#10241f]/10 bg-white p-5"><div className="flex items-center gap-3"><Landmark className="h-5 w-5 text-[#4f8f83]" /><p className="font-semibold text-[#0b2c34]">Funding split</p></div><div className="mt-4 h-4 overflow-hidden rounded-full bg-[#ecefeb]"><div className="h-full bg-[#4f8f83]" style={{ width: `${(governmentWeekly / totalWeekly) * 100}%` }} /></div><div className="mt-3 flex items-center justify-between text-sm text-[#53666a]"><span>Government / package contribution</span><span>${governmentWeekly.toLocaleString()} / wk</span></div><div className="mt-2 flex items-center justify-between text-sm text-[#53666a]"><span>Out-of-pocket contribution</span><span>${outOfPocketWeekly.toLocaleString()} / wk</span></div></div></Card>
        <Card><div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Recommended cost context</h2><p className="mt-1 text-sm text-[#53666a]">Based on {recommended.name} and Margaret&apos;s likely pathway.</p></div><Wallet className="h-7 w-7 text-[#4f8f83]" /></div><div className="mt-5 grid gap-4"><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Indicative annual care value</p><p className="mt-2 text-3xl font-semibold text-[#0b2c34]">${annualTotal.toLocaleString()}</p></div><div className="rounded-[1.25rem] border border-[#10241f]/10 bg-white p-4"><p className="text-sm text-[#53666a]">What affects the cost most?</p><div className="mt-3 grid gap-2 text-sm text-[#53666a]"><p>• Hours of weekly support required</p><p>• Whether My Aged Care or a package is already approved</p><p>• Clinical or nursing support intensity</p><p>• Provider pricing and travel distance</p></div></div><div className="rounded-[1.25rem] bg-[#eef6f3] p-4"><p className="text-sm text-[#53666a]">Important note</p><p className="mt-2 text-sm leading-7 text-[#53666a]">These figures are indicative planning estimates only. Final public and private costs will vary by package status, provider fees, supplements, and exact support hours.</p></div></div></Card>
      </div>
    </main>
  );
}

function FamilyPage() {
  const [messages, setMessages] = useState([{ author: "Sarah", text: "I think HammondCare should be our first call because they are closest.", likes: 2 }, { author: "James", text: "Can we compare Uniting before choosing?", likes: 1 }]);
  const [draft, setDraft] = useState("");
  const [yes, setYes] = useState(2);
  const [no, setNo] = useState(0);
  function addMessage() { if (!draft.trim()) return; setMessages([...messages, { author: "You", text: draft, likes: 0 }]); setDraft(""); }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Family</h1><p className="mt-3 text-lg text-[#53666a]">Invite family members, vote on decisions, and keep notes in one place.</p></div><button className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0b2c34] px-5 py-3 font-semibold text-white"><UserPlus className="h-4 w-4" />Share family link</button></div>
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><Card><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Family members</h2><div className="mt-5 grid gap-3">{familyMembers.map((member) => <div key={member.name} className="flex items-center justify-between rounded-2xl bg-[#f8f1e8] p-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf4ef] font-semibold text-[#4f8f83]">{member.initials}</span><div><p className="font-semibold">{member.name}</p><p className="text-sm text-[#53666a]">{member.role}</p></div></div><Pill tone="muted">{member.status}</Pill></div>)}</div><div className="mt-6 rounded-2xl bg-[#eaf4ef] p-5"><p className="font-semibold text-[#0b2c34]">Poll: should we book a second call with HammondCare?</p><div className="mt-4 flex gap-3"><button onClick={() => setYes(yes + 1)} className="rounded-xl bg-white px-5 py-2 font-semibold text-[#0b2c34]">Yes · {yes}</button><button onClick={() => setNo(no + 1)} className="rounded-xl bg-white px-5 py-2 font-semibold text-[#0b2c34]">No · {no}</button></div></div></Card><Card><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Notes and comments</h2><div className="mt-5 grid gap-3">{messages.map((message, index) => <div key={`${message.author}-${index}`} className="rounded-2xl bg-[#f8f1e8] p-4"><div className="flex items-start justify-between"><p className="font-semibold">{message.author}</p><span className="flex items-center gap-1 text-sm text-[#4f8f83]"><ThumbsUp className="h-4 w-4" />{message.likes}</span></div><p className="mt-2 leading-7 text-[#53666a]">{message.text}</p></div>)}</div><div className="mt-5 flex gap-3"><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a note for the family..." className="flex-1 rounded-2xl border border-[#10241f]/10 bg-white px-4 py-3 outline-none focus:border-[#4f8f83]" /><button onClick={addMessage} className="rounded-2xl bg-[#0b2c34] px-4 py-3 text-white"><Send className="h-4 w-4" /></button></div></Card></div>
    </main>
  );
}

export default function HomePage() {
  const [active, setActive] = useState("overview");
  const [savedIds, setSavedIds] = useState([1, 2]);
  const [completed, setCompleted] = useState([0, 1]);
  function toggleSave(id) { setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id])); }
  function toggleStep(index) { setCompleted((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index])); }

  return (
    <div className="min-h-screen bg-[#f8f1e8] text-[#10241f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(84,139,124,.16),transparent_28rem),radial-gradient(circle_at_90%_8%,rgba(190,127,84,.10),transparent_30rem),linear-gradient(180deg,#fffaf2,#f8f1e8)]" />
      <div className="relative z-10"><TopNav active={active} setActive={setActive} />{active === "overview" && <OverviewPage savedIds={savedIds} completed={completed} toggleStep={toggleStep} setActive={setActive} />}{active === "providers" && <ProvidersPage savedIds={savedIds} toggleSave={toggleSave} />}{active === "costs" && <CostsPage savedIds={savedIds} />}{active === "family" && <FamilyPage />}</div>
    </div>
  );
}
