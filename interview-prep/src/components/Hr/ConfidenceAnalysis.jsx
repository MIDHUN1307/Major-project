import { TrendingUp, TrendingDown } from "lucide-react";

function ConfidenceAnalysis({ score, trend }) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">

      <h2 className="text-xl mb-4">Confidence Analysis</h2>

      <div className="flex justify-between mb-2">
        <span>Average Confidence</span>
        <span className="flex items-center gap-1">
          {trend > 0 ? <TrendingUp className="text-green-600" /> : <TrendingDown className="text-red-600" />}
          {trend}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Confidence score: {score}%
      </p>

    </div>
  );
}

export default ConfidenceAnalysis;
