import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { api } from "../lib/api";
import type { HttpResponse } from "../types/HttpResponse";
// import { api } from "../lib/api";

export default function EmployeeLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      /*
       * API PLACEHOLDER
       *
       * POST /api/v1/auth/employee/login
       *
       * {
       *   email,
       *   password
       * }
       *
       * Expected response:
       *
       * {
       *   success: true,
       *   data: {
       *     accessToken: "...",
       *     refreshToken: "...",
       *     user: {}
       *   }
       * }
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      console.log("Employee login:", {
        email,
        password,
      });

      const data: HttpResponse = (await api.auth.employeelogin({
        email,
        password,
      })) as HttpResponse;

      if (!data.success) {
        alert("Error" + data.message);
      }

      
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-320px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-400/[0.045] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_75%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.055]">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6">
          <a
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-black">
              <Zap size={16} fill="currentColor" />
            </div>

            <span className="text-[17px] font-semibold tracking-[-0.03em]">
              payroll<span className="text-cyan-400">.</span>
            </span>
          </a>

          <a
            href="/signup/employee"
            className="text-[12px] text-zinc-500 transition hover:text-white"
          >
            Have an invitation?
            <span className="ml-1.5 text-white">Join your team</span>
          </a>
        </div>
      </header>

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-76px)] items-center px-6 py-14">
        <div className="mx-auto w-full max-w-[1050px]">
          <div className="grid overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#080808] shadow-[0_40px_120px_rgba(0,0,0,.55)] lg:grid-cols-[0.85fr_1fr]">
            {/* Left panel */}
            <div className="relative hidden overflow-hidden border-r border-white/[0.06] p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">
              <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.045] blur-[100px]" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.045] text-cyan-400">
                  <Wallet size={20} />
                </div>

                <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-cyan-400">
                  Employee workspace
                </p>

                <h1 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-5xl">
                  Your salary.
                  <br />
                  Your
                  <span className="text-zinc-600"> control.</span>
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
                  Track your earnings, manage your payout preference and see
                  every payment from one place.
                </p>
              </div>

              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                      Next salary
                    </p>

                    <p className="mt-2 text-2xl font-medium">$3,800.00</p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/[0.07] text-cyan-400">
                    <Wallet size={15} />
                  </div>
                </div>

                <div className="mt-5 h-px bg-white/[0.05]" />

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-zinc-700">PAYOUT METHOD</p>
                    <p className="mt-1 text-[10px] text-zinc-400">
                      USDC · Solana
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-400/[0.08] px-2 py-1 text-[8px] text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Login panel */}
            <div className="p-7 sm:p-10 lg:p-12 xl:p-16">
              <div className="mx-auto max-w-[410px]">
                {/* Mobile brand context */}
                <div className="mb-10 flex items-center gap-2 lg:hidden">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                    <Wallet size={16} />
                  </div>

                  <div>
                    <p className="text-[11px] text-zinc-500">
                      Employee workspace
                    </p>
                    <p className="text-sm font-medium">Employee sign in</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                    Employee access
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                    Welcome back.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Sign in to see your salary, payout preferences and payment
                    history.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="employee-email"
                      className="mb-2.5 block text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={15}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700"
                      />

                      <input
                        id="employee-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/30 focus:bg-white/[0.035]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="employee-password"
                        className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                      >
                        Password
                      </label>

                      <a
                        href="/forgot-password?role=employee"
                        className="text-[10px] text-zinc-600 transition hover:text-cyan-400"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={15}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700"
                      />

                      <input
                        id="employee-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/30 focus:bg-white/[0.035]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-700 transition hover:text-zinc-300"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}
                  <label className="flex cursor-pointer items-center gap-2.5 text-[11px] text-zinc-600">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-white/10 bg-white/[0.04] accent-cyan-400"
                    />
                    Keep me signed in
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-[13px] font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Security */}
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-zinc-600"
                  />

                  <p className="text-[10px] leading-5 text-zinc-700">
                    Your personal payroll information is protected with secure
                    authentication and role-based access.
                  </p>
                </div>

                {/* Biometric placeholder */}
                <button
                  type="button"
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] text-[11px] text-zinc-500 transition hover:border-white/[0.1] hover:bg-white/[0.025] hover:text-zinc-300"
                >
                  <Fingerprint size={15} />
                  Use passkey
                  <span className="text-zinc-700">Coming soon</span>
                </button>

                {/* Employer switch */}
                <div className="mt-8 border-t border-white/[0.05] pt-7 text-center">
                  <p className="text-[11px] text-zinc-700">
                    Managing a company?
                    <a
                      href="/login/employer"
                      className="ml-1.5 text-zinc-400 transition hover:text-cyan-400"
                    >
                      Employer sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.18em] text-zinc-800">
            Your salary. Your choice.
          </p>
        </div>
      </section>
    </main>
  );
}
