def generate_coaching_feedback(
    semantic_confidence: int,
    final_confidence: int,
    voice_score: float,
    fluency: float,
    emotion_scores: dict,
    content_feedback: dict
):
    """
    This function INTERPRETS already calculated scores
    and generates structured feedback.
    It does NOT calculate any ML scores.
    """

    # Start with content-based strength and growth areas
    strength = content_feedback.get("strength")
    growth_areas = content_feedback.get("growth_areas", []).copy()

    # -------------------------------
    # Delivery-based suggestions
    # -------------------------------

    # 1️⃣ Hesitant tone
    if voice_score < 0.5:
        growth_areas.append(
            "Your tone sounds slightly hesitant. Try speaking with steadier energy."
        )

    # 2️⃣ Too many filler words
    if fluency < 0.7:
        growth_areas.append(
            "You used multiple filler words. Practice pausing instead of using fillers."
        )

    # 3️⃣ Nervous emotion detected
    if emotion_scores.get("fear", 0) > 0.3:
        growth_areas.append(
            "There are signs of nervousness in your voice. Take a breath before key points."
        )

    # 4️⃣ Weak content relevance
    if semantic_confidence < 60:
        growth_areas.append(
            "Your answer partially addresses the question. Add clearer examples with measurable results."
        )

    # 5️⃣ High performance reinforcement
    if final_confidence > 80:
        growth_areas = [
            "Strong performance overall. Continue maintaining clarity and confident delivery."
        ]

    # Limit to top 2 suggestions
    growth_areas = growth_areas[:2]

    return {
        "strength": strength,
        "growth_areas": growth_areas
    }
