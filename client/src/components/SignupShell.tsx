import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Brand from "./Brand";

type Props = {
  kind: "company" | "employee";
  step: number;
  children: ReactNode;
  onBack?: () => void;
};
export default function SignupShell({ kind, step, children, onBack }: Props) {
  const companyMode = kind === "company";

  return (
    <div className="min-h-screen bg-[#030405] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[850px] -translate-x-1/2 rounded-full bg-cyan-400/[.045] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <header className="border-b border-white/[.055]">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 sm:px-6">
          <Brand />
          <span className="flex items-center gap-2 text-[10px] text-zinc-600">
            <ShieldCheck size={13} className="text-emerald-400" />
            Secure onboarding
          </span>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1180px] lg:grid-cols-[.72fr_1.28fr]">
        <aside className="hidden border-r border-white/[.055] p-10 lg:flex lg:flex-col lg:justify-between lg:pr-16">
          <div>
            <p className="text-[10px] uppercase tracking-[.22em] text-cyan-400">
              {companyMode ? "Company onboarding" : "Employee onboarding"}
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[.94] tracking-[-.065em]">
              {companyMode ? "Build your payroll workspace." : "Get paid your way."}
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
              {companyMode
                ? "Set up your organization once. Your payroll operations live here from then on."
                : "Create your profile, connect to your employer and choose where your salary should go."}
            </p>
          </div>

          <div className="space-y-3">
            {["Account", "Details", "Finish"].map((label, index) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] ${
                    index + 1 <= step
                      ? "bg-white text-black"
                      : "border border-white/[.08] text-zinc-700"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-[11px] ${
                    index + 1 === step ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex items-center px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto w-full max-w-[560px]">
            <div className="mb-8 lg:hidden">
              <p className="text-[10px] uppercase tracking-[.22em] text-cyan-400">
                {companyMode ? "Company onboarding" : "Employee onboarding"}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">
                {companyMode ? "Build your payroll workspace." : "Get paid your way."}
              </h1>
            </div>

            <div className="mb-8 flex items-center">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[.05]">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <span className="ml-4 text-[9px] text-zinc-700">{step}/3</span>
            </div>

            {onBack && step > 1 && (
              <button
                onClick={onBack}
                className="mb-5 flex items-center gap-2 text-[11px] text-zinc-600 hover:text-white"
              >
                <ArrowLeft size={13} />
                Back
              </button>
            )}

            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
