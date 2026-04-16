# AI Interview Preparation Platform — Project Logic & Flow (Presentation Notes)

## Overview
This project is an **AI-powered interview preparation platform** with:
- A **React** frontend (`interview-prep/`) for authentication, dashboards, aptitude tests (topic + adaptive), coding topics, and HR interview practice.
- A **FastAPI** backend (`backend/`) that evaluates **spoken HR interview answers** using:
  - speech-to-text (Whisper),
  - emotion/voice metrics (librosa),
  - semantic similarity (MiniLM),
  - and LLM scoring + follow-up generation (Ollama/Mistral).
- **Firebase (Auth + Firestore)** for user accounts and saving HR interview reports.

High level idea:
- **Aptitude**: adaptive learning via a **UCB bandit** that increases question frequency for weak topics.
- **HR Interview**: record audio → backend evaluation → store results → show a detailed report.

---

## Repository structure (what lives where)
- **Frontend (React)**: `interview-prep/src/`
  - `main.jsx`: wraps app with `BrowserRouter` and `AuthProvider`
  - `App.jsx`: route table for all pages
  - `Pages/`: feature pages (Aptitude, HR, Auth, Dashboard, etc.)
  - `components/`: reusable UI pieces (Topic cards, HR report components, etc.)
  - `firebase/`: Firebase Auth + Firestore helpers
  - `utils/`: client-side algorithms (UCB bandit model)

- **Backend (FastAPI + AI pipeline)**: `backend/`
  - `main.py`: FastAPI app + router registration
  - `routes/`: API endpoints exposed to frontend
  - `app/services/`: “business logic” services called by routes
  - `emotion/`: emotion/voice feature extraction
  - `scoring/`: confidence scoring logic
  - `requirements.txt`: backend dependencies

---

## Frontend entrypoints & routing

### `interview-prep/src/main.jsx`
**Purpose**: React bootstrapping.
- Wraps the app in:
  - `BrowserRouter` (routing)
  - `AuthProvider` (login persistence and access to `user`)

Key module:
- `AuthProvider` from `context/AuthContext.jsx`

### `interview-prep/src/App.jsx`
**Purpose**: single-page routing table.

Routes:
- `/` → Landing
- `/auth/login` → Student login
- `/auth/register` → Student registration
- `/auth/forgot-password` → Password recovery
- `/student/dashboard` → Dashboard
- `/aptitude` → Aptitude topic list
- `/aptitude/test` → Test runner (topic OR adaptive AI test)
- `/aptitude/result` → Test results + bandit insights + proof export
- `/coding` → Coding topics (modal-based subtopics)
- `/hr` → HR interview practice (audio recording + feedback)
- `/hr-summary` → HR interview summary/report page

---

## Authentication & user data (Firebase)

### `interview-prep/src/firebase/firebaseConfig.js`
**Purpose**: initialize Firebase app, Firestore DB, and Firebase Auth clients.

Exports:
- `app`
- `db`
- `auth`

### `interview-prep/src/context/AuthContext.jsx`
**Purpose**: keep user “logged in” across refresh.

Key functions:
- `login(userProfile)`: store profile in context after successful login
- `logout()`: Firebase signOut and clear context

Key flow:
- `onAuthStateChanged(auth, async (firebaseUser) => { ... })`
  - if logged in → load profile via `getUserProfile(uid)`
  - sets `{ user, loading }`

### `interview-prep/src/firebase/authService.js`
**Purpose**: thin wrappers around Firebase Auth.

Key functions:
- `signupWithEmail(email, password)`
- `loginWithEmail(email, password)`

### `interview-prep/src/firebase/userService.js`
**Purpose**: store + retrieve user profiles in Firestore (`users` collection).

Key functions:
- `saveUserProfile(uid, userData)` → `setDoc(doc(db, "users", uid), userData)`
- `isUsernameTaken(username)` → query `users` where `username == value`
- `getUserProfile(uid)` → fetch by UID
- `getEmailByUsername(username)` → resolve username → email (used at login)

### Auth UX pages
- `Pages/Auth/StudentRegistration.jsx`:
  - creates Firebase Auth user (`signupWithEmail`)
  - writes Firestore profile (`saveUserProfile`)
  - validates username uniqueness (`isUsernameTaken`)
- `Pages/Auth/StudentLogin.jsx`:
  - **username → email** lookup (`getEmailByUsername`)
  - Firebase login with email (`loginWithEmail`)
  - loads user profile (`getUserProfile`)
  - sets session in `AuthContext.login(profile)`

---

## Student Dashboard

### `Pages/Student/Dashboard.jsx`
**Purpose**: show interview-prep modules + HR progress.

Key flow:
- Reads Firestore `interview_results` for current user
- Computes average of `finalScore` and shows it as HR progress

---

## Aptitude module (Topic practice + Adaptive UCB test)

### User-facing pages

#### `Pages/aptitude/TopicList.jsx`
**Purpose**: aptitude landing page.
- Shows `TopicGrid` and a highlighted “Adaptive AI Curated Test” card.

#### `components/TopicGrid.jsx`
**Purpose**:
- A special card launches adaptive test:
  - navigates to `/aptitude/test` with `{ isAdaptive: true }`
- Topic cards launch practice tests by topic.

#### `Pages/aptitude/Test.jsx`
**Purpose**: runs either:
- **topic practice**: loads `aptitudeQuestions[topicTitle]`
- **adaptive**: calls `generateCuratedTest(10)` from `utils/banditModel.js`

Key functions / logic:
- `handleSubmit()`:
  - computes `correct`, `wrong`, `skipped`
  - for adaptive: aggregates performance by `q.originalTopic`
  - calls `updateStats(topic, total, wrong)` per topic
  - navigates to `/aptitude/result` with result summary

#### `Pages/aptitude/Result.jsx`
**Purpose**:
- shows the result
- shows “weak vs strong” topics derived from bandit state
- provides **“Download JSON”** button for proof/demo:
  - exports:
    - current result
    - `getBanditDebugSnapshot()` (per-topic attempts + errorRate)
    - `getLastCuratedTrace()` (topic picks from last adaptive test)
    - `lastCuratedTopicCounts` (frequency table)

### Question dataset
#### `Pages/aptitude/data/aptitudeQuestions.js`
**Purpose**: static question bank keyed by topic:
- “Quantitative Aptitude”
- “Logical Reasoning”
- “Verbal Ability”
- “Probability”
- “Time & Work”
- “Permutations & Combinations”

Each question object:
- `question`
- `options[]`
- `answer` (index of correct option)

### Adaptive algorithm (UCB bandit)
#### `utils/banditModel.js`
**Purpose**: personalization logic for aptitude.

Stored state (localStorage):
- key: `aptitude_bandit_state`
- shape:
  - `totalAttempts`
  - `topics[topicName] = { attempts, wrong }`

Core functions:
- `updateStats(topic, totalQuestions, wrongAnswers)`
  - increments `totalAttempts`
  - increments topic `attempts`, `wrong`
- `getStrongAndWeakAreas()`
  - computes topic accuracies
  - returns `{ weak, strong, all }`
- `generateCuratedTest(numQuestions=10, options?)`
  - selects topic for each question using UCB score
  - picks a random question from that topic
  - attaches `originalTopic` to each returned question
  - saves a trace:
    - key: `aptitude_bandit_last_trace`
    - contains `picks: [{i, topic}, ...]`
- `getBanditDebugSnapshot()`
  - returns per-topic `attempts`, `wrong`, `errorRate`, `accuracy`
- `resetBanditState()`
  - clears state + trace

#### UCB score definition used in this project
We treat each **topic** as an arm.

- “Reward” we maximize = **need for practice** = (smoothed) **error rate**.
- UCB score combines:
  - exploitation (high error rate)
  - exploration (low attempts)

Implementation characteristics:
- **Cold-start smoothing**:
  - `priorStrength` and `priorErrorRate` prevent never-attempted topics from dominating with infinite priority.
- **Exploration cap**:
  - `maxExplorationBonus` prevents exploration term from overpowering a clearly weak topic (e.g., errorRate≈1).

Outcome:
- If a topic is weak (high wrong-rate), the adaptive test will select it more frequently.
- You can prove it by exporting the trace and counts from `Result.jsx`.

---

## Coding module (Topic browser)

### `Pages/coding/CodingTopics.jsx`
**Purpose**: shows coding topic cards and opens subtopics in a modal.

Key behaviors:
- keeps `activeTopic` state
- opens `SubtopicModal` when a topic is clicked

---

## HR Interview module (Audio → AI evaluation → Summary report)

### Frontend flow

#### `Pages/Hr/HRInterview.jsx`
**Purpose**: interactive HR interview practice.

Key responsibilities:
- Audio recording via browser APIs:
  - `navigator.mediaDevices.getUserMedia({ audio: true })`
  - `MediaRecorder` stores chunks in `audioChunksRef`
- Simple voice visualization:
  - `AudioContext` + `AnalyserNode` → `trackVolume()`

Key functions:
- `startListening()`:
  - initializes MediaRecorder
  - initializes analyser + starts volume tracking
- `stopListening()`:
  - stops recording
  - assembles audio Blob (`audio/webm`)
  - sends `FormData` to backend:
    - `question`
    - `audio`
  - endpoint:
    - `POST http://127.0.0.1:8000/speech/evaluate`
  - receives JSON:
    - `transcript`
    - `scores`
    - `feedback`
    - `adaptive` follow-up suggestion
- `submitAnswer()`:
  - pushes a structured entry into `answers[]`:
    - `question`, `transcript`
    - `scores.final_confidence`
    - `strengths`, `improvements`
- `goToNextQuestion(forceSkip=false)`:
  - optionally uses backend-provided follow-up:
    - `feedback.adaptive.should_follow_up`
    - `feedback.adaptive.follow_up_question`
  - otherwise moves through static `hrQuestions`
- `finishInterview()`:
  - sends all `answers[]` to backend summary endpoint:
    - `POST http://127.0.0.1:8000/hr/generate-summary`
  - stores results to Firestore using `saveHrInterview(uid, { answers, summary })`
  - navigates to `/hr-summary`

Supporting UI components:
- `components/Hr/ThinkingTimer.jsx`:
  - countdown before user answers
  - offers “Give me 10 seconds” or “Skip question”
- `components/Hr/InterviewFeedback.jsx`:
  - shows `final_confidence`, `voice_confidence`, `content_score`
  - shows strengths/improvements text

#### `Pages/Hr/HrSummary.jsx`
**Purpose**: display the latest HR interview report from Firestore.

Key flow:
- `getLatestHrInterview(user.uid)` retrieves last `interview_results` document
- derives UI view-model:
  - `candidateData` (name/date/type)
  - `overallScore`
  - `answerMetrics` (communication, relevance, tone, completeness)
  - `feedbackData` (table row per answer)
  - `strengths`, `improvements`, `aiRecommendations`
- renders with components:
  - `SummaryHeader`, `PerformanceCard`, `ConfidenceAnalysis`
  - `AnswerBreakdown`, `FeedbackTable`, `Recommendations`, `ActionButtons`

### Firestore persistence
#### `firebase/HrService.js`
Key functions:
- `saveHrInterview(userId, result)`
  - writes `interview_results` document with:
    - `finalScore`, `voiceConfidence`, `contentScore`
    - `overallSummary`, `keyStrengths`, `areasForImprovement`, `aiRecommendation`
    - `answers[]`
    - `createdAt`
- `getLatestHrInterview(userId)`
  - query by userId, order desc by createdAt, limit 1

---

## Backend API (FastAPI)

### `backend/main.py`
**Purpose**: backend entrypoint + CORS + routers.

Routers:
- `routes/audio_confidence.py`
- `routes/hr_summary.py`

Health:
- `GET /` → `{ "message": "Backend is running" }`

### `backend/routes/audio_confidence.py`
Endpoint:
- `POST /speech/evaluate`

Inputs:
- `question: str` (Form field)
- `audio: UploadFile` (multipart file)

Delegates to:
- `app.services.speech_service.evaluate_speech_pipeline(question, audio)`

### `backend/routes/hr_summary.py`
Endpoint:
- `POST /hr/generate-summary`

Input model:
- `InterviewRequest` with `answers: List[Dict]`

Delegates to:
- `app.services.recommendation_service.generate_interview_recommendation(answers)`

---

## Backend AI pipeline (speech evaluation)

### `backend/app/services/speech_service.py`
Main function:
- `evaluate_speech_pipeline(question: str, audio_file)`

Pipeline steps (in order):
1. **Save upload** to `temp/` as unique UUID file
2. **Convert to WAV** via `ffmpeg`
3. **Transcribe**:
   - `transcribe_audio_file(audio_path)` (Whisper)
4. **Emotion detection**:
   - `detect_emotion(audio_path)` → probability distribution
5. **Voice confidence score**:
   - `final_confidence_score(emotion_scores, transcript, audio_path)` → 0–100
6. **Hard “non-answer gate”**:
   - if answer is too short and matches phrases like “I don’t know”
   - returns very low scores + feedback, and stops further evaluation
7. **Semantic relevance** (soft influence):
   - SentenceTransformer MiniLM embeddings
   - `cosine_similarity(question_vec, answer_vec)` → semantic score
8. **LLM evaluation**:
   - `evaluate_with_llm(question, transcript)` (Ollama + Mistral)
9. **Content score**:
   - weighted mix of LLM score and semantic score
10. **Final score**:
   - blend of content score + voice confidence
11. **Adaptive follow-up decision**:
   - uses `llm_result.suggested_followup_question`
   - follow-up only if content score in a mid-band (e.g., 40–70) and follow-up exists
12. Cleanup temp files

Output JSON shape (returned to frontend):
- `transcript`
- `scores`: final_confidence, voice_confidence, content_score, plus category scores from LLM
- `feedback`: strengths, improvements
- `adaptive`: follow_up_question, should_follow_up

### `backend/app/services/transcription_service.py`
Key function:
- `transcribe_audio_file(audio_path: str) -> str`

Implementation:
- loads `WhisperModel("small", device="cpu", compute_type="int8")` once
- concatenates segment texts and returns transcript

### `backend/emotion/emotion_service.py`
Key function:
- `detect_emotion(audio_path: str) -> dict`

Implementation:
- uses librosa features (pitch stability, energy, zero-crossing rate)
- computes “signals” (confident, fear, sad, happy, neutral)
- softmax-normalizes to probabilities

### `backend/scoring/confidence_engine.py`
Key functions:
- `energy_score(audio_path) -> float`
- `voice_confidence_score(emotion_scores) -> float`
- `fluency_score(transcript) -> float` (filler-words heuristic)
- `speech_rate_score(transcript, audio_path) -> float` (WPM from audio duration)
- `pause_score(audio_path) -> float` (silence ratio)
- `final_confidence_score(emotion_scores, transcript, audio_path) -> int` (0–100)

### `backend/app/services/llm_service.py`
Key function:
- `evaluate_with_llm(question, transcript) -> dict`

Implementation:
- uses `ollama.chat(model="mistral")`
- prompt enforces strong **relevance gating**
- expects strict JSON response:
  - relevance_score, technical_score, clarity_score, completeness_score, communication_score, overall_score
  - strengths, improvements, suggested_followup_question

### `backend/app/services/recommendation_service.py`
Key function:
- `generate_interview_recommendation(answers) -> dict`

Responsibilities:
- compute average scores:
  - final_score, voice_confidence, content_score
- sends all Q/A to LLM to produce:
  - overall_summary
  - key_strengths[]
  - areas_for_improvement[]
  - ai_recommendation
- attaches computed numeric scores into response

### Supporting/extra backend services
- `backend/app/services/question_bank.py`
  - `get_hr_question(level="easy")` returns random HR question
- `backend/app/services/coaching_service.py`
  - `generate_coaching_feedback(...)` turns computed scores into structured coaching tips

---

## End-to-end data-flow diagrams

### Aptitude adaptive flow (UCB bandit)
1. User practices a topic → finishes test
2. `Test.jsx` computes per-topic wrong rate → calls `updateStats(topic, total, wrong)`
3. User starts “Adaptive AI Curated Test”
4. `generateCuratedTest()` uses UCB to pick next topic repeatedly
5. Result page exports proof:
   - per-topic stats + trace of selected topics

### HR Interview speech evaluation flow
1. Frontend records audio (`MediaRecorder`) + sends multipart form-data:
   - question text
   - audio blob
2. Backend:
   - converts to WAV → transcribes → emotion → voice confidence → semantic similarity → LLM → final score
3. Frontend:
   - shows transcript + AI feedback + follow-up suggestion
4. Finish interview:
   - frontend posts all answers to `/hr/generate-summary`
   - backend returns overall summary + averaged scores
5. Frontend writes report to Firestore and shows `/hr-summary`

---

## Backend dependencies (quick reference)
From `backend/requirements.txt`:
- `fastapi`, `uvicorn`, `python-multipart`
- `faster-whisper` (speech-to-text)
- `librosa`, `numpy`, `soundfile` (audio analysis)
- `sentence-transformers`, `scikit-learn` (semantic similarity)
- `ollama` (LLM calls to local model like Mistral)

---

## Presentation-ready “what to highlight”
- **Adaptive learning**: UCB bandit picks topics based on user weakness + exploration.
- **Speech AI pipeline**: combined multimodal scoring:
  - voice confidence (emotion + energy + fluency + pauses)
  - content relevance (semantic similarity + strict LLM evaluation)
- **Persisted outcomes**: Firestore stores HR interview results and summary dashboards.
- **Proof tooling**: exportable JSON trace demonstrates adaptivity and model decisions.

