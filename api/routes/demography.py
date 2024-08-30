from fastapi import APIRouter, HTTPException, Query
from api.schema.demography import getDemographySchema

import requests

router = APIRouter(
    prefix="/demography",
    tags=["demography"],
    responses={404: {"description": "Not found"}},
)

def callApi(limit):
    url = f"https://api.data.gov.in/resource/0764657f-00ec-4c6b-9ece-2d7b8a7401fa?api-key=579b464db66ec23bdd000001b6d6ded30e2b490179ee10a2e4d2c8df&format=json&limit={limit}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch data")
    return response.json()

@router.get("/getDemography")
async def get_demography(
    scope: str = Query(..., description="Scope of the data (all, country, state, district)"),
    state: str = Query(None, description="State name in uppercase(required if scope is state or district)"),
    district: str = Query(None, description="District name (required if scope is district)")
):
    
    keys_needed = ["level","name","tru","no_of_households","total_population_person","total_population_male","total_population_female",
    "population_in_the_age_group_0_6_person","population_in_the_age_group_0_6_male","population_in_the_age_group_0_6_female",
    "literates_population_person","literates_population_male","literates_population_female","illiterate_persons","illiterate_male",
    "illiterate_female","total_worker_population_person","total_worker_population_male","total_worker_population_female","main_working_population_person",
    "main_working_population_male","main_working_population_female","non_working_population_person","non_working_population_male","non_working_population_female"]

    if scope == "all":
        data = callApi(108)
        allData = {}
        columns = data['field']
        for each_state in data['records']:
            allData[f"{each_state['name']}_{each_state['tru']}"] = {}
            for key in each_state.keys():
                if key in keys_needed:
                    allData[f"{each_state['name']}_{each_state['tru']}"][key] = each_state[key]

        return allData

    elif scope == "country":
        data = callApi(3)
        conData = {}
        columns = data['field']
        for each_state in data['records']:
            if each_state['level'] == "India":
                conData[f"{each_state['name']}_{each_state['tru']}"] = {}
                for key in each_state.keys():
                    if key in keys_needed:
                        conData[f"{each_state['name']}_{each_state['tru']}"][key] = each_state[key]
        
        return conData

    elif scope == "state":
        data = callApi(108)
        if state in [None, '', " "]:
            raise HTTPException(status_code=400, detail="State parameter is required for scope 'state'")
        
        if state not in [each['name'] for each in data['records']]:
            raise HTTPException(status_code=404, detail="State not found")

        stData = {}
        columns = data['field']
        for each_state in data['records']:
            if each_state['name'] == state:
                stData[f"{each_state['name']}_{each_state['tru']}"] = {}
                for key in each_state.keys():
                    if key in keys_needed:
                        stData[f"{each_state['name']}_{each_state['tru']}"][key] = each_state[key]
        
        return stData

    elif scope == "district":
        if state is None or district is None:
            raise HTTPException(status_code=400, detail="State and district parameters are required for scope 'district'")
        state_data = data.get(state, {})
        district_data = state_data.get('districtData', {}).get(district, {"message": "District not found"})
        return district_data
    else:
        return {"message": "Invalid scope"}
    