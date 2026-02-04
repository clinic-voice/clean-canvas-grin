import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Twilio sends webhooks as form-urlencoded
    const contentType = req.headers.get('content-type') || '';
    let body: Record<string, string> = {};

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.text();
      const params = new URLSearchParams(formData);
      params.forEach((value, key) => {
        body[key] = value;
      });
    } else if (contentType.includes('application/json')) {
      body = await req.json();
    }

    console.log('Received Twilio webhook:', JSON.stringify(body, null, 2));

    // Extract message details from Twilio webhook
    const messageSid = body.MessageSid || body.SmsSid;
    const from = body.From || '';
    const to = body.To || '';
    const messageBody = body.Body || '';
    const numMedia = parseInt(body.NumMedia || '0', 10);
    const messageStatus = body.SmsStatus || body.MessageStatus || 'received';

    // Determine channel (WhatsApp or SMS)
    const isWhatsApp = from.startsWith('whatsapp:') || to.startsWith('whatsapp:');
    const channel = isWhatsApp ? 'whatsapp' : 'sms';

    // Clean phone numbers (remove whatsapp: prefix if present)
    const cleanFrom = from.replace('whatsapp:', '');
    const cleanTo = to.replace('whatsapp:', '');

    console.log(`Incoming ${channel} message from ${cleanFrom}: ${messageBody.substring(0, 100)}`);

    // Store the incoming message in the database
    const { data: messageLog, error: insertError } = await supabase
      .from('message_logs')
      .insert({
        user_id: null, // Incoming messages don't have a user_id yet
        message_sid: messageSid,
        channel: channel,
        to_phone: cleanTo,
        from_phone: cleanFrom,
        message_content: messageBody,
        status: messageStatus,
        direction: 'inbound',
        media_count: numMedia,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing incoming message:', insertError);
      // Don't fail the webhook, Twilio needs a 200 response
    } else {
      console.log('Stored incoming message:', messageLog?.id);
    }

    // Return TwiML response (empty response acknowledges receipt)
    // You can customize this to send an auto-reply
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
</Response>`;

    return new Response(twimlResponse, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/xml',
      },
    });

  } catch (error: unknown) {
    console.error('Error processing webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Return 200 to prevent Twilio from retrying
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'text/xml' } 
      }
    );
  }
});
