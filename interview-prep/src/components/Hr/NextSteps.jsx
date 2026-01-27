import { TrendingUp, Target, BookOpen, Lightbulb } from "lucide-react";

export default function NextSteps({ feedback }) {
  const steps = [];

  const confidence = feedback?.confidence ?? 0;

  // Confidence-based guidance
  if (confidence < 50) {
    steps.push("Retry the same question and focus on clarity.");
    steps.push("Elaborate your answers with more details.");
  } else if (confidence < 75) {
    steps.push("Improve structure and add real-world examples.");
    steps.push("Work on confident delivery.");
  } else {
    steps.push("You are doing well. Maintain consistency.");
    steps.push("Prepare for advanced HR questions.");
  }

  // Suggest STAR method if missing
  steps.push("Use the STAR method while answering behavioral questions.");

  // Skill improvement
  steps.push("Practice similar HR questions to improve fluency.");

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
      <h3 className="font-bold mb-4 flex gap-2">
        <Lightbulb /> What’s Next?
      </h3>

      <ul className="space-y-3">
        {steps.map((text, i) => (
          <li key={i} className="flex gap-2 items-start">
            <Target className="text-blue-600 mt-1" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
