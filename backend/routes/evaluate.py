from fastapi import APIRouter
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.services.ai_eval import extract_quality_signals


router = APIRouter()

# Load BERT-based sentence model ONCE
bert_model = SentenceTransformer("all-MiniLM-L6-v2")

# 🔹 Relevance thresholds
RELEVANCE_HARD_CUTOFF = 15    # Completely irrelevant
RELEVANCE_SOFT_CUTOFF = 40    # Weak relevance


class EvaluateRequest(BaseModel):
    question: str
    answer: str


@router.post("/hr/evaluate")
def evaluate_answer(data: EvaluateRequest):
    question = data.question.strip()
    answer = data.answer.strip()

    question_lower = question.lower()
    answer_lower = answer.lower()

    # 1️⃣ Generate embeddings using BERT
    embeddings = bert_model.encode([question, answer])
    question_vec = embeddings[0].reshape(1, -1)
    answer_vec = embeddings[1].reshape(1, -1)

    # 2️⃣ Semantic relevance
    similarity = float(cosine_similarity(question_vec, answer_vec)[0][0])
    relevance_score = similarity * 100

    # 3️⃣ Completeness score
    word_count = len(answer.split())
    if word_count < 20:
        completeness = 40
    elif word_count < 40:
        completeness = 65
    else:
        completeness = 85

    # 🚫 HARD RELEVANCE GATE
    if relevance_score < RELEVANCE_HARD_CUTOFF:
        return {
            "confidence": 0,
            "relevance_score": round(relevance_score, 2),
            "word_count": word_count,
            "strength": "You attempted to answer the question.",
            "growth_areas": [
                "Your answer is not relevant to the question. Try directly addressing what the interviewer is asking."
            ]
        }

    # 4️⃣ Fluency score
    fluency = 80 if relevance_score >= RELEVANCE_SOFT_CUTOFF else 20

    # 5️⃣ Base confidence score
    confidence = int(
        0.5 * relevance_score +
        0.3 * completeness +
        0.2 * fluency
    )
    confidence = max(0, min(confidence, 100))

    # 🔻 SOFT RELEVANCE SCALING
    if relevance_score < RELEVANCE_SOFT_CUTOFF:
        confidence = int(confidence * (relevance_score / RELEVANCE_SOFT_CUTOFF))

    # 🔍 Role detection
    role = "general"
    if any(k in answer_lower or k in question_lower for k in ["backend", "api", "server", "fastapi"]):
        role = "backend"
    elif any(k in answer_lower or k in question_lower for k in ["frontend", "react", "ui", "ux"]):
        role = "frontend"
    elif any(k in answer_lower or k in question_lower for k in ["ai", "ml", "machine learning", "data"]):
        role = "ai"

    # 😊 Sentiment detection
    positive_words = ["confident", "strong", "excited", "passionate", "motivated", "interested"]
    negative_words = ["nervous", "weak", "confused", "unsure", "difficult"]

    positive_count = sum(word in answer_lower for word in positive_words)
    negative_count = sum(word in answer_lower for word in negative_words)

    # 6️⃣ Quality signals
    signals = extract_quality_signals(answer)

    strengths = []
    growth_areas = []

    # ---- Strengths (realistic & human) ----
    if relevance_score >= 70:
        strengths.append(
            "You addressed the question clearly and stayed focused on the main topic."
        )
    elif relevance_score >= 60:
        strengths.append(
            "Your answer generally relates to the question and shows understanding of the topic."
        )

    if positive_count > 0:
        strengths.append(
            "Your tone sounds positive and engaged, which creates a good impression in an interview."
        )

    if signals["confidence_tone"] == "confident":
        strengths.append(
            "You used action-oriented language, which reflects confidence in your abilities."
        )

    if word_count >= 40:
        strengths.append(
            "You provided a reasonably detailed response, helping the interviewer understand your thought process."
        )

    # ---- Growth Areas (coach-style, Yoodli-like) ----
    if relevance_score < 60:
        growth_areas.append(
            "Some parts of your answer drift away from the question. Try directly addressing what the interviewer is asking before adding extra details."
        )

    if signals["clarity"] == "low":
        growth_areas.append(
            "Your response feels brief. Consider explaining what you did, why you did it, and what the outcome was."
        )

    if signals["structure"] == "weak":
        growth_areas.append(
            "Structuring your answer using the Situation–Action–Result approach would make it easier to follow."
        )

    if "experience" not in answer_lower and "project" not in answer_lower:
        growth_areas.append(
            "Including a short example from a real project or experience would make your answer more convincing."
        )

    if "result" not in answer_lower and "outcome" not in answer_lower and "impact" not in answer_lower:
        growth_areas.append(
            "Try mentioning the outcome or impact of your work so the interviewer understands the value you added."
        )

    if "skill" not in answer_lower and "skills" not in answer_lower:
        growth_areas.append(
            "Explicitly mentioning the skills you used can strengthen your answer."
        )

    # ---- Role-specific coaching ----
    if role == "backend":
        growth_areas.append(
            "For backend roles, interviewers often expect clarity around APIs, databases, or system design—consider briefly mentioning these."
        )
    elif role == "frontend":
        growth_areas.append(
            "For frontend roles, highlighting UI decisions, responsiveness, or user experience improvements can improve your answer."
        )
    elif role == "ai":
        growth_areas.append(
            "For AI-related roles, mentioning the dataset, model choice, or evaluation metrics would make your response stronger."
        )

    if signals["confidence_tone"] == "hesitant":
        growth_areas.append(
            "Your language sounds slightly hesitant. Try using more assertive phrasing to clearly state your role and contributions."
        )

    # ---- Limit output ----
    strength = strengths[0] if strengths else "You made a reasonable attempt to answer the question."
    growth_areas = growth_areas[:2]

    return {
        "confidence": confidence,
        "relevance_score": round(relevance_score, 2),
        "word_count": word_count,
        "strength": strength,
        "growth_areas": growth_areas
    }
