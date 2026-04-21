/**
 * adaptiveFilter.js
 *
 * Handles adaptive question selection based on the user's past performance.
 *
 * Difficulty Logic:
 *   - No history / accuracy < 40%    → easy
 *   - accuracy 40% – 69%             → medium
 *   - accuracy >= 70% (7/10 correct) → hard
 *
 * Usage:
 *   import { getAdaptiveQuestions, savePerformance, getPerformanceHistory } from '../../utils/adaptiveFilter';
 */

const HISTORY_KEY_PREFIX = "aptitude_history_";
const MAX_HISTORY_ENTRIES = 10;
const QUESTIONS_PER_TEST = 10;

/**
 * Determines target difficulty based on recent performance history.
 * @param {Array} history - Array of { accuracy, date } objects
 * @returns {"easy" | "medium" | "hard"}
 */
export function getDifficultyLevel(history = []) {
  if (!history || history.length === 0) return "easy";

  // Get last result
  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  // Convert accuracy to correct answers (out of 10)
  const lastCorrect = Math.round((last.accuracy / 100) * 10);
  const prevCorrect = prev ? Math.round((prev.accuracy / 100) * 10) : 0;

  // Step-by-step progression
  if (prevCorrect >= 7 && lastCorrect >= 7) {
    return "hard";
  }

  if (lastCorrect >= 7) {
    return "medium";
  }

  return "easy";
}
/**
 * Filters and returns a randomised set of questions for a topic based on adaptive difficulty.
 * @param {Object} allQuestions - The full aptitudeQuestions object
 * @param {string} topic - Topic name (e.g. "Quantitative Aptitude")
 * @param {Array} history - Array of past performance { accuracy, date }
 * @returns {Array} - Array of question objects (max QUESTIONS_PER_TEST)
 */
export function getAdaptiveQuestions(allQuestions, topic, history = []) {
  const topicQuestions = allQuestions[topic] || [];
  const targetDifficulty = getDifficultyLevel(history);

  // Filter by difficulty
  let filtered = topicQuestions.filter(q => q.difficulty === targetDifficulty);

  // Safety fallback: if not enough questions at this difficulty, blend with adjacent level
  if (filtered.length < QUESTIONS_PER_TEST) {
    const fallbackDifficulty = targetDifficulty === "hard" ? "medium"
      : targetDifficulty === "medium" ? "easy"
      : "medium";
    const fallback = topicQuestions.filter(q => q.difficulty === fallbackDifficulty);
    filtered = [...filtered, ...fallback];
  }

  // Shuffle and pick
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, QUESTIONS_PER_TEST);
}

/**
 * Saves a test result to localStorage for a given topic.
 * @param {string} topic - Topic name
 * @param {number} accuracy - Accuracy as a percentage (0–100)
 */
export function savePerformance(topic, accuracy) {
  try {
    const key = HISTORY_KEY_PREFIX + topic;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ accuracy, date: Date.now() });
    // Keep only the last MAX_HISTORY_ENTRIES records
    const trimmed = existing.slice(-MAX_HISTORY_ENTRIES);
    localStorage.setItem(key, JSON.stringify(trimmed));
  } catch (e) {
    console.warn("Could not save performance to localStorage:", e);
  }
}

/**
 * Retrieves past performance history for a given topic.
 * @param {string} topic - Topic name
 * @returns {Array} - Array of { accuracy, date } objects
 */
export function getPerformanceHistory(topic) {
  try {
    const key = HISTORY_KEY_PREFIX + topic;
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch (e) {
    console.warn("Could not read performance from localStorage:", e);
    return [];
  }
}

/**
 * Clears the performance history for a topic (useful for reset / debug).
 * @param {string} topic - Topic name
 */
export function clearPerformanceHistory(topic) {
  try {
    const key = HISTORY_KEY_PREFIX + topic;
    localStorage.removeItem(key);
  } catch (e) {
    console.warn("Could not clear performance history:", e);
  }
}