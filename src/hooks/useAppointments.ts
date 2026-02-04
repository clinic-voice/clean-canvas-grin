import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  user_id: string;
  patient_name: string;
  patient_phone: string | null;
  patient_age: number | null;
  reason: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  source: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentFormData {
  patient_name: string;
  patient_phone?: string;
  patient_age?: number;
  reason?: string;
  appointment_date: string;
  appointment_time: string;
  status?: string;
  source?: string;
  notes?: string;
}

export function useAppointments(selectedDate?: Date) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (selectedDate) {
        const dateStr = selectedDate.toISOString().split('T')[0];
        query = query.eq('appointment_date', dateStr);
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;
      setAppointments((data || []) as Appointment[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch appointments';
      setError(message);
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  const createAppointment = async (data: AppointmentFormData) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data: newAppointment, error } = await supabase
        .from('appointments')
        .insert({
          ...data,
          user_id: userData.user.id,
          status: data.status || 'confirmed',
          source: data.source || 'manual',
        })
        .select()
        .single();

      if (error) throw error;

      setAppointments(prev => [...prev, newAppointment as Appointment]);
      toast.success('Appointment created successfully');
      return { success: true, data: newAppointment };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create appointment';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateAppointment = async (id: string, data: Partial<AppointmentFormData>) => {
    try {
      const { data: updated, error } = await supabase
        .from('appointments')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAppointments(prev =>
        prev.map(apt => (apt.id === id ? (updated as Appointment) : apt))
      );
      toast.success('Appointment updated successfully');
      return { success: true, data: updated };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update appointment';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);

      if (error) throw error;

      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast.success('Appointment deleted');
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete appointment';
      toast.error(message);
      return { success: false, error: message };
    }
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
