import { Activity, UserRound } from "lucide-react";
import type { DisplayPatient } from "../../../types/token";

interface CurrentTokenCardProps {
  patient: DisplayPatient | null;
}

const CurrentTokenCard = ({ patient }: CurrentTokenCardProps) => {
  return (
    <section className="relative col-span-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-[3vw] text-white shadow-xl">
      {/* Background decorations */}
      <div className="absolute -right-[8%] -top-[15%] h-[35vh] w-[35vh] rounded-full bg-white/10" />

      <div className="absolute bottom-[-18%] left-[-5%] h-[25vh] w-[25vh] rounded-full border-[2vw] border-white/5" />

      <div className="absolute right-[8%] top-[18%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />

      <div className="absolute right-[14%] top-[25%] h-1.5 w-1.5 rounded-full bg-white/60" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

              <p className="text-[clamp(14px,1vw,18px)] font-bold uppercase tracking-[0.22em] text-blue-100">
                Now Serving
              </p>
            </div>

            <p className="mt-2 text-[clamp(12px,0.8vw,15px)] font-medium text-blue-200">
              Please proceed to the laboratory
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <Activity className="h-5 w-5 text-cyan-200" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-1 flex-col items-center justify-center">
          {/* Small label */}
          <p className="mb-[1vh] text-[clamp(12px,0.8vw,15px)] font-bold uppercase tracking-[0.3em] text-blue-200">
            Token Number
          </p>

          {/* Token */}
          <span className="text-[clamp(76px,10.5vw,185px)] font-black leading-[0.85] tracking-[-0.07em] drop-shadow-2xl">
            {patient?.token ?? "---"}
          </span>

          {/* Accent */}
          <div className="mt-[2.5vh] flex items-center gap-3">
            <div className="h-1 w-16 rounded-full bg-cyan-300" />
            <div className="h-1 w-3 rounded-full bg-white/50" />
            <div className="h-1 w-2 rounded-full bg-white/30" />
          </div>

          {/* Patient Info */}
          {patient ? (
            <div className="mt-[2.5vh] flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <UserRound className="h-5 w-5 text-blue-100" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-200">
                  Patient Age
                </p>

                <p className="text-[clamp(18px,1.4vw,26px)] font-extrabold leading-tight">
                  {patient.age} years
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-[2.5vh] text-[clamp(20px,1.6vw,30px)] font-bold text-blue-100">
              Please wait
            </p>
          )}
        </div>

        {/* Bottom Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Queue Active
            </span>
          </div>

          {patient && (
            <span className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold tracking-wide text-slate-950 shadow-lg">
              SERVING
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default CurrentTokenCard;