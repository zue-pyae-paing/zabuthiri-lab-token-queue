import {
  Check,
  Loader2,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { useTokenStore } from "../store/token-store";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [registeredToken, setRegisteredToken] =
    useState<string | null>(null);

  const registerPatient = useTokenStore(
    (state) => state.registerPatient
  );

  const isRegistering = useTokenStore(
    (state) => state.isRegistering
  );

  const error = useTokenStore(
    (state) => state.error
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedAge = Number(age);

    if (!trimmedName) {
      return;
    }

    if (
      !age ||
      !Number.isInteger(parsedAge) ||
      parsedAge < 0 ||
      parsedAge > 120
    ) {
      return;
    }

    try {
      const patient =
        await registerPatient(
          trimmedName,
          parsedAge
        );

      setRegisteredToken(patient.token);

      setName("");
      setAge("");
    } catch {
      // Error is already handled by Zustand
    }
  };

  const isInvalid =
    !name.trim() ||
    !age ||
    !Number.isInteger(Number(age)) ||
    Number(age) < 0 ||
    Number(age) > 120;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      {/* Header */}

      <div className="mb-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
          <UserRound className="h-6 w-6 text-blue-600" />
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Register Patient
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create a laboratory token for the patient.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Patient Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter patient name"
            disabled={isRegistering}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* Age */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Age
          </label>

          <div className="relative">
            <input
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
              placeholder="Enter age"
              disabled={isRegistering}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
              years
            </span>
          </div>
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={
            isInvalid || isRegistering
          }
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-bold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRegistering ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Generate Token"
          )}
        </button>
      </form>

      {/* Success */}

      {registeredToken && (
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Token Created
              </p>

              <p className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                {registeredToken}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;