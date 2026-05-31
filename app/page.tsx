"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileHeart,
  HeartHandshake,
  Home,
  LockKeyhole,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  UserPlus,
  Users,
} from "lucide-react";

type View =
  | "Home"
  | "WhyKinHarbour"
  | "Assessment"
  | "PlanPreview"
  | "Account"
  | "AccountProviders"
  | "AccountShortlist"
  | "AccountActions"
  | "AccountFamily";

type SetView = React.Dispatch<React.SetStateAction<View>>;

type Profile = {
  careName: string;
  recipientAddress: string;
  familyAddress: string;
  assessorRole: string;
};

type Question = {
  section: string;
  eyebrow: string;
  title: string;
  helper: string;
  type: "text" | "address" | "single" | "multi";
  placeholder?: string;
  options?: string[];
};

type Provider = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  match: number;
  scores: {
    proximity: number;
    careFit: number;
    reviews: number;
    budget: number;
  };
  tags: string[];
  reasons: string[];
};

type Answers = Record<number, string | string[] | { recipient?: string; family?: string }>;

const topNav = ["How it works", "Why KinHarbour", "Care options", "Costs", "Resources"];

const dashboardModes = {
  "Home Support": {
    stage: "Home Care Assessment",
    chip: "Home Support",
    steps: ["Complete ACAT assessment", "Register with My Aged Care", "Request Home Care Package", "Compare Level 2–3 providers"],
    providers: ["BaptistCare", "HammondCare", "Uniting Care", "COTA Home Care"],
    budget: "$22,000 – $28,000 / yr",
    checklist: "Home Care Checklist (PDF)",
    quote: "Sarah, Melbourne: Mum wants to stay home. Level 2 package likely.",
  },
  "Residential Care": {
    stage: "Residential Placement",
    chip: "Residential Care",
    steps: ["Confirm residential ACAT approval", "Review accommodation funding", "Shortlist 3–5 homes", "Arrange facility tours"],
    providers: ["Regis Aged Care", "Estia Health", "Japara Healthcare", "Bolton Clarke"],
    budget: "$65,000 – $95,000 / yr",
    checklist: "Residential Tour Checklist (PDF)",
    quote: "James, Sydney: Dad needs memory support. Touring 3 homes this week.",
  },
  "Urgent Discharge": {
    stage: "Hospital Discharge Planning",
    chip: "Urgent Discharge",
    steps: ["Speak to discharge planner", "Request urgent ACAT", "Arrange interim home care", "Identify long-term pathway"],
    providers: ["Interim Home Care", "Transition Care Program", "Respite Options", "Care Coordinator"],
    budget: "$1,250 – $2,500 / wk",
    checklist: "Discharge Checklist (PDF)",
    quote: "Tom, Brisbane: Dad discharged Friday. Need an urgent plan by Thursday.",
  },
} as const;

type DashboardMode = keyof typeof dashboardModes;

const whatWeDo = [
  { icon: ClipboardCheck, title: "Answer questions", text: "A calm assessment designed for family carers and older Australians." },
  { icon: FileHeart, title: "Get a recommendation", text: "Understand the likely pathway, costs, urgency and next steps." },
  { icon: Users, title: "Create your plan", text: "Save the report, shortlist providers and share decisions with family." },
];

const reviews = [
  { quote: "It explained everything so clearly, I finally understood what Mum was entitled to.", name: "Sarah, Melbourne", role: "Daughter" },
  { quote: "We were overwhelmed — KinHarbour helped us figure out exactly what to do next.", name: "James, Sydney", role: "Son" },
  { quote: "The assessment took five minutes and the recommendation was spot on for Dad’s situation.", name: "Emily, Brisbane", role: "Daughter" },
];

const challengeStats = [
  { icon: Building2, value: "2,700+", label: "aged care homes and services to compare across Australia", note: "Illustrative sector scale" },
  { icon: Users, value: "95,000", label: "people waiting for home support in late 2025", note: "Indicative waitlist pressure" },
  { icon: Home, value: "83,000", label: "new at-home care packages planned over 2 years", note: "Reform pipeline indicator" },
];

const assessmentSections = [
  { label: "Family context", range: [0, 4] },
  { label: "Care needs", range: [5, 9] },
  { label: "Pathway & priorities", range: [10, 13] },
];

const addressSuggestions = [
  "42 Phillips Street, Bondi Junction NSW 2022",
  "42 Phillips Street, Sydney NSW 2000",
  "42 Phillip Street, Parramatta NSW 2150",
  "42 Phillip Street, St Leonards NSW 2065",
  "14 Ocean Street, Bondi NSW 2026",
  "88 Curlewis Street, Bondi Beach NSW 2026",
  "12 Whistler Street, Manly NSW 2095",
  "5 The Corso, Manly NSW 2095",
  "21 Victoria Avenue, Chatswood NSW 2067",
  "10 Glenferrie Road, Malvern VIC 3144",
  "34 Toorak Road, South Yarra VIC 3141",
  "18 James Street, Fortitude Valley QLD 4006",
  "Regional / not listed",
  "Not sure yet",
];

const assessmentQuestions: Question[] = [
  { section: "Family context", eyebrow: "Care recipient", title: "Who is this care plan for?", helper: "Use their first name if you are comfortable. This helps make the plan feel personal.", type: "text", placeholder: "e.g. Margaret, Dad, Mum" },
  { section: "Family context", eyebrow: "Location", title: "Where should care be centred?", helper: "Start typing an address or suburb for the person needing care, then add where close family or decision-makers are based.", type: "address" },
  { section: "Family context", eyebrow: "Your role", title: "Who is completing this assessment?", helper: "Most assessments are completed by an adult child, partner or family decision-maker.", type: "single", options: ["Son", "Daughter", "Partner", "Family carer", "The person needing care", "Other decision-maker"] },
  { section: "Family context", eyebrow: "Trigger", title: "What is prompting this decision now?", helper: "Select the closest reason. You can refine this later.", type: "single", options: ["Recent fall", "Hospital discharge", "Memory or confusion concerns", "Family can no longer manage", "Planning ahead", "Not sure — we just need guidance"] },
  { section: "Family context", eyebrow: "Current living situation", title: "What best describes their current living situation?", helper: "This helps assess safety, isolation and available informal support.", type: "single", options: ["Living alone", "Living with partner", "Living with family", "Currently in hospital", "Currently in respite", "Not sure"] },
  { section: "Care needs", eyebrow: "Support needs", title: "What kind of support is needed?", helper: "Select all that apply. This builds the support profile used for the recommendation.", type: "multi", options: ["Showering or personal care", "Meals and groceries", "Medication reminders", "Nursing or wound care", "Transport", "Cleaning and home help", "Memory support", "Overnight or 24-hour supervision"] },
  { section: "Care needs", eyebrow: "Mobility", title: "How would you describe their mobility?", helper: "Mobility is one of the strongest indicators of care intensity and urgency.", type: "single", options: ["Independent", "Uses a walking stick", "Uses a walker", "Needs help transferring", "Wheelchair or mostly bed-bound", "Not sure"] },
  { section: "Care needs", eyebrow: "Cognition", title: "Are there memory, confusion or dementia-related concerns?", helper: "This helps decide whether specialised memory support may be relevant.", type: "single", options: ["No major concerns", "Some forgetfulness", "Frequent confusion", "Diagnosed dementia", "Wandering or safety concerns", "Not sure"] },
  { section: "Care needs", eyebrow: "Medical complexity", title: "Are there medical or nursing needs that require regular support?", helper: "This may affect whether home care, respite or residential care is more suitable.", type: "single", options: ["No regular nursing needs", "Medication management", "Wound care or injections", "Multiple chronic conditions", "Palliative or complex care", "Not sure"] },
  { section: "Care needs", eyebrow: "Family capacity", title: "How much support can family realistically provide?", helper: "This is about practical capacity, not love or willingness.", type: "single", options: ["Daily support available", "Several times per week", "Occasional support only", "Family lives interstate", "Family is exhausted or stretched", "Not sure"] },
  { section: "Pathway & priorities", eyebrow: "Urgency", title: "How quickly does a decision need to be made?", helper: "Urgency changes the recommended next steps and whether interim care is needed.", type: "single", options: ["Planning ahead", "Within 1–3 months", "This month", "This week", "Next 72 hours", "Not sure"] },
  { section: "Pathway & priorities", eyebrow: "Preferred setting", title: "Which care setting are you currently considering?", helper: "It is okay to be unsure — that is one of the reasons KinHarbour exists.", type: "single", options: ["Home care package", "Short-term respite", "Residential aged care", "Hospital discharge / transition care", "We want to keep them at home", "Not sure"] },
  { section: "Pathway & priorities", eyebrow: "Funding status", title: "What is their current funding or My Aged Care status?", helper: "Choose the closest option. Many families are unsure at this stage.", type: "single", options: ["Not registered with My Aged Care", "Registered but no assessment yet", "ACAT assessment booked", "Home Care Package approved", "Residential care approved", "I don’t know / not sure"] },
  { section: "Pathway & priorities", eyebrow: "Priorities", title: "What matters most in the care decision?", helper: "Select the priorities the family will care about most when comparing options.", type: "multi", options: ["Staying close to home", "Keeping costs manageable", "Dementia or memory support", "Clinical care quality", "Cultural or language fit", "Availability now", "Family visibility", "Warmth and dignity"] },
];

const providers: Provider[] = [
  {
    id: 1,
    name: "Eastern Suburbs HammondCare Home Care",
    location: "Bondi Junction, NSW",
    rating: 4.7,
    reviews: 89,
    price: "Package-funded",
    match: 91,
    scores: { proximity: 92, careFit: 96, reviews: 88, budget: 94 },
    tags: ["Dementia care", "Clinical support", "Home care"],
    reasons: ["Closest provider geographically", "Strong care fit for safety needs"],
  },
  {
    id: 2,
    name: "Uniting Waverley Home Support",
    location: "Waverley, NSW",
    rating: 4.4,
    reviews: 74,
    price: "$260–$440/week",
    match: 84,
    scores: { proximity: 82, careFit: 91, reviews: 78, budget: 88 },
    tags: ["Respite", "Home support", "Transport"],
    reasons: ["Good ratings and availability", "Budget fit appears manageable"],
  },
  {
    id: 3,
    name: "BaptistCare At Home Eastern Sydney",
    location: "Randwick, NSW",
    rating: 4.6,
    reviews: 121,
    price: "$300–$520/week",
    match: 78,
    scores: { proximity: 68, careFit: 89, reviews: 90, budget: 76 },
    tags: ["Nursing", "Personal care", "Meal support"],
    reasons: ["Strong clinical capability", "Slightly weaker proximity fit"],
  },
];

const initialActions = [
  "Register or confirm status with My Aged Care",
  "Book or review ACAT assessment",
  "Prepare medication and medical history summary",
  "Compare recommended providers",
  "Shortlist 2–3 preferred services",
  "Share plan with family members",
  "Book first provider call or tour",
];

const familyMembers = [
  { name: "Sarah", role: "Primary carer", status: "Active" },
  { name: "James", role: "Son", status: "Active" },
  { name: "Emily", role: "Daughter", status: "Invited" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getStringAnswer(value: Answers[number], fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getAddressAnswer(value: Answers[number]) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return {} as { recipient?: string; family?: string };
}

function KinHarbourIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M13.5 38.5C11.1 27.2 17.8 17.3 29.2 11.5c2.5 9.9.3 20.7-7.1 28.1-2.3 2.3-5.1 4-8.6 5.1Z" fill="#0b2c34" />
      <path d="M18.5 42.7c10.5-15.3 22-25.2 34.6-29.5.9 11.5-5.3 21.8-16 27-5.6 2.7-11.7 3.5-18.6 2.5Z" fill="#75aaa0" />
      <path d="M24.1 50.1c8.4-12.4 17.9-19.6 28.4-21.6-.6 9.7-6.4 17.7-15.2 21.2-4.1 1.6-8.4 1.8-13.2.4Z" fill="#4f8f83" />
      <path d="M15 40.4c10.4-8 21.3-14.4 36.2-23.1" stroke="#d5e8df" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M23.8 49.1c7.9-6.9 16-12.2 27-18.3" stroke="#d5e8df" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M13.2 40.8c1.9 5.9 6.5 9.7 13.8 11.6" stroke="#0b2c34" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function TopNav({ active, setActive }: { active: View; setActive: SetView }) {
  const accountViews: View[] = ["Account", "AccountProviders", "AccountShortlist", "AccountActions", "AccountFamily"];
  const inAccount = accountViews.includes(active);
  const accountTabs: Array<[View, string]> = [
    ["Account", "Care plan"],
    ["AccountProviders", "Providers"],
    ["AccountShortlist", "Shortlist"],
    ["AccountActions", "Action plan"],
    ["AccountFamily", "Family"],
  ];

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <button onClick={() => setActive("Home")} className="flex items-center gap-2 text-[#0b2c34]">
        <KinHarbourIcon />
        <div className="text-left text-xl font-semibold tracking-tight">KinHarbour</div>
      </button>

      {inAccount ? (
        <div className="hidden rounded-full border border-white/70 bg-white/60 p-1 shadow-sm backdrop-blur-xl lg:flex">
          {accountTabs.map(([id, label]) => (
            <button key={id} onClick={() => setActive(id)} className={cx("rounded-full px-4 py-2 text-sm font-semibold transition", active === id ? "bg-[#0b2c34] text-white" : "text-[#53666a] hover:bg-white")}>
              {label}
            </button>
          ))}
        </div>
      ) : (
        <div className="hidden items-center gap-7 text-sm font-semibold text-[#53666a] lg:flex">
          {topNav.map((item) => (
            <button key={item} onClick={() => (item === "Why KinHarbour" ? setActive("WhyKinHarbour") : setActive("Home"))} className="transition hover:text-[#0b2c34]">
              {item}
            </button>
          ))}
        </div>
      )}

      <button onClick={() => (inAccount ? setActive("Account") : setActive("Assessment"))} className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-5 py-3 text-sm font-semibold !text-white shadow-2xl shadow-slate-950/15 transition hover:-translate-y-0.5">
        {inAccount ? "My account" : "Begin Assessment"} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function DashboardPreview() {
  const [mode, setMode] = useState<DashboardMode>("Home Support");
  const data = dashboardModes[mode];

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative origin-center scale-[0.88] lg:origin-left">
      <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-start">
        {(Object.keys(dashboardModes) as DashboardMode[]).map((item) => (
          <button key={item} onClick={() => setMode(item)} className={cx("rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-tight transition", mode === item ? "border-[#0b2c34] bg-[#0b2c34] text-white shadow-lg shadow-slate-950/15" : "border-[#d9dfda] bg-white/72 text-[#53666a] hover:bg-white")}>
            {item}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-[620px] rounded-[2rem] border border-white/70 bg-white/68 p-3 shadow-[0_28px_90px_rgba(61,45,28,.14)] backdrop-blur-2xl lg:mx-0">
        <div className="overflow-hidden rounded-[1.65rem] bg-white">
          <div className="flex items-center justify-between bg-[#0b2c34] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12"><ShieldCheck className="h-4 w-4" /></span>
              <p className="font-semibold">Family Decision Dashboard</p>
            </div>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/80">{data.chip}</span>
          </div>

          <div className="p-6">
            <div className="rounded-[1.5rem] bg-[#f4efe7] p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dfe9df]"><BarChart3 className="h-5 w-5 text-[#5e9d9c]" /></span>
                <div>
                  <p className="text-sm text-[#63747a]">Current Stage</p>
                  <h3 className="text-xl font-semibold tracking-tight">{data.stage}</h3>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_.95fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#89a697]">Recommended next steps</p>
                <div className="mt-3 grid gap-2">
                  {data.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 text-sm">
                      <span className={cx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", index === 0 ? "bg-[#69aaa8] text-white" : "bg-[#ecf0ef] text-[#53666a]")}>{index + 1}</span>
                      <span className={index === 0 ? "font-semibold text-[#10241f]" : "text-[#53666a]"}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#89a697]">Shortlisted providers</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.providers.map((provider) => <span key={provider} className="rounded-full bg-[#edf1ef] px-3 py-1.5 text-xs font-semibold text-[#0b2c34]">{provider}</span>)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-[1.35rem] bg-[#f4f5f4] p-4">
                <p className="text-sm text-[#63747a]">Budget Estimate</p>
                <p className="mt-1 text-lg font-semibold text-[#a57b41]">{data.budget}</p>
              </div>
              <div className="rounded-[1.35rem] bg-[#eff5f4] p-4">
                <div className="flex items-center gap-3 text-[#4f8b8a]"><Download className="h-4 w-4" /><p className="font-semibold">Download Checklist</p></div>
                <p className="mt-1 text-sm text-[#63747a]">{data.checklist}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-[#dde5e1] bg-white px-5 py-4 text-sm italic text-[#53666a]">“{data.quote}”</div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[#93a09b] lg:text-left">Illustrative snapshot of what your dashboard may show after completing an assessment.</p>
    </motion.div>
  );
}

function HomeView({ setActive }: { setActive: SetView }) {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl gap-8 px-6 pb-24 pt-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-4 py-2 text-sm font-semibold text-[#4d8d8b] shadow-sm backdrop-blur-xl"><Sparkles className="h-4 w-4 text-[#4d8d8b]" /> Built for Australian families</div>
          <h1 className="max-w-4xl text-[3.8rem] font-semibold leading-[0.92] tracking-[-0.065em] md:text-[5.65rem]">Find the right aged care path, <span className="text-[#5d9691]">step by step.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#62756e]">KinHarbour brings aged care guidance, likely costs, a shared family planner and personalised recommendations into one all-in-one place.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setActive("Assessment")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b2c34] px-6 py-3.5 text-sm font-semibold !text-white shadow-2xl shadow-slate-950/15 transition hover:-translate-y-1">Begin Assessment <ArrowRight className="h-4 w-4" /></button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0b2c34] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#0b2c34] transition hover:-translate-y-1 hover:bg-white/70">Book a Strategy Call</button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#7c8c87]">
            {["Independent guidance", "Australian-built", "Designed for overwhelmed families, not experts"].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#5d9691]" />{item}</div>)}
          </div>
        </motion.div>
        <DashboardPreview />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 pt-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="mb-8 text-center"><p className="text-sm font-bold uppercase tracking-[0.22em] text-[#89a697]">What we do</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Simple, personal, shareable guidance.</h2></div>
          <div className="grid gap-7 md:grid-cols-3">
            {whatWeDo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative rounded-[1.7rem] border border-[#dfe7e2] bg-white/80 p-6 shadow-[0_14px_42px_rgba(61,45,28,.08)]">
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#dfe7e2] bg-white text-xs font-bold text-[#53666a]">{index + 1}</div>
                  <div className="flex items-start gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-6 w-6 text-[#5d9691]" /></span><div><h3 className="text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-2 leading-7 text-[#62756e]">{item.text}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[#eef6f3]/80 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:items-center">
            <div><h2 className="text-4xl font-semibold leading-[1] tracking-[-0.05em]">Trusted by Australian families</h2><p className="mt-4 leading-7 text-[#62756e]">Designed for elderly Australians and the families who care for them.</p><div className="mt-6 flex items-end gap-3"><span className="text-4xl font-semibold">4.9</span><span className="pb-1 text-lg tracking-[0.18em] text-[#b88745]">★★★★★</span></div><p className="mt-1 text-sm text-[#62756e]">from Australian family feedback</p></div>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => <div key={review.name} className="rounded-[1.6rem] border border-white/70 bg-white/86 p-6 shadow-[0_14px_42px_rgba(61,45,28,.08)]"><div className="mb-4 flex items-center justify-between"><span className="text-3xl leading-none text-[#5d9691]">“</span><span className="text-sm tracking-[0.16em] text-[#b88745]">★★★★★</span></div><p className="min-h-[108px] text-[15px] italic leading-7 text-[#43565c]">“{review.quote}”</p><div className="mt-5 border-t border-[#e7ede9] pt-4"><p className="font-semibold">{review.name}</p><p className="text-sm text-[#62756e]">{review.role}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AddressAutocomplete({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    if (!query.trim()) return addressSuggestions.slice(0, 4);
    return addressSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  return (
    <div className="relative rounded-[1.6rem] border border-[#dfe7e2] bg-[#fffaf2] p-5 shadow-sm">
      <label className="text-sm font-semibold text-[#62756e]">{label}</label>
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange(event.target.value);
          setOpen(true);
        }}
        placeholder="Start typing an address or suburb..."
        className="mt-3 w-full rounded-2xl border border-[#dfe7e2] bg-white px-4 py-4 text-lg font-semibold text-[#10241f] outline-none transition focus:border-[#5d9691]"
      />
      {open && (
        <div className="absolute left-5 right-5 top-[116px] z-20 overflow-hidden rounded-2xl border border-[#dfe7e2] bg-white shadow-xl">
          {matches.map((item) => (
            <button
              key={item}
              onMouseDown={() => {
                setQuery(item);
                onChange(item);
                setOpen(false);
              }}
              className="flex w-full items-start gap-3 border-b border-[#edf1ef] px-4 py-3 text-left text-sm font-semibold text-[#43565c] last:border-b-0 hover:bg-[#f8f1e8]"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5d9691]" />{item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AssessmentView({ setActive, setProfile }: { setActive: SetView; setProfile: React.Dispatch<React.SetStateAction<Profile>> }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const q = assessmentQuestions[step];
  const progress = Math.round(((step + 1) / assessmentQuestions.length) * 100);
  const activeSection = assessmentSections.find((section) => step >= section.range[0] && step <= section.range[1])?.label;

  function selectOption(option: string) {
    setAnswers((current) => {
      if (q.type === "multi") {
        const existing = Array.isArray(current[step]) ? (current[step] as string[]) : [];
        return { ...current, [step]: existing.includes(option) ? existing.filter((item) => item !== option) : [...existing, option] };
      }
      return { ...current, [step]: option };
    });
  }

  function finishAssessment() {
    const address = getAddressAnswer(answers[1]);
    setProfile({
      careName: getStringAnswer(answers[0], "Margaret"),
      recipientAddress: address.recipient || "Bondi Junction, NSW",
      familyAddress: address.family || "Sydney, NSW",
      assessorRole: getStringAnswer(answers[2], "Daughter"),
    });
    setActive("PlanPreview");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-8">
      <section className="rounded-[2.4rem] border border-white/70 bg-white/64 p-6 shadow-[0_28px_90px_rgba(61,45,28,.10)] backdrop-blur-2xl md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#89a697]">Assessment</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.055em] md:text-5xl">Build your care plan.</h1></div><div className="rounded-full bg-[#eaf4ef] px-4 py-2 text-sm font-semibold text-[#4d8d8b]">{progress}% complete</div></div>
        <div className="mt-7 h-3 overflow-hidden rounded-full bg-[#efe2d0]"><div className="h-full rounded-full bg-[#0b2c34] transition-all" style={{ width: `${progress}%` }} /></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {assessmentSections.map((section, index) => (
            <div key={section.label} className={cx("rounded-2xl border p-4 transition", activeSection === section.label ? "border-[#0b2c34] bg-[#0b2c34] text-white" : step > section.range[1] ? "border-[#dce7e2] bg-[#eef6f3] text-[#0b2c34]" : "border-[#e3e5dd] bg-white/70 text-[#62756e]")}><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.18em]">0{index + 1}</span>{step > section.range[1] && <Check className="h-4 w-4" />}</div><p className="mt-2 font-semibold">{section.label}</p></div>
          ))}
        </div>
      </section>

      <motion.section key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[2.4rem] border border-white/70 bg-white/74 p-7 shadow-[0_28px_90px_rgba(61,45,28,.11)] backdrop-blur-2xl md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#bd8055]">{q.eyebrow}</p><h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.055em] md:text-5xl">{q.title}</h2><p className="mt-4 max-w-2xl leading-7 text-[#62756e]">{q.helper}</p></div><p className="rounded-full bg-[#f8f1e8] px-4 py-2 text-sm font-semibold text-[#62756e]">Question {step + 1} of {assessmentQuestions.length}</p></div>

        {q.type === "text" && (
          <input value={getStringAnswer(answers[step])} onChange={(event) => setAnswers((current) => ({ ...current, [step]: event.target.value }))} placeholder={q.placeholder} className="mt-8 w-full rounded-[1.5rem] border border-[#dfe7e2] bg-[#fffaf2] px-5 py-5 text-xl outline-none transition focus:border-[#5d9691] focus:bg-white" />
        )}

        {q.type === "address" && (
          <div className="mt-8 grid gap-20 md:grid-cols-2">
            <AddressAutocomplete label="Person needing care" value={getAddressAnswer(answers[step]).recipient || ""} onChange={(value) => setAnswers((current) => ({ ...current, [step]: { ...getAddressAnswer(current[step]), recipient: value } }))} />
            <AddressAutocomplete label="Close family or decision-maker" value={getAddressAnswer(answers[step]).family || ""} onChange={(value) => setAnswers((current) => ({ ...current, [step]: { ...getAddressAnswer(current[step]), family: value } }))} />
          </div>
        )}

        {(q.type === "single" || q.type === "multi") && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(q.options || []).map((option) => {
              const currentValue = answers[step];
              const selected = q.type === "multi" ? Array.isArray(currentValue) && currentValue.includes(option) : currentValue === option;
              return (
                <button key={option} onClick={() => selectOption(option)} className={cx("group rounded-[1.6rem] border p-5 text-left shadow-sm transition hover:-translate-y-1", selected ? "border-[#0b2c34] bg-[#0b2c34] text-white shadow-xl shadow-slate-950/15" : "border-[#dfe7e2] bg-[#fffaf2] text-[#10241f] hover:border-[#5d9691] hover:bg-white")}>
                  <div className="flex items-center justify-between gap-4"><span className="text-lg font-semibold tracking-tight">{option}</span><span className={cx("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", selected ? "bg-white/15 text-white" : "bg-[#dfe9df] text-[#0b2c34]")}>{selected ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span></div>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-9 flex justify-between border-t border-[#e6ebe7] pt-6">
          <button onClick={() => setStep(Math.max(0, step - 1))} className="inline-flex items-center gap-2 rounded-full border border-[#0b2c34]/10 bg-white px-5 py-3 font-semibold text-[#0b2c34]"><ChevronLeft className="h-4 w-4" /> Back</button>
          <button onClick={() => (step === assessmentQuestions.length - 1 ? finishAssessment() : setStep(step + 1))} className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-6 py-3 font-semibold !text-white shadow-xl shadow-slate-950/15">{step === assessmentQuestions.length - 1 ? "Generate personalised plan" : "Continue"}<ArrowRight className="h-4 w-4" /></button>
        </div>
      </motion.section>
    </main>
  );
}

function PlanPreviewView({ setActive, profile }: { setActive: SetView; profile: Profile }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="rounded-[2.6rem] border border-white/70 bg-white/72 p-8 shadow-[0_32px_100px_rgba(61,45,28,.13)] backdrop-blur-2xl md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-[#eaf4ef] px-4 py-2 text-sm font-semibold text-[#4d8d8b]"><Sparkles className="h-4 w-4" /> Personalised plan generated</div>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-6xl">{profile.careName}&apos;s likely pathway is home care services with residential planning.</h1>
            <p className="mt-6 text-lg leading-8 text-[#62756e]">Based on your answers, KinHarbour has prepared a high-level care direction. Create an account to unlock the full report, next steps, family dashboard and provider shortlist.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setActive("Account")} className="rounded-full bg-[#0b2c34] px-6 py-3.5 font-semibold !text-white">Create account to unlock plan</button>
              <button onClick={() => setActive("Assessment")} className="rounded-full border border-[#0b2c34] px-6 py-3.5 font-semibold text-[#0b2c34]">Edit answers</button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe7e2] bg-white p-5 shadow-xl">
            <div className="rounded-[1.5rem] bg-[#0b2c34] p-5 text-white"><p className="text-sm font-semibold text-white/60">Hero recommendation</p><div className="mt-4 flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><Home className="h-7 w-7" /></span><div><h2 className="text-3xl font-semibold tracking-tight">Home care services</h2><p className="mt-1 text-white/70">Likely suitable as a starting pathway.</p></div></div></div>
            <div className="mt-4 grid select-none gap-3 blur-[5px] pointer-events-none">{["Detailed care reasoning", "Risk flags and urgency rating", "Provider shortlist", "Funding and document checklist", "Family discussion prompts"].map((item) => <div key={item} className="rounded-2xl bg-[#f8f1e8] p-4 font-semibold text-[#43565c]">{item}</div>)}</div>
            <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/70 bg-white/82 p-5 text-center shadow-xl backdrop-blur-xl"><LockKeyhole className="mx-auto h-6 w-6 text-[#5d9691]" /><p className="mt-2 font-semibold">Create an account to view the full personalised plan.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ScoreBar({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm"><span className="text-[#53666a]">{icon} {label}</span><span className="font-semibold text-[#10241f]">{value}%</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e9eeee]"><div className="h-full rounded-full bg-[#6fa6a0]" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function ProviderCard({ provider, saved, onSave }: { provider: Provider; saved: boolean; onSave: (id: number) => void }) {
  return (
    <article className="rounded-[1.8rem] border border-[#dfe7e2] bg-white/88 p-6 shadow-[0_14px_42px_rgba(61,45,28,.08)]">
      <div className="flex items-start justify-between gap-5">
        <div><h3 className="text-2xl font-semibold tracking-tight">{provider.name}</h3><p className="mt-2 flex items-center gap-2 text-[#53666a]"><MapPin className="h-4 w-4" /> {provider.location} <span className="text-[#b88745]">★ {provider.rating} ({provider.reviews})</span></p><p className="mt-3 inline-flex rounded-full bg-[#edf1ef] px-3 py-1 text-sm font-semibold text-[#53666a]">{provider.price}</p></div>
        <div className="grid h-20 w-20 place-items-center rounded-full border-[7px] border-[#7aac9c] bg-[#f8f1e8]"><div className="text-center"><p className="text-xl font-bold">{provider.match}%</p><p className="text-xs text-[#53666a]">match</p></div></div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2"><ScoreBar label="Proximity" value={provider.scores.proximity} icon="📍" /><ScoreBar label="Care fit" value={provider.scores.careFit} icon="🩺" /><ScoreBar label="Reviews" value={provider.scores.reviews} icon="⭐" /><ScoreBar label="Budget fit" value={provider.scores.budget} icon="💰" /></div>
      <div className="mt-5 flex flex-wrap gap-2">{provider.tags.map((tag) => <span key={tag} className="rounded-full bg-[#eef6f3] px-3 py-1 text-sm font-semibold text-[#4f8b8a]">{tag}</span>)}</div>
      <div className="mt-4 grid gap-1 text-sm text-[#53666a]">{provider.reasons.map((reason) => <p key={reason}>✓ {reason}</p>)}</div>
      <div className="mt-5 flex flex-wrap gap-3"><button onClick={() => onSave(provider.id)} className={cx("inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold", saved ? "border-[#0b2c34] bg-[#0b2c34] !text-white" : "border-[#dfe7e2] bg-white text-[#0b2c34]")}><HeartHandshake className="h-4 w-4" /> {saved ? "Saved" : "Save"}</button><button className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-[#53666a]"><ChevronRight className="h-4 w-4" /> More info</button><button className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-[#53666a]"><Phone className="h-4 w-4" /> Call</button><button className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-[#53666a]"><ArrowRight className="h-4 w-4" /> Website</button></div>
    </article>
  );
}

function AccountShell({ activeTab, setActive, profile, children }: { activeTab: View; setActive: SetView; profile: Profile; children: React.ReactNode }) {
  const tabs: Array<[View, string]> = [["Account", "Overview"], ["AccountProviders", "Matched providers"], ["AccountShortlist", "Shortlist"], ["AccountActions", "Action plan"], ["AccountFamily", "Family"]];
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-6">
      <div className="mb-6 rounded-[2.3rem] border border-white/70 bg-white/64 p-7 shadow-[0_22px_70px_rgba(61,45,28,.10)] backdrop-blur-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#89a697]">KinHarbour account</p><h1 className="mt-3 text-4xl font-semibold leading-[1] tracking-[-0.055em] md:text-5xl">Care Plan for {profile.careName}</h1><p className="mt-3 text-[#62756e]">Primary carer: {profile.assessorRole === "The person needing care" ? profile.careName : `Sarah · ${profile.assessorRole}`}</p></div><div className="rounded-full bg-[#eaf4ef] px-4 py-2 text-sm font-semibold text-[#4d8d8b]">Home care services recommended</div></div>
        <div className="mt-6 flex flex-wrap gap-2">{tabs.map(([id, label]) => <button key={id} onClick={() => setActive(id)} className={cx("rounded-full px-4 py-2 text-sm font-semibold transition", activeTab === id ? "bg-[#0b2c34] !text-white" : "bg-white/75 text-[#53666a] hover:bg-white")}>{label}</button>)}</div>
      </div>
      {children}
    </main>
  );
}

function RecommendationSnapshot({ profile, completed, actionTotal, shortlistCount }: { profile: Profile; completed: number; actionTotal: number; shortlistCount: number }) {
  const pct = Math.round((completed / actionTotal) * 100);
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_54px_rgba(61,45,28,.09)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.22em] text-[#89a697]">High-level recommendation</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Home care services, with residential planning on watch.</h2><p className="mt-3 max-w-2xl leading-7 text-[#62756e]">{profile.careName} appears suitable for home support now, but the family should prepare documentation and compare providers early.</p></div><div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-[8px] border-[#75aaa0] bg-[#f8f1e8]"><div className="text-center"><p className="text-2xl font-bold">87%</p><p className="text-xs text-[#53666a]">confidence</p></div></div></div>
      <div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#f8f1e8] p-4"><p className="text-sm text-[#62756e]">Current stage</p><p className="mt-1 font-semibold">Assessment complete</p></div><div className="rounded-2xl bg-[#f8f1e8] p-4"><p className="text-sm text-[#62756e]">Action plan</p><p className="mt-1 font-semibold">{completed} of {actionTotal} complete</p><div className="mt-2 h-2 rounded-full bg-[#e2e9e5]"><div className="h-full rounded-full bg-[#0b2c34]" style={{ width: `${pct}%` }} /></div></div><div className="rounded-2xl bg-[#f8f1e8] p-4"><p className="text-sm text-[#62756e]">Shortlisted providers</p><p className="mt-1 font-semibold">{shortlistCount || "None yet"}</p></div></div>
    </section>
  );
}

function AccountOverview({ setActive, profile, savedProviders, completedActions, toggleSave }: { setActive: SetView; profile: Profile; savedProviders: number[]; completedActions: number[]; toggleSave: (id: number) => void }) {
  return (
    <AccountShell activeTab="Account" setActive={setActive} profile={profile}>
      <div className="grid gap-6 lg:grid-cols-[1fr_.78fr]">
        <RecommendationSnapshot profile={profile} completed={completedActions.length} actionTotal={initialActions.length} shortlistCount={savedProviders.length} />
        <section className="rounded-[2rem] border border-white/70 bg-[#0b2c34] p-6 text-white shadow-xl"><p className="text-sm font-semibold text-white/60">Recommended next steps</p><div className="mt-5 grid gap-3">{initialActions.slice(0, 4).map((item, index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12 text-sm font-bold">{index + 1}</span><p className="font-semibold">{item}</p></div>)}</div><button onClick={() => setActive("AccountActions")} className="mt-5 rounded-full bg-white px-5 py-3 font-semibold text-[#0b2c34]">Open action plan</button></section>
      </div>
      <section className="mt-6"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-3xl font-semibold tracking-tight">Matched home care / support options</h2><p className="mt-1 text-[#62756e]">Sorted by alignment with your assessment answers.</p></div><button onClick={() => setActive("AccountProviders")} className="rounded-full border border-[#dfe7e2] bg-white px-4 py-2 font-semibold text-[#0b2c34]">View all</button></div><div className="grid gap-5 lg:grid-cols-2">{providers.slice(0, 2).map((provider) => <ProviderCard key={provider.id} provider={provider} saved={savedProviders.includes(provider.id)} onSave={toggleSave} />)}</div></section>
    </AccountShell>
  );
}

function AccountProviders({ setActive, profile, savedProviders, toggleSave }: { setActive: SetView; profile: Profile; savedProviders: number[]; toggleSave: (id: number) => void }) {
  return (
    <AccountShell activeTab="AccountProviders" setActive={setActive} profile={profile}>
      <div className="mb-5"><h2 className="text-3xl font-semibold tracking-tight">Matched Home Care / Support at Home options</h2><p className="mt-2 text-[#62756e]">Sorted by alignment with {profile.careName}&apos;s needs, location, budget and family priorities.</p></div>
      <div className="grid gap-5 lg:grid-cols-2">{providers.map((provider) => <ProviderCard key={provider.id} provider={provider} saved={savedProviders.includes(provider.id)} onSave={toggleSave} />)}</div>
    </AccountShell>
  );
}

function AccountShortlist({ setActive, profile, savedProviders, toggleSave }: { setActive: SetView; profile: Profile; savedProviders: number[]; toggleSave: (id: number) => void }) {
  const shortlisted = providers.filter((p) => savedProviders.includes(p.id));
  return (
    <AccountShell activeTab="AccountShortlist" setActive={setActive} profile={profile}>
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm">
        <h2 className="text-3xl font-semibold tracking-tight">Shortlisted provider comparison</h2>
        <p className="mt-2 text-[#62756e]">Saved services appear here so the family can compare options centrally.</p>
        {shortlisted.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-[#f8f1e8] p-6 text-[#62756e]">No providers saved yet. Save preferred services from the matched providers page.</div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
              <thead className="text-sm text-[#62756e]"><tr><th>Provider</th><th>Match</th><th>Proximity</th><th>Care fit</th><th>Reviews</th><th>Budget</th><th aria-label="Actions" /></tr></thead>
              <tbody>{shortlisted.map((p) => <tr key={p.id} className="bg-[#f8f1e8]"><td className="rounded-l-2xl p-4 font-semibold">{p.name}<p className="text-sm font-normal text-[#62756e]">{p.location}</p></td><td>{p.match}%</td><td>{p.scores.proximity}%</td><td>{p.scores.careFit}%</td><td>{p.rating} ★</td><td>{p.scores.budget}%</td><td className="rounded-r-2xl"><button onClick={() => toggleSave(p.id)} className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#0b2c34]">Remove</button></td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </AccountShell>
  );
}

function AccountActions({ setActive, profile, completedActions, toggleAction }: { setActive: SetView; profile: Profile; completedActions: number[]; toggleAction: (index: number) => void }) {
  const pct = Math.round((completedActions.length / initialActions.length) * 100);
  return (
    <AccountShell activeTab="AccountActions" setActive={setActive} profile={profile}>
      <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-semibold tracking-tight">Interactive action plan</h2><p className="mt-2 text-[#62756e]">Tick off each step to update the progress snapshot across the account.</p></div><div className="rounded-full bg-[#eaf4ef] px-4 py-2 font-semibold text-[#4d8d8b]">{completedActions.length} of {initialActions.length} complete</div></div><div className="mt-5 h-3 rounded-full bg-[#e4ebe7]"><div className="h-full rounded-full bg-[#0b2c34] transition-all" style={{ width: `${pct}%` }} /></div><div className="mt-6 grid gap-3">{initialActions.map((item, index) => { const done = completedActions.includes(index); return <button key={item} onClick={() => toggleAction(index)} className={cx("flex items-center gap-4 rounded-2xl border p-4 text-left transition", done ? "border-[#5d9691] bg-[#eaf4ef]" : "border-[#dfe7e2] bg-[#fffaf2] hover:bg-white")}><span className={cx("flex h-9 w-9 items-center justify-center rounded-full font-bold", done ? "bg-[#0b2c34] text-white" : "bg-white text-[#53666a]")}>{done ? <Check className="h-4 w-4" /> : index + 1}</span><span className="font-semibold">{item}</span></button>; })}</div></section>
    </AccountShell>
  );
}

function AccountFamily({ setActive, profile }: { setActive: SetView; profile: Profile }) {
  const [messages, setMessages] = useState([
    { author: "Sarah", text: "I think we should call HammondCare first because they are closest.", likes: 2 },
    { author: "James", text: "Can we also compare Uniting before locking anything in?", likes: 1 },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [yes, setYes] = useState(2);
  const [no, setNo] = useState(0);

  function sendMessage() {
    if (!newMessage.trim()) return;
    setMessages((current) => [...current, { author: "You", text: newMessage, likes: 0 }]);
    setNewMessage("");
  }

  return (
    <AccountShell activeTab="AccountFamily" setActive={setActive} profile={profile}>
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold tracking-tight">Family access</h2><button className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-4 py-2 text-sm font-semibold !text-white"><UserPlus className="h-4 w-4" /> Share link</button></div><div className="mt-5 grid gap-3">{familyMembers.map((member) => <div key={member.name} className="flex items-center justify-between rounded-2xl bg-[#f8f1e8] p-4"><div><p className="font-semibold">{member.name}</p><p className="text-sm text-[#62756e]">{member.role}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#4f8b8a]">{member.status}</span></div>)}</div><div className="mt-6 rounded-2xl bg-[#eaf4ef] p-4"><p className="font-semibold">Poll: should we book a second call with HammondCare?</p><div className="mt-4 flex gap-3"><button onClick={() => setYes(yes + 1)} className="rounded-full bg-white px-4 py-2 font-semibold text-[#0b2c34]">Yes · {yes}</button><button onClick={() => setNo(no + 1)} className="rounded-full bg-white px-4 py-2 font-semibold text-[#0b2c34]">No · {no}</button></div></div></section>
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm"><h2 className="text-2xl font-semibold tracking-tight">Family notes and comments</h2><div className="mt-5 grid gap-3">{messages.map((message, index) => <div key={`${message.author}-${index}`} className="rounded-2xl bg-[#f8f1e8] p-4"><div className="flex items-start justify-between"><p className="font-semibold">{message.author}</p><span className="flex items-center gap-1 text-sm text-[#4f8b8a]"><ThumbsUp className="h-4 w-4" /> {message.likes}</span></div><p className="mt-2 leading-7 text-[#53666a]">{message.text}</p></div>)}</div><div className="mt-5 flex gap-3"><input value={newMessage} onChange={(event) => setNewMessage(event.target.value)} placeholder="Add a note for the family..." className="flex-1 rounded-2xl border border-[#dfe7e2] bg-white px-4 py-3 outline-none" /><button onClick={sendMessage} className="rounded-2xl bg-[#0b2c34] px-4 py-3 !text-white"><Send className="h-4 w-4" /></button></div></section>
      </div>
    </AccountShell>
  );
}

function WhyKinHarbourView() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-4 py-2 text-sm font-semibold text-[#4d8d8b] shadow-sm backdrop-blur-xl"><Sparkles className="h-4 w-4" /> Why KinHarbour</div><h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">When care becomes urgent, most families have <span className="text-[#5d9691]">no clear starting point.</span></h1><p className="mt-7 max-w-2xl text-xl leading-9 text-[#62756e]">The aged care system is complex, fragmented, and overwhelming — especially when decisions need to happen fast.</p></motion.div>
        <div className="rounded-[2rem] border border-white/70 bg-white/62 p-6 shadow-[0_24px_72px_rgba(61,45,28,.10)] backdrop-blur-xl"><h2 className="text-2xl font-semibold tracking-tight">The challenge</h2><div className="mt-6 grid gap-4">{challengeStats.map((stat) => { const Icon = stat.icon; return <div key={stat.value} className="grid gap-4 rounded-[1.5rem] bg-[#f8f1e8]/80 p-5 md:grid-cols-[56px_130px_1fr] md:items-center"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-5 w-5 text-[#5d9691]" /></span><p className="text-3xl font-semibold tracking-tight">{stat.value}</p><div><p className="font-medium leading-6 text-[#43565c]">{stat.label}</p><p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#91a19b]">{stat.note}</p></div></div>; })}</div><p className="mt-4 text-xs text-[#91a19b]">Illustrative Australian aged-care indicators.</p></div>
      </section>
    </main>
  );
}

export default function HomePage() {
  const [active, setActive] = useState<View>("Home");
  const [profile, setProfile] = useState<Profile>({ careName: "Margaret", recipientAddress: "Bondi Junction, NSW", familyAddress: "Sydney, NSW", assessorRole: "Daughter" });
  const [savedProviders, setSavedProviders] = useState<number[]>([]);
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  function toggleSave(id: number) {
    setSavedProviders((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleAction(index: number) {
    setCompletedActions((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return (
    <main className="kh-shell min-h-screen overflow-hidden bg-[#f8f1e8] text-[#10241f]">
      <div className="relative z-10">
        <TopNav active={active} setActive={setActive} />
        {active === "Home" && <HomeView setActive={setActive} />}
        {active === "WhyKinHarbour" && <WhyKinHarbourView />}
        {active === "Assessment" && <AssessmentView setActive={setActive} setProfile={setProfile} />}
        {active === "PlanPreview" && <PlanPreviewView setActive={setActive} profile={profile} />}
        {active === "Account" && <AccountOverview setActive={setActive} profile={profile} savedProviders={savedProviders} completedActions={completedActions} toggleSave={toggleSave} />}
        {active === "AccountProviders" && <AccountProviders setActive={setActive} profile={profile} savedProviders={savedProviders} toggleSave={toggleSave} />}
        {active === "AccountShortlist" && <AccountShortlist setActive={setActive} profile={profile} savedProviders={savedProviders} toggleSave={toggleSave} />}
        {active === "AccountActions" && <AccountActions setActive={setActive} profile={profile} completedActions={completedActions} toggleAction={toggleAction} />}
        {active === "AccountFamily" && <AccountFamily setActive={setActive} profile={profile} />}
      </div>
    </main>
  );
}
