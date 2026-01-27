import { RotateCcw, ArrowLeft, Play } from 'lucide-react';

export default function ResultActions({
  onRetry,
  onBack,
  onContinue
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {/* Back to Topics */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Topics
      </button>

      {/* Retry Test */}
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
      >
        <RotateCcw className="h-5 w-5" />
        Retry Test
      </button>

      {/* Continue Practice */}
      <button
        type="button"
        onClick={onContinue}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition"
      >
        <Play className="h-5 w-5" />
        Continue Practice
      </button>
    </div>
  );
}
