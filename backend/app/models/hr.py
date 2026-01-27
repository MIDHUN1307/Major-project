from pydantic import BaseModel
from typing import List

class HRRequest(BaseModel):
    student_id: str
    question_id: int
    answer_text: str

class HRResponse(BaseModel):
    score: int
    feedback: str
    suggestions: List[str]
