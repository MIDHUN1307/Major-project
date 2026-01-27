const aptitudeQuestions = {
  "Quantitative Aptitude": [
    {
      question: "If a train travels 60 km in 1 hour, how far will it travel in 30 minutes?",
      options: ["15 km", "20 km", "30 km", "40 km"],
      answer: 2
    },
    {
      question: "What is 25% of 200?",
      options: ["25", "50", "75", "100"],
      answer: 1
    },
    {
      question: "If the cost of 5 pens is ₹50, what is the cost of 8 pens?",
      options: ["₹70", "₹75", "₹80", "₹85"],
      answer: 2
    },
    {
      question: "What is the average of 10, 20, and 30?",
      options: ["15", "20", "25", "30"],
      answer: 1
    },
    {
      question: "Simplify: 12 × 8 ÷ 4",
      options: ["12", "24", "32", "48"],
      answer: 1
    },
    {
      question: "A number increased by 20% becomes 120. What is the original number?",
      options: ["80", "90", "100", "110"],
      answer: 2
    },
    {
      question: "What is the value of 3² + 4²?",
      options: ["12", "25", "49", "7"],
      answer: 1
    },
    {
      question: "If x = 5, what is the value of 2x + 3?",
      options: ["10", "11", "12", "13"],
      answer: 3
    },
    {
      question: "What is 15% of 300?",
      options: ["30", "40", "45", "60"],
      answer: 2
    },
    {
      question: "What is the LCM of 4 and 6?",
      options: ["6", "8", "10", "12"],
      answer: 3
    }
  ],

  "Logical Reasoning": [
    {
      question: "Which number comes next: 2, 4, 8, 16, ?",
      options: ["18", "24", "32", "64"],
      answer: 2
    },
    {
      question: "Find the odd one out: Apple, Banana, Mango, Carrot",
      options: ["Apple", "Banana", "Mango", "Carrot"],
      answer: 3
    },
    {
      question: "If A = 1, B = 2, then Z = ?",
      options: ["24", "25", "26", "27"],
      answer: 2
    },
    {
      question: "Which word does not belong: Pen, Pencil, Eraser, Book",
      options: ["Pen", "Pencil", "Eraser", "Book"],
      answer: 3
    },
    {
      question: "If today is Monday, what day will it be after 7 days?",
      options: ["Sunday", "Monday", "Tuesday", "Friday"],
      answer: 1
    },
    {
      question: "Find the missing number: 3, 6, 9, ?, 15",
      options: ["10", "11", "12", "13"],
      answer: 2
    },
    {
      question: "Which shape has four equal sides?",
      options: ["Rectangle", "Triangle", "Square", "Circle"],
      answer: 2
    },
    {
      question: "What comes next: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      answer: 1
    },
    {
      question: "If ALL = 36, BALL = ? (A=1, B=2, L=12)",
      options: ["38", "40", "50", "60"],
      answer: 1
    },
    {
      question: "Which number is smallest?",
      options: ["0.25", "1/4", "0.2", "25%"],
      answer: 2
    }
  ],

  "Verbal Ability": [
    {
      question: "Choose the synonym of 'Happy'",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      answer: 2
    },
    {
      question: "Choose the antonym of 'Begin'",
      options: ["Start", "Open", "End", "Launch"],
      answer: 2
    },
    {
      question: "Fill in the blank: She is good ___ mathematics.",
      options: ["in", "on", "at", "with"],
      answer: 2
    },
    {
      question: "Identify the correctly spelled word:",
      options: ["Recieve", "Receive", "Receeve", "Receve"],
      answer: 1
    },
    {
      question: "Choose the synonym of 'Fast'",
      options: ["Quick", "Slow", "Late", "Weak"],
      answer: 0
    },
    {
      question: "Choose the antonym of 'Strong'",
      options: ["Hard", "Powerful", "Weak", "Solid"],
      answer: 2
    },
    {
      question: "Fill in the blank: He ___ to school every day.",
      options: ["go", "goes", "going", "gone"],
      answer: 1
    },
    {
      question: "Identify the noun in the sentence: The cat runs fast.",
      options: ["cat", "runs", "fast", "the"],
      answer: 0
    },
    {
      question: "Choose the correct plural of 'Child'",
      options: ["Childs", "Children", "Childrens", "Childes"],
      answer: 1
    },
    {
      question: "Which word is an adjective?",
      options: ["Run", "Beautiful", "Quickly", "Sing"],
      answer: 1
    }
  ],

  "Probability": [
    {
      question: "What is the probability of getting a head when tossing a fair coin?",
      options: ["0", "1/2", "1", "2"],
      answer: 1
    },
    {
      question: "What is the probability of getting a tail in a single coin toss?",
      options: ["0", "1/2", "1", "2"],
      answer: 1
    },
    {
      question: "How many outcomes are possible when rolling a die?",
      options: ["5", "6", "7", "8"],
      answer: 1
    },
    {
      question: "What is the probability of getting an even number on a die?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: 2
    },
    {
      question: "What is the probability of getting 1 on a die?",
      options: ["1/6", "1/3", "1/2", "1"],
      answer: 0
    },
    {
      question: "If two coins are tossed, how many outcomes are possible?",
      options: ["2", "3", "4", "6"],
      answer: 2
    },
    {
      question: "Probability value always lies between?",
      options: ["0 and 1", "1 and 2", "-1 and 1", "0 and 10"],
      answer: 0
    },
    {
      question: "What is the probability of an impossible event?",
      options: ["0", "1", "1/2", "-1"],
      answer: 0
    },
    {
      question: "What is the probability of a sure event?",
      options: ["0", "1", "1/2", "2"],
      answer: 1
    },
    {
      question: "If a card is drawn from a deck, probability of a red card is?",
      options: ["1/4", "1/2", "3/4", "1"],
      answer: 1
    }
  ],

  "Time & Work": [
    {
      question: "If A can do a work in 10 days, what is A’s one day work?",
      options: ["1/5", "1/10", "10", "5"],
      answer: 1
    },
    {
      question: "If B can do a work in 5 days, how many days will B take to do half work?",
      options: ["2", "2.5", "3", "5"],
      answer: 1
    },
    {
      question: "If A does a work in 4 days, what part does he complete in 1 day?",
      options: ["1/4", "1/2", "2", "4"],
      answer: 0
    },
    {
      question: "If A and B together can do work in 6 days, what is their one day work?",
      options: ["1/6", "1/3", "2", "6"],
      answer: 0
    },
    {
      question: "If work is completed, remaining work is?",
      options: ["0", "1", "2", "Depends"],
      answer: 0
    },
    {
      question: "If a man does work faster, time taken will?",
      options: ["Increase", "Decrease", "Same", "Double"],
      answer: 1
    },
    {
      question: "Time and work are ____ proportional.",
      options: ["Directly", "Inversely", "Not related", "Equal"],
      answer: 1
    },
    {
      question: "If A is twice as efficient as B, A will take?",
      options: ["Same time", "Half time", "Double time", "No time"],
      answer: 1
    },
    {
      question: "If work increases, time will?",
      options: ["Decrease", "Increase", "Remain same", "Become zero"],
      answer: 1
    },
    {
      question: "Work = Rate × ?",
      options: ["Speed", "Time", "Distance", "Power"],
      answer: 1
    }
  ],

  "Permutations & Combinations": [
    {
      question: "How many ways can 3 objects be arranged?",
      options: ["3", "6", "9", "12"],
      answer: 1
    },
    {
      question: "What is the formula for permutation?",
      options: ["nCr", "n!", "nPr", "n + r"],
      answer: 2
    },
    {
      question: "What is 5!",
      options: ["20", "60", "100", "120"],
      answer: 3
    },
    {
      question: "What does combination deal with?",
      options: ["Order", "Selection", "Speed", "Time"],
      answer: 1
    },
    {
      question: "Permutation considers?",
      options: ["Order", "Selection", "Grouping", "Counting"],
      answer: 0
    },
    {
      question: "How many combinations of 2 items from 4?",
      options: ["4", "6", "8", "12"],
      answer: 1
    },
    {
      question: "What is 0! equal to?",
      options: ["0", "1", "Undefined", "Infinity"],
      answer: 1
    },
    {
      question: "nP0 is equal to?",
      options: ["0", "1", "n", "n!"],
      answer: 1
    },
    {
      question: "nC0 is equal to?",
      options: ["0", "1", "n", "n!"],
      answer: 1
    },
    {
      question: "Permutation is always ____ than combination.",
      options: ["Smaller", "Equal", "Greater", "Unrelated"],
      answer: 2
    }
  ]
};

export default aptitudeQuestions;
