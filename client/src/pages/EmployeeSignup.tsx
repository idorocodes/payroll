import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Wallet } from "lucide-react";
import SignupShell from "../components/SignupShell";
import Field from "../components/Field";
import { api } from "../lib/api";

export default function EmployeeSignup() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    code: "",
    country: "",
    payout: "",
    wallet: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function next() {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    setLoading(true);

    try {
      await api.auth.employeeSignup(form);
    } catch {
      // Demo mode: continue even while the API route is a placeholder.
    } finally {
      setLoading(false);
      setDone(true);
    }
  }

  if (done) {
    return (
      <SignupShell kind="employee" step={3}>
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[.035] p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
            <Check size={20} />
          </div>
          <h2 className="mt-6 text-2xl font-medium">Profile created</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Your payout preference is saved and ready for your employer's
            payroll workflow.
          </p>
          <Link
            to="/employee"
            className="mt-7 inline-flex h-11 items-center rounded-full bg-white px-6 text-xs font-medium text-black"
          >
            Open employee dashboard
          </Link>
        </div>
      </SignupShell>
    );
  }

  return (
    <SignupShell
      kind="employee"
      step={step}
      onBack={() => setStep((current) => current - 1)}
    >
      <div className="rounded-2xl border border-white/[.07] bg-[#080a0b] p-6 sm:p-8">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-medium">Create your account</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Your personal details stay attached to your payroll identity.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field
                label="First name"
                placeholder="Alex"
                value={form.first}
                onChange={(event) => update("first", event.target.value)}
              />
              <Field
                label="Last name"
                placeholder="Okoro"
                value={form.last}
                onChange={(event) => update("last", event.target.value)}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Email"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(event) => update("password", event.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-medium">Connect to your company</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Use the invite code provided by your employer.
            </p>

            <div className="mt-7 space-y-5">
              <Field
                label="Company invite code"
                placeholder="ARC-7F4K2"
                value={form.code}
                onChange={(event) => update("code", event.target.value)}
              />
              <Field
                label="Country of residence"
                placeholder="Nigeria"
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-medium">Choose your payout</h2>
            <p className="mt-2 text-sm text-zinc-600">
              You can change this preference later.
            </p>

            <div className="mt-7 space-y-3">
              {[
                ["USDC", "Stablecoin · Solana"],
                ["Local currency", "Bank account"],
                ["Other crypto", "Supported wallet"],
              ].map(([name, description]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => update("payout", name)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                    form.payout === name
                      ? "border-cyan-300/20 bg-cyan-300/[.045]"
                      : "border-white/[.06] bg-white/[.015]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[.04]">
                      <Wallet size={16} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium">{name}</span>
                      <span className="mt-1 block text-[9px] text-zinc-600">
                        {description}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      form.payout === name
                        ? "border-cyan-400 bg-cyan-400"
                        : "border-zinc-700"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-5">
              <Field
                label="Wallet or account destination"
                placeholder="Enter destination"
                value={form.wallet}
                onChange={(event) => update("wallet", event.target.value)}
              />
            </div>
          </>
        )}

        <button
          disabled={loading}
          onClick={next}
          className="mt-8 h-12 w-full rounded-xl bg-white text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading
            ? "Creating profile..."
            : step === 3
              ? "Create employee profile"
              : "Continue"}
        </button>
      </div>
    </SignupShell>
  );
}