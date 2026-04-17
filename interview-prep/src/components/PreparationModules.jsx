import { useNavigate } from "react-router-dom";

export default function PreparationModules({ aptitudeProgress, codingProgress, hrProgress }) {

  const modules = [
    {
      title: "Aptitude",
      desc: "Master logical reasoning, quantitative aptitude, and verbal ability",
      progress: aptitudeProgress,
      color: "bg-purple-600",
    },
    {
      title: "Core Subjects",
      desc: "Deep dive into OS, DBMS, Networks, and System Design",
      progress: 0,
      color: "bg-blue-600",
    },
    {
      title: "Coding",
      desc: "Solve DSA problems, algorithms, and competitive programming",
      progress: codingProgress,
      color: "bg-emerald-600",
    },
    {
      title: "Hr Interview",
      desc: "Practice behavioral questions, communication, and mock interviews",
      progress: hrProgress,
      color: "bg-orange-600",
    },
  ];

  const navigate = useNavigate();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Interview Preparation Modules</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div key={m.title} className="bg-white rounded-xl border p-6">

            <div className="flex justify-between mb-3">
              <h3 className="text-xl font-bold">{m.title}</h3>
              <span className="text-sm">{m.progress}% Complete</span>
            </div>

            <p className="text-slate-600 mb-4">{m.desc}</p>

            <div className="w-full bg-slate-100 h-2 rounded-full mb-4">
              <div
                className={`${m.color} h-2 rounded-full`}
                style={{ width: `${m.progress}%` }}
              />
            </div>

            <button
              onClick={() => {
                const routes = {
                  aptitude: "/aptitude",
                  coding: "/coding",
                  interview: "/hr",
                  "hr interview": "/hr",
                  "core subjects": "/core"
                };

                const key = m.title?.trim().toLowerCase();

                if (routes[key]) {
                  navigate(routes[key]);
                }
              }}
              className={`${m.color} text-white w-full py-3 rounded-lg font-semibold`}
            >
              Continue →
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}
//new comment newww