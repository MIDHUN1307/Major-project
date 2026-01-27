import pandas as pd
from transformers import BertTokenizer

# Path to dataset
DATA_PATH = "data/hr_answers.csv"

# Load dataset
df = pd.read_csv(DATA_PATH)

print("✅ Dataset loaded")
print("Total rows:", len(df))

# Combine question and answer into one text
df["text"] = df["question"] + " [SEP] " + df["answer"]

texts = df["text"].tolist()
labels = df["label"].tolist()

print("✅ Text & labels prepared")

# Load BERT tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Tokenize text
encodings = tokenizer(
    texts,
    truncation=True,
    padding=True,
    max_length=128
)

print("✅ Tokenization complete")
print("Example tokenized input length:", len(encodings["input_ids"][0]))
