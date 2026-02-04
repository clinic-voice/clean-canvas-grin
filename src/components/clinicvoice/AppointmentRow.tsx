import { cn } from "@/lib/utils";

interface AppointmentRowProps {
  patientName: string;
  patientInitials: string;
  reason: string;
  time: string;
  status: "confirmed" | "waiting" | "in-progress" | "completed";
}

const statusStyles = {
  confirmed: "bg-primary/10 text-primary",
  waiting: "bg-accent/10 text-accent",
  "in-progress": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  completed: "bg-secondary text-muted-foreground",
};

const statusLabels = {
  confirmed: "Confirmed",
  waiting: "Waiting",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function AppointmentRow({
  patientName,
  patientInitials,
  reason,
  time,
  status,
}: AppointmentRowProps) {
  return (
    <div className="flex items-center py-3 border-b border-border/40 last:border-b-0 group hover:bg-secondary/30 -mx-4 px-4 transition-colors rounded-lg">
      {/* Patient Avatar */}
      <div className="w-10 h-10 rounded-full gradient-teal flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0 shadow-sm">
        {patientInitials}
      </div>

      {/* Patient Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{patientName}</p>
        <p className="text-xs text-muted-foreground truncate">{reason}</p>
      </div>

      {/* Time */}
      <div className="text-right mr-4">
        <p className="text-sm font-semibold text-foreground">{time}</p>
        <p className="text-xs text-muted-foreground">Today</p>
      </div>

      {/* Status */}
      <span
        className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0",
          statusStyles[status]
        )}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
}
