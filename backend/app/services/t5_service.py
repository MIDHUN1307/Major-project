from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("valhalla/t5-base-qg-hl")
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-base-qg-hl")

def generate_questions(chunk):
    input_text = "generate question: " + chunk

    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    #outputs = model.generate(inputs, max_length=64, num_beams=4, early_stopping=True)
    outputs = model.generate(
    inputs,
    max_length=64,
    num_beams=5,
    num_return_sequences=5,   # ✅ generate 5 questions
    early_stopping=True
)

  #  question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    questions = []

    for output in outputs:
        q = tokenizer.decode(output, skip_special_tokens=True)
        questions.append(q)

    return questions