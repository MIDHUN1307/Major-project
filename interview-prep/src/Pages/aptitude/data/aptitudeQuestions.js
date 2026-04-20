const aptitudeQuestions = {
  "Quantitative Aptitude": [
    // ─── EASY ───
    {
      question: "What is 25% of 200?",
      options: ["25", "50", "75", "100"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If a train travels 60 km in 1 hour, how far will it travel in 30 minutes?",
      options: ["15 km", "20 km", "30 km", "40 km"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "What is the average of 10, 20, and 30?",
      options: ["15", "20", "25", "30"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Simplify: 12 × 8 ÷ 4",
      options: ["12", "24", "32", "48"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What is the value of 3² + 4²?",
      options: ["12", "25", "49", "7"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If x = 5, what is the value of 2x + 3?",
      options: ["10", "11", "12", "13"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "What is the LCM of 4 and 6?",
      options: ["6", "8", "10", "12"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "What is 15% of 300?",
      options: ["30", "40", "45", "60"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "If the cost of 5 pens is ₹50, what is the cost of 8 pens?",
      options: ["₹70", "₹75", "₹80", "₹85"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "What is the HCF of 12 and 18?",
      options: ["3", "6", "9", "12"],
      answer: 1,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "A number increased by 20% becomes 120. What is the original number?",
      options: ["80", "90", "100", "110"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "A shopkeeper sells an item for ₹450 at 10% profit. What is the cost price?",
      options: ["₹400", "₹405", "₹410", "₹415"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A cistern is 2/3 full. If 18 litres are added it becomes full. What is its capacity?",
      options: ["27 L", "36 L", "54 L", "72 L"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "What is the simple interest on ₹2000 at 5% per annum for 3 years?",
      options: ["₹200", "₹250", "₹300", "₹350"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "Two numbers are in the ratio 3:5. Their sum is 64. Find the larger number.",
      options: ["24", "32", "40", "48"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "A car covers 400 km in 8 hours. What is its average speed?",
      options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "If 40% of a number is 56, find the number.",
      options: ["120", "130", "140", "150"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "A pipe fills a tank in 4 hours. Another empties it in 8 hours. How long to fill if both open?",
      options: ["4 hrs", "6 hrs", "8 hrs", "10 hrs"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "Find the missing term: 3, 9, 27, ?, 243",
      options: ["54", "72", "81", "108"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "A sum doubles in 5 years at simple interest. What is the rate of interest?",
      options: ["10%", "15%", "20%", "25%"],
      answer: 2,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "A train 200 m long passes a pole in 10 seconds. What is its speed in km/h?",
      options: ["60 km/h", "66 km/h", "72 km/h", "80 km/h"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Compound interest on ₹8000 at 10% for 2 years is?",
      options: ["₹1600", "₹1680", "₹1750", "₹1800"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A man rows upstream at 6 km/h and downstream at 10 km/h. Find the speed of stream.",
      options: ["1 km/h", "2 km/h", "3 km/h", "4 km/h"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A can do a piece of work in 10 days, B in 15 days. Together, how many days?",
      options: ["4 days", "5 days", "6 days", "7 days"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "If selling price is ₹560 and loss is 20%, find the cost price.",
      options: ["₹650", "₹680", "₹700", "₹720"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Three numbers are in ratio 2:3:4. Their product is 3072. Find the largest.",
      options: ["12", "16", "18", "24"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "What is the least number divisible by 2, 3, 4, 5, and 6?",
      options: ["30", "60", "90", "120"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "The ages of A and B are in ratio 3:4. After 5 years the ratio becomes 4:5. Find A's current age.",
      options: ["12", "15", "16", "20"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A mixture of milk and water is 80:20. To make ratio 70:30, how much water per 100 L?",
      options: ["10 L", "12.5 L", "14.3 L", "16 L"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "A number when divided by 899 gives remainder 63. What is the remainder when divided by 29?",
      options: ["4", "5", "6", "7"],
      answer: 1,
      difficulty: "hard"
    }
  ],

  "Logical Reasoning": [
    // ─── EASY ───
    {
      question: "Which number comes next: 2, 4, 8, 16, ?",
      options: ["18", "24", "32", "64"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Find the odd one out: Apple, Banana, Mango, Carrot",
      options: ["Apple", "Banana", "Mango", "Carrot"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "If A = 1, B = 2, then Z = ?",
      options: ["24", "25", "26", "27"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "If today is Monday, what day will it be after 7 days?",
      options: ["Sunday", "Monday", "Tuesday", "Friday"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Find the missing number: 3, 6, 9, ?, 15",
      options: ["10", "11", "12", "13"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "What comes next: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Which shape has four equal sides and four right angles?",
      options: ["Rectangle", "Triangle", "Square", "Circle"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Find the next: 1, 4, 9, 16, ?",
      options: ["20", "24", "25", "36"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Odd one out: Red, Blue, Green, Run",
      options: ["Red", "Blue", "Green", "Run"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "Which number comes next: 5, 10, 15, 20, ?",
      options: ["22", "24", "25", "30"],
      answer: 2,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "Pointing to a man, a woman says 'his mother is the only daughter of my father'. How is the woman related?",
      options: ["Grandmother", "Mother", "Sister", "Aunt"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Find the next term: 2, 6, 12, 20, 30, ?",
      options: ["38", "40", "42", "44"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "If ROAD is coded as 4123, what is DOOR?",
      options: ["2334", "2314", "2344", "3214"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A man walks 5 km East, then 3 km North. How far is he from the start?",
      options: ["√34 km", "8 km", "√30 km", "6 km"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "In a row, Mohan is 15th from the left and 11th from the right. How many boys total?",
      options: ["23", "24", "25", "26"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "Find the missing: 4, 8, 24, 96, ?",
      options: ["288", "360", "480", "576"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "All dogs are animals. All animals have tails. Conclusion?",
      options: ["All animals are dogs", "All dogs have tails", "Some animals have no tails", "None of these"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "If PENCIL is coded as LICNEP, then PAPER is coded as?",
      options: ["REPAP", "RAPEP", "PRAPE", "REPPA"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "If ALL = 36 (A=1, L=12), then BALL = ?",
      options: ["38", "40", "50", "60"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "Which is the water image of the letter 'T'?",
      options: ["T upside down", "T mirrored left-right", "T unchanged", "Cannot determine"],
      answer: 0,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "Five friends A, B, C, D, E scored differently. B > D, A > B, C < D. Who scored the least?",
      options: ["B", "C", "D", "E"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A cube painted red on all faces is cut into 27 equal cubes. How many have exactly 2 faces painted?",
      options: ["8", "12", "16", "24"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "60% passed in Maths, 70% in English, 10% failed both. What % passed both?",
      options: ["30%", "35%", "40%", "45%"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Find next: 0, 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "14"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["0°", "7.5°", "15°", "22.5°"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "6 people sit at a round table. Number of distinct arrangements?",
      options: ["30", "60", "120", "720"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "If 1st January 2000 was Saturday, what day was 1st January 2001?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "All As are Bs. No Bs are Cs. Some Ds are Cs. Conclusion: No As are Cs?",
      options: ["True", "False", "Possibly", "Cannot determine"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "A snail climbs 3 ft per day and slips 2 ft per night in a 10 ft well. In how many days does it escape?",
      options: ["7", "8", "9", "10"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Statement: Some cats are dogs. All dogs are birds. Conclusion: Some cats are birds.",
      options: ["True", "False", "Cannot determine", "Partially true"],
      answer: 0,
      difficulty: "hard"
    }
  ],

  "Verbal Ability": [
    // ─── EASY ───
    {
      question: "Choose the synonym of 'Happy'",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Choose the antonym of 'Begin'",
      options: ["Start", "Open", "End", "Launch"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Fill in the blank: She is good ___ mathematics.",
      options: ["in", "on", "at", "with"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Identify the correctly spelled word:",
      options: ["Recieve", "Receive", "Receeve", "Receve"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Choose the synonym of 'Fast'",
      options: ["Quick", "Slow", "Late", "Weak"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "Choose the antonym of 'Strong'",
      options: ["Hard", "Powerful", "Weak", "Solid"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "Identify the noun in: 'The cat runs fast.'",
      options: ["cat", "runs", "fast", "the"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "Choose the correct plural of 'Child'",
      options: ["Childs", "Children", "Childrens", "Childes"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Fill in: He ___ to school every day.",
      options: ["go", "goes", "going", "gone"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Which word is an adjective?",
      options: ["Run", "Beautiful", "Quickly", "Sing"],
      answer: 1,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "Choose the synonym of 'Loquacious'",
      options: ["Quiet", "Talkative", "Dull", "Angry"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Identify the figure of speech: 'The wind whispered through the trees.'",
      options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "Choose the correctly punctuated sentence:",
      options: [
        "Its a beautiful day.",
        "It's a beautiful day.",
        "Its' a beautiful day.",
        "It,s a beautiful day."
      ],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Fill in: Neither the manager nor the employees ___ happy.",
      options: ["was", "is", "are", "were"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "Choose the antonym of 'Frugal'",
      options: ["Thrifty", "Economical", "Extravagant", "Careful"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "What does the idiom 'Bite the bullet' mean?",
      options: ["To eat fast", "To endure pain stoically", "To shoot a gun", "To argue"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Which sentence has correct subject-verb agreement?",
      options: [
        "The team are playing well.",
        "The team is playing well.",
        "The teams is playing well.",
        "The team were playing well."
      ],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Choose the word closest in meaning to 'Arduous':",
      options: ["Easy", "Difficult", "Interesting", "Beautiful"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Identify the passive voice:",
      options: [
        "She wrote the letter.",
        "The letter was written by her.",
        "She is writing the letter.",
        "She will write the letter."
      ],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Choose the correct word: The thief was ___ by the police.",
      options: ["apprehended", "comprehended", "represented", "presented"],
      answer: 0,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "The root word 'BENE' means:",
      options: ["Bad", "Well/Good", "Below", "Between"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Fill in: By the time we arrived, the show ___ already ___.",
      options: ["was / start", "had / started", "has / started", "is / started"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Identify the sentence with a dangling modifier:",
      options: [
        "Walking down the road, I saw a dog.",
        "Walking down the road, a dog bit me.",
        "I saw a dog walking down the road.",
        "A dog was walking down the road."
      ],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Choose the correct reported speech: He said, 'I will come tomorrow.'",
      options: [
        "He said that he will come the next day.",
        "He said that he would come the next day.",
        "He said that he came the next day.",
        "He told that he will come tomorrow."
      ],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Choose the synonym of 'Sanguine'",
      options: ["Pessimistic", "Indifferent", "Optimistic", "Furious"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Which word is spelled correctly?",
      options: ["Accomodation", "Acommodation", "Accommodation", "Acomodation"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "The phrase 'to burn the midnight oil' means:",
      options: ["To waste resources", "To work late into the night", "To start a fire", "To be angry"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Identify the tautology:",
      options: [
        "The meeting was brief.",
        "She is a young girl of 16 years old.",
        "He is tall and slim.",
        "They finished quickly."
      ],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Choose the antonym of 'Ephemeral'",
      options: ["Fleeting", "Temporary", "Permanent", "Short-lived"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Fill in: The jury ___ divided in their opinions.",
      options: ["was", "is", "are", "were"],
      answer: 2,
      difficulty: "hard"
    }
  ],

  "Probability": [
    // ─── EASY ───
    {
      question: "What is the probability of getting a head when tossing a fair coin?",
      options: ["0", "1/2", "1", "2"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "How many outcomes are possible when rolling a die?",
      options: ["5", "6", "7", "8"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What is the probability of a sure event?",
      options: ["0", "1", "1/2", "2"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What is the probability of an impossible event?",
      options: ["0", "1", "1/2", "-1"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "Probability value always lies between?",
      options: ["0 and 1", "1 and 2", "-1 and 1", "0 and 10"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "If two coins are tossed, how many outcomes are possible?",
      options: ["2", "3", "4", "6"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "What is the probability of getting 1 on a fair die?",
      options: ["1/6", "1/3", "1/2", "1"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "What is the probability of getting an even number on a die?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "A bag has 3 red balls and 2 blue. Probability of picking a red ball?",
      options: ["1/5", "2/5", "3/5", "4/5"],
      answer: 2,
      difficulty: "easy"
    },
    {
      question: "If a card is drawn from a deck, probability of a red card is?",
      options: ["1/4", "1/2", "3/4", "1"],
      answer: 1,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "Two dice are rolled. What is the probability that the sum is 7?",
      options: ["1/6", "5/36", "6/36", "7/36"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "A bag has 5 red, 3 blue and 2 green balls. Probability of not picking blue?",
      options: ["3/10", "7/10", "1/2", "2/5"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "A card is drawn from 52 cards. Probability of a king?",
      options: ["1/52", "1/13", "4/52", "Both B and C"],
      answer: 3,
      difficulty: "medium"
    },
    {
      question: "Three coins are tossed. Probability of exactly two heads?",
      options: ["1/8", "2/8", "3/8", "4/8"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "If P(A) = 0.4 and P(B) = 0.3 and A and B are independent, find P(A and B).",
      options: ["0.07", "0.10", "0.12", "0.70"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "From a deck, probability of drawing a spade or a king?",
      options: ["16/52", "17/52", "4/13", "Both A and C"],
      answer: 3,
      difficulty: "medium"
    },
    {
      question: "Two cards are drawn without replacement. P(both aces)?",
      options: ["1/221", "2/221", "4/221", "6/221"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A dice is rolled. P(number greater than 4)?",
      options: ["1/3", "1/2", "2/3", "1/6"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "If P(A) = 0.7, find P(A').",
      options: ["0.3", "0.7", "1", "0"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A class has 20 boys and 10 girls. Probability of selecting a boy?",
      options: ["1/3", "2/3", "1/2", "3/4"],
      answer: 1,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "In a group of 100, 60 speak Hindi, 40 English and 20 speak both. P(speaks only Hindi)?",
      options: ["0.4", "0.5", "0.6", "0.8"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "Bayes theorem is used for?",
      options: ["Finding sample space", "Conditional probability", "Independent events", "Mutually exclusive events"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A fair coin is tossed 4 times. P(at least one head)?",
      options: ["1/16", "14/16", "15/16", "8/16"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "A box has 3 defective and 7 good items. If 2 are drawn, P(both defective)?",
      options: ["1/15", "3/45", "6/90", "All are same"],
      answer: 3,
      difficulty: "hard"
    },
    {
      question: "If two events are mutually exclusive, P(A or B) = ?",
      options: ["P(A) × P(B)", "P(A) + P(B)", "P(A) + P(B) - P(A∩B)", "1"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Expected value of rolling a fair die is?",
      options: ["2.5", "3", "3.5", "4"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "P(A|B) = P(A∩B) / P(B). This defines?",
      options: ["Marginal probability", "Conditional probability", "Joint probability", "Complement"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A die is rolled 3 times. P(getting 6 exactly twice)?",
      options: ["5/72", "15/216", "25/216", "6/216"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Standard deviation of a probability distribution is?",
      options: ["E(X)", "√Var(X)", "Var(X)", "E(X²)"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "P(A∪B) = 0.8, P(A) = 0.5, P(B) = 0.5. Are A and B mutually exclusive?",
      options: ["Yes", "No", "Cannot determine", "Always"],
      answer: 1,
      difficulty: "hard"
    }
  ],

  "Time & Work": [
    // ─── EASY ───
    {
      question: "If A can do a work in 10 days, what is A's one day work?",
      options: ["1/5", "1/10", "10", "5"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If B can do a work in 5 days, how many days will B take to do half the work?",
      options: ["2", "2.5", "3", "5"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If A does a work in 4 days, what part does he complete in 1 day?",
      options: ["1/4", "1/2", "2", "4"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "Time and work are ____ proportional.",
      options: ["Directly", "Inversely", "Not related", "Equal"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Work = Rate × ?",
      options: ["Speed", "Time", "Distance", "Power"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If a man does work faster, time taken will?",
      options: ["Increase", "Decrease", "Same", "Double"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If A is twice as efficient as B, A will take?",
      options: ["Same time", "Half time", "Double time", "No time"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If work increases, time will?",
      options: ["Decrease", "Increase", "Remain same", "Become zero"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "A can do a piece of work in 6 days. In how many days will he finish 1/3 of work?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "If A completes work in 8 days, his efficiency (work/day) is?",
      options: ["1/4", "1/6", "1/8", "1/16"],
      answer: 2,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "A and B together can do a job in 6 days. A alone can do it in 10 days. B alone takes?",
      options: ["12 days", "15 days", "18 days", "20 days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "If 6 men complete a work in 10 days, how many days will 15 men take?",
      options: ["3 days", "4 days", "5 days", "6 days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Pipe A fills a tank in 10 hrs, pipe B empties it in 20 hrs. Net time to fill?",
      options: ["10 hrs", "20 hrs", "30 hrs", "15 hrs"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "20 men can do a work in 15 days. After 5 days, 5 more join. Days to complete remaining?",
      options: ["6 days", "8 days", "10 days", "12 days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "A does work in x days, B in y days. Together they take?",
      options: ["x+y days", "xy/(x+y) days", "(x+y)/xy days", "xy days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "A man, a woman, and a boy together complete in 3 days. Man alone in 6, Woman alone in 9 days. Boy alone?",
      options: ["12 days", "18 days", "24 days", "36 days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "A does 50% more work than B per day. If B finishes in 20 days, together they finish in?",
      options: ["8 days", "10 days", "12 days", "15 days"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A can do a work in 12 days, B in 16 days. Both work for 4 days then B leaves. A finishes in?",
      options: ["3 days", "4 days", "5 days", "6 days"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "A does 1/3 of work in 5 days. He completes it with B in 3 more days. B alone takes?",
      options: ["7.5 days", "9 days", "10 days", "12 days"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "A and B together do work in 18 days, B and C in 24 days, A and C in 36 days. A alone takes?",
      options: ["36 days", "48 days", "72 days", "96 days"],
      answer: 2,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "A and B do work in 12 and 16 days. They start together but A leaves 4 days before completion. Total days?",
      options: ["9 days", "9.6 days", "10 days", "11 days"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Two pipes fill a tank in 12 and 15 hours. A third drains it in 10 hrs. Time to fill with all open?",
      options: ["20 hrs", "60 hrs", "30 hrs", "Does not fill"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A alone does 70% work in 7 days, remaining done by B in 3 days. Together they finish in?",
      options: ["5 days", "6 days", "6.5 days", "7 days"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "10 men or 20 women can build a wall in 60 days. 8 men and 16 women together take?",
      options: ["50 days", "60 days", "75 days", "80 days"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "A and B do equal work in 15 and 20 days. Ratio of their daily efficiencies?",
      options: ["3:4", "4:3", "15:20", "20:15"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Pipe A fills 2/5 of a tank in 6 hrs. Pipe B fills the rest in 9 hrs. Time for both to fill full tank?",
      options: ["5 hrs", "6 hrs", "7 hrs", "8 hrs"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "A can do a piece of work in n days. After working for (n-5) days he is joined by B. Together they finish in 3 more days. If n=10, B alone takes?",
      options: ["6 days", "7.5 days", "8 days", "9 days"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A, B, C complete work in 24 days. A and B together do 40% in 8 days. C alone takes?",
      options: ["24 days", "30 days", "40 days", "60 days"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Three taps A, B, C fill a tank in 6, 8, 12 hours respectively. All open together, tank fills in?",
      options: ["2 hrs 30 min", "2 hrs 40 min", "3 hrs", "3 hrs 20 min"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "A works 8 hrs/day and finishes in 20 days. B works 10 hrs/day. Together they finish in 8 days. B alone (8 hrs/day) takes?",
      options: ["20 days", "25 days", "30 days", "40 days"],
      answer: 1,
      difficulty: "hard"
    }
  ],

  "Permutations & Combinations": [
    // ─── EASY ───
    {
      question: "How many ways can 3 objects be arranged?",
      options: ["3", "6", "9", "12"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What is 5!?",
      options: ["20", "60", "100", "120"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "What is 0! equal to?",
      options: ["0", "1", "Undefined", "Infinity"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "nC0 is equal to?",
      options: ["0", "1", "n", "n!"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "nP0 is equal to?",
      options: ["0", "1", "n", "n!"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What does combination deal with?",
      options: ["Order", "Selection", "Speed", "Time"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "Permutation considers?",
      options: ["Order", "Selection only", "Neither", "Counting"],
      answer: 0,
      difficulty: "easy"
    },
    {
      question: "What is the value of 4P2?",
      options: ["6", "8", "10", "12"],
      answer: 3,
      difficulty: "easy"
    },
    {
      question: "What is the value of 4C2?",
      options: ["4", "6", "8", "12"],
      answer: 1,
      difficulty: "easy"
    },
    {
      question: "What is 3! + 2!?",
      options: ["5", "7", "8", "10"],
      answer: 2,
      difficulty: "easy"
    },

    // ─── MEDIUM ───
    {
      question: "How many different 3-letter words can be formed from ABCDE (no repetition)?",
      options: ["10", "30", "60", "120"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "In how many ways can 5 people sit in a row?",
      options: ["60", "100", "120", "150"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "How many ways can a committee of 3 be chosen from 10 people?",
      options: ["60", "90", "120", "720"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "How many ways can letters of INDIA be arranged?",
      options: ["40", "60", "120", "240"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "From a group of 4 boys and 3 girls, how many ways to select 2 boys and 1 girl?",
      options: ["12", "18", "24", "36"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "What is 10C7?",
      options: ["90", "120", "150", "210"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "How many 4-digit numbers can be formed from digits 1–9 (no repetition)?",
      options: ["3024", "4536", "6561", "9000"],
      answer: 0,
      difficulty: "medium"
    },
    {
      question: "In how many ways can 3 prizes be given to 3 out of 7 students?",
      options: ["35", "105", "210", "840"],
      answer: 2,
      difficulty: "medium"
    },
    {
      question: "How many diagonals does a hexagon have?",
      options: ["6", "9", "12", "15"],
      answer: 1,
      difficulty: "medium"
    },
    {
      question: "Permutation is always ____ than or equal to combination for same n, r.",
      options: ["Smaller", "Equal", "Greater", "Unrelated"],
      answer: 2,
      difficulty: "medium"
    },

    // ─── HARD ───
    {
      question: "In how many ways can 5 boys and 5 girls sit alternately in a row?",
      options: ["14400", "28800", "72000", "86400"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "How many numbers between 100 and 1000 can be formed with digits 2, 3, 4, 0 (no repetition)?",
      options: ["9", "12", "18", "24"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "Coefficient of x³ in the expansion of (1+x)⁷?",
      options: ["21", "35", "42", "56"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "From 8 points on a circle, how many chords can be drawn?",
      options: ["16", "28", "36", "56"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "Total number of subsets of a set with 4 elements is?",
      options: ["8", "12", "16", "20"],
      answer: 2,
      difficulty: "hard"
    },
    {
      question: "How many ways can the letters of MATHEMATICS be arranged?",
      options: ["4989600", "9979200", "11!/8", "None of these"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "10 points, no 3 collinear. How many triangles can be formed?",
      options: ["100", "120", "150", "210"],
      answer: 1,
      difficulty: "hard"
    },
    {
      question: "How many ways can 6 different beads be arranged in a circular necklace (considering flips same)?",
      options: ["60", "120", "360", "720"],
      answer: 0,
      difficulty: "hard"
    },
    {
      question: "Number of ways to distribute 5 distinct balls into 3 distinct boxes (boxes can be empty)?",
      options: ["15", "27", "60", "243"],
      answer: 3,
      difficulty: "hard"
    },
    {
      question: "How many 5-digit numbers can be formed using 1, 2, 3, 4, 5 (no repetition) that are divisible by 4?",
      options: ["24", "30", "36", "48"],
      answer: 0,
      difficulty: "hard"
    }
  ]
};

export default aptitudeQuestions;