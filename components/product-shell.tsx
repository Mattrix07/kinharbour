import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  ClipboardList,
  FileHeart,
  HeartHandshake,
  Home,
  Search,
  Share2,
  Users,
  WalletCards,
} from "lucide-react";

const navItems = [
  { href: "/assessment", label: "Assess", icon: ClipboardList },
  { href: "/recommendation", label: "Recommend", icon: FileHeart },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/providers", label: "Providers", icon: Search },
  { href: "/shortlist", label: "Shortlist", icon: HeartHandshake },
  { href: "/family", label: "Family", icon: Users },
  { href: "/funding", label: "Funding", icon: WalletCards },
  { href: "/family-share", label: "Share", icon: Share2 },
];

export function ProductShell({
  eyebrow,
  title,
  description,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <main className="kh-shell min-h-screen text-[#10251f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[#123d34] text-lg font-semibold text-white shadow-xl shadow-emerald-950/20">K</span>
          <div>
            <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#789089]">Care command centre</p>
          </div>
        </Link>
        <Link href="/" className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/60 px-5 py-3 text-sm font-semibold text-[#123d34] shadow-sm backdrop-blur sm:inline-flex">
          <Home className="h-4 w-4" />
          Home
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-3 lg:grid-cols-[238px_1fr]">
        <aside className="glass h-fit rounded-[2rem] p-3 lg:sticky lg:top-6">
          <div className="rounded-[1.55rem] bg-[#123d34] p-5 text-white shadow-xl shadow-emerald-950/15">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7af8a]">Journey</p>
            <p className="mt-3 text-sm leading-6 text-white/72">One decision room for assessment, recommendation, providers and family alignment.</p>
          </div>
          <div className="mt-3 grid gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm font-semibold text-[#536a62] transition hover:bg-white hover:text-[#123d34] hover:shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f2eadf] text-[#123d34] transition group-hover:bg-[#dfe9df]">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>

        <div>
          <header className="glass mb-6 overflow-hidden rounded-[2.4rem] p-8 md:p-10">
            <div className="relative">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#79aaa0]/20 blur-3xl" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#bd8055]">{eyebrow}</p>
                  <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[.98] tracking-[-0.055em] md:text-6xl">{title}</h1>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-[#62756e]">{description}</p>
                </div>
                {actions && <div className="shrink-0">{actions}</div>}
              </div>
            </div>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card-lift rounded-[2rem] p-6 shadow-sm ${className}`}>{children}</section>;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-[#123d34]/10 bg-[#f8f3ea] px-3 py-1 text-xs font-semibold text-[#123d34]">{children}</span>;
}
