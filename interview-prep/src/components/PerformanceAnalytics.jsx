const accuracy = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 82 },
  { day: "Sun", value: 80 },
];

const timeSpent = [
  { name: "Aptitude", hours: 8 },
  { name: "Coding", hours: 12 },
  { name: "Core", hours: 6 },
  { name: "HR Prep", hours: 4 },
];

export default function PerformanceAnalytics() {
  return (
    <section>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          View Detailed Analytics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accuracy Chart Placeholder */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4">
            Accuracy Trends (7 Days)
          </h3>

          <div
            style={{ width: "100%", height: 220 }}
            className="flex items-center justify-center bg-slate-50 rounded-lg border"
          >
            <p className="text-slate-500 text-sm">
              Accuracy trend chart will appear here
            </p>
          </div>
        </div>

        {/* Time Spent Chart Placeholder */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4">
            Time Spent This Week (30 hrs)
          </h3>

          <div
            style={{ width: "100%", height: 220 }}
            className="flex items-center justify-center bg-slate-50 rounded-lg border"
          >
            <p className="text-slate-500 text-sm">
              Time spent chart will appear here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
