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
  iconColor: "teal" | "blue" | "cyan" | "purple" | "navy" | "sage" | "slate" | "amber";
}

const iconStyles: Record<string, { bg: string; text: string }> = {
  teal: {
    bg: "bg-primary/8",
    text: "text-primary",
  },
  navy: {
    bg: "bg-primary/8",
    text: "text-primary",
  },
  blue: {
    bg: "bg-accent/8",
    text: "text-accent",
  },
  sage: {
    bg: "bg-accent/8",
    text: "text-accent",
  },
  cyan: {
    bg: "bg-accent/8",
    text: "text-accent",
  },
  purple: {
    bg: "bg-violet-500/8",
    text: "text-violet-600 dark:text-violet-400",
  },
  slate: {
    bg: "bg-muted",
    text: "text-muted-foreground",
  },
  amber: {
    bg: "bg-amber-500/8",
    text: "text-amber-600 dark:text-amber-400",
  },
};

export function StatsCard({ title, value, change, icon: Icon, iconColor }: StatsCardProps) {
  const style = iconStyles[iconColor] || iconStyles.teal;
  
  return (
    <div className="group rounded-2xl bg-card border border-border/50 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-border">
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
          style.bg
        )}>
          <Icon className={cn("w-5 h-5", style.text)} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
              change.trend === "up"
                ? "bg-green-500/8 text-green-600 dark:text-green-400"
                : "bg-red-500/8 text-red-600 dark:text-red-400"
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