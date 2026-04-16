import { MessageSquare, Target, Briefcase, CheckCircle } from "lucide-react";

function AnswerBreakdown({ metrics }) {

  const getIcon = (type) => {
    switch (type) {
      case "communication":
        return <MessageSquare className="text-blue-600" />;
      case "relevance":
        return <Target className="text-blue-600" />;
      case "tone":
        return <Briefcase className="text-blue-600" />;
      case "completeness":
        return <CheckCircle className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">

      <h2 className="text-xl mb-6">Answer Quality Breakdown</h2>

      <div className="grid md:grid-cols-2 gap-4">

        {metrics.map((metric, index) => (

          <div key={index} className="bg-gray-50 p-4 rounded-lg">

            <div className="flex items-center gap-2 mb-2">
              {getIcon(metric.type)}
              <h3>{metric.title}</h3>
            </div>

            <p className="text-2xl">{metric.score}</p>

            <div className="w-full bg-gray-200 h-2 rounded-full my-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600">{metric.message}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AnswerBreakdown;