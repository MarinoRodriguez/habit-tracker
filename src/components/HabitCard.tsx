import { Plus } from 'lucide-react';
import type { HabitWithStatus } from '../services';
import Card from './Card';
import Badge from './Badge';

interface HabitCardProps {
  habit: HabitWithStatus;
  onClick: () => void;
  onAdd: () => void;
  key?: string;
}

export default function HabitCard({ habit, onClick, onAdd }: HabitCardProps) {
  const progress = habit.goal > 0 ? Math.min(100, (habit.currentValue / habit.goal) * 100) : 0;

  return (
    <Card onClick={onClick} className="relative">
      <div className="absolute inset-0 opacity-10 bg-primary" style={{ width: `${progress}%` }} />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="font-headline text-2xl font-bold tracking-tight">{habit.name}</h3>
            <Badge status={habit.status} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="bg-white p-3 rounded-2xl shadow-sm text-primary hover:bg-primary hover:text-white active:scale-90 transition-all border border-on-surface/5"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">Progress</span>
            <span className="text-3xl font-headline font-black text-primary">
              {habit.currentValue} <span className="text-xs font-medium text-on-surface-variant tracking-normal">/ {habit.goal} {habit.unit}</span>
            </span>
          </div>
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full kinetic-gradient rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(0,88,190,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
