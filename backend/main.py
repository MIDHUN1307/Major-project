from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

#  Router imports
from routes.audio_confidence import router as audio_confidence_router
from routes.hr_summary import router as hr_summary_router
from routes.core_subject import router as core_router
app = FastAPI(title="AI Interview Evaluation API")

app.add_middleware(
    CORSMiddleware,
    # allow_origins=[
    #     "http://localhost:5173",
    #     "http://127.0.0.1:5173"
    # ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=["*"]
)

# ---------------------------
# Register routers
# ---------------------------
app.include_router(audio_confidence_router)
app.include_router(hr_summary_router)
app.include_router(core_router)
# ---------------------------
# Health check
# ---------------------------
@app.get("/")
def root():
    return {"message": "Backend is running"}