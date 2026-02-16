import { Target, Lightbulb, TrendingUp } from "lucide-react";

export default function NextSteps({ feedback }) {
  if (!feedback) return null;

  const growthAreas = feedback.growth_areas || [];
  const strength = feedback.strength || "";

  if (growthAreas.length === 0 && !strength) return null;

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
      
      <h3 className="font-bold mb-4 flex gap-2 items-center">
        <Lightbulb className="text-yellow-500" />
        AI Suggestions
      </h3>

      {/* Strength */}
      {strength && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex gap-2 items-start">
            <TrendingUp className="text-green-600 mt-1" size={18} />
            <div>
              <p className="font-semibold text-green-700 mb-1">
                What You Did Well
              </p>
              <p className="text-gray-700 text-sm">
                {strength}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Growth Areas */}
      {growthAreas.length > 0 && (
        <ul className="space-y-3">
          {growthAreas.map((text, i) => (
            <li key={i} className="flex gap-2 items-start">
              <Target className="text-blue-600 mt-1" size={18} />
              <span className="text-gray-700 text-sm">
                {text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
