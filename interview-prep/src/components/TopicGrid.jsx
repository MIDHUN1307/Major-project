
import {
  Calculator,
  Brain,
  MessageSquare,
  Shuffle,
  Clock,
  GitBranch
} from 'lucide-react';
import TopicCard from './TopicCard';

const topics = [
  {
    id: 1,
    title: 'Quantitative Aptitude',
    description: 'Master numerical and mathematical problem-solving skills',
    icon: Calculator,
    difficulty: 'Medium',
    progress: 65,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Logical Reasoning',
    description: 'Enhance critical thinking and pattern recognition abilities',
    icon: Brain,
    difficulty: 'Medium',
    progress: 45,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Verbal Ability',
    description: 'Improve language comprehension and communication skills',
    icon: MessageSquare,
    difficulty: 'Easy',
    progress: 80,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'Probability',
    description: 'Learn to analyze uncertainty and random events',
    icon: Shuffle,
    difficulty: 'Hard',
    progress: 30,
    color: 'from-violet-500 to-violet-600',
  },
  {
    id: 5,
    title: 'Time & Work',
    description: 'Solve efficiency and rate-based calculation problems',
    icon: Clock,
    difficulty: 'Medium',
    progress: 55,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 6,
    title: 'Permutations & Combinations',
    description: 'Master counting principles and arrangement techniques',
    icon: GitBranch,
    difficulty: 'Hard',
    progress: 20,
    color: 'from-purple-600 to-pink-600',
  },
];

export default function TopicGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
