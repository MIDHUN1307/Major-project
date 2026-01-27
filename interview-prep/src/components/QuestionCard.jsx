import { CheckCircle2, Circle } from 'lucide-react';

export default function QuestionCard({
  questionNumber,
  questionText,
  options,
  selectedOption,
  onOptionSelect
}) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
      {/* Question Header */}
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          Question {questionNumber}
        </div>
        <h2 className="text-xl md:text-2xl text-slate-800 leading-relaxed">
          {questionText}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <button
              key={index}
              onClick={() => onOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`flex-shrink-0 mt-0.5 ${
                    isSelected ? 'text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold text-sm flex-shrink-0 ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {optionLabels[index]}
                    </span>

                    <p
                      className={`text-base leading-relaxed ${
                        isSelected
                          ? 'text-slate-800 font-medium'
                          : 'text-slate-700'
                      }`}
                    >
                      {option}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
