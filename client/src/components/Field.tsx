import type { InputHTMLAttributes } from "react";

type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export default function Field({ label, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium text-zinc-300">
        {label}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-white/[.08] bg-white/[.025] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-300/30 focus:bg-white/[.04]"
      />
    </label>
  );
}