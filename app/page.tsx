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
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileHeart,
  Home,
  Landmark,
  LockKeyhole,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

const pathwayModes = {
  "Home Support": {
    stage: "Home Care Assessment",
    steps: ["Complete ACAT assessment", "Register with My Aged Care", "Request Home Care Package", "Compare Level 2–3 providers"],
    providers: ["BaptistCare", "HammondCare", "Uniting Care", "COTA Home Care"],
    budget: "$22,000 – $28,000 / yr",
    quote: "Sarah, Melbourne: Mum wants to stay home. Level 2 package likely.",
  },
  "Residential Care": {
    stage: "Residential Placement",
    steps: ["Confirm residential ACAT approval", "Review accommodation funding", "Shortlist 3–5 homes", "Arrange facility tours"],
    providers: ["Regis Aged Care", "Estia Health", "Japara Healthcare", "Bolton Clarke"],
    budget: "$65,000 – $95,000 / yr",
    quote: "James, Sydney: Dad needs memory support. Touring 3 homes this week.",
  },
  "Urgent Discharge": {
    stage: "Hospital Discharge Planning",
    steps: ["Speak to discharge planner", "Request urgent ACAT", "Arrange interim home care", "Identify long-term pathway"],
    providers: ["Interim Home Care", "Transition Care", "Respite Options", "Care Coordinator"],
    budget: "$1,250 – $2,500 / wk",
    quote: "Tom, Brisbane: Dad discharged Friday. Need an urgent plan by Thursday.",
  },
};

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

const actionSteps = [
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

const assessmentQuestions = [
  { section: "Family context", title: "Who is this care plan for?", helper: "Use their first name if you are comfortable.", type: "text", placeholder: "e.g. Margaret, Dad, Mum" },
  { section: "Family context", title: "Where should care be centred?", helper: "Add where the person needing care lives and where close family are based.", type: "address" },
  { section: "Family context", title: "Who is completing this assessment?", helper: "Most assessments are completed by family decision-makers.", type: "single", options: ["Son", "Daughter", "Partner", "Family carer", "The person needing care", "Other decision-maker"] },
  { section: "Family context", title: "What is prompting this decision now?", helper: "Select the closest reason.", type: "single", options: ["Recent fall", "Hospital discharge", "Memory or confusion concerns", "Family can no longer manage", "Planning ahead", "Not sure"] },
  { section: "Care needs", title: "What kind of support is needed?", helper: "Select all that apply.", type: "multi", options: ["Personal care", "Meals and groceries", "Medication reminders", "Nursing or wound care", "Transport", "Cleaning", "Memory support", "Overnight supervision"] },
  { section: "Care needs", title: "How would you describe their mobility?", helper: "Mobility helps estimate care intensity.", type: "single", options: ["Independent", "Uses a walking stick", "Uses a walker", "Needs help transferring", "Wheelchair or mostly bed-bound", "Not sure"] },
  { section: "Pathway", title: "How quickly does a decision need to be made?", helper: "Urgency changes the recommended next steps.", type: "single", options: ["Planning ahead", "Within 1–3 months", "This month", "This week", "Next 72 hours", "Not sure"] },
  { section: "Pathway", title: "Which care setting are you considering?", helper: "It is okay to be unsure.", type: "single", options: ["Home care package", "Short-term respite", "Residential aged care", "Hospital discharge / transition care", "We want to keep them at home", "Not sure"] },
  { section: "Pathway", title: "What is their My Aged Care or funding status?", helper: "Many families are unsure at this stage.", type: "single", options: ["Not registered", "Registered but no assessment", "ACAT booked", "Home Care Package approved", "Residential care approved", "I don’t know / not sure"] },
  { section: "Pathway", title: "What matters most in the decision?", helper: "Select the priorities the family will care about most.", type: "multi", options: ["Staying close to home", "Keeping costs manageable", "Dementia or memory support", "Clinical care quality", "Availability now", "Family visibility", "Warmth and dignity"] },
];

const addressSuggestions = [
  "42 Phillips Street, Bondi Junction NSW 2022",
  "42 Phillips Street, Sydney NSW 2000",
  "14 Ocean Street, Bondi NSW 2026",
  "88 Curlewis Street, Bondi Beach NSW 2026",
  "12 Whistler Street, Manly NSW 2095",
  "21 Victoria Avenue, Chatswood NSW 2067",
  "Regional / not listed",
  "Not sure yet",
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

function AppFrame({ children }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f1e8] text-[#10241f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(84,139,124,.18),transparent_28rem),radial-gradient(circle_at_90%_8%,rgba(190,127,84,.10),transparent_30rem),linear-gradient(180deg,#fffaf2,#f8f1e8)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Pill({ children, tone = "default" }) {
  const styles = {
    default: "bg-[#eaf4ef] text-[#4f8f83]",
    muted: "bg-[#f3f4f1] text-[#53666a]",
    dark: "bg-[#0b2c34] text-white",
  };
  return <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", styles[tone] || styles.default)}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <section className={cx("rounded-[1.7rem] border border-[#10241f]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(61,45,28,.08)]", className)}>{children}</section>;
}

function MainNav({ active, setActive }) {
  const inAccount = active.startsWith("account");
  const accountTabs = [
    ["account-overview", "Overview", BarChart3],
    ["account-providers", "Providers", Bookmark],
    ["account-costs", "Costs", Wallet],
    ["account-family", "Family", Users],
  ];

  return (
    <header className="border-b border-[#10241f]/10 bg-[#fffaf2]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <button onClick={() => setActive("home")} className="flex items-center gap-3 text-[#0b2c34]">
          <Logo />
          <span className="text-2xl font-semibold tracking-tight">KinHarbour</span>
        </button>

        {inAccount ? (
          <nav className="hidden items-center gap-8 md:flex">
            {accountTabs.map(([id, label, Icon]) => (
              <button key={id} onClick={() => setActive(id)} className={cx("relative flex items-center gap-2 pb-6 pt-6 text-sm font-semibold", active === id ? "text-[#0b2c34]" : "text-[#53666a]")}> 
                <Icon className="h-4 w-4" />{label}
                {active === id && <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#4f8f83]" />}
              </button>
            ))}
          </nav>
        ) : (
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#53666a] lg:flex">
            {[["home", "How it works"], ["why", "Why KinHarbour"], ["home", "Care options"], ["home", "Costs"], ["home", "Resources"]].map(([id, label]) => (
              <button key={label} onClick={() => setActive(id)} className="hover:text-[#0b2c34]">{label}</button>
            ))}
          </nav>
        )}

        {inAccount ? (
          <div className="flex items-center gap-4"><Bell className="h-5 w-5 text-[#53666a]" /><div className="grid h-10 w-10 place-items-center rounded-full bg-[#0b2c34] font-semibold text-white">S</div><div className="hidden sm:block"><p className="font-semibold leading-5">Sarah</p><p className="text-xs text-[#53666a]">Primary carer</p></div><ChevronDown className="h-4 w-4 text-[#53666a]" /></div>
        ) : (
          <button onClick={() => setActive("assessment")} className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-950/15">Begin Assessment <ArrowRight className="h-4 w-4" /></button>
        )}
      </div>
    </header>
  );
}

function DashboardPreview() {
  const [mode, setMode] = useState("Home Support");
  const data = pathwayModes[mode];
  return (
    <div className="relative origin-center scale-[0.9] lg:origin-left">
      <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-start">
        {Object.keys(pathwayModes).map((item) => <button key={item} onClick={() => setMode(item)} className={cx("rounded-full border px-4 py-2 text-sm font-medium", mode === item ? "border-[#0b2c34] bg-[#0b2c34] text-white" : "border-[#d9dfda] bg-white/72 text-[#53666a]")}>{item}</button>)}
      </div>
      <div className="mx-auto max-w-[640px] rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_28px_90px_rgba(61,45,28,.14)] backdrop-blur-2xl lg:mx-0">
        <div className="overflow-hidden rounded-[1.65rem] bg-white">
          <div className="flex items-center justify-between bg-[#0b2c34] px-6 py-5 text-white"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/12"><ShieldCheck className="h-5 w-5" /></span><p className="font-semibold">Family Decision Dashboard</p></div><span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/80">{mode}</span></div>
          <div className="p-7">
            <div className="rounded-[1.5rem] bg-[#f4efe7] p-5"><div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#dfe9df]"><BarChart3 className="h-6 w-6 text-[#5e9d9c]" /></span><div><p className="text-sm text-[#63747a]">Current Stage</p><h3 className="text-2xl font-semibold tracking-tight">{data.stage}</h3></div></div></div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#89a697]">Recommended next steps</p><div className="mt-3 grid gap-2">{data.steps.map((step, i) => <div key={step} className="flex items-center gap-3 text-sm"><span className={cx("grid h-7 w-7 place-items-center rounded-full text-xs font-bold", i === 0 ? "bg-[#69aaa8] text-white" : "bg-[#ecf0ef] text-[#53666a]")}>{i + 1}</span><span className={i === 0 ? "font-semibold" : "text-[#53666a]"}>{step}</span></div>)}</div></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#89a697]">Recommended providers</p><div className="mt-3 flex flex-wrap gap-2">{data.providers.map((p) => <span key={p} className="rounded-full bg-[#edf1ef] px-3 py-1.5 text-xs font-semibold text-[#0b2c34]">{p}</span>)}</div></div></div>
            <div className="mt-5 rounded-[1.35rem] bg-[#f4f5f4] p-4"><p className="text-sm text-[#63747a]">Budget Estimate</p><p className="mt-1 text-lg font-semibold text-[#a57b41]">{data.budget}</p></div>
            <div className="mt-4 rounded-[1.35rem] border border-[#dde5e1] bg-white px-5 py-4 text-sm italic text-[#53666a]">“{data.quote}”</div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[#93a09b] lg:text-left">Illustrative snapshot. Full dashboard unlocks after assessment and account creation.</p>
    </div>
  );
}

function MarketingHome({ setActive }) {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl gap-8 px-6 pb-24 pt-12 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-4 py-2 text-sm font-semibold text-[#4d8d8b] shadow-sm"><Sparkles className="h-4 w-4" />Built for Australian families</div>
          <h1 className="max-w-4xl text-[3.8rem] font-semibold leading-[.92] tracking-[-.065em] md:text-[5.65rem]">Find the right aged care path, <span className="text-[#5d9691]">step by step.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#62756e]">KinHarbour brings aged care guidance, likely costs, a shared family planner and personalised recommendations into one all-in-one place.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => setActive("assessment")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b2c34] px-6 py-3.5 text-sm font-semibold text-white shadow-xl">Begin Assessment <ArrowRight className="h-4 w-4" /></button><button className="inline-flex items-center justify-center rounded-full border border-[#0b2c34] px-6 py-3.5 text-sm font-semibold text-[#0b2c34]">Book a Strategy Call</button></div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#7c8c87]">{["Independent guidance", "Australian-built", "Designed for overwhelmed families, not experts"].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#5d9691]" />{item}</div>)}</div>
        </div>
        <DashboardPreview />
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-4"><div className="rounded-[2rem] border border-white/70 bg-white/45 p-8 shadow-sm backdrop-blur-xl"><div className="mb-9 text-center"><p className="text-sm font-bold uppercase tracking-[.22em] text-[#89a697]">What we do</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.045em] md:text-5xl">Simple, personal, shareable guidance.</h2></div><div className="grid gap-7 md:grid-cols-3">{[{ icon: ClipboardCheck, title: "Answer questions", text: "A calm assessment designed for family carers and older Australians." }, { icon: FileHeart, title: "Get a recommendation", text: "Understand the likely pathway, costs, urgency and next steps." }, { icon: Users, title: "Create your plan", text: "Save the report, shortlist providers and share decisions with family." }].map((item, index) => { const Icon = item.icon; return <div key={item.title} className="relative rounded-[1.7rem] border border-[#dfe7e2] bg-white/80 p-6 shadow-sm"><div className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-[#dfe7e2] bg-white text-xs font-bold text-[#53666a]">{index + 1}</div><div className="flex items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e5efec]"><Icon className="h-6 w-6 text-[#5d9691]" /></span><div><h3 className="text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-2 leading-7 text-[#62756e]">{item.text}</p></div></div></div>; })}</div></div></section>
    </main>
  );
}

function WhyPage() {
  return <main className="mx-auto max-w-7xl px-6 py-14"><div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-4 py-2 text-sm font-semibold text-[#4d8d8b]"><Sparkles className="h-4 w-4" />Why KinHarbour</div><h1 className="max-w-5xl text-6xl font-semibold leading-[.95] tracking-[-.07em] md:text-7xl">When care becomes urgent, most families have <span className="text-[#5d9691]">no clear starting point.</span></h1><p className="mt-7 max-w-3xl text-xl leading-9 text-[#62756e]">The aged care system is complex, fragmented, and overwhelming — especially when decisions need to happen fast.</p></main>;
}

function AddressAutocomplete({ value, onChange, label }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => query.trim() ? addressSuggestions.filter((x) => x.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : addressSuggestions.slice(0, 4), [query]);
  return <div className="relative rounded-[1.6rem] border border-[#dfe7e2] bg-[#fffaf2] p-5 shadow-sm"><label className="text-sm font-semibold text-[#62756e]">{label}</label><input value={query} onFocus={() => setOpen(true)} onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }} placeholder="Start typing an address or suburb..." className="mt-3 w-full rounded-2xl border border-[#dfe7e2] bg-white px-4 py-4 text-lg font-semibold text-[#10241f] outline-none focus:border-[#5d9691]" />{open && <div className="absolute left-5 right-5 top-[116px] z-20 overflow-hidden rounded-2xl border border-[#dfe7e2] bg-white shadow-xl">{matches.map((item) => <button key={item} onMouseDown={() => { setQuery(item); onChange(item); setOpen(false); }} className="flex w-full items-start gap-3 border-b border-[#edf1ef] px-4 py-3 text-left text-sm font-semibold text-[#43565c] last:border-b-0 hover:bg-[#f8f1e8]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5d9691]" />{item}</button>)}</div>}</div>;
}

function AssessmentPage({ setActive, setProfile }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const q = assessmentQuestions[step];
  const progress = Math.round(((step + 1) / assessmentQuestions.length) * 100);
  function answer(option) { setAnswers((current) => { if (q.type === "multi") { const existing = Array.isArray(current[step]) ? current[step] : []; return { ...current, [step]: existing.includes(option) ? existing.filter((x) => x !== option) : [...existing, option] }; } return { ...current, [step]: option }; }); }
  function finish() { const location = answers[1] || {}; setProfile({ careName: typeof answers[0] === "string" && answers[0] ? answers[0] : "Margaret", recipientAddress: location.recipient || "Bondi Junction, NSW", familyAddress: location.family || "Sydney, NSW", assessorRole: typeof answers[2] === "string" ? answers[2] : "Daughter" }); setActive("preview"); }
  return <main className="mx-auto max-w-6xl px-6 py-10"><Card className="p-8"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.24em] text-[#89a697]">Assessment</p><h1 className="mt-3 text-5xl font-semibold tracking-[-.055em]">Build your care plan.</h1></div><Pill>{progress}% complete</Pill></div><div className="mt-7 h-3 overflow-hidden rounded-full bg-[#efe2d0]"><div className="h-full rounded-full bg-[#0b2c34]" style={{ width: `${progress}%` }} /></div></Card><Card className="mt-6 p-9"><div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.24em] text-[#bd8055]">{q.section}</p><h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1] tracking-[-.055em] md:text-5xl">{q.title}</h2><p className="mt-4 max-w-2xl leading-7 text-[#62756e]">{q.helper}</p></div><p className="rounded-full bg-[#f8f1e8] px-4 py-2 text-sm font-semibold text-[#62756e]">Question {step + 1} of {assessmentQuestions.length}</p></div>{q.type === "text" && <input value={answers[step] || ""} onChange={(e) => setAnswers((c) => ({ ...c, [step]: e.target.value }))} placeholder={q.placeholder} className="mt-8 w-full rounded-[1.5rem] border border-[#dfe7e2] bg-[#fffaf2] px-5 py-5 text-xl outline-none focus:border-[#5d9691]" />}{q.type === "address" && <div className="mt-8 grid gap-20 md:grid-cols-2"><AddressAutocomplete label="Person needing care" value={(answers[step] || {}).recipient || ""} onChange={(value) => setAnswers((c) => ({ ...c, [step]: { ...(c[step] || {}), recipient: value } }))} /><AddressAutocomplete label="Close family or decision-maker" value={(answers[step] || {}).family || ""} onChange={(value) => setAnswers((c) => ({ ...c, [step]: { ...(c[step] || {}), family: value } }))} /></div>}{["single", "multi"].includes(q.type) && <div className="mt-8 grid gap-4 md:grid-cols-2">{q.options.map((option) => { const current = answers[step]; const selected = q.type === "multi" ? Array.isArray(current) && current.includes(option) : current === option; return <button key={option} onClick={() => answer(option)} className={cx("rounded-[1.6rem] border p-5 text-left shadow-sm transition hover:-translate-y-1", selected ? "border-[#0b2c34] bg-[#0b2c34] text-white" : "border-[#dfe7e2] bg-[#fffaf2] text-[#10241f] hover:bg-white")}><div className="flex items-center justify-between gap-4"><span className="text-lg font-semibold tracking-tight">{option}</span><span className={cx("grid h-8 w-8 place-items-center rounded-full", selected ? "bg-white/15" : "bg-[#dfe9df]")}>{selected ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span></div></button>; })}</div>}<div className="mt-9 flex justify-between border-t border-[#e6ebe7] pt-6"><button onClick={() => setStep(Math.max(0, step - 1))} className="inline-flex items-center gap-2 rounded-full border border-[#0b2c34]/10 bg-white px-5 py-3 font-semibold text-[#0b2c34]"><ChevronLeft className="h-4 w-4" />Back</button><button onClick={() => step === assessmentQuestions.length - 1 ? finish() : setStep(step + 1)} className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-6 py-3 font-semibold text-white">{step === assessmentQuestions.length - 1 ? "Generate personalised plan" : "Continue"}<ArrowRight className="h-4 w-4" /></button></div></Card></main>;
}

function PlanPreview({ setActive, profile }) {
  return <main className="mx-auto max-w-6xl px-6 py-12"><Card className="p-10"><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><div className="mb-6 inline-flex items-center gap-3 rounded-full bg-[#eaf4ef] px-4 py-2 text-sm font-semibold text-[#4d8d8b]"><Sparkles className="h-4 w-4" />Personalised plan generated</div><h1 className="text-5xl font-semibold leading-[.98] tracking-[-.06em] md:text-6xl">{profile.careName}&apos;s likely pathway is home care services with residential planning.</h1><p className="mt-6 text-lg leading-8 text-[#62756e]">Create an account to unlock the full dashboard, providers, costs and family collaboration.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => setActive("account-overview")} className="rounded-full bg-[#0b2c34] px-6 py-3.5 font-semibold text-white">Create account to unlock plan</button><button onClick={() => setActive("assessment")} className="rounded-full border border-[#0b2c34] px-6 py-3.5 font-semibold text-[#0b2c34]">Edit answers</button></div></div><div className="relative overflow-hidden rounded-[2rem] border border-[#dfe7e2] bg-white p-5 shadow-xl"><div className="rounded-[1.5rem] bg-[#0b2c34] p-5 text-white"><p className="text-sm font-semibold text-white/60">Hero recommendation</p><div className="mt-4 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><Home className="h-7 w-7" /></span><div><h2 className="text-3xl font-semibold tracking-tight">Home care services</h2><p className="mt-1 text-white/70">Likely suitable as a starting pathway.</p></div></div></div><div className="mt-4 grid select-none gap-3 blur-[5px] pointer-events-none">{["Detailed care reasoning", "Provider shortlist", "Cost planner", "Family dashboard", "Action progress"].map((item) => <div key={item} className="rounded-2xl bg-[#f8f1e8] p-4 font-semibold text-[#43565c]">{item}</div>)}</div><div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/70 bg-white/82 p-5 text-center shadow-xl backdrop-blur-xl"><LockKeyhole className="mx-auto h-6 w-6 text-[#5d9691]" /><p className="mt-2 font-semibold">Create an account to view the full personalised plan.</p></div></div></div></Card></main>;
}

function ScoreBar({ label, value }) { return <div><div className="flex items-center justify-between text-sm"><span className="text-[#53666a]">{label}</span><span className="font-semibold text-[#10241f]">{value}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ece9]"><div className="h-full rounded-full bg-[#6ea59f]" style={{ width: `${value}%` }} /></div></div>; }
function ProviderDetailCard({ provider, saved, onSave }) { return <article className="rounded-[1.55rem] border border-[#10241f]/10 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-5"><div><h3 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">{provider.name}</h3><p className="mt-2 flex items-center gap-2 text-[#53666a]"><MapPin className="h-4 w-4" />{provider.location}<span className="text-[#b88745]">★ {provider.rating}</span></p><p className="mt-3 text-sm font-medium text-[#53666a]">{provider.price}</p></div><div className="grid h-24 w-24 place-items-center rounded-full border-[8px] border-[#4f8f83] bg-[#f8f1e8] text-center"><p className="text-2xl font-semibold leading-none">{provider.match}%</p><p className="text-xs text-[#53666a]">match</p></div></div><div className="mt-6 grid gap-4 md:grid-cols-2"><ScoreBar label="Proximity" value={provider.scores.proximity} /><ScoreBar label="Care fit" value={provider.scores.care} /><ScoreBar label="Reviews" value={provider.scores.reviews} /><ScoreBar label="Budget fit" value={provider.scores.budget} /></div><div className="mt-5 flex flex-wrap gap-2">{provider.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div><p className="mt-5 text-sm text-[#53666a]">✓ {provider.reason}</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => onSave(provider.id)} className={cx("inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white", saved ? "bg-[#4f8f83]" : "bg-[#0b2c34]")}><Bookmark className="h-4 w-4" />{saved ? "Saved" : "Save"}</button><button className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-[#53666a]"><Phone className="h-4 w-4" />Call</button></div></article>; }
function ComparePanel({ shortlisted }) { if (shortlisted.length < 2) return null; const rows = [["Overall match", (p) => p.match], ["Proximity", (p) => p.scores.proximity], ["Care fit", (p) => p.scores.care], ["Reviews", (p) => p.scores.reviews], ["Budget fit", (p) => p.scores.budget]]; return <Card><div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Side-by-side comparison</h2><p className="mt-1 text-sm text-[#53666a]">A clearer view of which shortlisted service best aligns to the care plan.</p></div><Pill tone="muted">{shortlisted.length} shortlisted</Pill></div><div className="overflow-x-auto"><div className="grid min-w-[760px] grid-cols-[180px_repeat(3,minmax(180px,1fr))] gap-3"><div />{shortlisted.map((p) => <div key={p.id} className="rounded-2xl bg-[#f8f1e8] p-4"><p className="font-semibold text-[#0b2c34]">{p.name}</p><p className="mt-1 text-sm text-[#53666a]">{p.location}</p></div>)}{rows.map(([label, getter]) => <React.Fragment key={label}><div className="flex items-center rounded-2xl bg-[#eef3ef] px-4 py-4 text-sm font-semibold text-[#53666a]">{label}</div>{shortlisted.map((p) => <div key={`${p.id}-${label}`} className="rounded-2xl border border-[#10241f]/10 bg-white px-4 py-4 text-center font-semibold text-[#0b2c34]">{getter(p)}%</div>)}</React.Fragment>)}</div></div></Card>; }

function AccountOverview({ profile, savedIds, completed, toggleStep, setActive }) {
  const savedProviders = providers.filter((p) => savedIds.includes(p.id));
  const displayProviders = savedProviders.length ? savedProviders : providers.slice(0, 3);
  const progress = Math.round((completed.length / actionSteps.length) * 100);
  return <main className="mx-auto max-w-7xl px-6 py-10"><div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-5xl font-semibold leading-[.95] tracking-[-.055em] text-[#0b2c34] md:text-6xl">Care Plan for {profile.careName}</h1><p className="mt-3 text-lg text-[#53666a]">Primary carer: {profile.assessorRole === "The person needing care" ? profile.careName : `Sarah · ${profile.assessorRole}`}</p></div><div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf4ef] px-5 py-3 text-sm font-semibold text-[#4f8f83]"><Home className="h-4 w-4" />Home care services recommended</div></div><section className="rounded-[2.4rem] border border-white/80 bg-white/70 p-4 shadow-[0_32px_90px_rgba(61,45,28,.13)] backdrop-blur-xl"><div className="overflow-hidden rounded-[2rem] bg-white"><div className="flex items-center justify-between bg-[#0b2c34] px-8 py-6 text-white"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/12"><ShieldCheck className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-[.24em] text-white/55">Personalised care snapshot</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Family Decision Dashboard</h2></div></div><span className="rounded-full bg-white/12 px-5 py-2 text-sm font-semibold text-white/85">Home Support</span></div><div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_.95fr]"><div><div className="rounded-[1.7rem] bg-[#f4efe7] p-6"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-5"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#e2eee8] text-[#5a9a96]"><BarChart3 className="h-7 w-7" /></span><div><p className="text-lg text-[#53666a]">Current Stage</p><h3 className="mt-1 text-3xl font-semibold tracking-[-.03em] text-[#0b2c34]">Home Care Assessment</h3></div></div><div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-[10px] border-[#5f9d94] bg-white/70 text-center shadow-inner"><div><p className="text-3xl font-semibold leading-none text-[#0b2c34]">87%</p><p className="mt-1 text-xs font-semibold uppercase tracking-[.12em] text-[#53666a]">confidence</p></div></div></div></div><div className="mt-7"><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">Recommendation</p><h3 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.045em] text-[#0b2c34]">Home care services now, with residential planning on watch.</h3><p className="mt-4 max-w-3xl text-lg leading-8 text-[#53666a]">{profile.careName} appears best suited to support at home because current needs can likely be managed with local services, family involvement remains strong, and nearby provider fit is high.</p></div><div className="mt-6 grid gap-3 md:grid-cols-3"><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Primary pathway</p><p className="mt-1 font-semibold text-[#0b2c34]">Home care package</p></div><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Action progress</p><p className="mt-1 font-semibold text-[#0b2c34]">{completed.length} of {actionSteps.length} complete</p><div className="mt-3 h-2 rounded-full bg-[#e1e7e4]"><div className="h-full rounded-full bg-[#4f8f83]" style={{ width: `${progress}%` }} /></div></div><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Watch area</p><p className="mt-1 font-semibold text-[#0b2c34]">Future residential need</p></div></div></div><div className="grid gap-7"><div><div className="flex items-center justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">Recommended next steps</p><Pill tone="muted">{progress}% complete</Pill></div><div className="mt-4 grid gap-3">{actionSteps.slice(0, 4).map((step, index) => { const done = completed.includes(index); return <button key={step} onClick={() => toggleStep(index)} className="flex items-center gap-4 rounded-2xl bg-[#fbfaf6] px-4 py-3 text-left transition hover:bg-[#f4efe7]"><span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold", index === 0 ? "bg-[#69aaa8] text-white" : "bg-[#eef2f0] text-[#53666a]")}>{index + 1}</span><span className={cx("flex-1 text-[15px]", index === 0 ? "font-semibold text-[#0b2c34]" : "font-medium text-[#53666a]")}>{step}</span><span className={cx("grid h-6 w-6 place-items-center rounded-md border", done ? "border-[#4f8f83] bg-[#4f8f83] text-white" : "border-[#d5dfda] bg-white")}>{done && <Check className="h-4 w-4" />}</span></button>; })}</div></div><div><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.26em] text-[#89a697]">{savedProviders.length ? "Shortlisted providers" : "Recommended providers"}</p><p className="mt-1 text-sm text-[#53666a]">Updates as providers are saved in the Providers tab.</p></div><button onClick={() => setActive("account-providers")} className="rounded-full bg-[#eef6f3] px-4 py-2 text-sm font-semibold text-[#4f8f83]">Manage</button></div><div className="mt-4 grid gap-3">{displayProviders.map((p) => <div key={p.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[#10241f]/10 bg-white px-4 py-4"><div><p className="font-semibold leading-tight text-[#0b2c34]">{p.name}</p><p className="mt-1 flex items-center gap-2 text-sm text-[#53666a]"><MapPin className="h-3.5 w-3.5" />{p.location}</p></div><span className="shrink-0 rounded-full bg-[#eaf4ef] px-3 py-1 text-sm font-semibold text-[#4f8f83]">{p.match}%</span></div>)}</div></div></div></div><div className="mx-8 mb-8 rounded-[1.5rem] border border-[#dfe7e2] bg-[#fbfaf6] px-6 py-5 text-center text-lg italic text-[#53666a]">“{profile.careName} is likely suitable for home support now. Begin with My Aged Care status, compare local providers, and keep residential planning visible as needs change.”</div></div></section></main>;
}

function AccountProviders({ savedIds, toggleSave }) { const shortlisted = useMemo(() => providers.filter((p) => savedIds.includes(p.id)), [savedIds]); const [showCompare, setShowCompare] = useState(true); return <main className="mx-auto max-w-7xl px-6 py-10"><div className="mb-8"><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Providers</h1><p className="mt-3 text-lg text-[#53666a]">Compare recommended services and build a shortlist that the family can review together.</p></div><Card><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Shortlist</h2><p className="mt-1 text-sm text-[#53666a]">Saved providers appear here and can be compared side by side.</p></div><div className="flex flex-wrap gap-3"><Pill tone="muted">{shortlisted.length} saved</Pill><button onClick={() => setShowCompare((x) => !x)} disabled={shortlisted.length < 2} className={cx("rounded-full px-4 py-2 text-sm font-semibold", shortlisted.length < 2 ? "bg-[#ecefea] text-[#96a29f]" : "bg-[#0b2c34] text-white")}>{showCompare ? "Hide comparison" : "Compare shortlisted"}</button></div></div>{shortlisted.length === 0 ? <div className="mt-5 rounded-2xl bg-[#f8f1e8] p-5 text-[#53666a]">No providers saved yet. Save providers below to build your shortlist.</div> : <div className="mt-5 grid gap-3 md:grid-cols-3">{shortlisted.map((p) => <div key={p.id} className="rounded-2xl bg-[#f8f1e8] p-4"><p className="font-semibold text-[#0b2c34]">{p.name}</p><p className="mt-1 text-sm text-[#53666a]">{p.match}% match · {p.location}</p></div>)}</div>}</Card>{showCompare && shortlisted.length >= 2 && <div className="mt-6"><ComparePanel shortlisted={shortlisted} /></div>}<div className="mt-6 grid gap-5 lg:grid-cols-2">{providers.map((p) => <ProviderDetailCard key={p.id} provider={p} saved={savedIds.includes(p.id)} onSave={toggleSave} />)}</div></main>; }

function AccountCosts({ savedIds, profile }) { const [funding, setFunding] = useState("package"); const [hours, setHours] = useState(12); const recommended = providers.find((p) => savedIds.includes(p.id)) || providers[0]; const totalWeekly = Math.round((hours * 68 + recommended.weeklyEstimate) / 2); const gov = funding === "package" ? Math.round(totalWeekly * .72) : funding === "mixed" ? Math.round(totalWeekly * .38) : 0; const oop = totalWeekly - gov; return <main className="mx-auto max-w-7xl px-6 py-10"><div className="mb-8"><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Costs</h1><p className="mt-3 text-lg text-[#53666a]">Illustrative cost planning for {profile.careName}&apos;s recommended home care pathway.</p></div><div className="grid gap-6 lg:grid-cols-[1fr_.9fr]"><Card><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#4f8f83]">Cost planner</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0b2c34]">Estimate likely support costs</h2></div><Calculator className="h-8 w-8 text-[#4f8f83]" /></div><div className="mt-6 flex flex-wrap gap-3">{[["package", "Public / package-funded"], ["mixed", "Mixed funding"], ["private", "Private pay"]].map(([v, l]) => <button key={v} onClick={() => setFunding(v)} className={cx("rounded-full px-4 py-2 text-sm font-semibold", funding === v ? "bg-[#0b2c34] text-white" : "bg-[#edf2ef] text-[#53666a]")}>{l}</button>)}</div><div className="mt-6"><div className="flex items-center justify-between text-sm text-[#53666a]"><span>Weekly support intensity</span><span>{hours} hrs / week</span></div><input type="range" min="6" max="30" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-4 w-full accent-[#4f8f83]" /></div><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Estimated weekly cost</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${totalWeekly.toLocaleString()}</p></div><div className="rounded-[1.25rem] bg-[#eef6f3] p-4"><p className="text-sm text-[#53666a]">Government / package support</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${(gov * 52).toLocaleString()} / yr</p></div><div className="rounded-[1.25rem] bg-[#fff4e8] p-4"><p className="text-sm text-[#53666a]">Likely out-of-pocket</p><p className="mt-2 text-2xl font-semibold text-[#0b2c34]">${(oop * 52).toLocaleString()} / yr</p></div></div><div className="mt-6 rounded-[1.35rem] border border-[#10241f]/10 bg-white p-5"><div className="flex items-center gap-3"><Landmark className="h-5 w-5 text-[#4f8f83]" /><p className="font-semibold text-[#0b2c34]">Funding split</p></div><div className="mt-4 h-4 overflow-hidden rounded-full bg-[#ecefeb]"><div className="h-full bg-[#4f8f83]" style={{ width: `${(gov / totalWeekly) * 100}%` }} /></div><div className="mt-3 flex items-center justify-between text-sm text-[#53666a]"><span>Government / package contribution</span><span>${gov.toLocaleString()} / wk</span></div><div className="mt-2 flex items-center justify-between text-sm text-[#53666a]"><span>Out-of-pocket contribution</span><span>${oop.toLocaleString()} / wk</span></div></div></Card><Card><div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Recommended cost context</h2><p className="mt-1 text-sm text-[#53666a]">Based on {recommended.name}.</p></div><Wallet className="h-7 w-7 text-[#4f8f83]" /></div><div className="mt-5 grid gap-4"><div className="rounded-[1.25rem] bg-[#f8f1e8] p-4"><p className="text-sm text-[#53666a]">Indicative annual care value</p><p className="mt-2 text-3xl font-semibold text-[#0b2c34]">${(totalWeekly * 52).toLocaleString()}</p></div><div className="rounded-[1.25rem] border border-[#10241f]/10 bg-white p-4"><p className="text-sm text-[#53666a]">What affects the cost most?</p><div className="mt-3 grid gap-2 text-sm text-[#53666a]"><p>• Hours of weekly support required</p><p>• Whether My Aged Care or a package is already approved</p><p>• Clinical or nursing support intensity</p><p>• Provider pricing and travel distance</p></div></div><div className="rounded-[1.25rem] bg-[#eef6f3] p-4"><p className="text-sm text-[#53666a]">Important note</p><p className="mt-2 text-sm leading-7 text-[#53666a]">These figures are indicative planning estimates only. Final public and private costs will vary.</p></div></div></Card></div></main>; }

function AccountFamily({ profile }) { const [messages, setMessages] = useState([{ author: "Sarah", text: "I think HammondCare should be our first call because they are closest.", likes: 2 }, { author: "James", text: "Can we compare Uniting before choosing?", likes: 1 }]); const [draft, setDraft] = useState(""); const [yes, setYes] = useState(2); const [no, setNo] = useState(0); function addMessage() { if (!draft.trim()) return; setMessages([...messages, { author: "You", text: draft, likes: 0 }]); setDraft(""); } return <main className="mx-auto max-w-7xl px-6 py-10"><div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-5xl font-semibold tracking-[-.055em] text-[#0b2c34]">Family</h1><p className="mt-3 text-lg text-[#53666a]">Invite family members, vote on decisions, and keep notes in one place for {profile.careName}.</p></div><button className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0b2c34] px-5 py-3 font-semibold text-white"><UserPlus className="h-4 w-4" />Share family link</button></div><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><Card><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Family members</h2><div className="mt-5 grid gap-3">{familyMembers.map((m) => <div key={m.name} className="flex items-center justify-between rounded-2xl bg-[#f8f1e8] p-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf4ef] font-semibold text-[#4f8f83]">{m.initials}</span><div><p className="font-semibold">{m.name}</p><p className="text-sm text-[#53666a]">{m.role}</p></div></div><Pill tone="muted">{m.status}</Pill></div>)}</div><div className="mt-6 rounded-2xl bg-[#eaf4ef] p-5"><p className="font-semibold text-[#0b2c34]">Poll: should we book a second call with HammondCare?</p><div className="mt-4 flex gap-3"><button onClick={() => setYes(yes + 1)} className="rounded-xl bg-white px-5 py-2 font-semibold text-[#0b2c34]">Yes · {yes}</button><button onClick={() => setNo(no + 1)} className="rounded-xl bg-white px-5 py-2 font-semibold text-[#0b2c34]">No · {no}</button></div></div></Card><Card><h2 className="text-2xl font-semibold tracking-tight text-[#0b2c34]">Notes and comments</h2><div className="mt-5 grid gap-3">{messages.map((m, i) => <div key={i} className="rounded-2xl bg-[#f8f1e8] p-4"><div className="flex items-start justify-between"><p className="font-semibold">{m.author}</p><span className="flex items-center gap-1 text-sm text-[#4f8f83]"><ThumbsUp className="h-4 w-4" />{m.likes}</span></div><p className="mt-2 leading-7 text-[#53666a]">{m.text}</p></div>)}</div><div className="mt-5 flex gap-3"><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a note for the family..." className="flex-1 rounded-2xl border border-[#10241f]/10 bg-white px-4 py-3 outline-none focus:border-[#4f8f83]" /><button onClick={addMessage} className="rounded-2xl bg-[#0b2c34] px-4 py-3 text-white"><Send className="h-4 w-4" /></button></div></Card></div></main>; }

export default function HomePage() {
  const [active, setActive] = useState("home");
  const [profile, setProfile] = useState({ careName: "Margaret", recipientAddress: "Bondi Junction, NSW", familyAddress: "Sydney, NSW", assessorRole: "Daughter" });
  const [savedIds, setSavedIds] = useState([1, 2]);
  const [completed, setCompleted] = useState([0, 1]);
  function toggleSave(id) { setSavedIds((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]); }
  function toggleStep(index) { setCompleted((current) => current.includes(index) ? current.filter((x) => x !== index) : [...current, index]); }

  return <AppFrame><MainNav active={active} setActive={setActive} />{active === "home" && <MarketingHome setActive={setActive} />}{active === "why" && <WhyPage />}{active === "assessment" && <AssessmentPage setActive={setActive} setProfile={setProfile} />}{active === "preview" && <PlanPreview setActive={setActive} profile={profile} />}{active === "account-overview" && <AccountOverview profile={profile} savedIds={savedIds} completed={completed} toggleStep={toggleStep} setActive={setActive} />}{active === "account-providers" && <AccountProviders savedIds={savedIds} toggleSave={toggleSave} />}{active === "account-costs" && <AccountCosts savedIds={savedIds} profile={profile} />}{active === "account-family" && <AccountFamily profile={profile} />}</AppFrame>;
}
