import ollama
import json


def generate_interview_recommendation(answers):
    """
    Generate a professional interview summary based on all answers.
    Also calculate overall scores.
    """

    if not answers:
        return {
            "overall_summary": "No interview answers available.",
            "key_strengths": [],
            "areas_for_improvement": [],
            "ai_recommendation": "",
            "final_score": 0,
            "voice_confidence": 0,
            "content_score": 0
        }

    # ----------------------------------
    # Calculate average scores
    # ----------------------------------

    total = len(answers)

    final_score = sum(a["scores"]["final_confidence"] for a in answers) / total
    voice_confidence = sum(a["scores"]["voice_confidence"] for a in answers) / total
    content_score = sum(a["scores"]["content_score"] for a in answers) / total

    # ----------------------------------
    # Prepare interview text
    # ----------------------------------

    answers_text = ""

    for i, ans in enumerate(answers, start=1):
        answers_text += f"""
Question {i}: {ans['question']}
Answer: {ans['transcript']}
Score: {ans['scores']['final_confidence']}
"""

    # ----------------------------------
    # LLM Prompt
    # ----------------------------------

    prompt = f"""
You are an expert AI interview coach.

Analyze the candidate's interview performance.

Interview Answers:
{answers_text}

Generate a professional interview evaluation.

Return JSON in this format:

{{
 "overall_summary": "",
 "key_strengths": ["", "", ""],
 "areas_for_improvement": ["", "", ""],
 "ai_recommendation": ""
}}
"""

    try:

        response = ollama.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response["message"]["content"]

        parsed = json.loads(content)

        # attach calculated scores
        parsed["final_score"] = round(final_score)
        parsed["voice_confidence"] = round(voice_confidence)
        parsed["content_score"] = round(content_score)

        return parsed

    except Exception as e:

        return {
            "overall_summary": "AI evaluation failed.",
            "key_strengths": [],
            "areas_for_improvement": [],
            "ai_recommendation": "",
            "final_score": round(final_score),
            "voice_confidence": round(voice_confidence),
            "content_score": round(content_score)
        }