import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import TopicGrid from "../../components/TopicGrid";
import { ArrowLeft } from "lucide-react";

export default function TopicList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Aptitude Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a topic to start your assessment and enhance your skills with AI-powered adaptive learning
          </p>
        </div>

        <TopicGrid />
      </main>
    </div>
  );
}
