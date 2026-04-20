import type { HabitLog } from '../types';

interface ActivityRowProps {
  log: HabitLog;
  key?: string;
}

export default function ActivityRow({ log }: ActivityRowProps) {
  const logDate = new Date(log.timestamp);
  const timeStr = logDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = logDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="p-5 flex justify-between items-center bg-white hover:bg-surface-container/20 transition-all border-b border-on-surface/5 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-3 h-12 rounded-full bg-primary/10 flex flex-col justify-end overflow-hidden">
          <div
            className="bg-primary w-full transition-all duration-700"
            style={{ height: `${Math.min(100, log.value * 10)}%` }}
          />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-on-surface">{log.note || 'Log entry'}</p>
          <p className="text-[10px] text-on-surface-variant font-medium">Recorded</p>
        </div>
      </div>
      <div className="text-right space-y-1">
        <p className="font-black text-primary text-xl font-headline">+{log.value}</p>
        <p className="text-[9px] text-on-surface-variant font-medium uppercase">units</p>
        <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">
          {dateStr} {timeStr}
        </p>
      </div>
    </div>
  );
}
