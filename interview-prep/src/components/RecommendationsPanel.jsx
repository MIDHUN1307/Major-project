import { Sparkles } from "lucide-react";
import RecommendationItem from "./RecommendationItem";

export default function RecommendationsPanel({ recommendations }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Recommended for You</h2>
        </div>
        <p className="text-sm text-blue-100">
          AI-Based Personalized Suggestions
        </p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto">
        {recommendations.map((rec) => (
          <RecommendationItem key={rec.id} rec={rec} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <button className="w-full text-sm font-medium text-blue-600 hover:bg-blue-50 py-2 rounded-lg">
          View All Recommendations
        </button>
      </div>
    </div>
  );
}
