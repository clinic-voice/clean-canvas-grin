import { Phone, PhoneIncoming, PhoneOff, Activity } from "lucide-react";
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
    <div className="rounded-lg bg-muted/50 border border-border p-3 md:p-4">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isActive ? Infinity : 0,
            }}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
              isActive ? "bg-green-500" : "bg-destructive"
            }`}
          />
          <span className="text-xs md:text-sm font-semibold text-foreground">
            Tamil Voice AI {isActive ? "Active" : "Offline"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: isActive ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isActive ? Infinity : 0,
                delay: i * 0.1,
              }}
              className="w-0.5 md:w-1 h-3 md:h-4 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>

      {currentCall ? (
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2.5 md:p-3 mb-3 md:mb-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <PhoneIncoming className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 dark:text-green-400" />
            <span className="text-[10px] md:text-xs font-semibold text-green-700 dark:text-green-400">Live Call</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-foreground">{currentCall.patientName}</p>
          <p className="text-[10px] md:text-xs text-muted-foreground">Duration: {currentCall.duration}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="text-center">
          <Phone className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
          <p className="text-base md:text-lg font-bold text-primary">{callsToday}</p>
          <p className="text-[9px] md:text-[10px] text-muted-foreground">Today's Calls</p>
        </div>
        <div className="text-center">
          <Activity className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
          <p className="text-base md:text-lg font-bold text-green-600 dark:text-green-400">{resolutionRate}%</p>
          <p className="text-[9px] md:text-[10px] text-muted-foreground">Resolution</p>
        </div>
        <div className="text-center">
          <PhoneOff className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-muted-foreground" />
          <p className="text-base md:text-lg font-bold text-foreground">
            {Math.round(callsToday * 0.05)}
          </p>
          <p className="text-[9px] md:text-[10px] text-muted-foreground">Missed</p>
        </div>
      </div>
    </div>
  );
}
