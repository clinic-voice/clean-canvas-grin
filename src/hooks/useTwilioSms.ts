import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SendSmsParams {
  to: string;
  message: string;
  templateName?: string;
}

interface SendSmsResult {
  success: boolean;
  messageSid?: string;
  status?: string;
  error?: string;
}

export function useTwilioSms() {
  const [isSending, setIsSending] = useState(false);
  const [lastResult, setLastResult] = useState<SendSmsResult | null>(null);

  const sendSms = async ({ to, message, templateName }: SendSmsParams): Promise<SendSmsResult> => {
    setIsSending(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('twilio-sms', {
        body: { to, message, templateName },
      });

      if (error) {
        const result = { success: false, error: error.message };
        setLastResult(result);
        toast.error(`Failed to send SMS: ${error.message}`);
        return result;
      }

      if (!data.success) {
        const result = { success: false, error: data.error };
        setLastResult(result);
        toast.error(`Failed to send SMS: ${data.error}`);
        return result;
      }

      const result: SendSmsResult = {
        success: true,
        messageSid: data.messageSid,
        status: data.status,
      };
      setLastResult(result);
      toast.success('SMS sent successfully!');
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const result = { success: false, error: errorMessage };
      setLastResult(result);
      toast.error(`Failed to send SMS: ${errorMessage}`);
      return result;
    } finally {
      setIsSending(false);
    }
  };

  const sendTemplateMessage = async (
    to: string,
    template: { name: string; tamil: string; english: string },
    variables: Record<string, string>,
    language: 'tamil' | 'english' = 'english'
  ): Promise<SendSmsResult> => {
    // Replace template variables
    let message = language === 'tamil' ? template.tamil : template.english;
    
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    return sendSms({ to, message, templateName: template.name });
  };

  return {
    sendSms,
    sendTemplateMessage,
    isSending,
    lastResult,
  };
}
