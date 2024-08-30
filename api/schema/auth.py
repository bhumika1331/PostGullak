from pydantic import BaseModel
from typing import Optional,Literal

class User(BaseModel):
    username: str
    password: str
    aadhaar: Optional[str] = None
    ip_details: Optional[dict] = None

class AadharSchema(BaseModel):
    aadhaar: str