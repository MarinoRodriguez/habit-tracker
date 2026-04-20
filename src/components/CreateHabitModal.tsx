import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronDown } from 'lucide-react';
import Button from './Button';
import { Frequency } from '../types';
import type { CreateHabitDTO } from '../services/types';
import { getUserTimezone } from '../services';

interface CreateHabitModalProps {
  onClose: () => void;
  onCreate?: (data: CreateHabitDTO) => void;
}

interface FrequencyObj {
  value: (typeof Frequency)[keyof typeof Frequency];
  label: string;
}

export default function CreateHabitModal({ onClose, onCreate }: CreateHabitModalProps) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(1);
  const [unit, setUnit] = useState('');
  const [frequency, setFrequency] = useState<(typeof Frequency)[keyof typeof Frequency]>('daily');
  const [habitType, setHabitType] = useState<'increase' | 'decrease'>('increase');

  const frequencies: FrequencyObj[] = [
    { value: Frequency.daily, label: "Diario" },
    { value: Frequency.weekly, label: "Semanal" },
    { value: Frequency.biweekly, label: "Quincenal" },
    { value: Frequency.monthly, label: "Mensual" },
    { value: Frequency.quarterly, label: "Trimestral" },
    { value: Frequency.four_months, label: "Cuatrimestral" },
    { value: Frequency.semiannual, label: "Semestral" },
    { value: Frequency.yearly, label: "Anual" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreate && name && goal > 0 && unit) {
      onCreate({
        name,
        frequency,
        goal,
        unit,
        type: habitType,
        timezone: getUserTimezone(),
        colorClass: 'bg-primary-fixed',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 pt-6 pb-4 flex justify-between items-center border-b border-on-surface/5">
          <h2 className="text-xl font-headline font-bold">Nuevo Habito</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-on-surface/5 hover:bg-on-surface/10 active:scale-90 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">
              Nombre
            </label>
            <input
              className="w-full bg-surface-container/30 border border-on-surface/5 rounded-xl px-4 py-3 text-base font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Ej: Tomar Agua"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
              Tipo de meta
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHabitType("increase")}
                className={`flex-1 py-3 px-3 rounded-xl font-bold text-sm transition-all ${
                  habitType === "increase"
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface-container text-on-surface hover:bg-surface-container/80"
                }`}
              >
                Por lo menos
              </button>
              <button
                type="button"
                onClick={() => setHabitType("decrease")}
                className={`flex-1 py-3 px-3 rounded-xl font-bold text-sm transition-all ${
                  habitType === "decrease"
                    ? "bg-tertiary text-white shadow-md"
                    : "bg-surface-container text-on-surface hover:bg-surface-container/80"
                }`}
              >
                No mas de
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                Objetivo
              </label>
              <input
                className="w-full bg-surface-container/30 border border-on-surface/5 rounded-xl px-4 py-3 text-base font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                type="number"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                Unidad
              </label>
              <input
                className="w-full bg-surface-container/30 border border-on-surface/5 rounded-xl px-4 py-3 text-base font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="vasos, horas..."
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
              Frecuencia
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-surface-container/30 border border-on-surface/5 rounded-xl px-4 py-3 text-base font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                value={frequency}
                onChange={(e) =>
                  setFrequency(
                    e.target
                      .value as (typeof Frequency)[keyof typeof Frequency],
                  )
                }
              >
                {frequencies.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant w-4 h-4" />
            </div>
          </div>

          <div className="pt-2">
            <Button variant="kinetic" type="submit" className="w-full py-4">
              Crear
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
