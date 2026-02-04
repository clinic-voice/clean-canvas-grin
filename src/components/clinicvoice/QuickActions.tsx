import { Calendar, UserPlus, FileText, Pill, MessageSquare, Phone } from "lucide-react";

const actions = [
  { icon: Calendar, label: "New Appointment", color: "text-blue-600 dark:text-blue-400" },
  { icon: UserPlus, label: "Add Patient", color: "text-green-600 dark:text-green-400" },
  { icon: FileText, label: "Create Rx", color: "text-purple-600 dark:text-purple-400" },
  { icon: Pill, label: "Med Reminder", color: "text-orange-600 dark:text-orange-400" },
  { icon: MessageSquare, label: "WhatsApp", color: "text-green-600 dark:text-green-400" },
  { icon: Phone, label: "Voice Call", color: "text-primary" },
];

export function QuickActions() {
  return (
    <div className="rounded-lg bg-card border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95"
          >
            <action.icon className={`w-6 h-6 ${action.color} transition-all duration-300 group-hover:scale-110`} />
            <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
