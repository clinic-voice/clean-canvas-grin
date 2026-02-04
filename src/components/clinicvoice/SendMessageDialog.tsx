import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, MessageSquare, Phone } from "lucide-react";
import { useTwilioWhatsApp } from "@/hooks/useTwilioWhatsApp";
import { useTwilioSms } from "@/hooks/useTwilioSms";
import { cn } from "@/lib/utils";

type MessageChannel = "whatsapp" | "sms";

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: {
    name: string;
    tamil: string;
    english: string;
  } | null;
  prefillPhone?: string;
  defaultChannel?: MessageChannel;
}

export function SendMessageDialog({ 
  open, 
  onOpenChange, 
  template,
  prefillPhone = "",
  defaultChannel = "whatsapp"
}: SendMessageDialogProps) {
  const [phone, setPhone] = useState(prefillPhone);
  const [customMessage, setCustomMessage] = useState("");
  const [language, setLanguage] = useState<"tamil" | "english">("english");
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [channel, setChannel] = useState<MessageChannel>(defaultChannel);
  
  const { sendWhatsApp, sendTemplateMessage: sendWhatsAppTemplate, isSending: isSendingWhatsApp } = useTwilioWhatsApp();
  const { sendSms, sendTemplateMessage: sendSmsTemplate, isSending: isSendingSms } = useTwilioSms();

  const isSending = isSendingWhatsApp || isSendingSms;

  // Extract variables from template
  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{([^}]+)\}/g) || [];
    return [...new Set(matches.map(m => m.slice(1, -1)))];
  };

  const templateVariables = template 
    ? extractVariables(template.tamil + template.english)
    : [];

  const handleSend = async () => {
    if (!phone) return;

    let success = false;
    
    if (channel === "whatsapp") {
      if (template) {
        const result = await sendWhatsAppTemplate(phone, template, variables, language);
        success = result.success;
      } else if (customMessage) {
        const result = await sendWhatsApp({ to: phone, message: customMessage });
        success = result.success;
      }
    } else {
      if (template) {
        const result = await sendSmsTemplate(phone, template, variables, language);
        success = result.success;
      } else if (customMessage) {
        const result = await sendSms({ to: phone, message: customMessage });
        success = result.success;
      }
    }

    if (success) {
      onOpenChange(false);
      // Reset form
      setPhone("");
      setCustomMessage("");
      setVariables({});
    }
  };

  const previewMessage = () => {
    if (!template) return customMessage;
    
    let message = language === "tamil" ? template.tamil : template.english;
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`\\{${key}\\}`, "g"), value || `{${key}}`);
    });
    return message;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {channel === "whatsapp" ? (
              <MessageSquare className="w-5 h-5 text-primary" />
            ) : (
              <Phone className="w-5 h-5 text-primary" />
            )}
            {template ? `Send: ${template.name}` : `Send ${channel === "whatsapp" ? "WhatsApp" : "SMS"} Message`}
          </DialogTitle>
          <DialogDescription>
            {template 
              ? "Fill in the template variables and send to patient" 
              : `Compose and send a custom ${channel === "whatsapp" ? "WhatsApp" : "SMS"} message`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Channel Toggle */}
          <div className="space-y-2">
            <Label>Message Channel</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={channel === "whatsapp" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannel("whatsapp")}
                className={cn(
                  "flex items-center gap-2",
                  channel === "whatsapp" && "bg-green-600 hover:bg-green-700 text-white"
                )}
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button
                type="button"
                variant={channel === "sms" ? "default" : "outline"}
                size="sm"
                onClick={() => setChannel("sms")}
                className={cn(
                  "flex items-center gap-2",
                  channel === "sms" && "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                <Phone className="w-4 h-4" />
                SMS
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {channel === "whatsapp" 
                ? "Send via WhatsApp (requires patient to have WhatsApp)" 
                : "Send via SMS (works on any phone)"}
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Include country code (e.g., +91 for India)
            </p>
          </div>

          {/* Template Variables or Custom Message */}
          {template ? (
            <>
              {/* Language Toggle */}
              <div className="space-y-2">
                <Label>Language</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={language === "english" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("english")}
                    className={cn(language === "english" && "gradient-teal text-white")}
                  >
                    English
                  </Button>
                  <Button
                    type="button"
                    variant={language === "tamil" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("tamil")}
                    className={cn(language === "tamil" && "gradient-teal text-white")}
                  >
                    தமிழ் (Tamil)
                  </Button>
                </div>
              </div>

              {/* Variable Inputs */}
              {templateVariables.length > 0 && (
                <div className="space-y-3">
                  <Label>Template Variables</Label>
                  {templateVariables.map((variable) => (
                    <div key={variable} className="space-y-1">
                      <Label htmlFor={variable} className="text-xs text-muted-foreground capitalize">
                        {variable.replace(/_/g, " ")}
                      </Label>
                      <Input
                        id={variable}
                        placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                        value={variables[variable] || ""}
                        onChange={(e) => setVariables(prev => ({ 
                          ...prev, 
                          [variable]: e.target.value 
                        }))}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Preview */}
              <div className="space-y-2">
                <Label>Message Preview</Label>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {previewMessage()}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={isSending || !phone || (!template && !customMessage)}
            className={cn(
              channel === "whatsapp" 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send {channel === "whatsapp" ? "WhatsApp" : "SMS"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
