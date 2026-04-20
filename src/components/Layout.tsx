import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import LogModal from './LogModal';
import CreateHabitModal from './CreateHabitModal';
import {
  createHabitService,
  setHabitService,
  getHabitService,
  habitRepository,
  habitLogRepository,
  habitGroupRepository,
} from '../services';
import type { HabitWithStatus, CreateHabitDTO } from '../services';
import { useState } from 'react';

export default function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [habits, setHabits] = useState<HabitWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);
  const [showFab, setShowFab] = useState(true);

  const modalType = searchParams.get('modal');
  const logHabitId = searchParams.get('log');

  const loadHabits = useCallback(async () => {
    try {
      const service = getHabitService();
      const result = await service.getAllHabitsWithStatus();
      setHabits(result);
    } catch (error) {
      console.error('Failed to load habits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    habitRepository.seedInitialData();
    habitLogRepository.seedInitialData();
    const service = createHabitService(habitRepository, habitLogRepository, habitGroupRepository);
    setHabitService(service);
    loadHabits();
  }, [loadHabits]);

  useEffect(() => {
    if (logHabitId) {
      setActiveHabitId(logHabitId);
    }
  }, [logHabitId]);

  const activeHabit = habits.find(h => h.id === activeHabitId) || null;

  const closeModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('modal');
      newParams.delete('log');
      return newParams;
    });
    setActiveHabitId(null);
  };

  const openCreateModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('modal', 'create');
      return newParams;
    });
  };

  const handleCreateHabit = async (data: CreateHabitDTO) => {
    try {
      const service = getHabitService();
      await service.createHabit(data);
      await loadHabits();
    } catch (error) {
      console.error('Failed to create habit:', error);
    }
  };

  const handleLogActivity = async (habitId: string, value: number) => {
    try {
      const service = getHabitService();
      await service.createHabitLog({ habitId, value });
      await loadHabits();
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <Outlet 
          context={{ 
            habits, 
            loading, 
            logHabitId, 
            setSearchParams,
            showFab,
            setShowFab 
          }} 
        />
      </main>

      {showFab && (
        <button
          onClick={openCreateModal}
          className="fixed bottom-32 right-8 md:bottom-12 md:right-12 z-40 kinetic-gradient text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-105 active:scale-90 transition-all group"
        >
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      <AnimatePresence>
        {modalType === 'create' && (
          <CreateHabitModal
            onClose={closeModal}
            onCreate={handleCreateHabit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {logHabitId && activeHabit && (
          <LogModal
            onClose={closeModal}
            habit={activeHabit}
            onLog={handleLogActivity}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
