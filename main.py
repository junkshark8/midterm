from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from glucose import glucose_router


app = FastAPI()


@app.get("/")
async def view_index():
    return FileResponse("./frontend/index.html")


app.include_router(glucose_router)

app.mount("/", StaticFiles(directory = "frontend"), name = "static") #mount static file directory for style.css and script.js