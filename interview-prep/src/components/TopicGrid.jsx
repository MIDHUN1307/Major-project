
import {
  Calculator,
  Brain,
  MessageSquare,
  Shuffle,
  Clock,
  GitBranch
} from 'lucide-react';
import TopicCard from './TopicCard';
import { useNavigate } from 'react-router-dom';
import { getBanditDebugSnapshot } from '../utils/banditModel';

const topics = [
  {
    id: 1,
    title: 'Quantitative Aptitude',
    description: 'Master numerical and mathematical problem-solving skills',
    icon: Calculator,
    difficulty: 'Medium',
    progress: 0,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Logical Reasoning',
    description: 'Enhance critical thinking and pattern recognition abilities',
    icon: Brain,
    difficulty: 'Medium',
    progress: 0,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Verbal Ability',
    description: 'Improve language comprehension and communication skills',
    icon: MessageSquare,
    difficulty: 'Easy',
    progress: 0,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'Probability',
    description: 'Learn to analyze uncertainty and random events',
    icon: Shuffle,
    difficulty: 'Hard',
    progress: 0,
    color: 'from-violet-500 to-violet-600',
  },
  {
    id: 5,
    title: 'Time & Work',
    description: 'Solve efficiency and rate-based calculation problems',
    icon: Clock,
    difficulty: 'Medium',
    progress: 0,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 6,
    title: 'Permutations & Combinations',
    description: 'Master counting principles and arrangement techniques',
    icon: GitBranch,
    difficulty: 'Hard',
    progress: 0,
    color: 'from-purple-600 to-pink-600',
  },
];

export default function TopicGrid() {
  const navigate = useNavigate();

  const snapshot = getBanditDebugSnapshot();
  const progressByTopic = Object.fromEntries(
    (snapshot?.topics || []).map((t) => [
      t.topic,
      // If user hasn't attempted the topic, show 0 instead of a misleading 100.
      t.attempts > 0 ? t.accuracy : 0,
    ])
  );

  const topicsWithProgress = topics.map((t) => ({
    ...t,
    progress: progressByTopic[t.title] ?? 0,
  }));

  return (
    <div className="space-y-6">
      {/* Adaptive Test Highlight Card */}
      <div 
         onClick={() => navigate('/aptitude/test', { state: { isAdaptive: true } })}
         className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
      >
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
           <Brain size={160} />
        </div>
        <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">Adaptive AI Curated Test</h3>
                    <span className="px-2 py-1 text-xs font-bold bg-white text-blue-700 rounded-full">RECOMMENDED</span>
                </div>
                <p className="text-blue-100 max-w-xl">
                    Our AI Bandit Model tracks your performance and generates a custom test targeting your weak areas while balancing overall coverage to maximize your learning efficiency.
                </p>
            </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 pt-4 px-2">Practice by Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicsWithProgress.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
