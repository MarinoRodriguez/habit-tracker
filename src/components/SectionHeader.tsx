import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
  icon?: ReactNode;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  level = 'h2', 
  className = '',
  icon
}: SectionHeaderProps) {
  const Tag = level;
  const sizes = {
    h1: 'text-5xl font-extrabold',
    h2: 'text-3xl font-extrabold',
    h3: 'text-2xl font-bold'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Tag className={`font-headline tracking-tight text-on-surface flex items-center gap-2 ${sizes[level]}`}>
        {icon}
        {title}
      </Tag>
      {subtitle && (
        <p className="text-on-surface-variant font-medium opacity-80 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
