from fastapi import FastAPI, APIRouter, File, UploadFile

from api.utility.auth import Validate
from api.schema.auth import AadharSchema

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not found"}},
)

@router.post("/login")
async def login():
    return {"message": "Login Successful"}

@router.get("/logout")
async def logout():
    return {"message": "Logged out"}

@router.post("/verifyAadhar")
async def check_aadhar(params: AadharSchema):
    return Validate(params.aadhaar)

@router.post("/scanAadhar")
async def scan_aadhaar(file: UploadFile = File(...)):
    contents = await file.read()
    # Process the file contents here
    print(contents.decode('utf-8'))
    return {"filename": file.filename, "content_type": file.content_type}
