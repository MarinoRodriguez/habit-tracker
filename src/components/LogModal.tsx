import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus } from 'lucide-react';
import type { Habit } from '../types';
import SectionHeader from './SectionHeader';
import Button from './Button';

interface LogModalProps {
  onClose: () => void;
  habit: Habit | null;
}

export default function LogModal({ onClose, habit }: LogModalProps) {
  const [count, setCount] = useState(1);
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-3xl rounded-t-[3rem] md:rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <div className="md:hidden w-full flex justify-center pt-6 pb-2">
          <div className="w-16 h-1.5 bg-on-surface/10 rounded-full" />
        </div>

        <div className="px-10 pt-8 md:pt-12 pb-6 flex justify-between items-start">
          <SectionHeader
            title="Registrar Actividad"
            subtitle="Registra tu progreso en este habito."
            level="h2"
            className="md:!space-y-1"
          />
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-on-surface/5 hover:bg-on-surface/10 active:scale-90 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-10 pb-12 space-y-10">
         

          <div className="space-y-6">
            {/* <label className="text-[14px] font-bold uppercase tracking-widest text-on-surface-variant text-center block">
              Amount to Add
            </label> */}
            <div className="flex items-center justify-center gap-12">
              <button
                onClick={() => setCount(Math.max(0, count - 1))}
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-on-surface/5 text-primary hover:bg-primary/5 active:scale-90 transition-all"
              >
                <Minus className="w-8 h-8" />
              </button>
              <div className="text-center">
                <input
                  className="w-32 text-center text-8xl font-headline font-black tracking-tighter text-on-surface bg-transparent border-none focus:ring-0 p-0"
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                />
                {
                habit?.unit
                 && <div className="text-[12px] font-bold text-primary uppercase mt-1 tracking-widest">
                  {habit?.unit ?? "units"}
                  </div>
                }
              </div>
              <button
                onClick={() => setCount(count + 1)}
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-on-surface/5 text-primary hover:bg-primary/5 active:scale-90 transition-all"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>

            <div className="flex justify-center gap-4">
              {[1, 10, 30].map((val) => (
                <button
                  key={val}
                  onClick={() => setCount(count + val)}
                  className="px-8 py-3 rounded-full bg-surface-container text-on-surface font-bold text-sm hover:kinetic-gradient hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  +{val}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="kinetic"
              className="w-full py-6 text-xl"
              onClick={onClose}
              // icon={<Zap className="w-6 h-6 fill-current" />}
            >
              Registrar
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
