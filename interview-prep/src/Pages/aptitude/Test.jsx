import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from '../../components/QuestionCard';
import aptitudeQuestions from './data/aptitudeQuestions';
import {
  getAdaptiveQuestions,
  getDifficultyLevel,
  savePerformance,
  getPerformanceHistory
} from '../../utils/adaptiveFilter';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const topicTitle = state?.topicTitle;
  const isAdaptive = state?.isAdaptive;

  // Redirect if no topic or adaptive flag is set
  useEffect(() => {
    if (!topicTitle && !isAdaptive) {
      navigate('/aptitude');
    }
  }, [topicTitle, isAdaptive, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");

  // Load questions on mount
  useEffect(() => {
    if (isAdaptive) {
      // Adaptive AI test: pull from banditModel (existing logic)
      import('../../utils/banditModel').then(module => {
        setQuestions(module.generateCuratedTest(10));
      });
    } else if (topicTitle) {
      // Load performance history to decide difficulty
      const history = getPerformanceHistory(topicTitle);
      const difficulty = getDifficultyLevel(history);
      setCurrentDifficulty(difficulty);

      // Get adaptive filtered questions
      const selected = getAdaptiveQuestions(aptitudeQuestions, topicTitle, history);
      setQuestions(selected);
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

    // For adaptive tests, track stats per topic
    const topicStats = {};

    questions.forEach((q, index) => {
      const topicToUpdate = isAdaptive ? q.originalTopic : topicTitle;

      if (!topicStats[topicToUpdate]) {
        topicStats[topicToUpdate] = { total: 0, wrong: 0 };
      }
      topicStats[topicToUpdate].total += 1;

      if (answers[index] === undefined) {
        skipped++;
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

    // ── Save performance for adaptive difficulty (non-adaptive topic tests only) ──
    if (!isAdaptive && topicTitle) {
      savePerformance(topicTitle, accuracy);
    }

    // ── Update Bandit Model stats ──
    const banditModule = await import('../../utils/banditModel');
    Object.keys(topicStats).forEach(topic => {
      banditModule.updateStats(topic, topicStats[topic].total, topicStats[topic].wrong);
    });

    // ── Determine next difficulty based on this test's accuracy ──
    let nextDifficulty = "easy";
    if (accuracy >= 80) nextDifficulty = "hard";
    else if (accuracy >= 50) nextDifficulty = "medium";

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
          difficultyPlayed: isAdaptive ? 'Mixed' : currentDifficulty,
          nextDifficulty: isAdaptive ? null : nextDifficulty,
          timeTaken: '—'
        }
      }
    });
  };

  // Difficulty badge color helper
  const difficultyColor = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700"
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Test Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {isAdaptive ? 'Adaptive AI Curated Test' : `${topicTitle} Test`}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Difficulty Badge (only for topic tests) */}
          {!isAdaptive && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${difficultyColor[currentDifficulty]}`}>
              {currentDifficulty} level
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
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
            className="px-6 py-2 rounded-lg border text-slate-700 disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
        </div>

        {/* Question Navigator dots */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition
                ${i === currentIndex
                  ? 'bg-blue-600 text-white'
                  : answers[i] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-slate-600'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}