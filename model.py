from pydantic import BaseModel
from datetime import datetime


class Glucose(BaseModel):
    id: int
    reading: int
    datetime: datetime


class GlucoseRequest(BaseModel):
    reading: int
    datetime: datetime