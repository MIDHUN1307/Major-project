from transformers import BertTokenizer, BertModel

# Load tokenizer (converts text → numbers)
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Load BERT model (the brain)
model = BertModel.from_pretrained("bert-base-uncased")

# Test sentence
text = "I am a quick learner and I enjoy teamwork"

# Convert text to BERT format
inputs = tokenizer(text, return_tensors="pt")

# Pass text to BERT
outputs = model(**inputs)

print("BERT loaded successfully!")
print("Output shape:", outputs.last_hidden_state.shape)
