import { useCallback, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views, SlotInfo } from 'react-big-calendar';
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Appointment, AppointmentFormData } from '@/hooks/useAppointments';
import { cn } from '@/lib/utils';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

interface CalendarViewProps {
  appointments: Appointment[];
  onEventDrop: (id: string, date: string, time: string) => Promise<void>;
  onSelectSlot: (date: string, time: string) => void;
  onSelectEvent: (appointment: Appointment) => void;
}

const statusColors: Record<string, string> = {
  completed: 'bg-muted text-muted-foreground border-muted',
  'in-progress': 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
  waiting: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30',
};

export function CalendarView({ 
  appointments, 
  onEventDrop, 
  onSelectSlot, 
  onSelectEvent 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<typeof Views[keyof typeof Views]>(Views.WEEK);

  const events: CalendarEvent[] = useMemo(() => {
    return appointments.map((apt) => {
      const [hours, minutes] = apt.appointment_time.split(':').map(Number);
      const start = new Date(apt.appointment_date);
      start.setHours(hours, minutes, 0, 0);
      
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30); // Default 30-minute appointments

      return {
        id: apt.id,
        title: apt.patient_name,
        start,
        end,
        resource: apt,
      };
    });
  }, [appointments]);

  const handleEventDrop = useCallback(
    async ({ event, start }: EventInteractionArgs<CalendarEvent>) => {
      const newDate = format(start as Date, 'yyyy-MM-dd');
      const newTime = format(start as Date, 'HH:mm');
      await onEventDrop(event.id, newDate, newTime);
    },
    [onEventDrop]
  );

  const handleEventResize = useCallback(
    async ({ event, start }: EventInteractionArgs<CalendarEvent>) => {
      const newDate = format(start as Date, 'yyyy-MM-dd');
      const newTime = format(start as Date, 'HH:mm');
      await onEventDrop(event.id, newDate, newTime);
    },
    [onEventDrop]
  );

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      const date = format(slotInfo.start, 'yyyy-MM-dd');
      const time = format(slotInfo.start, 'HH:mm');
      onSelectSlot(date, time);
    },
    [onSelectSlot]
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      onSelectEvent(event.resource);
    },
    [onSelectEvent]
  );

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const status = event.resource.status || 'confirmed';
    return {
      className: cn(
        'rounded-md border px-2 py-1 text-xs font-medium cursor-pointer transition-all hover:opacity-80',
        statusColors[status] || statusColors.confirmed
      ),
      style: {
        backgroundColor: 'transparent',
      },
    };
  }, []);

  const dayPropGetter = useCallback((date: Date) => {
    const today = new Date();
    const isToday = 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return {
      className: isToday ? 'bg-primary/5' : '',
    };
  }, []);

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden calendar-wrapper">
      <DnDCalendar
        localizer={localizer}
        events={events}
        date={currentDate}
        onNavigate={setCurrentDate}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.WEEK}
        selectable
        resizable
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        step={15}
        timeslots={4}
        min={new Date(2024, 0, 1, 7, 0, 0)}
        max={new Date(2024, 0, 1, 21, 0, 0)}
        style={{ height: 'calc(100vh - 280px)', minHeight: 500 }}
        tooltipAccessor={(event) => 
          `${event.resource.patient_name}${event.resource.reason ? ` - ${event.resource.reason}` : ''}`
        }
        formats={{
          timeGutterFormat: 'HH:mm',
          eventTimeRangeFormat: () => '',
          agendaTimeFormat: 'HH:mm',
        }}
        components={{
          event: ({ event }) => (
            <div className="truncate text-xs font-medium">
              {event.title}
              {event.resource.reason && (
                <span className="opacity-70 ml-1">• {event.resource.reason}</span>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}
