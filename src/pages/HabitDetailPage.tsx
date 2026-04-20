import { motion } from 'motion/react';
import { useParams, useSearchParams, Link, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, Calendar, History, ChevronRight, ArrowLeft } from 'lucide-react';
import type { HabitLog } from '../types';
import type { HabitWithStatus } from '../services';
import { formatPeriodRange, getHabitService } from '../services';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import TimelineItem from '../components/TimelineItem';
import ActivityRow from '../components/ActivityRow';
import Button from '../components/Button';

interface LayoutContext {
  setSearchParams: (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void;
  setShowFab: (show: boolean) => void;
}

export default function HabitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setSearchParams] = useSearchParams();
  const [habit, setHabit] = useState<HabitWithStatus | null>(null);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);

  const { setShowFab } = useOutletContext<LayoutContext>();

  useEffect(() => {
    setShowFab(false);
    return () => setShowFab(true);
  }, [setShowFab]);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const service = getHabitService();
        const habitResult = await service.getHabitWithStatus(id);
        setHabit(habitResult);

        const logsResult = await service.getHabitLogs(id);
        setLogs(logsResult);
      } catch (error) {
        console.error('Failed to load habit:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const openLogModal = () => {
    if (!id) return;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('log', id);
      return newParams;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-on-surface-variant text-lg">Habit not found</p>
        <Link to="/home" className="text-primary font-bold">Back to Home</Link>
      </div>
    );
  }

  const progress = habit.goal > 0 ? Math.min(100, (habit.currentValue / habit.goal) * 100) : 0;
  const periodLabel = formatPeriodRange({ start: habit.periodStart, end: habit.periodEnd });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center gap-4">
            <Link
              to="/home"
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-bold text-2xl uppercase tracking-widest">Atras</span>
            </Link>
          </div>
          <SectionHeader
            level="h1"
            title={habit.name}
            className="flex flex-col-reverse"
          />
          <Card hover={false} className="p-8 relative">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-7xl font-headline font-black text-primary tracking-tighter leading-none">{habit.currentValue}</span>
                <span className="text-on-surface-variant font-bold text-xl ml-2">/ {habit.goal} {habit.unit}</span>
              </div>
              <Badge status={habit.status} />
            </div>

            <ProgressBar progress={progress} height="h-6" showLabels labelLeft={periodLabel} labelRight={`${progress}% Complete`} />
          </Card>
        </div>

        <div className="md:col-span-4 space-y-4">
          <Button
            variant="kinetic"
            className="w-full py-6 text-lg"
            onClick={openLogModal}
            icon={<Plus className="w-6 h-6" />}
          >
            Registrar
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionHeader
            level="h3"
            title="Period Timeline"
            icon={<Calendar className="text-primary w-6 h-6" />}
          />
          <div className="space-y-4 relative">
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-on-surface/5" />
            <TimelineItem label="TOD" title="Current Period" subtitle={periodLabel} value={`${habit.currentValue} / ${habit.goal} ${habit.unit}`} status="active" />
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeader
            level="h3"
            title="Period Logs"
            icon={<History className="text-primary w-6 h-6" />}
          />
          <div className="bg-white rounded-3xl border border-on-surface/5 overflow-hidden shadow-sm">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant">No logs yet</div>
            ) : (
              <div className="divide-y divide-on-surface/5">
                {logs.map((log) => (
                  <ActivityRow key={log.id} log={log} />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              VER TODOS
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}