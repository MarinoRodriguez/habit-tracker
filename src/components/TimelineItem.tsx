import { CheckCircle2, X } from 'lucide-react';

interface TimelineItemProps {
  label: string;
  title: string;
  subtitle: string;
  value: string;
  status: 'active' | 'success' | 'error';
}

export default function TimelineItem({ label, title, subtitle, value, status }: TimelineItemProps) {
  const statusConfig = {
    active: 'bg-primary text-white',
    success: 'bg-secondary text-white',
    error: 'bg-tertiary text-white'
  }[status];

  return (
    <div className="flex items-center gap-6 relative group">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-sm font-bold text-[10px] ${statusConfig}`}>
        {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : status === 'error' ? <X className="w-5 h-5" /> : label}
      </div>
      <div className="flex-1 bg-white p-4 rounded-2xl flex justify-between items-center group-hover:translate-x-2 transition-transform shadow-sm border border-on-surface/5">
        <div>
          <p className="font-bold text-on-surface">{title}</p>
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{subtitle}</p>
        </div>
        <span className={`font-black font-headline ${status === 'active' ? 'text-primary' : status === 'success' ? 'text-secondary' : 'text-tertiary'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
