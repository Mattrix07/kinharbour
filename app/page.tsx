"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileHeart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

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
  { icon: ClipboardCheck, title: "Answer questions", text: "A few simple questions about your loved one’s needs." },
  { icon: FileHeart, title: "Get a recommendation", text: "We compare options, likely costs and suitable providers." },
  { icon: Users, title: "Save & share your plan", text: "Keep guidance in one place and involve the whole family." },
];

const reviews = [
  {
    quote: "It explained everything so clearly, I finally understood what Mum was entitled to.",
    name: "Sarah, Melbourne",
    role: "Daughter",
  },
  {
    quote: "We were overwhelmed — KinHarbour helped us figure out exactly what to do next.",
    name: "James, Sydney",
    role: "Son",
  },
  {
    quote: "The assessment took five minutes and the recommendation was spot on for Dad’s situation.",
    name: "Emily, Brisbane",
    role: "Daughter",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b2c34] text-sm font-semibold text-white shadow-2xl shadow-slate-950/15">K</div>
        <div>
          <div className="text-lg font-semibold tracking-tight">KinHarbour</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#758a82]">Care clarity</div>
        </div>
      </a>

      <div className="hidden items-center gap-6 text-sm font-semibold text-[#53666a] lg:flex">
        <a href="#what-we-do" className="transition hover:text-[#0b2c34]">How it works</a>
        <a href="/why-kinharbour" className="transition hover:text-[#0b2c34]">Why KinHarbour</a>
        <a href="/providers" className="transition hover:text-[#0b2c34]">Care options</a>
        <a href="/funding" className="transition hover:text-[#0b2c34]">Costs</a>
        <a href="/dashboard" className="transition hover:text-[#0b2c34]">Resources</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="/dashboard" className="hidden text-sm font-semibold text-[#53666a] transition hover:text-[#0b2c34] sm:block">Log in</a>
        <a href="/assessment" className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-4 py-2.5 text-sm font-semibold text-white shadow-2xl shadow-slate-950/15 transition hover:-translate-y-0.5">
          Start Free Assessment <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </nav>
  );
}

function DashboardPreview() {
  const [mode, setMode] = useState<DashboardMode>("Home Support");
  const data = dashboardModes[mode];

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative">
      <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-start">
        {(Object.keys(dashboardModes) as DashboardMode[]).map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={cx(
              "rounded-full border px-4 py-2 text-xs font-semibold transition",
              mode === item
                ? "border-[#0b2c34] bg-[#0b2c34] text-white shadow-lg shadow-slate-950/15"
                : "border-[#d9dfda] bg-white/72 text-[#53666a] hover:bg-white"
            )}
          >
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
                  {data.providers.map((provider) => (
                    <span key={provider} className="rounded-full bg-[#edf1ef] px-3 py-1.5 text-xs font-semibold text-[#0b2c34]">{provider}</span>
                  ))}
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

            <div className="mt-4 rounded-[1.35rem] border border-[#dde5e1] bg-white px-5 py-4 text-sm italic text-[#53666a]">
              “{data.quote}”
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[#93a09b] lg:text-left">Illustrative snapshot of what your dashboard may show after completing an assessment.</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="kh-shell min-h-screen overflow-hidden bg-[#f8f1e8] text-[#10241f]">
      <Header />

      <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl gap-14 px-6 pb-24 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-3.5 py-1.5 text-xs font-semibold text-[#4d8d8b] shadow-sm backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#4d8d8b]" /> Built for Australian families
          </div>
          <h1 className="max-w-4xl text-[3.8rem] font-semibold leading-[0.92] tracking-[-0.065em] md:text-[5.65rem]">
            Find the right aged care path, <span className="text-[#5d9691]">step by step.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#62756e]">
            KinHarbour brings aged care guidance, likely costs, a shared family planner and personalised recommendations into one all-in-one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/assessment" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b2c34] px-6 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-slate-950/15 transition hover:-translate-y-1">
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/family" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0b2c34] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#0b2c34] transition hover:-translate-y-1 hover:bg-white/70">
              Book a Strategy Call
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#7c8c87]">
            {["Independent guidance", "Australian-built", "Designed for overwhelmed families, not experts"].map((item) => (
              <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#5d9691]" />{item}</div>
            ))}
          </div>
        </motion.div>

        <DashboardPreview />
      </section>

      <section id="what-we-do" className="mx-auto max-w-7xl px-6 pb-28 pt-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#89a697]">What we do</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Simple, personal, shareable guidance.</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {whatWeDo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative rounded-[1.7rem] border border-[#dfe7e2] bg-white/80 p-6 shadow-[0_14px_42px_rgba(61,45,28,.08)]">
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#dfe7e2] bg-white text-xs font-bold text-[#53666a]">{index + 1}</div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-6 w-6 text-[#5d9691]" /></span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 leading-7 text-[#62756e]">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[#eef6f3]/80 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold leading-[1] tracking-[-0.05em]">Trusted by Australian families</h2>
              <p className="mt-4 leading-7 text-[#62756e]">Designed for elderly Australians and the families who care for them.</p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-4xl font-semibold">4.9</span>
                <span className="pb-1 text-lg tracking-[0.18em] text-[#b88745]">★★★★★</span>
              </div>
              <p className="mt-1 text-sm text-[#62756e]">from Australian family feedback</p>
              <p className="mt-6 flex items-center gap-2 text-sm text-[#62756e]"><ShieldCheck className="h-4 w-4 text-[#5d9691]" /> Your information is secure and private.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-[1.6rem] border border-white/70 bg-white/86 p-6 shadow-[0_14px_42px_rgba(61,45,28,.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl leading-none text-[#5d9691]">“</span>
                    <span className="text-sm tracking-[0.16em] text-[#b88745]">★★★★★</span>
                  </div>
                  <p className="min-h-[108px] text-[15px] italic leading-7 text-[#43565c]">“{review.quote}”</p>
                  <div className="mt-5 border-t border-[#e7ede9] pt-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-[#62756e]">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
