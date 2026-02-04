import { cn } from "@/lib/utils";

interface AppointmentRowProps {
  patientName: string;
  patientInitials: string;
  reason: string;
  time: string;
  status: "confirmed" | "waiting" | "in-progress" | "completed";
}

const statusStyles = {
  confirmed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  waiting: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  "in-progress": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  completed: "bg-muted text-muted-foreground",
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
    <div className="flex items-center py-3 border-b border-border/50 last:border-b-0">
      {/* Patient Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm mr-3 flex-shrink-0">
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
          "px-2.5 py-1 rounded text-xs font-semibold flex-shrink-0",
          statusStyles[status]
        )}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
}
