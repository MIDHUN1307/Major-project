import { Volume2 } from "lucide-react";

export default function QuestionCard({ question }) {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-l-4 border-blue-500">
      <div className="flex gap-3">
        <Volume2 className="w-6 h-6 text-blue-600 mt-1" />
        <div>
          <p className="text-sm font-semibold uppercase text-gray-700 mb-2">
            Interview Question
          </p>

          {question ? (
            <p className="text-xl font-medium text-gray-900">
              {question}
            </p>
          ) : (
            <p className="text-xl font-medium text-gray-400 animate-pulse">
              Loading question...
            </p>
          )}

        </div>
      </div>
    </div>
  );
}