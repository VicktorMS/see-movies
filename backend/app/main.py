# main.py
from fastapi import FastAPI
from .db import engine
from . import models
from .api.routes import router as api_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}