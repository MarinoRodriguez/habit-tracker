import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: string;
  showLabels?: boolean;
  labelLeft?: string;
  labelRight?: string;
}

export default function ProgressBar({ 
  progress, 
  height = 'h-3', 
  showLabels, 
  labelLeft, 
  labelRight 
}: ProgressBarProps) {
  return (
    <div className="space-y-3 w-full">
      <div className={`w-full ${height} bg-surface-container rounded-full overflow-hidden relative`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full kinetic-gradient rounded-full shadow-[4px_0_12px_rgba(0,88,190,0.3)]"
        />
      </div>
      {showLabels && (labelLeft || labelRight) && (
        <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
    </div>
  );
}
