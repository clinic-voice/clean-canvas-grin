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
  ChevronRight,
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
      <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
        {title}
      </p>
      <nav className="space-y-0.5 px-2">
        {items.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/8 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-[18px] h-[18px] transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-md bg-accent/15 text-accent">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
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
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] bg-card border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Clinic<span className="text-accent">Voice</span>
          </h1>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            AI Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-5 hide-scrollbar">
        <NavSection title="Main" items={mainNavItems} currentPath={currentPath} />
        <NavSection title="Clinical" items={clinicalNavItems} currentPath={currentPath} />
        <NavSection title="Business" items={businessNavItems} currentPath={currentPath} />
        <NavSection title="System" items={settingsNavItems} currentPath={currentPath} />
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full gradient-teal flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email || "User"}
            </p>
            <p className="text-[10px] text-muted-foreground">Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/8 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Voice AI Status Widget */}
      <div className="p-4 border-t border-border/50">
        <div className="rounded-xl p-4 bg-accent/5 border border-accent/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="text-xs font-semibold text-foreground">Voice AI Active</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-accent">47</p>
              <p className="text-[10px] text-muted-foreground">Calls Today</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-accent">95%</p>
              <p className="text-[10px] text-muted-foreground">Resolution</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}