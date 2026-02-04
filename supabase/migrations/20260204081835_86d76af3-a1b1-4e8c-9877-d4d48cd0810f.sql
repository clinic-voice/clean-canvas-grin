-- Create message_logs table to track WhatsApp/SMS communications
CREATE TABLE public.message_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  message_sid TEXT,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'sms')),
  to_phone TEXT NOT NULL,
  message_content TEXT NOT NULL,
  template_name TEXT,
  language TEXT CHECK (language IN ('tamil', 'english')),
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.message_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own message logs
CREATE POLICY "Users can view their own message logs"
ON public.message_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own message logs
CREATE POLICY "Users can insert their own message logs"
ON public.message_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own message logs (for status updates)
CREATE POLICY "Users can update their own message logs"
ON public.message_logs
FOR UPDATE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_message_logs_user_id ON public.message_logs(user_id);
CREATE INDEX idx_message_logs_created_at ON public.message_logs(created_at DESC);
CREATE INDEX idx_message_logs_channel ON public.message_logs(channel);

-- Add trigger for updated_at
CREATE TRIGGER update_message_logs_updated_at
BEFORE UPDATE ON public.message_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();