import { Calendar, UserPlus, FileText, Pill, MessageSquare, Phone } from "lucide-react";

const actions = [
  { icon: Calendar, label: "New Appointment", color: "text-primary" },
  { icon: UserPlus, label: "Add Patient", color: "text-accent" },
  { icon: FileText, label: "Create Rx", color: "text-primary" },
  { icon: Pill, label: "Med Reminder", color: "text-accent" },
  { icon: MessageSquare, label: "WhatsApp", color: "text-primary" },
  { icon: Phone, label: "Voice Call", color: "text-accent" },
];

export function QuickActions() {
  return (
    <div className="rounded-xl bg-card border border-border/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
          >
            <action.icon className={`w-5 h-5 ${action.color} transition-all duration-300 group-hover:scale-110`} />
            <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
