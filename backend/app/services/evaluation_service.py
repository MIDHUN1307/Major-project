import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import ollama

model = SentenceTransformer('all-MiniLM-L6-v2')

def evaluate_answer(question, answer):

    q_vec = model.encode([question])
    a_vec = model.encode([answer])

    similarity = cosine_similarity(q_vec, a_vec)[0][0]

    # LLM Evaluation with stricter formatting
    prompt = f"""
    Evaluate this answer. If the answer is irrelevant, short, or generic, the score should be low or 0.

    Question: {question}
    Answer: {answer}

    Give your response in this EXACT format:
    Score: [0-100]
    Strengths: [strengths or 'None']
    Improvements: [detailed suggestions]
    """

    response = ollama.chat(model="mistral", messages=[
        {"role": "user", "content": prompt}
    ])

    llm_output = response["message"]["content"]
    
    # Extract numerical score from the LLM output
    score_match = re.search(r"Score:\s*(\d+)", llm_output)
    llm_score = int(score_match.group(1)) if score_match else int(similarity * 100)

    return {
        "similarity": float(similarity),
        "llm_score": llm_score,
        "llm_feedback": llm_output
    }