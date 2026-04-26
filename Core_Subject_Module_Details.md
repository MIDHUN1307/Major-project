# Core Subject Module: Comprehensive Overview

This document provides a detailed breakdown of the **Core Subject Module**, covering its architecture, key files, core functions, and potential presentation questions to help you prepare for your project demonstration.

---

## 1. Module Overview
The Core Subject Module is an adaptive learning tool that allows users to upload study material (PDFs) and receive automatically generated questions based on the content. It evaluates user answers using a hybrid approach (Semantic Similarity + LLM Analysis) and tracks progress via Firebase.

---

## 2. Key Files

### Frontend (React + Tailwind)
- **[CoreSubject.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/Pages/Core/CoreSubject.jsx)**: The main UI component. it handles:
  - PDF file selection and upload.
  - Test state management (current question, answers, scoring).
  - Integration with Firebase (saving results).
- **[PreparationModules.jsx](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/interview-prep/src/components/PreparationModules.jsx)**: Serves as the entry point, routing the user to the Core Subjects module.

### Backend (FastAPI + Python)
- **[core_subject.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/routes/core_subject.py)**: Defines the API endpoints (`/core/upload` and `/core/evaluate`).
- **[core_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/core_service.py)**: Orchestrates the PDF processing pipeline (extraction, chunking, and question generation trigger).
- **[t5_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/t5_service.py)**: Implements the **T5 (Text-to-Text Transfer Transformer)** model logic for generating questions from text chunks.
- **[evaluation_service.py](file:///c:/Users/MIDHUN/OneDrive/Desktop/Project-final/Major-project/backend/app/services/evaluation_service.py)**: Handles the scoring logic using:
  - **Sentence Transformers** (for semantic similarity/cosine score).
  - **Ollama (Mistral)** (for qualitative feedback and detailed scoring).

---

## 3. Key Functions & Logic

### A. PDF Processing & Question Generation
| Function | File | Description |
| :--- | :--- | :--- |
| `extract_text(file_path)`| `core_service.py` | Uses `pypdf` to extract raw text from each page of the uploaded PDF. |
| `chunk_text(text, size=500)`| `core_service.py` | Breaks down large text into manageable chunks (500 words) so the model doesn't hit token limits. |
| `generate_questions(chunk)`| `t5_service.py` | Tokenizes the chunk and uses a fine-tuned T5 model to generate 5 context-aware questions. |
| `handleUpload` (Frontend)| `CoreSubject.jsx` | Sends the PDF to the backend and updates the UI state with the list of generated questions. |

### B. Evaluation & Scoring
| Function | File | Description |
| :--- | :--- | :--- |
| `evaluate_answer(q, a)` | `evaluation_service.py`| The core "Brain" of the module. It produces two scores: 1. **Similarity Score** (via Cosine Similarity) and 2. **LLM Score** (via Mistral). |
| `model.encode()` | `evaluation_service.py`| Uses `all-MiniLM-L6-v2` to convert text into vector embeddings for comparison. |
| `ollama.chat()` | `evaluation_service.py`| Queries a local Mistral model to provide detailed feedback on "Strengths" and "Improvements". |
| `calculateFinalScore` | `CoreSubject.jsx` | Aggregates individual question scores into a final percentage for the test. |

---

## 4. End-to-End Workflow
1. **Upload**: User selects a PDF. The frontend sends it to `/core/upload`.
2. **Parsing**: The backend saves the file, extracts text, and chunks it.
3. **Generation**: The T5 model processes the first few chunks to create a set of 5 unique questions.
4. **Testing**: The UI displays questions one by one. The user submits a text-based answer.
5. **Scoring**: The backend compares the answer to the question/context using embeddings and a local LLM.
6. **Persistence**: Scores and feedback are displayed, and the final results are saved to **Firebase Firestore** (`core_results` collection) for dashboard tracking.

---

## 5. Potential Presentation Questions (Professor's Perspective)

### Q1: Why did you choose the T5 model for question generation instead of GPT-3/4?
> **Answer**: T5 (Text-to-Text Transfer Transformer) is specifically designed for text-to-text tasks. By using a fine-tuned version, we can run it locally or on a budget without relying on expensive OpenAI APIs. It provides consistent, structured output for question-generation tasks.

### Q2: How does the system handle very large PDFs (e.g., a 100-page book)?
> **Answer**: We use a **chunking strategy**. Instead of passing the entire document to the model (which would exceed the token limit), we break it into 500-word segments. We currently process the first 3 chunks to ensure speed and diversity in questions.

### Q3: Explain the benefit of using "Cosine Similarity" alongside an LLM.
> **Answer**: Cosine Similarity gives us a mathematical, objective measure of how closely the answer relates to the topic (semantic relevance). The LLM (Mistral) provides the human-like nuance—evaluating grammar, depth, and specific strengths/weaknesses that a pure mathematical model might miss.

### Q4: Why use Ollama/Mistral instead of a hosted API?
> **Answer**: Using **Ollama** allows the project to run entirely offline (once models are downloaded), ensuring data privacy (study materials aren't sent to a 3rd party) and zero operational costs during development/testing.

### Q5: How is the progress reflected in the Student Dashboard?
> **Answer**: After the test, the `saveResultToFirebase` function pushes the `finalScore` and timestamp to the `core_results` collection. The dashboard fetches these documents and updates the "Core Subjects" progress bar in real-time using a listener or an aggregation query.

### Q6: What happens if a user provides a very short or generic answer (e.g., "I don't know")?
> **Answer**: The system includes a "stricter formatting" prompt for the LLM. If the answer is irrelevant or too short, the Mistral model is instructed to give a low or zero score, and the Sentence Transformer will naturally yield a low similarity score.

---

## 6. Future Enhancements (Bonus for Vivas)
- **Answer Key Matching**: Cross-referencing answer embeddings with the actual text from the PDF chunk.
- **Adaptive Difficulty**: If a user scores >90%, generate more complex questions in the next round.
- **OCR Integration**: Using Tesseract to handle image-based PDFs (scanned notes).
