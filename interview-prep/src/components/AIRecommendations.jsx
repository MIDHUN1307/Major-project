const recommendations = [
  {
    title: "Focus on Dynamic Programming",
    desc: "Your accuracy on DP problems is 45%. Practice 5 medium-level DP problems.",
    bg: "bg-orange-50 border-orange-200",
  },
  {
    title: "Recommended Practice Set",
    desc: 'AI suggests "Array Manipulation - Advanced" based on your learning curve.',
    bg: "bg-blue-50 border-blue-200",
  },
  {
    title: "Level Up Challenge",
    desc: "You're ready for Hard problems in Graph Theory.",
    bg: "bg-emerald-50 border-emerald-200",
  },
];

export default function AIRecommendations() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        AI Adaptive Recommendations
      </h2>

      <div className="bg-blue-50 border rounded-xl p-6">
        <p className="text-slate-600 mb-4">
          Personalized learning path powered by AI analysis
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((r) => (
            <div
              key={r.title}
              className={`${r.bg} border rounded-xl p-4`}
            >
              <h4 className="font-semibold mb-2">{r.title}</h4>
              <p className="text-sm text-slate-600 mb-3">{r.desc}</p>
              <button className="text-blue-600 font-semibold">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
