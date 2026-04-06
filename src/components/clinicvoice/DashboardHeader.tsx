import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileSidebar } from "./MobileSidebar";
import { IncomingMessagesNotifier } from "./IncomingMessagesNotifier";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between py-3 px-4 md:py-4 md:px-6 lg:px-8 bg-background/85 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <MobileSidebar />
        
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search - hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="w-[200px] lg:w-[260px] pl-10 bg-secondary/50 border-border/50 focus:bg-background h-9 rounded-xl"
          />
        </div>

        {/* Quick Add */}
        <Button className="gradient-teal text-white border-0 shadow-sm hover:opacity-90 gap-2 h-9 px-3 md:px-4 rounded-xl">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Appointment</span>
        </Button>

        {/* Incoming Messages Notifications */}
        <IncomingMessagesNotifier />

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full gradient-teal flex items-center justify-center text-white font-semibold text-sm">
          DR
        </div>
      </div>
    </header>
  );
}