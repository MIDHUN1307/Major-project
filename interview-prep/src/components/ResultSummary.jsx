import { Clock } from 'lucide-react';

export default function ResultSummary({ result }) {
  const percentage = (result.score / result.totalQuestions) * 100;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-3">
            {result.topic}
          </div>

          <h1 className="mb-2 text-2xl font-semibold text-slate-800">
            Test Result
          </h1>

          <p className="text-slate-600 mb-6">
            Great effort! Here's how you performed.
          </p>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div>
              <div className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {result.accuracy}%
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Accuracy
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-xl font-semibold text-slate-800">
                  {result.timeTaken}
                </div>
                <div className="text-sm text-slate-500">
                  Time Taken
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg className="-rotate-90" width="180" height="180">
            <circle
              cx="90"
              cy="90"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="90"
              cy="90"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute text-center">
            <div className="text-4xl font-semibold text-slate-800">
              {result.score}/{result.totalQuestions}
            </div>
            <div className="text-sm text-slate-500">
              Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
