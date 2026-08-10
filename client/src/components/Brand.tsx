import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-black">
        <Zap size={15} fill="currentColor" />
      </span>
      <span className="text-[17px] font-semibold tracking-[-.04em]">
        payroll<span className="text-cyan-400">.</span>
      </span>
    </Link>
  );
}