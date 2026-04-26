# AI Interview Prep: Full Project Implementation Details

This document provides a comprehensive technical breakdown of all modules within the AI Interview Preparation platform. It covers the architecture, models used, tech stack, and logic flow for each component.

---

## 1. Global Tech Stack

### Frontend
- **Framework**: React 18 (Vite build tool)
- **Styling**: Tailwind CSS (Modern, utility-first design)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Backend Communication**: Axios
- **State/Persistence**: 
  - **Firebase Firestore**: Production storage for HR and Core Subject results.
  - **LocalStorage**: User-specific progress for Aptitude and Coding modules.

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Audio Processing**: FFmpeg (Conversion), Librosa (Acoustics)
- **Model Hosting**: 
  - **Ollama**: Local hosting for Mistral LLM.
  - **Transformers**: Local execution of T5 and BERT models.
  - **Faster-Whisper**: High-performance Speech-to-Text engine.

---

## 2. Module Implementation Details

### A. Aptitude Module (Adaptive Learning)
This module uses a Reinforcement Learning approach to adapt to the user's proficiency level.
- **Core Model**: **Multi-Armed Bandit (MAB)** algorithm.
- **Implementation Logic**:
  - **Exploration vs. Exploitation**: Uses an Epsilon-Greedy approach to balanced asking known hard questions vs. exploring new topics.
  - **State Storage**: The "Proficiency Matrix" is stored in `localStorage`, allowing the model to "remember" user weaknesses across sessions.
  - **Topics**: Quantitative, Logical Reasoning, and Verbal Ability.
- **Key Files**: `banditModel.js`, `Test.jsx`, `Result.jsx`.

### B. Core Subject Module (PDF-to-Test)
Automates question generation from static study materials.
- **Models Used**:
  - **T5 (Text-to-Text Transfer Transformer)**: Fine-tuned for question generation from context.
  - **Sentence-BERT (MiniLM-L6-v2)**: Generates embeddings for semantic similarity scoring.
  - **Mistral (Ollama)**: Provides qualitative feedback.
- **Implementation Pipeline**:
  1. **Extraction**: `pypdf` extracts raw text from PDF.
  2. **Chunking**: Text is split into 500-word blocks.
  3. **Inference**: T5 generates 5 questions per chunk.
  4. **Scoring**: Hybrid evaluation combining Cosine Similarity (BERT) and LLM-based reasoning.
- **Key Files**: `core_service.py`, `t5_service.py`, `CoreSubject.jsx`.

### C. HR & Technical Interview Module (Voice-First AI)
The most technically advanced module, simulating a live interview environment.
- **Models Used**:
  - **Faster-Whisper**: Localized STT (Speech-to-Text) for near-instant transcription.
  - **Librosa**: Acoustic analysis library for energy/pitch extraction.
  - **S-BERT**: Semantic relevance checking.
  - **Mistral-7B**: Deep content grading and follow-up generation.
- **Implementation Flow**:
  - **Audio Visualization**: Uses the Web Audio API to track decibel levels and animate a visualizer.
  - **Acoustic Logic**: Analyzes Zero-Crossing Rate (Speech Rate) and RMS Energy (Volume) to estimate confidence.
  - **Adaptive Logic**: If a user's content score is between 40-70, the LLM triggers a dynamic follow-up question.
- **Key Files**: `speech_service.py`, `emotion_service.py`, `HRInterview.jsx`.

### D. Coding Module (Skill Persistence)
Focuses on tracking progress through standard Data Structures and Algorithms.
- **Logic**: Tracks completion density for various subtopics (Arrays, Linked Lists, Graphs, etc.).
- **Implementation**: Progress is mapped to sub-topic completion toggles, which are aggregated into a "Readiness Score" for the dashboard.
- **Key Files**: `CodingTopics.jsx`, `progress.js` (Coding utils).

---

## 3. Integrated Dashboard & Analytics
The dashboard synthesizes data from all four modules to provide a holistic view of the user.
- **Overall Readiness Algorithm**:
  ```javascript
  Readiness = (AptitudeProgress + CodingProgress + Avg(HR_Scores) + Avg(Core_Scores)) / 4
  ```
- **Live Feed**: Uses Firebase snapshots to show the latest interview performance.
- **Data Persistence**: 
  - **HR/Core**: Stored in Firebase Collections (`hr_interviews`, `core_results`) for persistent history.
  - **Aptitude/Coding**: Local-primary storage with manual backup options (JSON exports).

---

## 4. Key Architectural Decisions

### 1. Local AI Execution
> **Decision**: Use Ollama and Faster-Whisper instead of Cloud APIs (OpenAI/Google).
> **Reasoning**: Zero cost per request, data privacy (PDFs stay local), and low latency for audio processing.

### 2. Hybrid Scoring Strategy
> **Decision**: Combine BERT Embeddings + LLM Analysis.
> **Reasoning**: BERT provides raw semantic similarity (Is the answer relevant?), while the LLM provides contextual feedback (Is it high-quality?).

### 3. Chunked PDF Processing
> **Decision**: Sliding window chunking for T5.
> **Reasoning**: Large PDFs exceed model token limits (512 tokens). Chunking allows the model to "see" the entire document in segments.

### 4. Acoustic Confidence Engine
> **Decision**: Use Pitch/Energy instead of just text sentiment.
> **Reasoning**: In interviews, *how* you say something matters as much as *what* you say. Librosa allows us to detect if a user is whispering or speaking with a shaky pitch.
