import { ExternalLink } from "lucide-react";

export default function SubtopicItem({
  subtopic,
  isCompleted,
  onToggleCompletion,
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        isCompleted ? "bg-green-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{subtopic.name}</h3>
          <p className="text-sm text-gray-600">
            {subtopic.problemCount} problems
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {/* ✅ PRACTICE BUTTON – FINAL FIX */}
          <button
            onClick={() => window.open(subtopic.practiceUrl, "_blank")}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
          >
            Practice <ExternalLink size={14} />
          </button>

          <button
            onClick={() => onToggleCompletion(subtopic.id)}
            className="text-sm px-4 py-2 rounded border"
          >
            {isCompleted ? "Done" : "Mark Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
