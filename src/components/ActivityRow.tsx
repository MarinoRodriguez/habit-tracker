import type { Activity } from '../types';

interface ActivityRowProps {
  activity: Activity;
  key?: string;
}

export default function ActivityRow({ activity }: ActivityRowProps) {
  return (
    <div className="p-5 flex justify-between items-center bg-white hover:bg-surface-container/20 transition-all border-b border-on-surface/5 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-3 h-12 rounded-full bg-primary/10 flex flex-col justify-end overflow-hidden">
          <div 
            className="bg-primary w-full transition-all duration-700" 
            style={{ height: `${(activity.amount / 1.0) * 100}%` }}
          />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-on-surface">{activity.name}</p>
          <p className="text-[10px] text-on-surface-variant font-medium">Verified tracking</p>
        </div>
      </div>
      <div className="text-right space-y-1">
        <p className="font-black text-primary text-xl font-headline">+{activity.amount} {activity.unit}</p>
        <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">{activity.time}</p>
      </div>
    </div>
  );
}
