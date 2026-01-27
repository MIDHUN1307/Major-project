import SubtopicItem from "./SubtopicItem";

export default function SubtopicList({
  subtopics,
  subtopicCompletions,
  onToggleCompletion,
  topicTag,
}) {
  const allSubtopics = Array.isArray(subtopics)
    ? subtopics
    : [
        ...(subtopics.primary || []),
        ...(subtopics.advanced || []),
      ];

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {allSubtopics.map((subtopic) => (
        <SubtopicItem
          key={subtopic.id}
          subtopic={subtopic}
          isCompleted={subtopicCompletions[subtopic.id]}
          onToggleCompletion={onToggleCompletion}
          topicTag={topicTag}
        />
      ))}
    </div>
  );
}
