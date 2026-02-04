import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile,
  Check,
  CheckCheck
} from "lucide-react";

export interface Conversation {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  timestamp: string;
  sender: "clinic" | "patient";
  status?: "sent" | "delivered" | "read";
}

interface ConversationDetailProps {
  conversation: Conversation;
  onBack: () => void;
}

// Sample chat history data
const getChatHistory = (conversationId: number): ChatMessage[] => {
  const histories: Record<number, ChatMessage[]> = {
    1: [
      { id: 1, content: "வணக்கம் Priya! உங்கள் சந்திப்பு நாளை காலை 10:30 மணிக்கு உள்ளது.", timestamp: "Yesterday, 4:30 PM", sender: "clinic", status: "read" },
      { id: 2, content: "நன்றி, நினைவூட்டலுக்கு!", timestamp: "Yesterday, 4:35 PM", sender: "patient" },
      { id: 3, content: "Hello Priya! Just a reminder about your appointment tomorrow at 10:30 AM with Dr. Ramesh Kumar.", timestamp: "Today, 9:00 AM", sender: "clinic", status: "read" },
      { id: 4, content: "Thank you doctor. I'll be there on time.", timestamp: "Today, 9:15 AM", sender: "patient" },
      { id: 5, content: "Great! Please bring your previous reports if any.", timestamp: "Today, 9:20 AM", sender: "clinic", status: "read" },
      { id: 6, content: "நன்றி டாக்டர், நாளை வருகிறேன்", timestamp: "Today, 9:25 AM", sender: "patient" },
    ],
    2: [
      { id: 1, content: "Hello Rajesh! Your appointment is confirmed for tomorrow at 2:00 PM.", timestamp: "Yesterday, 2:00 PM", sender: "clinic", status: "read" },
      { id: 2, content: "Thank you for the confirmation.", timestamp: "Yesterday, 2:30 PM", sender: "patient" },
      { id: 3, content: "Please remember to fast for 8 hours before your blood test.", timestamp: "Today, 8:00 AM", sender: "clinic", status: "delivered" },
      { id: 4, content: "Appointment confirmed for tomorrow", timestamp: "Today, 8:15 AM", sender: "patient" },
    ],
    3: [
      { id: 1, content: "வணக்கம் Meena! உங்கள் ஆரோக்கியம் எப்படி உள்ளது?", timestamp: "2 days ago, 10:00 AM", sender: "clinic", status: "read" },
      { id: 2, content: "நன்றாக இருக்கிறேன் டாக்டர்", timestamp: "2 days ago, 10:30 AM", sender: "patient" },
      { id: 3, content: "மருந்துகள் சரியாக எடுத்துக்கொள்கிறீர்களா?", timestamp: "Yesterday, 9:00 AM", sender: "clinic", status: "read" },
      { id: 4, content: "மருந்து எடுத்துக்கொண்டேன்", timestamp: "Yesterday, 9:30 AM", sender: "patient" },
    ],
    4: [
      { id: 1, content: "Hello Suresh! This is a reminder for your follow-up appointment.", timestamp: "3 days ago, 11:00 AM", sender: "clinic", status: "read" },
      { id: 2, content: "Thank you for the reminder", timestamp: "3 days ago, 11:30 AM", sender: "patient" },
    ],
    5: [
      { id: 1, content: "Hello Lakshmi! Your appointment is scheduled for tomorrow.", timestamp: "Yesterday, 3:00 PM", sender: "clinic", status: "read" },
      { id: 2, content: "Can I reschedule?", timestamp: "Yesterday, 3:30 PM", sender: "patient" },
    ],
    6: [
      { id: 1, content: "Hello Anitha! Your bill of ₹1,500 is pending.", timestamp: "Yesterday, 11:00 AM", sender: "clinic", status: "read" },
      { id: 2, content: "I'll pay today", timestamp: "Yesterday, 11:30 AM", sender: "patient" },
      { id: 3, content: "Thank you!", timestamp: "Yesterday, 2:00 PM", sender: "clinic", status: "read" },
      { id: 4, content: "Bill payment done ✓", timestamp: "Yesterday, 2:30 PM", sender: "patient" },
    ],
  };

  return histories[conversationId] || [];
};

export function ConversationDetail({ conversation, onBack }: ConversationDetailProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getChatHistory(conversation.id));
  }, [conversation.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      content: newMessage.trim(),
      timestamp: "Just now",
      sender: "clinic",
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
        <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onBack} className="hidden lg:flex">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cv-primary to-cv-accent flex items-center justify-center text-white font-medium text-sm">
          {conversation.avatar}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-cv-text-primary">{conversation.name}</p>
          <p className="text-xs text-cv-text-secondary">{conversation.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-cv-text-secondary hover:text-cv-primary">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-cv-text-secondary hover:text-cv-primary">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-cv-text-secondary">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "clinic" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5",
                  message.sender === "clinic"
                    ? "bg-cv-primary text-white rounded-br-md"
                    : "bg-muted text-cv-text-primary rounded-bl-md"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div
                  className={cn(
                    "flex items-center gap-1 mt-1",
                    message.sender === "clinic" ? "justify-end" : "justify-start"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px]",
                      message.sender === "clinic"
                        ? "text-white/70"
                        : "text-cv-text-secondary"
                    )}
                  >
                    {message.timestamp}
                  </span>
                  {message.sender === "clinic" && message.status && (
                    <span className="text-white/70">
                      {message.status === "read" ? (
                        <CheckCheck className="w-3.5 h-3.5 text-sky-300" />
                      ) : message.status === "delivered" ? (
                        <CheckCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-cv-text-secondary shrink-0">
            <Smile className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-cv-text-secondary shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            className="shrink-0 gradient-primary text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
