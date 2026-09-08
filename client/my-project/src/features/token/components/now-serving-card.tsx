
import type { Patient } from "../../../types/token";
import ControlActions from "./control-actions";

interface NowServingCardProps {
  currentPatient: Patient | null;
}

const NowServingCard = ({
  currentPatient,
}: NowServingCardProps) => {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_16px_40px_rgba(37,99,235,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />

            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
              Now Serving
            </p>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Current patient
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
          Laboratory
        </span>
      </div>

      {/* Token */}
      <div className="relative flex min-h-[285px] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Subtle decoration */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-50" />

        <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-violet-50" />

        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
            Token Number
          </p>

          <p className="mt-3 text-[clamp(72px,8vw,118px)] font-black leading-[0.85] tracking-[-0.06em] text-slate-900">
            {currentPatient?.token ?? "---"}
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
            <span className="h-1 w-10 rounded-full bg-blue-600" />
            <span className="h-1 w-3 rounded-full bg-violet-500" />
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
          </div>

          {currentPatient ? (
            <div className="mt-5">
              <p className="text-lg font-bold text-slate-900">
                {currentPatient.patientName}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-400">
                Age {currentPatient.age} years
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-lg font-bold text-slate-400">
                No patient
              </p>

              <p className="mt-1 text-sm text-slate-300">
                Call the next patient to begin
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-5">
        <ControlActions />
      </div>

      {/* Project Accent */}
      <div className="flex h-1">
        <div className="flex-1 bg-blue-600" />
        <div className="w-1/4 bg-violet-600" />
        <div className="w-1/6 bg-cyan-500" />
      </div>
    </section>
  );
};

export default NowServingCard;

