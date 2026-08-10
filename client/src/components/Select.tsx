type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function Select({ label, value, onChange, options }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium text-zinc-300">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-white/[.08] bg-[#090b0c] px-3.5 text-sm text-zinc-300 outline-none focus:border-cyan-300/30"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
