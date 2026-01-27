import { CheckCircle2, TrendingUp } from "lucide-react";

export default function InterviewFeedback({ feedback }) {
  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">AI Feedback</h3>
        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold">
          {feedback.confidence} / 100
        </span>
      </div>

      {/* Confidence Summary */}
      <div className="p-5 bg-blue-50 rounded-xl border">
        <div className="flex gap-3">
          <CheckCircle2 className="text-blue-600" />
          <p>
            Confidence evaluated using AI-based semantic analysis of your answer.
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-5 bg-purple-50 rounded-xl border">
        <div className="flex gap-3 mb-3">
          <TrendingUp className="text-purple-600" />
          <h4 className="font-semibold">Suggestions</h4>
        </div>

        <ul className="list-disc ml-6 space-y-2">
          {feedback.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
