import SubtopicItem from "./SubtopicItem";

export default function SubtopicList({
  subtopics,
  subtopicCompletions,
  onToggleCompletion,
  topicTag,
  topicId,
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
        (() => {
          const progressKey = `${topicId}:${subtopic.id}`;
          return (
        <SubtopicItem
          key={progressKey}
          subtopic={subtopic}
          isCompleted={subtopicCompletions[progressKey]}
          onToggleCompletion={onToggleCompletion}
          progressKey={progressKey}
          topicTag={topicTag}
        />
          );
        })()
      ))}
    </div>
  );
}
