from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

from app.services.recommendation_service import generate_interview_recommendation

router = APIRouter()


# Request structure from frontend
class InterviewRequest(BaseModel):
    answers: List[Dict]


@router.post("/hr/generate-summary")
def generate_summary(data: InterviewRequest):
    """
    Generate AI interview summary from all answers
    """

    result = generate_interview_recommendation(data.answers)

    return result