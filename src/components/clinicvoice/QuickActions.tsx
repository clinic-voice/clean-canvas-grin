import { Calendar, UserPlus, FileText, Pill, MessageSquare, Phone } from "lucide-react";

const actions = [
  { icon: Calendar, label: "New Appointment", color: "text-cv-blue" },
  { icon: UserPlus, label: "Add Patient", color: "text-cv-success" },
  { icon: FileText, label: "Create Rx", color: "text-cv-accent" },
  { icon: Pill, label: "Med Reminder", color: "text-cv-secondary" },
  { icon: MessageSquare, label: "WhatsApp", color: "text-cv-success" },
  { icon: Phone, label: "Voice Call", color: "text-cv-primary-light" },
];

export function QuickActions() {
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cv-text-primary">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border hover:border-cv-primary/50 hover:bg-cv-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-cv-primary/10 active:scale-95"
          >
            <action.icon className={`w-6 h-6 ${action.color} transition-all duration-300 group-hover:scale-125 group-hover:rotate-6`} />
            <span className="text-xs text-cv-text-secondary font-medium group-hover:text-cv-text-primary transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
