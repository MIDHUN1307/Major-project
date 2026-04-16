import { useEffect, useState } from "react";

import SummaryHeader from "../../components/Hr/SummaryHeader";
import PerformanceCard from "../../components/Hr/PerformanceCard";
import ConfidenceAnalysis from "../../components/Hr/ConfidenceAnalysis";
import AnswerBreakdown from "../../components/Hr/AnswerBreakdown";
import FeedbackTable from "../../components/Hr/FeedbackTable";
import Recommendations from "../../components/Hr/Recommendations";
import ActionButtons from "../../components/Hr/ActionButtons";

import { auth } from "../../firebase/firebaseConfig";
import { getLatestHrInterview } from "../../firebase/HrService";


export default function HrSummary() {

  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const data = await getLatestHrInterview(user.uid);

      setInterviewData(data);

    };

    fetchData();

  }, []);

  if (!interviewData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Interview Report...
      </div>
    );
  }

 const candidateData = {
  name:
    auth.currentUser?.displayName ||
    auth.currentUser?.email?.split("@")[0] ||
    "Candidate",

  date: interviewData.createdAt
    ? new Date(interviewData.createdAt.seconds * 1000).toLocaleDateString()
    : "Today",

  type: interviewData.interviewType || "HR Behavioral Interview"
};

  const overallScore = interviewData.finalScore;

  const confidenceData = {
    score: interviewData.voiceConfidence,
    trend: 0
  };

  const answerMetrics = [
    {
      type: "communication",
      title: "Communication Clarity",
      score: interviewData.voiceConfidence,
      message: "Confidence based on voice tone, pauses, and fluency."
    },
    {
      type: "relevance",
      title: "Relevance of Answers",
      score: interviewData.contentScore,
      message: "AI analysis of how well your answer matched the question."
    },
    {
      type: "tone",
      title: "Professional Tone",
      score: interviewData.voiceConfidence,
      message: "Based on speech emotion and delivery confidence."
    },
    {
      type: "completeness",
      title: "Overall Interview Score",
      score: interviewData.finalScore,
      message: "Combined score of voice confidence and AI content evaluation."
    }
  ];

  const feedbackData = interviewData.answers
    ? interviewData.answers.map((a) => ({
        question: a.question,
        answerSummary: a.transcript || "Speech answer recorded.",
        score: a.scores.final_confidence,
        feedback: a.improvements
      }))
    : [];

  const strengths = interviewData.answers
    ? interviewData.answers.map((a) => a.strengths)
    : [];

  const improvements = interviewData.answers
    ? interviewData.answers.map((a) => a.improvements)
    : [];

  const aiRecommendations = interviewData.aiRecommendation
    ? [interviewData.aiRecommendation]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-8">

        <SummaryHeader
          candidateName={candidateData.name}
          interviewDate={candidateData.date}
          interviewType={candidateData.type}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          <PerformanceCard score={overallScore} />

          <div className="lg:col-span-2">
            <ConfidenceAnalysis
              score={confidenceData.score}
              trend={confidenceData.trend}
            />
          </div>

        </div>

        <div className="mb-6">
          <AnswerBreakdown metrics={answerMetrics} />
        </div>

        <div className="mb-6">
          <FeedbackTable feedbackData={feedbackData} />
        </div>

        <div className="mb-6">
          <Recommendations
            strengths={strengths}
            improvements={improvements}
            aiRecommendations={aiRecommendations}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <ActionButtons
            interviewData={interviewData}
            candidateData={candidateData}
          />
        </div>

      </div>

    </div>
  );
}