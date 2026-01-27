import { X } from "lucide-react";

export default function ModalHeader({ topic, onClose }) {
  return (
    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{topic.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {topic.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {topic.description}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
