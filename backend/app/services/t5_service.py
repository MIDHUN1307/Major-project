from transformers import T5Tokenizer, T5ForConditionalGeneration
import os
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../models/t5-finetuned")

tokenizer = T5Tokenizer.from_pretrained(MODEL_PATH)
model = T5ForConditionalGeneration.from_pretrained(MODEL_PATH)

def generate_questions(chunk):
    input_text = "generate question: " + chunk

    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    #outputs = model.generate(inputs, max_length=64, num_beams=4, early_stopping=True)
    outputs = model.generate(
    # inputs,
    # max_length=64,
    # num_beams=5,
    # num_return_sequences=5,   # ✅ generate 5 questions
    # early_stopping=True
      inputs,
    max_length=64,
    do_sample=True,          #  enables randomness
    top_k=50,                # pick from top 50 words
    top_p=0.95,              # nucleus sampling
    temperature=0.7,         # controls randomness
    num_return_sequences=5
)

  #  question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    questions = []

    for output in outputs:
        q = tokenizer.decode(output, skip_special_tokens=True)
        questions.append(q)

    return questions