import Header from "../../Components/Header";
import PerformanceBreakdown from "../../components/PerformanceBreakdown";
import ResultActions from "../../components/ResultActions";
import ResultSummary from "../../components/ResultSummary";
import { useLocation, useNavigate } from 'react-router-dom';
export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  // Route guard
  if (!result) {
    navigate('/aptitude');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-8">
        <ResultSummary result={result} />
        <PerformanceBreakdown result={result} />
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
