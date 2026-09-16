import { Clock3 } from "lucide-react";

import { useTokenStore } from "../store/token-store";

const QueueList = () => {
  const queue = useTokenStore((state) => state.queue);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Waiting Queue
          </p>

          <h2 className="mt-1 text-lg font-black text-slate-900">Patients</h2>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          {queue.length}
        </span>
      </div>

      <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {queue.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 text-center">
            <Clock3 className="h-5 w-5 text-slate-300" />

            <p className="mt-2 text-sm font-semibold text-slate-400">
              No patients waiting
            </p>
          </div>
        ) : (
          queue.map((patient, index) => (
            <div
              key={patient._id}
              className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/40"
            >
              {/* Patient */}
              <div className="flex min-w-0 items-center gap-3">
                {/* Queue Position */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 text-sm font-black text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Patient Info */}
                <div className="min-w-0">
                  <p
                    className="max-w-[220px] truncate text-sm font-extrabold leading-5 text-slate-900"
                    title={patient.patientName}
                  >
                    {patient.patientName
                      .trim()
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                    <span className="text-[11px] font-semibold text-slate-400">
                      Waiting
                    </span>
                  </div>
                </div>
              </div>

              {/* Age */}
              <span className="ml-3 shrink-0 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-500">
                {patient.age} yrs
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default QueueList;
