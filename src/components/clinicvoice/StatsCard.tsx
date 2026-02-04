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
  blue: "bg-blue-100 dark:bg-blue-900/30",
  green: "bg-green-100 dark:bg-green-900/30",
  orange: "bg-orange-100 dark:bg-orange-900/30",
  purple: "bg-violet-100 dark:bg-violet-900/30",
};

const iconTextColors = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  orange: "text-orange-600 dark:text-orange-400",
  purple: "text-violet-600 dark:text-violet-400",
};

export function StatsCard({ title, value, change, icon: Icon, iconColor }: StatsCardProps) {
  return (
    <div className="group rounded-lg bg-card border border-border p-3 md:p-5 transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer">
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className={cn(
          "w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105",
          iconBgColors[iconColor]
        )}>
          <Icon className={cn("w-4 h-4 md:w-5 md:h-5", iconTextColors[iconColor])} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium",
              change.trend === "up"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
      <p className="text-lg md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{value}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
    </div>
  );
}