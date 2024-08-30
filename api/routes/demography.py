from fastapi import APIRouter, HTTPException, Query
from api.schema.demography import getDemographySchema

import requests

router = APIRouter(
    prefix="/demography",
    tags=["demography"],
    responses={404: {"description": "Not found"}},
)

@router.get("/getDemography")
async def get_demography(
    scope: str = Query(..., description="Scope of the data (country, state, district)"),
    state: str = Query(None, description="State name (required if scope is state or district)"),
    district: str = Query(None, description="District name (required if scope is district)")
):
    url = "https://api.data.gov.in/resource/0764657f-00ec-4c6b-9ece-2d7b8a7401fa?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")
    
    data = response.json()
    
    if scope == "country":
        return data
    elif scope == "state":
        if state is None:
            raise HTTPException(status_code=400, detail="State parameter is required for scope 'state'")
        return data.get(state, {"message": "State not found"})
    elif scope == "district":
        if state is None or district is None:
            raise HTTPException(status_code=400, detail="State and district parameters are required for scope 'district'")
        state_data = data.get(state, {})
        district_data = state_data.get('districtData', {}).get(district, {"message": "District not found"})
        return district_data
    else:
        return {"message": "Invalid scope"}
    