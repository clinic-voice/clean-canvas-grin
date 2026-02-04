import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { StatsCard } from "@/components/clinicvoice/StatsCard";
import { AppointmentRow } from "@/components/clinicvoice/AppointmentRow";
import { VoiceAIWidget } from "@/components/clinicvoice/VoiceAIWidget";
import { QuickActions } from "@/components/clinicvoice/QuickActions";
import { FloatingParticles } from "@/components/clinicvoice/FloatingParticles";
import { Calendar, Users, Phone, TrendingUp, Clock, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const todaysAppointments = [
  {
    patientName: "Priya Lakshmi",
    patientInitials: "PL",
    reason: "General Checkup",
    time: "09:00",
    status: "completed" as const,
  },
  {
    patientName: "Rajesh Kumar",
    patientInitials: "RK",
    reason: "Follow-up Consultation",
    time: "09:30",
    status: "in-progress" as const,
  },
  {
    patientName: "Meera Sundaram",
    patientInitials: "MS",
    reason: "Diabetes Review",
    time: "10:00",
    status: "waiting" as const,
  },
  {
    patientName: "Karthik Venkat",
    patientInitials: "KV",
    reason: "Blood Pressure Check",
    time: "10:30",
    status: "confirmed" as const,
  },
  {
    patientName: "Anitha Rajan",
    patientInitials: "AR",
    reason: "Lab Results Discussion",
    time: "11:00",
    status: "confirmed" as const,
  },
];

const aiInsights = [
  {
    icon: AlertCircle,
    title: "5 patients due for follow-up",
    description: "Based on last visit dates",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    icon: CheckCircle2,
    title: "Medication adherence improved",
    description: "12% increase this week",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: Clock,
    title: "Peak hours: 10AM - 12PM",
    description: "Consider adding slots",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, Dr. Santhira. Here's your clinic overview."
    >
      {/* Hero Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6 rounded-xl overflow-hidden"
      >
        <div className="relative bg-primary/5 border border-primary/10 rounded-xl p-6 md:p-8">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI-Powered Dashboard</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1 tracking-tight">
                Good Morning, Dr. Santhira! 👋
              </h2>
              <p className="text-muted-foreground">
                Your clinic is performing <span className="text-primary font-semibold">18% better</span> than last week
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  AI Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatsCard
            title="Today's Appointments"
            value="24"
            change={{ value: "+12%", trend: "up" }}
            icon={Calendar}
            iconColor="teal"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StatsCard
            title="Total Patients"
            value="1,847"
            change={{ value: "+3.2%", trend: "up" }}
            icon={Users}
            iconColor="cyan"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatsCard
            title="Voice Calls Handled"
            value="47"
            change={{ value: "+28%", trend: "up" }}
            icon={Phone}
            iconColor="blue"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <StatsCard
            title="Revenue Today"
            value="₹28,500"
            change={{ value: "+8%", trend: "up" }}
            icon={TrendingUp}
            iconColor="purple"
          />
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6"
      >
        {/* Appointments Column */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">
          {/* Today's Appointments */}
          <div className="rounded-xl bg-card border border-border/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Today's Appointments
              </h3>
              <button className="text-xs font-medium text-primary hover:underline transition-colors">
                View All →
              </button>
            </div>
            <div className="p-4">
              {todaysAppointments.map((appointment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <AppointmentRow {...appointment} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-xl bg-card border border-border/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-border/60">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Insights
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${insight.bgColor} group-hover:scale-105 transition-transform duration-300`}>
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {insight.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Voice AI Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <VoiceAIWidget
              isActive={true}
              callsToday={47}
              resolutionRate={95}
              currentCall={{
                patientName: "Kavitha M.",
                duration: "2:34",
              }}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <QuickActions />
          </motion.div>

          {/* Tamil Greeting Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="relative rounded-xl p-5 bg-primary/5 border border-primary/10 overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-xl font-bold text-foreground mb-2">வணக்கம்! 🙏</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your Tamil Voice AI is helping patients book appointments 24/7
              </p>
              <div className="mt-4 p-4 rounded-xl bg-card border border-border/60">
                <p className="text-sm text-muted-foreground italic">
                  "Naalai 10 mani-ku appointment confirm aagividuthu!"
                </p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Recent AI Call
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
