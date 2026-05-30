const trustSignals = [
  "Independent family guidance",
  "Care-path logic, not a lead form",
  "Printable decision report",
  "Built on your own codebase",
];

const pathways = [
  {
    eyebrow: "01",
    title: "Start with the real situation",
    text: "Capture urgency, living situation, mobility, cognition, medical complexity and family capacity in one calm flow.",
  },
  {
    eyebrow: "02",
    title: "Translate needs into a pathway",
    text: "KinHarbour turns answers into home care, respite, residential exploration or urgent transition guidance.",
  },
  {
    eyebrow: "03",
    title: "Give the family a plan",
    text: "The result becomes a structured report with next steps, documents, provider filters and discussion prompts.",
  },
];

const reportItems = [
  ["Pathway", "Residential care exploration with home support bridge"],
  ["Priority", "Plan now"],
  ["Risk flags", "Living alone, mobility support, cognition concerns"],
  ["Next action", "Compare respite and residential options nearby"],
];

const journey = [
  "Noticing changes at home",
  "Family uncertainty",
  "Assessment and pathway",
  "Provider comparison",
  "Decision-ready report",
];

export default function Home() {
  return (
    <main className="luxury-shell min-h-screen overflow-hidden text-[#17231f]">
      <section className="relative min-h-screen border-b border-[#dfd3c1]/70">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173f35] text-lg font-semibold text-white shadow-lg shadow-emerald-950/15">
              K
            </span>
            <div>
              <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7a8b82]">Care decisions</p>
            </div>
          </a>
          <div className="hidden items-center gap-8 rounded-full border border-[#dfd3c1]/80 bg-white/55 px-6 py-3 text-sm font-semibold text-[#52645c] shadow-sm backdrop-blur md:flex">
            <a href="#how-it-works" className="transition hover:text-[#173f35]">How it works</a>
            <a href="#decision-layer" className="transition hover:text-[#173f35]">Decision layer</a>
            <a href="#report" className="transition hover:text-[#173f35]">Report</a>
          </div>
          <a
            href="/assessment"
            className="rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#0f2f27]"
          >
            Start assessment
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-32 lg:pt-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d8c9b7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#31594d] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#bc7c51]" />
              Residential aged care guidance for Australian families
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#14231f] md:text-7xl lg:text-8xl">
              Make the next aged care decision feel clearer.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52645c] md:text-xl">
              KinHarbour gives families a calm decision layer for home care, respite and residential aged care — turning uncertainty into a practical pathway and report.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/assessment"
                className="rounded-full bg-[#173f35] px-8 py-4 text-center text-base font-semibold text-white shadow-2xl shadow-emerald-950/20 transition hover:-translate-y-1 hover:bg-[#0f2f27]"
              >
                Start the care assessment
              </a>
              <a
                href="/results?demo=true"
                className="rounded-full border border-[#d8c9b7] bg-white/75 px-8 py-4 text-center text-base font-semibold text-[#173f35] shadow-lg shadow-stone-900/5 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                View example report
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 rounded-2xl border border-[#dfd3c1]/70 bg-white/50 px-4 py-3 text-sm font-semibold text-[#52645c] shadow-sm backdrop-blur">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dfe9df] text-xs text-[#173f35]">✓</span>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-12 hidden h-28 w-28 rounded-full bg-[#bc7c51]/20 blur-2xl lg:block" />
            <div className="absolute -right-6 bottom-12 hidden h-36 w-36 rounded-full bg-[#173f35]/20 blur-3xl lg:block" />
            <div className="glass-panel float-slow relative rounded-[2.3rem] p-4">
              <div className="depth-card rounded-[1.8rem] p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#c9ded7]">CarePath report</p>
                    <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight">Residential care exploration with home support bridge</h2>
                  </div>
                  <div className="rounded-2xl bg-white/12 px-4 py-3 text-right backdrop-blur">
                    <p className="text-xs text-[#c9ded7]">Priority</p>
                    <p className="text-lg font-semibold">Plan now</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-3">
                  {reportItems.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9ded7]">{label}</p>
                      <p className="mt-2 font-semibold leading-6 text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-3">
                {[
                  ["12", "inputs assessed"],
                  ["4", "pathway types"],
                  ["1", "family report"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl bg-white/70 p-5 text-center shadow-sm backdrop-blur">
                    <p className="text-3xl font-semibold text-[#173f35]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a7a72]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">A premium front door for a difficult family decision.</h2>
          </div>
          <p className="text-lg leading-8 text-[#5d6d65]">
            Instead of pushing families into a directory, KinHarbour creates a decision record: what is happening, why it matters, what pathway fits and what to do next.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pathways.map((item) => (
            <article key={item.title} className="premium-card group rounded-[2rem] p-8 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173f35] text-sm font-bold text-white shadow-lg shadow-emerald-950/15">
                {item.eyebrow}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#5d6d65]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="decision-layer" className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#173f35] p-6 text-white shadow-2xl shadow-emerald-950/20 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Decision layer</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">The product is the pathway, not the form.</h2>
              <p className="mt-6 text-lg leading-8 text-[#dbe8e3]">
                The assessment weighs care urgency, safety, support complexity and family capacity to create a recommendation that feels explainable, not robotic.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <div className="grid gap-3">
                {journey.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-3xl bg-white/10 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-bold text-[#173f35]">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#eef7f3]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="report" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card rounded-[2rem] p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Family-ready output</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">A result page that can become a paid report.</h2>
            <p className="mt-6 text-lg leading-8 text-[#5d6d65]">
              The results structure is intentionally commercial: pathway, risks, documents, provider filters, shortlist and discussion prompts. The next step is storing it in Supabase and generating a polished PDF.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Personalised pathway recommendation",
              "Risk and urgency explanation",
              "Provider filter shortlist",
              "Printable family discussion guide",
            ].map((item) => (
              <div key={item} className="soft-highlight rounded-3xl border border-[#dfd3c1]/80 p-6 font-semibold text-[#24342e] shadow-sm">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
