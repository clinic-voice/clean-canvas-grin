import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Mic, Phone, PhoneIncoming, PhoneOff, PhoneMissed, 
  Settings, Play, Pause, Volume2, Clock, CheckCircle2,
  MessageSquare, TrendingUp, Activity
} from "lucide-react";

const recentCalls = [
  {
    id: 1,
    caller: "Priya L.",
    phone: "+91 98765 43210",
    time: "2 min ago",
    duration: "2:34",
    type: "incoming",
    status: "completed",
    action: "Appointment Booked - Tomorrow 10:00 AM",
  },
  {
    id: 2,
    caller: "Unknown",
    phone: "+91 98765 43220",
    time: "15 min ago",
    duration: "0:45",
    type: "incoming",
    status: "completed",
    action: "Clinic Hours Inquiry",
  },
  {
    id: 3,
    caller: "Rajesh K.",
    phone: "+91 98765 43211",
    time: "32 min ago",
    duration: "-",
    type: "missed",
    status: "callback",
    action: "Pending Callback",
  },
  {
    id: 4,
    caller: "Meera S.",
    phone: "+91 98765 43212",
    time: "1 hr ago",
    duration: "1:22",
    type: "incoming",
    status: "completed",
    action: "Rescheduled to Friday",
  },
];

const sampleConversation = [
  { speaker: "patient", text: "Halo, doctor kitta appointment venum", translation: "Hello, I need an appointment with the doctor" },
  { speaker: "ai", text: "Vanakkam! Eppo appointment venum?", translation: "Welcome! When do you need the appointment?" },
  { speaker: "patient", text: "Naalai kaalai vara mudiyuma?", translation: "Can I come tomorrow morning?" },
  { speaker: "ai", text: "Naalai 10:00, 10:30, 11:00 free. Ethu OK?", translation: "Tomorrow 10:00, 10:30, 11:00 are free. Which one?" },
  { speaker: "patient", text: "10 mani okay", translation: "10 o'clock is okay" },
  { speaker: "ai", text: "Super! Confirm aagividuthu. WhatsApp-la details anuppitten!", translation: "Great! It's confirmed. I've sent the details on WhatsApp!" },
];

export default function VoiceAI() {
  return (
    <DashboardLayout
      title="Tamil Voice AI"
      subtitle="24/7 AI-powered appointment booking in Tamil"
    >
      {/* Status Banner */}
      <div className="rounded-xl p-5 mb-6 bg-gradient-to-r from-cv-primary/20 via-cv-accent/10 to-cv-primary/20 border border-cv-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-14 h-14 rounded-full bg-cv-success/20 flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-cv-success flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-cv-text-primary flex items-center gap-2">
                Voice AI is Active
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-cv-success text-white">
                  LIVE
                </span>
              </h2>
              <p className="text-sm text-cv-text-secondary">
                Handling calls automatically in Tamil, English, Telugu, Kannada, Malayalam
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            <button className="px-4 py-2 rounded-lg bg-cv-danger text-white text-sm font-medium hover:bg-cv-danger/90 transition-colors flex items-center gap-2">
              <Pause className="w-4 h-4" />
              Pause AI
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats & Calls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: PhoneIncoming, label: "Calls Today", value: "47", color: "text-cv-blue", bg: "bg-cv-blue/20" },
              { icon: CheckCircle2, label: "Resolved", value: "45", color: "text-cv-success", bg: "bg-cv-success/20" },
              { icon: PhoneMissed, label: "Missed", value: "2", color: "text-cv-warning", bg: "bg-cv-warning/20" },
              { icon: TrendingUp, label: "Resolution", value: "95%", color: "text-cv-primary-light", bg: "bg-cv-primary/20" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-card border border-border p-4 text-center">
                <div className={cn("w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <p className="text-2xl font-bold text-cv-text-primary">{stat.value}</p>
                <p className="text-xs text-cv-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Calls */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-cv-text-primary">Recent Calls</h3>
              <button className="text-xs font-medium text-cv-primary-light hover:underline">
                View All
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentCalls.map((call) => (
                <div key={call.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        call.type === "missed" ? "bg-cv-danger/20" : "bg-cv-success/20"
                      )}>
                        {call.type === "missed" ? (
                          <PhoneMissed className="w-5 h-5 text-cv-danger" />
                        ) : (
                          <PhoneIncoming className="w-5 h-5 text-cv-success" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-cv-text-primary">{call.caller}</p>
                        <p className="text-xs text-cv-text-muted">{call.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-cv-text-secondary">{call.time}</p>
                      {call.duration !== "-" && (
                        <p className="text-xs text-cv-text-muted flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          {call.duration}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 ml-13 pl-13">
                    <p className={cn(
                      "text-xs px-2 py-1 rounded inline-block",
                      call.status === "callback" 
                        ? "bg-cv-warning/20 text-cv-warning" 
                        : "bg-muted text-cv-text-muted"
                    )}>
                      {call.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sample Conversation */}
        <div className="space-y-6">
          {/* Live Waveform */}
          <div className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-cv-text-primary">Voice Activity</h3>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cv-text-muted" />
                <Activity className="w-4 h-4 text-cv-success animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 h-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, Math.random() * 2 + 0.5, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1.5 h-8 rounded-full bg-cv-primary"
                />
              ))}
            </div>
          </div>

          {/* Sample Tamil Conversation */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-cv-text-primary flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cv-primary-light" />
                Sample Tamil Conversation
              </h3>
            </div>
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto hide-scrollbar">
              {sampleConversation.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.speaker === "ai" ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2",
                      msg.speaker === "ai"
                        ? "bg-cv-primary/20 rounded-tl-none"
                        : "bg-muted rounded-tr-none"
                    )}
                  >
                    <p className="text-sm font-medium text-cv-text-primary">{msg.text}</p>
                    <p className="text-[10px] text-cv-text-muted mt-1 italic">{msg.translation}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border bg-muted/30">
              <button className="w-full py-2 rounded-lg bg-cv-primary text-white text-sm font-medium hover:bg-cv-primary-dark transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Play Sample Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
