from fastapi import APIRouter, HTTPException, Path, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from model import Glucose, GlucoseRequest

glucose_router = APIRouter()


glucose_list: list[Glucose] = []
max_id: int = 0


@glucose_router.post("/glucose", status_code = status.HTTP_201_CREATED) #default documentation
async def add_glucose(glucose: GlucoseRequest) -> Glucose: #does not generate an id!
    global max_id
    max_id += 1 #auto increment ID

    new_glucose = Glucose(id = max_id, reading = glucose.reading, datetime = glucose.datetime)
    glucose_list.append(new_glucose)
    json_obj = jsonable_encoder(new_glucose) #convert python obj to json
    return JSONResponse(json_obj, status_code = status.HTTP_201_CREATED) #return


@glucose_router.get("/glucose") #get the whole list
async def get_glucose() -> dict:
    json_obj = jsonable_encoder(glucose_list) #convert python obj to json
    return JSONResponse(content = json_obj)


@glucose_router.get("/glucose/{id}") #get a reading from the list
async def get_glucose_by_id(id: int = Path(..., title="default")) -> dict: #review slides on this
    for reading in glucose_list:
        if reading.id == id:
            return {"reading" : reading}
    
    raise HTTPException(
        status_code = status.HTTP_404_NOT_FOUND,
        detail = f"The glucose reading with ID={id} is not found",
    )


@glucose_router.put("/glucose/{id}") #add a reading to the list
async def update_glucose(id: int, glucose: GlucoseRequest) -> dict:
    for x in glucose_list:
        if x.id == id:
            x.reading = glucose.reading
            x.datetime = glucose.datetime
            return {"msg": "Glucose reading updated successfully!"}
        
    return {"msg": f"The glucose reading with ID={id} is not found."}


@glucose_router.delete("/glucose/{id}") #delete a reading from the list
async def delete_todo(id: int) -> dict:
    for i in range(len(glucose_list)):
        reading = glucose_list[i]
        if reading.id == id:
            glucose_list.pop(i)
            return {"msg": "Glucose reading deleted successfully!"}
        
    return {"msg": f"The glucose reading with ID={id} is not found."}
