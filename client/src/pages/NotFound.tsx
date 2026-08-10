import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Brand from "../components/Brand";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030405] px-5 text-white">
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[.04] blur-[130px]" />

      <div className="relative w-full max-w-[700px] text-center">
        <Brand />

        <p className="mt-20 text-[11px] uppercase tracking-[.25em] text-cyan-400">
          Error 404
        </p>

        <h1 className="mt-5 text-[110px] font-semibold leading-[.78] tracking-[-.09em] sm:text-[160px]">
          404
        </h1>

        <h2 className="mt-10 text-2xl font-medium">
          This payroll route doesn't exist.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-600">
          The page may have moved, never existed, or is still somewhere on the
          roadmap.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex h-11 items-center gap-2 rounded-full bg-white px-6 text-xs font-medium text-black"
          >
            <ArrowLeft size={14} />
            Back home
          </Link>

          <Link
            to="/company"
            className="flex h-11 items-center gap-2 rounded-full border border-white/[.08] px-6 text-xs text-zinc-300"
          >
            Open dashboard
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mx-auto mt-16 flex max-w-sm items-center gap-3 rounded-xl border border-white/[.06] bg-white/[.015] px-4 py-3 text-left">
          <Search size={14} className="text-zinc-700" />
          <span className="text-[10px] text-zinc-700">
            Try returning to the homepage or your dashboard.
          </span>
        </div>
      </div>
    </main>
  );
}