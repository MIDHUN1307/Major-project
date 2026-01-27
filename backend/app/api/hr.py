from fastapi import APIRouter
from app.models.hr import HRRequest, HRResponse
from app.services.ai_eval import evaluate_hr_answer
from app.services.question_bank import get_hr_question

router = APIRouter()

@router.get("/question")
def get_question(level: str = "easy"):
    """
    API to get a new HR question
    """
    question = get_hr_question(level)
    return {"question": question}

@router.post("/evaluate", response_model=HRResponse)
def evaluate_hr(data: HRRequest):
    """
    API to evaluate HR answer
    """
    result = evaluate_hr_answer(data.answer_text)
    return result
