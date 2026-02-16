from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# ✅ Correct imports based on your folder structure
from routes.transcribe import router as transcribe_router
from routes.evaluate import router as evaluate_router
from routes.audio_confidence import router as audio_confidence_router

# Import ML prediction function
from ml.bert_model.predict import predict_answer

app = FastAPI(title="AI Interview Evaluation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Register routers
# ---------------------------
app.include_router(transcribe_router)
app.include_router(evaluate_router)
app.include_router(audio_confidence_router)

# ---------------------------
# Request body structure
# ---------------------------
class AnswerRequest(BaseModel):
    question: str
    answer: str

# ---------------------------
# Health check
# ---------------------------
@app.get("/")
def root():
    return {"message": "Backend is running"}

# ---------------------------
# HR Answer Evaluation API
# ---------------------------
@app.post("/evaluate/hr")
def evaluate_hr_answer(data: AnswerRequest):
    result = predict_answer(data.question, data.answer)
    return {
        "question": data.question,
        "answer": data.answer,
        "evaluation": result
    }
