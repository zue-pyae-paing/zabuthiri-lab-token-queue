import { useEffect, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FlaskConical,
  LockKeyhole,
  Loader2,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/register", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      await login(
        username.trim(),
        password
      );

      navigate("/register", {
        replace: true,
      });
    } catch (error: any) {
      setError(
        error?.response?.data?.message ??
          error?.message ??
          "Invalid username or password."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

        {/* -------------------------------- */}
        {/* Left Side */}
        {/* -------------------------------- */}

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 lg:flex">
          {/* Decorative shapes */}

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute right-20 top-1/3 h-32 w-32 rounded-full bg-violet-400/10 blur-2xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

            {/* Brand */}

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                <FlaskConical className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Zabuthiri Hospital
                </p>

                <p className="text-xs font-medium text-blue-100">
                  Laboratory
                </p>
              </div>
            </div>

            {/* Hero */}

            <div className="max-w-lg">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 ring-1 ring-white/10 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Laboratory Queue System
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
                Manage the laboratory queue with ease.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-blue-100 xl:text-base">
                Register patients, manage tokens, and
                control the laboratory queue from one
                simple workspace.
              </p>

              {/* Feature */}

              <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
                  <p className="text-2xl font-black text-white">
                    24/7
                  </p>

                  <p className="mt-1 text-xs font-medium text-blue-100">
                    Queue Management
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
                  <p className="text-2xl font-black text-white">
                    Live
                  </p>

                  <p className="mt-1 text-xs font-medium text-blue-100">
                    Real-time Updates
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}

            <p className="text-xs font-medium text-blue-200">
              Zabuthiri Hospital · Laboratory
            </p>
          </div>
        </section>

        {/* -------------------------------- */}
        {/* Login Side */}
        {/* -------------------------------- */}

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile Brand */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-sm">
                <FlaskConical className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Zabuthiri Hospital
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Laboratory
                </p>
              </div>
            </div>

            {/* Header */}

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <LockKeyhole className="h-6 w-6 text-blue-600" />
              </div>

              <p className="text-sm font-semibold text-blue-600">
                Laboratory Management
              </p>

              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access the laboratory token
                control system.
              </p>
            </div>

            {/* Login Card */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Error */}

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* Username */}

                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Username
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value
                        )
                      }
                      placeholder="Enter username"
                      autoComplete="username"
                      disabled={isLoading}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="Enter password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !username.trim() ||
                    !password
                  }
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-bold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom text */}

            <p className="mt-6 text-center text-xs font-medium text-slate-400">
              Authorized laboratory staff only
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;