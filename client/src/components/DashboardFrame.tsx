import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import Brand from "./Brand";

type Props = {
  children: ReactNode;
  title: string;
};

export default function DashboardFrame({ children, title }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030405] text-white">
      <header className="sticky top-0 z-40 border-b border-white/[.055] bg-[#030405]/85 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-5 lg:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 text-zinc-500 lg:hidden"
              aria-label="Toggle navigation"
            >
              <Menu size={18} />
            </button>
            <Brand />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] text-zinc-700 sm:block">
              {title}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[.06] text-[9px]">
              AO
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${open ? "block" : "hidden"} fixed inset-x-0 top-16 z-30 border-b border-white/[.06] bg-[#070809] p-4 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-64px)] lg:w-[230px] lg:shrink-0 lg:border-b-0 lg:border-r`}
        >
          <div className="mb-7 rounded-xl border border-white/[.05] bg-white/[.015] p-3">
            <p className="text-[8px] uppercase tracking-[.16em] text-zinc-700">
              Workspace
            </p>
            <p className="mt-2 text-xs font-medium">{title}</p>
          </div>

          {["Overview", "Payroll", "Employees", "Treasury", "Reports"].map(
            (item, index) => (
              <a
                key={item}
                href="#"
                className={`block rounded-lg px-3 py-2.5 text-[11px] ${
                  index === 0
                    ? "bg-white/[.06] text-white"
                    : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {item}
              </a>
            ),
          )}
        </aside>

        <main className="w-full p-5 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>
      </div>
    </div>
  );
}