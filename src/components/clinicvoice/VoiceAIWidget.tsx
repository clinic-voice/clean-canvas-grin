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
    <div className="rounded-xl bg-gradient-to-br from-cv-primary/20 via-cv-accent/10 to-transparent border border-cv-primary/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isActive ? Infinity : 0,
            }}
            className={`w-2.5 h-2.5 rounded-full ${
              isActive ? "bg-cv-success" : "bg-cv-danger"
            }`}
          />
          <span className="text-sm font-semibold text-cv-text-primary">
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
              className="w-1 h-4 rounded-full bg-cv-primary"
            />
          ))}
        </div>
      </div>

      {currentCall ? (
        <div className="bg-cv-success/10 rounded-lg p-3 mb-4 border border-cv-success/20">
          <div className="flex items-center gap-2 mb-2">
            <PhoneIncoming className="w-4 h-4 text-cv-success" />
            <span className="text-xs font-semibold text-cv-success">Live Call</span>
          </div>
          <p className="text-sm font-medium text-cv-text-primary">{currentCall.patientName}</p>
          <p className="text-xs text-cv-text-muted">Duration: {currentCall.duration}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Phone className="w-5 h-5 mx-auto mb-1 text-cv-primary-light" />
          <p className="text-lg font-bold text-cv-primary-light">{callsToday}</p>
          <p className="text-[10px] text-cv-text-muted">Today's Calls</p>
        </div>
        <div className="text-center">
          <Activity className="w-5 h-5 mx-auto mb-1 text-cv-success" />
          <p className="text-lg font-bold text-cv-success">{resolutionRate}%</p>
          <p className="text-[10px] text-cv-text-muted">Resolution</p>
        </div>
        <div className="text-center">
          <PhoneOff className="w-5 h-5 mx-auto mb-1 text-cv-text-muted" />
          <p className="text-lg font-bold text-cv-text-primary">
            {Math.round(callsToday * 0.05)}
          </p>
          <p className="text-[10px] text-cv-text-muted">Missed</p>
        </div>
      </div>
    </div>
  );
}
