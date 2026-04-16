from faster_whisper import WhisperModel

# Load model once
model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

def transcribe_audio_file(audio_path: str) -> str:
    segments, info = model.transcribe(audio_path)

    text = ""
    for segment in segments:
        text += segment.text

    return text.strip()