import { useState } from "react";
import { Link } from "react-router-dom";
import SignupShell from "../components/SignupShell";
import Field from "../components/Field";
import Select from "../components/Select";
import { api } from "../lib/api";

export default function CompanySignup() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company: "",
    legal: "",
    website: "",
    industry: "",
    size: "",
    country: "",
    first: "",
    last: "",
    email: "",
    password: "",
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
      await api.auth.companySignup(form);
    } catch {
      // The API is intentionally a placeholder.
      // Demo onboarding continues when the backend is unavailable.
    } finally {
      setLoading(false);
      setDone(true);
    }
  }

  if (done) {
    return (
      <SignupShell kind="company" step={3}>
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[.035] p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
            ✓
          </div>
          <h2 className="mt-6 text-2xl font-medium">Workspace created</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {form.company || "Your company"} is ready for employee onboarding
            and payroll setup.
          </p>
          <Link
            to="/company"
            className="mt-7 inline-flex h-11 items-center rounded-full bg-white px-6 text-xs font-medium text-black"
          >
            Open company dashboard
          </Link>
        </div>
      </SignupShell>
    );
  }

  return (
    <SignupShell
      kind="company"
      step={step}
      onBack={() => setStep((current) => current - 1)}
    >
      <div className="rounded-2xl border border-white/[.07] bg-[#080a0b] p-6 sm:p-8">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-medium">
              Tell us about your company
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Start with the organization your payroll workspace belongs to.
            </p>

            <div className="mt-7 space-y-5">
              <Field
                label="Company name"
                placeholder="Arc Labs"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
              />
              <Field
                label="Legal company name"
                placeholder="Arc Labs Technologies Ltd."
                value={form.legal}
                onChange={(event) => update("legal", event.target.value)}
              />
              <Field
                label="Company website"
                placeholder="https://example.com"
                value={form.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-medium">Shape your workspace</h2>
            <p className="mt-2 text-sm text-zinc-600">
              A little context helps configure the right payroll experience.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Select
                label="Industry"
                value={form.industry}
                onChange={(value) => update("industry", value)}
                options={["Software", "Finance", "Commerce", "Consulting", "Other"]}
              />
              <Select
                label="Team size"
                value={form.size}
                onChange={(value) => update("size", value)}
                options={["1–10", "11–50", "51–200", "201–500", "500+"]}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Primary operating country"
                  placeholder="Nigeria"
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-medium">Create your admin account</h2>
            <p className="mt-2 text-sm text-zinc-600">
              This account will manage the company payroll workspace.
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
                  label="Work email"
                  type="email"
                  placeholder="alex@company.com"
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

        <button
          disabled={loading}
          onClick={next}
          className="mt-8 h-12 w-full rounded-xl bg-white text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading
            ? "Creating workspace..."
            : step === 3
              ? "Create company workspace"
              : "Continue"}
        </button>
      </div>
    </SignupShell>
  );
}