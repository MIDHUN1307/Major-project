import { useState } from "react";
import codingTopics from "./data/codingTopics";
import SubtopicModal from "../../components/SubtopicModal";

export default function CodingTopics() {
  const [activeTopic, setActiveTopic] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Coding Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {codingTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl border p-6"
          >
            <h3 className="text-xl font-semibold mb-2">
              {topic.icon} {topic.name}
            </h3>

            <p className="text-gray-600 mb-4">
              {topic.description}
            </p>

            {/* ✅ FIX HERE */}
            {(() => {
              const allSubtopics = [
                ...(topic.subtopics.primary || []),
                ...(topic.subtopics.advanced || []),
              ];

              return (
                <p className="text-sm text-gray-500 mb-4">
                  {allSubtopics.length} Subtopics
                </p>
              );
            })()}

            <button
              onClick={() => setActiveTopic(topic)}
              className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold"
            >
              View Topics →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeTopic && (
        <SubtopicModal
          topic={activeTopic}
          onClose={() => setActiveTopic(null)}
        />
      )}
    </div>
  );
}
