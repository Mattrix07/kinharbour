import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  FileHeart,
  Home as HomeIcon,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const metrics = [
  ["5 min", "guided assessment"],
  ["4", "care pathways"],
  ["1", "family command centre"],
];

const decisionCards = [
  { icon: HomeIcon, title: "Stay at home", text: "Understand whether light or structured home support is enough for now." },
  { icon: Building2, title: "Residential care", text: "Know when to start comparing facilities, respite and permanent options." },
  { icon: Clock, title: "Urgent transition", text: "Create a practical 72-hour plan when hospital discharge or safety is pressing." },
];

const journey = [
  "Answer calm, plain-English questions",
  "Receive an explainable recommendation",
  "Compare providers and funding options",
  "Invite family into one shared decision space",
];

export default function Home() {
  return (
    <main className="kh-shell min-h-screen text-[#10251f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[#123d34] text-lg font-semibold text-white shadow-xl shadow-emerald-950/20">K</span>
          <div>
            <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#789089]">Care clarity</p>
          </div>
        </a>
        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1 shadow-sm backdrop-blur md:flex">
          {["How it works", "Product", "Dashboard"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-full px-4 py-2 text-sm font-semibold text-[#62756e] transition hover:bg-white hover:text-[#123d34]">
              {item}
            </a>
          ))}
        </div>
        <a href="/assessment" className="inline-flex items-center gap-2 rounded-full bg-[#123d34] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-[#082720]">
          Start <ArrowRight className="h-4 w-4" />
        </a>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="reveal-up">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-sm font-semibold text-[#31594d] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#bd8055]" />
            Built for families navigating aged care, not for lead generation
          </div>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.065em] text-[#10251f] md:text-8xl">
            A calmer way to decide what care comes next.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-[#62756e]">
            KinHarbour turns aged-care confusion into a guided assessment, explainable pathway, provider shortlist, funding view and shared family dashboard.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/assessment" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123d34] px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-emerald-950/20 transition hover:-translate-y-1 hover:bg-[#082720]">
              Start assessment <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/recommendation" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/75 bg-white/70 px-8 py-4 text-base font-semibold text-[#123d34] shadow-lg shadow-stone-900/5 backdrop-blur transition hover:-translate-y-1 hover:bg-white">
              View demo result
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {metrics.map(([value, label]) => (
              <div key={label} className="glass rounded-[1.6rem] p-5">
                <p className="text-3xl font-semibold text-[#123d34]">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#789089]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal-up lg:delay-150">
          <div className="absolute -left-8 top-12 h-32 w-32 rounded-full bg-[#79aaa0]/30 blur-3xl" />
          <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-[#bd8055]/20 blur-3xl" />
          <div className="glass float-card relative rounded-[2.4rem] p-4">
            <div className="deep-card overflow-hidden rounded-[2rem] p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#cfe2dd]">CarePath recommendation</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Home care bridge with residential planning</h2>
                </div>
                <span className="rounded-full bg-white/12 px-3 py-2 text-sm font-semibold backdrop-blur">87%</span>
              </div>
              <div className="mt-8 grid gap-3">
                {[
                  [ShieldCheck, "Risk flags", "Living alone, mobility support, family capacity pressure"],
                  [BarChart3, "Next step", "Book ACAT, prepare documents, compare 3 providers"],
                  [Users, "Family", "Invite siblings to vote, comment and track decisions"],
                ].map(([Icon, label, text]) => (
                  <div key={label as string} className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/12"><Icon className="h-5 w-5" /></span>
                      <div><p className="text-sm font-semibold text-[#cfe2dd]">{label as string}</p><p className="mt-1 leading-6">{text as string}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 p-4 md:grid-cols-3">
              {decisionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-[1.5rem] bg-white/70 p-4 shadow-sm backdrop-blur">
                    <Icon className="h-5 w-5 text-[#123d34]" />
                    <p className="mt-3 font-semibold">{card.title}</p>
                    <p className="mt-1 text-sm leading-5 text-[#62756e]">{card.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#bd8055]">How it works</p><h2 className="mt-4 text-5xl font-semibold leading-[.95] tracking-[-0.055em] md:text-7xl">One journey. No clutter.</h2></div>
          <p className="text-xl leading-9 text-[#62756e]">The app should feel like a concierge-led decision room: clear, beautiful and useful from the first screen.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {journey.map((item, index) => (
            <article key={item} className="card-lift rounded-[2rem] p-6 transition hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123d34] text-sm font-bold text-white">{index + 1}</span>
              <p className="mt-6 text-xl font-semibold tracking-tight">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="product" className="px-6 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] bg-[#10251f] p-6 text-white shadow-2xl shadow-emerald-950/25 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7af8a]">Core product</p>
              <h2 className="mt-4 text-5xl font-semibold leading-[.96] tracking-[-0.055em] md:text-7xl">A decision engine with a dashboard attached.</h2>
              <p className="mt-6 text-lg leading-8 text-white/70">Assessment, recommendation, shortlist, funding and family collaboration should work as one flow, not scattered pages.</p>
            </div>
            <div className="grid gap-4">
              {[
                [FileHeart, "Explainable recommendation", "Pathway, urgency, risk flags and next action plan."],
                [MessageCircle, "Family alignment", "Votes, notes and controlled sharing for siblings and carers."],
                [CheckCircle2, "Decision-ready shortlist", "Provider cards, status, notes, match criteria and comparison."],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="rounded-[1.7rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123d34]"><Icon className="h-5 w-5" /></span><div><h3 className="text-xl font-semibold">{title as string}</h3><p className="mt-2 leading-7 text-white/70">{text as string}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-6 py-20">
        <div className="card-lift rounded-[2.6rem] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#bd8055]">Next step</p>
              <h2 className="mt-4 text-5xl font-semibold leading-[.96] tracking-[-0.055em] md:text-7xl">Pull the family into one shared plan.</h2>
              <p className="mt-6 text-lg leading-8 text-[#62756e]">After the recommendation, families need confidence, coordination and a way to keep moving.</p>
            </div>
            <div className="grid gap-3">
              {["Saved assessment", "Recommendation report", "Provider shortlist", "Funding view", "Family discussion"].map((item) => (
                <a key={item} href={item === "Saved assessment" ? "/assessment" : item === "Recommendation report" ? "/recommendation" : item === "Provider shortlist" ? "/shortlist" : item === "Funding view" ? "/funding" : "/family"} className="group flex items-center justify-between rounded-[1.4rem] bg-[#f8f3ea] px-5 py-4 font-semibold transition hover:bg-[#dfe9df]">
                  {item}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
