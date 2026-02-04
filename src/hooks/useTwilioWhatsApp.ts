import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SendWhatsAppParams {
  to: string;
  message: string;
  templateName?: string;
}

interface SendWhatsAppResult {
  success: boolean;
  messageSid?: string;
  status?: string;
  error?: string;
}

export function useTwilioWhatsApp() {
  const [isSending, setIsSending] = useState(false);
  const [lastResult, setLastResult] = useState<SendWhatsAppResult | null>(null);

  const sendWhatsApp = async ({ to, message, templateName }: SendWhatsAppParams): Promise<SendWhatsAppResult> => {
    setIsSending(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('twilio-whatsapp', {
        body: { to, message, templateName },
      });

      if (error) {
        const result = { success: false, error: error.message };
        setLastResult(result);
        toast.error(`Failed to send WhatsApp: ${error.message}`);
        return result;
      }

      if (!data.success) {
        const result = { success: false, error: data.error };
        setLastResult(result);
        toast.error(`Failed to send WhatsApp: ${data.error}`);
        return result;
      }

      const result: SendWhatsAppResult = {
        success: true,
        messageSid: data.messageSid,
        status: data.status,
      };
      setLastResult(result);
      toast.success('WhatsApp message sent successfully!');
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const result = { success: false, error: errorMessage };
      setLastResult(result);
      toast.error(`Failed to send WhatsApp: ${errorMessage}`);
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
  ): Promise<SendWhatsAppResult> => {
    // Replace template variables
    let message = language === 'tamil' ? template.tamil : template.english;
    
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    return sendWhatsApp({ to, message, templateName: template.name });
  };

  return {
    sendWhatsApp,
    sendTemplateMessage,
    isSending,
    lastResult,
  };
}
