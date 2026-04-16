from fastapi import APIRouter, UploadFile, File
from app.services.core_service import process_pdf
from app.services.evaluation_service import evaluate_answer
router = APIRouter()

@router.post("/core/upload")
async def upload_pdf(file: UploadFile = File(...)):
    result = await process_pdf(file)
    return result


@router.post("/core/evaluate")
async def evaluate(data: dict):
    question = data["question"]
    answer = data["answer"]

    result = evaluate_answer(question, answer)
    return result