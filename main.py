# main.py
from fastapi import FastAPI
from fastapi import APIRouter
from api.routes import auth,demography
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI(
    title="PostGullak",
    version="1.0"
)

router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

router.include_router(auth.router)
router.include_router(demography.router)

app.include_router(router)

@app.get("/")
def read_root():
    return {"root": "Hello World"}

@app.get("/checkVersion")
def check_version():
    return {"version": "1.0"}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    errors = []
    for error in exc.errors():
        try:
            print(error)
            errors.append({ error['loc'][1] : error['msg']})
        except Exception as exception:
            print(exception)

    return JSONResponse(content=errors, status_code=400)