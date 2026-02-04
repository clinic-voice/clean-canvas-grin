import { useEffect } from 'react';
import { useIncomingMessages } from '@/hooks/useIncomingMessages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface IncomingMessagesNotifierProps {
  className?: string;
}

export function IncomingMessagesNotifier({ className }: IncomingMessagesNotifierProps) {
  const { messages, unreadCount, markAsRead, isLoading } = useIncomingMessages({
    realtime: true,
    playSound: true,
    showToast: true,
    limit: 10,
  });

  return (
    <Popover onOpenChange={(open) => open && markAsRead()}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('relative', className)}
          aria-label={`${unreadCount} unread messages`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border">
          <h4 className="font-semibold text-sm">Incoming Messages</h4>
          <p className="text-xs text-muted-foreground">
            Recent messages from patients
          </p>
        </div>
        <ScrollArea className="max-h-80">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No incoming messages yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                        msg.channel === 'whatsapp'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      )}
                    >
                      {msg.channel === 'whatsapp' ? (
                        <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm truncate">
                          {msg.from_phone}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDistanceToNow(new Date(msg.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {msg.message_content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
