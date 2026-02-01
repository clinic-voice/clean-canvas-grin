import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Mic,
  BarChart3,
  Settings,
  MessageSquare,
  Pill,
  FileText,
  CreditCard,
  Package,
  HelpCircle,
  Phone,
  Stethoscope,
} from "lucide-react";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: Mic, label: "Voice AI", href: "/voice-ai", badge: "LIVE" },
  { icon: MessageSquare, label: "WhatsApp", href: "/whatsapp" },
  { icon: Pill, label: "Medications", href: "/medications" },
];

const clinicalNavItems = [
  { icon: FileText, label: "EMR Records", href: "/emr" },
  { icon: Stethoscope, label: "Consultations", href: "/consultations" },
];

const businessNavItems = [
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

const settingsNavItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/support" },
];

interface NavSectionProps {
  title: string;
  items: typeof mainNavItems;
  currentPath: string;
}

function NavSection({ title, items, currentPath }: NavSectionProps) {
  return (
    <div className="mb-6">
      <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-wider text-cv-text-muted">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 border-l-[3px] border-transparent",
                isActive
                  ? "bg-cv-primary/10 text-cv-primary-light border-l-cv-primary"
                  : "text-cv-text-secondary hover:bg-muted/50 hover:text-cv-text-primary"
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span className="font-medium">{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-cv-success/20 text-cv-success animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function DashboardSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[250px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-cv-text-primary">ClinicVoice</h1>
          <p className="text-[10px] font-medium text-cv-primary-light uppercase tracking-wider">
            AI Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
        <NavSection title="Main" items={mainNavItems} currentPath={currentPath} />
        <NavSection title="Clinical" items={clinicalNavItems} currentPath={currentPath} />
        <NavSection title="Business" items={businessNavItems} currentPath={currentPath} />
        <NavSection title="System" items={settingsNavItems} currentPath={currentPath} />
      </div>

      {/* Voice AI Status Widget */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="rounded-xl p-4 bg-gradient-to-br from-cv-primary/20 to-cv-accent/10 border border-cv-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cv-success animate-pulse" />
            <span className="text-xs font-semibold text-cv-text-primary">Voice AI Active</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-cv-primary-light">47</p>
              <p className="text-[10px] text-cv-text-muted">Calls Today</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-cv-primary-light">95%</p>
              <p className="text-[10px] text-cv-text-muted">Resolution</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
