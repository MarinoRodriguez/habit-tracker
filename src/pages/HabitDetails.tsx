import { motion } from 'motion/react';
import { Plus, Calendar, History, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import type { Habit, Activity } from '../types';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import TimelineItem from '../components/TimelineItem';
import ActivityRow from '../components/ActivityRow';
import Button from '../components/Button';
import { useState } from 'react';
import BackButton from '../components/BackButton';

interface HabitDetailsProps {
  habit: Habit;
  activities: Activity[];
  onLogClick: () => void;
  onBack: ()=> void;
}

export default function HabitDetails({ habit, activities, onLogClick, onBack }: HabitDetailsProps) {

  const firstLetterUnit: string = habit.unit.charAt(0).toUpperCase();
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          <BackButton onBack={onBack}/>
          <SectionHeader 
            level="h1"
            title={habit.name}
            className="flex flex-col-reverse"
          />
          <Card hover={false} className="p-8 relative">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-7xl font-headline font-black text-primary tracking-tighter leading-none">{habit.current}</span>
                <span className="text-on-surface-variant font-bold text-xl ml-2">/ {habit.goal} {firstLetterUnit}</span>
              </div>
              <Badge status={habit.status} />
            </div>
            
            <ProgressBar progress={habit.progress} height="h-6" showLabels labelLeft="Started at 08:00" labelRight={`${habit.progress}% Complete`} />
          </Card>
        </div>

        <div className="md:col-span-4 space-y-4">
          <div className="bg-surface-container/30 p-6 rounded-2xl border border-on-surface/5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Current Streak</p>
                <p className="text-xl font-bold font-headline">14 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary text-white p-3 rounded-2xl shadow-lg shadow-secondary/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Completion Rate</p>
                <p className="text-xl font-bold font-headline">92%</p>
              </div>
            </div>
          </div>
          <Button 
            variant="kinetic" 
            className="w-full py-6 text-lg" 
            onClick={onLogClick}
            icon={<Plus className="w-6 h-6" />}
          >
            Log Intake
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
            <TimelineItem label="TOD" title="Today" subtitle="Ongoing cycle" value={`${habit.current} / ${habit.goal} ${firstLetterUnit}`} status="active" />
            <TimelineItem label="check" title="Yesterday" subtitle="Sept 24" value="3.8 / 3.5 L" status="success" />
            <TimelineItem label="x" title="Sunday" subtitle="Sept 23" value="2.1 / 3.5 L" status="error" />
            <TimelineItem label="check" title="Saturday" subtitle="Sept 22" value="4.0 / 3.5 L" status="success" />
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeader 
            level="h3" 
            title="Today's Activity" 
            icon={<History className="text-primary w-6 h-6" />} 
          />
          <div className="bg-white rounded-3xl border border-on-surface/5 overflow-hidden shadow-sm">
            <div className="divide-y divide-on-surface/5">
              {activities.map((activity) => (
                <ActivityRow key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              VIEW ALL ENTRIES
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
