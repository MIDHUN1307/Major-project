import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import aptitudeQuestions from './data/aptitudeQuestions';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ FIX 1: read topic title (string)
  const topicTitle = state?.topicTitle;

  // ✅ FIX 2: correct route guard
  useEffect(() => {
    if (!topicTitle) {
      navigate('/aptitude');
    }
  }, [topicTitle, navigate]);

  if (!topicTitle) return null;

  // ✅ FIX 3: correct data source
  const questions = aptitudeQuestions[topicTitle] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

    const handleSubmit = () => {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  questions.forEach((q, index) => {
    if (answers[index] === undefined) {
      skipped++;
    } else if (answers[index] === q.answer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const totalQuestions = questions.length;
  const accuracy = Math.round((correct / totalQuestions) * 100);

  navigate('/aptitude/result', {
    state: {
      result: {
        topic: topicTitle,
        totalQuestions,
        score: correct,
        correctAnswers: correct,
        wrongAnswers: wrong,
        skippedQuestions: skipped,
        accuracy,
        timeTaken: '—' // you can add timer later
      }
    }
  });
};


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Test Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {topicTitle} Test
        </h1>
        <p className="text-sm text-slate-500">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        {currentQuestion && (
          <QuestionCard
            questionNumber={currentIndex + 1}
            questionText={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={answers[currentIndex]}
            onOptionSelect={handleOptionSelect}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-lg border text-slate-700 disabled:opacity-50"
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
