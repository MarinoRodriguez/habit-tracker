import { useState } from "react";

export default function CustomToggle() {
  const [type, setType] = useState<"increase" | "decrease">("increase"); // increase | decrease

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">
        Criterio de exito
      </label>

      <div className="flex p-1.5 bg-surface-container rounded-2xl">
        <button
          type="button"
          onClick={() => setType("increase")}
          className={`flex-1 py-4 px-4 rounded-xl text-xs font-bold transition-all ${
            type === "increase"
              ? "bg-white shadow-sm text-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Por lo menos
        </button>

        <button
          type="button"
          onClick={() => setType("decrease")}
          className={`flex-1 py-4 px-4 rounded-xl text-xs font-bold transition-all ${
            type === "decrease"
              ? "bg-white shadow-sm text-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          A lo mucho
        </button>
      </div>
    </div>
  );
}
