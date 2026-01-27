const codingTopics = [
  /* ===================== ARRAYS ===================== */
  {
    id: "arrays",
    name: "Arrays",
    description: "Index-based data storage and traversal",
    icon: "📊",
    subtopics: {
      primary: [
        { id: "basic", name: "Basic Arrays", problemCount: 10, practiceUrl: "https://leetcode.com/tag/array/" },
        { id: "two_pointer", name: "Two Pointers", problemCount: 15, practiceUrl: "https://leetcode.com/tag/two-pointers/" },
        { id: "sliding_window", name: "Sliding Window", problemCount: 12, practiceUrl: "https://leetcode.com/tag/sliding-window/" },
      ],
      advanced: [
        { id: "prefix", name: "Prefix Sum", problemCount: 8, practiceUrl: "https://leetcode.com/tag/prefix-sum/" },
        { id: "sorting", name: "Sorting", problemCount: 10, practiceUrl: "https://leetcode.com/tag/sorting/" },
        { id: "kadane", name: "Kadane’s Algorithm", problemCount: 6, practiceUrl: "https://leetcode.com/problems/maximum-subarray/" },
      ],
    },
  },

  /* ===================== STRINGS ===================== */
  {
    id: "strings",
    name: "Strings",
    description: "Character manipulation and patterns",
    icon: "🔤",
    subtopics: {
      primary: [
        { id: "basic", name: "Basic Strings", problemCount: 12, practiceUrl: "https://leetcode.com/tag/string/" },
        { id: "palindrome", name: "Palindrome", problemCount: 7, practiceUrl: "https://leetcode.com/problems/valid-palindrome/" },
      ],
      advanced: [
        { id: "pattern", name: "Pattern Matching", problemCount: 9, practiceUrl: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
        { id: "anagram", name: "Anagram Problems", problemCount: 8, practiceUrl: "https://leetcode.com/problems/valid-anagram/" },
      ],
    },
  },

  /* ===================== BACKTRACKING ===================== */
  {
    id: "backtracking",
    name: "Backtracking",
    description: "Recursive decision making",
    icon: "🔁",
    subtopics: {
      primary: [
        { id: "subsets", name: "Subsets", problemCount: 8, practiceUrl: "https://leetcode.com/problems/subsets/" },
        { id: "permutations", name: "Permutations", problemCount: 10, practiceUrl: "https://leetcode.com/problems/permutations/" },
        { id: "nqueens", name: "N-Queens", problemCount: 6, practiceUrl: "https://leetcode.com/problems/n-queens/" },
      ],
      advanced: [
        { id: "combination_sum", name: "Combination Sum", problemCount: 8, practiceUrl: "https://leetcode.com/problems/combination-sum/" },
        { id: "word_search", name: "Word Search", problemCount: 6, practiceUrl: "https://leetcode.com/problems/word-search/" },
        { id: "sudoku", name: "Sudoku Solver", problemCount: 5, practiceUrl: "https://leetcode.com/problems/sudoku-solver/" },
        { id: "restore_ip", name: "Restore IP Addresses", problemCount: 6, practiceUrl: "https://leetcode.com/problems/restore-ip-addresses/" },
      ],
    },
  },

  /* ===================== DYNAMIC PROGRAMMING ===================== */
  {
    id: "dynamic_programming",
    name: "Dynamic Programming",
    description: "Optimal substructure and memoization",
    icon: "🧠",
    subtopics: {
      primary: [
        { id: "dp_1d", name: "1D DP", problemCount: 12, practiceUrl: "https://leetcode.com/problems/climbing-stairs/" },
        { id: "dp_2d", name: "2D DP", problemCount: 10, practiceUrl: "https://leetcode.com/problems/unique-paths/" },
      ],
      advanced: [
        { id: "knapsack", name: "Knapsack", problemCount: 9, practiceUrl: "https://leetcode.com/problems/partition-equal-subset-sum/" },
        { id: "lcs", name: "LCS", problemCount: 7, practiceUrl: "https://leetcode.com/problems/longest-common-subsequence/" },
        { id: "lis", name: "LIS", problemCount: 6, practiceUrl: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      ],
    },
  },

  /* ===================== LINKED LIST ===================== */
  {
    id: "linked_list",
    name: "Linked List",
    description: "Pointer-based linear data structure",
    icon: "🔗",
    subtopics: {
      primary: [
        { id: "reverse", name: "Reverse Linked List", problemCount: 8, practiceUrl: "https://leetcode.com/problems/reverse-linked-list/" },
        { id: "cycle", name: "Cycle Detection", problemCount: 6, practiceUrl: "https://leetcode.com/problems/linked-list-cycle/" },
      ],
      advanced: [
        { id: "merge", name: "Merge Two Lists", problemCount: 6, practiceUrl: "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { id: "intersection", name: "Intersection of Lists", problemCount: 5, practiceUrl: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      ],
    },
  },

  /* ===================== STACK & QUEUE ===================== */
  {
    id: "stack_queue",
    name: "Stacks & Queues",
    description: "LIFO and FIFO data structures",
    icon: "📚",
    subtopics: {
      primary: [
        { id: "stack_basic", name: "Stack Basics", problemCount: 6, practiceUrl: "https://leetcode.com/tag/stack/" },
        { id: "queue_basic", name: "Queue Basics", problemCount: 6, practiceUrl: "https://leetcode.com/tag/queue/" },
      ],
      advanced: [
        { id: "mono_stack", name: "Monotonic Stack", problemCount: 8, practiceUrl: "https://leetcode.com/problems/daily-temperatures/" },
        { id: "sliding_max", name: "Sliding Window Maximum", problemCount: 7, practiceUrl: "https://leetcode.com/problems/sliding-window-maximum/" },
      ],
    },
  },

  /* ===================== TREES ===================== */
  {
    id: "trees",
    name: "Trees",
    description: "Hierarchical data structures",
    icon: "🌳",
    subtopics: {
      primary: [
        { id: "traversal", name: "Tree Traversals", problemCount: 10, practiceUrl: "https://leetcode.com/tag/tree/" },
        { id: "bst", name: "Binary Search Tree", problemCount: 8, practiceUrl: "https://leetcode.com/tag/binary-search-tree/" },
      ],
      advanced: [
        { id: "lca", name: "Lowest Common Ancestor", problemCount: 6, practiceUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
        { id: "diameter", name: "Tree Diameter", problemCount: 5, practiceUrl: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      ],
    },
  },

  /* ===================== GRAPHS ===================== */
  {
    id: "graphs",
    name: "Graphs",
    description: "Nodes and edges traversal",
    icon: "🕸️",
    subtopics: {
      primary: [
        { id: "bfs_dfs", name: "BFS & DFS", problemCount: 8, practiceUrl: "https://leetcode.com/tag/graph/" },
        { id: "toposort", name: "Topological Sort", problemCount: 6, practiceUrl: "https://leetcode.com/problems/course-schedule/" },
      ],
      advanced: [
        { id: "shortest_path", name: "Shortest Path", problemCount: 7, practiceUrl: "https://leetcode.com/problems/network-delay-time/" },
        { id: "mst", name: "Minimum Spanning Tree", problemCount: 6, practiceUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
      ],
    },
  },

  /* ===================== GREEDY ===================== */
  {
    id: "greedy",
    name: "Greedy Algorithms",
    description: "Locally optimal solutions",
    icon: "⚡",
    subtopics: {
      primary: [
        { id: "interval", name: "Interval Scheduling", problemCount: 6, practiceUrl: "https://leetcode.com/problems/non-overlapping-intervals/" },
        { id: "activity", name: "Activity Selection", problemCount: 5, practiceUrl: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/" },
      ],
      advanced: [
        { id: "jump_game", name: "Jump Game", problemCount: 5, practiceUrl: "https://leetcode.com/problems/jump-game/" },
      ],
    },
  },

  /* ===================== BIT MANIPULATION ===================== */
  {
    id: "bit_manipulation",
    name: "Bit Manipulation",
    description: "Binary tricks and operations",
    icon: "⚙️",
    subtopics: {
      primary: [
        { id: "xor", name: "XOR Tricks", problemCount: 6, practiceUrl: "https://leetcode.com/problems/single-number/" },
        { id: "count_bits", name: "Count Bits", problemCount: 5, practiceUrl: "https://leetcode.com/problems/counting-bits/" },
      ],
      advanced: [
        { id: "bit_mask", name: "Bit Masking", problemCount: 4, practiceUrl: "https://leetcode.com/problems/subsets/" },
      ],
    },
  },

  /* ===================== MATHEMATICS ===================== */
  {
    id: "math",
    name: "Mathematics",
    description: "Number theory and math problems",
    icon: "➗",
    subtopics: {
      primary: [
        { id: "gcd_lcm", name: "GCD & LCM", problemCount: 5, practiceUrl: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/" },
        { id: "prime", name: "Prime Numbers", problemCount: 5, practiceUrl: "https://leetcode.com/problems/count-primes/" },
      ],
      advanced: [
        { id: "modular", name: "Modular Arithmetic", problemCount: 5, practiceUrl: "https://leetcode.com/problems/powx-n/" },
      ],
    },
  },
];

export default codingTopics;
