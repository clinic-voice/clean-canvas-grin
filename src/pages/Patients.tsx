 import { useState } from "react";
 import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
 import { PatientDetailSheet, PatientData } from "@/components/clinicvoice/PatientDetailSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Search, Filter, Plus, Phone, MessageSquare, FileText, 
  MoreVertical, Users, UserCheck, Calendar, Heart
} from "lucide-react";

const patients = [
   {
    id: 1,
    name: "Priya Lakshmi",
    initials: "PL",
    age: 45,
    gender: "Female",
    phone: "+91 98765 43210",
     email: "priya.lakshmi@email.com",
     address: "123 Gandhi Nagar, Chennai",
     bloodGroup: "B+",
    lastVisit: "2 days ago",
    totalVisits: 12,
    condition: "Diabetes Type 2",
    status: "active",
     allergies: ["Penicillin", "Sulfa"],
     medications: ["Metformin 500mg", "Atorvastatin 10mg"],
     notes: "Regular patient with good compliance. Prefers morning appointments.",
  },
   {
    id: 2,
    name: "Rajesh Kumar",
    initials: "RK",
    age: 52,
    gender: "Male",
    phone: "+91 98765 43211",
     email: "rajesh.kumar@email.com",
     bloodGroup: "O+",
    lastVisit: "Today",
    totalVisits: 8,
    condition: "Hypertension",
    status: "active",
     medications: ["Amlodipine 5mg", "Aspirin 75mg"],
  },
   {
    id: 3,
    name: "Meera Sundaram",
    initials: "MS",
    age: 38,
    gender: "Female",
    phone: "+91 98765 43212",
     email: "meera.s@email.com",
     bloodGroup: "A+",
    lastVisit: "1 week ago",
    totalVisits: 5,
    condition: "Thyroid",
    status: "active",
     medications: ["Levothyroxine 50mcg"],
  },
   {
    id: 4,
    name: "Karthik Venkat",
    initials: "KV",
    age: 61,
    gender: "Male",
    phone: "+91 98765 43213",
     bloodGroup: "AB+",
    lastVisit: "3 days ago",
    totalVisits: 24,
    condition: "Cardiac",
    status: "followup",
     allergies: ["Ibuprofen"],
     medications: ["Clopidogrel 75mg", "Ramipril 5mg", "Rosuvastatin 20mg"],
     notes: "Post CABG patient. Requires regular monitoring.",
  },
   {
    id: 5,
    name: "Anitha Rajan",
    initials: "AR",
    age: 29,
    gender: "Female",
    phone: "+91 98765 43214",
     email: "anitha.rajan@email.com",
    lastVisit: "2 weeks ago",
    totalVisits: 3,
    condition: "General",
    status: "active",
  },
   {
    id: 6,
    name: "Suresh Babu",
    initials: "SB",
    age: 55,
    gender: "Male",
    phone: "+91 98765 43215",
     bloodGroup: "B-",
    lastVisit: "1 month ago",
    totalVisits: 15,
    condition: "Diabetes Type 1",
    status: "inactive",
     medications: ["Insulin Glargine", "Insulin Aspart"],
  },
 ] as PatientData[];

const conditionColors: Record<string, string> = {
  "Diabetes Type 2": "bg-cv-secondary/20 text-cv-secondary",
  "Diabetes Type 1": "bg-cv-secondary/20 text-cv-secondary",
  "Hypertension": "bg-cv-danger/20 text-cv-danger",
  "Thyroid": "bg-cv-accent/20 text-cv-accent",
  "Cardiac": "bg-cv-pink/20 text-cv-pink",
  "General": "bg-cv-blue/20 text-cv-blue",
};

export default function Patients() {
   const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
   const [isDetailOpen, setIsDetailOpen] = useState(false);
 
   const handlePatientClick = (patient: PatientData) => {
     setSelectedPatient(patient);
     setIsDetailOpen(true);
   };
 
  return (
    <DashboardLayout
      title="Patients"
      subtitle="Manage your patient database and records"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-muted" />
            <input
              type="text"
              placeholder="Search by name, phone, ABHA ID..."
              className="w-[300px] pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cv-primary"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        <Button className="gradient-primary text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cv-blue/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-cv-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-cv-text-primary">1,847</p>
              <p className="text-xs text-cv-text-muted">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cv-success/20 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-cv-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-cv-text-primary">1,523</p>
              <p className="text-xs text-cv-text-muted">Active</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cv-warning/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cv-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-cv-text-primary">156</p>
              <p className="text-xs text-cv-text-muted">Need Follow-up</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cv-accent/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-cv-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-cv-text-primary">89%</p>
              <p className="text-xs text-cv-text-muted">Retention Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
           className="rounded-xl bg-card border border-border p-5 hover:border-cv-primary/30 transition-all hover:shadow-lg cursor-pointer"
           onClick={() => handlePatientClick(patient)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cv-blue to-cv-accent flex items-center justify-center text-white font-semibold">
                  {patient.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-cv-text-primary">{patient.name}</h3>
                  <p className="text-xs text-cv-text-muted">
                    {patient.age}y • {patient.gender}
                  </p>
                </div>
              </div>
              <button className="p-1.5 rounded hover:bg-muted transition-colors">
                <MoreVertical className="w-4 h-4 text-cv-text-muted" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-cv-text-muted">Phone</span>
                <span className="text-cv-text-primary font-medium">{patient.phone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cv-text-muted">Last Visit</span>
                <span className="text-cv-text-primary">{patient.lastVisit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cv-text-muted">Total Visits</span>
                <span className="text-cv-text-primary font-medium">{patient.totalVisits}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                conditionColors[patient.condition] || "bg-muted text-cv-text-muted"
              )}>
                {patient.condition}
              </span>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Call">
                  <Phone className="w-4 h-4 text-cv-text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="WhatsApp">
                  <MessageSquare className="w-4 h-4 text-cv-text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Records">
                  <FileText className="w-4 h-4 text-cv-text-muted" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
     
     <PatientDetailSheet
       open={isDetailOpen}
       onOpenChange={setIsDetailOpen}
       patient={selectedPatient}
     />
    </DashboardLayout>
  );
}
