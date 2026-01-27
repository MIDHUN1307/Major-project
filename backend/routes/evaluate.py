from fastapi import APIRouter
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

# Load BERT-based sentence model ONCE
bert_model = SentenceTransformer("all-MiniLM-L6-v2")

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

    # 4️⃣ Fluency score
    fluency = 80

    # 5️⃣ Final confidence score
    confidence = int(
        0.5 * relevance_score +
        0.3 * completeness +
        0.2 * fluency
    )
    confidence = max(0, min(confidence, 100))

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

    # 6️⃣ Suggestions (enhanced)
    suggestions = []

    # Relevance-based
    if relevance_score < 40:
        suggestions.append("Your answer is weakly related to the question. Try to focus more on what is being asked.")
    elif relevance_score < 60:
        suggestions.append("Try to align your answer more closely with the question.")

    # Length-based
    if word_count < 15:
        suggestions.append("Your answer is too short. Try to elaborate with more details.")
    elif word_count < 30:
        suggestions.append("You can improve your answer by adding more explanation.")

    # Content quality
    if "experience" not in answer_lower:
        suggestions.append("Consider mentioning relevant experience or projects.")

    if "skill" not in answer_lower and "skills" not in answer_lower:
        suggestions.append("You may include key skills related to the role.")

    # Role-based
    if role == "backend":
        suggestions.append("Mention backend technologies such as APIs, databases, or server-side logic.")
    elif role == "frontend":
        suggestions.append("You can highlight UI frameworks, responsiveness, or user experience aspects.")
    elif role == "ai":
        suggestions.append("Consider mentioning datasets, models, or evaluation metrics you have worked with.")
    else:
        suggestions.append("Try to align your answer with the role you are applying for.")

    # Sentiment-based
    if negative_count > 0:
        suggestions.append("Try to use more confident and positive language while answering.")
    elif positive_count == 0:
        suggestions.append("You can make your answer more impactful by using confident and assertive language.")
    else:
        suggestions.append("Your positive tone adds confidence to your answer.")

    # Always add structure advice
    suggestions.append("Maintain a clear and well-structured flow while answering.")

    return {
        "confidence": confidence,
        "relevance_score": round(relevance_score, 2),
        "word_count": word_count,
        "suggestions": suggestions
    }
