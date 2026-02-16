def extract_quality_signals(answer: str):

    answer_lower = answer.lower()
    words = answer_lower.split()
    word_count = len(words)

    # Action / confidence-oriented verbs
    confidence_words = {
        "led", "managed", "developed", "created",
        "implemented", "handled", "improved",
        "designed", "built", "optimized"
    }

    confidence_hits = sum(1 for w in words if w in confidence_words)

    # ---- Signal extraction ----

    # Clarity: based on minimum explanation length
    if word_count < 20:
        clarity = "low"
    elif word_count < 40:
        clarity = "medium"
    else:
        clarity = "high"

    # Structure: rough heuristic based on length & flow
    if word_count < 30:
        structure = "weak"
    else:
        structure = "ok"

    # Confidence tone: based on action verbs
    if confidence_hits == 0:
        confidence_tone = "hesitant"
    elif confidence_hits == 1:
        confidence_tone = "neutral"
    else:
        confidence_tone = "confident"

    return {
        "word_count": word_count,
        "clarity": clarity,
        "structure": structure,
        "confidence_tone": confidence_tone
    }
