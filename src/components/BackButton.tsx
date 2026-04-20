import { ArrowLeft } from "lucide-react";

interface BackButtonParams {
    onBack: ()=> void;
}
export default function BackButton({onBack}: BackButtonParams){
  
    return (
      <div className="space-y-4 space-x-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-bold text-2xl uppercase tracking-widest">
            Atras
          </span>
        </button>
      </div>
    );
}
