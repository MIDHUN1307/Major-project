import { Sparkles } from "lucide-react";

export default function WelcomeSection() {
  const data = {
    name: "Student",
    message:
      "You're making excellent progress! Your consistency this week has improved your coding skills by 12%. Keep pushing forward!",
    level: "Intermediate",
    progressToNext: 78,
  };

  return (
    <div className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {data.name} 
        </h1>
        <div className="flex gap-2 text-slate-600">
          <Sparkles className="text-blue-600 mt-1" />
          <p>{data.message}</p>
        </div>
      </div>

      <div className="bg-blue-50 border rounded-xl p-4 min-w-[220px]">
        <p className="text-sm text-slate-600">Current Level</p>
        <p className="text-lg font-bold mt-1 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full" />
          {data.level}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {data.progressToNext}% to Advanced
        </p>
      </div>
    </div>
  );
}
