import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import (
    BertTokenizer,
    BertForSequenceClassification,
)
from torch.optim import AdamW

# ---------------------------
# Configuration (SAFE VALUES)
# ---------------------------
MODEL_NAME = "bert-base-uncased"
DATA_PATH = "data/hr_answers.csv"
OUTPUT_DIR = "model/bert_hr_model"
MAX_LENGTH = 128
BATCH_SIZE = 8        # small = laptop safe
EPOCHS = 2            # enough for project
LEARNING_RATE = 2e-5

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

# ---------------------------
# Load dataset
# ---------------------------
df = pd.read_csv(DATA_PATH)

texts = (df["question"] + " [SEP] " + df["answer"]).tolist()
labels = df["label"].tolist()

# ---------------------------
# Tokenizer
# ---------------------------
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)

encodings = tokenizer(
    texts,
    truncation=True,
    padding=True,
    max_length=MAX_LENGTH
)

# ---------------------------
# Custom Dataset
# ---------------------------
class HRDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

dataset = HRDataset(encodings, labels)
dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)

# ---------------------------
# Model
# ---------------------------
model = BertForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=3
)
model.to(device)

optimizer = AdamW(model.parameters(), lr=LEARNING_RATE)

# ---------------------------
# Training loop
# ---------------------------
model.train()

for epoch in range(EPOCHS):
    print(f"\nEpoch {epoch + 1}/{EPOCHS}")
    total_loss = 0

    for batch in dataloader:
        optimizer.zero_grad()

        batch = {k: v.to(device) for k, v in batch.items()}

        outputs = model(**batch)
        loss = outputs.loss
        total_loss += loss.item()

        loss.backward()
        optimizer.step()

    avg_loss = total_loss / len(dataloader)
    print("Average loss:", round(avg_loss, 4))

# ---------------------------
# Save model
# ---------------------------
model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print("\n✅ Training complete")
print(f"💾 Model saved to: {OUTPUT_DIR}")
