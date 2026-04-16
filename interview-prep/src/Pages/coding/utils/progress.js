const ACTIVE_UID_KEY = "active_uid";
const baseKeyForUser = (base) => {
  const uid = localStorage.getItem(ACTIVE_UID_KEY) || "anonymous";
  return `${base}:${uid}`;
};

const STORAGE_KEY = () => baseKeyForUser("coding_subtopic_progress");

export function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY())) || {};
}

export function toggleProgress(subtopicId) {
  const current = getProgress();
  const updated = {
    ...current,
    [subtopicId]: !current[subtopicId]
  };
  localStorage.setItem(STORAGE_KEY(), JSON.stringify(updated));
  window.dispatchEvent(new Event("progress-updated"));
  return updated;
}
