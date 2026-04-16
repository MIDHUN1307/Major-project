import librosa
import numpy as np


def detect_emotion(audio_path: str) -> dict:
    """
    Improved acoustic-based emotion estimation.
    Produces smoother and more realistic emotional distribution.
    """

    y, sr = librosa.load(audio_path, sr=None)

    if len(y) == 0:
        return {
            "neutral": 1.0,
            "happy": 0.0,
            "sad": 0.0,
            "angry": 0.0,
            "fear": 0.0
        }

    # -----------------------------------
    # Pitch Features
    # -----------------------------------
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = pitches[magnitudes > np.percentile(magnitudes, 75)]

    if len(pitch_values) > 0:
        avg_pitch = np.mean(pitch_values)
        pitch_var = np.std(pitch_values)
    else:
        avg_pitch = 0
        pitch_var = 0

    # Normalize pitch variance
    pitch_stability = 1 / (1 + pitch_var)  # higher = more stable

    # -----------------------------------
    #  Energy (Loudness)
    # -----------------------------------
    rms = librosa.feature.rms(y=y)[0]
    energy_mean = np.mean(rms)
    energy_std = np.std(rms)

    # Normalize energy into 0–1 range
    energy_norm = np.clip(energy_mean * 15, 0, 1)

    # -----------------------------------
    #  Speech Rate Approximation
    # -----------------------------------
    zcr = np.mean(librosa.feature.zero_crossing_rate(y))
    rate_norm = np.clip(zcr * 10, 0, 1)

    # -----------------------------------
    #  Emotion Modeling
    # -----------------------------------

    # Confident → stable pitch + moderate-high energy
    confident_signal = (
        0.5 * pitch_stability +
        0.5 * energy_norm
    )

    # Nervous / Fear → unstable pitch + fast speech
    fear_signal = (
        0.6 * (1 - pitch_stability) +
        0.4 * rate_norm
    )

    # Sad / Low confidence → low energy
    sad_signal = 1 - energy_norm

    # Happy → energetic + stable
    happy_signal = (
        0.6 * energy_norm +
        0.4 * pitch_stability
    )

    # Neutral baseline
    neutral_signal = 0.5

    # -----------------------------------
    #  Softmax Normalization
    # -----------------------------------
    raw = np.array([
        neutral_signal,
        happy_signal,
        sad_signal,
        fear_signal,
        confident_signal
    ])

    exp = np.exp(raw)
    probs = exp / np.sum(exp)

    return {
        "neutral": float(probs[0]),
        "happy": float(probs[1]),
        "sad": float(probs[2]),
        "fear": float(probs[3]),
        "angry": float(probs[4])  # using confident_signal slot for stronger tone
    }