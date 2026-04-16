import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'kinetic';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  icon
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20",
    outline: "border-2 border-on-surface/5 bg-white text-on-surface hover:bg-on-surface/5 focus:ring-4 focus:ring-primary/10",
    ghost: "text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface",
    kinetic: "kinetic-gradient text-white shadow-xl shadow-primary/20 hover:scale-[1.02]"
  };

  const rounded = "rounded-2xl";
  const padding = "py-4 px-8";

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${rounded} ${padding} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
