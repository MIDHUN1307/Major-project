import { ArrowRight } from "lucide-react";

export default function SubjectCard({ subject }) {
  const Icon = subject.icon;

  const statusConfig = {
    Weak: "bg-red-100 text-red-700 border-red-200",
    Average: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Strong: "bg-green-100 text-green-700 border-green-200",
  };

  const progressColor =
    subject.status === "Strong"
      ? "bg-green-500"
      : subject.status === "Average"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 group">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[subject.status]}`}
          >
            {subject.status}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{subject.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span className="font-semibold">
              {subject.questionsCompleted}/{subject.totalQuestions}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-full ${progressColor} rounded-full`}
              style={{ width: `${subject.progress}%` }}
            />
          </div>

          <div className="text-right text-sm font-semibold">
            {subject.progress}%
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
          {subject.hasStarted ? "Continue Learning" : "Start Subject"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
