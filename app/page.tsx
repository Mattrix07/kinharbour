const pathways = [
  {
    title: "Understand the right care pathway",
    text: "Answer practical questions about urgency, mobility, cognition, health needs, family support and location.",
  },
  {
    title: "Compare suitable next steps",
    text: "See whether home care, respite, residential aged care or an urgent support pathway is most appropriate.",
  },
  {
    title: "Prepare with confidence",
    text: "Get a clear action plan, document checklist, provider shortlist and family discussion guide.",
  },
];

const trustSignals = [
  "Built for families, not providers",
  "Clear pathway logic",
  "No lock-in or lead-selling",
  "Designed for stressful decisions",
];

const scenarios = [
  "Mum is living alone and starting to struggle at home",
  "Dad had a recent fall and the family needs urgent options",
  "The family is unsure whether home care is still enough",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1e8] text-[#17231f]">
      <section className="relative border-b border-[#dfd3c1]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(23,75,61,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(188,124,81,0.16),_transparent_30%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="/" className="text-xl font-semibold tracking-tight">
            KinHarbour
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#52645c] md:flex">
            <a href="#how-it-works" className="hover:text-[#173f35]">How it works</a>
            <a href="#pathways" className="hover:text-[#173f35]">Pathways</a>
            <a href="#checklist" className="hover:text-[#173f35]">Checklist</a>
          </div>
          <a
            href="/assessment"
            className="rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f2f27]"
          >
            Start assessment
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pb-32 lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[#d8c9b7] bg-white/70 px-4 py-2 text-sm font-medium text-[#31594d] shadow-sm backdrop-blur">
              Residential aged care guidance for Australian families
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#14231f] md:text-7xl">
              Find the right care pathway for your parent.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52645c] md:text-xl">
              KinHarbour helps families turn a confusing aged care decision into a clear, calm action plan — from first concerns through to provider comparison and next steps.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/assessment"
                className="rounded-full bg-[#173f35] px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-[#0f2f27]"
              >
                Start the care assessment
              </a>
              <a
                href="/results?demo=true"
                className="rounded-full border border-[#d8c9b7] bg-white/80 px-8 py-4 text-center text-base font-semibold text-[#173f35] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                View example result
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 text-sm font-medium text-[#52645c]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dfe9df] text-xs text-[#173f35]">✓</span>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ded1bd] bg-white/80 p-5 shadow-2xl shadow-stone-900/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#173f35] p-6 text-white">
              <p className="text-sm font-medium text-[#c9ded7]">CarePath result preview</p>
              <h2 className="mt-4 text-3xl font-semibold">Home care with residential care planning</h2>
              <p className="mt-4 leading-7 text-[#dbe8e3]">
                The person may be able to stay at home short term, but the support profile suggests the family should begin preparing for residential care options.
              </p>
            </div>
            <div className="grid gap-4 p-3 pt-5">
              {scenarios.map((scenario, index) => (
                <div key={scenario} className="rounded-3xl border border-[#eadfce] bg-[#fbf8f2] p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#173f35] shadow-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[#17231f]">{scenario}</p>
                      <p className="mt-2 text-sm leading-6 text-[#607269]">Assessment converts this situation into pathway, risk and next-step guidance.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">A calmer way to make an aged care decision.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pathways.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-[#e2d5c3] bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#5d6d65]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pathways" className="bg-[#173f35] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b18f]">Pathway engine</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Not just a directory. A decision layer.</h2>
            <p className="mt-6 text-lg leading-8 text-[#dbe8e3]">
              The assessment considers care urgency, living situation, mobility, cognition, medical complexity and family capacity before recommending a practical next step.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {["Stay at home with light support", "Home care package planning", "Residential care exploration", "Urgent transition support"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-3 leading-7 text-[#dbe8e3]">Matched with explanation, risks, documents, provider filters and next actions.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="checklist" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-[#e2d5c3] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Operational first version</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">What this build now supports.</h2>
              <p className="mt-5 leading-8 text-[#5d6d65]">
                This implementation gives you a real front-end product flow, structured logic and saved assessment state. It is ready to connect to Supabase, OpenAI report generation and a live provider database next.
              </p>
            </div>
            <div className="grid gap-3">
              {["Guided assessment", "Personalised pathway result", "Risk flags and next steps", "Provider shortlist mock data", "Family-ready report structure", "No third-party website builder lock-in"].map((item) => (
                <div key={item} className="rounded-2xl bg-[#f7f1e8] px-5 py-4 font-medium text-[#24342e]">✓ {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
