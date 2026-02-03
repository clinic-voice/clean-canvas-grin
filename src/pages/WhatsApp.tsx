import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Clock, 
  CheckCircle2, 
  Users, 
  FileText, 
  TrendingUp, 
  MoreVertical,
  Calendar,
  CreditCard,
  Heart
} from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Messages Today", value: "156", change: "+12%", icon: MessageSquare, color: "text-cv-primary" },
  { label: "Delivery Rate", value: "98.5%", change: "+0.3%", icon: CheckCircle2, color: "text-cv-success" },
  { label: "Response Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-cv-accent" },
  { label: "Active Templates", value: "12", change: "3 new", icon: FileText, color: "text-cv-warning" },
];

const conversations = [
  { id: 1, name: "Priya Lakshmi", phone: "+91 98765 43210", lastMessage: "நன்றி டாக்டர், நாளை வருகிறேன்", time: "2 min ago", unread: true, avatar: "PL" },
  { id: 2, name: "Rajesh Kumar", phone: "+91 87654 32109", lastMessage: "Appointment confirmed for tomorrow", time: "15 min ago", unread: true, avatar: "RK" },
  { id: 3, name: "Meena Devi", phone: "+91 76543 21098", lastMessage: "மருந்து எடுத்துக்கொண்டேன்", time: "1 hour ago", unread: false, avatar: "MD" },
  { id: 4, name: "Suresh Babu", phone: "+91 65432 10987", lastMessage: "Thank you for the reminder", time: "2 hours ago", unread: false, avatar: "SB" },
  { id: 5, name: "Lakshmi Narayanan", phone: "+91 54321 09876", lastMessage: "Can I reschedule?", time: "3 hours ago", unread: false, avatar: "LN" },
  { id: 6, name: "Anitha Raman", phone: "+91 43210 98765", lastMessage: "Bill payment done ✓", time: "5 hours ago", unread: false, avatar: "AR" },
];

const templates = [
  { 
    id: 1, 
    name: "Appointment Reminder", 
    category: "Appointments",
    tamil: "வணக்கம் {name}! உங்கள் சந்திப்பு {date} அன்று {time} மணிக்கு உள்ளது.",
    english: "Hello {name}! Your appointment is scheduled for {date} at {time}.",
    icon: Calendar
  },
  { 
    id: 2, 
    name: "Payment Reminder", 
    category: "Billing",
    tamil: "வணக்கம் {name}! உங்கள் நிலுவை தொகை ₹{amount}. தயவுசெய்து செலுத்தவும்.",
    english: "Hello {name}! Your pending amount is ₹{amount}. Please make the payment.",
    icon: CreditCard
  },
  { 
    id: 3, 
    name: "Follow-up Care", 
    category: "Follow-up",
    tamil: "வணக்கம் {name}! உங்கள் ஆரோக்கியம் எப்படி உள்ளது? மருந்துகள் எடுத்துக்கொள்கிறீர்களா?",
    english: "Hello {name}! How are you feeling? Are you taking your medications regularly?",
    icon: Heart
  },
  { 
    id: 4, 
    name: "General Update", 
    category: "General",
    tamil: "வணக்கம் {name}! கிளினிக் {date} முதல் {end_date} வரை விடுமுறையில் இருக்கும்.",
    english: "Hello {name}! The clinic will be closed from {date} to {end_date}.",
    icon: Bell
  },
];

const quickActions = [
  { label: "Send Reminder", icon: Bell, description: "Send appointment reminders to patients" },
  { label: "Broadcast Message", icon: Users, description: "Send message to all patients" },
  { label: "Schedule Campaign", icon: Clock, description: "Plan messages for later" },
];

export default function WhatsApp() {
  const [reminders, setReminders] = useState({
    appointment24h: true,
    appointment48h: true,
    followUp: true,
    payment: false,
  });

  return (
    <DashboardLayout 
      title="WhatsApp Integration" 
      subtitle="Manage patient communications and automated reminders"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", 
                  stat.color === "text-cv-primary" && "bg-cv-primary/20",
                  stat.color === "text-cv-success" && "bg-cv-success/20",
                  stat.color === "text-cv-accent" && "bg-cv-accent/20",
                  stat.color === "text-cv-warning" && "bg-cv-warning/20"
                )}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <span className="text-xs text-cv-success font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-cv-text-primary">{stat.value}</p>
              <p className="text-sm text-cv-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Conversations */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-cv-text-primary">Recent Conversations</h2>
              <Button variant="ghost" size="sm" className="text-cv-primary">View All</Button>
            </div>
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div 
                  key={conv.id} 
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                    conv.unread ? "bg-cv-primary/5 border border-cv-primary/20" : "hover:bg-muted/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cv-primary to-cv-accent flex items-center justify-center text-white font-medium text-sm">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn("font-medium text-cv-text-primary", conv.unread && "font-semibold")}>
                        {conv.name}
                      </p>
                      <span className="text-xs text-cv-text-secondary">{conv.time}</span>
                    </div>
                    <p className="text-sm text-cv-text-secondary truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-cv-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-5">
              <h2 className="text-lg font-semibold text-cv-text-primary mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 px-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cv-primary/20 flex items-center justify-center mr-3">
                      <action.icon className="w-5 h-5 text-cv-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-cv-text-primary">{action.label}</p>
                      <p className="text-xs text-cv-text-secondary">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Automated Reminders */}
            <div className="rounded-xl bg-card border border-border p-5">
              <h2 className="text-lg font-semibold text-cv-text-primary mb-4">Automated Reminders</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-cv-text-primary">24h Before Appointment</p>
                    <p className="text-xs text-cv-text-secondary">Send reminder 24 hours before</p>
                  </div>
                  <Switch 
                    checked={reminders.appointment24h} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, appointment24h: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-cv-text-primary">48h Before Appointment</p>
                    <p className="text-xs text-cv-text-secondary">Send reminder 48 hours before</p>
                  </div>
                  <Switch 
                    checked={reminders.appointment48h} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, appointment48h: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-cv-text-primary">Follow-up Messages</p>
                    <p className="text-xs text-cv-text-secondary">Check on patients after visits</p>
                  </div>
                  <Switch 
                    checked={reminders.followUp} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, followUp: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-cv-text-primary">Payment Reminders</p>
                    <p className="text-xs text-cv-text-secondary">Send pending payment alerts</p>
                  </div>
                  <Switch 
                    checked={reminders.payment} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, payment: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Templates */}
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-cv-text-primary">Message Templates</h2>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="rounded-lg border border-border p-4 hover:border-cv-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cv-primary/20 flex items-center justify-center">
                      <template.icon className="w-5 h-5 text-cv-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-cv-text-primary">{template.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-cv-text-secondary">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-muted/50">
                    <p className="text-xs text-cv-text-secondary mb-1">Tamil</p>
                    <p className="text-cv-text-primary">{template.tamil}</p>
                  </div>
                  <div className="p-2 rounded bg-muted/50">
                    <p className="text-xs text-cv-text-secondary mb-1">English</p>
                    <p className="text-cv-text-primary">{template.english}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1 gradient-primary text-white">
                    <Send className="w-3 h-3 mr-1" />
                    Use Template
                  </Button>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
