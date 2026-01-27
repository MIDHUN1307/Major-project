import { AlertCircle, TrendingUp, Sparkles } from "lucide-react";

const priorityConfig = {
  High: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: AlertCircle,
  },
  Medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    icon: TrendingUp,
  },
  Low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: Sparkles,
  },
};

export default function RecommendationItem({ rec }) {
  const config = priorityConfig[rec.priority];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`${config.bg} p-2 rounded-lg`}>
          <Icon className={`w-4 h-4 ${config.text}`} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{rec.topic}</h3>
          <p className="text-xs text-gray-600">{rec.subject}</p>
          <p className="text-xs text-gray-500 mt-2">{rec.reason}</p>

          <div className="flex justify-between mt-3">
            <span className={`text-xs font-medium ${config.text}`}>
              {rec.priority} Priority
            </span>
            <button className="text-xs font-medium text-blue-600 hover:underline">
              Practice Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
