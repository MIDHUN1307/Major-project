import aptitudeQuestions from '../Pages/aptitude/data/aptitudeQuestions';

const ACTIVE_UID_KEY = 'active_uid';
const storageKeyForUser = (baseKey) => {
  const uid = localStorage.getItem(ACTIVE_UID_KEY) || 'anonymous';
  return `${baseKey}:${uid}`;
};

const getStateStorageKey = () => storageKeyForUser('aptitude_bandit_state');
const getTraceStorageKey = () => storageKeyForUser('aptitude_bandit_last_trace');

const getAllTopics = () => Object.keys(aptitudeQuestions);

const normalizeState = (state) => {
  const normalized = state && typeof state === 'object' ? state : {};

  if (typeof normalized.totalAttempts !== 'number' || Number.isNaN(normalized.totalAttempts)) {
    normalized.totalAttempts = 0;
  }
  if (!normalized.topics || typeof normalized.topics !== 'object') {
    normalized.topics = {};
  }

  getAllTopics().forEach((topic) => {
    const existing = normalized.topics[topic];
    const attempts = typeof existing?.attempts === 'number' && !Number.isNaN(existing.attempts) ? existing.attempts : 0;
    const wrong = typeof existing?.wrong === 'number' && !Number.isNaN(existing.wrong) ? existing.wrong : 0;
    normalized.topics[topic] = { attempts, wrong };
  });

  return normalized;
};

const saveBanditState = (state) => {
  localStorage.setItem(getStateStorageKey(), JSON.stringify(state));
};

// Initialize/load state (persist initial state on first run)
const getBanditState = () => {
  const saved = localStorage.getItem(getStateStorageKey());
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to parse bandit state', e);
    }
  }

  // Initial state: 0 attempts, 0 wrongs for all topics
  const initialState = normalizeState({
    totalAttempts: 0,
    topics: {}
  });

  saveBanditState(initialState);
  return initialState;
};

const getErrorRate = (attempts, wrong) => {
  if (attempts <= 0) return 0;
  const rate = wrong / attempts;
  // Clamp for safety against corrupted state.
  return Math.max(0, Math.min(1, rate));
};

const computeUcbScore = ({
  errorRate,
  totalAttempts,
  attempts,
  explorationFactor,
  maxExplorationBonus,
}) => {
  // We maximize "need for practice". Higher errorRate => more likely to select.
  // UCB adds exploration term so under-sampled topics still get picked sometimes.
  // NOTE: we should avoid returning Infinity on cold-start, otherwise the curated test
  // will spend the first N questions sampling never-attempted topics even when the
  // user has a clearly weak topic (high errorRate) that should be prioritized.
  if (attempts <= 0) attempts = 1;
  const rawExploration = explorationFactor * Math.sqrt(Math.log(Math.max(1, totalAttempts)) / attempts);
  const exploration =
    typeof maxExplorationBonus === 'number' && !Number.isNaN(maxExplorationBonus)
      ? Math.min(rawExploration, maxExplorationBonus)
      : rawExploration;
  return errorRate + exploration;
};

export const updateStats = (topic, totalQuestions, wrongAnswers) => {
  const state = getBanditState();

  // Update overall attempts
  state.totalAttempts += totalQuestions;

  // Update topic specific stats
  if (!state.topics[topic]) {
    state.topics[topic] = { attempts: 0, wrong: 0 };
  }

  state.topics[topic].attempts += totalQuestions;
  state.topics[topic].wrong += wrongAnswers;

  saveBanditState(state);
  window.dispatchEvent(new Event('progress-updated'));
};

export const getStrongAndWeakAreas = () => {
  const state = getBanditState();

  const topicsData = Object.keys(state.topics).map(topic => {
    const data = state.topics[topic];
    // Avoid division by zero, default accuracy to 100% if no attempts
    const accuracy = data.attempts === 0 ? 100 : Math.round(((data.attempts - data.wrong) / data.attempts) * 100);
    return {
      topic,
      accuracy,
      attempts: data.attempts
    };
  });

  // Filter out topics with 0 attempts for meaningful results
  const attemptedTopics = topicsData.filter(t => t.attempts > 0);

  // Sort by accuracy (lowest first)
  attemptedTopics.sort((a, b) => a.accuracy - b.accuracy);

  // Split into weak and strong
  // "Weak" = accuracy < 60% OR bottom half of attempted topics
  const midIndex = Math.ceil(attemptedTopics.length / 2);

  const weak = [];
  const strong = [];

  attemptedTopics.forEach((t, i) => {
    if (t.accuracy < 60 || (attemptedTopics.length > 1 && i < midIndex && t.accuracy < 80)) {
      weak.push(t);
    } else {
      strong.push(t);
    }
  });

  return { weak, strong, all: topicsData };
};

export const getBanditDebugSnapshot = () => {
  const state = getBanditState();
  const topics = getAllTopics();
  return {
    totalAttempts: state.totalAttempts,
    topics: topics.map((topic) => {
      const data = state.topics[topic] || { attempts: 0, wrong: 0 };
      const errorRate = getErrorRate(data.attempts, data.wrong);
      const accuracy = data.attempts === 0 ? 100 : Math.round((1 - errorRate) * 100);
      return { topic, attempts: data.attempts, wrong: data.wrong, errorRate, accuracy };
    }),
  };
};

export const resetBanditState = () => {
  localStorage.removeItem(getStateStorageKey());
  localStorage.removeItem(getTraceStorageKey());
};

export const getLastCuratedTrace = () => {
  const saved = localStorage.getItem(getTraceStorageKey());
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse curated trace', e);
    return null;
  }
};

export const generateCuratedTest = (numQuestions = 10, options = {}) => {
  const state = getBanditState();
  const topics = getAllTopics();

  // UCB Parameter: Higher value = more exploration
  const explorationFactor =
    typeof options.explorationFactor === 'number' && !Number.isNaN(options.explorationFactor)
      ? options.explorationFactor
      : 1.5;
  const maxExplorationBonus =
    typeof options.maxExplorationBonus === 'number' && options.maxExplorationBonus >= 0 && !Number.isNaN(options.maxExplorationBonus)
      ? options.maxExplorationBonus
      : 0.5;

  // Cold-start smoothing: treat each topic as if it already has a small number of attempts.
  // This prevents "unattempted => Infinity" from dominating and allows truly weak topics
  // (high errorRate) to immediately receive more questions in the adaptive test.
  const priorStrength =
    typeof options.priorStrength === 'number' && options.priorStrength > 0 && !Number.isNaN(options.priorStrength)
      ? options.priorStrength
      : 2;
  const priorErrorRate =
    typeof options.priorErrorRate === 'number' && options.priorErrorRate >= 0 && options.priorErrorRate <= 1 && !Number.isNaN(options.priorErrorRate)
      ? options.priorErrorRate
      : 0.3;

  // Local (in-memory) draw counts to avoid repeatedly selecting the same topic in a single test
  // without polluting the stored bandit stats with fake data.
  const sessionDrawsByTopic = Object.fromEntries(topics.map((t) => [t, 0]));
  const usedQuestionIndexByTopic = Object.fromEntries(topics.map((t) => [t, new Set()]));

  const curatedQuestions = [];
  const trace = {
    createdAt: new Date().toISOString(),
    numQuestions,
    explorationFactor,
    picks: [],
  };

  for (let i = 0; i < numQuestions; i++) {
    let selectedTopic = topics[0] ?? null;
    let bestScore = Number.NEGATIVE_INFINITY;

    topics.forEach((topic) => {
      const data = state.topics[topic] || { attempts: 0, wrong: 0 };
      const effectiveAttempts = data.attempts + priorStrength + sessionDrawsByTopic[topic];
      const effectiveTotalAttempts = state.totalAttempts + i; // +i to reflect this test's internal progression
      const smoothedErrorRate = (data.wrong + priorErrorRate * priorStrength) / (data.attempts + priorStrength);
      const errorRate = Math.max(0, Math.min(1, smoothedErrorRate));

      const score = computeUcbScore({
        errorRate,
        totalAttempts: effectiveTotalAttempts,
        attempts: effectiveAttempts,
        explorationFactor,
        maxExplorationBonus,
      });

      // Small noise to break ties deterministically-ish
      const noisyScore = score + Math.random() * 0.0001;
      if (noisyScore > bestScore) {
        bestScore = noisyScore;
        selectedTopic = topic;
      }
    });

    if (!selectedTopic) break;

    const topicQuestions = aptitudeQuestions[selectedTopic] || [];
    if (topicQuestions.length === 0) continue;

    // Prefer an unseen question from that topic within this curated test
    const usedSet = usedQuestionIndexByTopic[selectedTopic];
    let chosenIndex = null;
    const remaining = topicQuestions.length - usedSet.size;

    if (remaining > 0) {
      // Randomly sample until we find an unused one (small lists => OK)
      for (let tries = 0; tries < 10; tries++) {
        const idx = Math.floor(Math.random() * topicQuestions.length);
        if (!usedSet.has(idx)) {
          chosenIndex = idx;
          break;
        }
      }
      if (chosenIndex === null) {
        for (let idx = 0; idx < topicQuestions.length; idx++) {
          if (!usedSet.has(idx)) {
            chosenIndex = idx;
            break;
          }
        }
      }
    } else {
      chosenIndex = Math.floor(Math.random() * topicQuestions.length);
    }

    usedSet.add(chosenIndex);
    sessionDrawsByTopic[selectedTopic] += 1;

    curatedQuestions.push({
      ...topicQuestions[chosenIndex],
      originalTopic: selectedTopic,
    });

    trace.picks.push({ i, topic: selectedTopic });
  }

  localStorage.setItem(getTraceStorageKey(), JSON.stringify(trace));
  return curatedQuestions;
};
