import { useCallback, useEffect, useState } from "react";

import { getDisplaySnapshotApi } from "../../../api/display.api";

import { useDisplaySocket } from "../hooks/use-display-socket";

import type { DisplayQueueSnapshot } from "../../../types/token";
import LiveClock from "../components/live-clock";
import LabBrand from "../components/lab-brand";
import CurrentTokenCard from "../components/current-token-card";
import NextPatientsCard from "../components/NextPatientsCard";

const TokenDisplayPage = () => {
  const [snapshot, setSnapshot] = useState<DisplayQueueSnapshot>({
    queue: [],
    currentPatient: null,
  });

  const [error, setError] = useState<string | null>(null);

  const loadDisplay = useCallback(async () => {
    try {
      setError(null);

      const data = await getDisplaySnapshotApi();
      console.log(data, "data");
      setSnapshot(data);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ?? "Unable to load token display.",
      );
    }
  }, []);

  useEffect(() => {
    loadDisplay();
  }, [loadDisplay]);

  useDisplaySocket({
    onUpdated: (data) => {
      setSnapshot(data);
      setError(null);
    },
  });

  const currentPatient = snapshot.currentPatient;

  const queue = snapshot.queue;

  return (
    <main className="h-screen w-full overflow-hidden bg-[#F6F8FC] font-sans">
      {/* Header */}

      <header className="h-[14vh] bg-white">
        <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-[4vw]">
          <LabBrand />

          <div className="text-right">
            <LiveClock />
          </div>
        </div>

        <div className="flex h-1.5">
          <div className="w-[45%] bg-blue-600" />
          <div className="w-[25%] bg-violet-600" />
          <div className="w-[15%] bg-cyan-500" />
          <div className="flex-1 bg-emerald-500" />
        </div>
      </header>

      {/* Main */}

      <section className="h-[86vh]">
        <div className="mx-auto grid h-full max-w-[1800px] grid-cols-12 gap-[2vw] px-[4vw] py-[3vh]">
          {/* Current */}

          {/* <section className="relative col-span-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-[3vw] text-white shadow-xl">
            <div className="absolute -right-[8%] -top-[15%] h-[35vh] w-[35vh] rounded-full bg-white/10" />

            <div className="relative flex h-full flex-col">
              <p className="text-[clamp(14px,1vw,18px)] font-bold uppercase tracking-[0.22em] text-blue-100">
                Now Serving
              </p>

              <div className="flex flex-1 flex-col items-center justify-center">
                <span className="text-[clamp(76px,10.5vw,185px)] font-black leading-none tracking-[-0.07em]">
                  {currentPatient?.token ?? "---"}
                </span>

                <div className="mt-[2vh] h-1 w-28 rounded-full bg-cyan-300" />

                <p className="mt-[1.5vh] text-[clamp(25px,2.1vw,40px)] font-bold">
                  {currentPatient?.displayName ?? "Please wait"}
                </p>
              </div>

              <div className="flex justify-end">
                {currentPatient && (
                  <span className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950">
                    SERVING
                  </span>
                )}
              </div>
            </div>
          </section> */}
          <CurrentTokenCard patient={currentPatient} />

          {/* Next */}

          <NextPatientsCard queue={queue} />
        </div>
      </section>

      {/* Error */}

      {error && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {error}
        </div>
      )}
    </main>
  );
};

export default TokenDisplayPage;
