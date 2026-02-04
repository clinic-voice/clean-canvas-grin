import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNotificationSound } from './useNotificationSound';
import { toast } from 'sonner';

export interface IncomingMessage {
  id: string;
  message_sid: string | null;
  channel: 'whatsapp' | 'sms';
  from_phone: string;
  to_phone: string;
  message_content: string;
  media_count: number | null;
  status: string;
  created_at: string;
}

interface UseIncomingMessagesOptions {
  /** Enable real-time subscriptions */
  realtime?: boolean;
  /** Play sound on new message */
  playSound?: boolean;
  /** Show toast notification on new message */
  showToast?: boolean;
  /** Callback when new message arrives */
  onNewMessage?: (message: IncomingMessage) => void;
  /** Maximum messages to keep in state */
  limit?: number;
  /** Filter by channel */
  channel?: 'whatsapp' | 'sms' | 'all';
}

export function useIncomingMessages(options: UseIncomingMessagesOptions = {}) {
  const {
    realtime = true,
    playSound = true,
    showToast = true,
    onNewMessage,
    limit = 50,
    channel = 'all',
  } = options;

  const [messages, setMessages] = useState<IncomingMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { playNotification } = useNotificationSound();
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  // Fetch initial incoming messages
  const fetchMessages = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('message_logs')
        .select('*')
        .eq('direction', 'inbound')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (channel !== 'all') {
        query = query.eq('channel', channel);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      if (isMountedRef.current) {
        const typedMessages = (data || []).map(msg => ({
          ...msg,
          channel: msg.channel as 'whatsapp' | 'sms',
          from_phone: msg.from_phone || 'Unknown',
        })) as IncomingMessage[];
        
        setMessages(typedMessages);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      console.error('Error fetching incoming messages:', err);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [channel, limit]);

  // Handle new incoming message
  const handleNewMessage = useCallback((message: IncomingMessage) => {
    if (!isMountedRef.current) return;

    // Add to messages list
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === message.id);
      if (exists) return prev;
      return [message, ...prev].slice(0, limit);
    });

    // Increment unread count
    setUnreadCount((prev) => prev + 1);

    // Play notification sound
    if (playSound) {
      playNotification();
    }

    // Show toast notification
    if (showToast) {
      const channelLabel = message.channel === 'whatsapp' ? '💬 WhatsApp' : '📱 SMS';
      toast.info(`${channelLabel} from ${message.from_phone}`, {
        description: message.message_content.slice(0, 100) + (message.message_content.length > 100 ? '...' : ''),
        duration: 5000,
      });
    }

    // Call custom callback
    onNewMessage?.(message);
  }, [playSound, showToast, playNotification, onNewMessage, limit]);

  // Mark messages as read (reset unread count)
  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    if (!realtime) return;

    const subscription = supabase
      .channel('incoming_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_logs',
          filter: 'direction=eq.inbound',
        },
        (payload) => {
          const newMessage = payload.new as IncomingMessage;
          
          // Check channel filter
          if (channel !== 'all' && newMessage.channel !== channel) {
            return;
          }

          handleNewMessage({
            ...newMessage,
            channel: newMessage.channel as 'whatsapp' | 'sms',
            from_phone: newMessage.from_phone || 'Unknown',
          });
        }
      )
      .subscribe((status) => {
        console.log('Incoming messages subscription status:', status);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [realtime, channel, handleNewMessage]);

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    /** List of incoming messages */
    messages,
    /** Loading state */
    isLoading,
    /** Error message if any */
    error,
    /** Number of unread messages since last markAsRead */
    unreadCount,
    /** Mark all messages as read */
    markAsRead,
    /** Refetch messages from database */
    refetch: fetchMessages,
    /** Check if there are any messages */
    hasMessages: messages.length > 0,
  };
}
