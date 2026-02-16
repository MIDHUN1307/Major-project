import os
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from sentence_transformers import SentenceTransformer, util

# ---------------------------
# Configuration
# ---------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "bert_hr_model")
MAX_LENGTH = 128

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------------------------
# Load tokenizer & model
# ---------------------------
tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
model = BertForSequenceClassification.from_pretrained(MODEL_PATH)
model.to(device)
model.eval()

# -------- NEW (for correctness check) --------
sbert_model = SentenceTransformer("all-MiniLM-L6-v2")

label_map = {
    0: "Poor Answer",
    1: "Average Answer",
    2: "Good Answer"
}

# ---------------------------
# HARD SKIP CHECK (ABSOLUTE)
# ---------------------------
def hard_skip_check(answer):
    answer = answer.lower().strip()

    skip_patterns = [
        "i don't know",
        "dont know",
        "do not know",
        "no idea",
        "not sure"
    ]

    for pattern in skip_patterns:
        if pattern in answer:
            return True

    return False

# ---------------------------
# BASIC VALIDITY CHECK
# ---------------------------
def basic_validity_check(answer):
    answer = answer.lower().strip()

    if len(answer) < 15:
        return False, "Your answer is too short. Please explain in more detail."

    return True, ""

# ---------------------------
# CORRECTNESS CHECK (NEW)
# ---------------------------
def is_answer_correct(question, answer, threshold=0.45):
    q_emb = sbert_model.encode(question, convert_to_tensor=True)
    a_emb = sbert_model.encode(answer, convert_to_tensor=True)

    similarity = util.cos_sim(q_emb, a_emb).item()
    return similarity >= threshold, round(similarity * 100, 2)

# ---------------------------
# Prediction function
# ---------------------------
def predict_answer(question, answer):

    # STEP 1: HARD SKIP CHECK
    if hard_skip_check(answer):
        return {
            "label": "Poor Answer",
            "confidence": 0,
            "feedback": "Please try to answer the question instead of saying you don't know."
        }

    # STEP 2: BASIC VALIDITY CHECK
    valid, message = basic_validity_check(answer)
    if not valid:
        return {
            "label": "Poor Answer",
            "confidence": 0,
            "feedback": message
        }

    # STEP 3: CORRECTNESS CHECK (NEW)
    is_correct, similarity_score = is_answer_correct(question, answer)
    if not is_correct:
        return {
            "label": "Incorrect Answer",
            "confidence": similarity_score,
            "feedback": "Your answer is not relevant to the question. Please focus on what is being asked."
        }

    # STEP 4: BERT QUALITY EVALUATION
    text = question + " [SEP] " + answer

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=MAX_LENGTH
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)

    predicted_label = torch.argmax(outputs.logits, dim=1).item()

    return {
        "label": label_map[predicted_label],
        "confidence": None,   # unchanged
        "feedback": None
    }

# ---------------------------
# Test prediction (manual)
# ---------------------------
if __name__ == "__main__":
    q = "What are your strengths?"
    a = "Actually, I don't know the answer."

    result = predict_answer(q, a)
    print(result)
