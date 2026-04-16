import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";


// SAVE INTERVIEW RESULT
export const saveHrInterview = async (userId, result) => {

  try {

    const answers = result.answers || [];
    const summary = result.summary || {};

    if (answers.length === 0) {
      console.error("No answers to save");
      return;
    }

    await addDoc(collection(db, "interview_results"), {

      userId: userId,

      interviewType: "HR",

      finalScore: summary.final_score || 0,

      voiceConfidence: summary.voice_confidence || 0,

      contentScore: summary.content_score || 0,

      overallSummary: summary.overall_summary || "",

      keyStrengths: summary.key_strengths || [],

      areasForImprovement: summary.areas_for_improvement || [],

      aiRecommendation: summary.ai_recommendation || "",

      answers: answers,

      createdAt: serverTimestamp()

    });

    console.log("Interview result saved successfully");
    window.dispatchEvent(new Event("progress-updated"));

  } catch (error) {

    console.error("Error saving interview result:", error);

  }

};



// GET LATEST HR INTERVIEW RESULT
export const getLatestHrInterview = async (userId) => {

  try {

    const q = query(
      collection(db, "interview_results"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data();

  } catch (error) {

    console.error("Error fetching interview result:", error);

    return null;
  }

};