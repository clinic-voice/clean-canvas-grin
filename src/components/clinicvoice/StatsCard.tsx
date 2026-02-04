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
  iconColor: "teal" | "blue" | "cyan" | "purple";
}

const iconStyles = {
  teal: {
    bg: "bg-primary/10",
    text: "text-primary",
  },
  blue: {
    bg: "bg-accent/10",
    text: "text-accent",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  purple: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
  },
};

export function StatsCard({ title, value, change, icon: Icon, iconColor }: StatsCardProps) {
  const style = iconStyles[iconColor];
  
  return (
    <div className="group rounded-xl bg-card border border-border/60 p-4 md:p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={cn(
          "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
          style.bg
        )}>
          <Icon className={cn("w-5 h-5 md:w-5.5 md:h-5.5", style.text)} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              change.trend === "up"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {change.trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change.value}
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 tracking-tight">{value}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
