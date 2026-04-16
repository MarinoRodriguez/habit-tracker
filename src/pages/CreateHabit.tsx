import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import CustomToggle from '../components/CustomToogle';
import BackButton from '../components/BackButton';
import { Frecuency } from '../types';
import SectionHeader from '../components/SectionHeader';

interface CreateHabitProps {
  onBack: () => void;
}

interface FrecuencyObj{
  Frecuency: Frecuency,
  Tittle: string 
}
export default function CreateHabit({ onBack }: CreateHabitProps) {

 const frecuencies: FrecuencyObj[] = [
   {
     Frecuency: Frecuency.daily,
     Tittle: "Diario",
   },
   {
     Frecuency: Frecuency.weekly,
     Tittle: "Semanal",
   },
   {
     Frecuency: Frecuency.biweekly,
     Tittle: "Quincenal",
   },
   {
     Frecuency: Frecuency.monthly,
     Tittle: "Mensual",
   },
   {
     Frecuency: Frecuency.quarterly,
     Tittle: "Trimestral",
   },
   {
     Frecuency: Frecuency.four_months,
     Tittle: "Cuatrimestral",
   },
   {
     Frecuency: Frecuency.semiannual,
     Tittle: "Semestral",
   },
   {
     Frecuency: Frecuency.yearly,
     Tittle: "Anual",
   },
 ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto space-y-12"
    >
      <BackButton onBack={onBack} />
      <SectionHeader
        level="h1"
        title="Nuevo Habito"
        subtitle="Define tu impulso. Da forma a tu progreso."
        className="space-y-4"
      />
      <form
        className="space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">
              Nombre
            </label>
            <input
              className="w-full bg-white border-on-surface/5 rounded-2xl p-6 text-xl font-headline font-semibold focus:ring-4 focus:ring-primary/10 placeholder:text-outline-variant transition-all shadow-sm outline-none"
              placeholder="pj: Tomar Agua"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomToggle />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                  Objetivo
                </label>
                <input
                  className="w-full bg-white border-on-surface/5 rounded-2xl p-5 text-xl font-bold font-headline focus:ring-4 focus:ring-primary/10 shadow-sm outline-none"
                  type="number"
                  defaultValue="1"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                  Medida
                </label>
                <input
                  className="w-full bg-white border-on-surface/5 rounded-2xl p-5 text-lg font-bold font-headline focus:ring-4 focus:ring-primary/10 placeholder:text-outline-variant shadow-sm outline-none"
                  placeholder="Veces, Horas..."
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
              Frequencia
            </label>
            <div className="relative">
              <select className="min-w-full appearance-none bg-surface-container/30 border-none rounded-2xl px-6 py-5 text-on-surface font-bold text-lg focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
                {frecuencies.map((h) => (
                  <option key={h.Frecuency}>{h.Tittle}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <Button
            variant="kinetic"
            type="submit"
            className="w-full py-6 text-xl"
          >
            Crear
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
