from fastapi import APIRouter, UploadFile
import whisper
import tempfile

router = APIRouter()

# Load Whisper model once
model = whisper.load_model("small")


@router.post("/transcribe")
async def transcribe_audio(file: UploadFile):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await file.read())
        temp_path = tmp.name

    result = model.transcribe(temp_path)

    return {
        "text": result["text"]
    }
