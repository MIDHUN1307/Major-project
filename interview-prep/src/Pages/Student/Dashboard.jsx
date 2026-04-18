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
  const [coreProgress, setCoreProgress] = useState(0);
  const [aptitudeProgress, setAptitudeProgress] = useState(0);
  const [codingProgress, setCodingProgress] = useState(0);
  const [overallReadiness, setOverallReadiness] = useState(0);

  useEffect(() => {

    const fetchProgressFromFirestore = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Fetch HR Progress
      const hrQuery = query(
        collection(db, "interview_results"),
        where("userId", "==", user.uid)
      );
      const hrSnapshot = await getDocs(hrQuery);

      if (!hrSnapshot.empty) {
        let totalScore = 0;
        let count = 0;
        hrSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.finalScore !== undefined) {
            totalScore += data.finalScore;
            count++;
          }
        });
        setHrProgress(Math.round(totalScore / count));
      }

      // Fetch Core Progress
      const coreQuery = query(
        collection(db, "core_results"),
        where("userId", "==", user.uid)
      );
      const coreSnapshot = await getDocs(coreQuery);

      if (!coreSnapshot.empty) {
        let totalScore = 0;
        let count = 0;
        coreSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.finalScore !== undefined) {
            totalScore += data.finalScore;
            count++;
          }
        });
        setCoreProgress(Math.round(totalScore / count));
      }
    };

    fetchProgressFromFirestore();

  }, []);

  const refreshLocalProgress = () => {
    const apt = computeAptitudeProgress();
    const cod = computeCodingProgress();
    const overall = computeOverallReadiness({
      aptitudeProgress: apt,
      codingProgress: cod,
      hrProgress,
      coreProgress
    });
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
  }, [hrProgress, coreProgress]);

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
          coreProgress={coreProgress}
        />

        {/* <AIRecommendations /> */}

      </main>
    </div>
  );
}
