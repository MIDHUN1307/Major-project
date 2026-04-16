from fastapi import APIRouter, UploadFile, File, Form
from app.services.speech_service import evaluate_speech_pipeline

# This creates a router object
router = APIRouter()


@router.post("/speech/evaluate")
async def evaluate_speech(
    question: str = Form(...),
    audio: UploadFile = File(...)
):
    """
    This is the API endpoint.

    It receives:
    - question (text)
    - audio file

    It does NOT process anything itself.
    It simply calls the speech service (AI brain)
    and returns whatever it gives.
    """

    return evaluate_speech_pipeline(question, audio)
