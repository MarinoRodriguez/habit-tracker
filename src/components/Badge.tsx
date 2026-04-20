import React from 'react';
import type { HabitStatus } from '../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface BadgeProps {
  status: HabitStatus;
  className?: string;
}

export default function Badge({ status, className = '' }: BadgeProps) {
  const configs: Record<HabitStatus, { icon: React.ReactNode; styles: string; label: string }> = {
    completed: {
      icon: <CheckCircle2 className="w-4 h-4 fill-current" />,
      styles: 'bg-secondary text-white',
      label: 'Completed'
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      styles: 'bg-primary-container text-white',
      label: 'Pending'
    },
    failed: {
      icon: <AlertCircle className="w-4 h-4" />,
      styles: 'bg-tertiary text-white',
      label: 'Failed'
    }
  };

  const current = configs[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${current.styles} ${className}`}>
      {current.icon}
      {current.label}
    </span>
  );
}
