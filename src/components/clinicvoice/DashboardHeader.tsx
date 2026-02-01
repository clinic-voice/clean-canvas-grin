import { Bell, Search, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between py-4 px-6 bg-background/80 backdrop-blur-sm border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-cv-text-primary">{title}</h1>
        {subtitle && (
          <p className="text-sm text-cv-text-muted">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-muted" />
          <Input
            type="search"
            placeholder="Search patients, appointments..."
            className="w-[280px] pl-10 bg-muted/50 border-border focus:bg-muted"
          />
        </div>

        {/* Quick Add */}
        <Button className="gradient-primary text-white gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Appointment</span>
        </Button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <Bell className="w-5 h-5 text-cv-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cv-danger" />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cv-accent to-cv-pink flex items-center justify-center text-white font-semibold text-sm">
          DR
        </div>
      </div>
    </header>
  );
}
