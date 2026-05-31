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
  { href: "/assessment", label: "Assessment", icon: ClipboardList },
  { href: "/recommendation", label: "Recommendation", icon: FileHeart },
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
    <main className="luxury-shell min-h-screen text-[#17231f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173f35] text-lg font-semibold text-white shadow-lg shadow-emerald-950/15">
            K
          </span>
          <div>
            <p className="text-xl font-semibold tracking-tight">KinHarbour</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7a8b82]">Family care platform</p>
          </div>
        </Link>
        <Link href="/" className="hidden items-center gap-2 rounded-full border border-[#d8c9b7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm backdrop-blur sm:inline-flex">
          <Home className="h-4 w-4" />
          Home
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass-panel h-fit rounded-[2rem] p-4 lg:sticky lg:top-6">
          <div className="px-3 pb-3 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">Journey</p>
            <p className="mt-2 text-sm leading-6 text-[#61736a]">Move from assessment to decision, provider comparison and family coordination.</p>
          </div>
          <div className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#52645c] transition hover:bg-white hover:text-[#173f35]">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>

        <div>
          <header className="glass-panel mb-6 rounded-[2.2rem] p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#bc7c51]">{eyebrow}</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl">{title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5d6d65]">{description}</p>
              </div>
              {actions && <div className="shrink-0">{actions}</div>}
            </div>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`premium-card rounded-[2rem] p-6 shadow-sm ${className}`}>{children}</section>;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-[#d8c9b7] bg-[#f7f1e8] px-3 py-1 text-xs font-semibold text-[#173f35]">{children}</span>;
}
