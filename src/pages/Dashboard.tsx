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
    color: "text-cv-warning",
    bgColor: "bg-cv-warning/10",
  },
  {
    icon: CheckCircle2,
    title: "Medication adherence improved",
    description: "12% increase this week",
    color: "text-cv-success",
    bgColor: "bg-cv-success/10",
  },
  {
    icon: Clock,
    title: "Peak hours: 10AM - 12PM",
    description: "Consider adding slots",
    color: "text-cv-blue",
    bgColor: "bg-cv-blue/10",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, Dr. Santhira. Here's your clinic overview."
    >
      {/* Hero Welcome Section with Particles */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6 rounded-2xl overflow-hidden"
      >
        <div className="relative bg-gradient-to-br from-cv-primary/20 via-cv-primary/10 to-cv-accent/15 border border-cv-primary/20 rounded-2xl p-6 md:p-8">
          <FloatingParticles count={20} />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-cv-primary-light animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cv-primary-light">AI-Powered Dashboard</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-cv-text-primary mb-1">
                Good Morning, Dr. Santhira! 👋
              </h2>
              <p className="text-cv-text-secondary">
                Your clinic is performing <span className="text-cv-success font-semibold">18% better</span> than last week
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-cv-success/20 border border-cv-success/30">
                <span className="text-sm font-semibold text-cv-success">🟢 AI Active</span>
              </div>
            </div>
          </div>
          
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cv-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-cv-accent/15 rounded-full blur-2xl pointer-events-none" />
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
            iconColor="blue"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StatsCard
            title="Total Patients"
            value="1,847"
            change={{ value: "+3.2%", trend: "up" }}
            icon={Users}
            iconColor="green"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatsCard
            title="Voice Calls Handled"
            value="47"
            change={{ value: "+28%", trend: "up" }}
            icon={Phone}
            iconColor="orange"
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
          <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-cv-primary/30 transition-all duration-300 overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-cv-primary/5 to-transparent">
              <h3 className="text-sm font-semibold text-cv-text-primary flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cv-primary-light" />
                Today's Appointments
              </h3>
              <button className="text-xs font-medium text-cv-primary-light hover:underline transition-colors">
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
          <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-cv-accent/30 transition-all duration-300 overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-border bg-gradient-to-r from-cv-accent/5 to-transparent">
              <h3 className="text-sm font-semibold text-cv-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cv-accent" />
                <span className="w-2 h-2 rounded-full bg-cv-accent animate-pulse" />
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
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/30 transition-all duration-300 cursor-pointer group border border-transparent hover:border-border"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${insight.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-cv-text-primary group-hover:text-cv-primary-light transition-colors">
                      {insight.title}
                    </p>
                    <p className="text-xs text-cv-text-muted mt-0.5">{insight.description}</p>
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
            className="relative rounded-2xl p-5 bg-gradient-to-br from-cv-primary/25 via-cv-primary/15 to-cv-accent/15 border border-cv-primary/30 overflow-hidden shadow-lg"
          >
            <FloatingParticles count={10} />
            <div className="relative z-10">
              <p className="text-xl font-bold text-cv-text-primary mb-2">வணக்கம்! 🙏</p>
              <p className="text-sm text-cv-text-secondary leading-relaxed">
                Your Tamil Voice AI is helping patients book appointments 24/7
              </p>
              <div className="mt-4 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-cv-primary/20">
                <p className="text-sm text-cv-text-secondary italic">
                  "Naalai 10 mani-ku appointment confirm aagividuthu!"
                </p>
                <p className="text-xs text-cv-text-muted mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cv-success animate-pulse" />
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
