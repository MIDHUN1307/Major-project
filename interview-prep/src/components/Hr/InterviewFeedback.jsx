import { CheckCircle2, TrendingUp } from "lucide-react";

export default function InterviewFeedback({ feedback }) {
  if (!feedback) return null;

  const finalConfidence = feedback?.scores?.final_confidence;
  const voiceConfidence = feedback?.scores?.voice_confidence;
  const contentScore = feedback?.scores?.content_score;

  const strengths = feedback?.feedback?.strengths;
  const improvements = feedback?.feedback?.improvements;

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">AI Feedback</h3>
        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold">
          {finalConfidence} / 100
        </span>
      </div>

      {/* Confidence Summary */}
      <div className="p-5 bg-blue-50 rounded-xl border space-y-2">
        <div className="flex gap-3">
          <CheckCircle2 className="text-blue-600" />
          <p>
            Confidence evaluated using combined voice + AI content analysis.
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="text-sm text-gray-600 mt-2 space-y-1">
          <p>Voice Confidence: {voiceConfidence} / 100</p>
          <p>Content Score: {contentScore} / 100</p>
        </div>
      </div>

      {/* Strength */}
      {strengths && (
        <div className="p-5 bg-green-50 rounded-xl border">
          <div className="flex gap-3 mb-2">
            <CheckCircle2 className="text-green-600" />
            <h4 className="font-semibold">Strengths</h4>
          </div>
          <p>{strengths}</p>
        </div>
      )}

      {/* Improvements */}
      {improvements && (
        <div className="p-5 bg-purple-50 rounded-xl border">
          <div className="flex gap-3 mb-3">
            <TrendingUp className="text-purple-600" />
            <h4 className="font-semibold">Areas to Improve</h4>
          </div>
          <p>{improvements}</p>
        </div>
      )}
    </div>
  );
}