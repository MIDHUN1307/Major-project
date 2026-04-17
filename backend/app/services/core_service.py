from pypdf import PdfReader
import uuid
from app.services.t5_service import generate_questions

# 🔹 Step 2
def extract_text(file_path):
    reader = PdfReader(file_path)
    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text


# 🔹 Step 3
def chunk_text(text, chunk_size=500):
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size):
        chunks.append(" ".join(words[i:i+chunk_size]))

    return chunks


# 🔹 Step 5 (MAIN PIPELINE)
async def process_pdf(file):
    temp_path = f"temp/{uuid.uuid4()}.pdf"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    text = extract_text(temp_path)
    chunks = chunk_text(text)

    questions = []

    for chunk in chunks[:3]:   # limit chunks (faster + cleaner)
        q = generate_questions(chunk)
        questions.extend(q)   # ✅ FIXED

    questions = list(set(questions))  # optional dedup

    return {"questions": questions[:5]}  # ✅ only 5