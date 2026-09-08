import { FlaskConical } from "lucide-react";

const LabBrand = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[clamp(48px,4vw,72px)] w-[clamp(48px,4vw,72px)] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
        <FlaskConical className="h-[clamp(25px,2vw,36px)] w-[clamp(25px,2vw,36px)]" />
      </div>

      <div>
        <h1 className="text-[clamp(30px,2.7vw,46px)] font-extrabold tracking-tight">
          ZABUTHIRI HOSPITAL
        </h1>

        <p className="mt-1 text-[clamp(14px,1.1vw,19px)] font-semibold tracking-wide text-blue-600">
          Laboratory Department
        </p>
      </div>
    </div>
  );
};

export default LabBrand;
