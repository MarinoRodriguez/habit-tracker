import type { ReactNode } from 'react';

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  primary?: boolean;
}

export default function NavButton({ icon, label, active, onClick, primary }: NavButtonProps) {
  if (primary) {
    return (
      <button 
        onClick={onClick}
        className="flex flex-col items-center justify-center bg-primary text-white rounded-2xl px-6 py-2 shadow-lg shadow-primary/30 active:scale-90 transition-all"
      >
        {icon}
        <span className="text-[10px] font-headline font-bold uppercase mt-1">{label}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-4 py-2 transition-all active:scale-90 ${active ? 'text-primary' : 'text-on-surface-variant'}`}
    >
      {icon}
      <span className="text-[10px] font-headline font-bold uppercase mt-1">{label}</span>
    </button>
  );
}
