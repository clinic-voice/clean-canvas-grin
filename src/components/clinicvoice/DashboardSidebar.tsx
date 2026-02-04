import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
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
  LogOut,
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
      <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent"
              )}
            >
              <item.icon className={cn(
                "w-[18px] h-[18px] transition-transform duration-200",
                !isActive && "group-hover:scale-105"
              )} />
              <span className="font-medium">{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
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
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[250px] bg-card border-r border-border flex flex-col">
      {/* Logo - Professional */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Phone className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">ClinicVoice</h1>
          <p className="text-[10px] font-medium text-primary uppercase tracking-wider">
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

      {/* User & Logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email || "User"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Voice AI Status Widget - Professional */}
      <div className="p-4 border-t border-border">
        <div className="rounded-lg p-4 bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-foreground">Voice AI Active</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">47</p>
              <p className="text-[10px] text-muted-foreground">Calls Today</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">95%</p>
              <p className="text-[10px] text-muted-foreground">Resolution</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
