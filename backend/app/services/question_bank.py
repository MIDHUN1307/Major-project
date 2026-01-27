import random

HR_QUESTIONS = {
    "easy": [
        "Tell me about yourself.",
        "What are your strengths?",
        "Why should we hire you?"
    ],
    "medium": [
        "Describe a challenge you faced and how you handled it.",
        "How do you handle pressure or deadlines?",
        "Tell me about a time you worked in a team."
    ],
    "hard": [
        "Describe a failure and what you learned from it.",
        "How do you handle conflict in a team?",
        "Where do you see yourself in five years?"
    ]
}

def get_hr_question(level: str = "easy"):
    """
    Returns a random HR question based on difficulty level.
    """
    questions = HR_QUESTIONS.get(level, HR_QUESTIONS["easy"])
    return random.choice(questions)
