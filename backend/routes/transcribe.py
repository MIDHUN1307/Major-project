from fastapi import APIRouter, UploadFile
import whisper
import tempfile

router = APIRouter()

# Load Whisper model once
model = whisper.load_model("small")


# 🔹 REUSABLE FUNCTION (NEW)
def transcribe_audio_file(audio_path: str) -> str:
    result = model.transcribe(audio_path)
    return result["text"]


# 🔹 API ROUTE (UNCHANGED BEHAVIOR)
@router.post("/transcribe")
async def transcribe_audio(file: UploadFile):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await file.read())
        temp_path = tmp.name

    text = transcribe_audio_file(temp_path)

    return {
        "text": text
    }
