import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { StatsCard } from "@/components/clinicvoice/StatsCard";
import { AppointmentRow } from "@/components/clinicvoice/AppointmentRow";
import { VoiceAIWidget } from "@/components/clinicvoice/VoiceAIWidget";
import { QuickActions } from "@/components/clinicvoice/QuickActions";
import { Calendar, Users, Phone, TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Today's Appointments"
          value="24"
          change={{ value: "+12%", trend: "up" }}
          icon={Calendar}
          iconColor="blue"
        />
        <StatsCard
          title="Total Patients"
          value="1,847"
          change={{ value: "+3.2%", trend: "up" }}
          icon={Users}
          iconColor="green"
        />
        <StatsCard
          title="Voice Calls Handled"
          value="47"
          change={{ value: "+28%", trend: "up" }}
          icon={Phone}
          iconColor="orange"
        />
        <StatsCard
          title="Revenue Today"
          value="₹28,500"
          change={{ value: "+8%", trend: "up" }}
          icon={TrendingUp}
          iconColor="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Appointments */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-cv-text-primary">
                Today's Appointments
              </h3>
              <button className="text-xs font-medium text-cv-primary-light hover:underline">
                View All
              </button>
            </div>
            <div className="p-4">
              {todaysAppointments.map((appointment, index) => (
                <AppointmentRow key={index} {...appointment} />
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-cv-text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cv-accent animate-pulse" />
                AI Insights
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${insight.bgColor}`}>
                    <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cv-text-primary">
                      {insight.title}
                    </p>
                    <p className="text-xs text-cv-text-muted">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Voice AI Widget */}
          <VoiceAIWidget
            isActive={true}
            callsToday={47}
            resolutionRate={95}
            currentCall={{
              patientName: "Kavitha M.",
              duration: "2:34",
            }}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Tamil Greeting Card */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-cv-primary/20 to-cv-accent/10 border border-cv-primary/20">
            <p className="text-lg font-semibold text-cv-text-primary mb-1">வணக்கம்! 🙏</p>
            <p className="text-sm text-cv-text-secondary">
              Your Tamil Voice AI is helping patients book appointments 24/7
            </p>
            <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs text-cv-text-muted italic">
                "Naalai 10 mani-ku appointment confirm aagividuthu!"
              </p>
              <p className="text-[10px] text-cv-text-muted mt-1">— Recent AI Call</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
