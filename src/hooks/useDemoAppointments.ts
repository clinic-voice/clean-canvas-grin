import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Appointment, AppointmentFormData } from './useAppointments';

// Generate sample demo appointments
function generateDemoAppointments(): Appointment[] {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  return [
    {
      id: 'demo-1',
      patient_name: 'John Smith',
      patient_phone: '+91 98765 43210',
      patient_age: 45,
      reason: 'Annual Checkup',
      appointment_date: today,
      appointment_time: '09:00:00',
      status: 'confirmed',
      source: 'manual',
      notes: 'Regular health checkup',
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      patient_name: 'Sarah Johnson',
      patient_phone: '+91 87654 32109',
      patient_age: 32,
      reason: 'Follow-up Visit',
      appointment_date: today,
      appointment_time: '10:30:00',
      status: 'waiting',
      source: 'whatsapp',
      notes: 'Follow-up for previous consultation',
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-3',
      patient_name: 'Mike Davis',
      patient_phone: '+91 76543 21098',
      patient_age: 28,
      reason: 'Dental Cleaning',
      appointment_date: today,
      appointment_time: '14:00:00',
      status: 'in-progress',
      source: 'voice',
      notes: null,
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-4',
      patient_name: 'Emily Chen',
      patient_phone: '+91 65432 10987',
      patient_age: 55,
      reason: 'Consultation',
      appointment_date: today,
      appointment_time: '11:00:00',
      status: 'completed',
      source: 'manual',
      notes: 'Completed successfully',
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-5',
      patient_name: 'Robert Wilson',
      patient_phone: '+91 54321 09876',
      patient_age: 40,
      reason: 'X-Ray Review',
      appointment_date: tomorrow,
      appointment_time: '09:30:00',
      status: 'confirmed',
      source: 'whatsapp',
      notes: null,
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

export function useDemoAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setAppointments(generateDemoAppointments());
    setIsLoading(false);
  }, []);

  const updateAppointment = async (id: string, data: Partial<AppointmentFormData>) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, ...data, updated_at: new Date().toISOString() } as Appointment : apt))
    );
    toast.success('Appointment rescheduled (Demo Mode)');
    return { success: true, data: null };
  };

  const createAppointment = async (data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      id: `demo-${Date.now()}`,
      patient_name: data.patient_name,
      patient_phone: data.patient_phone || null,
      patient_age: data.patient_age || null,
      reason: data.reason || null,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time + ':00',
      status: data.status || 'confirmed',
      source: data.source || 'manual',
      notes: data.notes || null,
      user_id: 'demo-user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setAppointments(prev => [...prev, newAppointment]);
    toast.success('Appointment created (Demo Mode)');
    return { success: true, data: newAppointment };
  };

  const deleteAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    toast.success('Appointment deleted (Demo Mode)');
    return { success: true };
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
