import {
  Building2,
  FileHeart,
  Home,
  Search,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

const challengeStats = [
  { icon: Building2, value: "2,700+", label: "aged care homes and services to compare across Australia", note: "Illustrative sector scale" },
  { icon: Users, value: "95,000", label: "people waiting for home support in late 2025", note: "Indicative waitlist pressure" },
  { icon: Home, value: "83,000", label: "new at-home care packages planned over 2 years", note: "Reform pipeline indicator" },
];

const struggles = [
  [Search, "Too many options", "Information is scattered, inconsistent and hard to compare."],
  [WalletCards, "Costs feel unclear", "Fees, funding, wait times and eligibility vary by pathway."],
  [Users, "Everyone is affected", "Care decisions change time, finances and family responsibilities."],
] as const;

const solution = [
  [Sparkles, "Clarity", "Clear options, costs and next steps."],
  [FileHeart, "Personalisation", "Recommendations matched to care needs."],
  [Users, "Shared planning", "One place for the whole family."],
] as const;

function KinHarbourLogo() {
  return (
    <svg className="h-7 w-7 text-[#5d9691]" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M13.5 38.5C11.1 27.2 17.8 17.3 29.2 11.5c2.5 9.9.3 20.7-7.1 28.1-2.3 2.3-5.1 4-8.6 5.1Z" fill="#0b2c34" />
      <path d="M18.5 42.7c10.5-15.3 22-25.2 34.6-29.5.9 11.5-5.3 21.8-16 27-5.6 2.7-11.7 3.5-18.6 2.5Z" fill="currentColor" />
      <path d="M24.1 50.1c8.4-12.4 17.9-19.6 28.4-21.6-.6 9.7-6.4 17.7-15.2 21.2-4.1 1.6-8.4 1.8-13.2.4Z" fill="#4f8f83" />
      <path d="M15 40.4c10.4-8 21.3-14.4 36.2-23.1" stroke="#d5e8df" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M23.8 49.1c7.9-6.9 16-12.2 27-18.3" stroke="#d5e8df" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M13.2 40.8c1.9 5.9 6.5 9.7 13.8 11.6" stroke="#0b2c34" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function Header() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="/" className="flex items-center gap-2 text-[#0b2c34]">
        <KinHarbourLogo />
        <div className="text-xl font-semibold tracking-tight">KinHarbour</div>
      </a>

      <div className="hidden items-center gap-7 text-sm font-semibold text-[#53666a] lg:flex">
        <a href="/#what-we-do" className="transition hover:text-[#0b2c34]">How it works</a>
        <a href="/why-kinharbour" className="text-[#0b2c34]">Why KinHarbour</a>
        <a href="/providers" className="transition hover:text-[#0b2c34]">Care options</a>
        <a href="/funding" className="transition hover:text-[#0b2c34]">Costs</a>
        <a href="/dashboard" className="transition hover:text-[#0b2c34]">Resources</a>
      </div>

      <a href="/assessment" className="inline-flex items-center gap-2 rounded-full bg-[#0b2c34] px-5 py-3 text-sm font-semibold !text-white shadow-2xl shadow-slate-950/15 transition hover:-translate-y-0.5">
        Begin Assessment
      </a>
    </nav>
  );
}

export default function WhyKinHarbourPage() {
  return (
    <main className="kh-shell min-h-screen overflow-hidden bg-[#f8f1e8] text-[#10241f]">
      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe0d8] bg-[#edf5f2]/75 px-4 py-2 text-sm font-semibold text-[#4d8d8b] shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4" /> Why KinHarbour
            </div>
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">
              When care becomes urgent, most families have <span className="text-[#5d9691]">no clear starting point.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#62756e]">
              The aged care system is complex, fragmented, and overwhelming — especially when decisions need to happen fast.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/62 p-6 shadow-[0_24px_72px_rgba(61,45,28,.10)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold tracking-tight">The challenge</h2>
            <div className="mt-6 grid gap-4">
              {challengeStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.value} className="grid gap-4 rounded-[1.5rem] bg-[#f8f1e8]/80 p-5 md:grid-cols-[56px_130px_1fr] md:items-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-5 w-5 text-[#5d9691]" /></span>
                    <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
                    <div>
                      <p className="font-medium leading-6 text-[#43565c]">{stat.label}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#91a19b]">{stat.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-[#91a19b]">Illustrative Australian aged-care indicators.</p>
          </div>
        </div>

        <section className="mt-20 rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#89a697]">Why families struggle</p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1] tracking-[-0.05em]">Too much complexity, too little guidance.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {struggles.map(([Icon, title, text]) => (
                <div key={title} className="rounded-[1.6rem] bg-white/80 p-5 shadow-[0_14px_42px_rgba(61,45,28,.07)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-5 w-5 text-[#5d9691]" /></span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 leading-7 text-[#62756e]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#eaf4ef]/85 p-7 shadow-sm backdrop-blur-xl md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold leading-[1] tracking-[-0.05em]">KinHarbour brings clarity, centralisation and guidance when it matters most.</h2>
              <p className="mt-5 leading-8 text-[#62756e]">We simplify the journey so families can make confident decisions together.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {solution.map(([Icon, title, text], index) => (
                <div key={title} className="rounded-[1.6rem] bg-white/80 p-5 shadow-[0_14px_42px_rgba(61,45,28,.07)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5efec]"><Icon className="h-5 w-5 text-[#5d9691]" /></span>
                    <span className="text-xs font-bold text-[#91a19b]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 leading-7 text-[#62756e]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
