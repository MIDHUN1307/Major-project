import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import AIRecommendations from "../../Components/AIRecommendations";
import Header from "../../Components/Header";
import PreparationModules from "../../Components/PreparationModules";
import ProgressCards from "../../Components/ProgressCards";
import WelcomeSection from "../../Components/WelcomeSection";
import { computeAptitudeProgress, computeCodingProgress, computeOverallReadiness } from "../../utils/progressMetrics";

export default function Dashboard() {

  const [hrProgress, setHrProgress] = useState(0);
  const [aptitudeProgress, setAptitudeProgress] = useState(0);
  const [codingProgress, setCodingProgress] = useState(0);
  const [overallReadiness, setOverallReadiness] = useState(0);

  useEffect(() => {

    const fetchHRProgress = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "interview_results"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHrProgress(0);
        return;
      }

      let totalScore = 0;
      let count = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();

        if (data.finalScore !== undefined) {
          totalScore += data.finalScore;
          count++;
        }
      });

      const averageScore = Math.round(totalScore / count);

      setHrProgress(averageScore);
    };

    fetchHRProgress();

  }, []);

  const refreshLocalProgress = () => {
    const apt = computeAptitudeProgress();
    const cod = computeCodingProgress();
    const overall = computeOverallReadiness({ aptitudeProgress: apt, codingProgress: cod, hrProgress });
    setAptitudeProgress(apt);
    setCodingProgress(cod);
    setOverallReadiness(overall);
  };

  // Keep aptitude/coding progress live (localStorage-based, user-scoped)
  useEffect(() => {
    refreshLocalProgress();
    const handler = () => refreshLocalProgress();
    window.addEventListener("progress-updated", handler);
    return () => window.removeEventListener("progress-updated", handler);
  }, [hrProgress]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <WelcomeSection />

        <ProgressCards
          overallReadiness={overallReadiness}
          aptitudeProgress={aptitudeProgress}
          codingProgress={codingProgress}
          hrProgress={hrProgress}
        />

        <PreparationModules
          aptitudeProgress={aptitudeProgress}
          codingProgress={codingProgress}
          hrProgress={hrProgress}
        />

        <AIRecommendations />

       

        
      </main>
    </div>
  );
}