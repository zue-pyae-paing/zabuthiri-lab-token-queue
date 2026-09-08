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
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-black text-slate-400">
                  {index + 1}
                </span>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    {patient.token}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    {patient.patientName}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">
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
