import { Check, Megaphone, RotateCcw } from "lucide-react";

import { useTokenStore } from "../store/token-store";

const ControlActions = () => {
  const currentPatient = useTokenStore((state) => state.currentPatient);

  const isActionLoading = useTokenStore((state) => state.isActionLoading);

  const callNext = useTokenStore((state) => state.callNext);

  const recall = useTokenStore((state) => state.recall);

  const complete = useTokenStore((state) => state.complete);

  const hasCurrentPatient = !!currentPatient;

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {/* Next */}
      <button
        type="button"
        onClick={callNext}
        disabled={hasCurrentPatient || isActionLoading}
        className="
          flex items-center justify-center gap-2
          rounded-xl
          bg-gradient-to-r from-blue-600 to-violet-600
          px-3 py-3
          text-sm font-bold text-white
          shadow-[0_6px_16px_rgba(37,99,235,0.18)]
          transition-all duration-200
          hover:from-blue-700 hover:to-violet-700
          hover:shadow-[0_8px_20px_rgba(37,99,235,0.24)]
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:bg-none
          disabled:text-slate-400
          disabled:shadow-none
        "
      >
        <Megaphone className="h-4 w-4" />
        Next
      </button>

      {/* Recall */}
      <button
        type="button"
        onClick={recall}
        disabled={!hasCurrentPatient || isActionLoading}
        className="
          flex items-center justify-center gap-2
          rounded-xl
          border border-slate-200
          bg-white
          px-3 py-3
          text-sm font-bold text-slate-600
          shadow-sm
          transition-all duration-200
          hover:border-slate-300
          hover:bg-slate-50
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <RotateCcw className="h-4 w-4" />
        Recall
      </button>

      {/* Complete */}
      <button
        type="button"
        onClick={complete}
        disabled={!hasCurrentPatient || isActionLoading}
        className="
          flex items-center justify-center gap-2
          rounded-xl
          bg-cyan-400
          px-3 py-3
          text-sm font-bold text-slate-950
          shadow-[0_6px_16px_rgba(34,211,238,0.16)]
          transition-all duration-200
          hover:bg-cyan-300
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:shadow-none
        "
      >
        <Check className="h-4 w-4" />
        Complete
      </button>
    </div>
  );
};

export default ControlActions;
