export default function ProgressSummary({ completedCount, total }) {
  const percentage = (completedCount / total) * 100;

  return (
    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Subtopic Progress
        </span>
        <span className="text-sm font-bold text-gray-900">
          {completedCount} / {total} completed
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
