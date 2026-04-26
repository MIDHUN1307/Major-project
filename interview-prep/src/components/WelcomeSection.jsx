import { Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function WelcomeSection() {
  const { user } = useAuth();
  const name = user?.name || user?.username || "Student";

  return (
    <div className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {name}
        </h1>
        <div className="flex gap-2 text-slate-600">
          <Sparkles className="text-blue-600 mt-1" />
          <p>
            Pick a module and keep going—your progress updates automatically as you complete tests and mark practice items done.
          </p>
        </div>
      </div>

      {/* <div className="bg-blue-50 border rounded-xl p-4 min-w-[220px]">
        <p className="text-sm text-slate-600">Current Level</p>
        <p className="text-lg font-bold mt-1 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full" />
          Learner
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Complete more activities to level up
        </p>
      </div> */}
    </div>
  );
}
