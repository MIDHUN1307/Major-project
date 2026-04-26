import librosa
import numpy as np



#  NEW: Energy Score (Volume Strength)
def energy_score(audio_path: str) -> float:
    """
    Calculate voice energy (volume strength).
    Returns 0.0 – 1.0
    """

    y, sr = librosa.load(audio_path)

    rms = librosa.feature.rms(y=y)[0]
    avg_rms = np.mean(rms)

    # Normalize safely (tuned range)
    normalized = min(avg_rms / 0.1, 1.0)

    return float(normalized)


# -------------------------------------------------
# Voice Emotion Confidence
# -------------------------------------------------
def voice_confidence_score(emotion_scores: dict) -> float:
    """
    Convert emotion probabilities into a voice-based confidence score (0.0 – 1.0)
    """

    positive = (
        emotion_scores.get("neutral", 0.0) * 0.7 +
        emotion_scores.get("happy", 0.0) * 0.3
    )

    negative = (
        emotion_scores.get("fear", 0.0) * 0.6 +
        emotion_scores.get("sad", 0.0) * 0.3 +
        emotion_scores.get("angry", 0.0) * 0.1
    )

    score = positive - negative
    return max(0.0, min(score, 1.0))


# -------------------------------------------------
# Fluency Score
# -------------------------------------------------
def fluency_score(transcript: str) -> float:
    fillers = ["uh", "um", "uhm", "hmm", "you know", "like", "actually"]

    text = transcript.lower()
    words = text.split()
    total_words = len(words)

    if total_words == 0:
        return 0.0

    filler_count = 0
    for filler in fillers:
        filler_count += text.count(filler)

    ratio = filler_count / total_words

    if ratio < 0.05:
        return 1.0
    elif ratio < 0.10:
        return 0.7
    else:
        return 0.4


# -------------------------------------------------
# Speech Rate Score
# -------------------------------------------------
def speech_rate_score(transcript: str, audio_path: str) -> float:
    words = transcript.split()
    total_words = len(words)

    if total_words == 0:
        return 0.0

    y, sr = librosa.load(audio_path)
    duration_seconds = librosa.get_duration(y=y, sr=sr)

    if duration_seconds == 0:
        return 0.0

    duration_minutes = duration_seconds / 60.0
    wpm = total_words / duration_minutes

    if 120 <= wpm <= 160:
        return 1.0
    elif 100 <= wpm <= 180:
        return 0.7
    else:
        return 0.4



# Pause Score

def pause_score(audio_path: str) -> float:
    """
    Improved pause scoring.
    Penalizes long continuous silence more than short natural pauses.
    Returns value between 0.0 – 1.0
    """

    y, sr = librosa.load(audio_path)

    # Detect silent intervals
    intervals = librosa.effects.split(y, top_db=25)

    total_duration = librosa.get_duration(y=y, sr=sr)

    if total_duration == 0:
        return 0.0

    speech_duration = 0.0

    for start, end in intervals:
        speech_duration += (end - start) / sr

    silence_duration = total_duration - speech_duration

    silence_ratio = silence_duration / total_duration

    #  Penalize long silence more aggressively
    if silence_ratio < 0.15:
        return 1.0
    elif silence_ratio < 0.30:
        return 0.7
    elif silence_ratio < 0.45:
        return 0.4
    else:
        return 0.2

# Final Confidence Score

def final_confidence_score(
    emotion_scores: dict,
    transcript: str,
    audio_path: str
) -> int:
    """
    Combine all metrics into final confidence (0–100)
    """

    #  Get emotion-based confidence
    emotion_voice = voice_confidence_score(emotion_scores)

    # Get energy-based strength
    energy = energy_score(audio_path)

    #  Blend emotion + energy
    voice_score = 0.7 * emotion_voice + 0.3 * energy

    # Other metrics
    fluency = fluency_score(transcript)
    speech_rate = speech_rate_score(transcript, audio_path)
    pause = pause_score(audio_path)

    final = (
        0.3 * voice_score +
        0.25 * fluency +
        0.25 * speech_rate +
        0.20 * pause
    )

    return int(final * 100)