 import { useState } from 'react';
 import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetDescription,
 } from '@/components/ui/sheet';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { ScrollArea } from '@/components/ui/scroll-area';
 import { Separator } from '@/components/ui/separator';
 import { cn } from '@/lib/utils';
 import {
   Phone,
   MessageSquare,
   Mail,
   Calendar,
   Clock,
   MapPin,
   FileText,
   Activity,
   User,
   Heart,
   Pill,
   ChevronRight,
 } from 'lucide-react';
 import { format, parseISO, formatDistanceToNow } from 'date-fns';
 
 export interface PatientData {
   id: number | string;
   name: string;
   initials: string;
   age: number;
   gender: string;
   phone: string;
   email?: string;
   address?: string;
   bloodGroup?: string;
   lastVisit: string;
   totalVisits: number;
   condition: string;
   status: 'active' | 'inactive' | 'followup';
   allergies?: string[];
   medications?: string[];
   notes?: string;
 }
 
 export interface AppointmentHistoryItem {
   id: string;
   date: string;
   time: string;
   reason: string;
   status: string;
   notes?: string;
 }
 
 interface PatientDetailSheetProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   patient: PatientData | null;
   appointmentHistory?: AppointmentHistoryItem[];
 }
 
 const statusColors: Record<string, string> = {
   active: 'bg-cv-success/20 text-cv-success',
   inactive: 'bg-muted text-cv-text-muted',
   followup: 'bg-cv-warning/20 text-cv-warning',
 };
 
 const conditionColors: Record<string, string> = {
   'Diabetes Type 2': 'bg-cv-secondary/20 text-cv-secondary',
   'Diabetes Type 1': 'bg-cv-secondary/20 text-cv-secondary',
   Hypertension: 'bg-cv-danger/20 text-cv-danger',
   Thyroid: 'bg-cv-accent/20 text-cv-accent',
   Cardiac: 'bg-cv-pink/20 text-cv-pink',
   General: 'bg-cv-blue/20 text-cv-blue',
 };
 
 const appointmentStatusColors: Record<string, string> = {
   confirmed: 'bg-cv-success/20 text-cv-success',
   completed: 'bg-cv-blue/20 text-cv-blue',
   cancelled: 'bg-cv-danger/20 text-cv-danger',
   'no-show': 'bg-cv-warning/20 text-cv-warning',
   waiting: 'bg-cv-accent/20 text-cv-accent',
   'in-progress': 'bg-cv-secondary/20 text-cv-secondary',
 };
 
 export function PatientDetailSheet({
   open,
   onOpenChange,
   patient,
   appointmentHistory = [],
 }: PatientDetailSheetProps) {
   const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
 
   if (!patient) return null;
 
   // Generate demo appointment history if none provided
   const history: AppointmentHistoryItem[] =
     appointmentHistory.length > 0
       ? appointmentHistory
       : [
           {
             id: '1',
             date: new Date().toISOString().split('T')[0],
             time: '10:00',
             reason: 'Follow-up Consultation',
             status: 'completed',
             notes: 'Patient condition improving',
           },
           {
             id: '2',
             date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
             time: '14:30',
             reason: 'Lab Results Review',
             status: 'completed',
             notes: 'All parameters normal',
           },
           {
             id: '3',
             date: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
             time: '09:00',
             reason: 'Initial Consultation',
             status: 'completed',
           },
           {
             id: '4',
             date: new Date(Date.now() - 60 * 86400000).toISOString().split('T')[0],
             time: '11:00',
             reason: 'Annual Checkup',
             status: 'completed',
           },
         ];
 
   return (
     <Sheet open={open} onOpenChange={onOpenChange}>
       <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
         {/* Header */}
         <div className="p-6 bg-gradient-to-br from-cv-primary/10 via-cv-accent/5 to-transparent">
           <SheetHeader>
             <div className="flex items-start gap-4">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cv-blue to-cv-accent flex items-center justify-center text-white text-xl font-bold shadow-lg">
                 {patient.initials}
               </div>
               <div className="flex-1 min-w-0">
                 <SheetTitle className="text-xl text-cv-text-primary mb-1">
                   {patient.name}
                 </SheetTitle>
                 <SheetDescription className="text-sm text-cv-text-muted">
                   {patient.age} years • {patient.gender}
                   {patient.bloodGroup && ` • ${patient.bloodGroup}`}
                 </SheetDescription>
                 <div className="flex items-center gap-2 mt-2">
                   <Badge
                     className={cn(
                       'text-xs font-medium capitalize',
                       statusColors[patient.status]
                     )}
                   >
                     {patient.status === 'followup' ? 'Follow-up' : patient.status}
                   </Badge>
                   <Badge
                     className={cn(
                       'text-xs font-medium',
                       conditionColors[patient.condition] || 'bg-muted text-cv-text-muted'
                     )}
                   >
                     {patient.condition}
                   </Badge>
                 </div>
               </div>
             </div>
           </SheetHeader>
 
           {/* Quick Actions */}
           <div className="flex items-center gap-2 mt-4">
             <Button
               size="sm"
               variant="outline"
               className="flex-1 gap-2"
               onClick={() => window.open(`tel:${patient.phone}`)}
             >
               <Phone className="w-4 h-4" />
               Call
             </Button>
             <Button
               size="sm"
               variant="outline"
               className="flex-1 gap-2"
               onClick={() =>
                 window.open(`https://wa.me/${patient.phone.replace(/\D/g, '')}`)
               }
             >
               <MessageSquare className="w-4 h-4" />
               WhatsApp
             </Button>
             <Button size="sm" className="flex-1 gap-2 gradient-primary text-white">
               <Calendar className="w-4 h-4" />
               Book
             </Button>
           </div>
         </div>
 
         {/* Tabs */}
         <div className="flex border-b border-border px-6">
           <button
             onClick={() => setActiveTab('overview')}
             className={cn(
               'px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
               activeTab === 'overview'
                 ? 'border-cv-primary text-cv-primary'
                 : 'border-transparent text-cv-text-muted hover:text-cv-text-primary'
             )}
           >
             Overview
           </button>
           <button
             onClick={() => setActiveTab('history')}
             className={cn(
               'px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
               activeTab === 'history'
                 ? 'border-cv-primary text-cv-primary'
                 : 'border-transparent text-cv-text-muted hover:text-cv-text-primary'
             )}
           >
             Appointment History
           </button>
         </div>
 
         {/* Content */}
         <ScrollArea className="flex-1">
           <div className="p-6">
             {activeTab === 'overview' ? (
               <div className="space-y-6">
                 {/* Contact Information */}
                 <section>
                   <h3 className="text-sm font-semibold text-cv-text-primary mb-3 flex items-center gap-2">
                     <User className="w-4 h-4 text-cv-primary" />
                     Contact Information
                   </h3>
                   <div className="space-y-3">
                     <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                       <Phone className="w-4 h-4 text-cv-text-muted" />
                       <div className="flex-1">
                         <p className="text-xs text-cv-text-muted">Phone</p>
                         <p className="text-sm font-medium text-cv-text-primary">
                           {patient.phone}
                         </p>
                       </div>
                     </div>
                     {patient.email && (
                       <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                         <Mail className="w-4 h-4 text-cv-text-muted" />
                         <div className="flex-1">
                           <p className="text-xs text-cv-text-muted">Email</p>
                           <p className="text-sm font-medium text-cv-text-primary">
                             {patient.email}
                           </p>
                         </div>
                       </div>
                     )}
                     {patient.address && (
                       <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                         <MapPin className="w-4 h-4 text-cv-text-muted" />
                         <div className="flex-1">
                           <p className="text-xs text-cv-text-muted">Address</p>
                           <p className="text-sm font-medium text-cv-text-primary">
                             {patient.address}
                           </p>
                         </div>
                       </div>
                     )}
                   </div>
                 </section>
 
                 <Separator />
 
                 {/* Visit Statistics */}
                 <section>
                   <h3 className="text-sm font-semibold text-cv-text-primary mb-3 flex items-center gap-2">
                     <Activity className="w-4 h-4 text-cv-primary" />
                     Visit Statistics
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                     <div className="p-4 rounded-lg bg-cv-blue/10 border border-cv-blue/20">
                       <p className="text-2xl font-bold text-cv-blue">
                         {patient.totalVisits}
                       </p>
                       <p className="text-xs text-cv-text-muted">Total Visits</p>
                     </div>
                     <div className="p-4 rounded-lg bg-cv-success/10 border border-cv-success/20">
                       <p className="text-2xl font-bold text-cv-success">
                         {patient.lastVisit}
                       </p>
                       <p className="text-xs text-cv-text-muted">Last Visit</p>
                     </div>
                   </div>
                 </section>
 
                 <Separator />
 
                 {/* Medical Information */}
                 <section>
                   <h3 className="text-sm font-semibold text-cv-text-primary mb-3 flex items-center gap-2">
                     <Heart className="w-4 h-4 text-cv-primary" />
                     Medical Information
                   </h3>
                   <div className="space-y-3">
                     <div className="p-3 rounded-lg bg-muted/50">
                       <p className="text-xs text-cv-text-muted mb-1">Primary Condition</p>
                       <Badge
                         className={cn(
                           'text-xs font-medium',
                           conditionColors[patient.condition] ||
                             'bg-muted text-cv-text-muted'
                         )}
                       >
                         {patient.condition}
                       </Badge>
                     </div>
                     {patient.allergies && patient.allergies.length > 0 && (
                       <div className="p-3 rounded-lg bg-cv-danger/5 border border-cv-danger/20">
                         <p className="text-xs text-cv-danger font-medium mb-2">
                           Allergies
                         </p>
                         <div className="flex flex-wrap gap-1">
                           {patient.allergies.map((allergy, idx) => (
                             <Badge
                               key={idx}
                               variant="outline"
                               className="text-xs border-cv-danger/30 text-cv-danger"
                             >
                               {allergy}
                             </Badge>
                           ))}
                         </div>
                       </div>
                     )}
                     {patient.medications && patient.medications.length > 0 && (
                       <div className="p-3 rounded-lg bg-muted/50">
                         <p className="text-xs text-cv-text-muted mb-2 flex items-center gap-1">
                           <Pill className="w-3 h-3" />
                           Current Medications
                         </p>
                         <div className="flex flex-wrap gap-1">
                           {patient.medications.map((med, idx) => (
                             <Badge key={idx} variant="secondary" className="text-xs">
                               {med}
                             </Badge>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 </section>
 
                 {patient.notes && (
                   <>
                     <Separator />
                     <section>
                       <h3 className="text-sm font-semibold text-cv-text-primary mb-3 flex items-center gap-2">
                         <FileText className="w-4 h-4 text-cv-primary" />
                         Notes
                       </h3>
                       <p className="text-sm text-cv-text-secondary bg-muted/50 p-3 rounded-lg">
                         {patient.notes}
                       </p>
                     </section>
                   </>
                 )}
               </div>
             ) : (
               <div className="space-y-3">
                 {history.length === 0 ? (
                   <div className="text-center py-8 text-cv-text-muted">
                     <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                     <p>No appointment history</p>
                   </div>
                 ) : (
                   history.map((apt) => (
                     <div
                       key={apt.id}
                       className="p-4 rounded-lg border border-border hover:border-cv-primary/30 transition-colors cursor-pointer group"
                     >
                       <div className="flex items-start justify-between mb-2">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-cv-text-muted" />
                           <span className="text-sm font-medium text-cv-text-primary">
                             {format(parseISO(apt.date), 'MMM d, yyyy')}
                           </span>
                           <span className="text-xs text-cv-text-muted flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             {apt.time}
                           </span>
                         </div>
                         <Badge
                           className={cn(
                             'text-xs capitalize',
                             appointmentStatusColors[apt.status] ||
                               'bg-muted text-cv-text-muted'
                           )}
                         >
                           {apt.status}
                         </Badge>
                       </div>
                       <p className="text-sm text-cv-text-primary mb-1">{apt.reason}</p>
                       {apt.notes && (
                         <p className="text-xs text-cv-text-muted">{apt.notes}</p>
                       )}
                       <div className="flex items-center justify-between mt-2">
                         <span className="text-xs text-cv-text-muted">
                           {formatDistanceToNow(parseISO(apt.date), { addSuffix: true })}
                         </span>
                         <ChevronRight className="w-4 h-4 text-cv-text-muted group-hover:text-cv-primary transition-colors" />
                       </div>
                     </div>
                   ))
                 )}
               </div>
             )}
           </div>
         </ScrollArea>
       </SheetContent>
     </Sheet>
   );
 }