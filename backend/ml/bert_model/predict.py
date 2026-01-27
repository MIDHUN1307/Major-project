import os
import torch
from transformers import BertTokenizer, BertForSequenceClassification

# ---------------------------
# Configuration (FIXED)
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

label_map = {
    0: "Poor Answer",
    1: "Average Answer",
    2: "Good Answer"
}

# ---------------------------
# Prediction function
# ---------------------------
def predict_answer(question, answer):
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

    return label_map[predicted_label]

# ---------------------------
# Test prediction (manual)
# ---------------------------
if __name__ == "__main__":
    q = "What are your strengths?"
    a = "I don't know."

    result = predict_answer(q, a)
    print("Prediction:", result)
