import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, CreditCard, Heart, Bell, LucideIcon } from "lucide-react";

export interface Template {
  id: number;
  name: string;
  category: string;
  tamil: string;
  english: string;
  icon: LucideIcon;
}

interface TemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: Template | null;
  onSave: (template: Omit<Template, "id" | "icon">) => void;
}

const VARIABLES = [
  { key: "patient_name", label: "Patient Name", example: "Priya Lakshmi" },
  { key: "appointment_date", label: "Appointment Date", example: "15th January 2026" },
  { key: "appointment_time", label: "Appointment Time", example: "10:30 AM" },
  { key: "doctor_name", label: "Doctor Name", example: "Dr. Ramesh Kumar" },
  { key: "clinic_name", label: "Clinic Name", example: "ClinicVoice Healthcare" },
  { key: "amount", label: "Amount", example: "₹1,500" },
  { key: "phone", label: "Phone", example: "+91 98765 43210" },
];

const CATEGORIES = [
  { value: "Appointments", icon: Calendar },
  { value: "Billing", icon: CreditCard },
  { value: "Follow-up", icon: Heart },
  { value: "General", icon: Bell },
];

const SAMPLE_DATA: Record<string, string> = {
  patient_name: "Priya Lakshmi",
  appointment_date: "15th January 2026",
  appointment_time: "10:30 AM",
  doctor_name: "Dr. Ramesh Kumar",
  clinic_name: "ClinicVoice Healthcare",
  amount: "₹1,500",
  phone: "+91 98765 43210",
};

export function TemplateEditor({
  open,
  onOpenChange,
  template,
  onSave,
}: TemplateEditorProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Appointments");
  const [tamil, setTamil] = useState("");
  const [english, setEnglish] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [activeField, setActiveField] = useState<"tamil" | "english" | null>(null);

  const tamilRef = useRef<HTMLTextAreaElement>(null);
  const englishRef = useRef<HTMLTextAreaElement>(null);

  // Reset form when template changes
  useEffect(() => {
    if (template) {
      setName(template.name);
      setCategory(template.category);
      setTamil(template.tamil);
      setEnglish(template.english);
    } else {
      setName("");
      setCategory("Appointments");
      setTamil("");
      setEnglish("");
    }
    setActiveTab("edit");
  }, [template, open]);

  const insertVariable = (variableKey: string) => {
    const placeholder = `{${variableKey}}`;
    const targetRef = activeField === "tamil" ? tamilRef : englishRef;
    const setValue = activeField === "tamil" ? setTamil : setEnglish;
    const currentValue = activeField === "tamil" ? tamil : english;

    if (targetRef.current) {
      const start = targetRef.current.selectionStart;
      const end = targetRef.current.selectionEnd;
      const newValue =
        currentValue.substring(0, start) +
        placeholder +
        currentValue.substring(end);
      setValue(newValue);

      // Restore cursor position after state update
      setTimeout(() => {
        if (targetRef.current) {
          const newPos = start + placeholder.length;
          targetRef.current.setSelectionRange(newPos, newPos);
          targetRef.current.focus();
        }
      }, 0);
    } else if (activeField) {
      // If no cursor position, append to end
      setValue(currentValue + placeholder);
    }
  };

  const substituteVariables = (text: string): string => {
    let result = text;
    for (const [key, value] of Object.entries(SAMPLE_DATA)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    return result;
  };

  const handleSave = () => {
    if (!name.trim() || !category) return;

    onSave({
      name: name.trim(),
      category,
      tamil: tamil.trim(),
      english: english.trim(),
    });

    onOpenChange(false);
  };

  const isValid = name.trim() && category && (tamil.trim() || english.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {template ? "Edit Template" : "Create Template"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Template Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="e.g., Appointment Reminder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="template-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        {cat.value}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Variables Toolbar */}
          <div className="space-y-2">
            <Label>Insert Variables</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Click a variable to insert it at the cursor position
            </p>
            <div className="flex flex-wrap gap-2">
              {VARIABLES.map((variable) => (
                <Badge
                  key={variable.key}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                  onClick={() => insertVariable(variable.key)}
                >
                  {variable.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Edit / Preview Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="tamil-content">Tamil Message</Label>
                <Textarea
                  ref={tamilRef}
                  id="tamil-content"
                  placeholder="தமிழில் செய்தியை எழுதுங்கள்..."
                  value={tamil}
                  onChange={(e) => setTamil(e.target.value)}
                  onFocus={() => setActiveField("tamil")}
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="english-content">English Message</Label>
                <Textarea
                  ref={englishRef}
                  id="english-content"
                  placeholder="Write your message in English..."
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  onFocus={() => setActiveField("english")}
                  className="min-h-[100px] resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4 mt-4">
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Tamil Preview
                </p>
                <p className="text-foreground whitespace-pre-wrap">
                  {tamil ? substituteVariables(tamil) : (
                    <span className="text-muted-foreground italic">No Tamil content</span>
                  )}
                </p>
              </div>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  English Preview
                </p>
                <p className="text-foreground whitespace-pre-wrap">
                  {english ? substituteVariables(english) : (
                    <span className="text-muted-foreground italic">No English content</span>
                  )}
                </p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Preview shows how the message will appear with sample data
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {template ? "Save Changes" : "Create Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
