import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { useNotificationSound } from '@/hooks/useNotificationSound';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES = [
  { label: '💰 Pricing', message: 'What are the pricing plans?' },
  { label: '🎯 Features', message: 'What features does ClinicVoice offer?' },
  { label: '🎙️ Voice AI', message: 'How does the Voice AI work?' },
  { label: '📅 Demo', message: 'How can I schedule a demo?' },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SOUND_STORAGE_KEY = 'clinicvoice-chat-sound-enabled';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Welcome to ClinicVoice AI! I'm here to help you manage your clinic efficiently. Ask me about:\n\n• **Appointment scheduling**\n• **Patient management**\n• **Voice AI features**\n• **Billing & analytics**\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    return stored !== null ? stored === 'true' : true;
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { playNotification } = useNotificationSound();

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages.slice(1), userMessage],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let hasPlayedSound = false;

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              // Play notification sound on first content chunk if enabled
              if (!hasPlayedSound && soundEnabled) {
                playNotification();
                hasPlayedSound = true;
              }
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      setMessages((prev) => {
        if (prev[prev.length - 1]?.content === '') {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Toggle Button with Glow */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-4 rounded-2xl',
          'bg-gradient-to-br from-teal-500 to-teal-600',
          'text-white shadow-lg shadow-teal-500/30',
          'hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-1',
          'transition-all duration-300',
          isOpen && 'hidden'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Open chat"
      >
        <div className="relative">
          <MessageCircle className="size-6" />
          <motion.span
            className="absolute -top-1 -right-1 size-3 bg-green-400 rounded-full border-2 border-teal-600"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]',
              'bg-cv-dark-card/95 backdrop-blur-xl',
              'border border-cv-accent/20 rounded-2xl',
              'shadow-2xl shadow-black/50 overflow-hidden'
            )}
          >
            {/* Header with Gradient */}
            <div className="relative p-4 border-b border-cv-accent/10 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-teal-500/10 to-transparent" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  >
                    <Sparkles className="size-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white text-sm tracking-wide">ClinicVoice AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-xs text-cv-text-secondary">Always here to help</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="size-8 rounded-lg hover:bg-white/10 text-cv-text-secondary hover:text-white transition-colors"
                    title={soundEnabled ? 'Disable notification sound' : 'Enable notification sound'}
                  >
                    {soundEnabled ? (
                      <Volume2 className="size-4" />
                    ) : (
                      <VolumeX className="size-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="size-8 rounded-lg hover:bg-white/10 text-cv-text-secondary hover:text-white transition-colors"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[420px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05, type: 'spring', damping: 20 }}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <motion.div
                      className={cn(
                        'size-8 rounded-xl flex items-center justify-center shrink-0',
                        message.role === 'assistant'
                          ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20'
                          : 'bg-cv-dark-hover border border-cv-accent/20'
                      )}
                      whileHover={{ scale: 1.1 }}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="size-4 text-white" />
                      ) : (
                        <User className="size-4 text-cv-text-secondary" />
                      )}
                    </motion.div>
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 max-w-[80%]',
                        message.role === 'assistant'
                          ? 'bg-cv-dark-hover/80 border border-cv-accent/10 text-cv-text-primary'
                          : 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm prose-invert max-w-none prose-p:text-cv-text-primary prose-p:leading-relaxed prose-strong:text-teal-400 prose-ul:text-cv-text-secondary">
                          <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Quick Reply Buttons - show after initial message only */}
                {messages.length === 1 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {QUICK_REPLIES.map((reply) => (
                      <motion.button
                        key={reply.label}
                        onClick={() => {
                          setInput(reply.message);
                          setTimeout(() => {
                            const form = document.querySelector('form');
                            form?.requestSubmit();
                          }, 50);
                        }}
                        className={cn(
                          'px-3 py-1.5 text-xs font-medium rounded-full',
                          'bg-cv-dark-hover border border-cv-accent/20',
                          'text-cv-text-secondary hover:text-white',
                          'hover:border-teal-500/40 hover:bg-teal-500/10',
                          'transition-all duration-200'
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {reply.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
                
                {/* Typing Indicator */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="size-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                      <Bot className="size-4 text-white" />
                    </div>
                    <div className="bg-cv-dark-hover/80 border border-cv-accent/10 rounded-2xl px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-2 bg-teal-400 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: i * 0.15,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-cv-accent/10 bg-cv-dark-hover/30">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 bg-cv-dark-card border-cv-accent/20',
                    'text-cv-text-primary placeholder:text-cv-text-secondary/50',
                    'focus:border-teal-500/50 focus:ring-teal-500/20',
                    'rounded-xl h-11'
                  )}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    'size-11 rounded-xl',
                    'bg-gradient-to-br from-teal-500 to-teal-600',
                    'hover:from-teal-400 hover:to-teal-500',
                    'shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40',
                    'disabled:opacity-50 disabled:shadow-none',
                    'transition-all duration-200'
                  )}
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="text-[10px] text-cv-text-secondary/50 text-center mt-2">
                Powered by ClinicVoice AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
