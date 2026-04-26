# HR Module: Comprehensive Overview

This document providing a detailed breakdown of the **HR Module**, which is the most complex component of the project, involving speech processing, emotion analytics, and adaptive AI interviewing.

---

## 1. Module Overview
The HR Module simulates a real-life mock interview. It uses **Speech-to-Text (STT)** to transcribe user responses, **Acoustic Analysis** to detect emotional confidence, and **LLM Logic** to provide feedback and adaptive follow-up questions.

---

## 2. Key Files

### Frontend (React + Tailwind)
- **[HRInterview.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/Hr/HRInterview.jsx)**: The heart of the module. Handles microphone input, real-time audio visualization, and the interview state machine.
- **[HrSummary.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/Hr/HrSummary.jsx)**: Displays the post-interview "Report Card," including confidence charts and AI-generated summaries.
- **[VoiceVisualizer.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/components/Hr/VoiceVisualizer.jsx)**: Provides visual feedback to the user while they are speaking.
- **[HrService.js](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/firebase/HrService.js)**: Handles all Firebase interactions for saving interview sessions.

### Backend (FastAPI + Python)
- **[audio_confidence.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/routes/audio_confidence.py)**: The API route for speech evaluation (`/speech/evaluate`).
- **[speech_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/speech_service.py)**: The main pipeline that coordinates transcription, emotion detection, and scoring.
- **[transcription_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/transcription_service.py)**: Uses **Faster-Whisper** for high-accuracy local speech-to-text.
- **[emotion_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/emotion/emotion_service.py)**: Uses **Librosa** for acoustic analysis (pitch, energy, speech rate).
- **[llm_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/llm_service.py)**: Queries **Mistral** for deep content analysis and relevance scoring.

---

## 3. Key Functions & Technical Logic

### A. The Evaluation Pipeline (`speech_service.py`)
| Step | Logic | Technology |
| :--- | :--- | :--- |
| **Transcription** | Converts audio bytes into text. | `Faster-Whisper` (Base) |
| **Emotion Analysis** | Analyzes pitch stability and energy levels. | `Librosa` |
| **Semantic Check** | Compares answer text to the question for relevance. | `BERT (MiniLM-L6-v2)` |
| **LLM Assessment** | Evaluates technical correctness and logic. | `Mistral (Ollama)` |
| **Final Scoring** | A weighted formula: `0.6 * Content + 0.4 * Voice`. | Custom Algorithm |

### B. Adaptive Interviewing (`llm_service.py`)
The system doesn't just ask static questions. If the candidate gives an answer that is technically correct but lacks depth (score 40-70), the LLM generates a **context-aware follow-up question** to probe deeper.

### C. Acoustic Feature Extraction (`emotion_service.py`)
- **Pitch Stability**: Measures if the user's voice is wavering (nervousness).
- **RMS Energy**: Measures how loud/bold the user sounds (confidence).
- **Zero-Crossing Rate (ZCR)**: Approximates speech rate to detect if the user is speaking too fast or too slow.

---

## 4. End-to-End Workflow
1. **Record**: User records their answer (WebM format).
2. **Convert**: Backend uses **FFmpeg** to convert WebM to WAV for processing.
3. **Analyze**:
   - Whisper transcribes the text.
   - Librosa extracts audio features (Confidence/Emotion).
   - BERT check relevance score.
   - Mistral provides detailed feedback and scores.
4. **Iterate**: If the answer is "okay" but not great, an adaptive follow-up is asked.
5. **Summarize**: Once finished, the `recommendation_service` generates a final professional report of the entire interview.

---

## 5. Potential Presentation Questions (Professor's Perspective)

### Q1: How do you distinguish between "Confidence" and "Tone"?
> **Answer**: Confidence is measured using **RMS Energy** (loudness) and **Pitch Stability**. A stable pitch and moderate loudness indicate confidence. Tone is derived from the emotional distribution (Happy, Neutral, Fear) calculated via the Softmax normalization of these signals.

### Q2: Why use Faster-Whisper instead of standard Whisper or Google STT?
> **Answer**: **Faster-Whisper** is a reimplementation of OpenAI’s model that uses CTranslate2, making it up to 4x faster and using significantly less memory. This allows our backend to provide near-instant feedback while running entirely locally.

### Q3: What happens if there is background noise in the audio?
> **Answer**: Currently, we use the `librosa.piptrack` with a magnitude threshold (75th percentile) to focus on the primary voice signal and ignore low-level noise. For future versions, we could add a Spectral Subtraction layer for better denoising.

### Q4: How do you handle "Non-Answers" like "I don't know"?
> **Answer**: We have a **Hard Gate** pattern matcher in `speech_service.py`. If the transcript contains phrases like "I donor know" and is under 10 words, the system automatically assigns a low score and provides encouragement to try reasoning through the problem.

### Q5: Explain the "Adaptive" nature of the interview.
> **Answer**: It’s powered by the LLM’s `suggested_followup_question` field. If the content score is mediocre, the script triggers a follow-up. This mimics a real HR round where a recruiter asks "Can you elaborate on that?" if your first answer was too brief.

### Q6: How are the charts in the Summary page generated?
> **Answer**: We use **Recharts** (or a similar graphing library) to visualize the `voice_confidence` and `content_score` arrays. The radar/pie charts represent the average emotional state (Neutral vs. Happy vs. Nervous) captured across all questions.

---

## 6. Technical Stack Checklist (Viva Boosters)
- **Audio Processing**: FFmpeg, Librosa, Pydub.
- **AI Models**: Faster-Whisper (STT), S-BERT (Embeddings), Mistral-7B (LLM).
- **Frontend**: React (Hooks, Refs), MediaRecorder API, Web Audio API.
- **Database**: Firebase Firestore (Result persistence).
