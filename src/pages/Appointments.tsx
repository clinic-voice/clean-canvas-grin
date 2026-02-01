import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Filter, Plus, Search, Phone, MessageSquare, MoreVertical } from "lucide-react";
import { useState } from "react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const appointments = [
  {
    id: 1,
    time: "09:00",
    patient: "Priya Lakshmi",
    initials: "PL",
    age: 45,
    reason: "General Checkup",
    phone: "+91 98765 43210",
    status: "completed",
    source: "voice",
  },
  {
    id: 2,
    time: "09:30",
    patient: "Rajesh Kumar",
    initials: "RK",
    age: 52,
    reason: "Follow-up - Diabetes",
    phone: "+91 98765 43211",
    status: "in-progress",
    source: "whatsapp",
  },
  {
    id: 3,
    time: "10:00",
    patient: "Meera Sundaram",
    initials: "MS",
    age: 38,
    reason: "Diabetes Review",
    phone: "+91 98765 43212",
    status: "waiting",
    source: "voice",
  },
  {
    id: 4,
    time: "10:30",
    patient: "Karthik Venkat",
    initials: "KV",
    age: 61,
    reason: "Blood Pressure Check",
    phone: "+91 98765 43213",
    status: "confirmed",
    source: "manual",
  },
  {
    id: 5,
    time: "11:00",
    patient: "Anitha Rajan",
    initials: "AR",
    age: 29,
    reason: "Lab Results Discussion",
    phone: "+91 98765 43214",
    status: "confirmed",
    source: "whatsapp",
  },
  {
    id: 6,
    time: "14:00",
    patient: "Suresh Babu",
    initials: "SB",
    age: 55,
    reason: "Cardiac Follow-up",
    phone: "+91 98765 43215",
    status: "confirmed",
    source: "voice",
  },
];

const statusConfig = {
  completed: { label: "Completed", class: "bg-muted text-cv-text-muted" },
  "in-progress": { label: "In Progress", class: "bg-cv-blue/20 text-cv-blue" },
  waiting: { label: "Waiting", class: "bg-cv-warning/20 text-cv-warning" },
  confirmed: { label: "Confirmed", class: "bg-cv-success/20 text-cv-success" },
  cancelled: { label: "Cancelled", class: "bg-cv-danger/20 text-cv-danger" },
};

const sourceIcons = {
  voice: Phone,
  whatsapp: MessageSquare,
  manual: Calendar,
};

export default function Appointments() {
  const [selectedDate] = useState(new Date());
  const [view, setView] = useState<"list" | "timeline">("list");

  return (
    <DashboardLayout
      title="Appointments"
      subtitle="Manage and track all patient appointments"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-muted" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-[250px] pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cv-primary"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex rounded-lg overflow-hidden border border-border">
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                view === "list" ? "bg-cv-primary text-white" : "bg-muted/50 text-cv-text-secondary hover:bg-muted"
              )}
            >
              List
            </button>
            <button
              onClick={() => setView("timeline")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                view === "timeline" ? "bg-cv-primary text-white" : "bg-muted/50 text-cv-text-secondary hover:bg-muted"
              )}
            >
              Timeline
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
            <Calendar className="w-4 h-4 text-cv-primary-light" />
            <span className="text-sm font-medium text-cv-text-primary">
              {selectedDate.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <Button className="gradient-primary text-white gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: 24, color: "text-cv-text-primary" },
          { label: "Completed", value: 8, color: "text-cv-success" },
          { label: "Waiting", value: 3, color: "text-cv-warning" },
          { label: "Upcoming", value: 13, color: "text-cv-blue" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-card border border-border p-4 text-center">
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs text-cv-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Time
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Patient
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Reason
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-cv-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => {
                const SourceIcon = sourceIcons[apt.source as keyof typeof sourceIcons];
                const status = statusConfig[apt.status as keyof typeof statusConfig];
                
                return (
                  <tr key={apt.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cv-text-muted" />
                        <span className="text-sm font-semibold text-cv-text-primary">{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cv-blue to-cv-accent flex items-center justify-center text-white font-semibold text-xs">
                          {apt.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-cv-text-primary">{apt.patient}</p>
                          <p className="text-xs text-cv-text-muted">Age: {apt.age} • {apt.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-cv-text-secondary">{apt.reason}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <SourceIcon className={cn(
                          "w-4 h-4",
                          apt.source === "voice" ? "text-cv-secondary" :
                          apt.source === "whatsapp" ? "text-cv-success" : "text-cv-blue"
                        )} />
                        <span className="text-xs text-cv-text-muted capitalize">{apt.source}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("px-2.5 py-1 rounded text-xs font-semibold", status.class)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded hover:bg-muted transition-colors">
                          <Phone className="w-4 h-4 text-cv-text-muted" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors">
                          <MessageSquare className="w-4 h-4 text-cv-text-muted" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors">
                          <MoreVertical className="w-4 h-4 text-cv-text-muted" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
