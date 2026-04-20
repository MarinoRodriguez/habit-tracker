import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import SectionHeader from '../components/SectionHeader';
import HabitCard from '../components/HabitCard';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { habits, loading } = useLayout();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const openLogModal = (habitId: string) => {
    searchParams.set('log', habitId);
    navigate(`/home?${searchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      <SectionHeader level="h1" title="My Habits" />

      {habits.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-on-surface-variant text-lg">No hay habitos todavia</p>
          <p className="text-on-surface-variant/60 text-sm">Usa el boton + para crear tu primer habito</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={() => navigate(`/habit/${habit.id}`)}
              onAdd={() => openLogModal(habit.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
