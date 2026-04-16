import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import aptitudeQuestions from './data/aptitudeQuestions';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ FIX 1: read topic title (string) or adaptive flag
  const topicTitle = state?.topicTitle;
  const isAdaptive = state?.isAdaptive;

  // ✅ FIX 2: correct route guard
  useEffect(() => {
    if (!topicTitle && !isAdaptive) {
      navigate('/aptitude');
    }
  }, [topicTitle, isAdaptive, navigate]);

  // Load standard topic questions or generate curated test
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
     if (isAdaptive) {
        // Dynamically import to avoid circular dependencies if any
        import('../../utils/banditModel').then(module => {
           setQuestions(module.generateCuratedTest(10)); // 10 mixed questions for adaptive test
        });
     } else if (topicTitle) {
        setQuestions(aptitudeQuestions[topicTitle] || []);
     }
  }, [topicTitle, isAdaptive]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if ((!topicTitle && !isAdaptive) || questions.length === 0) return null;

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

  const handleSubmit = async () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    // For adaptive tests, we track stats per topic
    const topicStats = {};

    questions.forEach((q, index) => {
      const topicToUpdate = isAdaptive ? q.originalTopic : topicTitle;
      
      if (!topicStats[topicToUpdate]) {
          topicStats[topicToUpdate] = { total: 0, wrong: 0 };
      }
      
      topicStats[topicToUpdate].total += 1;

      if (answers[index] === undefined) {
        skipped++;
        // Count skipped as wrong for bandit model purpose
        topicStats[topicToUpdate].wrong += 1;
      } else if (answers[index] === q.answer) {
        correct++;
      } else {
        wrong++;
        topicStats[topicToUpdate].wrong += 1;
      }
    });

    const totalQuestions = questions.length;
    const accuracy = Math.round((correct / totalQuestions) * 100);
    
    // Update Bandit Model stats
    const banditModule = await import('../../utils/banditModel');
    Object.keys(topicStats).forEach(topic => {
        banditModule.updateStats(topic, topicStats[topic].total, topicStats[topic].wrong);
    });

    navigate('/aptitude/result', {
      state: {
        result: {
          topic: isAdaptive ? 'Adaptive AI Test' : topicTitle,
          isAdaptive,
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
          {isAdaptive ? 'Adaptive AI Curated Test' : `${topicTitle} Test`}
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
