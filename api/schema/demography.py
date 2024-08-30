from pydantic import BaseModel
from typing import Optional,Literal

class getDemographySchema(BaseModel):
    scope: Literal["country","state","district"]
    country: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None