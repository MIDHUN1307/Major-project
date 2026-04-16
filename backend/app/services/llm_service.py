import ollama
import json


def evaluate_with_llm(question: str, transcript: str):
    """
    Sends question and transcript to Mistral via Ollama.
    Returns structured evaluation JSON.
    Strict relevance-aware evaluation.
    """

    prompt = f"""
You are a strict and professional technical interview evaluator.

Your evaluation must prioritize RELEVANCE above all else.

Question:
{question}

Candidate Answer:
{transcript}

First, determine:
0. Relevance to the question (0-100)

IMPORTANT RULES:
- If the answer is not directly relevant to the question,
  relevance must be below 40.
- If relevance is below 40,
  overall_score MUST be below 30,
  regardless of clarity or grammar quality.
- Do NOT reward well-written but unrelated answers.

Then evaluate:

1. Technical correctness (0-100)
2. Clarity (0-100)
3. Completeness (0-100)
4. Communication quality (0-100)

Scoring Logic:
- overall_score should be a realistic professional judgment.
- Relevance should strongly influence overall_score.
- An unrelated but fluent answer must score low.
- A short but correct answer can score high if technically accurate.

Return ONLY valid JSON in this exact format:

{{
  "relevance_score": 0,
  "technical_score": 0,
  "clarity_score": 0,
  "completeness_score": 0,
  "communication_score": 0,
  "overall_score": 0,
  "strengths": "",
  "improvements": "",
  "suggested_followup_question": ""
}}
"""

    try:
        response = ollama.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}],
        )

        content = response["message"]["content"]

        parsed = json.loads(content)

        return parsed

    except Exception as e:
        return {
            "relevance_score": 0,
            "technical_score": 0,
            "clarity_score": 0,
            "completeness_score": 0,
            "communication_score": 0,
            "overall_score": 0,
            "strengths": "Evaluation failed.",
            "improvements": "Could not analyze answer.",
            "suggested_followup_question": ""
        }