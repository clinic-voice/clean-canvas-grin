-- Add columns for incoming messages
ALTER TABLE public.message_logs 
ADD COLUMN IF NOT EXISTS from_phone TEXT,
ADD COLUMN IF NOT EXISTS direction TEXT DEFAULT 'outbound' CHECK (direction IN ('inbound', 'outbound')),
ADD COLUMN IF NOT EXISTS media_count INTEGER DEFAULT 0;

-- Update existing rows to have direction = 'outbound'
UPDATE public.message_logs SET direction = 'outbound' WHERE direction IS NULL;

-- Allow service role to insert incoming messages (no user_id)
ALTER TABLE public.message_logs ALTER COLUMN user_id DROP NOT NULL;

-- Create policy for viewing incoming messages (messages without user_id)
CREATE POLICY "Users can view incoming messages"
ON public.message_logs
FOR SELECT
USING (user_id IS NULL);

-- Create index for incoming messages lookup
CREATE INDEX IF NOT EXISTS idx_message_logs_from_phone ON public.message_logs(from_phone);
CREATE INDEX IF NOT EXISTS idx_message_logs_direction ON public.message_logs(direction);