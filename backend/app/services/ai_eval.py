def evaluate_hr_answer(answer: str):
    """
    AI logic for evaluating HR interview answers.
    This is a rule-based AI (can be upgraded to NLP / LLM later).
    """

    words = answer.lower().split()
    word_count = len(words)

    confidence_words = [
        "led", "managed", "developed", "created",
        "implemented", "handled", "improved"
    ]

    confidence_score = sum(1 for w in words if w in confidence_words)

    # Base scoring logic
    score = 5

    if word_count > 40:
        score += 2
    if confidence_score >= 2:
        score += 1
    if word_count < 15:
        score -= 2

    # Keep score in range 0–10
    score = max(0, min(score, 10))

    # Feedback logic
    if score <= 4:
        feedback = "Your answer needs improvement. Try to be more clear and detailed."
        suggestions = [
            "Expand your explanation",
            "Give a real example",
            "Use confident action words"
        ]
    elif score <= 7:
        feedback = "Good answer, but there is room for improvement."
        suggestions = [
            "Sound more confident",
            "Structure your answer better"
        ]
    else:
        feedback = "Excellent answer! You communicated your thoughts clearly."
        suggestions = [
            "Maintain this confidence",
            "Continue using real examples"
        ]

    return {
        "score": score,
        "feedback": feedback,
        "suggestions": suggestions
    }
