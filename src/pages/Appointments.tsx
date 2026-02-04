import { DashboardLayout } from "@/components/clinicvoice/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Filter, Plus, Search, Phone, MessageSquare, MoreVertical, Pencil, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useState, useCallback } from "react";
import { Appointment, AppointmentFormData } from "@/hooks/useAppointments";
import { useAllAppointments } from "@/hooks/useAllAppointments";
import { useDemoAppointments } from "@/hooks/useDemoAppointments";
import { useAuth } from "@/contexts/AuthContext";
import { AppointmentDialog } from "@/components/clinicvoice/AppointmentDialog";
import { CalendarView } from "@/components/clinicvoice/CalendarView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import "@/styles/calendar.css";

const statusConfig: Record<string, { label: string; class: string }> = {
  completed: { label: "Completed", class: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", class: "bg-blue-500/20 text-blue-600 dark:text-blue-400" },
  waiting: { label: "Waiting", class: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" },
  confirmed: { label: "Confirmed", class: "bg-green-500/20 text-green-600 dark:text-green-400" },
  cancelled: { label: "Cancelled", class: "bg-red-500/20 text-red-600 dark:text-red-400" },
};

const sourceIcons: Record<string, typeof Phone> = {
  voice: Phone,
  whatsapp: MessageSquare,
  manual: Calendar,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"list" | "calendar">("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [defaultFormValues, setDefaultFormValues] = useState<{ date?: string; time?: string }>({});

  const { isDemoMode } = useAuth();
  
  // Use demo hook when in demo mode, otherwise use real Supabase hook
  const realAppointments = useAllAppointments();
  const demoAppointments = useDemoAppointments();
  
  const {
    appointments,
    isLoading,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = isDemoMode ? demoAppointments : realAppointments;

  // Filter appointments for list view by selected date
  const filteredAppointments = appointments.filter(apt => 
    apt.appointment_date === selectedDate.toISOString().split('T')[0]
  );

  const handleSave = async (data: AppointmentFormData) => {
    if (editingAppointment) {
      return updateAppointment(editingAppointment.id, data);
    }
    return createAppointment(data);
  };

  const handleEdit = (apt: Appointment) => {
    setEditingAppointment(apt);
    setDefaultFormValues({});
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteAppointment(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setDefaultFormValues({
      date: selectedDate.toISOString().split('T')[0],
    });
    setDialogOpen(true);
  };

  // Calendar handlers
  const handleEventDrop = useCallback(async (id: string, date: string, time: string) => {
    await updateAppointment(id, {
      appointment_date: date,
      appointment_time: time,
    });
  }, [updateAppointment]);

  const handleSelectSlot = useCallback((date: string, time: string) => {
    setEditingAppointment(null);
    setDefaultFormValues({ date, time });
    setDialogOpen(true);
  }, []);

  const handleSelectEvent = useCallback((appointment: Appointment) => {
    handleEdit(appointment);
  }, []);

  const stats = {
    total: filteredAppointments.length,
    completed: filteredAppointments.filter(a => a.status === 'completed').length,
    waiting: filteredAppointments.filter(a => a.status === 'waiting').length,
    upcoming: filteredAppointments.filter(a => ['confirmed', 'in-progress'].includes(a.status)).length,
  };

  return (
    <DashboardLayout
      title="Appointments"
      subtitle="Manage and track all patient appointments"
    >
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Demo Mode Active</p>
            <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80">
              Changes are not saved. Remove <code className="px-1 bg-yellow-500/20 rounded">?demo=true</code> from URL to use real data.
            </p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-[250px] pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                view === "list" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                view === "calendar" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              Calendar
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {view === "list" && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
              <Calendar className="w-4 h-4 text-primary" />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="text-sm font-medium bg-transparent border-none focus:outline-none"
              />
            </div>
          )}
          <Button onClick={handleNewAppointment} className="gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Bar - only show in list view */}
      {view === "list" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total, color: "text-foreground" },
            { label: "Completed", value: stats.completed, color: "text-green-600 dark:text-green-400" },
            { label: "Waiting", value: stats.waiting, color: "text-yellow-600 dark:text-yellow-400" },
            { label: "Upcoming", value: stats.upcoming, color: "text-blue-600 dark:text-blue-400" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-card border border-border p-4 text-center">
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" ? (
        isLoading ? (
          <div className="flex items-center justify-center py-12 rounded-xl bg-card border border-border">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <CalendarView
            appointments={appointments}
            onEventDrop={handleEventDrop}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        )
      ) : (
        /* List View - Appointments Table */
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No appointments for this date</p>
              <Button onClick={handleNewAppointment} variant="outline" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Appointment
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Source
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => {
                    const SourceIcon = sourceIcons[apt.source || 'manual'] || Calendar;
                    const status = statusConfig[apt.status] || statusConfig.confirmed;
                    
                    return (
                      <tr key={apt.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-semibold">{apt.appointment_time.slice(0, 5)}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-xs">
                              {getInitials(apt.patient_name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{apt.patient_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {apt.patient_age ? `Age: ${apt.patient_age}` : ''} 
                                {apt.patient_age && apt.patient_phone ? ' • ' : ''}
                                {apt.patient_phone || ''}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-muted-foreground">{apt.reason || '-'}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <SourceIcon className={cn(
                              "w-4 h-4",
                              apt.source === "voice" ? "text-orange-500" :
                              apt.source === "whatsapp" ? "text-green-500" : "text-blue-500"
                            )} />
                            <span className="text-xs text-muted-foreground capitalize">{apt.source || 'manual'}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("px-2.5 py-1 rounded text-xs font-semibold", status.class)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1.5 rounded hover:bg-muted transition-colors">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(apt)}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirmId(apt.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Dialogs */}
      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        appointment={editingAppointment}
        onSave={handleSave}
        defaultDate={defaultFormValues.date || selectedDate.toISOString().split('T')[0]}
        defaultTime={defaultFormValues.time}
      />

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The appointment will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
