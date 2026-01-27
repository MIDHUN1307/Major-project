const progressData = [
  { title: "Overall Readiness", value: 76, color: "bg-blue-500" },
  { title: "Aptitude Progress", value: 82, color: "bg-purple-500" },
  { title: "Coding Progress", value: 68, color: "bg-emerald-500" },
  { title: "HR Interview", value: 74, color: "bg-orange-500" },
];

export default function ProgressCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {progressData.map((item) => (
        <div key={item.title} className="bg-white rounded-xl border p-5">
          <div className="text-3xl font-bold mb-2">{item.value}%</div>
          <p className="text-slate-600 mb-3">{item.title}</p>
          <div className="w-full bg-slate-100 h-2 rounded-full">
            <div
              className={`${item.color} h-2 rounded-full`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
