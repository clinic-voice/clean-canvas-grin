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
    <div className="rounded-xl bg-card border border-border p-5 transition-all hover:shadow-lg hover:border-cv-primary/30">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBgColors[iconColor])}>
          <Icon className={cn("w-5 h-5", iconTextColors[iconColor])} />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold",
              change.trend === "up"
                ? "bg-cv-success/20 text-cv-success"
                : "bg-cv-danger/20 text-cv-danger"
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
      <p className="text-2xl font-extrabold text-cv-text-primary mb-1">{value}</p>
      <p className="text-sm text-cv-text-muted">{title}</p>
    </div>
  );
}
