type Props = {
  label: string;
  value: string;
  trend?: string;
};

export default function Metric({ label, value, trend }: Props) {
  return (
    <div className="rounded-2xl border border-white/[.06] bg-[#080a0b] p-5">
      <p className="text-[9px] uppercase tracking-[.16em] text-zinc-700">
        {label}
      </p>
      <p className="mt-3 text-2xl font-medium tracking-[-.04em]">{value}</p>
      {trend && <p className="mt-1 text-[9px] text-emerald-400">{trend}</p>}
    </div>
  );
}