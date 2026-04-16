from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import ollama

model = SentenceTransformer('all-MiniLM-L6-v2')

def evaluate_answer(question, answer):

    q_vec = model.encode([question])
    a_vec = model.encode([answer])

    similarity = cosine_similarity(q_vec, a_vec)[0][0]

    # LLM Evaluation
    prompt = f"""
    Evaluate this answer.

    Question: {question}
    Answer: {answer}

    Give:
    - score (0-100)
    - strengths
    - improvements
    """

    response = ollama.chat(model="mistral", messages=[
        {"role": "user", "content": prompt}
    ])

    return {
        "similarity": float(similarity),
        "llm_feedback": response["message"]["content"]
    }