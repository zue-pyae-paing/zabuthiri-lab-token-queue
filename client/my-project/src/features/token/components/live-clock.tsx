import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

const LiveClock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4">
      {/* Time */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Clock3 className="h-5 w-5" />
        </div>

        <div>
          <p className="text-[clamp(20px,1.7vw,30px)] font-extrabold leading-none tracking-tight tabular-nums text-slate-900">
            {time}
          </p>

          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Current Time
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-slate-200" />

      {/* Date */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <CalendarDays className="h-5 w-5" />
        </div>

        <div>
          <p className="text-[clamp(13px,0.95vw,17px)] font-bold leading-tight text-slate-700">
            {date}
          </p>

          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Today
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveClock;