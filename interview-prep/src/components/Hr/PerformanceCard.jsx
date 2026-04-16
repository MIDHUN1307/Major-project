import { Award } from "lucide-react";

function PerformanceCard({ score }) {

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">

      <div className="flex items-center gap-2 mb-4">
        <Award className="text-blue-600" />
        <h2 className="text-xl">Overall Performance</h2>
      </div>

      <div className="flex flex-col items-center">

        <svg className="w-40 h-40 transform -rotate-90">

          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        <div className="text-center mt-4">
          <p className="text-4xl">{score}</p>
          <p className="text-gray-500">out of 100</p>
        </div>

      </div>

    </div>
  );
}

export default PerformanceCard;