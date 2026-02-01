import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, TrendingDown, Calendar, Users, Phone, 
  CreditCard, Clock, BarChart3, PieChart, Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from "recharts";

const appointmentData = [
  { name: "Mon", appointments: 24, calls: 18 },
  { name: "Tue", appointments: 28, calls: 22 },
  { name: "Wed", appointments: 32, calls: 28 },
  { name: "Thu", appointments: 26, calls: 20 },
  { name: "Fri", appointments: 35, calls: 30 },
  { name: "Sat", appointments: 42, calls: 35 },
  { name: "Sun", appointments: 18, calls: 12 },
];

const revenueData = [
  { name: "Week 1", revenue: 125000 },
  { name: "Week 2", revenue: 148000 },
  { name: "Week 3", revenue: 132000 },
  { name: "Week 4", revenue: 178000 },
];

const sourceData = [
  { name: "Voice AI", value: 45, color: "#F97316" },
  { name: "WhatsApp", value: 30, color: "#10B981" },
  { name: "Walk-in", value: 15, color: "#3B82F6" },
  { name: "Phone", value: 10, color: "#8B5CF6" },
];

const peakHoursData = [
  { hour: "8AM", patients: 5 },
  { hour: "9AM", patients: 12 },
  { hour: "10AM", patients: 18 },
  { hour: "11AM", patients: 22 },
  { hour: "12PM", patients: 15 },
  { hour: "2PM", patients: 14 },
  { hour: "3PM", patients: 16 },
  { hour: "4PM", patients: 20 },
  { hour: "5PM", patients: 18 },
  { hour: "6PM", patients: 8 },
];

export default function Analytics() {
  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Insights and performance metrics for your clinic"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            icon: Users, 
            label: "Total Patients", 
            value: "1,847", 
            change: "+12%", 
            trend: "up",
            color: "blue" 
          },
          { 
            icon: Calendar, 
            label: "Appointments/Month", 
            value: "486", 
            change: "+8%", 
            trend: "up",
            color: "green" 
          },
          { 
            icon: Phone, 
            label: "Voice AI Calls", 
            value: "1,234", 
            change: "+28%", 
            trend: "up",
            color: "orange" 
          },
          { 
            icon: CreditCard, 
            label: "Monthly Revenue", 
            value: "₹5.8L", 
            change: "+15%", 
            trend: "up",
            color: "purple" 
          },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                kpi.color === "blue" && "bg-cv-blue/20",
                kpi.color === "green" && "bg-cv-success/20",
                kpi.color === "orange" && "bg-cv-secondary/20",
                kpi.color === "purple" && "bg-cv-accent/20",
              )}>
                <kpi.icon className={cn(
                  "w-5 h-5",
                  kpi.color === "blue" && "text-cv-blue",
                  kpi.color === "green" && "text-cv-success",
                  kpi.color === "orange" && "text-cv-secondary",
                  kpi.color === "purple" && "text-cv-accent",
                )} />
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold",
                kpi.trend === "up" ? "bg-cv-success/20 text-cv-success" : "bg-cv-danger/20 text-cv-danger"
              )}>
                {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-cv-text-primary">{kpi.value}</p>
            <p className="text-sm text-cv-text-muted">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Trend Chart */}
        <div className="lg:col-span-2 rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-cv-text-primary">Weekly Overview</h3>
              <p className="text-sm text-cv-text-muted">Appointments vs Voice AI Calls</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cv-primary" />
                <span className="text-cv-text-muted">Appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cv-secondary" />
                <span className="text-cv-text-muted">Voice Calls</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={appointmentData}>
              <defs>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E293B", 
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }} 
              />
              <Area type="monotone" dataKey="appointments" stroke="#0D9488" fillOpacity={1} fill="url(#colorAppointments)" strokeWidth={2} />
              <Area type="monotone" dataKey="calls" stroke="#F97316" fillOpacity={1} fill="url(#colorCalls)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Sources */}
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="mb-6">
            <h3 className="font-semibold text-cv-text-primary">Booking Sources</h3>
            <p className="text-sm text-cv-text-muted">How patients book appointments</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E293B", 
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }} 
              />
            </RePieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {sourceData.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-cv-text-secondary">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-cv-text-primary">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Peak Hours */}
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-cv-text-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-cv-primary-light" />
                Peak Hours
              </h3>
              <p className="text-sm text-cv-text-muted">Patient volume by hour</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E293B", 
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="patients" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-cv-text-primary flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cv-success" />
                Revenue Trend
              </h3>
              <p className="text-sm text-cv-text-muted">Monthly revenue by week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E293B", 
                  border: "1px solid #334155",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
