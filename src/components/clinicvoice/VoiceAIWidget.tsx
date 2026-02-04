import { Phone, PhoneIncoming, PhoneOff, Activity, Waves } from "lucide-react";
import { motion } from "framer-motion";

interface VoiceAIWidgetProps {
  isActive?: boolean;
  callsToday: number;
  resolutionRate: number;
  currentCall?: {
    patientName: string;
    duration: string;
  };
}

export function VoiceAIWidget({
  isActive = true,
  callsToday,
  resolutionRate,
  currentCall,
}: VoiceAIWidgetProps) {
  return (
    <div className="rounded-xl bg-card border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {isActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-primary' : 'bg-destructive'}`}></span>
          </span>
          <span className="text-sm font-semibold text-foreground">
            Tamil Voice AI
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: isActive ? [1, 1.8, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isActive ? Infinity : 0,
                delay: i * 0.08,
              }}
              className="w-0.5 md:w-1 h-4 rounded-full bg-primary/60"
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Current Call */}
        {currentCall && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 rounded-xl p-3 mb-4 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <PhoneIncoming className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary">Live Call</span>
            </div>
            <p className="text-sm font-medium text-foreground">{currentCall.patientName}</p>
            <p className="text-xs text-muted-foreground">Duration: {currentCall.duration}</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <Phone className="w-4 h-4 mx-auto mb-1.5 text-primary" />
            <p className="text-lg font-bold text-foreground">{callsToday}</p>
            <p className="text-[10px] text-muted-foreground">Today</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <Activity className="w-4 h-4 mx-auto mb-1.5 text-green-600 dark:text-green-400" />
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{resolutionRate}%</p>
            <p className="text-[10px] text-muted-foreground">Resolved</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <PhoneOff className="w-4 h-4 mx-auto mb-1.5 text-muted-foreground" />
            <p className="text-lg font-bold text-foreground">{Math.round(callsToday * 0.05)}</p>
            <p className="text-[10px] text-muted-foreground">Missed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
