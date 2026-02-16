from fastapi import APIRouter, UploadFile, File, Form
import os
import shutil
import uuid

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# ✅ Your existing imports
from routes.transcribe import transcribe_audio_file
from emotion.emotion_service import detect_emotion
from scoring.confidence_engine import (
    voice_confidence_score,
    fluency_score,
    final_confidence_score
)

router = APIRouter()

# ✅ Load BERT model once
bert_model = SentenceTransformer("all-MiniLM-L6-v2")


@router.post("/speech/evaluate")
async def evaluate_speech(
    question: str = Form(...),
    audio: UploadFile = File(...)
):
    os.makedirs("temp", exist_ok=True)

    # 🔹 Safe unique filename
    extension = ".wav"
    if audio.filename and "." in audio.filename:
        extension = "." + audio.filename.split(".")[-1]

    audio_path = f"temp/{uuid.uuid4()}{extension}"

    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    # ===============================
    # 1️⃣ Transcription
    # ===============================
    transcript = transcribe_audio_file(audio_path)

    # ===============================
    # 2️⃣ Emotion Detection
    # ===============================
    emotion_scores = detect_emotion(audio_path)

    # ===============================
    # 3️⃣ Voice Confidence
    # ===============================
    voice_score = voice_confidence_score(emotion_scores)
    fluency = fluency_score(transcript)
    audio_confidence = final_confidence_score(voice_score, fluency)

    # ===============================
    # 4️⃣ Semantic Confidence (BERT)
    # ===============================
    embeddings = bert_model.encode([question, transcript])
    similarity = float(
        cosine_similarity(
            embeddings[0].reshape(1, -1),
            embeddings[1].reshape(1, -1)
        )[0][0]
    )

    semantic_confidence = int(similarity * 100)

    # ===============================
    # 5️⃣ Final Combined Confidence
    # ===============================
    final_confidence = int(
        0.6 * semantic_confidence +
        0.4 * audio_confidence
    )

    final_confidence = max(0, min(final_confidence, 100))

    return {
        "transcript": transcript,
        "emotion_scores": emotion_scores,
        "audio_confidence": audio_confidence,
        "semantic_confidence": semantic_confidence,
        "confidence": final_confidence
    }
