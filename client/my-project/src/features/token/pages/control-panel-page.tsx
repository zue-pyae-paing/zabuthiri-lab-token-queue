import {  useEffect } from "react";

import { ArrowLeft, FlaskConical } from "lucide-react";

import { Link } from "react-router-dom";


import QueueList from "../components/queue-list";

import { useTokenStore } from "../store/token-store";
import NowServingCard from "../components/now-serving-card";

const ControlPanelPage = () => {
  const currentPatient = useTokenStore((state) => state.currentPatient);

  const initialize = useTokenStore((state) => state.initialize);

  const connectSocket = useTokenStore((state) => state.connectSocket);

  const disconnectSocket = useTokenStore((state) => state.disconnectSocket);

  const error = useTokenStore((state) => state.error);

  useEffect(() => {
    initialize();
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [initialize, connectSocket, disconnectSocket]);

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      <section className="mx-auto max-w-7xl px-5 py-5 lg:px-6 lg:py-6">
        {/* Page Header */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">
              <FlaskConical className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-600">
                Zabuthiri Hospital · Laboratory
              </p>

              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Token Control
              </h1>
            </div>
          </div>

          <Link
            to="/register"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Register
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Now Serving */}
          <NowServingCard currentPatient={currentPatient} />
          {/* Queue */}
          <QueueList />
        </div>
      </section>
    </main>
  );
};

export default ControlPanelPage;
