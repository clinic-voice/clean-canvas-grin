import { cn } from "@/lib/utils";

interface AppointmentRowProps {
  patientName: string;
  patientInitials: string;
  reason: string;
  time: string;
  status: "confirmed" | "waiting" | "in-progress" | "completed";
}

const statusStyles = {
  confirmed: "bg-cv-success/20 text-cv-success",
  waiting: "bg-cv-warning/20 text-cv-warning",
  "in-progress": "bg-cv-blue/20 text-cv-blue",
  completed: "bg-muted text-cv-text-muted",
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
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cv-blue to-cv-accent flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0">
        {patientInitials}
      </div>

      {/* Patient Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-cv-text-primary truncate">{patientName}</p>
        <p className="text-xs text-cv-text-muted truncate">{reason}</p>
      </div>

      {/* Time */}
      <div className="text-right mr-4">
        <p className="text-sm font-semibold text-cv-text-primary">{time}</p>
        <p className="text-xs text-cv-text-muted">Today</p>
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
