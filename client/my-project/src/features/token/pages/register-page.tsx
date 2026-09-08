import { useEffect } from "react";

import {
  ArrowRight,
  Clock3,
  FlaskConical,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import RegisterForm from "../components/register-form";

import { useTokenStore } from "../store/token-store";

const RegisterPage = () => {
  const queue = useTokenStore(
    (state) => state.queue
  );

  const currentPatient = useTokenStore(
    (state) => state.currentPatient
  );

  const initialize = useTokenStore(
    (state) => state.initialize
  );

  const connectSocket = useTokenStore(
    (state) => state.connectSocket
  );

  const disconnectSocket = useTokenStore(
    (state) => state.disconnectSocket
  );

  useEffect(() => {
    initialize();
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [
    initialize,
    connectSocket,
    disconnectSocket,
  ]);

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      <section className="mx-auto max-w-7xl px-6 py-8 lg:py-10">

        {/* Page Header */}

        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-sm">
              <FlaskConical className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Zabuthiri Hospital · Laboratory
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                Patient Registration
              </h1>

              <p className="mt-1.5 text-sm text-slate-500">
                Register patients and generate laboratory queue tokens.
              </p>
            </div>
          </div>

          <Link
            to="/control"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Control Panel

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main Content */}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

          {/* Register Form */}

          <RegisterForm />

          {/* Stats */}

          <div className="grid gap-4 sm:grid-cols-2">

            {/* Waiting */}

            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-50 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    Queue
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500">
                    Waiting Patients
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <p className="text-4xl font-black tracking-tight text-slate-900">
                      {queue.length}
                    </p>

                    <span className="mb-1 text-sm font-medium text-slate-400">
                      patients
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Now Serving */}

            <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-violet-100/70 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    <Clock3 className="h-5 w-5 text-violet-600" />
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Serving
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500">
                    Now Serving
                  </p>

                  <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                    {currentPatient?.token ?? "---"}
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-slate-500">
                    {currentPatient
                      ? `${currentPatient.patientName} · ${currentPatient.age} yrs`
                      : "No patient"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;