import codingTopics from "../Pages/coding/data/codingTopics";
import { getBanditDebugSnapshot } from "./banditModel";
import { getProgress as getCodingProgressMap } from "../Pages/coding/utils/progress";

const clampPercent = (n) => Math.max(0, Math.min(100, Math.round(n)));

export function computeAptitudeProgress({ targetQuestions = 50 } = {}) {
  const snapshot = getBanditDebugSnapshot();
  const attempted = snapshot?.totalAttempts || 0;
  if (attempted <= 0) return 0;
  return clampPercent((attempted / targetQuestions) * 100);
}

export function computeCodingProgress() {
  const progressMap = getCodingProgressMap();

  const allProgressKeys = [];
  codingTopics.forEach((t) => {
    const allSubtopics = [
      ...(t.subtopics?.primary || []),
      ...(t.subtopics?.advanced || []),
    ];
    allSubtopics.forEach((st) => {
      allProgressKeys.push(`${t.id}:${st.id}`);
    });
  });

  const total = allProgressKeys.length;
  if (total === 0) return 0;

  const completed = allProgressKeys.filter((k) => Boolean(progressMap[k])).length;
  return clampPercent((completed / total) * 100);
}

export function computeOverallReadiness({ aptitudeProgress, codingProgress, hrProgress }) {
  const values = [aptitudeProgress, codingProgress, hrProgress].filter((v) => typeof v === "number");
  if (values.length === 0) return 0;
  return clampPercent(values.reduce((a, b) => a + b, 0) / values.length);
}

