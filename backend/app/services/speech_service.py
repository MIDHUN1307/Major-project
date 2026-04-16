import os
import shutil
import uuid
import subprocess

from app.services.transcription_service import transcribe_audio_file
from emotion.emotion_service import detect_emotion
from scoring.confidence_engine import final_confidence_score
from app.services.llm_service import evaluate_with_llm

from app.services.recommendation_service import generate_interview_recommendation

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

#  Load MiniLM once (IMPORTANT)
bert_model = SentenceTransformer("all-MiniLM-L6-v2")


def evaluate_speech_pipeline(question: str, audio_file):

    os.makedirs("temp", exist_ok=True)

    # -------------------------------
    # 1️⃣ Save file
    # -------------------------------
    extension = ".webm"
    if audio_file.filename and "." in audio_file.filename:
        extension = "." + audio_file.filename.split(".")[-1]

    original_path = f"temp/{uuid.uuid4()}{extension}"

    with open(original_path, "wb") as buffer:
        shutil.copyfileobj(audio_file.file, buffer)

    # -------------------------------
    # 2️⃣ Convert to WAV
    # -------------------------------
    audio_path = original_path.replace(extension, ".wav")

    subprocess.run(
        ["ffmpeg", "-y", "-i", original_path, audio_path],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    # -------------------------------
    # 3️⃣ Transcribe
    # -------------------------------
    transcript = transcribe_audio_file(audio_path)

    # -------------------------------
    # 4️⃣ Emotion → Voice Confidence
    # -------------------------------
    emotion_scores = detect_emotion(audio_path)

    voice_confidence = final_confidence_score(
        emotion_scores,
        transcript,
        audio_path
    )

    voice_confidence = max(0, min(voice_confidence, 100))

    # =====================================================
    #  5️⃣ HARD NON-ANSWER GATE
    # =====================================================
    transcript_lower = transcript.lower().strip()
    word_count = len(transcript_lower.split())

    non_answer_patterns = [
        "i don't know",
        "i dont know",
        "no idea",
        "not sure",
        "cannot answer",
        "can't answer",
        "dont remember",
        "do not remember",
        "sorry"
    ]

    contains_non_answer_phrase = any(
        pattern in transcript_lower for pattern in non_answer_patterns
    )

    if word_count < 10 and contains_non_answer_phrase:

        try:
            os.remove(original_path)
            os.remove(audio_path)
        except:
            pass

        return {
            "transcript": transcript,
            "scores": {
                "final_confidence": 5,
                "voice_confidence": voice_confidence,
                "content_score": 5,
                "technical_score": 0,
                "clarity_score": 0,
                "completeness_score": 0,
                "communication_score": 0
            },
            "feedback": {
                "strengths": "You were honest in your response.",
                "improvements": "Try attempting the question by reasoning through it or explaining related knowledge."
            },
            "adaptive": {
                "follow_up_question": "",
                "should_follow_up": False
            }
        }

    # =====================================================
    # 6️⃣ SEMANTIC RELEVANCE (Soft Influence)
    # =====================================================
    embeddings = bert_model.encode([question, transcript])
    question_vec = embeddings[0].reshape(1, -1)
    answer_vec = embeddings[1].reshape(1, -1)

    similarity = float(
        cosine_similarity(question_vec, answer_vec)[0][0]
    )

    semantic_score = similarity * 100

    # Normalize semantic influence (avoid domination)
    semantic_weighted = semantic_score * 0.5

    # =====================================================
    # 7️⃣ LLM Evaluation
    # =====================================================
    llm_result = evaluate_with_llm(question, transcript)

    llm_score = llm_result.get("overall_score", 0)

    # =====================================================
    # 8️⃣ CONTENT SCORE (Balanced Formula)
    # =====================================================
    content_score = int(
        0.7 * llm_score +
        0.3 * semantic_weighted
    )

    # Length normalization (prevent tiny answers scoring high)
    if word_count < 20:
        content_score *= 0.8
    elif word_count < 10:
        content_score *= 0.6

    content_score = int(max(0, min(content_score, 100)))

    # =====================================================
    # 9️⃣ FINAL CONFIDENCE
    # =====================================================
    final_confidence = int(
        0.6 * content_score +
        0.4 * voice_confidence
    )

    final_confidence = max(0, min(final_confidence, 100))

    # =====================================================
    # 🔟 Adaptive Logic
    # =====================================================
    follow_up_question = llm_result.get("suggested_followup_question", "")

    should_follow_up = (
        40 <= content_score <= 70 and
        bool(follow_up_question)
    )

    # Cleanup
    try:
        os.remove(original_path)
        os.remove(audio_path)
    except:
        pass

    return {
        "transcript": transcript,
        "scores": {
            "final_confidence": final_confidence,
            "voice_confidence": voice_confidence,
            "content_score": content_score,
            "technical_score": llm_result.get("technical_score", 0),
            "clarity_score": llm_result.get("clarity_score", 0),
            "completeness_score": llm_result.get("completeness_score", 0),
            "communication_score": llm_result.get("communication_score", 0)
        },
        "feedback": {
            "strengths": llm_result.get("strengths", ""),
            "improvements": llm_result.get("improvements", "")
        },
        "adaptive": {
            "follow_up_question": follow_up_question,
            "should_follow_up": should_follow_up
        }
    }