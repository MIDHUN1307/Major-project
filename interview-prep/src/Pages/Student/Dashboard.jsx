import AIRecommendations from "../../Components/AIRecommendations";
import Header from "../../Components/Header";
import PerformanceAnalytics from "../../Components/PerformanceAnalytics";
import PreparationModules from "../../Components/PreparationModules";
import ProgressCards from "../../Components/ProgressCards";
import RecentActivity from "../../Components/RecentActivity";
import WelcomeSection from "../../Components/WelcomeSection";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <WelcomeSection />
        <ProgressCards />
        <PreparationModules />
        <AIRecommendations />
        <PerformanceAnalytics />
        <RecentActivity />
      </main>
    </div>
  );
}
