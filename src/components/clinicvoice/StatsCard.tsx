import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  iconColor: "blue" | "green" | "orange" | "purple";
}

const iconBgColors = {
  blue: "bg-cv-blue/20",
  green: "bg-cv-success/20",
  orange: "bg-cv-secondary/20",
  purple: "bg-cv-accent/20",
};

const iconTextColors = {
  blue: "text-cv-blue",
  green: "text-cv-success",
  orange: "text-cv-secondary",
  purple: "text-cv-accent",
};

export function StatsCard({ title, value, change, icon: Icon, iconColor }: StatsCardProps) {
  return (
    <div className="group rounded-xl bg-card border border-border p-3 md:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cv-primary/10 hover:border-cv-primary/30 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className={cn(
          "w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110",
          iconBgColors[iconColor]
        )}>
          <Icon className={cn("w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-6", iconTextColors[iconColor])} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-semibold",
              change.trend === "up"
                ? "bg-cv-success/20 text-cv-success"
                : "bg-cv-danger/20 text-cv-danger"
            )}
          >
            {change.trend === "up" ? (
              <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3" />
            )}
            {change.value}
          </div>
        )}
      </div>
      <p className="text-lg md:text-2xl font-extrabold text-cv-text-primary mb-0.5 md:mb-1">{value}</p>
      <p className="text-xs md:text-sm text-cv-text-muted">{title}</p>
    </div>
  );
}