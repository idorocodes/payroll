import { type FormEvent, useState } from "react";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { api } from "../lib/api";

export default function EmployerLogin() {
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
       * POST /api/v1/auth/employer/login
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

      console.log("Employer login:", {
        email,
        password,
      });

      const formData = {email, password};
      await api.auth.employeelogin(formData);
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
            href="/signup/company"
            className="text-[12px] text-zinc-500 transition hover:text-white"
          >
            New company?
            <span className="ml-1.5 text-white">Create account</span>
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
                  <Building2 size={20} />
                </div>

                <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-cyan-400">
                  Company workspace
                </p>

                <h1 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-5xl">
                  Your payroll,
                  <br />
                  already
                  <span className="text-zinc-600"> moving.</span>
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
                  Manage employees, payroll runs, treasury and payouts from one
                  place.
                </p>
              </div>

              <div className="relative space-y-3">
                <InfoRow
                  number="01"
                  title="Manage your team"
                  text="Keep employee records and compensation in one workspace."
                />

                <InfoRow
                  number="02"
                  title="Run payroll"
                  text="Review, approve and execute payroll without spreadsheets."
                />

                <InfoRow
                  number="03"
                  title="Track every payout"
                  text="Know exactly where every payment stands."
                />
              </div>
            </div>

            {/* Login panel */}
            <div className="p-7 sm:p-10 lg:p-12 xl:p-16">
              <div className="mx-auto max-w-[410px]">
                {/* Mobile brand context */}
                <div className="mb-10 flex items-center gap-2 lg:hidden">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                    <Building2 size={16} />
                  </div>

                  <div>
                    <p className="text-[11px] text-zinc-500">
                      Company workspace
                    </p>
                    <p className="text-sm font-medium">Employer sign in</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                    Employer access
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                    Welcome back.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Sign in to your company workspace and continue managing
                    payroll.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="employer-email"
                      className="mb-2.5 block text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                    >
                      Work email
                    </label>

                    <div className="relative">
                      <Mail
                        size={15}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700"
                      />

                      <input
                        id="employer-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@company.com"
                        className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/30 focus:bg-white/[0.035]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="employer-password"
                        className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                      >
                        Password
                      </label>

                      <a
                        href="/forgot-password?role=employer"
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
                        id="employer-password"
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
                        Sign in to workspace
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
                    Your company workspace is protected with role-based access
                    and secure authentication.
                  </p>
                </div>

                {/* Employee switch */}
                <div className="mt-8 border-t border-white/[0.05] pt-7 text-center">
                  <p className="text-[11px] text-zinc-700">
                    Are you an employee?
                    <a
                      href="/login/employee"
                      className="ml-1.5 text-zinc-400 transition hover:text-cyan-400"
                    >
                      Employee sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.18em] text-zinc-800">
            Payroll infrastructure for modern teams
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoRow({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-t border-white/[0.055] pt-5">
      <span className="text-[9px] tracking-[0.18em] text-zinc-700">
        {number}
      </span>

      <div>
        <p className="text-xs font-medium text-zinc-300">{title}</p>
        <p className="mt-1.5 max-w-xs text-[10px] leading-5 text-zinc-700">
          {text}
        </p>
      </div>
    </div>
  );
}
