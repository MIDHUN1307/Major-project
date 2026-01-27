const STORAGE_KEY = "coding_subtopic_progress";

export function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function toggleProgress(subtopicId) {
  const current = getProgress();
  const updated = {
    ...current,
    [subtopicId]: !current[subtopicId]
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
