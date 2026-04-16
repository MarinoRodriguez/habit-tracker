import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Plus, 
  Zap, 
  LayoutGrid, 
  BarChart3, 
  PlusSquare, 
  ArrowLeft,
  User
} from 'lucide-react';
import type { Habit, Activity, Page } from './types';

// Reusable Components
import NavButton from './components/NavButton';
import LogModal from './components/LogModal';

// Pages
import Dashboard from './pages/Dashboard';
import HabitDetails from './pages/HabitDetails';
import CreateHabit from './pages/CreateHabit';

// Mock Data
const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Hydration',
    status: 'fulfilled',
    current: 8,
    goal: 8,
    unit: 'glasses',
    colorClass: 'bg-secondary-container',
    progress: 100
  },
  {
    id: '2',
    name: 'Mindful Coding',
    status: 'pending',
    current: 2,
    goal: 5,
    unit: 'pomodoros',
    colorClass: 'bg-primary-fixed',
    progress: 40
  },
  {
    id: '3',
    name: 'Digital Detox',
    status: 'failed',
    current: 0.5,
    goal: 4,
    unit: 'hours',
    colorClass: 'bg-tertiary-container',
    progress: 12.5
  },
  {
    id: '4',
    name: 'Afternoon Walk',
    status: 'pending',
    current: 7500,
    goal: 10000,
    unit: 'steps',
    colorClass: 'bg-primary-fixed',
    progress: 75
  }
];

const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', habitId: '1', name: 'Morning Routine', amount: 0.5, time: '07:45 AM' },
  { id: 'a2', habitId: '1', name: 'Post-Workout', amount: 1.0, time: '09:15 AM' },
  { id: 'a3', habitId: '1', name: 'Deep Work', amount: 0.4, time: '11:30 AM' },
  { id: 'a4', habitId: '1', name: 'Lunch', amount: 0.5, time: '01:45 PM' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [habits] = useState<Habit[]>(INITIAL_HABITS);

  const navigateToDetails = (habit: Habit) => {
    setActiveHabit(habit);
    setCurrentPage('details');
  };

  const navigateBack = () => {
    setCurrentPage('dashboard');
    setActiveHabit(null);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {/* Navigation */}
      {/* <nav className="fixed top-0 z-50 w-full h-20 px-6 flex justify-between items-center glass-panel shadow-sm transition-all border-b border-on-surface/5">
        <div className="flex items-center gap-3">
          {currentPage !== "dashboard" && (
            <button
              onClick={navigateBack}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-on-surface/5 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary fill-primary" />
            <span className="text-2xl font-black text-primary tracking-tighter font-headline">
              Kinetic
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            className={`font-headline font-bold transition-all ${currentPage === "dashboard" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            onClick={() => setCurrentPage("dashboard")}
          >
            Home
          </button>
          <button className="text-on-surface-variant font-headline font-bold hover:text-primary transition-all">
            Trends
          </button>
          <button className="text-on-surface-variant font-headline font-bold hover:text-primary transition-all">
            Log
          </button>
          <button className="text-on-surface-variant font-headline font-bold hover:text-primary transition-all">
            Profile
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-on-surface/5 active:scale-90 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-on-surface/5 active:scale-90 transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-primary/10">
            <img
              src="https://picsum.photos/seed/portrait/100/100"
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === "dashboard" && (
            <Dashboard
              habits={habits}
              onHabitClick={navigateToDetails}
              onAddClick={(habit: Habit) => {
                console.log({ habit });
                setActiveHabit(habit);
                setIsLogModalOpen(true);
              }}
            />
          )}
          {currentPage === "details" && activeHabit && (
            <HabitDetails
              habit={activeHabit}
              activities={MOCK_ACTIVITIES}
              onLogClick={() => setIsLogModalOpen(true)}
              onBack={navigateBack}
            />
          )}
          {currentPage === "create" && <CreateHabit onBack={navigateBack} />}
        </AnimatePresence>
      </main>

      {/* FAB - Desktop only or as needed */}
      <button
        onClick={() => setCurrentPage("create")}
        className="fixed bottom-32 right-8 md:bottom-12 md:right-12 z-40 kinetic-gradient text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-105 active:scale-90 transition-all group"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isLogModalOpen && (
          <LogModal
            onClose={() => {
              setIsLogModalOpen(false);
              setActiveHabit(null);
            }}
            habit={activeHabit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
