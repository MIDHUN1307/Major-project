import librosa
import numpy as np


def detect_emotion(audio_path: str) -> dict:
    """
    Emotion estimation using acoustic-prosodic features.
    Works on all platforms (no torchaudio / speechbrain).
    """

    y, sr = librosa.load(audio_path, sr=None)

    # 1️⃣ Pitch (fundamental frequency)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = pitches[magnitudes > np.median(magnitudes)]
    avg_pitch = np.mean(pitch_values) if len(pitch_values) > 0 else 0
    pitch_var = np.std(pitch_values) if len(pitch_values) > 0 else 0

    # 2️⃣ Energy (loudness)
    energy = np.mean(librosa.feature.rms(y=y))

    # 3️⃣ Speaking rate (approx via zero crossings)
    zcr = np.mean(librosa.feature.zero_crossing_rate(y))

    # 4️⃣ Emotion heuristics
    neutral = 0.5
    happy = 0.0
    sad = 0.0
    angry = 0.0
    fear = 0.0

    if energy > 0.06 and pitch_var < 50:
        happy = 0.3
        neutral = 0.6
    elif energy < 0.03:
        sad = 0.4
        neutral = 0.4
    elif pitch_var > 100 and zcr > 0.1:
        fear = 0.5
        neutral = 0.3
    else:
        neutral = 0.7

    # Normalize
    total = neutral + happy + sad + angry + fear
    return {
        "neutral": neutral / total,
        "happy": happy / total,
        "sad": sad / total,
        "angry": angry / total,
        "fear": fear / total
    }
