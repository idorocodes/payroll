import { useEffect, useState } from "react";
import DashboardFrame from "../components/DashboardFrame";
import Metric from "../components/Metric";
import Panel from "../components/Panel";
import { api } from "../lib/api";

const company = {
  name: "Arc Labs",
  payroll: "$42,860",
  treasury: "$84,290.42",
};

const employees = [
  ["AO", "Alex Okoro", "Software Engineer", "Lagos, NG", "$3,800", "USDC · Solana", "Paid"],
  ["SM", "Sarah Mensah", "Product Designer", "Accra, GH", "$2,900", "NGN · Bank", "Paid"],
  ["DK", "Daniel Kim", "Growth", "Seoul, KR", "$3,200", "USDC · Ethereum", "Paid"],
  ["JM", "Julia Martins", "Product Manager", "Lisbon, PT", "$4,100", "EUR · Bank", "Processing"],
];

export default function CompanyDashboard() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    api.company.dashboard().then(() => setLive(true)).catch(() => setLive(false));
  }, []);

  return (
    <DashboardFrame title={company.name}>
      <div className="flex flex-col gap-7">
        <div>
          <p className="text-[10px] uppercase tracking-[.18em] text-zinc-700">
            Company overview
          </p>
          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-.05em]">
                Good morning, Arc Labs.
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                Your payroll operation at a glance.
              </p>
            </div>
            <span className="text-[9px] text-zinc-700">
              <i
                className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                  live ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
              {live ? "Connected to API" : "Demo data"}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Payroll" value={company.payroll} trend="+8.2% this month" />
          <Metric label="Employees" value="24" />
          <Metric label="Treasury" value={company.treasury} />
          <Metric label="Next payroll" value="Aug 31" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
          <Panel title="Payroll spend">
            <div className="text-2xl font-medium">$42,860</div>
            <p className="mt-1 text-[9px] text-emerald-400">
              +8.2% from last month
            </p>

            <div className="relative mt-7 h-40">
              <svg
                className="h-full w-full"
                viewBox="0 0 800 180"
                preserveAspectRatio="none"
                aria-label="Payroll spend trend"
              >
                <defs>
                  <linearGradient id="payrollChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity=".18" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 145 C90 132 100 145 170 110 C245 73 280 116 345 92 C420 64 455 95 525 56 C595 17 620 68 690 42 C735 25 770 35 800 17 L800 180 L0 180Z"
                  fill="url(#payrollChartFill)"
                />
                <path
                  d="M0 145 C90 132 100 145 170 110 C245 73 280 116 345 92 C420 64 455 95 525 56 C595 17 620 68 690 42 C735 25 770 35 800 17"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Panel>

          <Panel title="Treasury">
            <div className="rounded-xl border border-white/[.06] p-5">
              <p className="text-[9px] uppercase tracking-[.15em] text-zinc-700">
                Available
              </p>
              <p className="mt-2 text-xl font-medium">{company.treasury}</p>
              <div className="mt-6 h-1.5 rounded-full bg-white/[.05]">
                <div className="h-full w-[74%] rounded-full bg-cyan-400" />
              </div>
              <p className="mt-2 text-[9px] text-zinc-700">
                74% available for payroll
              </p>
            </div>
            <button className="mt-3 h-11 w-full rounded-xl border border-white/[.07] text-xs text-zinc-400">
              Manage treasury
            </button>
          </Panel>
        </div>

        <Panel title="Recent employees">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {employees.map(
                ([initials, name, role, location, amount, rail, status]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1.5fr_1fr_.9fr_.7fr] items-center border-b border-white/[.04] px-3 py-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[.05] text-[9px]">
                        {initials}
                      </span>
                      <span>
                        <span className="block text-xs font-medium">{name}</span>
                        <span className="mt-1 block text-[9px] text-zinc-700">
                          {role}
                        </span>
                      </span>
                    </div>

                    <span className="text-[10px] text-zinc-500">{location}</span>

                    <span>
                      <span className="block text-[10px]">{amount}</span>
                      <span className="mt-1 block text-[8px] text-zinc-700">
                        {rail}
                      </span>
                    </span>

                    <span
                      className={`w-fit rounded-full px-2 py-1 text-[8px] ${
                        status === "Paid"
                          ? "bg-emerald-400/[.08] text-emerald-400"
                          : "bg-amber-400/[.08] text-amber-300"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </Panel>
      </div>
    </DashboardFrame>
  );
}