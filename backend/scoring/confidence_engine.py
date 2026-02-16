# backend/app/scoring/confidence_engine.py

def voice_confidence_score(emotion_scores: dict) -> float:
    """
    Convert emotion probabilities into a voice-based confidence score (0.0 – 1.0)
    """

    positive = (
        emotion_scores.get("neutral", 0.0) * 0.6 +
        emotion_scores.get("happy", 0.0) * 0.4
    )

    negative = (
        emotion_scores.get("fear", 0.0) * 0.6 +
        emotion_scores.get("sad", 0.0) * 
        0.3 +
        emotion_scores.get("angry", 0.0) * 0.1
    )

    score = positive - negative
    return max(0.0, min(score, 1.0))


def fluency_score(transcript: str) -> float:
    """
    Compute fluency score based on filler word density.
    Returns a value between 0.0 and 1.0
    """

    fillers = ["uh", "um", "uhm", "hmm", "you know", "like", "actually"]

    text = transcript.lower()
    words = text.split()
    total_words = len(words)

    if total_words == 0:
        return 0.0

    filler_count = 0
    for filler in fillers:
        filler_count += text.count(filler)

    ratio = filler_count / total_words

    if ratio < 0.05:
        return 1.0
    elif ratio < 0.10:
        return 0.7
    else:
        return 0.4


def final_confidence_score(voice_score: float, fluency: float) -> int:
    """
    Combine voice confidence and fluency into final confidence (0–100)
    """
    final = (0.6 * voice_score) + (0.4 * fluency)
    return int(final * 100)
