import { UsersRound } from "lucide-react";
import type { DisplayPatient } from "../../../types/token";
import NextPatientRow from "./next-patient-row";

interface NextPatientsCardProps {
  queue: DisplayPatient[];
}

const NextPatientsCard = ({ queue }: NextPatientsCardProps) => {
  const patients = queue.slice(0, 6);

  return (
    <section className="col-span-5 flex min-h-0 flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      {/* Header */}

      <div className="flex items-end justify-between px-[2.4vw] pb-[1.8vh] pt-[2.5vh]">
        <div>
          <p className="text-[clamp(10px,0.65vw,13px)] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Waiting Queue
          </p>

          <h2 className="mt-1 text-[clamp(25px,1.9vw,36px)] font-extrabold leading-tight tracking-tight text-slate-900">
            Next Patients
          </h2>
        </div>

        <div className="flex items-center gap-2 pb-1">
          <UsersRound className="h-4 w-4 text-slate-400" />

          <span className="text-[clamp(14px,0.9vw,17px)] font-bold tabular-nums text-slate-600">
            {queue.length}
          </span>

          <span className="text-[clamp(11px,0.65vw,13px)] font-medium text-slate-400">
            waiting
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[2.4vw] h-px bg-slate-100" />

      {/* Queue */}
      <div className="min-h-0 flex-1 px-[1.2vw] py-[1.2vh]">
        {patients.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </div>

            <p className="text-[clamp(17px,1.2vw,22px)] font-bold text-slate-400">
              No patients waiting
            </p>

            <p className="mt-1 text-xs font-medium text-slate-300">
              The queue is currently empty
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[0.8vh]">
            {patients.map((patient, index) => (
              <NextPatientRow
                key={patient.id}
                patient={patient}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="h-1.5 shrink-0 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500" />
    </section>
  );
};

export default NextPatientsCard;
