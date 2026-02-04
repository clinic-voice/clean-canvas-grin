import { useState } from "react";
import { useMessageHistory, MessageLog } from "@/hooks/useMessageHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Phone,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  RefreshCw,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow, format } from "date-fns";

interface MessageHistoryProps {
  className?: string;
  maxHeight?: string;
}

export function MessageHistory({ className, maxHeight = "600px" }: MessageHistoryProps) {
  const [channelFilter, setChannelFilter] = useState<"all" | "whatsapp" | "sms">("all");
  const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { messages, isLoading, error, refetch } = useMessageHistory({
    channel: channelFilter,
    direction: directionFilter,
    limit: 100,
  });

  const filteredMessages = messages.filter((msg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.message_content.toLowerCase().includes(query) ||
      msg.to_phone.toLowerCase().includes(query) ||
      msg.from_phone?.toLowerCase().includes(query) ||
      msg.template_name?.toLowerCase().includes(query)
    );
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "sent":
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
      case "queued":
      case "pending":
        return <Clock className="w-3.5 h-3.5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-3.5 h-3.5 text-red-500" />;
      case "received":
        return <ArrowDownLeft className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    return channel === "whatsapp" ? (
      <MessageSquare className="w-4 h-4 text-green-500" />
    ) : (
      <Phone className="w-4 h-4 text-blue-500" />
    );
  };

  const getDirectionIcon = (direction: string | null) => {
    return direction === "inbound" ? (
      <ArrowDownLeft className="w-4 h-4 text-blue-500" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
    );
  };

  const formatPhoneDisplay = (msg: MessageLog) => {
    if (msg.direction === "inbound") {
      return msg.from_phone || "Unknown";
    }
    return msg.to_phone;
  };

  return (
    <div className={cn("rounded-xl bg-card border border-border", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Message History
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={refetch}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={channelFilter}
              onValueChange={(val) => setChannelFilter(val as typeof channelFilter)}
            >
              <SelectTrigger className="w-[130px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={directionFilter}
              onValueChange={(val) => setDirectionFilter(val as typeof directionFilter)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="outbound">Sent</SelectItem>
                <SelectItem value="inbound">Received</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Message List */}
      <ScrollArea style={{ maxHeight }} className="p-4">
        {isLoading && messages.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mb-3" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button variant="outline" size="sm" onClick={refetch} className="mt-3">
              Try Again
            </Button>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "No messages match your search" : "No messages yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <MessageCard key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {filteredMessages.length > 0 && (
        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Showing {filteredMessages.length} of {messages.length} messages
          </p>
        </div>
      )}
    </div>
  );
}

interface MessageCardProps {
  message: MessageLog;
}

function MessageCard({ message }: MessageCardProps) {
  const isInbound = message.direction === "inbound";
  const isWhatsApp = message.channel === "whatsapp";

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "sent":
        return "default";
      case "queued":
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "received":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors hover:bg-muted/50",
        isInbound ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20" : "border-border"
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Channel Icon */}
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isWhatsApp ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"
            )}
          >
            {isWhatsApp ? (
              <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>

          {/* Phone & Direction */}
          <div>
            <div className="flex items-center gap-1.5">
              {isInbound ? (
                <ArrowDownLeft className="w-3.5 h-3.5 text-blue-500" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              )}
              <span className="font-medium text-sm">
                {isInbound ? message.from_phone || "Unknown" : message.to_phone}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isInbound ? "Received" : "Sent"} · {isWhatsApp ? "WhatsApp" : "SMS"}
            </p>
          </div>
        </div>

        {/* Status & Time */}
        <div className="flex flex-col items-end gap-1">
          <Badge variant={getStatusBadgeVariant(message.status)} className="text-xs capitalize">
            {message.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Message Content */}
      <div className="mt-3">
        <p className="text-sm text-foreground whitespace-pre-wrap break-words">
          {message.message_content}
        </p>
      </div>

      {/* Footer with metadata */}
      <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
        {message.template_name && (
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {message.template_name}
            </Badge>
          </span>
        )}
        {message.language && (
          <span className="capitalize">{message.language}</span>
        )}
        {message.media_count && message.media_count > 0 && (
          <span>{message.media_count} media</span>
        )}
        <span className="ml-auto">
          {format(new Date(message.created_at), "MMM d, yyyy · h:mm a")}
        </span>
      </div>

      {/* Error Message */}
      {message.error_message && (
        <div className="mt-2 p-2 rounded bg-destructive/10 border border-destructive/20">
          <p className="text-xs text-destructive flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            {message.error_message}
          </p>
        </div>
      )}
    </div>
  );
}
