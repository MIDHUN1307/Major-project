import Header from "../../components/Header";
import PerformanceBreakdown from "../../components/PerformanceBreakdown";
import ResultActions from "../../components/ResultActions";
import ResultSummary from "../../components/ResultSummary";
import { useLocation, useNavigate } from 'react-router-dom';
import { getBanditDebugSnapshot, getLastCuratedTrace, getStrongAndWeakAreas } from '../../utils/banditModel';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  // Route guard
  if (!result) {
    navigate('/aptitude');
    return null;
  }

  const { weak, strong } = getStrongAndWeakAreas();
  const debugSnapshot = getBanditDebugSnapshot();
  const lastTrace = getLastCuratedTrace();

  const handleDownloadProof = () => {
    const topicCounts =
      lastTrace?.picks?.reduce((acc, p) => {
        acc[p.topic] = (acc[p.topic] || 0) + 1;
        return acc;
      }, {}) ?? null;

    const payload = {
      exportedAt: new Date().toISOString(),
      result,
      bandit: debugSnapshot,
      lastCuratedTrace: lastTrace,
      lastCuratedTopicCounts: topicCounts,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aptitude-bandit-proof-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-8">
        <ResultSummary result={result} />
        <PerformanceBreakdown result={result} />
        
        {/* Bandit Model Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">AI Performance Insights (Bandit Model)</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="text-red-800 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                        Weak Areas (Need Practice)
                    </h3>
                    {weak.length > 0 ? (
                        <ul className="space-y-2">
                            {weak.map(w => (
                                <li key={w.topic} className="flex justify-between items-center text-red-700 bg-white px-3 py-2 rounded shadow-sm">
                                    <span>{w.topic}</span>
                                    <span className="font-mono text-sm">{w.accuracy}% acc</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-600 text-sm">Attempt more tests to identify weak areas.</p>
                    )}
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="text-green-800 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Strong Areas
                    </h3>
                    {strong.length > 0 ? (
                        <ul className="space-y-2">
                            {strong.map(s => (
                                <li key={s.topic} className="flex justify-between items-center text-green-700 bg-white px-3 py-2 rounded shadow-sm">
                                    <span>{s.topic}</span>
                                    <span className="font-mono text-sm">{s.accuracy}% acc</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-green-600 text-sm">Keep practicing to build your strong areas!</p>
                    )}
                </div>
            </div>
        </div>

        {/* Proof export (for demo / professor) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Export AI Adaptivity Proof</h2>
              <p className="text-sm text-slate-600">
                Downloads your per-topic attempts/wrong-rate plus the last adaptive-test topic-pick trace.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadProof}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            >
              Download JSON
            </button>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Tip: run an adaptive test after practicing a topic poorly; then export again and compare topic frequencies.
          </div>
        </div>

        <ResultActions
          onRetry={() =>
            navigate('/aptitude/test', {
              state: { topicTitle: result.topic }
            })
          }
          onBack={() => navigate('/aptitude')}
          onContinue={() => navigate('/aptitude')}
        />
      </main>
    </div>
  );
}
