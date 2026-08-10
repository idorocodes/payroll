import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Panel({ title, children }: Props) {
  return (
    <section className="rounded-2xl border border-white/[.06] bg-[#080a0b] p-5 sm:p-6">
      <h2 className="mb-5 text-sm font-medium">{title}</h2>
      {children}
    </section>
  );
}