const activities = [
  { title: "Completed Aptitude Test - Logical Reasoning", meta: "18/20 · 2 hours ago" },
  { title: 'Solved "Longest Palindromic Substring"', meta: "Medium · 4 hours ago" },
  { title: "Mock Interview - Behavioral Round", meta: "8.5/10 · 1 day ago" },
  { title: "Completed DBMS Practice Set", meta: "22/25 · 1 day ago" },
  { title: 'Solved "Binary Tree Level Order Traversal"', meta: "Easy · 2 days ago" },
];

export default function RecentActivity() {
  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <button className="text-blue-600 font-semibold">View All</button>
      </div>

      <div className="bg-white border rounded-xl p-6 space-y-4">
        {activities.map((a) => (
          <div key={a.title} className="border-b pb-3 last:border-none">
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm text-slate-600">{a.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
