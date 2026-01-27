import { useNavigate } from 'react-router-dom';
export default function TopicCard({ topic }) {
  const Icon = topic.icon;
    const navigate = useNavigate();
    const handleStartTest = () => {
    navigate('/aptitude/test', {
       state: { topicTitle: topic.title } 
    });
  };






  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r ${topic.color} text-white mb-4`}
      >
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {topic.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        {topic.description}
      </p>

      {/* Difficulty + Progress */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500">
          Difficulty: <strong>{topic.difficulty}</strong>
        </span>
        <span className="text-gray-500">
          {topic.progress}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${topic.progress}%` }}
        />
      </div>

      <button onClick={handleStartTest} className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
        Start Test
      </button>
    </div>
  );
}
