import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-3xl p-6 shadow-sm border border-on-surface/5 overflow-hidden
        ${hover ? 'transition-all hover:translate-y-[-4px] active:scale-[0.98]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
