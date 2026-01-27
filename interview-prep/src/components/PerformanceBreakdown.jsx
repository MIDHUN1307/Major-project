import { CheckCircle2, XCircle, MinusCircle, HelpCircle } from 'lucide-react';

export default function PerformanceBreakdown({ result }) {
  const stats = [
    { label: 'Total Questions', value: result.totalQuestions, icon: HelpCircle },
    { label: 'Correct Answers', value: result.correctAnswers, icon: CheckCircle2 },
    { label: 'Wrong Answers', value: result.wrongAnswers, icon: XCircle },
    { label: 'Skipped', value: result.skippedQuestions, icon: MinusCircle },
  ];

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Performance Breakdown
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center p-4 rounded-lg bg-slate-50"
          >
            <Icon className="h-6 w-6 mb-2 text-slate-600" />
            <div className="text-2xl font-semibold text-slate-800">
              {value}
            </div>
            <div className="text-sm text-slate-500 text-center">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
