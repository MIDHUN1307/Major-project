import { useState, useEffect } from "react";

import { toggleProgress, getProgress } from "../Pages/coding/utils/progress";
import ModalHeader from "./ModalHeader";
import ProgressSummary from "./ProgressSummary";
import SubtopicList from "./SubtopicList";

export default function SubtopicModal({ topic, onClose }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleToggle = (id) => {
    const updated = toggleProgress(id);
    setProgress(updated);
  };

  // ✅ FIX: combine primary + advanced subtopics
  const allSubtopics = [
    ...(topic.subtopics.primary || []),
    ...(topic.subtopics.advanced || []),
  ];

  // ✅ FIX: calculate progress from array
  const completedCount = allSubtopics.filter(
    (st) => progress[st.id]
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full">
        <ModalHeader topic={topic} onClose={onClose} />

        <div className="p-6">
          <ProgressSummary
            completedCount={completedCount}
            total={allSubtopics.length}
          />

          <SubtopicList
            subtopics={allSubtopics}
            subtopicCompletions={progress}
            onToggleCompletion={handleToggle}
            topicTag={topic.tag}
            topicId={topic.id}
          />
        </div>
      </div>
    </div>
  );
}
