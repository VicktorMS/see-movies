# main.py
from fastapi import FastAPI
from .core.db import engine
from . import models
from app.api.routes import favorites, movies

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(favorites.router, prefix='/favorites', tags=['favorites'])
app.include_router(movies.router, prefix='/movies', tags=['movies'])

@app.get("/")
async def root():
    return {"message": "Hello World"}