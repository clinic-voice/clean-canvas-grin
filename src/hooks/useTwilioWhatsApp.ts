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

  const logMessage = async (
    to: string,
    message: string,
    templateName: string | undefined,
    language: 'tamil' | 'english' | undefined,
    result: SendWhatsAppResult
  ) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      await supabase.from('message_logs').insert({
        user_id: userData.user.id,
        message_sid: result.messageSid || null,
        channel: 'whatsapp',
        to_phone: to,
        message_content: message,
        template_name: templateName || null,
        language: language || null,
        status: result.success ? (result.status || 'sent') : 'failed',
        error_message: result.error || null,
      });
    } catch (err) {
      console.error('Failed to log message:', err);
    }
  };

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
        await logMessage(to, message, templateName, undefined, result);
        return result;
      }

      if (!data.success) {
        const result = { success: false, error: data.error };
        setLastResult(result);
        toast.error(`Failed to send WhatsApp: ${data.error}`);
        await logMessage(to, message, templateName, undefined, result);
        return result;
      }

      const result: SendWhatsAppResult = {
        success: true,
        messageSid: data.messageSid,
        status: data.status,
      };
      setLastResult(result);
      toast.success('WhatsApp message sent successfully!');
      await logMessage(to, message, templateName, undefined, result);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const result = { success: false, error: errorMessage };
      setLastResult(result);
      toast.error(`Failed to send WhatsApp: ${errorMessage}`);
      await logMessage(to, '', templateName, undefined, result);
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
    let message = language === 'tamil' ? template.tamil : template.english;
    
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    setIsSending(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('twilio-whatsapp', {
        body: { to, message, templateName: template.name },
      });

      if (error) {
        const result = { success: false, error: error.message };
        setLastResult(result);
        toast.error(`Failed to send WhatsApp: ${error.message}`);
        await logMessage(to, message, template.name, language, result);
        return result;
      }

      if (!data.success) {
        const result = { success: false, error: data.error };
        setLastResult(result);
        toast.error(`Failed to send WhatsApp: ${data.error}`);
        await logMessage(to, message, template.name, language, result);
        return result;
      }

      const result: SendWhatsAppResult = {
        success: true,
        messageSid: data.messageSid,
        status: data.status,
      };
      setLastResult(result);
      toast.success('WhatsApp message sent successfully!');
      await logMessage(to, message, template.name, language, result);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const result = { success: false, error: errorMessage };
      setLastResult(result);
      toast.error(`Failed to send WhatsApp: ${errorMessage}`);
      await logMessage(to, message, template.name, language, result);
      return result;
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendWhatsApp,
    sendTemplateMessage,
    isSending,
    lastResult,
  };
}
