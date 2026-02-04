import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MessageLog {
  id: string;
  user_id: string | null;
  message_sid: string | null;
  channel: string;
  direction: string | null;
  to_phone: string;
  from_phone: string | null;
  message_content: string;
  template_name: string | null;
  language: string | null;
  status: string;
  error_message: string | null;
  media_count: number | null;
  created_at: string;
  updated_at: string;
}

interface UseMessageHistoryOptions {
  channel?: 'whatsapp' | 'sms' | 'all';
  direction?: 'inbound' | 'outbound' | 'all';
  phoneNumber?: string;
  limit?: number;
}

export function useMessageHistory(options: UseMessageHistoryOptions = {}) {
  const { channel = 'all', direction = 'all', phoneNumber, limit = 50 } = options;
  
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('message_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (channel !== 'all') {
        query = query.eq('channel', channel);
      }

      if (direction !== 'all') {
        query = query.eq('direction', direction);
      }

      if (phoneNumber) {
        query = query.or(`to_phone.eq.${phoneNumber},from_phone.eq.${phoneNumber}`);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      setMessages(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      console.error('Error fetching message history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channel, direction, phoneNumber, limit]);

  // Subscribe to realtime updates
  useEffect(() => {
    const subscription = supabase
      .channel('message_logs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'message_logs',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new as MessageLog;
            
            // Check if message matches filters
            const matchesChannel = channel === 'all' || newMessage.channel === channel;
            const matchesDirection = direction === 'all' || newMessage.direction === direction;
            const matchesPhone = !phoneNumber || 
              newMessage.to_phone === phoneNumber || 
              newMessage.from_phone === phoneNumber;

            if (matchesChannel && matchesDirection && matchesPhone) {
              setMessages((prev) => [newMessage, ...prev].slice(0, limit));
            }
          } else if (payload.eventType === 'UPDATE') {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === payload.new.id ? (payload.new as MessageLog) : msg
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setMessages((prev) =>
              prev.filter((msg) => msg.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [channel, direction, phoneNumber, limit]);

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
  };
}
