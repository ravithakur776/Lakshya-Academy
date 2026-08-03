import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string;
};

export function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  subtitle,
  icon: Icon,
}: Props) {
  return (
    <div className="bg-white border border-emerald-100/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300/80 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</p>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#0F7A3C] group-hover:bg-[#0F7A3C] group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-3xl font-black font-heading text-gray-900 tracking-tight">{value}</p>
        {change && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border",
              changeType === "positive" && "bg-emerald-50 text-emerald-700 border-emerald-200",
              changeType === "negative" && "bg-red-50 text-red-700 border-red-200",
              changeType === "neutral" && "bg-gray-50 text-gray-700 border-gray-200"
            )}
          >
            {changeType === "positive" && <TrendingUp className="h-3 w-3" />}
            {changeType === "negative" && <TrendingDown className="h-3 w-3" />}
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-gray-400 font-medium mt-1">{subtitle}</p>}
    </div>
  );
}
