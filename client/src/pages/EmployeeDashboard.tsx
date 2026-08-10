import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock3, Wallet } from "lucide-react";
import Brand from "../components/Brand";
import Metric from "../components/Metric";
import Panel from "../components/Panel";
import { api } from "../lib/api";

const employee = {
  name: "Alex Okoro",
  role: "Software Engineer",
  company: "Arc Labs",
  salary: "$3,800",
  payout: "USDC",
  network: "Solana",
  wallet: "7xK...9Qp",
  nextPayday: "Aug 31, 2026",
  paid: "$30,400",
};

export default function EmployeeDashboard() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    api.employee.dashboard().then(() => setLive(true)).catch(() => setLive(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#030405] text-white">
      <header className="border-b border-white/[.055]">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5">
          <Brand />
          <span className="flex items-center gap-2 text-[9px] text-zinc-700">
            <i
              className={`h-1.5 w-1.5 rounded-full ${
                live ? "bg-emerald-400" : "bg-cyan-400"
              }`}
            />
            {live ? "Connected" : "Demo data"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-10 sm:px-6 lg:py-14">
        <p className="text-[10px] uppercase tracking-[.2em] text-cyan-400">
          Employee dashboard
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
          Your salary.
          <br />
          <span className="text-zinc-600">Your control.</span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
          Track your earnings, payout preference and upcoming salary from one
          place.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <Panel title="Next salary">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-4xl font-medium">{employee.salary}</p>
                <p className="mt-2 text-xs text-zinc-600">
                  Expected {employee.nextPayday}
                </p>
              </div>

              <span className="flex w-fit items-center gap-1.5 rounded-full bg-amber-400/[.08] px-3 py-1.5 text-[9px] text-amber-300">
                <Clock3 size={11} />
                Scheduled
              </span>
            </div>

            <div className="mt-8 h-1.5 rounded-full bg-white/[.05]">
              <div className="h-full w-[82%] rounded-full bg-cyan-400" />
            </div>
          </Panel>

          <Panel title="Current payout">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                <Wallet size={16} />
              </span>
              <div>
                <p className="text-[9px] text-zinc-700">PAYOUT METHOD</p>
                <p className="mt-1 text-sm font-medium">{employee.payout}</p>
              </div>
            </div>

            <p className="mt-7 text-[10px] text-zinc-600">
              {employee.network} · {employee.wallet}
            </p>

            <button className="mt-5 text-[10px] text-zinc-400">
              Change payout preference{" "}
              <ArrowRight size={12} className="ml-1 inline" />
            </button>
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Metric label="Paid this year" value={employee.paid} />
          <Metric label="Employer" value={employee.company} />
          <Metric label="Role" value={employee.role} />
        </div>

        <div className="mt-4">
          <Panel title="Recent salary history">
            <div className="space-y-2">
              {["July 31, 2026", "June 30, 2026", "May 29, 2026"].map(
                (date) => (
                  <div
                    key={date}
                    className="flex items-center justify-between rounded-xl border border-white/[.05] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/[.08] text-emerald-400">
                        <Check size={13} />
                      </span>
                      <div>
                        <p className="text-xs font-medium">{date}</p>
                        <p className="mt-1 text-[9px] text-zinc-700">
                          Salary · {employee.payout}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs">{employee.salary}</p>
                      <p className="mt-1 text-[9px] text-emerald-400">Settled</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}
