import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import type { Habit } from '../types';
import SectionHeader from '../components/SectionHeader';
import HabitCard from '../components/HabitCard';
import Card from '../components/Card';

interface DashboardProps {
  habits: Habit[];
  onHabitClick: (habit: Habit) => void;
  onAddClick: (habit: Habit) => void;
}

export default function Dashboard({ habits, onHabitClick, onAddClick }: DashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      <SectionHeader 
        level="h1"
        title="My Habits"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onClick={() => onHabitClick(habit)} onAdd={()=>onAddClick(habit)} />
        ))}
      </div>

    </motion.div>
  );
}
