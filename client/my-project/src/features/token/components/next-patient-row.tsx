
import type { DisplayPatient } from "../../../types/token";

interface NextPatientRowProps {
  patient: DisplayPatient;
  index: number;
}

const NextPatientRow = ({
  patient,
  index,
}: NextPatientRowProps) => {
  const accentStyles = [
    {
      border: "border-blue-100",
      background:
        "bg-gradient-to-r from-blue-50/90 via-white to-white",
      accent: "bg-blue-500",
      number: "text-blue-400",
      name: "text-blue-700",
      ageBg: "bg-blue-100/80",
      ageLabel: "text-blue-400",
      ageValue: "text-blue-700",
    },
    {
      border: "border-indigo-100",
      background:
        "bg-gradient-to-r from-indigo-50/70 via-white to-white",
      accent: "bg-indigo-500",
      number: "text-indigo-400",
      name: "text-indigo-700",
      ageBg: "bg-indigo-100/80",
      ageLabel: "text-indigo-400",
      ageValue: "text-indigo-700",
    },
    {
      border: "border-violet-100",
      background:
        "bg-gradient-to-r from-violet-50/60 via-white to-white",
      accent: "bg-violet-500",
      number: "text-violet-400",
      name: "text-violet-700",
      ageBg: "bg-violet-100/80",
      ageLabel: "text-violet-400",
      ageValue: "text-violet-700",
    },
  ];

  const defaultStyle = {
    border: "border-slate-100",
    background: "bg-white",
    accent: "bg-slate-200",
    number: "text-slate-300",
    name: "text-slate-800",
    ageBg: "bg-slate-100",
    ageLabel: "text-slate-400",
    ageValue: "text-slate-700",
  };

  const style = accentStyles[index] ?? defaultStyle;

  // Capitalize each word
  const formattedName = patient.patientName
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const nameLength = formattedName.length;

  return (
    <div className="group relative flex flex-1 items-center px-[0.9vw]">
      <div
        className={`
          relative flex w-full flex-1 items-center
          overflow-hidden
          rounded-[1.4rem]
          border
          px-[1.4vw]
          py-[1.25vh]
          shadow-[0_6px_20px_rgba(30,41,59,0.05)]
          transition-all duration-200
          group-hover:shadow-[0_8px_24px_rgba(30,41,59,0.08)]
          ${style.border}
          ${style.background}
        `}
      >
        {/* Left Accent */}
        <div
          className={`
            absolute left-0 top-0 h-full w-1
            ${style.accent}
          `}
        />

        {/* Queue Position */}
        <div className="flex w-[clamp(38px,3vw,52px)] shrink-0 items-center">
          <span
            className={`
              text-[clamp(11px,0.7vw,14px)]
              font-bold
              tabular-nums
              ${style.number}
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Patient Name */}
        <div className="min-w-0 flex-1">
          <p
            className={`
              whitespace-nowrap
              overflow-hidden
              text-ellipsis
              font-black
              leading-none
              tracking-[-0.025em]
              ${style.name}
              ${
                nameLength >= 24
                  ? "text-[clamp(20px,1.45vw,30px)]"
                  : nameLength >= 18
                    ? "text-[clamp(23px,1.7vw,34px)]"
                    : nameLength >= 10
                      ? "text-[clamp(26px,1.9vw,38px)]"
                      : "text-[clamp(28px,2vw,40px)]"
              }
            `}
            title={formattedName}
          >
            {formattedName}
          </p>

          <p className="mt-1.5 text-[clamp(9px,0.55vw,11px)] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Patient Name
          </p>
        </div>

        {/* Age */}
        <div className="ml-[1vw] shrink-0">
          <div
            className={`
              min-w-[clamp(60px,5vw,82px)]
              rounded-xl
              px-[0.8vw]
              py-[0.7vh]
              text-center
              ${style.ageBg}
            `}
          >
            <p
              className={`
                text-[clamp(9px,0.55vw,11px)]
                font-bold
                uppercase
                tracking-[0.14em]
                ${style.ageLabel}
              `}
            >
              Age
            </p>

            <p
              className={`
                mt-0.5
                text-[clamp(15px,1vw,20px)]
                font-extrabold
                leading-none
                tabular-nums
                ${style.ageValue}
              `}
            >
              {patient.age}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPatientRow;
