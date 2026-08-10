import { BrowserRouter, Route, Routes } from "react-router-dom";

import CompanyDashboard from "./pages/CompanyDashboard";
import CompanySignup from "./pages/CompanySignup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeSignup from "./pages/EmployeeSignup";
import NotFound from "./pages/NotFound";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Menu,
  MoveUpRight,
  Network,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const workers = [
  {
    initials: "AO",
    name: "Alex Okoro",
    role: "Software Engineer",
    amount: "$3,800.00",
    method: "USDC · Solana",
    status: "Paid",
  },
  {
    initials: "SM",
    name: "Sarah Mensah",
    role: "Product Designer",
    amount: "₦4,250,000",
    method: "NGN · Bank",
    status: "Paid",
  },
  {
    initials: "DK",
    name: "Daniel Kim",
    role: "Growth",
    amount: "$3,200.00",
    method: "USDC · Ethereum",
    status: "Paid",
  },
];

const navItems = [
  ["Product", "#product"],
  ["How it works", "#workflow"],
  ["Security", "#security"],
  ["Developers", "#developers"],
];

function LandingPage() {
  const [open, setOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030405] text-white selection:bg-cyan-300 selection:text-black">
      <AmbientBackground />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030405]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-6">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-black shadow-[0_0_30px_rgba(255,255,255,.12)] transition group-hover:scale-105">
              <Zap size={15} fill="currentColor" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.04em]">
              Payroll<span className="text-cyan-400">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-[13px] text-zinc-500 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
         
            <a
              href="/signup/company"
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition hover:bg-zinc-200"
            >
              Get started
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-zinc-300 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-white/[0.06] bg-[#050607] px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-sm text-zinc-400">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="transition hover:text-white"
                >
                  {label}
                </a>
              ))}
              <a
                href="/signup/company"
                onClick={() => setOpen(false)}
                className="w-fit rounded-full bg-white px-5 py-2.5 font-medium text-black"
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative px-5 pb-20 pt-20 sm:px-6 sm:pt-28 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-[1180px] text-center">
            <div className="animate-fade-up mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-300/[0.035] px-3.5 py-2 text-[11px] text-zinc-400 shadow-[0_0_50px_rgba(34,211,238,.04)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              The Payroll infrastructure for global teams
              <ChevronRight size={12} className="text-zinc-700" />
            </div>

            <h1 className="mx-auto mt-8 max-w-[1120px] text-[52px] font-semibold leading-[0.9] tracking-[-0.075em] sm:text-[76px] lg:text-[104px]">
              Global payroll,
              <br />
              <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
                without the friction.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-[690px] text-[15px] leading-7 text-zinc-500 sm:text-[17px]">
              Run Payroll once. Fund it once. Let every employee receive their
              salary in the way that works for them — crypto or local currency,
              across borders.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/signup/company"
                className="group flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[13px] font-medium text-black shadow-[0_12px_50px_rgba(255,255,255,.08)] transition hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                Start paying your team
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#product"
                className="flex h-12 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.02] px-7 text-[13px] text-zinc-300 transition hover:border-white/[0.15] hover:bg-white/[0.05]"
              >
                See how it works
                <ChevronDown size={14} />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] text-zinc-700">
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-emerald-400" />
                No spreadsheets
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-emerald-400" />
                Multi-rail payouts
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-emerald-400" />
                Full audit trail
              </span>
            </div>
          </div>

          <PayrollDashboard />

          <p className="mt-7 text-center text-[10px] tracking-wide text-zinc-700">
            One Payroll run. Multiple payout rails. No spreadsheet chaos.
          </p>
        </section>

        {/* LOGO / STATS BAR */}
        <section className="border-y border-white/[0.055] bg-white/[0.01]">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 divide-x divide-white/[0.055] sm:grid-cols-4">
            <Stat value="1" label="Payroll operation" />
            <Stat value="24/7" label="global settlement" />
            <Stat value="100%" label="traceable payouts" />
            <Stat value="∞" label="ways to get paid" />
          </div>
        </section>

        {/* PRODUCT */}
        <section id="product" className="relative px-5 py-28 sm:px-6 lg:py-40">
          <div className="mx-auto max-w-[1180px]">
            <SectionEyebrow>THE NEW Payroll STACK</SectionEyebrow>

            <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <h2 className="max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                One source of truth
                <br />
                for <span className="text-zinc-600">every payout.</span>
              </h2>

              <p className="max-w-md text-sm leading-7 text-zinc-500">
                Your finance team sees one Payroll. Your employees see freedom. The
                platform handles the routing, records the transaction and keeps
                everyone on the same page.
              </p>
            </div>

            <div className="mt-20 grid overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] md:grid-cols-3 md:divide-x md:divide-white/[0.06]">
              <ProductCard
                number="01"
                icon={<Wallet size={18} />}
                title="Any payout rail"
                text="Pay directly to supported wallets or local bank accounts without rebuilding Payroll around every destination."
              />
              <ProductCard
                number="02"
                icon={<Network size={18} />}
                title="One Payroll engine"
                text="Compensation, approvals, treasury, payout routing and status live inside one operating layer."
              />
              <ProductCard
                number="03"
                icon={<ShieldCheck size={18} />}
                title="One auditable ledger"
                text="Every run has a clear history: who was paid, how much, when, where and through which rail."
              />
            </div>
          </div>
        </section>

        {/* GLOBAL PAYMENTS VISUAL */}
        <section className="border-y border-white/[0.055] bg-[#050607] px-5 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
              <div>
                <SectionEyebrow>ONE Payroll. EVERYWHERE.</SectionEyebrow>
                <h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">
                  Your team can
                  <br />
                  live anywhere.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                  Geography should not dictate how your company pays people.
                  Give each employee a payout experience that fits their market,
                  wallet and preference.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["USDC", "NGN", "USD", "EUR", "SOL"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-zinc-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <GlobalNetwork />
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className="px-5 py-28 sm:px-6 lg:py-40">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-3xl">
              <SectionEyebrow>SIMPLE BY DESIGN</SectionEyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-[.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                From company
                <br />
                <span className="text-zinc-600">to paid.</span>
              </h2>
            </div>

            <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
              <Workflow
                number="01"
                icon={<CircleDollarSign size={18} />}
                title="Fund"
                text="Move your Payroll budget into one controlled treasury balance. Know exactly what is available before you run."
              />
              <Workflow
                number="02"
                icon={<Sparkles size={18} />}
                title="Configure"
                text="Employees choose how they want to receive their salary. Your team sets the rules once."
              />
              <Workflow
                number="03"
                icon={<ArrowRight size={18} />}
                title="Approve"
                text="Review one Payroll run, approve it and let the engine route each payout to its destination."
              />
            </div>
          </div>
        </section>

        {/* EMPLOYEE */}
        <section className="px-5 pb-28 sm:px-6 lg:pb-40">
          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#090b0c]">
            <div className="grid lg:grid-cols-[.9fr_1.1fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <SectionEyebrow>FOR EMPLOYEES</SectionEyebrow>
                <h2 className="mt-6 text-4xl font-semibold leading-[.96] tracking-[-0.055em] sm:text-6xl">
                  Your salary.
                  <br />
                  <span className="text-zinc-600">Your choice.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                  Employees should not need a finance ticket to change where
                  their money lands. Give them the controls directly.
                </p>

                <div className="mt-9 space-y-3">
                  {[
                    "Choose a payout method",
                    "Switch preference when needed",
                    "Track every salary payment",
                    "See settlement status",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-zinc-300"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06]">
                        <Check size={11} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <PayoutExperience />
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section
          id="security"
          className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-28 sm:px-6 lg:py-40"
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <SectionEyebrow>BUILT FOR TRUST</SectionEyebrow>
                <h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">
                  Payroll you
                  <br />
                  <span className="text-zinc-600">can trace.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                  Payroll is critical infrastructure. Every action should have a
                  record, every approval should be attributable and every
                  supported on-chain payout should be verifiable.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2">
                <SecurityCard
                  icon={<ShieldCheck size={17} />}
                  title="Verified organizations"
                  text="Keep company and employment relationships tied to the Payroll workspace."
                />
                <SecurityCard
                  icon={<Network size={17} />}
                  title="Traceable payouts"
                  text="Supported on-chain transactions remain independently verifiable."
                />
                <SecurityCard
                  icon={<Clock3 size={17} />}
                  title="Audit history"
                  text="Know what happened across every Payroll run, approval and payout."
                />
                <SecurityCard
                  icon={<Code2 size={17} />}
                  title="Controlled access"
                  text="Separate Payroll operations across the people responsible for them."
                />
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPERS */}
        <section id="developers" className="px-5 py-28 sm:px-6 lg:py-40">
          <div className="mx-auto max-w-[1180px]">
            <div className="overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#080a0b]">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 sm:p-12 lg:p-16">
                  <SectionEyebrow>FOR DEVELOPERS</SectionEyebrow>
                  <h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl">
                    Payroll as
                    <br />
                    infrastructure.
                  </h2>
                  <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                    Build Payroll into your product instead of stitching together
                    wallets, bank rails, approvals and transaction records
                    yourself.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    API-first architecture
                  </div>
                </div>

                <div className="border-t border-white/[0.06] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <CodePreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING / CTA */}
        <section id="cta" className="px-5 pb-28 sm:px-6 lg:pb-40">
          <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] border border-white/[0.08]">
            <div className="pointer-events-none absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.07] blur-[110px]" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-[350px] w-[350px] rounded-full bg-blue-500/[0.05] blur-[110px]" />

            <div className="relative px-6 py-24 text-center sm:px-12 lg:py-32">
              <SectionEyebrow>BUILT FOR WHAT'S NEXT</SectionEyebrow>
              <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[.94] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
                Stop managing Payroll
                <br />
                <span className="text-zinc-600">the old way.</span>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-zinc-500">
                Bring your company, employees and treasury into one modern Payroll
                system designed for a world without borders.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#"
                  className="group flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[13px] font-medium text-black transition hover:bg-zinc-200"
                >
                  Create your company
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#developers"
                  className="flex h-12 items-center gap-2 rounded-full border border-white/[0.09] px-7 text-[13px] text-zinc-300 transition hover:bg-white/[0.04]"
                >
                  Talk to the team
                  <MoveUpRight size={14} />
                </a>
              </div>

              <div className="mx-auto mt-16 max-w-[600px] border-t border-white/[0.06] pt-7">
                <div className="flex items-center justify-center gap-3 text-[10px] text-zinc-700">
                  <div className="flex -space-x-2">
                    {["JD", "MK", "AO", "SM"].map((x) => (
                      <div
                        key={x}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#08090a] bg-white/[0.08] text-[8px] text-zinc-400"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  <span>Built for distributed teams everywhere.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.055] px-5 py-10 sm:px-6">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-black">
                <Zap size={13} fill="currentColor" />
              </div>
              <span className="text-sm font-semibold">
                Payroll<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="mt-3 text-[10px] text-zinc-700">
              Payroll infrastructure for the new economy.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[11px] text-zinc-700">
            <a href="#" className="transition hover:text-zinc-400">
              Privacy
            </a>
            <a href="#" className="transition hover:text-zinc-400">
              Terms
            </a>
            <a href="#security" className="transition hover:text-zinc-400">
              Security
            </a>
            <a href="#developers" className="transition hover:text-zinc-400">
              Developers
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: .35; }
          50% { opacity: .7; }
        }
        .animate-fade-up { animation: fadeUp .7s ease-out both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ---------- visual system ---------- */

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-520px] h-[900px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-400/[0.055] blur-[160px]" />
      <div className="absolute right-[-300px] top-[35%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.025] blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-cyan-300/[0.018] to-transparent" />
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-400">
      {children}
    </p>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-5 py-7 text-center sm:px-8">
      <p className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-zinc-700">
        {label}
      </p>
    </div>
  );
}



function PayrollDashboard() {
  return (
    <div className="relative mx-auto mt-20 max-w-[1180px] sm:mt-24">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.045] blur-[110px]" />

      <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#080a0b] shadow-[0_50px_140px_rgba(0,0,0,.7)] ring-1 ring-white/[0.02]">
        <div className="flex h-11 items-center border-b border-white/[0.06] px-4">
          <div className="flex gap-1.5">
            <i className="h-2 w-2 rounded-full bg-white/10" />
            <i className="h-2 w-2 rounded-full bg-white/10" />
            <i className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-md border border-white/[0.05] bg-white/[0.025] px-20 py-1 text-[9px] text-zinc-700 sm:block">
            app.Payroll.xyz
          </div>
        </div>

        <div className="grid min-h-[580px] grid-cols-12">
          <aside className="col-span-2 hidden border-r border-white/[0.055] p-5 lg:block">
            <div className="mb-9 flex items-center gap-2 text-xs font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black">
                A
              </div>
              Arc Labs
            </div>

            <div className="space-y-1">
              {["Overview", "Payroll", "Employees", "Treasury", "Reports"].map(
                (name, i) => (
                  <div
                    key={name}
                    className={`rounded-lg px-3 py-2.5 text-[10px] ${
                      i === 0 ? "bg-white/[0.07] text-white" : "text-zinc-600"
                    }`}
                  >
                    {name}
                  </div>
                ),
              )}
            </div>

            <div className="mt-28 rounded-xl border border-white/[0.055] bg-white/[0.015] p-3.5">
              <p className="text-[8px] uppercase tracking-[0.15em] text-zinc-700">
                Treasury
              </p>
              <p className="mt-2 text-sm font-medium">$84,290.42</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div className="h-full w-[74%] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.4)]" />
              </div>
              <p className="mt-2 text-[8px] text-zinc-700">
                74% available for Payroll
              </p>
            </div>
          </aside>

          <div className="col-span-12 p-5 sm:p-7 lg:col-span-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                  August 2026
                </p>
                <h2 className="mt-2 text-xl font-medium tracking-tight">
                  Payroll overview
                </h2>
              </div>
              <button className="rounded-lg bg-white px-4 py-2 text-[10px] font-medium text-black transition hover:bg-zinc-200">
                Run Payroll
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Metric label="Payroll" value="$42,860" delta="+8.2%" />
              <Metric label="Employees" value="24" />
              <Metric label="Crypto" value="72%" />
              <Metric label="Next run" value="Aug 31" />
            </div>

            <div className="mt-3 rounded-xl border border-white/[0.055] bg-white/[0.01] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-zinc-600">Payroll SPEND</p>
                  <p className="mt-1 text-lg font-medium">$42,860</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] text-emerald-400">
                  +8.2%
                </span>
              </div>

              <div className="relative mt-5 h-28">
                <div className="absolute inset-x-0 top-0 border-t border-white/[0.04]" />
                <div className="absolute inset-x-0 top-1/2 border-t border-white/[0.04]" />
                <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.04]" />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 800 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity=".2" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 78 C80 73 105 78 165 62 C220 47 255 66 315 54 C380 42 400 60 460 38 C520 17 565 44 610 28 C665 10 710 20 800 8 L800 100 L0 100Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0 78 C80 73 105 78 165 62 C220 47 255 66 315 54 C380 42 400 60 460 38 C520 17 565 44 610 28 C665 10 710 20 800 8"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="mt-2 flex justify-between text-[8px] text-zinc-700">
                {["MAR", "APR", "MAY", "JUN", "JUL", "AUG"].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/[0.055]">
              <div className="flex items-center justify-between border-b border-white/[0.055] px-4 py-3.5">
                <span className="text-[10px] font-medium">Recent payouts</span>
                <span className="text-[9px] text-zinc-700">View all</span>
              </div>

              {workers.map((worker) => (
                <div
                  key={worker.name}
                  className="flex items-center justify-between border-b border-white/[0.035] px-4 py-3.5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-[8px]">
                      {worker.initials}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium">{worker.name}</p>
                      <p className="mt-0.5 text-[8px] text-zinc-700">
                        {worker.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="hidden text-right sm:block">
                      <p className="text-[10px]">{worker.amount}</p>
                      <p className="mt-0.5 text-[8px] text-zinc-700">
                        {worker.method}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-400/[0.08] px-2 py-1 text-[8px] text-emerald-400">
                      <Check size={9} />
                      {worker.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.055] bg-white/[0.012] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-[0.12em] text-zinc-700">
          {label}
        </p>
        {delta && (
          <ArrowDownRight
            size={10}
            className="rotate-[-45deg] text-emerald-400"
          />
        )}
      </div>
      <p className="mt-2 text-base font-medium">{value}</p>
      {delta && (
        <p className="mt-1 text-[8px] text-emerald-400">{delta} this month</p>
      )}
    </div>
  );
}

/* ---------- product ---------- */

function ProductCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-[#080a0b] p-7 transition duration-300 hover:bg-[#0c0f10] sm:p-9">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-zinc-300 transition group-hover:border-cyan-300/20 group-hover:text-cyan-300">
          {icon}
        </div>
        <span className="text-[9px] tracking-[0.2em] text-zinc-800">
          {number}
        </span>
      </div>
      <h3 className="mt-9 text-base font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
    </div>
  );
}

/* ---------- global network ---------- */

function GlobalNetwork() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080a0b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.08),transparent_45%)]" />
      <div className="absolute inset-8 rounded-full border border-white/[0.035]" />
      <div className="absolute inset-20 rounded-full border border-white/[0.035]" />

      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-float items-center justify-center rounded-full border border-cyan-300/20 bg-[#0b1112] shadow-[0_0_70px_rgba(34,211,238,.14)]">
        <div className="text-center">
          <Zap
            size={19}
            className="mx-auto text-cyan-300"
            fill="currentColor"
          />
          <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-zinc-500">
            Payroll
          </p>
        </div>
      </div>

      <NetworkLine className="left-[22%] top-[28%] w-[28%] rotate-[28deg]" />
      <NetworkLine className="right-[20%] top-[29%] w-[28%] rotate-[-25deg]" />
      <NetworkLine className="left-[19%] bottom-[29%] w-[31%] rotate-[-26deg]" />
      <NetworkLine className="right-[19%] bottom-[29%] w-[31%] rotate-[26deg]" />

      <NetworkNode className="left-[11%] top-[22%]" label="USD" sub="Bank" />
      <NetworkNode
        className="right-[10%] top-[22%]"
        label="USDC"
        sub="Wallet"
      />
      <NetworkNode className="left-[10%] bottom-[20%]" label="NGN" sub="Bank" />
      <NetworkNode
        className="right-[10%] bottom-[20%]"
        label="SOL"
        sub="Wallet"
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-zinc-700">
        one engine · many destinations
      </div>
    </div>
  );
}

function NetworkLine({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-px origin-left bg-gradient-to-r from-cyan-300/20 to-transparent ${className}`}
    />
  );
}

function NetworkNode({
  className,
  label,
  sub,
}: {
  className: string;
  label: string;
  sub: string;
}) {
  return (
    <div className={`absolute animate-pulse-glow ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#0c0e0f] text-[9px] font-medium shadow-2xl">
        {label}
      </div>
      <p className="mt-2 text-center text-[8px] text-zinc-700">{sub}</p>
    </div>
  );
}

/* ---------- workflow ---------- */

function Workflow({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-[#080a0b] p-7 sm:p-9">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-cyan-400">
          {number}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-zinc-400 transition group-hover:border-cyan-300/20 group-hover:text-cyan-300">
          {icon}
        </div>
      </div>
      <div className="mt-8 h-px w-full bg-white/[0.07]" />
      <h3 className="mt-7 text-lg font-medium">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">{text}</p>
    </div>
  );
}

/* ---------- employee experience ---------- */

function PayoutExperience() {
  return (
    <div className="relative min-h-[520px] overflow-hidden border-t border-white/[0.06] lg:border-l lg:border-t-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,.07),transparent_45%)]" />

      <div className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-white/[0.09] bg-[#0c0f10] p-5 shadow-[0_30px_100px_rgba(0,0,0,.55)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-600">PAYOUT PREFERENCE</p>
              <p className="mt-2 text-sm font-medium">August salary</p>
            </div>
            <Sparkles size={15} className="text-cyan-400" />
          </div>

          <div className="mt-6 space-y-2">
            <Payout
              active
              title="USDC"
              subtitle="Solana wallet"
              amount="$3,800"
            />
            <Payout title="Naira" subtitle="Bank account" amount="₦5.7m" />
            <Payout title="USD" subtitle="Bank account" amount="$3,800" />
          </div>

          <button className="mt-5 w-full rounded-lg bg-white py-2.5 text-[10px] font-medium text-black transition hover:bg-zinc-200">
            Save preference
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[8px] text-zinc-700">
            <ShieldCheck size={10} />
            Preferences are encrypted
          </div>
        </div>

        <div className="absolute -right-16 top-12 hidden rounded-xl border border-white/[0.07] bg-[#0b0d0e] px-3 py-2 shadow-2xl sm:block">
          <p className="text-[8px] text-zinc-700">SETTLEMENT</p>
          <p className="mt-1 text-[10px] text-emerald-400">Ready to pay</p>
        </div>

        <div className="absolute -left-16 bottom-12 hidden rounded-xl border border-white/[0.07] bg-[#0b0d0e] px-3 py-2 shadow-2xl sm:block">
          <p className="text-[8px] text-zinc-700">NEXT PAYOUT</p>
          <p className="mt-1 text-[10px] text-zinc-300">Aug 31 · 09:00</p>
        </div>
      </div>
    </div>
  );
}

function Payout({
  active,
  title,
  subtitle,
  amount,
}: {
  active?: boolean;
  title: string;
  subtitle: string;
  amount: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-3.5 transition ${
        active
          ? "border-cyan-400/20 bg-cyan-400/[0.045]"
          : "border-white/[0.055] bg-white/[0.015]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-medium ${
            active
              ? "bg-cyan-300/10 text-cyan-300"
              : "bg-white/[0.04] text-zinc-500"
          }`}
        >
          {title.slice(0, 2)}
        </div>
        <div>
          <p className="text-[11px] font-medium">{title}</p>
          <p className="mt-0.5 text-[8px] text-zinc-600">{subtitle}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-[10px]">{amount}</p>
        <div
          className={`ml-auto mt-1 h-2.5 w-2.5 rounded-full border ${
            active
              ? "border-cyan-400 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.4)]"
              : "border-zinc-700"
          }`}
        />
      </div>
    </div>
  );
}

/* ---------- security ---------- */

function SecurityCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group bg-[#080a0b] p-7 sm:p-8">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-zinc-300 transition group-hover:border-cyan-300/20 group-hover:text-cyan-300">
        {icon}
      </div>
      <h3 className="mt-7 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-zinc-600">{text}</p>
    </div>
  );
}

/* ---------- developer block ---------- */

function CodePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#050708] shadow-2xl">
      <div className="flex h-10 items-center justify-between border-b border-white/[0.06] px-4">
        <div className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-white/10" />
          <i className="h-2 w-2 rounded-full bg-white/10" />
          <i className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <span className="text-[8px] text-zinc-700">POST /v1/Payroll/runs</span>
      </div>
      <pre className="overflow-x-auto p-5 text-[10px] leading-7 text-zinc-500 sm:p-7">
        <code>{`const Payroll = await Payroll.runs.create({
  company: "arc_labs",
  period: "2026-08",
  currency: "USD",

  payouts: [
    {
      employee: "alex_okoro",
      amount: 3800,
      rail: "usdc",
      network: "solana"
    }
  ]
});

await Payroll.approve();`}</code>
      </pre>
      <div className="flex items-center gap-2 border-t border-white/[0.05] px-5 py-3.5 text-[9px] text-emerald-400 sm:px-7">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        200 · Payroll run created
      </div>
    </div>
  );
}




export default function App() {
  return (
    <BrowserRouter>
      <Routes>-
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/company" element={<CompanySignup />} />
        <Route path="/signup/employee" element={<EmployeeSignup />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
